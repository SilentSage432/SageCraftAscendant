// === NeuralRegistrySeed.js — Unified Permanent Orbit Definitions ===

window.NeuralRegistrySeedBootstrap = function() {
  window.NeuralOrbitRegistry = {
    registry: {},

    registerOrbit(key, label, modules, icon) {
      this.registry[key] = { panelId: key, label, icon, modules };
    },

    listOrbits() {
      return this.registry;
    }
  };

  console.log("🌐 Seeding Neural Orbit Registry...");

  const N = window.NeuralOrbitRegistry;
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

  console.log("✅ Neural Orbit Registry Unified Seed Complete.");
}

// Modified Bootstrap Logic — Phase 16000
document.addEventListener("DOMContentLoaded", () => {
    NeuralRegistrySeedBootstrap();
    window.dispatchEvent(new Event('NeuralRegistryReady'));
});