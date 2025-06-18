

// 🧠 panel.registry.js — Central Registry for Sovereign Dock Panels

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

window.SageCraftAscendant = window.SageCraftAscendant || {};
window.SageCraftAscendant.PanelRegistry = PanelRegistry;