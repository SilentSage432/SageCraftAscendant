// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v4.5
// Subsystem: Hazard Deflection Scaffold

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.HazardDeflection = (function() {

  function analyzeHazards() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      alert("⚠ Cortex memory unavailable.");
      return;
    }

    let volatileRecords = cortex.filter(entry => entry.stabilityHint === "Volatile");
    let highRiskCategories = {};

    volatileRecords.forEach(entry => {
      highRiskCategories[entry.division] = (highRiskCategories[entry.division] || 0) + 1;
    });

    let output = "🚩 Hazard Deflection Scan Results\n\n";
    output += `Total Volatile Records: ${volatileRecords.length}\n\n`;

    Object.entries(highRiskCategories).forEach(([category, count]) => {
      const percent = ((count / cortex.length) * 100).toFixed(1);
      output += `⚠ ${category}: ${count} volatile records (${percent}%)\n`;

      if (percent >= 25) {
        output += "❗ HIGH RISK: Preemptive mitigation advised.\n";
      }
    });

    if (volatileRecords.length === 0) {
      output += "\n✅ No emerging hazard signals detected.";
    }

    alert(output);
  }

  return {
    analyzeHazards
  };

})();