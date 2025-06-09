

// === Phase 1700 — Sovereign Neural Command Bus Core Initialization ===

class NeuralBus {
  constructor() {
    this.routes = {};
    console.log("🧠 NeuralBus initialized.");
  }

  register(route, handler) {
    if (!this.routes[route]) {
      this.routes[route] = [];
    }
    this.routes[route].push(handler);
    console.log(`✅ Registered handler for route: ${route}`);
  }

  dispatch(route, payload = {}) {
    const handlers = this.routes[route];
    if (handlers && handlers.length) {
      console.log(`🚀 Dispatching route: ${route} with payload:`, payload);
      handlers.forEach(handler => handler(payload));
    } else {
      console.warn(`⚠ No handlers found for route: ${route}`);
    }
  }
}

// Expose globally to Sovereign Mesh
window.SovereignBus = new NeuralBus();