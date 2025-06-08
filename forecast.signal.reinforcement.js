// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.8
// Subsystem: Adaptive Signal Reinforcement Core

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.SignalReinforcementCore = (function() {

  const reinforcementMap = JSON.parse(localStorage.getItem("SageCraftReinforcementMap") || "{}");

  function updateReinforcementProfile(signal) {
    reinforcementMap[signal] = (reinforcementMap[signal] || 0) + 1;
    localStorage.setItem("SageCraftReinforcementMap", JSON.stringify(reinforcementMap));
  }

  function applyReinforcementToCortex() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      alert("⚠ Cortex memory unavailable.");
      return;
    }

    cortex.forEach(record => {
      const signal = record.anomalySignal;
      if (signal) {
        updateReinforcementProfile(signal);
      }
    });

    alert("✅ Adaptive Signal Reinforcement Sweep Complete.");
  }

  function showReinforcementSummary() {
    let summary = "📊 Reinforcement Signal Summary:\n\n";
    const entries = Object.entries(reinforcementMap);
    if (entries.length === 0) {
      summary += "⚠ No reinforcement data yet.";
    } else {
      entries.forEach(([signal, count]) => {
        summary += `• ${signal}: ${count} instances\n`;
      });
    }
    alert(summary);
  }

  function purgeReinforcementData() {
    localStorage.removeItem("SageCraftReinforcementMap");
    alert("🧹 Reinforcement map purged.");
  }

  return {
    applyReinforcementToCortex,
    showReinforcementSummary,
    purgeReinforcementData
  };

})();