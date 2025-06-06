// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.9
// Subsystem: Anomaly Impact Profiler

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.AnomalyImpactProfiler = (function() {

  function profileImpacts() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Cortex memory unavailable.");
      return;
    }

    const results = cortex.map(entry => {
      let weight = 0;

      // Assign weights based on known destabilizers
      if (entry.shrinkUnits > 0) weight += 3;
      if (entry.cycleCountUnits !== 0) weight += 2;
      if (entry.stabilityHint === "Volatile") weight += 2;
      if (entry.riskSignal === "🟠 Warning" || entry.riskSignal === "🔴 Critical") weight += 4;
      if (entry.anomalySignal && entry.anomalySignal.includes("Anomaly")) weight += 3;

      let impactLevel = "🟢 Low";

      if (weight >= 5 && weight < 10) impactLevel = "🟠 Elevated";
      if (weight >= 10) impactLevel = "🔴 High";

      return {
        itemNumber: entry.itemNumber,
        division: entry.division,
        weight,
        impactLevel
      };
    });

    console.table(results);
    alert("✅ Anomaly Impact Profiler complete. See console for detailed results.");
    return results;
  }

  return {
    profileImpacts
  };

})();