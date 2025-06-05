// === NeuralRegistrySeed.js — Unified Permanent Orbit Definitions ===

window.NeuralOrbitRegistry = (function() {
  const registry = {};

  function registerOrbit(key, label, modules, icon) {
    registry[key] = { panelId: key, label, icon, modules };
  }

  function listOrbits() {
    return registry;
  }

  // Begin Seeding Orbits
  console.log("🌐 Seeding Neural Orbit Registry...");

  registerOrbit('auditModules', 'Audit Modules', [], 'icon-audit.png');
  registerOrbit('deltaAnalyzer', 'Delta Analyzer', [], 'icon-delta.png');
  registerOrbit('reportingHub', 'Reporting Hub', [], 'icon-report.png');
  registerOrbit('utilityHub', 'Utility Hub', [], 'icon-utility.png');
  registerOrbit('controlPanel', 'Control Panel', [], 'icon-control.png');
  registerOrbit('masterExport', 'Master Export', [], 'icon-export.png');
  registerOrbit('sessionManager', 'Session Manager', [], 'icon-session.png');
  registerOrbit('mappingManager', 'Mapping Manager', [], 'icon-mapping.png');
  registerOrbit('advancedTools', 'Advanced Tools', [], 'icon-advanced.png');
  registerOrbit('auditRotation', 'Audit Rotation', [], 'icon-rotation.png');
  registerOrbit('configPanel', 'Config Panel', [], 'icon-config.png');
  registerOrbit('operatorConsole', 'Operator Console', [], 'icon-console.png');
  registerOrbit('diagnostics', 'Diagnostics', [], 'icon-diagnostics.png');
  registerOrbit('dropbox', 'Dropbox', [], 'icon-dropbox.png');
  registerOrbit('forecast', 'Forecast Cortex', [], 'icon-forecast.png');
  registerOrbit('policyControl', 'Governance Policy Control', [], 'icon-policy.png');
  registerOrbit('auditExceptions', 'Audit Exception Manager', [], 'icon-exceptions.png');
  registerOrbit('progressDashboard', 'Audit Progress Dashboard', [], 'icon-progress.png');
  registerOrbit('liveCounts', 'Live Count Dashboard', [], 'icon-livecount.png');

  console.log("✅ Neural Orbit Registry Unified Seed Complete.");

  return { registerOrbit, listOrbits };

})();

window.NeuralOrbitRegistry = window.NeuralOrbitRegistry || {};
Object.assign(window.NeuralOrbitRegistry, (function() {
  const registry = {};

  function registerOrbit(key, label, modules, icon) {
    registry[key] = { panelId: key, label, icon, modules };
  }

  function listOrbits() {
    return registry;
  }

  // Begin Seeding Orbits
  console.log("🌐 Seeding Neural Orbit Registry...");

  registerOrbit('auditModules', 'Audit Modules', [], 'icon-audit.png');
  registerOrbit('deltaAnalyzer', 'Delta Analyzer', [], 'icon-delta.png');
  registerOrbit('reportingHub', 'Reporting Hub', [], 'icon-report.png');
  registerOrbit('utilityHub', 'Utility Hub', [], 'icon-utility.png');
  registerOrbit('controlPanel', 'Control Panel', [], 'icon-control.png');
  registerOrbit('masterExport', 'Master Export', [], 'icon-export.png');
  registerOrbit('sessionManager', 'Session Manager', [], 'icon-session.png');
  registerOrbit('mappingManager', 'Mapping Manager', [], 'icon-mapping.png');
  registerOrbit('advancedTools', 'Advanced Tools', [], 'icon-advanced.png');
  registerOrbit('auditRotation', 'Audit Rotation', [], 'icon-rotation.png');
  registerOrbit('configPanel', 'Config Panel', [], 'icon-config.png');
  registerOrbit('operatorConsole', 'Operator Console', [], 'icon-console.png');
  registerOrbit('diagnostics', 'Diagnostics', [], 'icon-diagnostics.png');
  registerOrbit('dropbox', 'Dropbox', [], 'icon-dropbox.png');
  registerOrbit('forecast', 'Forecast Cortex', [], 'icon-forecast.png');
  registerOrbit('policyControl', 'Governance Policy Control', [], 'icon-policy.png');
  registerOrbit('auditExceptions', 'Audit Exception Manager', [], 'icon-exceptions.png');
  registerOrbit('progressDashboard', 'Audit Progress Dashboard', [], 'icon-progress.png');
  registerOrbit('liveCounts', 'Live Count Dashboard', [], 'icon-livecount.png');

  console.log("✅ Neural Orbit Registry Unified Seed Complete.");

  return { registerOrbit, listOrbits };

})());