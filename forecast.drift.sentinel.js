// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.5
// Subsystem: Volatility Drift Sentinel

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.VolatilityDriftSentinel = (function() {

  function analyzeDriftWindow(windowSize = 50) {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Cortex memory unavailable.");
      return null;
    }

    const sampleWindow = cortex.slice(-windowSize);
    let stable = 0;
    let volatile = 0;

    sampleWindow.forEach(entry => {
      if (entry.stabilityHint === "Stable") stable++;
      else volatile++;
    });

    const driftRate = ((volatile / sampleWindow.length) * 100).toFixed(1);

    const driftReport = {
      windowSize: sampleWindow.length,
      stable,
      volatile,
      driftRate
    };

    console.table(driftReport);
    return driftReport;
  }

  // Optional continuous monitor hook (for future HUD injection)
  function monitor(intervalMs = 10000) {
    setInterval(() => {
      analyzeDriftWindow();
    }, intervalMs);
  }

  return {
    analyzeDriftWindow,
    monitor
  };

})();