// Phase 7.2 — Neural Stability Analytics Engine
window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastStabilityAnalytics = (function () {

  function computeStabilityIndex() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();

    if (!cortex || cortex.length === 0) {
      alert("⚠ No forecast data available.");
      return;
    }

    let total = cortex.length;
    let stableCount = 0;
    let volatileCount = 0;
    let conflictingCount = 0;

    cortex.forEach(record => {
      const stable = record.stabilityHint === "Stable";
      const highRisk = record.riskSignal === "🔴 High Risk";

      if (stable && !highRisk) stableCount++;
      else if (!stable && highRisk) volatileCount++;
      else conflictingCount++;
    });

    const stabilityIndex = (stableCount / total) * 100;
    const volatilityIndex = (volatileCount / total) * 100;
    const conflictIndex = (conflictingCount / total) * 100;

    console.group("📊 Neural Stability Analytics");
    console.log(`Total Records: ${total}`);
    console.log(`Stability Index: ${stabilityIndex.toFixed(1)}%`);
    console.log(`Volatility Index: ${volatilityIndex.toFixed(1)}%`);
    console.log(`Conflict Index: ${conflictIndex.toFixed(1)}%`);
    console.groupEnd();

    alert(`✅ Stability Index: ${stabilityIndex.toFixed(1)}%\nVolatility Index: ${volatilityIndex.toFixed(1)}%\nConflicts: ${conflictingCount}`);
  }

  return {
    computeStabilityIndex
  };

})();