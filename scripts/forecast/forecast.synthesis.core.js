// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.9
// Subsystem: Neural Arbitration Forecast Synthesis

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastSynthesisCore = (function() {

  function synthesizeCorrectedForecast() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    const reinforcementMap = JSON.parse(localStorage.getItem("SageCraftReinforcementMap") || "{}");
    
    if (!cortex || cortex.length === 0) {
      alert("⚠ Cortex memory unavailable.");
      return;
    }

    let synthesisResults = cortex.map(record => {
      let weight = reinforcementMap[record.anomalySignal] || 1;
      let adjustedRisk = parseFloat(record.projectedRisk || 50);
      
      // Apply simple weighted correction logic
      adjustedRisk = Math.max(0, Math.min(100, adjustedRisk + (weight * 0.25)));

      return {
        ...record,
        correctedRisk: adjustedRisk.toFixed(1),
        reinforcementWeight: weight
      };
    });

    console.table(synthesisResults);
    alert(`✅ Forecast Synthesis Complete — ${synthesisResults.length} records processed.`);

    // Store result for downstream modules if needed
    localStorage.setItem("SageCraftSynthesizedForecast", JSON.stringify(synthesisResults));
  }

  function exportSynthesizedForecast() {
    const data = JSON.parse(localStorage.getItem("SageCraftSynthesizedForecast") || "[]");
    if (data.length === 0) {
      alert("⚠ No synthesized forecast found.");
      return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SynthesizedForecast_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return {
    synthesizeCorrectedForecast,
    exportSynthesizedForecast
  };

})();