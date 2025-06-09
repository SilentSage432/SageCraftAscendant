

// 🧭 Sovereign Ascendant — sovereignSubsystemRegistry.js
// Central Subsystem Intelligence Layer

(function initializeSovereignSubsystemRegistry() {
  console.log("📡 Initializing Sovereign Subsystem Registry...");

  window.SovereignAscendant = window.SovereignAscendant || {};
  window.SovereignAscendant.Subsystems = window.SovereignAscendant.Subsystems || {};

  const registerSubsystem = (key, moduleRef) => {
    if (!key || typeof key !== "string") {
      console.warn("⚠ Invalid subsystem key.");
      return;
    }
    if (!moduleRef) {
      console.warn(`⚠ No module reference provided for subsystem: ${key}`);
      return;
    }

    window.SovereignAscendant.Subsystems[key] = moduleRef;
    console.log(`✅ Subsystem Registered: ${key}`);
  };

  // Example registration (extend as systems go live)
  registerSubsystem("toolbar", window.SovereignAscendant.Toolbar);
  registerSubsystem("modal", window.SovereignAscendant.ModalController);
  registerSubsystem("neuralBus", window.SovereignAscendant.NeuralBus);

  // Future hook-in points:
  // registerSubsystem("oracle", window.SageOracle);
  // registerSubsystem("predictiveHUD", ...);
})();