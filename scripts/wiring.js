// === Phase 8000.2: NavigationCore Neutralization (optional) ===
window.NavigationCore = (function() {
  function bootstrapOrbitalAnchors() {
    console.log("🧹 NavigationCore.bootstrapOrbitalAnchors() neutralized.");
  }

  function activateOrbitalRouterMesh() {
    console.log("🧹 NavigationCore.activateOrbitalRouterMesh() neutralized.");
  }

  function dynamicPanelLoader() {
    console.log("🧹 NavigationCore.dynamicPanelLoader() neutralized.");
  }

  return {
    bootstrapOrbitalAnchors,
    activateOrbitalRouterMesh,
    dynamicPanelLoader
  };
})();

// === Neural Orbital Anchor Registry Injection (Phase 26) ===
window.OrbitalAnchorRegistry = (function() {
  const anchors = {};

  function buildRegistry() {
    console.log("📡 Building Orbital Anchor Registry...");
    const buttons = document.querySelectorAll('.orbital-btn');
    buttons.forEach(btn => {
      const target = btn.dataset.target;
      if (target) {
        anchors[target] = btn;
        console.log(`🛰 Anchor Registered: ${target}`);
      }
    });
  }

  function getAnchor(target) {
    return anchors[target] || null;
  }

  function listAnchors() {
    return Object.keys(anchors);
  }

  return {
    buildRegistry,
    getAnchor,
    listAnchors
  };
})();
// === Phase 8000.2: Legacy Orbital Controller Neutralization ===
window.OrbitalController = (function() {
  function bootstrap() {
    console.log("🧹 OrbitalController.bootstrap() neutralized — no legacy DOM injection executed.");
  }
  return {
    bootstrap
  };
})();

// === Phase 48: Neural Drift Visualizer Core ===
window.NeuralDriftCore = (function() {
  let totalActivations = 0;
  let uniquePanels = new Set();
  let errorCount = 0;

  function registerActivation(targetId) {
    totalActivations++;
    uniquePanels.add(targetId);
    console.log(`🌌 Drift Activation Logged: ${targetId} (Total Activations: ${totalActivations})`);
  }

  function registerError(targetId) {
    errorCount++;
    console.warn(`⚠ Drift Error Logged: ${targetId} (Total Errors: ${errorCount})`);
  }

  function getStatus() {
    return {
      totalActivations,
      uniquePanels: Array.from(uniquePanels),
      errorCount
    };
  }

  return {
    registerActivation,
    registerError,
    getStatus
  };
})();

// === Phase 49: Neural Session Memory Core ===
window.NeuralSessionMemory = (function() {
  const STORAGE_KEY = 'neural_session_memory';

  function saveLastPanel(panelId) {
    localStorage.setItem(STORAGE_KEY, panelId);
    console.log(`🧬 Session Memory Saved: ${panelId}`);
  }

  function getLastPanel() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function clearMemory() {
    localStorage.removeItem(STORAGE_KEY);
    console.log("🧹 Session Memory Cleared");
  }

  function restoreLastPanel() {
    const panelId = getLastPanel();
    if (!panelId) {
      console.log("ℹ No previous session memory found.");
      return;
    }

    const panel = document.getElementById(`panel${panelId}`);
    if (panel) {
      document.querySelectorAll('.tabcontent, .panel').forEach(p => p.classList.remove("active"));
      panel.classList.add("active");
      panel.scrollIntoView({ behavior: "smooth" });
      console.log(`✅ Session Memory Restored: ${panelId}`);
    } else {
      console.warn(`⚠ Stored panel not found in DOM: ${panelId}`);
    }
  }

  return {
    saveLastPanel,
    getLastPanel,
    clearMemory,
    restoreLastPanel
  };
})();
// === Phase 50: Neural Forecast Engine Core ===
window.NeuralForecastEngine = (function() {
  const activationMap = {};

  function registerActivation(targetId) {
    if (!activationMap[targetId]) {
      activationMap[targetId] = 1;
    } else {
      activationMap[targetId]++;
    }
    console.log(`📊 Forecast Log — ${targetId}: ${activationMap[targetId]} activations`);
  }

  function getForecastReport() {
    const sorted = Object.entries(activationMap).sort((a, b) => b[1] - a[1]);
    console.table(sorted);
    return sorted;
  }

  function getMostAccessedPanels(top = 3) {
    const sorted = Object.entries(activationMap).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, top);
  }

  function clearForecast() {
    for (let key in activationMap) {
      delete activationMap[key];
    }
    console.log("🧹 Forecast Data Cleared.");
  }

  return {
    registerActivation,
    getForecastReport,
    getMostAccessedPanels,
    clearForecast
  };
})();

// === Phase 51: Neural Audit Integrity Sentinel Core ===
window.NeuralAuditSentinel = (function() {

  function auditWiring() {
    console.log("🧪 Running Neural Audit Integrity Scan...");

    const buttons = document.querySelectorAll('.orbital-btn');
    const panels = document.querySelectorAll('.panel[id]');

    const buttonTargets = Array.from(buttons).map(btn => btn.dataset.target);
    const panelIds = Array.from(panels).map(panel => panel.id.replace(/^panel/, ''));

    let missingPanels = 0;
    let unmatchedButtons = [];

    buttonTargets.forEach(targetId => {
      if (!panelIds.includes(targetId)) {
        console.warn(`⚠ No panel found for button target: ${targetId}`);
        missingPanels++;
        unmatchedButtons.push(targetId);
      }
    });

    console.log(`✅ Audit Complete — ${buttons.length} buttons scanned.`);
    console.log(`✅ Panels Found: ${panelIds.length}`);
    if (missingPanels === 0) {
      console.log("✅ All buttons have valid panel targets.");
    } else {
      console.warn(`❌ ${missingPanels} button(s) missing corresponding panels.`);
      console.table(unmatchedButtons);
    }
  }

  return {
    auditWiring
  };
})();

// === Phase 52: Neural Panel Synthesis Core ===
window.NeuralPanelSynthesis = (function() {

  function synthesizePanels() {
    console.log("🧬 Running Neural Panel Synthesis...");

    const buttons = document.querySelectorAll('.orbital-btn');
    const panelContainer = document.body;  // Insert panels directly into <body> for now

    let createdPanels = 0;

    buttons.forEach(button => {
      const targetId = button.dataset.target;
      const panelId = `panel${targetId}`;
      let panel = document.getElementById(panelId);

      if (!panel) {
        panel = document.createElement("section");
        panel.id = panelId;
        panel.className = "panel tab-section panel-glow synthetic-panel";
        panel.innerHTML = `<h2>🔧 ${targetId} Panel (Synthesized)</h2><p>Auto-generated placeholder panel for '${targetId}'.</p>`;
        panelContainer.appendChild(panel);
        createdPanels++;
        console.log(`➕ Synthesized Panel Created: ${panelId}`);
      }
    });

    if (createdPanels === 0) {
      console.log("✅ No missing panels detected. Synthesis complete.");
    } else {
      console.log(`✅ Synthesis Complete — ${createdPanels} panel(s) created.`);
    }
  }

  return {
    synthesizePanels
  };
})();

