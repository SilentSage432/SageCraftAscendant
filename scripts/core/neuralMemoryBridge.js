// 🧠 Sovereign Memory Nexus Bridge
// Phase XXV-F — Whisperer ↔ Neural Mesh Memory Sync

const NeuralMemoryBridge = {
  memoryCores: {},

  registerCore: function(coreName, coreRef) {
    this.memoryCores[coreName] = coreRef;
    console.log(`🔗 Memory Core Registered: ${coreName}`);
  },

  broadcastEcho: function(source, echoData) {
    console.log(`📡 Broadcast Echo from ${source}:`, echoData);
    for (let core in this.memoryCores) {
      if (core !== source && this.memoryCores[core]?.onEchoReceived) {
        this.memoryCores[core].onEchoReceived(source, echoData);
      }
    }
  },

  requestMemorySync: function(coreName) {
    const core = this.memoryCores[coreName];
    if (core?.syncMemory) {
      return core.syncMemory();
    } else {
      console.warn(`⚠️ Core ${coreName} does not support memory sync.`);
      return null;
    }
  }
};

window.NeuralMemoryBridge = NeuralMemoryBridge;


// Phase XXV-G — Register Whisperer Core
if (window.theWhispererCore) {
  NeuralMemoryBridge.registerCore("The Whisperer", window.theWhispererCore);
} else {
  console.warn("🫥 Whisperer core not found during NeuralMemoryBridge registration.");
}

// Phase XXV-H — Register Sage Feed Core
if (window.sageFeedCore) {
  NeuralMemoryBridge.registerCore("Sage Feed", window.sageFeedCore);
} else {
  console.warn("📭 Sage Feed core not found during NeuralMemoryBridge registration.");
}

// Phase XXV-I — Register Grimoire Lore Kernel Core
if (window.grimoireLoreKernel) {
  NeuralMemoryBridge.registerCore("Grimoire Lore Kernel", window.grimoireLoreKernel);
} else {
  console.warn("📚 Grimoire Lore Kernel not found during NeuralMemoryBridge registration.");
}

// Phase XXV-J — Register Silent Sage Companion Core
if (window.silentSageCore) {
  NeuralMemoryBridge.registerCore("Silent Sage", window.silentSageCore);
} else {
  console.warn("🧘 Silent Sage core not found during NeuralMemoryBridge registration.");
}

// Phase XXV-K — Register Archivist Companion Core
if (window.archivistCore) {
  NeuralMemoryBridge.registerCore("The Archivist", window.archivistCore);
} else {
  console.warn("📦 Archivist core not found during NeuralMemoryBridge registration.");
}

// Phase XXV-L — Register Engineer Companion Core
if (window.engineerCore) {
  NeuralMemoryBridge.registerCore("The Engineer", window.engineerCore);
} else {
  console.warn("🛠️ Engineer core not found during NeuralMemoryBridge registration.");
}

// Phase XXV-M — Register Gatekeeper Companion Core
if (window.gatekeeperCore) {
  NeuralMemoryBridge.registerCore("The Gatekeeper", window.gatekeeperCore);
} else {
  console.warn("🚪 Gatekeeper core not found during NeuralMemoryBridge registration.");
}


// Phase XXV-N — Echo Sync Calibration
console.log("🔄 Echo Sync Calibration Initialized.");

// 🧠 Emit memory bridge sync pulse
if (window.SovereignBus) {
  SovereignBus.emit("neuralMemoryBridge", "Echo Sync Calibration Initialized.");
}

for (let core in NeuralMemoryBridge.memoryCores) {
  const ref = NeuralMemoryBridge.memoryCores[core];
  if (typeof ref?.onEchoCalibration === "function") {
    ref.onEchoCalibration();
  }
}


// Phase XXVI — Anomaly Detection & Core Stabilizer Integration
console.log("🧪 Anomaly Detection Protocol Engaged.");

NeuralMemoryBridge.runDiagnostics = function() {
  const report = [];

  for (let coreName in this.memoryCores) {
    const core = this.memoryCores[coreName];
    if (typeof core?.runDiagnostics === "function") {
      const result = core.runDiagnostics();
      report.push({ core: coreName, diagnostics: result });
    } else {
      report.push({ core: coreName, diagnostics: "No diagnostic method available." });
    }
  }

  console.table(report);
  return report;
};

// Optional: Auto-run on load
NeuralMemoryBridge.runDiagnostics();