

// 🧭 Sovereign Ascendant — bootstrapCore.js
// Handles Sovereign Stylesheet Injection & Sovereign Manifest Declaration

(function initializeBootstrapCore() {
  console.log("🧭 Sovereign Core Bootstrap Initialization Started.");

  // Sovereign Stylesheet Injection
  function injectSovereignStylesheet() {
    console.log("🎨 Sovereign Stylesheet Mesh Injection Activated.");

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./scripts/styles/sagecraftascendant.css";
    styleLink.onload = () => console.log("✅ Sovereign stylesheet loaded successfully.");
    styleLink.onerror = () => console.error("❌ Failed to load sovereign stylesheet.");

    document.head.appendChild(styleLink);
  }

  injectSovereignStylesheet();

  // Sovereign Manifest Declaration
  window.SovereignAscendant = window.SovereignAscendant || {};
  window.SovereignAscendant.Manifest = {
    forecastModules: [
      'forecast.cortex',
      'forecast.intake',
      'forecast.visualizer',
      'forecast.analyzer',
      'forecast.ai.scaffold',
      'forecast.drift.sentinel',
      'forecast.recovery.supervisor',
      'forecast.purification.engine',
      'forecast.threat.monitor',
      'forecast.anomaly.profiler',
      'forecast.predictive.cortex',
      'forecast.recursive.memory',
      'forecast.weight.adaptation',
      'forecast.confidence.engine',
      'forecast.correction.injector',
      'forecast.threat.overseer',
      'forecast.stabilizer.core',
      'forecast.anomaly.resolver',
      'forecast.signal.reinforcement',
      'forecast.synthesis.core',
      'forecast.mutation.layer',
      'forecast.adaptation.engine',
      'forecast.adaptation.analyzer',
      'forecast.visualizer.mutation',
      'forecast.stability.cluster',
      'forecast.snapshot.archiver',
      'forecast.snapshot.loader',
      'forecast.snapshot.validator',
      'forecast.snapshot.repair',
      'forecast.archive.compliance',
      'forecast.archive.autoscan',
      'forecast.memory.healer',
      'forecast.validation.sentinel',
      'forecast.analytics.stability',
      'forecast.drift.visualizer',
      'forecast.confidence.overlay'
    ],
    coreModules: [
      'anomaly.fusion.matrix',
      'autocorrect.shell',
      'drift.balancer',
      'drift.compensator',
      'hazard.deflection',
      'pattern.resolution',
      'repair.optimizer',
      'resilience.sentinel',
      'stabilization.feedback',
      'threat.deflection.nexus'
    ],
    recoveryModules: [
      'autonomous'
    ]
  };

  console.log("✅ Sovereign Manifest successfully initialized.");
})();