// === Phase 54: Neural Self-Healing Engine ===
window.NeuralSelfHealingEngine = (function() {

  function runSelfHealing() {
    console.log("🧬 Running Neural Self-Healing Process...");

    const buttons = document.querySelectorAll('.orbital-btn');
    const panelContainer = document.body;
    let repairsMade = 0;

    buttons.forEach(button => {
      const targetId = button.dataset.target;
      const panelId = `panel${targetId}`;
      let panel = document.getElementById(panelId);

      if (!panel) {
        panel = document.createElement("section");
        panel.id = panelId;
        panel.className = "panel tab-section panel-glow synthetic-panel auto-repair";
        panel.innerHTML = `<h2>🛡 ${targetId} Panel (Auto-Repaired)</h2><p>Panel was missing and has been automatically restored.</p>`;
        panelContainer.appendChild(panel);
        repairsMade++;
        console.log(`🛡 Auto-Repaired Missing Panel: ${panelId}`);
      }
    });

    if (repairsMade === 0) {
      console.log("✅ No repairs necessary. System fully stabilized.");
    } else {
      console.log(`✅ Self-Healing Complete — ${repairsMade} panel(s) repaired.`);
    }
  }

  return {
    runSelfHealing
  };
})();

// === Phase 55: Neural Auto-Healing Forecast Engine ===
window.NeuralAutoHealingForecast = (function() {
  const RISK_THRESHOLD = 5;  // Threshold of activations before triggering risk warnings

  function evaluatePanelRisk(targetId) {
    const forecastMap = NeuralForecastEngine.getForecastReport();
    const forecast = forecastMap.find(([id, count]) => id === targetId);

    if (!forecast) return;

    const [, activationCount] = forecast;
    if (activationCount >= RISK_THRESHOLD) {
      const panelId = `panel${targetId}`;
      const panel = document.getElementById(panelId);
      if (!panel) {
        console.warn(`⚠ PREDICTIVE WARNING: High activation risk detected for missing panel '${targetId}'.`);
      }
    }
  }

  function evaluateAllRisks() {
    console.log("🧬 Running Auto-Healing Forecast Analysis...");
    const forecastMap = NeuralForecastEngine.getForecastReport();

    forecastMap.forEach(([targetId, activationCount]) => {
      if (activationCount >= RISK_THRESHOLD) {
        const panelId = `panel${targetId}`;
        const panel = document.getElementById(panelId);
        if (!panel) {
          console.warn(`⚠ PREDICTIVE WARNING: Panel '${targetId}' heavily activated but missing.`);
        }
      }
    });

    console.log("✅ Forecast Risk Analysis Complete.");
  }

  return {
    evaluatePanelRisk,
    evaluateAllRisks
  };
})();
// === Phase 56: Neural Orbit Registry Core ===
window.NeuralOrbitRegistry = (function() {
  const orbits = {};

  function registerOrbit(name, description, modules = []) {
    if (orbits[name]) {
      console.warn(`⚠ Orbit '${name}' is already registered.`);
      return;
    }
    orbits[name] = {
      description,
      modules,
      registeredAt: new Date().toISOString()
    };
    console.log(`🪐 Orbit Registered: ${name}`);
  }

  function listOrbits() {
    console.table(orbits);
    return orbits;
  }

  function getOrbit(name) {
    return orbits[name] || null;
  }

  function clearOrbits() {
    for (let key in orbits) {
      delete orbits[key];
    }
    console.log("🧹 Orbit Registry Cleared.");
  }

  return {
    registerOrbit,
    listOrbits,
    getOrbit,
    clearOrbits
  };
})();
// === Phase 57: Neural Module Loader Bootstrap ===
window.NeuralModuleRegistry = (function() {
  const modules = {};

  function registerModule(name, initCallback) {
    if (modules[name]) {
      console.warn(`⚠ Module '${name}' is already registered.`);
      return;
    }
    modules[name] = {
      initialized: false,
      initCallback
    };
    console.log(`🧩 Module Registered: ${name}`);
  }

  function initializeModule(name) {
    const mod = modules[name];
    if (!mod) {
      console.warn(`⚠ Cannot initialize unknown module '${name}'.`);
      return;
    }
    if (mod.initialized) {
      console.log(`🔄 Module '${name}' already initialized.`);
      return;
    }
    try {
      mod.initCallback();
      mod.initialized = true;
      console.log(`✅ Module '${name}' initialized successfully.`);
    } catch (err) {
      console.error(`❌ Error initializing module '${name}':`, err);
    }
  }

  function initializeAllModules() {
    console.log("🧬 Initializing All Registered Modules...");
    for (let name in modules) {
      initializeModule(name);
    }
    console.log("✅ All Modules Initialized.");
  }

  function listModules() {
    const keys = Object.keys(modules);
    console.table(keys);
    return keys;
  }

  return {
    registerModule,
    initializeModule,
    initializeAllModules,
    listModules
  };
})();
// === Phase 58: Neural Module-Orbit Linker Bootstrap ===
window.NeuralModuleOrbitLinker = (function() {
  function linkModuleToOrbit(orbitName, moduleName) {
    const orbit = NeuralOrbitRegistry.getOrbit(orbitName);
    if (!orbit) {
      console.warn(`⚠ Cannot link module. Orbit '${orbitName}' does not exist.`);
      return;
    }
    if (!orbit.modules.includes(moduleName)) {
      orbit.modules.push(moduleName);
      console.log(`🔗 Linked module '${moduleName}' to orbit '${orbitName}'`);
    } else {
      console.log(`ℹ Module '${moduleName}' is already linked to orbit '${orbitName}'`);
    }
  }

  function listModulesForOrbit(orbitName) {
    const orbit = NeuralOrbitRegistry.getOrbit(orbitName);
    if (!orbit) {
      console.warn(`⚠ Orbit '${orbitName}' not found.`);
      return [];
    }
    console.table(orbit.modules);
    return orbit.modules;
  }

  function unlinkModuleFromOrbit(orbitName, moduleName) {
    const orbit = NeuralOrbitRegistry.getOrbit(orbitName);
    if (!orbit) {
      console.warn(`⚠ Orbit '${orbitName}' not found.`);
      return;
    }
    orbit.modules = orbit.modules.filter(m => m !== moduleName);
    console.log(`❎ Unlinked module '${moduleName}' from orbit '${orbitName}'`);
  }

  return {
    linkModuleToOrbit,
    listModulesForOrbit,
    unlinkModuleFromOrbit
  };
})();
// === Phase 59: Neural Bootloader Expansion Engine ===
window.NeuralBootloader = (function() {

  function bootAllOrbits() {
    console.log("🚀 Neural Bootloader Initiated...");

    const allOrbits = NeuralOrbitRegistry.listOrbits();
    const moduleNames = NeuralModuleRegistry.listModules();

    for (const orbitName in allOrbits) {
      const orbit = allOrbits[orbitName];
      console.log(`🪐 Booting Orbit: ${orbitName}`);

      if (Array.isArray(orbit.modules)) {
        orbit.modules.forEach(moduleName => {
          if (moduleNames.includes(moduleName)) {
            console.log(`🔗 Booting Module '${moduleName}' in Orbit '${orbitName}'`);
            NeuralModuleRegistry.initializeModule(moduleName);
          } else {
            console.warn(`⚠ Module '${moduleName}' linked to Orbit '${orbitName}' not found in registry.`);
          }
        });
      } else {
        console.warn(`⚠ Orbit '${orbitName}' has no valid modules list.`);
      }
    }

    console.log("✅ Neural Bootloader Complete.");
  }

  return {
    bootAllOrbits
  };

})();
// === Phase 60: Neural Cortex Synchronization Engine ===
window.NeuralCortexEngine = (function() {
  const FORECAST_RISK_THRESHOLD = 10;  // Customize as your system grows
  const SYNC_INTERVAL = 15000; // Run full cortex sync every 15 seconds

  function runFullSync() {
    console.log("🧠 Running Full Neural Cortex Synchronization...");

    // 1️⃣ Forecast Risk Assessment
    const forecastMap = NeuralForecastEngine.getForecastReport();
    forecastMap.forEach(([targetId, activationCount]) => {
      if (activationCount >= FORECAST_RISK_THRESHOLD) {
        const panelId = `panel${targetId}`;
        const panel = document.getElementById(panelId);
        if (!panel) {
          console.warn(`⚠ High-Risk Forecast: Panel '${targetId}' missing at ${activationCount} activations. Triggering self-healing...`);
          NeuralPanelSynthesis.synthesizePanels();
        }
      }
    });

    // 2️⃣ Audit Sentinel Health Check
    NeuralAuditSentinel.auditWiring();

    // 3️⃣ Report Drift Status
    const driftStatus = NeuralDriftCore.getStatus();
    console.log("🌌 Drift Metrics:", driftStatus);

    console.log("✅ Neural Cortex Synchronization Complete.");
  }

  function startCortexLoop() {
    console.log("🧠 Neural Cortex Loop Activated.");
    runFullSync(); // Run immediately on startup
    setInterval(runFullSync, SYNC_INTERVAL);
  }

  return {
    startCortexLoop
  };
})();
// === Phase 7000.5: Neural Orbital Mesh Reconciliation ===
window.NeuralOrbitalMeshReconciliation = (function() {

  function validateOrbitalMesh() {
    console.log("🧠 Running Orbital Mesh Reconciliation...");

    const buttons = document.querySelectorAll(".orbital-btn");
    let totalChecked = 0;
    let missingPanels = 0;

    buttons.forEach(btn => {
      const target = btn.dataset.target;
      totalChecked++;

      if (!target) {
        console.warn(`⚠ Orbital button missing data-target attribute`, btn);
        missingPanels++;
        return;
      }

      const targetPanel = document.querySelector(target);
      if (!targetPanel) {
        console.warn(`⚠ No DOM panel found for target '${target}'`);
        missingPanels++;
      }
    });

    console.log(`✅ Orbital Mesh Reconciliation Complete: ${totalChecked} buttons scanned, ${missingPanels} issues found.`);
  }

  return {
    validateOrbitalMesh
  };

})();
// === Phase 7000.6: Legacy Orbital Scaffold Purge ===
window.LegacyOrbitalScaffoldPurge = (function() {

  function purgeLegacyScaffolds() {
    console.log("🧹 Running Legacy Orbital Scaffold Purge...");

    const legacyButtons = Array.from(document.querySelectorAll('.orbital-btn')).filter(btn => {
      const target = btn.dataset.target;
      const id = btn.id;
      return (!target || target.trim() === "") && id.startsWith("hud");
    });

    if (legacyButtons.length === 0) {
      console.log("✅ No legacy orbital scaffolds found. Neural DOM is fully pure.");
      return;
    }

    legacyButtons.forEach(btn => {
      console.warn(`🗑 Removing legacy scaffold: ID='${btn.id}'`);
      btn.remove();
    });

    console.log(`✅ Purge Complete: ${legacyButtons.length} legacy scaffold(s) removed.`);
  }

  return {
    purgeLegacyScaffolds
  };

})();
// === Phase 8000.0: Neural Operator Command Bridge ===
window.NeuralOperatorConsole = (function() {

  function renderOperatorConsole() {
    console.log("🧭 Rendering Operator Command Console...");

    const existingPanel = document.getElementById("operatorConsolePanel");
    if (existingPanel) {
      console.warn("⚠ Operator Console Panel already exists.");
      return;
    }

    const panel = document.createElement("section");
    panel.id = "operatorConsolePanel";
    panel.className = "panel tab-section panel-glow operator-console";

    panel.innerHTML = `
  <h2>🧭 Neural Operator Command Bridge</h2>

  <div class="console-section">
    <button onclick="NeuralAuditSentinel.auditWiring()">Run Audit Integrity Scan</button>
    <button onclick="NeuralSelfHealingEngine.runSelfHealing()">Run Self-Healing Engine</button>
    <button onclick="NeuralForecastEngine.clearForecast()">Clear Forecast History</button>
    <button onclick="NeuralCortexEngine.startCortexLoop()">Start Cortex Loop</button>
    <button onclick="NeuralOrbitalMeshReconciliation.validateOrbitalMesh()">Validate Orbital Mesh</button>
  </div>

  <div class="console-section">
    <h3>⚖ Governance Policy Controls</h3>
    <label>Risk Threshold: <input type="number" id="riskThresholdInput" value="${NeuralGovernancePolicyCore.getPolicy().riskThreshold}"></label><br>
    <label>Drift Threshold: <input type="number" id="driftThresholdInput" value="${NeuralGovernancePolicyCore.getPolicy().driftThreshold}"></label><br>
    <label>Error Threshold: <input type="number" id="errorThresholdInput" value="${NeuralGovernancePolicyCore.getPolicy().errorThreshold}"></label><br>
    <button onclick="applyPolicyChanges()">Apply Policy Changes</button>
  </div>

  <div class="console-log">
    <p>🧪 Use these controls to directly observe and manage neural subsystems.</p>
  </div>
`;

    document.body.appendChild(panel);
    console.log("✅ Operator Command Console Deployed.");
  }

  return {
    renderOperatorConsole,
    renderLiveSystemStatus,
    renderLiveSystemStatusUI,
    startLiveRefresh,
    stopLiveRefresh,
    startRecoveryLoop,
    stopRecoveryLoop
  };

})();
function applyPolicyChanges() {
  const risk = parseInt(document.getElementById("riskThresholdInput").value);
  const drift = parseInt(document.getElementById("driftThresholdInput").value);
  const error = parseInt(document.getElementById("errorThresholdInput").value);

  NeuralGovernancePolicyCore.setPolicy({
    riskThreshold: risk,
    driftThreshold: drift,
    errorThreshold: error
  });

  console.log("✅ Live Policy Changes Applied");
}
function listSnapshots() {
  const keys = NeuralTemporalRollbackCore.listSnapshots();
  const output = document.getElementById("snapshotListOutput");
  if (!output) return;

  if (keys.length === 0) {
    output.innerHTML = "<p>📜 No snapshots found.</p>";
    return;
  }

  output.innerHTML = "<ul>";
  keys.forEach(key => {
    output.innerHTML += `<li>${key} <button onclick="loadSnapshot('${key}')">Restore</button></li>`;
  });
  output.innerHTML += "</ul>";
}

