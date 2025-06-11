// 💓 MeshVitals — Companion Heartbeat Tracker
// Pings all registered components to confirm they're alive

(function () {
  const registered = {};
  const heartbeatInterval = 5000; // Every 5 seconds

  // Register a module with a unique name and ping callback
  function register(name, pingCallback) {
    registered[name] = {
      lastSeen: Date.now(),
      ping: pingCallback,
    };
    console.log(`🫀 MeshVitals: Registered ${name}`);
  }

  // Start ping loop
  function startHeartbeat() {
    setInterval(() => {
      const now = Date.now();
      for (const name in registered) {
        try {
          registered[name].ping(() => {
            registered[name].lastSeen = now;
          });
        } catch (e) {
          console.warn(`⚠️ ${name} failed to respond to ping.`);
        }
      }

      // Check for unresponsive modules
      for (const name in registered) {
        const diff = now - registered[name].lastSeen;
        if (diff > heartbeatInterval * 2) {
          console.error(`💔 ${name} missed heartbeat — last seen ${diff / 1000}s ago`);
        }
      }
    }, heartbeatInterval);
  }

  // Expose globally
  window.MeshVitals = {
    register,
    startHeartbeat,
  };
})();
