// Phase 7.0 — Self-Healing Forecast Memory Engine
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastMemoryHealer = (function () {

  const defaultForecastTemplate = {
    timestamp: new Date().toISOString(),
    itemNumber: "UNKNOWN",
    division: "Uncategorized",
    onHandUnits: 0,
    cycleCountUnits: 0,
    shrinkUnits: 0,
    itdSalesUnits: 0,
    stabilityHint: "Unknown",
    riskSignal: "⚪ Undefined",
    anomalySignal: "⚪ Undefined"
  };

  function healForecastRecord(record) {
    let healed = { ...defaultForecastTemplate };
    let modified = false;

    for (let field in defaultForecastTemplate) {
      if (record[field] !== undefined) {
        healed[field] = record[field];
      } else {
        modified = true;
        console.warn(`🛠 Healing: Missing field '${field}', default applied.`);
      }
    }

    // Attempt safe type conversions:
    ["onHandUnits", "cycleCountUnits", "shrinkUnits", "itdSalesUnits"].forEach(field => {
      if (typeof healed[field] === "string") {
        healed[field] = parseInt(healed[field]) || 0;
        modified = true;
        console.warn(`🛠 Healing: Coerced '${field}' to number.`);
      }
    });

    if (modified) {
      console.log("🧬 Forecast record healed:", healed);
    }

    return healed;
  }

  return { healForecastRecord };

})();