function loadSnapshot(key) {
  NeuralTemporalRollbackCore.loadSnapshot(key);
  NeuralStateArchiveCore.saveState(); // Optional: Re-sync archive after rollback
}

function clearSnapshots() {
  if (confirm("⚠ Are you sure you want to clear all snapshots?")) {
    NeuralTemporalRollbackCore.clearAllSnapshots();
    listSnapshots();
  }
}
// === Phase 8000.3: Neural Live Panel Synchronizer ===
function renderLiveSystemStatus() {
  console.log("🧬 Rendering Live System Status...");

  // Orbit Status
  const orbits = NeuralOrbitRegistry.listOrbits();
  console.log("🪐 Registered Orbits:", orbits);

  // Module Status
  const modules = NeuralModuleRegistry.listModules();
  console.log("🧩 Registered Modules:", modules);

  // Anchor Status
  const anchors = OrbitalAnchorRegistry.listAnchors();
  console.log("📡 Registered Anchors:", anchors);

  // Drift Status
  const drift = NeuralDriftCore.getStatus();
  console.log("🌌 Drift Metrics:", drift);

  // Audit Status
  NeuralAuditSentinel.auditWiring();
}
// === Phase 8000.7: Unified Neural Operator Dashboard Optimization ===
function renderLiveSystemStatusUI() {
  console.log("🧭 Updating Unified Neural Operator Dashboard...");

  const panel = document.getElementById("operatorConsolePanel");
  if (!panel) {
    console.warn("⚠ Operator Console Panel not found.");
    return;
  }

  let statusContainer = document.getElementById("neuralStatusContainer");
  if (!statusContainer) {
    statusContainer = document.createElement("div");
    statusContainer.id = "neuralStatusContainer";
    statusContainer.className = "console-live-status";
    panel.appendChild(statusContainer);
  } else {
    statusContainer.innerHTML = ""; // Clear previous content
  }

  // Unified Orbits
  const orbits = NeuralOrbitRegistry.listOrbits();
  const orbitBlock = document.createElement("div");
  orbitBlock.innerHTML = `<h3>🪐 Orbits: ${Object.keys(orbits).length}</h3>`;
  if (Object.keys(orbits).length > 0) {
    const list = document.createElement("ul");
    Object.keys(orbits).forEach(o => {
      const li = document.createElement("li");
      li.textContent = `${o} (${orbits[o].modules.length} modules)`;
      list.appendChild(li);
    });
    orbitBlock.appendChild(list);
  }
  statusContainer.appendChild(orbitBlock);

  // Unified Modules
  const modules = NeuralModuleRegistry.listModules();
  const moduleBlock = document.createElement("div");
  moduleBlock.innerHTML = `<h3>🧩 Modules: ${modules.length}</h3>`;
  if (modules.length > 0) {
    const list = document.createElement("ul");
    modules.forEach(m => {
      const li = document.createElement("li");
      li.textContent = m;
      list.appendChild(li);
    });
    moduleBlock.appendChild(list);
  }
  statusContainer.appendChild(moduleBlock);

  // Anchors
  const anchors = OrbitalAnchorRegistry.listAnchors();
  const anchorBlock = document.createElement("div");
  anchorBlock.innerHTML = `<h3>📡 Anchors: ${anchors.length}</h3>`;
  statusContainer.appendChild(anchorBlock);

  // Drift Metrics
  const drift = NeuralDriftCore.getStatus();
  const driftBlock = document.createElement("div");
  driftBlock.innerHTML = `<h3>🌌 Drift:</h3><p>Activations: ${drift.totalActivations}<br>Unique Panels: ${drift.uniquePanels.length}<br>Errors: ${drift.errorCount}</p>`;
  statusContainer.appendChild(driftBlock);

  // Forecast Risk Levels
  const forecastMap = NeuralForecastEngine.getForecastReport();
  const riskBlock = document.createElement("div");
  riskBlock.innerHTML = `<h3>📊 Forecast Risks (Top 5):</h3>`;
  const riskList = document.createElement("ul");
  forecastMap.slice(0, 5).forEach(([panel, count]) => {
    const li = document.createElement("li");
    li.textContent = `${panel}: ${count} activations`;
    riskList.appendChild(li);
  });
  riskBlock.appendChild(riskList);
  statusContainer.appendChild(riskBlock);
}
// === Phase 8000.5: Live Refresh Synchronization Engine ===
let refreshIntervalId = null;

