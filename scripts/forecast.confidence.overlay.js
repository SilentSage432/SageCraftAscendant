// Phase 7.4 — Neural Forecast Confidence Overlay

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastConfidenceOverlay = (function () {

  function computeConfidenceOverlay() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();

    if (!cortex || cortex.length === 0) {
      alert("⚠ No forecast data available for confidence overlay.");
      return;
    }

    const confidenceMap = cortex.map(record => {
      let score = 100;

      if (record.stabilityHint === "Volatile") {
        score -= 25;
      }

      if (record.anomalySignal?.includes("Anomaly")) {
        score -= 15;
      }

      // Recency: newer records weigh higher confidence
      const recordDate = new Date(record.timestamp);
      const now = new Date();
      const ageDays = Math.floor((now - recordDate) / (1000 * 60 * 60 * 24));
      score -= Math.min(ageDays, 30); // max penalty after 30 days

      return {
        itemNumber: record.itemNumber,
        category: record.division,
        confidence: Math.max(score, 0)
      };
    });

    console.table(confidenceMap);
    return confidenceMap;
  }

  function renderConfidenceChart() {
    const confidenceData = computeConfidenceOverlay();
    if (!confidenceData || confidenceData.length === 0) return;

    const labels = confidenceData.map(r => `${r.itemNumber} (${r.category})`);
    const scores = confidenceData.map(r => r.confidence);

    const ctx = document.getElementById("forecastConfidenceChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Forecast Confidence (%)",
          data: scores,
          backgroundColor: scores.map(s => s >= 75 ? "rgba(0,255,0,0.6)" : s >= 50 ? "rgba(255,165,0,0.6)" : "rgba(255,0,0,0.6)")
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Neural Forecast Confidence Overlay"
          }
        }
      }
    });
  }

  return {
    renderConfidenceChart
  };

})();