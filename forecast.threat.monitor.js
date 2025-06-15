// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.8
// Subsystem: Predictive Threat Monitor

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.PredictiveThreatMonitor = (function() {

  function scanThreats() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Cortex memory unavailable.");
      return;
    }

    const instabilityMap = {};
    cortex.forEach(entry => {
      if (entry.stabilityHint === "Volatile") {
        instabilityMap[entry.division] = (instabilityMap[entry.division] || 0) + 1;
      }
    });

    const total = cortex.length;
    const report = [];

    Object.keys(instabilityMap).forEach(category => {
      const count = instabilityMap[category];
      const percent = ((count / total) * 100).toFixed(1);
      let level = "🟢 Low";

      if (percent >= 10 && percent < 25) level = "🟠 Elevated";
      if (percent >= 25) level = "🔴 Critical";

      report.push({ category, percent, level });
    });

    console.table(report);
    alert("✅ Predictive Threat Monitor complete. Check console for detailed report.");

    if (window.SovereignBus) {
      window.SovereignBus.emit("whispererVitals", {
        source: "ThreatMonitor",
        type: "threatSummary",
        payload: report
      });
    }

    return report;
  }

  return {
    scanThreats
  };

})();