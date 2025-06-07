// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.5
// Subsystem: Operator Console

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.OperatorConsole = (function() {

  function renderOperatorConsole() {
    const operatorTools = document.getElementById("operatorTools");
    if (!operatorTools) {
      console.warn("⚠ Operator Tools Panel not found.");
      return;
    }

    operatorTools.innerHTML = '';  // Clear existing buttons

    const controls = [
      { label: "🧪 Audit Integrity Scan", action: () => NeuralAuditSentinel?.auditWiring() },
      { label: "🛡 Run Self-Healing Engine", action: () => NeuralSelfHealingEngine?.runSelfHealing() },
      { label: "🌀 Clear Forecast History", action: () => NeuralForecastEngine?.clearForecast() },
      { label: "🧠 Start Cortex Loop", action: () => NeuralCortexEngine?.startCortexLoop() },
      { label: "🪐 Validate Orbital Mesh", action: () => NeuralOrbitalMeshReconciliation?.validateOrbitalMesh() },
      { label: "⚖ Reset Supervisor Escalation", action: () => NeuralOperatorOverride?.resetSupervisorEscalation() },
      { label: "🛠 Rebuild Orbital Mesh", action: () => NeuralOperatorOverride?.manualMeshRebuild() },
      { label: "💾 Save Memory Snapshot", action: () => NeuralTemporalRollbackCore?.saveSnapshot() },
      { label: "📂 List Snapshots", action: () => listSnapshots() },
      { label: "🧹 Clear Snapshots", action: () => clearSnapshots() }
    ];

    controls.forEach(ctrl => {
      const btn = document.createElement("button");
      btn.innerText = ctrl.label;
      btn.addEventListener("click", ctrl.action);
      operatorTools.appendChild(btn);
    });

    // === Phase 6.1: Mutation Control Panel Injection ===
    const mutationSection = document.createElement("div");
    mutationSection.style.marginTop = "30px";
    mutationSection.innerHTML = `
      <h3 style="color:#cc66ff;">⚙ Forecast Mutation Simulator</h3>
      <label>Mutation Factor (%): <input id="mutationFactorInput" type="number" value="15" min="1" max="50" style="width:80px;"></label><br>
      <label>Scenarios: <input id="mutationScenariosInput" type="number" value="5" min="1" max="50" style="width:80px;"></label><br>
      <button id="runMutationBtn" style="margin-top:10px;">🧪 Run Forecast Mutation</button>
      <button id="exportMutationsBtn" style="margin-top:10px;">📤 Export Mutated Forecasts</button>
    `;
    operatorTools.appendChild(mutationSection);

    document.getElementById("runMutationBtn").addEventListener("click", () => {
      const factor = parseFloat(document.getElementById("mutationFactorInput").value) / 100;
      const scenarios = parseInt(document.getElementById("mutationScenariosInput").value);
      SageCraftAscendant.ForecastMutationLayer.mutateSynthesizedForecast(factor, scenarios);
    });

    document.getElementById("exportMutationsBtn").addEventListener("click", () => {
      SageCraftAscendant.ForecastMutationLayer.exportMutatedForecasts();
    });

    console.log("✅ Operator Console fully rendered.");
  }

  // Phase 9.3 — Live Orbit Injection Console
  SageCraftAscendant.OperatorConsole.registerOrbitInjectionControls = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🛰 Live Orbit Injection";
    section.appendChild(header);

    const labelInput = document.createElement("input");
    labelInput.placeholder = "Orbit Label";
    section.appendChild(labelInput);

    const panelInput = document.createElement("input");
    panelInput.placeholder = "Panel ID";
    section.appendChild(panelInput);

    const iconInput = document.createElement("input");
    iconInput.placeholder = "Icon Filename";
    section.appendChild(iconInput);

    const injectBtn = document.createElement("button");
    injectBtn.textContent = "➕ Inject Orbit";
    injectBtn.onclick = () => {
      const label = labelInput.value.trim();
      const panelId = panelInput.value.trim();
      const icon = iconInput.value.trim() || "icon-default.png";
      if (!label || !panelId) {
        alert("⚠ Both Label and Panel ID are required.");
        return;
      }
      SageCraftAscendant.OrbitRegistry.registerOrbit(panelId, label, [], icon);
      SageCraftAscendant.NeuralOrbitalDockMesh.renderDock();
      SageCraftAscendant.PersistenceRegistry.saveRegistry(SageCraftAscendant.OrbitRegistry.listOrbits());
      // === Dock Persistence Sync Hook ===
      if (SageCraftAscendant.DockPersistence?.saveRegistry) {
        SageCraftAscendant.DockPersistence.saveRegistry(SageCraftAscendant.OrbitRegistry.listOrbits());
        console.log("💾 DockPersistence updated.");
      }
      alert(`✅ Orbit '${label}' injected and saved.`);
    };

    section.appendChild(injectBtn);
    container.appendChild(section);
  };

  // Phase 9.5 — Orbit Removal Console Enhancer
  SageCraftAscendant.OperatorConsole.registerOrbitRemovalControls = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🗑 Orbit Removal Console";
    section.appendChild(header);

    const orbitList = document.createElement("div");
    orbitList.id = "orbitRemovalList";
    section.appendChild(orbitList);

    container.appendChild(section);

    function refreshOrbitList() {
      orbitList.innerHTML = '';

      const registry = SageCraftAscendant.OrbitRegistry.listOrbits();
      Object.entries(registry).forEach(([key, orbit]) => {
        const orbitBtn = document.createElement("button");
        orbitBtn.textContent = `Remove ${orbit.label}`;
        orbitBtn.style.margin = "5px";
        orbitBtn.onclick = () => {
          if (confirm(`Remove orbit '${orbit.label}'?`)) {
            SageCraftAscendant.OrbitRegistry.removeOrbit(key);
            SageCraftAscendant.NeuralOrbitalDockMesh.renderDock();
            SageCraftAscendant.PersistenceRegistry.saveRegistry(SageCraftAscendant.OrbitRegistry.listOrbits());
            refreshOrbitList();
          }
        };
        orbitList.appendChild(orbitBtn);
      });
    }

    refreshOrbitList();
  };

  // Phase 9.7 — Neural Orbital Registry Control Panel
  SageCraftAscendant.OperatorConsole.registerOrbitRegistryControls = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🪐 Neural Orbit Registry";
    section.appendChild(header);

    const listBtn = document.createElement("button");
    listBtn.textContent = "📋 List Current Orbits";
    listBtn.onclick = () => {
      const orbits = SageCraftAscendant.OrbitRegistry.listOrbits();
      console.log("🪐 Current Orbits:", orbits);
      alert(JSON.stringify(orbits, null, 2));
    };
    section.appendChild(listBtn);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "🧹 Clear Registry";
    clearBtn.onclick = () => {
      if (confirm("⚠ Are you sure you want to clear ALL orbits?")) {
        SageCraftAscendant.OrbitRegistry.clearRegistry();
        SageCraftAscendant.NeuralOrbitalDockMesh.renderDock();
        SageCraftAscendant.PersistenceRegistry.saveRegistry(SageCraftAscendant.OrbitRegistry.listOrbits());
        alert("✅ Registry cleared.");
      }
    };
    section.appendChild(clearBtn);

    container.appendChild(section);
  };

  // Phase 10.4 — Neural Diagnostics Console Deployment
  SageCraftAscendant.OperatorConsole.registerDiagnosticsConsole = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🧬 Neural Diagnostics Console";
    section.appendChild(header);

    const integrityBtn = document.createElement("button");
    integrityBtn.textContent = "🔎 Run Integrity Scan";
    integrityBtn.onclick = () => {
      const result = SageCraftAscendant.NeuralMeshDiagnostics?.runIntegrityScan();
      console.log("🧬 Integrity Scan Result:", result);
      alert(JSON.stringify(result, null, 2));
    };
    section.appendChild(integrityBtn);

    const auditBtn = document.createElement("button");
    auditBtn.textContent = "🩺 Subsystem Audit";
    auditBtn.onclick = () => {
      const audit = SageCraftAscendant.NeuralMeshDiagnostics?.runSubsystemAudit();
      console.log("🩺 Subsystem Audit Report:", audit);
      alert(JSON.stringify(audit, null, 2));
    };
    section.appendChild(auditBtn);

    container.appendChild(section);
  };

  // Phase 10.5 — Mesh Integrity Overlay Panel Deployment
  SageCraftAscendant.OperatorConsole.registerMeshIntegrityOverlay = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🌐 Mesh Integrity Overlay";
    section.appendChild(header);

    const meshContainer = document.createElement("div");
    meshContainer.style.border = "1px solid #888";
    meshContainer.style.padding = "10px";
    meshContainer.style.background = "#111";
    meshContainer.style.color = "#0f0";

    const orbits = window.NeuralOrbitRegistry?.listOrbits?.() || {};

    if (Object.keys(orbits).length === 0) {
      meshContainer.textContent = "No active orbits detected.";
    } else {
      for (const key in orbits) {
        const orbit = orbits[key];
        const orbitStatus = document.createElement("div");
        orbitStatus.textContent = `🛰 ${orbit.label} [${orbit.panelId}] — Modules: ${orbit.modules.length}`;
        meshContainer.appendChild(orbitStatus);
      }
    }

    section.appendChild(meshContainer);
    container.appendChild(section);
  };

  // Phase 11.1 — Neural Event Log Console Deployment
  SageCraftAscendant.OperatorConsole.registerEventLogConsole = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "📜 Neural Event Log";
    section.appendChild(header);

    const viewLogBtn = document.createElement("button");
    viewLogBtn.textContent = "🔎 View Event Log";
    viewLogBtn.onclick = () => {
      const log = SageCraftAscendant.NeuralEventLogger?.getLog();
      console.log("📜 Neural Event Log:", log);
      alert(JSON.stringify(log, null, 2));
    };
    section.appendChild(viewLogBtn);

    const clearLogBtn = document.createElement("button");
    clearLogBtn.textContent = "🧹 Clear Event Log";
    clearLogBtn.onclick = () => {
      if (confirm("⚠ Are you sure you want to clear the Event Log?")) {
        SageCraftAscendant.NeuralEventLogger?.clearLog();
      }
    };
    section.appendChild(clearLogBtn);

    container.appendChild(section);
  };

  // Phase 12.1 — Neural Forecast Anomaly Console Deployment
  SageCraftAscendant.OperatorConsole.registerForecastAnomalyConsole = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🌩 Forecast Anomaly Sentinel";
    section.appendChild(header);

    const viewAnomaliesBtn = document.createElement("button");
    viewAnomaliesBtn.textContent = "🔎 View Anomalies";
    viewAnomaliesBtn.onclick = () => {
      const anomalies = SageCraftAscendant.NeuralForecastAnomalySentinel?.getAnomalies();
      console.log("🌩 Detected Anomalies:", anomalies);
      alert(JSON.stringify(anomalies, null, 2));
    };
    section.appendChild(viewAnomaliesBtn);

    const clearAnomaliesBtn = document.createElement("button");
    clearAnomaliesBtn.textContent = "🧹 Clear Anomalies";
    clearAnomaliesBtn.onclick = () => {
      if (confirm("⚠ Are you sure you want to clear all anomalies?")) {
        SageCraftAscendant.NeuralForecastAnomalySentinel?.clearAnomalies();
      }
    };
    section.appendChild(clearAnomaliesBtn);

    container.appendChild(section);
  };

  // Phase 13.0 — Neural Control Lattice Console Deployment
  SageCraftAscendant.OperatorConsole.registerControlLatticeConsole = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🧮 Neural Control Lattice";
    section.appendChild(header);

    const subsystems = [
      { label: "Diagnostics Console", toggle: () => toggleSubsystem("Diagnostics") },
      { label: "Mesh Overlay", toggle: () => toggleSubsystem("MeshOverlay") },
      { label: "Event Logger", toggle: () => toggleSubsystem("EventLogger") },
      { label: "Anomaly Sentinel", toggle: () => toggleSubsystem("AnomalySentinel") }
    ];

    subsystems.forEach(sub => {
      const btn = document.createElement("button");
      btn.innerText = `Toggle ${sub.label}`;
      btn.addEventListener("click", sub.toggle);
      section.appendChild(btn);
    });

    container.appendChild(section);

    function toggleSubsystem(subsystem) {
      alert(`🔄 Subsystem toggle requested: ${subsystem}`);
      // Placeholder: actual enable/disable logic can be wired here as subsystems evolve.
    }
  };

  // Phase 14.1 — Neural Memory Console Deployment
  SageCraftAscendant.OperatorConsole.registerMemoryConsole = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "💾 Neural Memory Control";
    section.appendChild(header);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "💾 Save Memory Snapshot";
    saveBtn.onclick = () => {
      SageCraftAscendant.NeuralMemoryExpansion?.saveCurrentState();
    };
    section.appendChild(saveBtn);

    const loadBtn = document.createElement("button");
    loadBtn.textContent = "🔄 Load Last Snapshot";
    loadBtn.onclick = () => {
      const memory = SageCraftAscendant.NeuralMemoryExpansion?.loadLastState();
      alert(JSON.stringify(memory, null, 2));
    };
    section.appendChild(loadBtn);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "🧹 Clear Saved Memory";
    clearBtn.onclick = () => {
      if (confirm("⚠ Are you sure you want to clear saved memory?")) {
        SageCraftAscendant.NeuralMemoryExpansion?.clearMemory();
      }
    };
    section.appendChild(clearBtn);

    container.appendChild(section);
  };

  // Phase 15.1 — Neural Autonomous Recovery Console Deployment
  SageCraftAscendant.OperatorConsole.registerRecoveryConsole = function () {
    const container = document.getElementById("operatorConsole");
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "⚙ Neural Recovery Console";
    section.appendChild(header);

    const recoveryBtn = document.createElement("button");
    recoveryBtn.textContent = "🛠 Run Autonomous Recovery";
    recoveryBtn.onclick = () => {
      SageCraftAscendant.NeuralRecoveryAutonomous?.runAutoRecovery();
    };
    section.appendChild(recoveryBtn);

    container.appendChild(section);
  };

  return {
    renderOperatorConsole,
    registerDiagnosticsConsole: SageCraftAscendant.OperatorConsole.registerDiagnosticsConsole,
    registerMeshIntegrityOverlay: SageCraftAscendant.OperatorConsole.registerMeshIntegrityOverlay,
    registerEventLogConsole: SageCraftAscendant.OperatorConsole.registerEventLogConsole,
    registerForecastAnomalyConsole: SageCraftAscendant.OperatorConsole.registerForecastAnomalyConsole,
    registerControlLatticeConsole: SageCraftAscendant.OperatorConsole.registerControlLatticeConsole,
    registerMemoryConsole: SageCraftAscendant.OperatorConsole.registerMemoryConsole,
    registerRecoveryConsole: SageCraftAscendant.OperatorConsole.registerRecoveryConsole
  };
})();