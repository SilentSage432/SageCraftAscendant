// === NeuralRegistrySeed.js — Unified Permanent Orbit Definitions ===


// Phase 16002 — Global Registry Binding Correction
window.__NeuralGlobalOrbitStore__ = window.__NeuralGlobalOrbitStore__ || {};
const orbits = window.__NeuralGlobalOrbitStore__;

// Phase 16006 — Neural Registry Persistence Layer (Fully Integrated)
const NeuralRegistryPersistence = (function () {
  const STORAGE_KEY = 'neural_orbit_registry';

  function saveRegistry(orbits) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orbits));
      console.log("💾 Neural Orbit Registry Saved.");
    } catch (err) {
      console.error("❌ Failed to save orbit registry:", err);
    }
  }

  function loadRegistry() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("💾 Neural Orbit Registry Loaded:", parsed);
        return parsed;
      }
    } catch (err) {
      console.error("❌ Failed to load orbit registry:", err);
    }
    return null;
  }

  function clearRegistry() {
    localStorage.removeItem(STORAGE_KEY);
    console.log("🧹 Neural Orbit Registry Cleared.");
  }

  return {
    saveRegistry,
    loadRegistry,
    clearRegistry
  };
})();

window.NeuralRegistrySeedBootstrap = function() {
  window.NeuralOrbitRegistry = {
    registry: orbits,

    registerOrbit(key, label, modules, icon) {
      this.registry[key] = { panelId: key, label, icon, modules };
    },

    listOrbits() {
      return this.registry;
    }
  };

  // Load persisted registry if available
  const persisted = NeuralRegistryPersistence.loadRegistry();
  if (persisted) {
    Object.assign(window.NeuralOrbitRegistry.registry, persisted);
  }

  console.log("🌐 Seeding Neural Orbit Registry...");

  const N = window.NeuralOrbitRegistry;

  if (Object.keys(N.listOrbits()).length === 0) {
    N.registerOrbit('auditModules', 'Audit Modules', [], 'icon-audit.png');
    N.registerOrbit('deltaAnalyzer', 'Delta Analyzer', [], 'icon-delta.png');
    N.registerOrbit('reportingHub', 'Reporting Hub', [], 'icon-report.png');
    N.registerOrbit('utilityHub', 'Utility Hub', [], 'icon-utility.png');
    N.registerOrbit('controlPanel', 'Control Panel', [], 'icon-control.png');
    N.registerOrbit('masterExport', 'Master Export', [], 'icon-export.png');
    N.registerOrbit('sessionManager', 'Session Manager', [], 'icon-session.png');
    N.registerOrbit('mappingManager', 'Mapping Manager', [], 'icon-mapping.png');
    N.registerOrbit('advancedTools', 'Advanced Tools', [], 'icon-advanced.png');
    N.registerOrbit('auditRotation', 'Audit Rotation', [], 'icon-rotation.png');
    N.registerOrbit('configPanel', 'Config Panel', [], 'icon-config.png');
    N.registerOrbit('operatorConsole', 'Operator Console', [], 'icon-console.png');
    N.registerOrbit('diagnostics', 'Diagnostics', [], 'icon-diagnostics.png');
    N.registerOrbit('dropbox', 'Dropbox', [], 'icon-dropbox.png');
    N.registerOrbit('forecast', 'Forecast Cortex', [], 'icon-forecast.png');
    N.registerOrbit('policyControl', 'Governance Policy Control', [], 'icon-policy.png');
    N.registerOrbit('auditExceptions', 'Audit Exception Manager', [], 'icon-exceptions.png');
    N.registerOrbit('progressDashboard', 'Audit Progress Dashboard', [], 'icon-progress.png');
    N.registerOrbit('liveCounts', 'Live Count Dashboard', [], 'icon-livecount.png');
  }

  console.log("✅ Neural Orbit Registry Unified Seed Complete.");
}

// Phase 17000 — Dynamic Neural Orbit Injection
window.injectDynamicOrbit = function (orbitKey, orbitName, orbitDependencies, orbitIcon) {
    if (!window.NeuralOrbitRegistry) {
        console.error("❌ NeuralOrbitRegistry not available.");
        return;
    }

    if (window.NeuralOrbitRegistry.listOrbits().hasOwnProperty(orbitKey)) {
        console.warn(`⚠️ Orbit "${orbitKey}" already exists.`);
        return;
    }

    window.NeuralOrbitRegistry.registerOrbit(orbitKey, orbitName, orbitDependencies, orbitIcon);
    console.log(`✅ Orbit "${orbitName}" injected into registry.`);

    if (window.NeuralOrbitalDockMesh?.renderOrbitalDock) {
        NeuralOrbitalDockMesh.renderOrbitalDock();
        console.log("✅ Orbital Dock refreshed post-injection.");
    }

    NeuralRegistryPersistence.saveRegistry(window.NeuralOrbitRegistry.registry);
};

// Modified Bootstrap Logic — Phase 16000
document.addEventListener("DOMContentLoaded", () => {
    NeuralRegistrySeedBootstrap();
    window.dispatchEvent(new Event('NeuralRegistryReady'));
});