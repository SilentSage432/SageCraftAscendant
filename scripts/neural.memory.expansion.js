

// === SageCraft Ascendant: Phase 14.0 — Neural Memory Expansion Layer ===

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.NeuralMemoryExpansion = (function () {

  const _memoryStore = {
    eventLog: [],
    anomalyLog: [],
    controlState: {}
  };

  function saveCurrentState() {
    try {
      _memoryStore.eventLog = SageCraftAscendant.NeuralEventLogger?.getLog() || [];
      _memoryStore.anomalyLog = SageCraftAscendant.NeuralForecastAnomalySentinel?.getAnomalies() || [];
      _memoryStore.controlState = {}; // Placeholder for future control lattice states

      const serialized = JSON.stringify(_memoryStore);
      localStorage.setItem('SageCraftCodexMemory', serialized);
      console.log("💾 Neural Memory Snapshot Saved.");
    } catch (err) {
      console.error("❌ Failed to save neural memory:", err);
    }
  }

  function loadLastState() {
    try {
      const serialized = localStorage.getItem('SageCraftCodexMemory');
      if (!serialized) {
        console.warn("⚠ No previous neural memory found.");
        return;
      }
      const parsed = JSON.parse(serialized);
      console.log("🔄 Neural Memory Loaded:", parsed);
      return parsed;
    } catch (err) {
      console.error("❌ Failed to load neural memory:", err);
    }
  }

  function clearMemory() {
    localStorage.removeItem('SageCraftCodexMemory');
    console.warn("🧹 Neural Memory Cleared.");
  }

  return {
    saveCurrentState,
    loadLastState,
    clearMemory
  };

})();