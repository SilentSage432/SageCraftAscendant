// Phase 10.1 — Dock Persistence Restoration Layer

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.DockPersistence = (function () {
  
  const STORAGE_KEY = 'SageCraftAscendant_OrbitalRegistry';

  function saveRegistry(registry) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registry));
      console.log("💾 Orbital Registry Saved.");
    } catch (err) {
      console.error("❌ Failed to save registry:", err);
    }
  }

  function loadRegistry() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        console.log("📭 No persisted registry found.");
        return {};
      }
      const parsed = JSON.parse(stored);
      console.log("🔄 Loaded persisted registry:", parsed);
      return parsed;
    } catch (err) {
      console.error("❌ Failed to load registry:", err);
      return {};
    }
  }

  function restoreDock() {
    const persisted = loadRegistry();
    window.NeuralOrbitRegistry = {
      registry: persisted,
      registerOrbit(key, label, modules, icon) {
        this.registry[key] = { panelId: key, label, icon, modules };
        saveRegistry(this.registry);
      },
      listOrbits() {
        return this.registry;
      }
    };

    if (SageCraftAscendant?.DynamicOrbitalDock?.renderDynamicDock) {
      SageCraftAscendant.DynamicOrbitalDock.renderDynamicDock();
    }
    console.log("🚀 Neural Dock restored from persisted registry.");
  }

  return {
    saveRegistry,
    loadRegistry,
    restoreDock
  };

})();