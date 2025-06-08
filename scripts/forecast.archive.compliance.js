// Phase 6.8 — Archive Compliance Monitor (Scaffold)
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastArchiveCompliance = (function () {

  function scanAndAuditSnapshots() {
    const snapshotKeys = Object.keys(localStorage)
      .filter(key => key.startsWith("snapshot_"));

    if (snapshotKeys.length === 0) {
      alert("📂 No archived snapshots found.");
      return;
    }

    let summary = {
      total: snapshotKeys.length,
      passed: 0,
      failed: 0,
      failures: []
    };

    snapshotKeys.forEach(key => {
      try {
        const snapshot = JSON.parse(localStorage.getItem(key));
        if (snapshot && Array.isArray(snapshot.records)) {
          let valid = snapshot.records.every(record => (
            record.hasOwnProperty("itemNumber") &&
            record.hasOwnProperty("division") &&
            record.hasOwnProperty("onHandUnits")
          ));

          if (valid) {
            summary.passed++;
          } else {
            summary.failed++;
            summary.failures.push(key);
          }
        } else {
          summary.failed++;
          summary.failures.push(key);
        }
      } catch (err) {
        summary.failed++;
        summary.failures.push(key);
      }
    });

    console.group("🧪 Archive Compliance Audit Complete");
    console.log(`Total Archives: ${summary.total}`);
    console.log(`Passed: ${summary.passed}`);
    console.log(`Failed: ${summary.failed}`);
    console.table(summary.failures);
    console.groupEnd();

    alert(`✅ Compliance Scan Complete\nTotal: ${summary.total}\nPassed: ${summary.passed}\nFailed: ${summary.failed}`);
  }

  return {
    runComplianceAudit: scanAndAuditSnapshots
  };

})();