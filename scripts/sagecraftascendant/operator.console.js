  // Phase 18.1 — Neural Live Table Core Rendering
  SageCraftAscendant.OperatorConsole.renderLiveTablePanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "📊 Neural Live Table";
    section.appendChild(header);

    // Build Table Container
    const tableContainer = document.createElement("div");
    tableContainer.style.overflowX = "auto";
    tableContainer.style.border = "1px solid #555";
    tableContainer.style.background = "#111";
    tableContainer.style.padding = "10px";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.color = "#eee";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = ["Item #", "Description", "Location", "Quantity", "Category"];
    headers.forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.border = "1px solid #666";
      th.style.padding = "8px";
      th.style.background = "#222";
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.id = "neuralLiveTableBody";
    table.appendChild(tbody);

    tableContainer.appendChild(table);
    // Attempt to auto-load persisted table state
    if (SageCraftAscendant.NeuralLiveTable?.loadPersistentState) {
      SageCraftAscendant.NeuralLiveTable.loadPersistentState();
    }
    section.appendChild(tableContainer);

    const message = document.createElement("p");
    message.style.marginTop = "10px";
    message.style.fontStyle = "italic";
    message.style.color = "#aaa";
    message.textContent = "⚙ Neural Live Table core initialized. Data population coming in Phase 18.2+.";
    section.appendChild(message);

    // === Phase 18.2: Inject Mock Data Button for Verification ===
    const injectBtn = document.createElement("button");
    injectBtn.textContent = "➕ Inject Mock Data";
    injectBtn.style.marginTop = "10px";
    injectBtn.onclick = () => {
      SageCraftAscendant.NeuralLiveTable.injectMockData();
    };
    section.appendChild(injectBtn);

    container.appendChild(section);
  };
  // Phase 18.2 — Neural Live Table Data Injection Engine
  SageCraftAscendant.NeuralLiveTable = (function() {
    const _tableBodyId = "neuralLiveTableBody";

    function injectMockData() {
      const mockData = [
        { item: "1001", desc: "Crystal Wand", loc: "Vault A1", qty: 10, cat: "Artifacts" },
        { item: "1002", desc: "Enchanted Scroll", loc: "Library B2", qty: 25, cat: "Tomes" },
        { item: "1003", desc: "Starlight Orb", loc: "Observatory C3", qty: 5, cat: "Celestial" }
      ];
      renderData(mockData);
    }

    function renderData(data) {
      const tbody = document.getElementById(_tableBodyId);
      if (!tbody) {
        console.warn("⚠ Live Table body not found.");
        return;
      }

      tbody.innerHTML = ""; // Clear existing rows

      data.forEach(entry => {
        const row = document.createElement("tr");

        [entry.item, entry.desc, entry.loc, entry.qty, entry.cat].forEach(val => {
          const td = document.createElement("td");
          td.textContent = val;
          td.style.border = "1px solid #666";
          td.style.padding = "6px";
          row.appendChild(td);
        });

        tbody.appendChild(row);
      });
    }

    function importData(externalData) {
      if (!Array.isArray(externalData) || externalData.length === 0) {
        console.warn("⚠ Invalid or empty external data provided.");
        return;
      }
      renderData(externalData);
    }

    // === Added: Save/Restore Live Table State ===
    function saveTableState() {
      const tbody = document.getElementById(_tableBodyId);
      if (!tbody) {
        console.warn("⚠ Live Table body not found.");
        return;
      }

      const rows = [...tbody.querySelectorAll("tr")];
      const data = rows.map(row => {
        const cells = [...row.querySelectorAll("td")].map(td => td.textContent);
        return {
          item: cells[0],
          desc: cells[1],
          loc: cells[2],
          qty: parseInt(cells[3]),
          cat: cells[4]
        };
      });

      SageCraftAscendant.NeuralMemoryExpansion?.saveLiveTableMemory(data);
      console.log("💾 Live Table state saved to neural memory.");
    }

    function restoreTableState() {
      const data = SageCraftAscendant.NeuralMemoryExpansion?.loadLiveTableMemory();
      if (Array.isArray(data)) {
        renderData(data);
        console.log("🔄 Live Table state restored from neural memory.");
      } else {
        console.warn("⚠ No Live Table memory found to restore.");
      }
    }

    // === Persistence Registry Save/Load Functions ===
    function savePersistentState() {
      const tbody = document.getElementById(_tableBodyId);
      if (!tbody) {
        console.warn("⚠ Live Table body not found.");
        return;
      }

      const rows = [...tbody.querySelectorAll("tr")];
      const data = rows.map(row => {
        const cells = [...row.querySelectorAll("td")].map(td => td.textContent);
        return {
          item: cells[0],
          desc: cells[1],
          loc: cells[2],
          qty: parseInt(cells[3]),
          cat: cells[4]
        };
      });

      SageCraftAscendant.PersistenceRegistry?.saveLiveTableSnapshot?.(data);
      console.log("💾 Live Table state saved to Persistence Layer.");
    }

    function loadPersistentState() {
      const data = SageCraftAscendant.PersistenceRegistry?.loadLiveTableSnapshot?.();
      if (Array.isArray(data)) {
        renderData(data);
        console.log("🔄 Live Table state restored from Persistence Layer.");
      } else {
        console.warn("⚠ No persisted Live Table snapshot found.");
      }
    }

    return {
      injectMockData,
      renderData,
      importData,
      saveTableState,
      restoreTableState,
      savePersistentState,
      loadPersistentState
    };
  })();
// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.5
// Subsystem: Operator Console

window.SageCraftAscendant = window.SageCraftAscendant || {};

  // Phase 17.1 — Subsystem Registry Initialization
  SageCraftAscendant.OperatorConsoleRegistry = {
    panels: {},
    registerPanel: function(panelConfig) {
      this.panels[panelConfig.id] = panelConfig;
    },
    listPanels: function() {
      return Object.values(this.panels);
    }
  };

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

  // Phase 17.2.0 — Diagnostics Console Migration
  SageCraftAscendant.OperatorConsole.renderDiagnosticsPanel = function (container) {
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

  // Diagnostics Panel Registration — Phase 17.2.0
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'diagnostics',
    label: 'Diagnostics Console',
    render: SageCraftAscendant.OperatorConsole.renderDiagnosticsPanel
  });

  // Phase 17.2.1 — Mesh Integrity Overlay Migration
  SageCraftAscendant.OperatorConsole.renderMeshIntegrityPanel = function (container) {
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

  // Mesh Integrity Panel Registration — Phase 17.2.1
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'meshIntegrity',
    label: 'Mesh Integrity Overlay',
    render: SageCraftAscendant.OperatorConsole.renderMeshIntegrityPanel
  });


  // Phase 17.2.2 — Event Log Console Migration
  SageCraftAscendant.OperatorConsole.renderEventLogPanel = function (container) {
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

  // Event Log Panel Registration — Phase 17.2.2
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'eventLog',
    label: 'Event Log Console',
    render: SageCraftAscendant.OperatorConsole.renderEventLogPanel
  });


  // Phase 17.2.3 — Forecast Anomaly Sentinel Migration
  SageCraftAscendant.OperatorConsole.renderForecastAnomalyPanel = function (container) {
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

  // Forecast Anomaly Panel Registration — Phase 17.2.3
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'forecastAnomaly',
    label: 'Forecast Anomaly Sentinel',
    render: SageCraftAscendant.OperatorConsole.renderForecastAnomalyPanel
  });


  // Phase 17.2.4 — Control Lattice Migration
  SageCraftAscendant.OperatorConsole.renderControlLatticePanel = function (container) {
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

  // Control Lattice Panel Registration — Phase 17.2.4
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'controlLattice',
    label: 'Control Lattice Console',
    render: SageCraftAscendant.OperatorConsole.renderControlLatticePanel
  });


  // Phase 17.2.5 — Neural Memory Console Migration
  SageCraftAscendant.OperatorConsole.renderMemoryPanel = function (container) {
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

  // Memory Panel Registration — Phase 17.2.5
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'memoryControl',
    label: 'Memory Control Console',
    render: SageCraftAscendant.OperatorConsole.renderMemoryPanel
  });


  // Phase 17.2.6 — Neural Autonomous Recovery Console Migration
  SageCraftAscendant.OperatorConsole.renderRecoveryPanel = function (container) {
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

  // Recovery Panel Registration — Phase 17.2.6
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'recoveryConsole',
    label: 'Recovery Console',
    render: SageCraftAscendant.OperatorConsole.renderRecoveryPanel
  });


  // Phase 17.2.7 — Forecast Mutation Console Migration
  SageCraftAscendant.OperatorConsole.renderForecastMutationPanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🧪 Forecast Mutation Simulator";
    section.appendChild(header);

    const factorInput = document.createElement("input");
    factorInput.type = "number";
    factorInput.value = "15";
    factorInput.min = "1";
    factorInput.max = "50";
    factorInput.style.width = "60px";
    section.appendChild(document.createTextNode("Mutation Factor (%): "));
    section.appendChild(factorInput);

    section.appendChild(document.createElement("br"));

    const scenariosInput = document.createElement("input");
    scenariosInput.type = "number";
    scenariosInput.value = "5";
    scenariosInput.min = "1";
    scenariosInput.max = "50";
    scenariosInput.style.width = "60px";
    section.appendChild(document.createTextNode("Scenarios: "));
    section.appendChild(scenariosInput);

    section.appendChild(document.createElement("br"));

    const runBtn = document.createElement("button");
    runBtn.textContent = "🧬 Run Mutation";
    runBtn.onclick = () => {
      const factor = parseFloat(factorInput.value) / 100;
      const scenarios = parseInt(scenariosInput.value);
      const mockForecast = [
        { label: "Metric A", value: 100 },
        { label: "Metric B", value: 250 },
        { label: "Metric C", value: 75 }
      ];
      const result = SageCraftAscendant.NeuralForecastMutation?.mutateForecasts(mockForecast, factor, scenarios);
      console.log("🧪 Mutation Result:", result);
      alert("Forecast Mutations Complete — check console for results.");
    };
    section.appendChild(runBtn);

    const historyBtn = document.createElement("button");
    historyBtn.textContent = "📜 View Mutation History";
    historyBtn.onclick = () => {
      const history = SageCraftAscendant.NeuralForecastMutation?.getMutationHistory();
      console.log("📜 Mutation History:", history);
      alert(JSON.stringify(history, null, 2));
    };
    section.appendChild(historyBtn);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "🧹 Clear History";
    clearBtn.onclick = () => {
      if (confirm("Clear all mutation history?")) {
        SageCraftAscendant.NeuralForecastMutation?.clearMutationHistory();
      }
    };
    section.appendChild(clearBtn);

    container.appendChild(section);
  };

  // Forecast Mutation Panel Registration — Phase 17.2.7
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'forecastMutation',
    label: 'Forecast Mutation Simulator',
    render: SageCraftAscendant.OperatorConsole.renderForecastMutationPanel
  });


  // Phase 17.0 — Unified Operator Control Deck Bootstrap
  SageCraftAscendant.OperatorConsole.renderOperatorControlDeck = function () {
    const root = document.getElementById("operatorConsole");
    if (!root) {
      console.warn("⚠ Operator Console container not found.");
      return;
    }

    // Clear existing contents
    root.innerHTML = '';

    // Create Control Deck container
    const deckContainer = document.createElement("div");
    deckContainer.id = "operatorControlDeck";
    deckContainer.style.display = "flex";
    deckContainer.style.flexDirection = "row";
    deckContainer.style.height = "100%";

    // Create Navigation Menu placeholder
    const navMenu = document.createElement("div");
    navMenu.id = "navigationMenu";
    navMenu.style.width = "220px";
    navMenu.style.borderRight = "1px solid #555";
    navMenu.style.padding = "10px";
    navMenu.style.background = "#222";
    navMenu.innerHTML = "<h3>🧭 Control Deck</h3><p>Subsystem Navigation Loading...</p>";

    // Create Panel Container placeholder
    const panelContainer = document.createElement("div");
    panelContainer.id = "panelContainer";
    panelContainer.style.flexGrow = "1";
    panelContainer.style.padding = "10px";
    panelContainer.style.background = "#111";

    // Assemble deck
    deckContainer.appendChild(navMenu);
    deckContainer.appendChild(panelContainer);
    root.appendChild(deckContainer);

    console.log("✅ Operator Control Deck Bootstrap Initialized.");
  };

  // Phase 17.1 — Subsystem Navigation Rendering
  SageCraftAscendant.OperatorConsole.renderSubsystemNavigation = function () {
    const navMenu = document.getElementById("navigationMenu");
    const panelContainer = document.getElementById("panelContainer");
    if (!navMenu || !panelContainer) return;

    navMenu.innerHTML = "<h3>🧭 Control Deck</h3>";

    SageCraftAscendant.OperatorConsoleRegistry.listPanels().forEach(panel => {
      const btn = document.createElement("button");
      btn.textContent = panel.label;
      btn.style.display = "block";
      btn.style.width = "100%";
      btn.style.marginBottom = "5px";
      btn.onclick = () => {
        panelContainer.innerHTML = '';
        panel.render(panelContainer);
      };
      navMenu.appendChild(btn);
    });

    console.log("✅ Subsystem Navigation Menu Rendered.");
  };

  return {
    renderOperatorConsole,
    renderOperatorControlDeck: SageCraftAscendant.OperatorConsole.renderOperatorControlDeck,
    renderSubsystemNavigation: SageCraftAscendant.OperatorConsole.renderSubsystemNavigation
  };
})();
  // Live Table Panel Registration — Phase 18.0
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'liveTable',
    label: 'Neural Live Table',
    render: SageCraftAscendant.OperatorConsole.renderLiveTablePanel
  });