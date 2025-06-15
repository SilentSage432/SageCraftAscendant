// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v6.0
// Subsystem: Forecast Model Mutation Layer

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastMutationLayer = (function() {

  function mutateSynthesizedForecast(mutationFactor = 0.15, scenarios = 5) {
    const original = JSON.parse(localStorage.getItem("SageCraftSynthesizedForecast") || "[]");
    if (original.length === 0) {
      alert("⚠ No synthesized forecast data available.");
      return;
    }

    let allScenarios = [];

    for (let i = 1; i <= scenarios; i++) {
      let mutated = original.map(record => {
        let base = parseFloat(record.correctedRisk);
        let randomShift = (Math.random() * 2 - 1) * mutationFactor * base;
        let mutatedRisk = Math.max(0, Math.min(100, base + randomShift));

        return {
          ...record,
          mutatedScenario: i,
          mutatedRisk: mutatedRisk.toFixed(1)
        };
      });

      allScenarios = allScenarios.concat(mutated);
    }

    localStorage.setItem("SageCraftMutatedForecasts", JSON.stringify(allScenarios));
    alert(`✅ ${scenarios} Mutation Scenarios Generated.`);
    console.table(allScenarios);
    if (window.SovereignBus) {
      window.SovereignBus.emit("whispererVitals", {
        module: "ForecastMutationLayer",
        message: `Generated ${scenarios} mutation scenarios.`,
        preview: allScenarios.slice(0, 3)  // send preview of first 3 mutations
      });
    }
  }

  function exportMutatedForecasts() {
    const data = JSON.parse(localStorage.getItem("SageCraftMutatedForecasts") || "[]");
    if (data.length === 0) {
      alert("⚠ No mutated forecasts available.");
      return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MutatedForecast_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return {
    mutateSynthesizedForecast,
    exportMutatedForecasts
  };

})();