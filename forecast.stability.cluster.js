// Phase 7.7 — Neural Forecast Stability Cluster Module
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastStabilityCluster = (function () {

  function computeStabilityClusters() {
    const cortex = window.NeuralForecastMemoryCortex?.getForecastHistory?.() || [];

    if (cortex.length === 0) {
      alert("⚠ Cortex memory is empty.");
      return;
    }

    const clusterMap = cortex.reduce((acc, record) => {
      const key = record.division || "Unknown";
      if (!acc[key]) {
        acc[key] = { total: 0, stable: 0, volatile: 0 };
      }
      acc[key].total += 1;
      if (record.stabilityHint === "Stable") {
        acc[key].stable += 1;
      } else {
        acc[key].volatile += 1;
      }
      return acc;
    }, {});

    console.log("🧠 Stability Cluster Map:", clusterMap);

    let report = "📊 Forecast Stability Clusters:\n\n";
    Object.entries(clusterMap).forEach(([division, stats]) => {
      const stabilityRate = ((stats.stable / stats.total) * 100).toFixed(1);
      report += `${division}: ${stabilityRate}% stable (${stats.stable}/${stats.total})\n`;
    });

    alert(report);
  }

  return {
    computeStabilityClusters
  };

})();