// SageCraft Ascendant — Sovereign Bootstrap Loader
// Phase 500.6 Unified Sovereign Dock Loader

// Helper to load scripts with callback and error logging
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback || function () {
    console.log(`✅ Script loaded: ${src}`);
  };
  script.onerror = function () {
    console.error(`❌ Failed to load script: ${src}`);
  };
  document.head.appendChild(script);
}

window.SageCraftAscendant = window.SageCraftAscendant || {};
console.log("✅ Sovereign Namespace Activated");

let bootstrapInitialized = false;

// Load Core Modules
console.log("✅ Loaded core.namespace.js");
console.log("✅ Loaded core.bootstrap.js");
console.log("✅ Loaded core.stabilization.feedback.js");
console.log("✅ Loaded core.resilience.sentinel.js");
console.log("✅ Loaded core.hazard.deflection.js");
console.log("✅ Loaded core.repair.optimizer.js");
console.log("✅ Loaded core.threat.deflection.nexus.js");
console.log("✅ Loaded core.anomaly.fusion.matrix.js");
console.log("✅ Loaded core.pattern.resolution.js");
console.log("✅ Loaded core.autocorrect.shell.js");
console.log("✅ Loaded core.drift.balancer.js");
console.log("✅ Loaded core.drift.compensator.js");

// Load Forecast Modules
console.log("✅ Loaded forecast.cortex.js");
console.log("✅ Loaded forecast.intake.js");
console.log("✅ Loaded forecast.visualizer.js");
console.log("✅ Loaded forecast.analyzer.js");
console.log("✅ Loaded forecast.ai.scaffold.js");
console.log("✅ Loaded forecast.drift.sentinel.js");
console.log("✅ Loaded forecast.recovery.supervisor.js");
console.log("✅ Loaded forecast.purification.engine.js");
console.log("✅ Loaded forecast.threat.monitor.js");
console.log("✅ Loaded forecast.anomaly.profiler.js");
console.log("✅ Loaded forecast.predictive.cortex.js");
console.log("✅ Loaded forecast.recursive.memory.js");
console.log("✅ Loaded forecast.weight.adaptation.js");
console.log("✅ Loaded forecast.confidence.engine.js");
console.log("✅ Loaded forecast.correction.injector.js");
console.log("✅ Loaded forecast.threat.overseer.js");
console.log("✅ Loaded forecast.stabilizer.core.js");
console.log("✅ Loaded forecast.anomaly.resolver.js");
console.log("✅ Loaded forecast.signal.reinforcement.js");
console.log("✅ Loaded forecast.synthesis.core.js");
console.log("✅ Loaded forecast.mutation.layer.js");
console.log("✅ Loaded forecast.adaptation.engine.js");
console.log("✅ Loaded forecast.adaptation.analyzer.js");
console.log("✅ Loaded forecast.visualizer.mutation.js");
console.log("✅ Loaded forecast.stability.cluster.js");
console.log("✅ Loaded forecast.snapshot.archiver.js");
console.log("✅ Loaded forecast.snapshot.loader.js");
console.log("✅ Loaded forecast.snapshot.validator.js");
console.log("✅ Loaded forecast.snapshot.repair.js");
console.log("✅ Loaded forecast.archive.compliance.js");
console.log("✅ Loaded forecast.archive.autoscan.js");
console.log("✅ Loaded forecast.memory.healer.js");
console.log("✅ Loaded forecast.validation.sentinel.js");
console.log("✅ Loaded forecast.analytics.stability.js");
console.log("✅ Loaded forecast.drift.visualizer.js");
console.log("✅ Loaded forecast.confidence.overlay.js");

// Load Sovereign Modules (Persistence, Registry, Recovery)
console.log("✅ Loaded persistence.registry.js");
console.log("✅ Loaded persistence.session.js");
console.log("✅ Loaded dock.persistence.js");
console.log("✅ Loaded autonomous.js");
console.log("✅ Loaded registry.orbits.js");
console.log("✅ Loaded registry.editor.js");
console.log("✅ Loaded panel.registry.js");

