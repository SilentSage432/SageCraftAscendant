// scripts/sagecraft/forecast.anomaly.density.js

export const AnomalyDensityMapper = (() => {

    function computeAnomalyDensity() {
      const cortex = window.NeuralForecastMemoryCortex?.getForecastHistory?.();
      if (!cortex || cortex.length === 0) {
        console.warn("SCAN::Anomaly.DensityMapper >> Cortex memory empty.");
        return {};
      }
  
      const densityMap = {};
      cortex.forEach(entry => {
        const category = entry.division || "Unknown";
        if (!densityMap[category]) {
          densityMap[category] = { total: 0, anomalies: 0 };
        }
        densityMap[category].total += 1;
        if (entry.anomalySignal?.includes("Anomaly")) {
          densityMap[category].anomalies += 1;
        }
      });
  
      console.table(densityMap);
      return densityMap;
    }
  
    function renderAnomalyDensityChart() {
      const density = computeAnomalyDensity();
      const labels = Object.keys(density);
      const anomalyRates = labels.map(cat => {
        const data = density[cat];
        return ((data.anomalies / data.total) * 100).toFixed(1);
      });
  
      const ctx = document.getElementById("anomalyDensityChart").getContext("2d");
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Anomaly Rate (%)',
            data: anomalyRates,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
    }
  
    return {
      computeAnomalyDensity,
      renderAnomalyDensityChart
    };
  
  })();