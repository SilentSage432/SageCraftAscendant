// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.0
// Subsystem: Forecast Memory Cortex

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastCortex = (function() {
  let forecastMemory = [];

  function injectForecastRecord(record) {
    // Phase 7.0 — Apply Self-Healing Forecast Memory Engine before ingestion
    const healedRecord = SageCraftAscendant.ForecastMemoryHealer.healForecastRecord(record);

    // Phase 7.1 — Apply Forecast Validation Sentinel after healing
    SageCraftAscendant.ForecastValidationSentinel.validateForecastRecord(healedRecord);

    forecastMemory.push(healedRecord);
    console.log("🧠 Forecast Record Injected:", healedRecord);

    if (window.SovereignBus) {
      window.SovereignBus.emit("whispererVitals", {
        source: "ForecastCortex",
        type: "forecastRecord",
        payload: healedRecord
      });
    }

    // Auto-run injection hooks
    if (typeof onInjectionHook === "function") {
      onInjectionHook(healedRecord);
    }
  }

  function getForecastHistory() {
    return [...forecastMemory];
  }

  function clearForecastHistory() {
    forecastMemory = [];
    console.log("🧹 Forecast Memory Cleared.");
  }

  function exportForecastToJson() {
    return JSON.stringify(forecastMemory, null, 2);
  }

  function importForecastFromJson(json) {
    try {
      const data = JSON.parse(json);
      if (Array.isArray(data)) {
        forecastMemory = data;
        console.log("📥 Forecast Memory Imported.");
      }
    } catch (err) {
      console.error("❌ Failed to import forecast memory:", err);
    }
  }

  // Optional hook registration (for other modules to listen to injection)
  let onInjectionHook = null;
  function addInjectionHook(hookFn) {
    onInjectionHook = hookFn;
  }

  return {
    injectForecastRecord,
    getForecastHistory,
    clearForecastHistory,
    exportForecastToJson,
    importForecastFromJson,
    addInjectionHook
  };
})();