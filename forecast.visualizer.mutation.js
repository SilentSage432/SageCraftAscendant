// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v6.2
// Subsystem: Mutation Scenario Visualizer

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.MutationScenarioVisualizer = (function() {

  function renderMutationVisualizer() {
    const data = JSON.parse(localStorage.getItem("SageCraftMutatedForecasts") || "[]");
    window.SovereignBus?.emit("whispererVitals", {
      source: "MutationVisualizer",
      entryCount: data.length,
      timestamp: new Date().toISOString()
    });
    if (data.length === 0) {
      alert("⚠ No mutated forecasts available.");
      return;
    }

    const scenarioMap = {};

    data.forEach(record => {
      const scenario = record.mutatedScenario;
      if (!scenarioMap[scenario]) scenarioMap[scenario] = [];
      scenarioMap[scenario].push(parseFloat(record.mutatedRisk));
      window.SovereignBus?.emit("whispererVitals", {
        scenario,
        latestRisk: record.mutatedRisk
      });
    });

    const labels = Array.from({ length: Object.values(scenarioMap)[0].length }, (_, i) => `Entry ${i + 1}`);
    const datasets = Object.entries(scenarioMap).map(([scenario, risks], idx) => ({
      label: `Scenario ${scenario}`,
      data: risks,
      borderWidth: 2
    }));

    const ctx = document.getElementById("mutationChart").getContext("2d");
    new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        interaction: { mode: 'index', intersect: false }
      }
    });
  }

  return {
    renderMutationVisualizer
  };

})();

// === Phase 6.2.1 — Render Pipeline Stabilizer Injection ===

document.addEventListener("DOMContentLoaded", () => {
  const originalMutate = SageCraftAscendant.ForecastMutationLayer.mutateSynthesizedForecast;

  SageCraftAscendant.ForecastMutationLayer.mutateSynthesizedForecast = function(factor, scenarios) {
    originalMutate.call(this, factor, scenarios);
    setTimeout(() => {
      SageCraftAscendant.MutationScenarioVisualizer.renderMutationVisualizer();
    }, 300);
  };

  const originalExport = SageCraftAscendant.ForecastMutationLayer.exportMutatedForecasts;

  SageCraftAscendant.ForecastMutationLayer.exportMutatedForecasts = function() {
    originalExport.call(this);
    setTimeout(() => {
      SageCraftAscendant.MutationScenarioVisualizer.renderMutationVisualizer();
    }, 300);
  };
});