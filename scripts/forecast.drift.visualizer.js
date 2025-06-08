// Phase 7.3 — Neural Forecast Drift Visualization Engine

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastDriftVisualizer = (function () {

  function renderDriftChart() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();

    if (!cortex || cortex.length === 0) {
      alert("⚠ No forecast data available for drift visualization.");
      return;
    }

    const categoryMap = {};
    cortex.forEach(record => {
      const category = record.division;
      const stable = record.stabilityHint === "Stable";
      if (!categoryMap[category]) {
        categoryMap[category] = { stable: 0, volatile: 0 };
      }
      if (stable) categoryMap[category].stable++;
      else categoryMap[category].volatile++;
    });

    const labels = Object.keys(categoryMap);
    const stableData = labels.map(c => categoryMap[c].stable);
    const volatileData = labels.map(c => categoryMap[c].volatile);

    const ctx = document.getElementById("forecastDriftChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Stable Records",
            data: stableData,
            backgroundColor: "rgba(0, 255, 0, 0.6)"
          },
          {
            label: "Volatile Records",
            data: volatileData,
            backgroundColor: "rgba(255, 0, 0, 0.6)"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Neural Forecast Drift Profile"
          }
        }
      }
    });
  }

  return {
    renderDriftChart
  };

})();