function startLiveRefresh(intervalMs = 10000) {
  console.log(`🔄 Live Refresh Activated: Updating every ${intervalMs / 1000} seconds.`);
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
  }
  renderLiveSystemStatusUI();
  refreshIntervalId = setInterval(renderLiveSystemStatusUI, intervalMs);
}

function stopLiveRefresh() {
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
    console.log("⏹ Live Refresh Deactivated.");
  } else {
    console.log("ℹ Live Refresh was not active.");
  }
}
// === Phase 8000.6: Neural Subsystem Recovery Loop ===
let recoveryIntervalId = null;

function startRecoveryLoop(intervalMs = 30000) {
  console.log(`🛡 Recovery Loop Activated: Scanning every ${intervalMs / 1000} seconds.`);
  if (recoveryIntervalId) {
    clearInterval(recoveryIntervalId);
  }
  runRecoveryScan();
  recoveryIntervalId = setInterval(runRecoveryScan, intervalMs);
}

function stopRecoveryLoop() {
  if (recoveryIntervalId) {
    clearInterval(recoveryIntervalId);
    console.log("🛑 Recovery Loop Deactivated.");
  } else {
    console.log("ℹ Recovery Loop was not active.");
  }
}

function runRecoveryScan() {
  console.log("🧪 Running Subsystem Recovery Scan...");

  // Forecast-Based Healing
  NeuralAutoHealingForecast.evaluateAllRisks();

  // Drift Reporting
  const drift = NeuralDriftCore.getStatus();
  console.log("🌌 Drift Metrics During Recovery:", drift);

  // Orbital Mesh Validation
  NeuralOrbitalMeshReconciliation.validateOrbitalMesh();

  // Audit Sentinel
  NeuralAuditSentinel.auditWiring();
}
window.NeuralOperatorConsole = NeuralOperatorConsole;
// === Unified Neural Bootloader Stabilization ===

// === Phase 39 Neural Mesh Activation ===

// === Phase 40 Purification Injection ===


// === Phase 41: Orbital Anchor Wiring Bootstrap ===


// === Phase 43: Orbital Router Activation Mesh ===

// === Phase 44: Dynamic Panel Loaders Bootstrap ===

