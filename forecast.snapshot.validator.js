// Phase 6.5 — Forecast Snapshot Integrity Validator
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastSnapshotValidator = (function() {

  function validateSnapshotFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const snapshot = JSON.parse(event.target.result);
        let errors = [];

        // Validate high-level fields
        if (!snapshot.timestamp || !snapshot.records || !Array.isArray(snapshot.records)) {
          errors.push("❌ Missing required fields: 'timestamp' or 'records' array.");
        }

        // Validate record schema
        snapshot.records.forEach((record, index) => {
          if (typeof record !== "object") {
            errors.push(`❌ Record ${index + 1} is not a valid object.`);
            return;
          }

          const requiredFields = [
            "timestamp", "itemNumber", "division", 
            "onHandUnits", "cycleCountUnits", "shrinkUnits",
            "itdSalesUnits", "stabilityHint", "riskSignal", "anomalySignal"
          ];

          requiredFields.forEach(field => {
            if (!(field in record)) {
              errors.push(`❌ Record ${index + 1} missing field: '${field}'.`);
            }
          });
        });

        if (errors.length > 0) {
          console.error("❌ Snapshot Validation Errors Detected:", errors);
          alert(`⚠ Validation failed with ${errors.length} issue(s). See console for details.`);
        } else {
          console.log("✅ Snapshot structure validated successfully.");
          alert("✅ Snapshot validated successfully.");
        }

        // Emit validation result to SovereignBus
        if (typeof window.SovereignBus !== "undefined") {
          window.SovereignBus.emit("whispererVitals", {
            module: "SnapshotValidator",
            result: errors.length > 0 ? "❌ Invalid" : "✅ Valid",
            issues: errors.length
          });
        }

      } catch (err) {
        console.error("❌ Failed to parse snapshot:", err);
        alert("⚠ Failed to parse snapshot file.");
      }
    };

    reader.readAsText(file);
  }

  function promptSnapshotValidation() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.style.display = "none";

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      validateSnapshotFile(file);
    });

    document.body.appendChild(input);
    input.click();
  }

  return {
    promptSnapshotValidation
  };
})();