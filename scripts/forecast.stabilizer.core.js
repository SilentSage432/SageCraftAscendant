// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.6
// Subsystem: Autonomous Forecast Stabilizer Core

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastStabilizerCore = (function() {

  function runStabilizationSweep() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    const confidenceMap = SageCraftAscendant.ForecastConfidenceEngine?.exportConfidenceMap?.();

    if (!cortex || cortex.length === 0) {
      alert("⚠ Forecast Cortex data unavailable.");
      return;
    }

    const threatThreshold = 60;
    const confidenceThreshold = 70;

    const suppressed = [];

    cortex.forEach(record => {
      const division = record.division;
      const confidenceObj = confidenceMap[division];
      let confidenceScore = 80;

      if (confidenceObj && confidenceObj.total > 0) {
        confidenceScore = (confidenceObj.accurate / confidenceObj.total) * 100;
      }

      const riskScore = (record.projectedRisk || 50);

      if (confidenceScore < confidenceThreshold && riskScore >= threatThreshold) {
        record.suppressed = true;
        suppressed.push({
          itemNumber: record.itemNumber,
          division,
          confidence: confidenceScore.toFixed(1),
          risk: riskScore.toFixed(1)
        });
      } else {
        record.suppressed = false;
      }
    });

    if (suppressed.length === 0) {
      alert("✅ No forecasts required stabilization.");
      return;
    }

    let report = "🚨 Forecast Stabilizer Activated — Suppressed Forecasts:\n\n";
    suppressed.forEach(entry => {
      report += `• ${entry.division} (${entry.itemNumber}) → Confidence: ${entry.confidence}%, Risk: ${entry.risk}%\n`;
    });

    alert(report);
  }

  return {
    runStabilizationSweep
  };

})();