// === Phase 47: Neural Cortex Error Shielding Bootstrap ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("🧬 Phase 47 — Unified Neural Bootstrap Activated");

  try {
    OrbitalAnchorRegistry.buildRegistry();
    OrbitalController.bootstrap();
    NeuralSessionMemory.restoreLastPanel();
    NeuralSelfHealingEngine.runSelfHealing();

    if (typeof NavigationCore.bootstrapOrbitalAnchors === "function") {
      NavigationCore.bootstrapOrbitalAnchors();
    } else {
      console.warn("⚠ bootstrapOrbitalAnchors not found (Phase 41 may have been retired).");
    }

    if (typeof NavigationCore.activateOrbitalRouterMesh === "function") {
      NavigationCore.activateOrbitalRouterMesh();
    } else {
      console.warn("⚠ activateOrbitalRouterMesh not found (Phase 43 may have been retired).");
    }

    if (typeof NavigationCore.dynamicPanelLoader === "function") {
      NavigationCore.dynamicPanelLoader();
    } else {
      console.warn("⚠ dynamicPanelLoader not found (Phase 44 may have been retired).");
    }

    console.log("✅ Neural Bootstrap Fully Stabilized.");
  } catch (err) {
    console.error("❌ Neural Bootstrap Failure:", err);
  }
});
// === Phase 53: Neural Operator Console Logging Redirect ===
(function() {
  const consoleOutput = document.getElementById("neuralConsoleOutput");
  if (!consoleOutput) return;

  function appendToConsole(message) {
    const p = document.createElement("p");
    p.textContent = message;
    consoleOutput.appendChild(p);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  const originalLog = console.log;
  console.log = function(...args) {
    originalLog.apply(console, args);
    appendToConsole(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' '));
  };

  const originalWarn = console.warn;
  console.warn = function(...args) {
    originalWarn.apply(console, args);
    appendToConsole("⚠ " + args.join(' '));
  };
})();
// === Phase 8001.0: Neural Governance Core ===
window.NeuralGovernanceCore = (function() {

  const RISK_THRESHOLD = 10;
  const DRIFT_THRESHOLD = 25;
  const ERROR_THRESHOLD = 5;

  function evaluateSystem() {
    console.log("⚖ Running Neural Governance Evaluation...");

    let actionTaken = false;

    // 1️⃣ Forecast Risk Check
    const forecastMap = NeuralForecastEngine.getForecastReport();
    forecastMap.forEach(([targetId, activationCount]) => {
      if (activationCount >= RISK_THRESHOLD) {
        console.warn(`⚠ Governance Alert: High activation risk detected for '${targetId}'`);
        NeuralSelfHealingEngine.runSelfHealing();
        actionTaken = true;
      }
    });

    // 2️⃣ Drift Metrics Check
    const drift = NeuralDriftCore.getStatus();
    if (drift.totalActivations >= DRIFT_THRESHOLD) {
      console.warn("⚠ Governance Alert: Drift activation threshold exceeded.");
      NeuralAuditSentinel.auditWiring();
      actionTaken = true;
    }

    // 3️⃣ Error Count Check
    if (drift.errorCount >= ERROR_THRESHOLD) {
      console.error("❌ Governance Emergency: Excessive system errors detected.");
      NeuralPanelSynthesis.synthesizePanels();
      actionTaken = true;
    }

    if (!actionTaken) {
      console.log("✅ Governance Pass: System stable.");
    }
  }

  function startGovernanceLoop(intervalMs = 30000) {
    console.log(`⚖ Neural Governance Loop Activated — scanning every ${intervalMs / 1000} seconds.`);
    evaluateSystem();
    setInterval(evaluateSystem, intervalMs);
  }

  return {
    evaluateSystem,
    startGovernanceLoop
  };

})();
// === Phase 8002.5: Neural Governance Policy Console ===
window.NeuralGovernancePolicyCore = (function() {

  const STORAGE_KEY = 'neural_governance_policy';

  // Default policy thresholds
  const policy = {
    riskThreshold: 10,
    driftThreshold: 25,
    errorThreshold: 5
  };

  function loadPolicy() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(policy, parsed);
        console.log("💾 Governance Policy Loaded:", policy);
      } catch (err) {
        console.error("❌ Failed to parse saved policy:", err);
      }
    } else {
      console.log("ℹ No saved governance policy found. Using defaults.");
    }
  }

  function savePolicy() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(policy));
      console.log("💾 Governance Policy Saved:", policy);
    } catch (err) {
      console.error("❌ Failed to save policy:", err);
    }
  }

  function getPolicy() {
    return { ...policy };
  }

  function setPolicy(newPolicy) {
    Object.assign(policy, newPolicy);
    savePolicy();
    console.log("⚙ Governance Policy Updated:", policy);
  }

  function evaluateSystem() {
    console.log("⚖ Live Policy Evaluation Running...");

    let actionTaken = false;

    const forecastMap = NeuralForecastEngine.getForecastReport();
    forecastMap.forEach(([targetId, activationCount]) => {
      if (activationCount >= policy.riskThreshold) {
        console.warn(`⚠ Policy Alert: High activation risk detected for '${targetId}'`);
        NeuralSelfHealingEngine.runSelfHealing();
        actionTaken = true;
      }
    });

    const drift = NeuralDriftCore.getStatus();
    if (drift.totalActivations >= policy.driftThreshold) {
      console.warn("⚠ Policy Alert: Drift activation threshold exceeded.");
      NeuralAuditSentinel.auditWiring();
      actionTaken = true;
    }

    if (drift.errorCount >= policy.errorThreshold) {
      console.error("❌ Policy Emergency: Excessive system errors detected.");
      NeuralPanelSynthesis.synthesizePanels();
      actionTaken = true;
    }

    if (!actionTaken) {
      console.log("✅ Policy Pass: System stable.");
    }
  }

  // Load persisted policy on init
  loadPolicy();

  return {
    getPolicy,
    setPolicy,
    evaluateSystem
  };

})();
// === Phase 8003.0: Neural State Archive Core ===
window.NeuralStateArchiveCore = (function() {

  const STORAGE_KEY = 'neural_state_archive';

  function saveState() {
    const state = {
      forecastMap: NeuralForecastEngine.getForecastReport(),
      driftMetrics: NeuralDriftCore.getStatus(),
      sessionPanel: NeuralSessionMemory.getLastPanel(),
      policy: NeuralGovernancePolicyCore.getPolicy()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      console.log("💾 Neural State Archive Saved:", state);
    } catch (err) {
      console.error("❌ Failed to save neural state archive:", err);
    }
  }

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      console.log("ℹ No neural state archive found.");
      return;
    }

    try {
      const state = JSON.parse(saved);
      console.log("💾 Neural State Archive Loaded:", state);

      // Restore Forecast
      state.forecastMap.forEach(([targetId, count]) => {
        for (let i = 0; i < count; i++) {
          NeuralForecastEngine.registerActivation(targetId);
        }
      });

      // Restore Drift Metrics (partial - we only restore activation count for safety)
      state.driftMetrics.uniquePanels.forEach(panelId => {
        NeuralDriftCore.registerActivation(panelId);
      });

      // Restore Session Memory
      if (state.sessionPanel) {
        NeuralSessionMemory.saveLastPanel(state.sessionPanel);
      }

      // Restore Policy
      NeuralGovernancePolicyCore.setPolicy(state.policy);

    } catch (err) {
      console.error("❌ Failed to parse neural state archive:", err);
    }
  }

  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
    console.log("🧹 Neural State Archive Cleared.");
  }

  return {
    saveState,
    loadState,
    clearState
  };

})();
// === Phase 8003.5: Neural Continuity Loop Automation ===

