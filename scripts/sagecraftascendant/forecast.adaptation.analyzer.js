// Phase 7.6 — Neural Adaptation Analyzer Panel
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastAdaptationAnalyzer = (function() {

  function analyzeAdaptationResults() {
    const cortex = window.NeuralForecastMemoryCortex?.getForecastHistory?.() || [];
    if (cortex.length === 0) {
      alert("⚠ Forecast Cortex is empty.");
      return;
    }

    const summary = cortex.reduce((acc, record) => {
      const signal = record.adaptiveSignal || "🔘 Uncalculated";
      acc[signal] = (acc[signal] || 0) + 1;
      return acc;
    }, {});

    console.log("🧬 Adaptation Summary:", summary);

    let report = "📊 Adaptation Pattern Summary:\n\n";
    Object.entries(summary).forEach(([signal, count]) => {
      report += `${signal} → ${count} records\n`;
    });

    alert(report);
  }

  return {
    analyzeAdaptationResults
  };

})();