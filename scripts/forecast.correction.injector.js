// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.4
// Subsystem: Forecast Correction Weight Injector

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastCorrectionInjector = (function() {

  function applyCorrectionWeights() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    const confidenceMap = SageCraftAscendant.ForecastConfidenceEngine?.exportConfidenceMap?.();

    if (!cortex || cortex.length === 0) {
      alert("⚠ Forecast Cortex memory unavailable.");
      return;
    }

    const correctionOutput = [];

    cortex.forEach(record => {
      const division = record.division;
      const confidenceObj = confidenceMap[division];
      let confidenceScore = 80; // Default if no data

      if (confidenceObj && confidenceObj.total > 0) {
        confidenceScore = (confidenceObj.accurate / confidenceObj.total) * 100;
      }

      // Apply confidence adjustment — lower confidence inflates risk
      const correctionFactor = 1 + ((80 - confidenceScore) / 200);  // Soft scale
      const correctedRisk = (record.projectedRisk || 50) * correctionFactor;

      correctionOutput.push({
        itemNumber: record.itemNumber,
        division,
        originalRisk: (record.projectedRisk || 50).toFixed(1),
        confidence: confidenceScore.toFixed(1),
        correctedRisk: correctedRisk.toFixed(1)
      });
    });

    let report = "⚖ Forecast Correction Injector Output\n\n";
    correctionOutput.forEach(entry => {
      report += `• ${entry.division} (${entry.itemNumber}) → Original: ${entry.originalRisk}%, Confidence: ${entry.confidence}%, Corrected: ${entry.correctedRisk}%\n`;
    });

    alert(report);
  }

  return {
    applyCorrectionWeights
  };

})();