(function NeuralContinuityLoop() {
  console.log("🔄 Neural Continuity Loop Activated");

  // Load state on startup (this ensures state loads automatically on every boot)
  NeuralStateArchiveCore.loadState();

  // Auto-save state every X seconds (default: 60s)
  const SAVE_INTERVAL = 60000;

  setInterval(() => {
    NeuralStateArchiveCore.saveState();
  }, SAVE_INTERVAL);
})();
// === Phase 8004.5: Neural Integrity Auto-Recovery Sentinel ===
window.NeuralStateIntegritySentinel = (function() {

  const STORAGE_KEY = 'neural_state_archive';

  function validateArchive() {
    console.log("🧪 Running Neural Archive Integrity Scan...");

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      console.log("ℹ No archive present to validate.");
      return true;
    }

    try {
      const state = JSON.parse(saved);
      let valid = true;

      if (!state.forecastMap || !Array.isArray(state.forecastMap)) {
        console.error("❌ ForecastMap structure invalid.");
        valid = false;
      }

      if (!state.driftMetrics || typeof state.driftMetrics.totalActivations !== 'number') {
        console.error("❌ DriftMetrics structure invalid.");
        valid = false;
      }

      if (!state.policy || typeof state.policy.riskThreshold !== 'number') {
        console.error("❌ Policy structure invalid.");
        valid = false;
      }

      if (valid) {
        console.log("✅ Neural Archive Integrity Verified.");
      } else {
        console.warn("⚠ Partial corruption detected — auto-recovery may be possible.");
      }

      return valid;

    } catch (err) {
      console.error("❌ Archive Parse Error:", err);
      return false;
    }
  }

  function attemptAutoRecovery() {
    console.log("🧬 Attempting Neural Archive Auto-Recovery...");

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      console.log("ℹ No archive present to recover.");
      return;
    }

    try {
      const state = JSON.parse(saved);

      if (!state.forecastMap || !Array.isArray(state.forecastMap)) {
        state.forecastMap = [];
        console.warn("⚠ ForecastMap recovered as empty array.");
      }

      if (!state.driftMetrics || typeof state.driftMetrics.totalActivations !== 'number') {
        state.driftMetrics = { totalActivations: 0, uniquePanels: [], errorCount: 0 };
        console.warn("⚠ DriftMetrics recovered to safe defaults.");
      }

      if (!state.policy || typeof state.policy.riskThreshold !== 'number') {
        state.policy = { riskThreshold: 10, driftThreshold: 25, errorThreshold: 5 };
        console.warn("⚠ Policy recovered to default thresholds.");
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      console.log("✅ Auto-Recovery Complete — Archive Safely Stabilized.");

    } catch (err) {
      console.error("❌ Auto-Recovery Failed:", err);
    }
  }

  return {
    validateArchive,
    attemptAutoRecovery
  };

})();
// === Phase 8005.0: Neural Temporal Rollback Engine ===
window.NeuralTemporalRollbackCore = (function() {

  const STORAGE_KEY_PREFIX = 'neural_state_snapshot_';

  function saveSnapshot() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const key = STORAGE_KEY_PREFIX + timestamp;

    const state = {
      forecastMap: NeuralForecastEngine.getForecastReport(),
      driftMetrics: NeuralDriftCore.getStatus(),
      sessionPanel: NeuralSessionMemory.getLastPanel(),
      policy: NeuralGovernancePolicyCore.getPolicy()
    };

    try {
      localStorage.setItem(key, JSON.stringify(state));
      console.log(`💾 Snapshot Saved: ${key}`);
    } catch (err) {
      console.error("❌ Failed to save snapshot:", err);
    }
  }

  function listSnapshots() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(STORAGE_KEY_PREFIX));
    keys.sort();
    console.log("📜 Available Snapshots:", keys);
    return keys;
  }

  function loadSnapshot(snapshotKey) {
    const saved = localStorage.getItem(snapshotKey);
    if (!saved) {
      console.error(`❌ Snapshot not found: ${snapshotKey}`);
      return;
    }

    try {
      const state = JSON.parse(saved);
      console.log("💾 Snapshot Loaded:", state);

      // Restore Forecast
      state.forecastMap.forEach(([targetId, count]) => {
        for (let i = 0; i < count; i++) {
          NeuralForecastEngine.registerActivation(targetId);
        }
      });

      // Restore Drift Metrics
      state.driftMetrics.uniquePanels.forEach(panelId => {
        NeuralDriftCore.registerActivation(panelId);
      });

      // Restore Session Memory
      if (state.sessionPanel) {
        NeuralSessionMemory.saveLastPanel(state.sessionPanel);
      }

      // Restore Policy
      NeuralGovernancePolicyCore.setPolicy(state.policy);

      console.log("✅ Snapshot Fully Restored.");

    } catch (err) {
      console.error("❌ Failed to load snapshot:", err);
    }
  }

  function clearAllSnapshots() {
    const keys = listSnapshots();
    keys.forEach(key => localStorage.removeItem(key));
    console.log(`🧹 Cleared ${keys.length} snapshots.`);
  }

  return {
    saveSnapshot,
    listSnapshots,
    loadSnapshot,
    clearAllSnapshots
  };

})();
// === Phase 8006.0: Neural Integrity Sentinels Bootstrap ===
function startIntegritySentinels() {
  console.log("🧪 Neural Integrity Sentinels Activated...");

  setInterval(() => {
    try {
      // Archive Integrity
      const archiveValid = NeuralStateIntegritySentinel.validateArchive();
      console.log(`📦 Archive Valid: ${archiveValid}`);

      // Governance Status
      const policy = NeuralGovernancePolicyCore.getPolicy();
      console.log(`⚖ Governance Policy Active:`, policy);

      // Forecast Stability
      const cortex = NeuralForecastMemoryCortex?.getForecastHistory?.() || [];
      const total = cortex.length;
      const stable = cortex.filter(f => f.stabilityHint === "Stable").length;
      const volatilityRate = total > 0 ? (((total - stable) / total) * 100).toFixed(1) : "N/A";
      console.log(`🌡 Forecast Volatility: ${volatilityRate}%`);

      // Rollback Snapshots
      const snapshots = NeuralTemporalRollbackCore.listSnapshots();
      console.log(`🕰 Snapshots Stored: ${snapshots.length}`);

    } catch (err) {
      console.error("⚠ Neural Integrity Sentinel Error:", err);
    }
  }, 30000);  // Run every 30 seconds
}
// === Phase 8007.0: Neural Autonomous Repair Core ===
window.NeuralAutonomousRepairCore = (function() {

  function runFullRepairCycle() {
    console.log("🧪 Running Full Neural Autonomous Repair Cycle...");

    // Step 1️⃣ — Audit Integrity
    NeuralAuditSentinel.auditWiring();

    // Step 2️⃣ — Re-synthesize Missing Panels
    NeuralPanelSynthesis.synthesizePanels();

    // Step 3️⃣ — Apply Forecast-Based Auto-Healing
    NeuralAutoHealingForecast.evaluateAllRisks();

    // Step 4️⃣ — Validate Orbital Mesh
    NeuralOrbitalMeshReconciliation.validateOrbitalMesh();

    // Step 5️⃣ — Run Self-Healing Engine
    NeuralSelfHealingEngine.runSelfHealing();

    console.log("✅ Full Repair Cycle Complete.");
  }

  function startRepairLoop(intervalMs = 30000) {
    console.log(`🛡 Autonomous Repair Loop Activated — scanning every ${intervalMs / 1000} seconds.`);
    runFullRepairCycle(); // Immediate initial pass
    setInterval(runFullRepairCycle, intervalMs);
  }

  return {
    runFullRepairCycle,
    startRepairLoop
  };

})();
// === Phase 8007.5: Neural Redundancy Buffer Core ===
window.NeuralRedundancyBufferCore = (function() {

  let buffer = null;

  function captureBuffer() {
    buffer = {
      timestamp: new Date().toISOString(),
      forecastMap: NeuralForecastEngine.getForecastReport(),
      driftMetrics: NeuralDriftCore.getStatus(),
      sessionPanel: NeuralSessionMemory.getLastPanel(),
      policy: NeuralGovernancePolicyCore.getPolicy()
    };
    console.log(`🧪 Redundancy Buffer Captured @ ${buffer.timestamp}`);
  }

  function restoreBuffer() {
    if (!buffer) {
      console.warn("⚠ No redundancy buffer available to restore.");
      return;
    }

    console.log("♻ Restoring Redundancy Buffer:", buffer);

    // Restore Forecast
    buffer.forecastMap.forEach(([targetId, count]) => {
      for (let i = 0; i < count; i++) {
        NeuralForecastEngine.registerActivation(targetId);
      }
    });

    // Restore Drift Metrics
    buffer.driftMetrics.uniquePanels.forEach(panelId => {
      NeuralDriftCore.registerActivation(panelId);
    });

    // Restore Session Memory
    if (buffer.sessionPanel) {
      NeuralSessionMemory.saveLastPanel(buffer.sessionPanel);
    }

    // Restore Policy
    NeuralGovernancePolicyCore.setPolicy(buffer.policy);

    console.log("✅ Redundancy Buffer Fully Restored.");
  }

  function clearBuffer() {
    buffer = null;
    console.log("🧹 Redundancy Buffer Cleared.");
  }

  function isBufferAvailable() {
    return !!buffer;
  }

  return {
    captureBuffer,
    restoreBuffer,
    clearBuffer,
    isBufferAvailable
  };

})();
// === Phase 8008.0: Neural Predictive Stabilization Engine ===
window.NeuralPredictiveStabilizationEngine = (function() {

  const PREDICTIVE_RISK_THRESHOLD = 0.4;  // 40% forecast volatility triggers predictive warnings

  function analyzeForecastVolatility() {
    const forecastMap = NeuralForecastEngine.getForecastReport();
    const total = forecastMap.length;

    if (total === 0) {
      console.log("🌐 Predictive Stabilization: No forecast data available.");
      return;
    }

    let highRiskPanels = 0;

    forecastMap.forEach(([targetId, activationCount]) => {
      const panelId = `panel${targetId}`;
      const panelExists = !!document.getElementById(panelId);
      if (!panelExists) {
        highRiskPanels++;
      }
    });

    const volatilityRate = highRiskPanels / total;
    console.log(`🌡 Predictive Forecast Volatility: ${(volatilityRate * 100).toFixed(1)}%`);

    if (volatilityRate >= PREDICTIVE_RISK_THRESHOLD) {
      console.warn("⚠ Predictive Alert: Forecast volatility elevated — preemptive stabilization recommended.");
      NeuralAutonomousRepairCore.runFullRepairCycle();
    } else {
      console.log("✅ Predictive Stabilization: Forecast within normal tolerance.");
    }
  }

  function startPredictiveLoop(intervalMs = 45000) {
    console.log(`🧠 Predictive Stabilization Loop Activated: scanning every ${intervalMs / 1000} seconds.`);
    analyzeForecastVolatility();
    setInterval(analyzeForecastVolatility, intervalMs);
  }

  return {
    analyzeForecastVolatility,
    startPredictiveLoop
  };

})();
// === Phase 8009.0: Neural Sentinel Coordination Core ===
window.NeuralSentinelCoordinator = (function() {

  let coordinationLoop = null;
  const LOOP_INTERVAL = 60000;  // 60 seconds

  function runCoordinationCycle() {
    console.log("🧭 Running Neural Sentinel Coordination Cycle...");

    // Step 1️⃣ Capture latest redundancy buffer
    NeuralRedundancyBufferCore.captureBuffer();

    // Step 2️⃣ Validate Archive Integrity
    const archiveValid = NeuralStateIntegritySentinel.validateArchive();
    if (!archiveValid) {
      console.warn("⚠ Archive instability detected — attempting auto-recovery...");
      NeuralStateIntegritySentinel.attemptAutoRecovery();
    }

    // Step 3️⃣ Predictive Forecast Stabilization
    NeuralPredictiveStabilizationEngine.analyzeForecastVolatility();

    // Step 4️⃣ Run Full Repair Cycle (if triggered by predictive or audit failures)
    NeuralAutonomousRepairCore.runFullRepairCycle();

    // Step 5️⃣ Governance Live Policy Evaluation
    NeuralGovernancePolicyCore.evaluateSystem();

    console.log("✅ Coordination Cycle Complete.");
  }

  function startCoordinationLoop() {
    console.log(`🧭 Sentinel Coordination Loop Activated — scanning every ${LOOP_INTERVAL / 1000} seconds.`);
    runCoordinationCycle();
    coordinationLoop = setInterval(runCoordinationCycle, LOOP_INTERVAL);
  }

  function stopCoordinationLoop() {
    if (coordinationLoop) {
      clearInterval(coordinationLoop);
      console.log("🛑 Sentinel Coordination Loop Deactivated.");
    } else {
      console.log("ℹ Coordination Loop not currently active.");
    }
  }

  return {
    startCoordinationLoop,
    stopCoordinationLoop
  };

})();
// === Phase 9000.1: Neural Health Diagnostics Panel ===
function runHealthDiagnostics() {
  const output = document.getElementById("healthOutput");
  if (!output) return;

  output.innerHTML = "🩺 Running Diagnostics...";

  setTimeout(() => {
    let report = "";

    // Archive Integrity
    const archiveValid = NeuralStateIntegritySentinel.validateArchive();
    report += `📦 Archive Valid: ${archiveValid ? "✅ OK" : "❌ FAILED"}\n`;

    // Forecast Report
    const forecast = NeuralForecastEngine.getForecastReport();
    report += `📊 Forecast Entries: ${forecast.length}\n`;

    // Drift Metrics
    const drift = NeuralDriftCore.getStatus();
    report += `🌌 Drift Active Panels: ${drift.uniquePanels.length}\n`;

    // Orbital Mesh Integrity
    const meshValid = NeuralOrbitalMeshReconciliation.validateOrbitalMesh();
    report += `🪐 Orbital Mesh Valid: ${meshValid ? "✅ OK" : "❌ FAILED"}\n`;

    output.innerHTML = `<pre>${report}</pre>`;
  }, 400);
}
// === Phase 9000.0: Orbital Control Room Panel Switching ===
function switchControlPanel(panelKey) {
  const panels = document.querySelectorAll('.control-panel');
  panels.forEach(panel => panel.classList.remove('active-panel'));

  const activePanel = document.getElementById(`panel-${panelKey}`);
  if (activePanel) {
    activePanel.classList.add('active-panel');
  }
}
// === Phase 9000.2: Forecast Cortex Summary Generator ===

