

// registry.editor.js — SageCraft Ascendant Editor Registry
// 🧠 Initialized for editor subsystem registration and bindings

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.EditorRegistry = {
  initialized: false,
  editors: {},

  registerEditor: function (editorId, config) {
    if (!editorId || !config) {
      console.warn("⚠️ EditorRegistry: Invalid registration attempt.");
      return;
    }
    this.editors[editorId] = config;
    console.log(`✅ EditorRegistry: Registered editor → ${editorId}`);
  },

  getEditor: function (editorId) {
    return this.editors[editorId] || null;
  },

  initialize: function () {
    if (this.initialized) {
      console.warn("⚠️ EditorRegistry already initialized.");
      return;
    }
    this.initialized = true;
    console.log("🧠 EditorRegistry initialized.");
  }
};

// Auto-initialize when script loads
SageCraftAscendant.EditorRegistry.initialize();