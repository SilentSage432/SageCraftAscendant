// Phase 6.9 — Automated Compliance Sweep Engine
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastArchiveAutoScanner = (function () {

  function runAutoComplianceSweep() {
    console.log("🚀 Running Automated Archive Compliance Sweep...");

    const snapshotKeys = Object.keys(localStorage)
      .filter(key => key.startsWith("snapshot_"));

    if (snapshotKeys.length === 0) {
      console.log("📂 No archived snapshots found.");
      return;
    }

    let hasFailures = false;

    snapshotKeys.forEach(key => {
      try {
        const snapshot = JSON.parse(localStorage.getItem(key));
        if (!snapshot || !Array.isArray(snapshot.records)) {
          console.warn(`❌ Snapshot ${key} malformed.`);
          hasFailures = true;
          return;
        }

        let valid = snapshot.records.every(record => (
          record.hasOwnProperty("itemNumber") &&
          record.hasOwnProperty("division") &&
          record.hasOwnProperty("onHandUnits")
        ));

        if (!valid) {
          console.warn(`⚠ Integrity failure detected in ${key}.`);
          hasFailures = true;
        }
      } catch (err) {
        console.error(`❌ Exception parsing ${key}:`, err);
        hasFailures = true;
      }
    });

    if (hasFailures) {
      console.warn("⚠ Archive Compliance Sweep Completed — Issues detected.");
    } else {
      console.log("✅ Archive Compliance Sweep Completed — All snapshots valid.");
    }
  }

  return {
    runAutoComplianceSweep
  };

})();