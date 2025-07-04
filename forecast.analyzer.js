// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.3
// Subsystem: Forecast Analyzer Engine

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastAnalyzer = (function() {

  function analyzeCortex() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Forecast Cortex empty — no data to analyze.");
      return { total: 0 };
    }

    let stable = 0;
    let volatile = 0;
    let surge = 0;
    let regression = 0;

    cortex.forEach(entry => {
      switch (entry.stabilityHint) {
        case "Stable":
          stable++;
          break;
        case "Volatile":
          volatile++;
          break;
        case "Surge":
          surge++;
          break;
        case "Regression":
          regression++;
          break;
        default:
          break;
      }
    });

    const total = cortex.length;
    const volatilityRate = ((volatile / total) * 100).toFixed(1);
    const stabilityRate = ((stable / total) * 100).toFixed(1);
    const surgeRate = ((surge / total) * 100).toFixed(1);
    const regressionRate = ((regression / total) * 100).toFixed(1);

    const signalReport = {
      total,
      stable,
      volatile,
      surge,
      regression,
      volatilityRate,
      stabilityRate,
      surgeRate,
      regressionRate
    };

    console.table(signalReport);
    // 🧠 Emit signal report to Sovereign Neural Event Bus
    if (window.SovereignBus) {
      SovereignBus.emit("forecast.analyzer", `Signal report generated: ${JSON.stringify(signalReport)}`);
      SovereignBus.emit("whispererVitals", {
        coreTemp: `${(36 + Math.random() * 3).toFixed(1)}°C`,
        signal: `${(90 + Math.random() * 10).toFixed(0)}%`,
        drift: `${(Math.random() * 0.01).toFixed(3)}Δ`
      });
    }
    return signalReport;
  }

  return {
    analyzeCortex
  };

})();