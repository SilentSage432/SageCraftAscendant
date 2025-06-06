// Phase 7.5 — Recursive Forecast Adaptation Engine
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastAdaptationEngine = (function() {

  let historicalBaseline = {};

  function buildHistoricalBaseline() {
    const cortex = window.NeuralForecastMemoryCortex?.getForecastHistory?.() || [];
    historicalBaseline = {};

    cortex.forEach(record => {
      const key = record.itemNumber;
      if (!historicalBaseline[key]) {
        historicalBaseline[key] = {
          division: record.division,
          total: 0,
          varianceSum: 0,
          count: 0
        };
      }
      historicalBaseline[key].total += record.onHandUnits;
      historicalBaseline[key].varianceSum += Math.abs(record.cycleCountUnits || 0);
      historicalBaseline[key].count++;
    });

    console.log("✅ Historical baseline built for adaptation engine.");
  }

  function applyAdaptiveWeights() {
    const cortex = window.NeuralForecastMemoryCortex?.getForecastHistory?.() || [];
    if (!historicalBaseline || Object.keys(historicalBaseline).length === 0) {
      console.warn("⚠ Historical baseline not found. Build baseline first.");
      return;
    }

    cortex.forEach(record => {
      const baseline = historicalBaseline[record.itemNumber];
      if (!baseline) return;

      const avgVariance = (baseline.varianceSum / baseline.count) || 0;
      const adaptiveThreshold = avgVariance * 0.75;
      record.adaptiveSignal = adaptiveThreshold < 2 ? "🔵 Stable Pattern" : "🟠 Variance Detected";
    });

    console.log("✅ Adaptive weights applied to forecast cortex.");
  }

  function runFullAdaptationCycle() {
    buildHistoricalBaseline();
    applyAdaptiveWeights();
    console.log("♻️ Full Forecast Adaptation Cycle Complete.");
  }

  return {
    runFullAdaptationCycle
  };

})();