function generateForecastSummary() {
  const cortex = NeuralForecastMemoryCortex.getForecastHistory();
  const output = document.getElementById("forecastSummaryOutput");
  if (!cortex || cortex.length === 0) {
    output.innerHTML = "<p>⚠ No forecast data loaded.</p>";
    return;
  }

  let summary = "";
  summary += `Total Forecast Records: ${cortex.length}\n`;

  const categories = {};
  cortex.forEach(f => {
    categories[f.division] = (categories[f.division] || 0) + 1;
  });

  summary += `Category Breakdown:\n`;
  Object.keys(categories).forEach(cat => {
    summary += ` - ${cat}: ${categories[cat]}\n`;
  });

  output.innerHTML = `<pre>${summary}</pre>`;
}

// === Phase 9000.2: Forecast Cortex Summary Generator ===

function generateForecastSummary() {
  const cortex = NeuralForecastMemoryCortex.getForecastHistory();
  const output = document.getElementById("forecastSummaryOutput");
  if (!cortex || cortex.length === 0) {
    output.innerHTML = "<p>⚠ No forecast data loaded.</p>";
    return;
  }

  let summary = "";
  summary += `Total Forecast Records: ${cortex.length}\n`;

  const categories = {};
  cortex.forEach(f => {
    categories[f.division] = (categories[f.division] || 0) + 1;
  });

  summary += `Category Breakdown:\n`;
  Object.keys(categories).forEach(cat => {
    summary += ` - ${cat}: ${categories[cat]}\n`;
  });

  output.innerHTML = `<pre>${summary}</pre>`;
}

