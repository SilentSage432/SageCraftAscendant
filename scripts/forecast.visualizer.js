// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.2
// Subsystem: Forecast Visualizer Engine

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastVisualizer = (function() {

  let chartInstance = null;

  function renderForecastChart() {
    const ctx = document.getElementById("forecastChart").getContext("2d");
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory() || [];

    const labels = cortex.map(f => new Date(f.timestamp).toLocaleString());
    const stability = cortex.map(f => f.stabilityHint === "Stable" ? 1 : 0);
    const volatility = cortex.map(f => f.stabilityHint === "Volatile" ? 1 : 0);

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Stable",
            data: stability,
            backgroundColor: "#33cc66"
          },
          {
            label: "Volatile",
            data: volatility,
            backgroundColor: "#ff4444"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Forecast Cortex Stability Snapshot"
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: { beginAtZero: true, stepSize: 1 }
        }
      }
    });
  }

  return {
    renderForecastChart
  };

})();