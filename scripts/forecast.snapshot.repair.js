// Phase 6.6 — Forecast Snapshot Repair Engine
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastSnapshotRepair = (function() {

  const defaultRecordTemplate = {
    timestamp: new Date().toISOString(),
    itemNumber: "UNKNOWN",
    division: "Uncategorized",
    onHandUnits: 0,
    cycleCountUnits: 0,
    shrinkUnits: 0,
    itdSalesUnits: 0,
    stabilityHint: "Unknown",
    riskSignal: "⚪ Undefined",
    anomalySignal: "⚪ Undefined"
  };

  function repairSnapshotFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const snapshot = JSON.parse(event.target.result);
        let repairLog = [];

        if (!snapshot.records || !Array.isArray(snapshot.records)) {
          alert("❌ Invalid snapshot structure — cannot repair.");
          return;
        }

        const repairedRecords = snapshot.records.map((record, index) => {
          let repaired = { ...defaultRecordTemplate };
          let modified = false;

          for (let field in defaultRecordTemplate) {
            if (record[field] !== undefined) {
              repaired[field] = record[field];
            } else {
              modified = true;
              repairLog.push(`Record ${index + 1}: Missing '${field}', default applied.`);
            }
          }

          // Handle legacy data: sometimes shrinkUnits or cycleCountUnits are strings
          if (typeof repaired.shrinkUnits === "string") {
            repaired.shrinkUnits = parseInt(repaired.shrinkUnits) || 0;
            repairLog.push(`Record ${index + 1}: Converted shrinkUnits to number.`);
          }
          if (typeof repaired.cycleCountUnits === "string") {
            repaired.cycleCountUnits = parseInt(repaired.cycleCountUnits) || 0;
            repairLog.push(`Record ${index + 1}: Converted cycleCountUnits to number.`);
          }

          return repaired;
        });

        console.group("🛠 Snapshot Repair Log");
        repairLog.forEach(msg => console.log(msg));
        console.groupEnd();

        // Create repaired snapshot blob and auto-download
        const repairedBlob = new Blob(
          [JSON.stringify({ timestamp: new Date().toISOString(), records: repairedRecords }, null, 2)],
          { type: "application/json" }
        );

        const downloadUrl = URL.createObjectURL(repairedBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `RepairedSnapshot_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        link.click();
        URL.revokeObjectURL(downloadUrl);

        alert(`✅ Snapshot repair complete.\n${repairLog.length} issue(s) corrected.`);

      } catch (err) {
        console.error("❌ Failed to repair snapshot:", err);
        alert("⚠ Failed to parse snapshot file.");
      }
    };

    reader.readAsText(file);
  }

  function promptSnapshotRepair() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.style.display = "none";

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      repairSnapshotFile(file);
    });

    document.body.appendChild(input);
    input.click();
  }

  return {
    promptSnapshotRepair
  };
})();