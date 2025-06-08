// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.2
// Subsystem: Neural Forecast Weight Adaptation Engine

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastWeightAdaptation = (function() {

  function applyWeightedForecast() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    const recursiveMemory = SageCraftAscendant.RecursiveForecastMemory?.injectRecursiveWeighting?.();

    if (!cortex || cortex.length === 0) {
      alert("⚠ Forecast cortex memory unavailable.");
      return;
    }

    const divisionMap = {};

    cortex.forEach(record => {
      const key = record.division;
      if (!divisionMap[key]) {
        divisionMap[key] = { total: 0, volatility: 0, fusionPoints: 0 };
      }

      divisionMap[key].total += 1;
      if (record.stabilityHint === "Volatile") divisionMap[key].volatility += 1;
      if (record.anomalySignal !== "⚪ Unanalyzed") divisionMap[key].fusionPoints += 1;
    });

    const output = [];
    Object.entries(divisionMap).forEach(([division, stats]) => {
      const volatilityRate = stats.volatility / stats.total;
      const fusionRate = stats.fusionPoints / stats.total;

      let baseRisk = ((volatilityRate * 0.6) + (fusionRate * 0.4)) * 100;
      if (recursiveMemory) {
        baseRisk = baseRisk * (parseFloat(recursiveMemory) / 100);
      }

      output.push({ division, projectedRisk: baseRisk.toFixed(1) });
    });

    let report = `⚙ Adaptive Forecast Weight Applied\n\n`;
    output.sort((a, b) => b.projectedRisk - a.projectedRisk).forEach(entry => {
      let severity = "🟢 Stable";
      if (entry.projectedRisk >= 70) severity = "🔴 High Risk";
      else if (entry.projectedRisk >= 40) severity = "🟠 Moderate";

      report += `• ${entry.division} → ${entry.projectedRisk}% Risk → ${severity}\n`;
    });

    alert(report);
  }

  return {
    applyWeightedForecast
  };

})();