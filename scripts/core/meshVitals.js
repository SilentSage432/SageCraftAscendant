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

      if (window.SignalMesh?.broadcast) {
        window.SignalMesh.broadcast({
          target: "Sage",
          payload: {
            type: "heartbeat",
            timestamp: new Date().toISOString(),
            source: "MeshVitals"
          }
        });
        window.MeshVitals.lastHeartbeat = Date.now();
        // Optional: trigger companion glow effects
        for (const name in window.CompanionMesh) {
          const el = document.getElementById(`companion-${name}`);
          if (el) {
            el.classList.add("pulse");
            setTimeout(() => el.classList.remove("pulse"), 600);
          }
        }
        console.log("🫀 MeshVitals broadcasted heartbeat.");
      }
    }, heartbeatInterval);
  }

  // SovereignBus Test Emit (Whisperer Console Injection)
  if (window.SovereignBus?.emit) {
    setInterval(() => {
      window.SovereignBus.emit("whispererVitals", {
        signalStrength: Math.floor(Math.random() * 10) + 90,
        uptime: Math.floor(Math.random() * 100),
        drift: (Math.random() * 0.1).toFixed(3),
        integrity: (Math.random() * 5 + 95).toFixed(2),
        threads: Math.floor(Math.random() * 10 + 1),
        source: "MeshVitals"
      });
    }, 6000); // emit every 6 seconds
  }

  // 🧠 Phase 400.1 — Sovereign Diagnostic Relay Subsystem
  if (window.SovereignBus?.registerFeedback) {
    window.SovereignBus.registerFeedback("meshVitals", (payload) => {
      console.log(`🧠 Feedback received by MeshVitals:`, payload);

      if (payload?.action === "runMeshDiagnostic") {
        console.log("🔍 Running MeshVitals diagnostic...");
        const diagnostics = Object.entries(registered).map(([name, entry]) => ({
          module: name,
          lastSeen: new Date(entry.lastSeen).toLocaleTimeString(),
          responsive: Date.now() - entry.lastSeen < heartbeatInterval * 2
        }));

        window.SovereignBus.emit("meshVitalsDiagnostics", {
          diagnostics,
          timestamp: new Date().toISOString(),
          source: "MeshVitals"
        });

        console.log("📡 meshVitalsDiagnostics emitted.");
      }
    });
  }

  // Expose globally
  window.MeshVitals = {
    register,
    startHeartbeat,
  };

  window.MeshVitals.lastHeartbeat = null;

  // 🧭 Phase 17004 — Dock Grid Mapping Resolver
  window.SovereignDockValidator = {
    scanDockMappings() {
      const buttons = document.querySelectorAll('button[data-panel]');
      const missingPanels = [];

      buttons.forEach(btn => {
        const panelSelector = btn.getAttribute('data-panel');
        const panelEl = document.querySelector(panelSelector);
        if (!panelEl) {
          missingPanels.push(panelSelector);
        }
      });

      if (missingPanels.length > 0) {
        console.warn("⚠️ Unresolved Dock Panel Mappings:", missingPanels);
      } else {
        console.log("✅ All dock panel mappings resolved.");
      }
    }
  };

  // Optional: run once on load
  setTimeout(() => {
    window.SovereignDockValidator.scanDockMappings();
  }, 1000);
})();
