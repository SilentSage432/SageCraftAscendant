// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.5
// Subsystem: Neural Threat Mitigation Overseer

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastThreatOverseer = (function() {

  function evaluateThreatBoard() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    const confidenceMap = SageCraftAscendant.ForecastConfidenceEngine?.exportConfidenceMap?.();

    if (!cortex || cortex.length === 0) {
      alert("⚠ Cortex data unavailable.");
      return;
    }

    const threatThreshold = 60;
    const confidenceThreshold = 70;

    const flaggedSectors = [];

    cortex.forEach(record => {
      const division = record.division;
      const confidenceObj = confidenceMap[division];
      let confidenceScore = 80; // Default confidence if not available

      if (confidenceObj && confidenceObj.total > 0) {
        confidenceScore = (confidenceObj.accurate / confidenceObj.total) * 100;
      }

      const riskScore = (record.projectedRisk || 50);

      if (confidenceScore < confidenceThreshold && riskScore >= threatThreshold) {
        flaggedSectors.push({
          division,
          itemNumber: record.itemNumber,
          confidence: confidenceScore.toFixed(1),
          risk: riskScore.toFixed(1)
        });
      }
    });

    if (flaggedSectors.length === 0) {
      alert("✅ No active neural threats detected.");
      return;
    }

    let report = "🚨 Neural Threat Mitigation Overseer Report\n\n";
    flaggedSectors.forEach(entry => {
      report += `• ${entry.division} (${entry.itemNumber}) → Confidence: ${entry.confidence}%, Risk: ${entry.risk}%\n`;
    });

    alert(report);
  }

  return {
    evaluateThreatBoard
  };

})();