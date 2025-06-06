// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.0
// Subsystem: Forecast Memory Cortex

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastCortex = (function() {
  let forecastMemory = [];

  function injectForecastRecord(record) {
    forecastMemory.push(record);
    console.log("🧠 Forecast Record Injected:", record);

    // Auto-run injection hooks
    if (typeof onInjectionHook === "function") {
      onInjectionHook(record);
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