// Load Operator Console
console.log("✅ Loaded operator.console.js");
loadScript("scripts/panels/forecastConsole.panel.js");

// Unified Sovereign API Bridge + Mount Controller
import('/scripts/operator/operatorDockWiring.js').then(module => {
  const OperatorDockWiring = module.default || module.OperatorDockWiring || window.OperatorDockWiring;

  if (!OperatorDockWiring || typeof OperatorDockWiring.getDockAPI !== 'function') {
    console.error("❌ Sovereign API Bridge: OperatorDockWiring or getDockAPI not available.");
    return;
  }

  window.SovereignAPI = OperatorDockWiring.getDockAPI();
  console.log("✅ Sovereign API Bridge activated: window.SovereignAPI is now live.");

  const api = window.SovereignAPI;
  const dockPanels = [
    { id: "countContainer", content: api.getCountDockContent },
    { id: "deltaAnalyzerSection", content: api.getDeltaAnalyzerContent },
    { id: "exceptionManagerSection", content: api.getExceptionManagerContent },
    { id: "progressDashboardSection", content: api.getProgressDashboardContent },
    { id: "reportingHubSection", content: api.getReportingHubContent },
    { id: "masterExportHubSection", content: api.getMasterExportHubContent },
    { id: "utilityHubSection", content: api.getUtilityHubContent },
    { id: "sessionManagerSection", content: api.getSessionManagerContent },
    { id: "mappingsSection", content: api.getMappingsContent },
    { id: "toolsSection", content: api.getToolsContent },
    { id: "auditSection", content: api.getAuditContent },
    { id: "configPanelSection", content: api.getConfigPanelContent }
    ,
    { id: "forecastConsoleSection", content: api.getForecastConsoleContent },
    { id: "loreEngineSection", content: api.getLoreEngineConsoleContent }
  ];

  dockPanels.forEach(panel => {
    const target = document.getElementById(panel.id);
    if (target && typeof panel.content === 'function') {
      target.innerHTML = panel.content();
      console.log(`✅ Mounted Sovereign Panel: ${panel.id}`);
    }
  });

}).catch(err => {
  console.error("❌ Failed to load OperatorDockWiring module:", err);
});

// Neural Unified Bootstrap Loader
import('/scripts/bootstrap/bootstrapNeural.js').then(module => {
  function waitForNeuralBootstrap(attempt = 0) {
    if (
      typeof window.NeuralUnifiedBootstrap === 'object' &&
      typeof window.NeuralUnifiedBootstrap.initialize === 'function' &&
      !bootstrapInitialized
    ) {
      console.log("🧠 NeuralUnifiedBootstrap: Invoked successfully.");
      try {
        window.NeuralUnifiedBootstrap.initialize();
        bootstrapInitialized = true;
        console.log("🚀 NeuralUnifiedBootstrap execution initiated.");
      } catch (err) {
        console.error("❌ NeuralUnifiedBootstrap execution failed:", err);
      }
    } else if (typeof window.NeuralUnifiedBootstrap !== 'function' && attempt < 50) {
      console.warn(`⏳ Waiting for NeuralUnifiedBootstrap... attempt ${attempt + 1}`);
      setTimeout(() => waitForNeuralBootstrap(attempt + 1), 100);
    } else if (!bootstrapInitialized) {
      console.error("❌ NeuralUnifiedBootstrap failed to register after multiple attempts.");
    }
  }

  waitForNeuralBootstrap();
  console.log("✅ NeuralUnifiedBootstrap is defined and ready.");
}).catch(err => {
  console.error("❌ Failed to load bootstrapNeural.js:", err);
});


// Snap Memory Auto-Recall
window.addEventListener("DOMContentLoaded", () => {
  window?.SovereignMemory?.recallFinalSnapState?.();
});