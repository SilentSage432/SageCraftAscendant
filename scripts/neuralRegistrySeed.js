// === NeuralRegistrySeed.js — Unified Permanent Orbit Definitions ===

(function registerAllOrbits() {
    console.log("🌐 Seeding Neural Orbit Registry...");
  
    NeuralOrbitRegistry.registerOrbit('auditModules', 'Audit Modules', [], 'icon-audit.png');
    NeuralOrbitRegistry.registerOrbit('deltaAnalyzer', 'Delta Analyzer', [], 'icon-delta.png');
    NeuralOrbitRegistry.registerOrbit('reportingHub', 'Reporting Hub', [], 'icon-report.png');
    NeuralOrbitRegistry.registerOrbit('utilityHub', 'Utility Hub', [], 'icon-utility.png');
    NeuralOrbitRegistry.registerOrbit('controlPanel', 'Control Panel', [], 'icon-control.png');
    NeuralOrbitRegistry.registerOrbit('masterExport', 'Master Export', [], 'icon-export.png');
    NeuralOrbitRegistry.registerOrbit('sessionManager', 'Session Manager', [], 'icon-session.png');
    NeuralOrbitRegistry.registerOrbit('mappingManager', 'Mapping Manager', [], 'icon-mapping.png');
    NeuralOrbitRegistry.registerOrbit('advancedTools', 'Advanced Tools', [], 'icon-advanced.png');
    NeuralOrbitRegistry.registerOrbit('auditRotation', 'Audit Rotation', [], 'icon-rotation.png');
    NeuralOrbitRegistry.registerOrbit('configPanel', 'Config Panel', [], 'icon-config.png');
    NeuralOrbitRegistry.registerOrbit('operatorConsole', 'Operator Console', [], 'icon-console.png');
    NeuralOrbitRegistry.registerOrbit('diagnostics', 'Diagnostics', [], 'icon-diagnostics.png');
    NeuralOrbitRegistry.registerOrbit('dropbox', 'Dropbox', [], 'icon-dropbox.png');
  
    // Fully integrate your newer orbits here as you evolve panels:
    NeuralOrbitRegistry.registerOrbit('forecast', 'Forecast Cortex', [], 'icon-forecast.png');
    NeuralOrbitRegistry.registerOrbit('policyControl', 'Governance Policy Control', [], 'icon-policy.png');
    NeuralOrbitRegistry.registerOrbit('auditExceptions', 'Audit Exception Manager', [], 'icon-exceptions.png');
    NeuralOrbitRegistry.registerOrbit('progressDashboard', 'Audit Progress Dashboard', [], 'icon-progress.png');
    NeuralOrbitRegistry.registerOrbit('liveCounts', 'Live Count Dashboard', [], 'icon-livecount.png');
  
    console.log("✅ Neural Orbit Registry Unified Seed Complete.");
  })();