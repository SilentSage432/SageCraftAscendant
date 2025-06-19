// 🧠 panel.registry.js — Central Registry for Sovereign Dock Panels
import '../panels/scriptConsole.panel.js';

const PanelRegistry = (function () {
  const _registry = {};

  return {
    register: function (id, config) {
      if (!id || typeof id !== "string") {
        console.warn("⚠️ Panel ID must be a non-empty string.");
        return;
      }
      _registry[id] = config || {};
      console.log(`📌 Registered panel: ${id}`, config);
    },

    get: function (id) {
      return _registry[id] || null;
    },

    getAll: function () {
      return { ..._registry };
    },

    has: function (id) {
      return Object.prototype.hasOwnProperty.call(_registry, id);
    }
  };
})();

PanelRegistry.register("loreEngineConsole", {
  title: "Lore Engine",
  id: "loreEngine",
  class: "panel lore-engine-console",
  inject: true,
  domElementId: "loreEngineConsole"
});

PanelRegistry.register("sageFeedConsole", {
  title: "Sage Feed",
  id: "sageFeedConsole",
  class: "panel sage-feed-console",
  inject: true,
  domElementId: "sageFeedConsoleWrapper"
});

window.SageCraftAscendant = window.SageCraftAscendant || {};
window.SageCraftAscendant.PanelRegistry = PanelRegistry;