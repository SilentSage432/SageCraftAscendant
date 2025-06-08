// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.3
// Subsystem: Recursive Forecast Confidence Engine

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastConfidenceEngine = (function() {

  const confidenceStore = {};

  function processForecastAccuracy() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      alert("⚠ Forecast Cortex memory unavailable.");
      return;
    }

    cortex.forEach(record => {
      const division = record.division;
      const isAccurate = (record.stabilityHint === "Stable" && record.projectedRisk < 40)
                      || (record.stabilityHint === "Volatile" && record.projectedRisk >= 40);

      if (!confidenceStore[division]) {
        confidenceStore[division] = { total: 0, accurate: 0 };
      }

      confidenceStore[division].total++;
      if (isAccurate) confidenceStore[division].accurate++;
    });

    let report = "🧮 Forecast Confidence Scores\n\n";
    Object.entries(confidenceStore).forEach(([division, stats]) => {
      const confidence = ((stats.accurate / stats.total) * 100).toFixed(1);
      report += `• ${division} → ${confidence}% Confidence\n`;
    });

    alert(report);
  }

  function exportConfidenceMap() {
    console.table(confidenceStore);
    return confidenceStore;
  }

  return {
    processForecastAccuracy,
    exportConfidenceMap
  };

})();