// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.6
// Subsystem: Unified Bootstrap Core

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.Bootstrap = (function() {

  function start() {
    console.log("🚀 SageCraft Ascendant: Bootstrap Sequence Initiating...");

    // Phase 10.2 — Dock Persistence Bootstrap Restoration
    if (SageCraftAscendant.DockPersistence?.restoreDock) {
      SageCraftAscendant.DockPersistence.restoreDock();
      console.log("🧬 Neural Dock Persistence: Restoration complete.");
    } else {
      console.warn("⚠ DockPersistence module not found — no restoration performed.");
    }

    // Phase 9.1 — Full Registry Harmonization
    let staticOrbitsLoaded = false;

    if (typeof window.registerAllOrbits === "function") {
      window.registerAllOrbits();
      staticOrbitsLoaded = true;
    }

    // Phase 9.2 — Orbital Injection Console Activation
    if (SageCraftAscendant.OperatorConsole?.registerOrbitInjectionControls) {
      SageCraftAscendant.OperatorConsole.registerOrbitInjectionControls();
    }

    const persistedRegistry = SageCraftAscendant.PersistenceRegistry.loadRegistry();
    if (Object.keys(persistedRegistry).length > 0) {
      console.log("🔄 Injecting persisted orbits...");
      for (const key in persistedRegistry) {
        const orbit = persistedRegistry[key];
        window.NeuralOrbitRegistry.registerOrbit(orbit.panelId, orbit.label, orbit.modules, orbit.icon);
      }
    } else if (!staticOrbitsLoaded) {
      console.warn("⚠ No persisted or static orbits found — mesh will remain empty.");
    }

    // Build Dock Mesh
    if (window.NeuralOrbitalDockMesh?.renderOrbitalDock) {
      NeuralOrbitalDockMesh.renderOrbitalDock();
    }

    // Synchronize Dock Mesh after rendering
    if (SageCraftAscendant.NeuralOrbitalDockMesh?.renderDock) {
      SageCraftAscendant.NeuralOrbitalDockMesh.renderDock();
    }

    if (SageCraftAscendant.NeuralMeshIntegritySentinel?.synchronizeDockMesh) {
      SageCraftAscendant.NeuralMeshIntegritySentinel.synchronizeDockMesh();
    }

    // Verify Mesh Integrity
    if (SageCraftAscendant.MeshIntegrity?.runIntegrityScan) {
      SageCraftAscendant.MeshIntegrity.runIntegrityScan();
    }

    // Restore last session panel
    const lastPanel = SageCraftAscendant.PersistenceSession.loadActivePanel();
    if (lastPanel) {
      SageCraftAscendant.NeuralNavigationCore.activatePanel(lastPanel);
    }

    // Render Operator Console
    if (SageCraftAscendant.OperatorConsole?.renderOperatorConsole) {
      SageCraftAscendant.OperatorConsole.renderOperatorConsole();
    }
    // Phase 10.4.1 — Diagnostics Console Activation
    if (SageCraftAscendant.OperatorConsole?.registerDiagnosticsConsole) {
      SageCraftAscendant.OperatorConsole.registerDiagnosticsConsole();
    }
    // Phase 10.5.1 — Mesh Integrity Overlay Activation
    if (SageCraftAscendant.OperatorConsole?.registerMeshIntegrityOverlay) {
      SageCraftAscendant.OperatorConsole.registerMeshIntegrityOverlay();
    }

    // Phase 11.2 — Event Log Console Activation
    if (SageCraftAscendant.OperatorConsole?.registerEventLogConsole) {
      SageCraftAscendant.OperatorConsole.registerEventLogConsole();
    }

    // Phase 12.2 — Forecast Anomaly Console Activation
    if (SageCraftAscendant.OperatorConsole?.registerForecastAnomalyConsole) {
      SageCraftAscendant.OperatorConsole.registerForecastAnomalyConsole();
    }

    // Phase 13.1 — Control Lattice Console Activation
    if (SageCraftAscendant.OperatorConsole?.registerControlLatticeConsole) {
      SageCraftAscendant.OperatorConsole.registerControlLatticeConsole();
    }

    // Phase 14.2 — Memory Console Activation
    if (SageCraftAscendant.OperatorConsole?.registerMemoryConsole) {
      SageCraftAscendant.OperatorConsole.registerMemoryConsole();
    }

    // Phase 15.2 — Recovery Console Activation
    if (SageCraftAscendant.OperatorConsole?.registerRecoveryConsole) {
      SageCraftAscendant.OperatorConsole.registerRecoveryConsole();
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

    // Final Persistence Sync Validation (OR-6)
    if (SageCraftAscendant.NeuralDockPersistence?.syncLastActivePanel) {
      SageCraftAscendant.NeuralDockPersistence.syncLastActivePanel();
    }

    // OR-7: Full Live Panel Switching Restoration
    const currentActive = SageCraftAscendant.PersistenceSession.loadActivePanel();
    if (!currentActive && Object.keys(SageCraftAscendant.OrbitRegistry.listOrbits()).length > 0) {
      const defaultOrbit = Object.values(SageCraftAscendant.OrbitRegistry.listOrbits())[0];
      SageCraftAscendant.NeuralNavigationCore.activatePanel(defaultOrbit.panelId);
      SageCraftAscendant.NeuralDockPersistence.saveActivePanel(defaultOrbit.panelId);
      console.log("🛰 Default orbit auto-activated.");
    }
    console.log("✅ SageCraft Ascendant: Bootstrap Complete.");
  }

  return { start };

})();