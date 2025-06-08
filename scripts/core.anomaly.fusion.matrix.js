// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v4.8
// Subsystem: Anomaly Fusion Matrix

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.AnomalyFusionMatrix = (function() {

  function runFusionMatrix() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      alert("⚠ Forecast cortex memory unavailable.");
      return;
    }

    let flagged = [];

    cortex.forEach(record => {
      const { stabilityHint, riskSignal, anomalySignal, division } = record;
      let fusionScore = 0;

      // Scoring logic — multi-dimensional fusion
      if (stabilityHint === "Volatile") fusionScore += 2;
      if (riskSignal !== "🟢 Stable") fusionScore += 1.5;
      if (anomalySignal !== "⚪ Unanalyzed") fusionScore += 1.5;

      // Category surge amplifier (training wheels for deeper AI)
      const categoryCount = cortex.filter(r => r.division === division).length;
      if (categoryCount > (cortex.length * 0.3)) fusionScore += 1;

      // Record flagged if fusion score exceeds threshold
      if (fusionScore >= 3.5) {
        flagged.push({ division, fusionScore: fusionScore.toFixed(1) });
      }
    });

    let output = `🔬 Anomaly Fusion Matrix Report\n\n`;
    output += `Total Cortex Records: ${cortex.length}\n`;
    output += `Records Flagged: ${flagged.length}\n\n`;

    if (flagged.length > 0) {
      const divisionMap = {};
      flagged.forEach(f => {
        divisionMap[f.division] = (divisionMap[f.division] || 0) + 1;
      });

      Object.entries(divisionMap).forEach(([div, count]) => {
        output += `• ${div}: ${count} fusion anomalies\n`;
      });
    } else {
      output += "✅ No fusion anomalies detected.";
    }

    alert(output);
  }

  return {
    runFusionMatrix
  };

})();