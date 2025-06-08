// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v4.1
// Subsystem: Memory Drift Compensation Engine

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.DriftCompensator = (function() {

  function suggestCompensations() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Cortex memory unavailable.");
      return;
    }

    const suggestions = cortex.map(entry => {
      const variance = entry.onHandUnits - entry.itdSalesUnits;
      let suggestion = "✅ Stable — No Adjustment";

      if (variance > 10) {
        suggestion = `🔽 Suggest reducing on-hand by ${variance} units`;
      } else if (variance < -10) {
        suggestion = `🔼 Suggest increasing on-hand by ${Math.abs(variance)} units`;
      }

      return {
        itemNumber: entry.itemNumber,
        division: entry.division,
        variance,
        suggestion
      };
    });

    console.table(suggestions);
    alert("✅ Drift Compensation Engine complete. See console for recommended adjustments.");
    return suggestions;
  }

  return {
    suggestCompensations
  };

})();