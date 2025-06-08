

// === SageCraft Ascendant: Phase 12.0 — Neural Forecast Anomaly Sentinel (NFAS) ===

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.NeuralForecastAnomalySentinel = (function () {

  const _anomalyLog = [];

  function analyzeForecasts(forecasts) {
    const anomalies = [];

    forecasts.forEach((forecast, index) => {
      // Basic anomaly check — placeholder logic
      if (forecast.variance > 0.5) {
        const anomaly = {
          index,
          forecast,
          reason: "High variance detected",
          timestamp: new Date().toISOString()
        };
        anomalies.push(anomaly);
        _anomalyLog.push(anomaly);
        console.warn("⚠ Anomaly Detected:", anomaly);
      }
    });

    return anomalies;
  }

  function getAnomalies() {
    return [..._anomalyLog];
  }

  function clearAnomalies() {
    _anomalyLog.length = 0;
    console.warn("⚠ Anomaly Log cleared.");
  }

  return {
    analyzeForecasts,
    getAnomalies,
    clearAnomalies
  };

})();