// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.3
// Subsystem: Persistence Registry

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.PersistenceRegistry = (function() {

  const STORAGE_KEY = "SageCraftAscendant_OrbitRegistry";

  function saveRegistry(registryData) {
    try {
      const jsonData = JSON.stringify(registryData);
      localStorage.setItem(STORAGE_KEY, jsonData);
      console.log("💾 Registry saved.");
    } catch (err) {
      console.error("❌ Failed to save registry:", err);
    }
  }

  function loadRegistry() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        console.warn("⚠ No saved registry found.");
        return {};
      }
      const parsed = JSON.parse(data);
      console.log("🔄 Registry loaded.");
      return parsed;
    } catch (err) {
      console.error("❌ Failed to load registry:", err);
      return {};
    }
  }

  function clearRegistry() {
    localStorage.removeItem(STORAGE_KEY);
    console.log("🧹 Registry cleared from storage.");
  }

  return {
    saveRegistry,
    loadRegistry,
    clearRegistry
  };
})();