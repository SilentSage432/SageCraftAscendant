// Phase 7.1 — Neural Forecast Validation Sentinel
window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastValidationSentinel = (function () {

  function validateForecastRecord(record) {
    let issues = [];

    if (record.onHandUnits < 0) issues.push("❌ Negative onHandUnits.");
    if (record.cycleCountUnits < 0) issues.push("❌ Negative cycleCountUnits.");
    if (record.shrinkUnits < 0) issues.push("❌ Negative shrinkUnits.");
    if (record.itdSalesUnits < 0) issues.push("❌ Negative itdSalesUnits.");

    if (record.stabilityHint === "Stable" && record.riskSignal === "🔴 High Risk") {
      issues.push("⚠ Stability/Risk conflict detected.");
    }

    if (issues.length > 0) {
      console.group("🚨 Forecast Validation Issue Detected");
      console.log("Record:", record);
      issues.forEach(issue => console.warn(issue));
      console.groupEnd();
    } else {
      console.log("✅ Forecast record passed validation.");
    }
  }

  return { validateForecastRecord };

})();