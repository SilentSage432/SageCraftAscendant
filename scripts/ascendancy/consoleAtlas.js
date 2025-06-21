// consoleAtlas.js
// 📍 Sovereign Console Atlas — Panel Mapping & Trace Registry

export const consoleAtlas = {
  registeredConsoles: new Map(),

  register(id, metadata = {}) {
    if (!this.registeredConsoles.has(id)) {
      this.registeredConsoles.set(id, {
        id,
        metadata,
        timestamp: Date.now(),
      });
      console.log(`🧭 Console "${id}" registered in Atlas.`);
    } else {
      console.warn(`⚠️ Console "${id}" is already registered.`);
    }
  },

  registerPanel(id, element) {
    this.register(id, { domElement: element });
  },

  get(id) {
    return this.registeredConsoles.get(id) || null;
  },

  getAll() {
    return Array.from(this.registeredConsoles.values());
  },

  logAtlas() {
    console.table(this.getAll());
  },

  clear() {
    this.registeredConsoles.clear();
    console.log("🧹 Console Atlas cleared.");
  }
};


export function getActiveConsoles() {
  return consoleAtlas.getAll().filter(entry => entry.metadata?.active);
}

export function getConsolePanels() {
  return consoleAtlas.getAll()
    .map(entry => entry.metadata?.domElement)
    .filter(el => el instanceof HTMLElement);
}

export function getAllConsolePanels() {
  return consoleAtlas.getAll();
}

export function getActivePanels() {
  return consoleAtlas.getAll().filter(entry => entry.metadata?.domElement instanceof HTMLElement);
}