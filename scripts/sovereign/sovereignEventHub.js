// === Phase 338.0 — Sovereign Listener Network Initialization ===
console.log("🌐 Sovereign Event Hub Online");

export const SovereignEventHub = {
  listeners: {},

  register(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
      document.addEventListener(event, (e) => {
        this.listeners[event].forEach((cb) => cb(e.detail));
      });
    }
    this.listeners[event].push(callback);
    console.log(`🛰️ Registered listener for ${event}`);
  },

  dispatch(event, detail = {}) {
    const evt = new CustomEvent(event, { detail });
    document.dispatchEvent(evt);
    console.log(`📡 Dispatched sovereign event: ${event}`, detail);
  },

  listen(event, callback) {
    this.register(event, callback);
  },

  remove(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    console.log(`❌ Removed listener from ${event}`);
  }
};

// Example usage stub (to be removed or uncommented for diagnostics)
// SovereignEventHub.register("sovereign:test", (payload) => {
//   console.log("⚙️ Sovereign test received:", payload);
// });

// SovereignEventHub.dispatch("sovereign:test", { msg: "It works!" });