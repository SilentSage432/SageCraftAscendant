// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.6
// Subsystem: Unified Bootstrap Core

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.Bootstrap = (function() {

  function start() {
    console.log("🚀 SageCraft Ascendant: Bootstrap Sequence Initiating...");

    // Load Registry from Storage
    const persistedRegistry = SageCraftAscendant.PersistenceRegistry.loadRegistry();
    if (Object.keys(persistedRegistry).length > 0) {
      console.log("🔄 Injecting persisted orbits...");
      for (const key in persistedRegistry) {
        const orbit = persistedRegistry[key];
        window.NeuralOrbitRegistry.registerOrbit(orbit.panelId, orbit.label, orbit.modules, orbit.icon);
      }
    } else {
      console.warn("⚠ No persisted orbits found, using static seed.");
      if (typeof window.registerAllOrbits === "function") {
        window.registerAllOrbits();
      }
    }

    // Build Dock Mesh
    if (window.NeuralOrbitalDockMesh?.renderOrbitalDock) {
      NeuralOrbitalDockMesh.renderOrbitalDock();
    }

    // Verify Mesh Integrity
    if (SageCraftAscendant.MeshIntegrity?.runIntegrityScan) {
      SageCraftAscendant.MeshIntegrity.runIntegrityScan();
    }

    // Restore last session panel
    const lastPanel = SageCraftAscendant.PersistenceSession.loadActivePanel();
    if (lastPanel) {
      NeuralNavigationCore.activatePanel(lastPanel);
    }

    // Render Operator Console
    if (SageCraftAscendant.OperatorConsole?.renderOperatorConsole) {
      SageCraftAscendant.OperatorConsole.renderOperatorConsole();
    }

    if (SageCraftAscendant.GovernancePolicy?.initialize) {
      SageCraftAscendant.GovernancePolicy.initialize();
    }
    if (SageCraftAscendant.RecoveryAutonomous?.startAutoRecovery) {
      SageCraftAscendant.RecoveryAutonomous.startAutoRecovery();
    }

    // Automated Archive Compliance Sweep (Phase 6.9)
    if (SageCraftAscendant.ForecastArchiveAutoScanner?.runAutoComplianceSweep) {
      SageCraftAscendant.ForecastArchiveAutoScanner.runAutoComplianceSweep();
    }

    console.log("✅ SageCraft Ascendant: Bootstrap Complete.");
  }

  return { start };

})();