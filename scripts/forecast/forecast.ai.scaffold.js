// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.4
// Subsystem: Adaptive Intelligence Scaffold

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.AdaptiveIntelligence = (function() {

  function evaluateSignals() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ No forecast memory available for evaluation.");
      return { score: 0 };
    }

    let stable = 0, volatile = 0, surge = 0, regression = 0;

    cortex.forEach(entry => {
      switch (entry.stabilityHint) {
        case "Stable": stable++; break;
        case "Volatile": volatile++; break;
        case "Surge": surge++; break;
        case "Regression": regression++; break;
      }
    });

    const total = cortex.length;
    const volatilityPenalty = (volatile + regression + surge) / total;
    const stabilityBonus = stable / total;

    // Simple composite score calculation
    let stabilityScore = ((stabilityBonus * 80) - (volatilityPenalty * 50)).toFixed(1);
    stabilityScore = Math.max(0, Math.min(stabilityScore, 100));

    const intelligenceReport = {
      totalRecords: total,
      stable, volatile, surge, regression,
      volatilityPenalty: (volatilityPenalty * 100).toFixed(1),
      stabilityBonus: (stabilityBonus * 100).toFixed(1),
      stabilityScore
    };

    console.table(intelligenceReport);
    return intelligenceReport;
  }

  return {
    evaluateSignals
  };

})();