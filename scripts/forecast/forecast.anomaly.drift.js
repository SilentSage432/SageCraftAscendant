// scripts/sagecraft/forecast.anomaly.drift.js

export const AnomalyDriftSentinel = (() => {

    function computeAnomalyDriftOverTime() {
      const cortex = window.NeuralForecastMemoryCortex?.getForecastHistory?.();
      if (!cortex || cortex.length === 0) {
        console.warn("SCAN::AnomalyDriftSentinel >> Cortex memory empty.");
        return [];
      }
  
      // Sort cortex memory by timestamp
      const sorted = [...cortex].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
      // Build drift data: track anomaly count across time
      const driftData = {};
      sorted.forEach(entry => {
        const timeKey = entry.timestamp.substring(0, 10);  // YYYY-MM-DD
        if (!driftData[timeKey]) {
          driftData[timeKey] = { total: 0, anomalies: 0 };
        }
        driftData[timeKey].total += 1;
        if (entry.anomalySignal?.includes("Anomaly")) {
          driftData[timeKey].anomalies += 1;
        }
      });
  
      const timeline = Object.keys(driftData).sort();
      const driftPoints = timeline.map(date => {
        const { total, anomalies } = driftData[date];
        const rate = ((anomalies / total) * 100).toFixed(1);
        return { date, rate };
      });
  
      console.table(driftPoints);
      return driftPoints;
    }
  
    function renderAnomalyDriftChart() {
      const driftPoints = computeAnomalyDriftOverTime();
      if (driftPoints.length === 0) {
        alert("No anomaly drift data to display.");
        return;
      }
  
      const labels = driftPoints.map(p => p.date);
      const rates = driftPoints.map(p => p.rate);
  
      const ctx = document.getElementById("anomalyDriftChart").getContext("2d");
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Anomaly Drift (%)',
            data: rates,
            backgroundColor: 'rgba(255, 165, 0, 0.4)',
            borderColor: 'rgba(255, 165, 0, 1)',
            borderWidth: 2,
            tension: 0.2
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
      computeAnomalyDriftOverTime,
      renderAnomalyDriftChart
    };
  
  })();