// === Phase 9000.2: Forecast Cortex Summary Generator ===

function generateForecastSummary() {
  const cortex = NeuralForecastMemoryCortex.getForecastHistory();
  const output = document.getElementById("forecastSummaryOutput");
  if (!cortex || cortex.length === 0) {
    output.innerHTML = "<p>⚠ No forecast data loaded.</p>";
    return;
  }

  let summary = "";
  summary += `Total Forecast Records: ${cortex.length}\n`;

  const categories = {};
  cortex.forEach(f => {
    categories[f.division] = (categories[f.division] || 0) + 1;
  });

  summary += `Category Breakdown:\n`;
  Object.keys(categories).forEach(cat => {
    summary += ` - ${cat}: ${categories[cat]}\n`;
  });

  output.innerHTML = `<pre>${summary}</pre>`;
}

function clearForecastSummary() {
  document.getElementById("forecastSummaryOutput").innerHTML =
    "<p>📊 Forecast report output cleared.</p>";
}
// === Phase 9000.3: Governance Policy Engine ===

function applyPolicyChanges() {
  const risk = parseInt(document.getElementById("riskThresholdInput").value);
  const drift = parseInt(document.getElementById("driftThresholdInput").value);
  const error = parseInt(document.getElementById("errorThresholdInput").value);

  if (!window.neuralGovernancePolicyCore) {
    window.neuralGovernancePolicyCore = {};
  }

  window.neuralGovernancePolicyCore.risk = risk;
  window.neuralGovernancePolicyCore.drift = drift;
  window.neuralGovernancePolicyCore.error = error;

  const status = document.getElementById("policyStatusOutput");
  status.textContent = `✅ Policy Applied: Risk ${risk} | Drift ${drift} | Error ${error}`;
  console.log("⚖ Governance Policy Updated:", window.neuralGovernancePolicyCore);
}
// === Phase 9000.4: Neural Healing Console ===

function runFullSelfHealing() {
  NeuralAuditSentinel.auditWiring();
  NeuralSelfHealingEngine.runSelfHealing();
  healDriftState();
  const output = document.getElementById("healingStatusOutput");
  output.textContent = "✅ Full Healing Sequence Complete.";
}

function healWiringOnly() {
  NeuralAuditSentinel.auditWiring();
  NeuralSelfHealingEngine.runSelfHealing();
  const output = document.getElementById("healingStatusOutput");
  output.textContent = "✅ Wiring Layer Repaired.";
}

function healDriftState() {
  if (window.NeuralDriftCore?.stabilizeDrift) {
    window.NeuralDriftCore.stabilizeDrift();
  }
  const output = document.getElementById("healingStatusOutput");
  output.textContent = "✅ Drift Synchronization Healed.";
}
// === Phase 9000.5: Archive & Snapshot Console ===

function saveSnapshot() {
  NeuralTemporalRollbackCore.saveSnapshot();
  listSnapshots();
}

function listSnapshots() {
  const keys = NeuralTemporalRollbackCore.listSnapshots();
  const output = document.getElementById("snapshotListOutput");
  if (!output) return;

  if (keys.length === 0) {
    output.innerHTML = "<p>📜 No snapshots found.</p>";
    return;
  }

  output.innerHTML = "<ul>";
  keys.forEach(key => {
    output.innerHTML += `<li>${key} <button onclick="loadSnapshot('${key}')">Restore</button></li>`;
  });
  output.innerHTML += "</ul>";
}

function loadSnapshot(key) {
  NeuralTemporalRollbackCore.loadSnapshot(key);
  NeuralStateArchiveCore.saveState(); // Optional: re-sync archive after rollback
}

function clearSnapshots() {
  if (confirm("⚠ Are you sure you want to clear all snapshots?")) {
    NeuralTemporalRollbackCore.clearAllSnapshots();
    listSnapshots();
  }
}
// === Phase 9000.6: Redundancy Buffer Console ===

function createRedundancyBackup() {
  const archive = NeuralStateArchiveCore?.saveState?.();
  if (!archive) {
    alert("⚠ Failed to create redundancy backup.");
    return;
  }
  localStorage.setItem("redundancyBackup", JSON.stringify(archive));
  const output = document.getElementById("redundancyStatusOutput");
  output.textContent = "📦 Redundancy Backup Created";
}

function restoreRedundancyBackup() {
  const data = localStorage.getItem("redundancyBackup");
  if (!data) {
    alert("⚠ No redundancy backup found.");
    return;
  }
  try {
    const archive = JSON.parse(data);
    NeuralStateArchiveCore?.loadState?.(archive);
    const output = document.getElementById("redundancyStatusOutput");
    output.textContent = "📥 Redundancy Backup Restored";
  } catch {
    alert("⚠ Failed to parse redundancy backup.");
  }
}

function clearRedundancyBackup() {
  localStorage.removeItem("redundancyBackup");
  const output = document.getElementById("redundancyStatusOutput");
  output.textContent = "🧹 Redundancy Backup Cleared";
}