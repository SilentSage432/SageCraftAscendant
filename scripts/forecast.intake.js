// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.1
// Subsystem: Forecast Intake Synchronizer

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastIntake = (function() {

  function processIntakeRecord(itemNumber, division, qty = 1, tags = {}) {
    const forecastEntry = {
      timestamp: new Date().toISOString(),
      itemNumber,
      division,
      onHandUnits: qty,
      cycleCountUnits: 0,
      shrinkUnits: 0,
      itdSalesUnits: 0,
      stabilityHint: tags.stabilityHint || "Stable",
      riskSignal: tags.riskSignal || "🟢 Stable",
      anomalySignal: tags.anomalySignal || "⚪ Unanalyzed",
      metaTags: tags
    };

    SageCraftAscendant.ForecastCortex?.injectForecastRecord(forecastEntry);
    console.log("📊 Intake Synchronized:", forecastEntry);
  }

  function importBulkRecords(records) {
    if (!Array.isArray(records)) {
      console.error("❌ Invalid intake bulk records.");
      return;
    }

    records.forEach(entry => {
      const { itemNumber, division, onHandUnits, tags = {} } = entry;
      processIntakeRecord(itemNumber, division, onHandUnits, tags);
    });

    console.log(`✅ Bulk Intake Synchronization Complete: ${records.length} records processed.`);
  }

  return {
    processIntakeRecord,
    importBulkRecords
  };

})();