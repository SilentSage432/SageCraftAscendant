// SageCraft Ascendant — Modular Bootstrap Loader v1.0

document.addEventListener("DOMContentLoaded", async () => {
    async function loadComponent(id, url) {
      const startTime = performance.now();
      try {
        const res = await fetch(url);
        if (!res.ok) {
          const errorMsg = `❌ Failed to load ${url} — HTTP Status: ${res.status}`;
          console.error(errorMsg);
          publishInjectionFailure(id, url, res.status);
          return;
        }
        const html = await res.text();
        const mountPoint = document.getElementById(id);
        if (!mountPoint) {
          const errorMsg = `❌ Mount point '${id}' not found for component ${url}`;
          console.error(errorMsg);
          publishInjectionFailure(id, url, "NoMountPoint");
          return;
        }
        mountPoint.innerHTML = html;
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        console.log(`✅ Component loaded → ${url} (${duration} ms)`);
        publishInjectionTelemetry(id, url, duration);
      } catch (err) {
        console.error(`❌ Exception while loading component [${url}]:`, err);
        publishInjectionFailure(id, url, err.message);
      }
    }

    function publishInjectionFailure(id, url, reason) {
      const failurePayload = { id, url, reason, timestamp: new Date().toISOString() };
      console.warn("⚠ Injection Failure Sentinel:", failurePayload);
      // Future: NeuralBus integration point
      // SageCraftAscendant.NeuralBus?.publish("InjectionFailure", failurePayload);
    }

    function publishInjectionTelemetry(id, url, duration) {
      const telemetryPayload = { id, url, duration: `${duration} ms`, timestamp: new Date().toISOString() };
      console.info("📊 Injection Telemetry:", telemetryPayload);
      // Future: NeuralTelemetryBus integration
      // SageCraftAscendant.NeuralBus?.publish("InjectionTelemetry", telemetryPayload);
    }
  
    console.log("🚀 SageCraft Modular Bootstrap initializing...");

    const bootstrapModules = [
      './scripts/bootstrap/bootstrapCore.js',
      './scripts/bootstrap/bootstrapDiagnostics.js',
      './scripts/bootstrap/bootstrapNeural.js',
      './scripts/bootstrap/bootstrapDock.js',
      './scripts/bootstrap/bootstrapModal.js',
      './scripts/bootstrap/bootstrapSubsystems.js',
      './scripts/bootstrap/bootstrapToolbar.js',
      './scripts/bootstrap/bootstrapOperatorShell.js',
      './scripts/bootstrap/bootstrapVisualIdentity.js',
      './scripts/bootstrap/bootstrapAdvancedWiring.js',
      './scripts/bootstrap/sovereignRuntime.js'
    ];

    for (const path of bootstrapModules) {
      try {
        await import(path);
        console.log(`✅ Sovereign Bootstrap Module Loaded: ${path}`);
      } catch (err) {
        console.error(`❌ Failed to load ${path}`, err);
      }
    }

    // === Phase 1300 — Neural Cortex Synchronization Layer ===
    console.log("🧠 Neural Cortex Synchronization Layer Activated.");

    // === Phase 1400.0 — Emergency Dock Scaffold Bootstrap ===
    function emergencyDockScaffold() {
      console.log("🚑 Phase 1400.0 — Executing Dock Scaffold Safety Net...");

      const operatorConsoleMount = document.getElementById("operatorConsoleMount");
      if (!operatorConsoleMount) {
        console.warn("⚠ Dock Mount Point 'operatorConsoleMount' missing — constructing scaffold...");

        const mainDock = document.createElement("div");
        mainDock.id = "operatorConsoleMount";
        document.body.appendChild(mainDock);
        console.log("✅ Operator Console Mount successfully reconstructed.");
      } else {
        console.log("✅ Operator Console Mount already present — scaffold not required.");
      }

      const defaultPanels = [
        "diagnosticsPanel", "forecastPanel", "mutationPanel",
        "memoryPanel", "recoveryPanel", "eventLogPanel",
        "controlLatticePanel", "meshOverlayPanel", "oraclePanel"
      ];

      defaultPanels.forEach(panelId => {
        if (!document.getElementById(panelId)) {
          const panelDiv = document.createElement("div");
          panelDiv.id = panelId;
          panelDiv.classList.add("dock-panel");
          panelDiv.innerHTML = `<h3>${panelId}</h3><p>⚠ Awaiting subsystem injection.</p>`;
          document.getElementById("operatorConsoleMount").appendChild(panelDiv);
          console.log(`✅ Dock panel '${panelId}' scaffolded.`);
        }
      });
    }

    emergencyDockScaffold();

    // === Phase 1308-B — PredictiveHUD Path Resolution Audit ===
    try {
      const testPath = './scripts/operator/predictiveHUD.js';
      console.log(`🧪 PredictiveHUD Audit: Attempting to load: ${testPath}`);

      const testScript = document.createElement("script");
      testScript.src = testPath;
      testScript.onload = () => console.log("✅ PredictiveHUD test path successfully loaded");
      testScript.onerror = () => console.warn("❌ PredictiveHUD test path failed to load");

      document.body.appendChild(testScript);
    } catch (err) {
      console.error("❌ PredictiveHUD Path Audit Failure:", err);
    }

    async function initializeNeuralCortexSynchronization() {
      try {
        console.log("⚙ Performing Cortex Mesh Integrity Sweep...");

        const cortexModules = [
          ...SovereignManifest.forecastModules.map(m => `./scripts/forecast/${m}.js`),
          ...SovereignManifest.coreModules.map(m => `./scripts/core/${m}.js`),
          ...SovereignManifest.recoveryModules.map(m => `./scripts/recovery/${m}.js`)
        ];

        for (const modulePath of cortexModules) {
          try {
            await import(modulePath);
            console.log(`✅ Cortex Module Loaded: ${modulePath}`);
          } catch (err) {
            console.warn(`⚠ Failed to load Cortex Module: ${modulePath}`, err);
          }
        }

        console.log("🧠 Cortex Synchronization Complete.");
      } catch (err) {
        console.error("❌ Neural Cortex Synchronization failed:", err);
      }
    }

    await initializeNeuralCortexSynchronization();


    // === Phase 1906 — Sovereign Load Realignment Sequence ===

    const sovereignPreModules = [
      './scripts/operator/roles/roleAssignment.js',
      './scripts/operator/profiles/profileFabrication.js',
      './scripts/operator/wiring/subsystemBindings.js',
      './scripts/operator/wiring/dockToggleSystem.js',
      './scripts/operator/tools/sandboxEngine.js',
      './scripts/sageoracle/codex.whisper.core.js',
      './scripts/operator/sovereign/sovereignToggleAutoWire.js',
      './scripts/operator/sovereign/sovereignSubsystemWire.js',
      './scripts/operator/sovereign/sovereignDiagnostics.js',
      './scripts/operator/sovereign/sovereignNeuralReconciliation.js',
      './scripts/operator/sovereign/sovereignDockPopulationEngine.js',
      './scripts/operator/sovereign/sovereignDockToggleBinder.js',
      './scripts/sageoracle/oracleBootstrap.js',
      './scripts/operator/tools.js',
      './scripts/operator/reportingHub.js',
      './scripts/operator/progressDashboard.js',
      './scripts/operator/exceptionManager.js',
      './scripts/operator/mappings.js',
      './scripts/operator/NeuralBus.js',
      './scripts/operator/sovereign/sovereignToolbarRenderer.js',
      './scripts/operator/sovereign/sovereignControlToolbar.js'
    ];

    for (const modulePath of sovereignPreModules) {
      try {
        const mod = await import(modulePath);
        if (modulePath.includes('sovereignToolbarRenderer.js')) {
          window.SovereignToolbarRenderer = mod.default;
        }
        console.log(`✅ Sovereign Module Loaded: ${modulePath}`);
      } catch (err) {
        console.error(`❌ Failed to load Sovereign Module: ${modulePath}`, err);
      }
    }

    // === Phase 1908 — Sovereign Runtime Import Injector ===
    try {
      console.log("🚀 Phase 1908 — Sovereign Runtime Import Injector Activated");

      const sovereignToolbarModule = await import('./scripts/operator/sovereign/sovereignToolbarRenderer.js');
      
      if (!window.SovereignSubsystems) {
        window.SovereignSubsystems = {};
      }

      window.SovereignSubsystems.toolbarRenderer = sovereignToolbarModule.default;
      window.SovereignToolbarRenderer = sovereignToolbarModule.default;
      console.log("✅ SovereignToolbarRenderer dynamically imported and registered into SovereignSubsystems");
    } catch (err) {
      console.error("❌ Failed Phase 1908 Sovereign Import Injector:", err);
    }
    // === Phase 1907 — Sovereign Toolbar Render Invocation ===
    try {
      console.log("🔧 Phase 1907 — Sovereign Toolbar Render Invocation Activated.");
      if (typeof SovereignToolbarRenderer !== 'undefined' && typeof SovereignToolbarRenderer.renderToolbar === 'function') {
        SovereignToolbarRenderer.renderToolbar();
        console.log("✅ Sovereign Toolbar successfully rendered.");
      } else {
        console.warn("⚠ SovereignToolbarRenderer not available — toolbar render skipped.");
      }
    } catch (err) {
      console.error("❌ Exception during Sovereign Toolbar Render Invocation:", err);
    }

    // Load operatorDockWiring.js last
    try {
      await import('./scripts/operator/operatorDockWiring.js');
      console.log("✅ Sovereign Final Dock Wiring Loaded Successfully");
    } catch (err) {
      console.error("❌ Failed to load Sovereign Dock Wiring Module:", err);
    }

    // === Phase 37.0 — Visual Restoration Layer Bootstrap ===
    function injectVisualRestorationLayer() {
      console.log("🎨 Visual Restoration Layer Activated.");
      
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "./scripts/styles/sagecraftascendant.css";
      styleLink.onload = () => console.log("✅ SageCraftAscendant.css successfully loaded.");
      styleLink.onerror = () => console.warn("⚠ Failed to load SageCraftAscendant.css");

      document.head.appendChild(styleLink);
    }

    injectVisualRestorationLayer();
  
    // Mount points are already injected into index.html during Phase 31.1/31.2
    await loadComponent("headerMount", "/components/header.html");
    await loadComponent("operatorConsoleMount", "/components/operatorConsole.html");
    await loadComponent("footerMount", "/components/footer.html");

    // Phase 31.6 — Modular Modal Loader Injection
    const modalComponents = [
      "diagnosticsModal",
      "dropboxModal",
      "forecastDriftModal",
      "resolverModal",
      "trendsModal",
      "addItemModal",
      "editModal",
      "summaryModal",
      "customModal",
      "itemLinkModal",
      "devToolsModal"
    ];

    for (const modal of modalComponents) {
      await loadComponent("modalsMount", `/components/modals/${modal}.html`);
    }
  
    console.log("✅ All modular components injected.");

    // Phase 31.7 — Neural Modal Logic Binding Layer
    function bindModalLogic() {
      try {
        // Example binding: Add Item Modal
        const addItemBtn = document.getElementById("confirmAddItemBtn");
        if (addItemBtn) {
          addItemBtn.addEventListener("click", () => {
            console.log("🚀 Add Item logic triggered.");
            // Insert actual add item logic here
          });
        }

        // Example binding: Edit Item Modal
        const editItemBtn = document.getElementById("confirmEditBtn");
        if (editItemBtn) {
          editItemBtn.addEventListener("click", () => {
            console.log("🚀 Edit Item logic triggered.");
            // Insert actual edit item logic here
          });
        }

        // Example binding: Dropbox Upload
        const dropboxBtn = document.getElementById("uploadDropBoxBtn");
        if (dropboxBtn) {
          dropboxBtn.addEventListener("click", () => {
            console.log("🚀 Dropbox upload triggered.");
            // Insert actual dropbox logic here
          });
        }

        console.log("✅ Neural Modal Logic Binding Complete.");
      } catch (err) {
        console.error("❌ Error binding modal logic:", err);
      }
    }

    // Allow brief DOM settlement before binding logic
    setTimeout(bindModalLogic, 250);

    // Phase 32.1 — Neuroprogramming Macro Engine Activation
    if (typeof NeuralOperatorMacros !== 'undefined') {
      console.log("🧠 NeuralOperatorMacros Engine Initialized.");
      const macros = NeuralOperatorMacros.listMacros();
      console.log("📋 Registered Macros:", macros);
    } else {
      console.warn("⚠ NeuralOperatorMacros Engine not detected.");
    }
  
    // Phase 32.9 — Neural Modal Bootstrap Expansion Layer
    function initializeModalBootstrap() {
      console.log("🧬 Modal Bootstrap Layer Activated.");

      const modalBindings = [
        { id: "diagnosticsModal", logic: () => console.log("🧪 Diagnostics Modal Loaded") },
        { id: "dropboxModal", logic: () => console.log("☁ Dropbox Modal Loaded") },
        { id: "forecastDriftModal", logic: () => console.log("🌩 Forecast Drift Modal Loaded") },
        { id: "resolverModal", logic: () => console.log("🔧 Resolver Modal Loaded") },
        { id: "trendsModal", logic: () => console.log("📈 Trends Modal Loaded") },
        { id: "addItemModal", logic: () => console.log("➕ Add Item Modal Loaded") },
        { id: "editModal", logic: () => console.log("✏ Edit Modal Loaded") },
        { id: "summaryModal", logic: () => console.log("📊 Summary Modal Loaded") },
        { id: "customModal", logic: () => console.log("⚙ Custom Modal Loaded") },
        { id: "itemLinkModal", logic: () => console.log("🔗 Item Link Modal Loaded") },
        { id: "devToolsModal", logic: () => console.log("🛠 Dev Tools Modal Loaded") }
      ];

      modalBindings.forEach(binding => {
        const modalElement = document.getElementById(binding.id);
        if (modalElement) {
          console.log(`✅ Modal '${binding.id}' successfully linked.`);
          binding.logic();
        } else {
          console.warn(`⚠ Modal '${binding.id}' mount point missing.`);
        }
      });
    }


    setTimeout(initializeModalBootstrap, 500);

    // === Phase 600.3: Sovereign Advanced Dock Wiring Loader ===
    try {
      console.log("🔧 Injecting Advanced Dock Wiring Module...");
      const script = document.createElement("script");
      script.src = "/scripts/operator/operatorDockAdvancedPhases.js";
      script.onload = () => console.log("✅ Advanced Dock Wiring Module Loaded");
      script.onerror = () => console.warn("⚠ Failed to load operatorDockAdvancedPhases.js");
      document.body.appendChild(script);
    } catch (err) {
      console.error("❌ Failed injecting operatorDockAdvancedPhases.js", err);
    }

    // Phase 33.0 — Universal Modal Management Layer Bootstrap
    const ModalRegistry = {};

    function registerModal(id) {
      const modalElement = document.getElementById(id);
      if (!modalElement) {
        console.warn(`⚠ Cannot register modal '${id}' — mount point not found.`);
        return;
      }
      ModalRegistry[id] = modalElement;
      console.log(`📦 Modal '${id}' registered in Universal Modal Registry.`);
    }

    function showModal(id) {
      const modal = ModalRegistry[id];
      if (!modal) {
        console.warn(`⚠ Cannot show modal '${id}' — not registered.`);
        return;
      }
      modal.style.display = 'block';
      console.log(`🟢 Modal '${id}' displayed.`);
    }

    function hideModal(id) {
      const modal = ModalRegistry[id];
      if (!modal) {
        console.warn(`⚠ Cannot hide modal '${id}' — not registered.`);
        return;
      }
      modal.style.display = 'none';
      console.log(`🔴 Modal '${id}' hidden.`);
    }

    // Register all modals into the registry
    modalComponents.forEach(id => registerModal(id));

    // Phase 33.1 — Dynamic Modal Activation Layer
    const ModalController = {
      show: (id) => showModal(id),
      hide: (id) => hideModal(id),
      toggle: (id) => {
        const modal = ModalRegistry[id];
        if (!modal) {
          console.warn(`⚠ Cannot toggle modal '${id}' — not registered.`);
          return;
        }
        const isVisible = modal.style.display === 'block';
        if (isVisible) {
          hideModal(id);
        } else {
          showModal(id);
        }
      },
      listRegisteredModals: () => Object.keys(ModalRegistry)
    };

    console.log("🧪 ModalController is now live and operational.");

    // Phase 33.2 — Neural Modal Command Bus Integration
    if (typeof SageCraftAscendant !== 'undefined' && SageCraftAscendant.NeuralBus) {
      SageCraftAscendant.NeuralBus.subscribe("Modal:Show", payload => {
        const { id } = payload;
        console.log(`🟢 NeuralBus → Show Modal: ${id}`);
        ModalController.show(id);
      });

      SageCraftAscendant.NeuralBus.subscribe("Modal:Hide", payload => {
        const { id } = payload;
        console.log(`🔴 NeuralBus → Hide Modal: ${id}`);
        ModalController.hide(id);
      });

      SageCraftAscendant.NeuralBus.subscribe("Modal:Toggle", payload => {
        const { id } = payload;
        console.log(`🔄 NeuralBus → Toggle Modal: ${id}`);
        ModalController.toggle(id);
      });

      console.log("🧬 Neural Modal Command Bus fully integrated.");
    } else {
      console.warn("⚠ NeuralBus not detected — Modal Bus integration skipped.");

      // Phase 33.3 — Operator Console Modal Command Injection
      function wireOperatorConsoleModalButtons() {
        const modalLaunchBindings = [
          { btnId: "openDiagnosticsBtn", modalId: "diagnosticsModal" },
          { btnId: "openDropboxBtn", modalId: "dropboxModal" },
          { btnId: "openForecastDriftBtn", modalId: "forecastDriftModal" },
          { btnId: "openResolverBtn", modalId: "resolverModal" },
          { btnId: "openTrendsBtn", modalId: "trendsModal" },
          { btnId: "openAddItemBtn", modalId: "addItemModal" },
          { btnId: "openEditBtn", modalId: "editModal" },
          { btnId: "openSummaryBtn", modalId: "summaryModal" },
          { btnId: "openCustomBtn", modalId: "customModal" },
          { btnId: "openItemLinkBtn", modalId: "itemLinkModal" },
          { btnId: "openDevToolsBtn", modalId: "devToolsModal" }
        ];

        modalLaunchBindings.forEach(binding => {
          const btn = document.getElementById(binding.btnId);
          if (!btn) {
            console.warn(`⚠ Operator button '${binding.btnId}' not found.`);
            return;
          }
          btn.addEventListener("click", () => {
            console.log(`🚀 Operator requested modal: ${binding.modalId}`);
            ModalController.toggle(binding.modalId);
          });
        });

        console.log("✅ Operator Console Modal Buttons fully wired.");
      }

      // Allow full DOM load before wiring buttons
      setTimeout(wireOperatorConsoleModalButtons, 600);

      // Phase 33.4 — Neural Modal Persistence Memory Layer
      function saveModalState() {
        const state = {};
        Object.entries(ModalRegistry).forEach(([id, modal]) => {
          state[id] = (modal.style.display === 'block');
        });
        localStorage.setItem("modalState", JSON.stringify(state));
        console.log("💾 Modal state saved to persistence layer.");
      }

      function restoreModalState() {
        const stored = localStorage.getItem("modalState");
        if (!stored) {
          console.log("ℹ No persisted modal state found.");
          return;
        }
        const state = JSON.parse(stored);
        Object.entries(state).forEach(([id, isVisible]) => {
          if (ModalRegistry[id]) {
            ModalRegistry[id].style.display = isVisible ? 'block' : 'none';
            console.log(`🔄 Restored modal '${id}' → ${isVisible ? 'open' : 'closed'}`);
          }
        });
      }

      // Hook into ModalController for runtime persistence sync
      const originalToggle = ModalController.toggle;
      ModalController.toggle = (id) => {
        originalToggle(id);
        saveModalState();
      };

      restoreModalState();

      // Phase 33.5 — Operator Modal Snapshot Export System
      function exportModalSnapshot() {
        const snapshot = {};
        Object.entries(ModalRegistry).forEach(([id, modal]) => {
          snapshot[id] = {
            visible: (modal.style.display === 'block'),
            domPresent: !!modal
          };
        });
        console.log("📦 Modal Snapshot Export:", snapshot);
        alert("📤 Modal Snapshot exported — check console for full state.");
      }

      // Optional: expose to global scope for operator access
      window.exportModalSnapshot = exportModalSnapshot;

      console.log("🧬 Modal Snapshot Export System activated.");

      // Phase 34.0 — Modal Orchestration Matrix Bootstrap
      const ModalMatrix = {
        exclusiveGroups: {},

        defineExclusiveGroup(groupName, modalIds) {
          this.exclusiveGroups[groupName] = modalIds;
          console.log(`📊 Exclusive Modal Group '${groupName}' defined:`, modalIds);
        },

        openExclusive(groupName, idToOpen) {
          const group = this.exclusiveGroups[groupName];
          if (!group) {
            console.warn(`⚠ Exclusive group '${groupName}' not defined.`);
            return;
          }
          group.forEach(id => {
            if (id === idToOpen) {
              ModalController.show(id);
            } else {
              ModalController.hide(id);
            }
          });
          saveModalState();
        },

        closeAll() {
          ModalController.listRegisteredModals().forEach(id => ModalController.hide(id));
          saveModalState();
          console.log("🔒 All modals closed.");
        }
      };

      console.log("🧬 Modal Orchestration Matrix initialized.");

      // Phase 34.1 — Visual Orchestration Cycle: Live Mesh Restoration Seed
      function startVisualOrchestrationPulse() {
        console.log("🩺 Visual Orchestration Cycle Activated.");

        setInterval(() => {
          const activeModals = ModalController.listRegisteredModals().filter(id => {
            const modal = ModalRegistry[id];
            return modal && modal.style.display === 'block';
          });

          console.log(`🧬 Active Modals: [${activeModals.join(', ')}]`);

          // Future: Trigger visual sync, animations, recovery diagnostics, etc
          // Placeholder for upcoming Phase 34.2 Dock Resurrection Hooks
        }, 5000);
      }

      startVisualOrchestrationPulse();

      // Phase 34.2 — Dock Resurrection Bootstrap
      function rebuildDockPanels() {
        const dockMount = document.getElementById("operatorConsoleMount");
        if (!dockMount) {
          console.warn("⚠ Dock mount point not found — Dock Resurrection skipped.");
          return;
        }

        console.log("🪐 Beginning Dock Resurrection...");

        const panels = [
          { id: "diagnosticsPanel", label: "Diagnostics Console" },
          { id: "forecastPanel", label: "Forecast Analyzer" },
          { id: "mutationPanel", label: "Forecast Mutation Lab" },
          { id: "memoryPanel", label: "Memory Control" },
          { id: "recoveryPanel", label: "Recovery Console" },
          { id: "eventLogPanel", label: "Event Log Viewer" },
          { id: "controlLatticePanel", label: "Control Lattice" },
          { id: "meshOverlayPanel", label: "Mesh Overlay Integrity" },
          { id: "oraclePanel", label: "Silent Sage Oracle" }
        ];

        dockMount.innerHTML = '';  // Clear existing panels

        panels.forEach(panel => {
          const panelDiv = document.createElement("div");
          panelDiv.id = panel.id;
          panelDiv.classList.add("dock-panel");
          panelDiv.innerHTML = `<h3>${panel.label}</h3><p>⚠ Panel rendering pending subsystem injection.</p>`;
          dockMount.appendChild(panelDiv);
        });

        console.log("✅ Dock Resurrection Complete. Panels reinstated.");
      }

      setTimeout(rebuildDockPanels, 750);

      // Phase 34.3 — Dock Persistence Recovery Layer
      function saveDockState() {
        const panelStates = {};
        document.querySelectorAll(".dock-panel").forEach(panel => {
          panelStates[panel.id] = panel.style.display !== 'none';
        });
        localStorage.setItem("dockPanelState", JSON.stringify(panelStates));
        console.log("💾 Dock state saved.");
      }

      function restoreDockState() {
        const stored = localStorage.getItem("dockPanelState");
        if (!stored) {
          console.log("ℹ No persisted dock state found.");
          return;
        }
        const panelStates = JSON.parse(stored);
        document.querySelectorAll(".dock-panel").forEach(panel => {
          if (panelStates.hasOwnProperty(panel.id)) {
            panel.style.display = panelStates[panel.id] ? 'block' : 'none';
            console.log(`🔄 Restored dock panel '${panel.id}' → ${panelStates[panel.id] ? 'open' : 'closed'}`);
          }
        });
      }

      function wireDockToggleButtons() {
        document.querySelectorAll(".dock-panel").forEach(panel => {
          panel.addEventListener("click", () => {
            panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
            saveDockState();
          });
        });
      }

      setTimeout(() => {
        restoreDockState();
        wireDockToggleButtons();
      }, 1000);

      // Phase 34.4 — Dock Fluidity & Visual Restoration Layer
      function applyDockFluidity() {
        const style = document.createElement("style");
        style.innerHTML = `
          .dock-panel {
            transition: all 0.4s ease;
            opacity: 1;
            transform: scale(1);
          }
          .dock-panel.hidden {
            opacity: 0;
            transform: scale(0.95);
            pointer-events: none;
          }
        `;
        document.head.appendChild(style);
      }

      function enhancedWireDockToggleButtons() {
        document.querySelectorAll(".dock-panel").forEach(panel => {
          panel.addEventListener("click", () => {
            if (panel.classList.contains("hidden")) {
              panel.classList.remove("hidden");
            } else {
              panel.classList.add("hidden");
            }
            saveDockStateEnhanced();
          });
        });
      }

      function saveDockStateEnhanced() {
        const panelStates = {};
        document.querySelectorAll(".dock-panel").forEach(panel => {
          panelStates[panel.id] = !panel.classList.contains("hidden");
        });
        localStorage.setItem("dockPanelState", JSON.stringify(panelStates));
        console.log("💾 Enhanced dock state saved.");
      }

      function restoreDockStateEnhanced() {
        const stored = localStorage.getItem("dockPanelState");
        if (!stored) {
          console.log("ℹ No persisted dock state found (enhanced).");
          return;
        }
        const panelStates = JSON.parse(stored);
        document.querySelectorAll(".dock-panel").forEach(panel => {
          if (panelStates.hasOwnProperty(panel.id)) {
            if (panelStates[panel.id]) {
              panel.classList.remove("hidden");
            } else {
              panel.classList.add("hidden");
            }
            console.log(`🔄 Restored (enhanced) dock panel '${panel.id}' → ${panelStates[panel.id] ? 'open' : 'closed'}`);
          }
        });
      }

      // Apply fluidity layer
      applyDockFluidity();

      // Replace original state restoration with enhanced version
      setTimeout(() => {
        restoreDockStateEnhanced();
        enhancedWireDockToggleButtons();
      }, 1250);

      // Phase 35.0 — Neural Dock Elasticity Bootstrap
      function applyDockElasticity() {
        const style = document.createElement("style");
        style.innerHTML = `
          #operatorConsoleMount {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
            transition: all 0.4s ease;
          }
          .dock-panel {
            flex: 1 1 300px;
            min-width: 280px;
            max-width: 500px;
            background: #222;
            border: 1px solid #444;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
          }
        `;
        document.head.appendChild(style);
        console.log("🧬 Neural Dock Elasticity Activated.");
      }

      setTimeout(applyDockElasticity, 1500);

      // === Phase 37.1 — Neural Dock Elasticity Skin Upgrade ===
      function enhanceDockElasticitySkin() {
        const advancedStyle = document.createElement("style");
        advancedStyle.innerHTML = `
          #operatorConsoleMount {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            gap: 20px;
            padding: 25px;
            transition: all 0.5s ease;
          }
          .dock-panel {
            flex: 1 1 320px;
            min-width: 300px;
            max-width: 480px;
            background: radial-gradient(circle at top left, #331144, #110022);
            border: 1px solid #550088;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 0 20px rgba(204,102,255,0.3);
            color: #f0eaff;
            transition: all 0.4s ease;
          }
          .dock-panel:hover {
            transform: scale(1.03);
            box-shadow: 0 0 25px rgba(204,102,255,0.5);
            border-color: #cc66ff;
          }
        `;
        document.head.appendChild(advancedStyle);
        console.log("🎯 Dock Elasticity Skin Upgrade Activated.");
      }
      setTimeout(enhanceDockElasticitySkin, 1750);

      // === Phase 37.2 — Neural Control Deck Theming Harmonizer ===
      function injectControlDeckTheming() {
        const style = document.createElement("style");
        style.innerHTML = `
          body {
            background: linear-gradient(180deg, #0b0013, #140022, #1c002a);
            color: #eee;
            font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
            transition: all 0.5s ease;
          }
          header, footer {
            background: #220033;
            color: #cc99ff;
            text-align: center;
            padding: 15px 0;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
          }
          header h1, footer h1 {
            margin: 0;
            letter-spacing: 1px;
            font-size: 24px;
          }
          a {
            color: #cc66ff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `;
        document.head.appendChild(style);
        console.log("🎨 Control Deck Theming Harmonizer Activated.");
      }
      setTimeout(injectControlDeckTheming, 1250);

      // === Phase 37.3 — Control Deck Cinematic Fluidity Layer ===
      function injectControlDeckCinematics() {
        const style = document.createElement("style");
        style.innerHTML = `
          .dock-panel {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .dock-panel.active {
            opacity: 1;
            transform: translateY(0px);
          }
        `;
        document.head.appendChild(style);

        const panels = document.querySelectorAll(".dock-panel");
        panels.forEach((panel, idx) => {
          setTimeout(() => {
            panel.classList.add("active");
          }, 300 + (idx * 150));
        });

        console.log("🎞 Control Deck Cinematic Fluidity Activated.");
      }
      setTimeout(injectControlDeckCinematics, 2000);

      // === Phase 37.4 — Neural Operator Visual Identity Seal ===
      function injectVisualIdentitySeal() {
        const style = document.createElement("style");
        style.innerHTML = `
          .sagecraft-seal {
            position: fixed;
            bottom: 10px;
            right: 20px;
            color: #cc99ff;
            font-weight: bold;
            font-family: 'Segoe UI', 'Roboto', sans-serif;
            opacity: 0.7;
            z-index: 9999;
            transition: opacity 0.3s ease;
          }
          .sagecraft-seal:hover {
            opacity: 1;
            text-shadow: 0 0 8px #cc99ff;
          }
        `;
        document.head.appendChild(style);

        const seal = document.createElement("div");
        seal.classList.add("sagecraft-seal");
        seal.textContent = "SAGECRAFT ASCENDANT v1.5";
        document.body.appendChild(seal);

        console.log("🔖 Neural Operator Visual Identity Seal Applied.");
      }
      setTimeout(injectVisualIdentitySeal, 1500);

      // Phase 35.1 — Dynamic Subsystem Hot-Plug Bootstrap
      const SubsystemRegistry = {};

      function registerSubsystem(id, label, renderFn) {
        SubsystemRegistry[id] = { id, label, renderFn };
        console.log(`🧩 Subsystem Registered → ${label} (${id})`);
      }

      function injectSubsystem(id) {
        const subsystem = SubsystemRegistry[id];
        if (!subsystem) {
          console.warn(`⚠ Subsystem '${id}' not found in registry.`);
          return;
        }
        const panel = document.getElementById(subsystem.id);
        if (!panel) {
          console.warn(`⚠ Dock panel '${subsystem.id}' not found.`);
          return;
        }
        panel.innerHTML = ''; // Clear existing placeholder
        subsystem.renderFn(panel);
        console.log(`🚀 Subsystem '${subsystem.label}' injected into dock panel.`);
      }

      // Example: Seed initial subsystem (can be extended dynamically in future phases)
      registerSubsystem("diagnosticsPanel", "Diagnostics Console", (container) => {
        container.innerHTML = `
          <h3>🧪 Diagnostics Console</h3>
          <p>Subsystem active and ready.</p>
          <button id="runIntegrityScanBtn">Run Integrity Scan</button>
        `;
        document.getElementById("runIntegrityScanBtn").addEventListener("click", () => {
          alert("🧬 Running Integrity Scan...");
        });
      });

      // Auto-inject seeded subsystems at startup
      setTimeout(() => {
        Object.keys(SubsystemRegistry).forEach(id => injectSubsystem(id));
      }, 1750);

      // Phase 35.2 — Operator Neuro-Scripting Console Injection
      registerSubsystem("macroPanel", "Operator Macro Console", (container) => {
        container.innerHTML = `
          <h3>🧬 Operator Macro Console</h3>
          <p>Manage and execute your runtime Neuro-Macros.</p>
          <div id="macroList"></div>
          <button id="refreshMacrosBtn">🔄 Refresh Macro List</button>
        `;

        function refreshMacroList() {
          const macroList = document.getElementById("macroList");
          macroList.innerHTML = '';
          if (typeof NeuralOperatorMacros !== 'undefined') {
            const macros = NeuralOperatorMacros.listMacros();
            Object.entries(macros).forEach(([id, macro]) => {
              const btn = document.createElement("button");
              btn.innerText = `▶ ${macro.label}`;
              btn.onclick = () => NeuralOperatorMacros.executeMacro(id);
              macroList.appendChild(btn);
            });
          } else {
            macroList.innerHTML = "<p>⚠ NeuralOperatorMacros engine not detected.</p>";
          }
        }

        document.getElementById("refreshMacrosBtn").addEventListener("click", refreshMacroList);
        refreshMacroList();
      });

      // Auto-inject new macro subsystem panel
      setTimeout(() => injectSubsystem("macroPanel"), 2000);

      // Phase 35.3 — Dock Adaptive Expansion Protocol
      function injectNewDockPanel(id, label, renderFn) {
        const dockMount = document.getElementById("operatorConsoleMount");
        if (!dockMount) {
          console.warn("⚠ Dock mount point not found for dynamic panel injection.");
          return;
        }

        // Create and insert new panel container
        const panelDiv = document.createElement("div");
        panelDiv.id = id;
        panelDiv.classList.add("dock-panel");
        panelDiv.innerHTML = `<h3>${label}</h3><p>⚠ Awaiting subsystem injection.</p>`;
        dockMount.appendChild(panelDiv);

        // Register & inject new subsystem logic
        registerSubsystem(id, label, renderFn);
        setTimeout(() => injectSubsystem(id), 750);
        console.log(`🧩 Adaptive Dock Panel '${label}' injected into live mesh.`);
      }

      // Example test injection (can remove after validation)
      setTimeout(() => {
        injectNewDockPanel("testExpansionPanel", "Subsystem Expansion Test", (container) => {
          container.innerHTML = `
            <h3>🧪 Subsystem Expansion Test</h3>
            <p>✅ Dynamic Expansion Operational</p>
          `;
        });
      }, 3000);

      // Phase 35.4 — Neural Expansion Command Interface
      window.NeuralDockExpander = {
        injectSubsystemPanel: (id, label, renderFn) => {
          if (document.getElementById(id)) {
            console.warn(`⚠ Panel '${id}' already exists.`);
            return;
          }
          injectNewDockPanel(id, label, renderFn);
        },
        registerHotSubsystem: (id, label, renderFn) => {
          if (SubsystemRegistry[id]) {
            console.warn(`⚠ Subsystem '${id}' already registered.`);
            return;
          }
          registerSubsystem(id, label, renderFn);
          console.log(`🧩 Hot Subsystem '${label}' registered for future injection.`);
        },
        liveInjectRegisteredSubsystem: (id) => {
          if (!SubsystemRegistry[id]) {
            console.warn(`⚠ Subsystem '${id}' not found in registry.`);
            return;
          }
          if (!document.getElementById(id)) {
            injectNewDockPanel(id, SubsystemRegistry[id].label, SubsystemRegistry[id].renderFn);
          } else {
            injectSubsystem(id);
          }
        },
        listRegisteredSubsystems: () => {
          console.table(SubsystemRegistry);
          return SubsystemRegistry;
        }
      };

      console.log("🧪 Neural Expansion Command Interface is fully operational.");

      // Phase 35.5 — Autonomous Subsystem Scaffolding Engine
      window.NeuralSubsystemScaffolder = {
        scaffoldNewSubsystem: (id, label, options = {}) => {
          if (SubsystemRegistry[id]) {
            console.warn(`⚠ Subsystem '${id}' already exists.`);
            return;
          }

          const defaultRenderFn = (container) => {
            container.innerHTML = `
              <h3>🧪 ${label}</h3>
              <p>✅ ${label} Subsystem Scaffolded and Operational</p>
            `;
          };

          const renderFn = options.renderFn || defaultRenderFn;
          const autoInject = options.autoInject !== false;

          registerSubsystem(id, label, renderFn);

          if (autoInject) {
            injectNewDockPanel(id, label, renderFn);
          }

          console.log(`🛠 Subsystem '${label}' scaffolded successfully.`);
        },

        scaffoldBatchSubsystems: (batchArray = []) => {
          batchArray.forEach(({ id, label, renderFn }) => {
            NeuralSubsystemScaffolder.scaffoldNewSubsystem(id, label, { renderFn });
          });
          console.log("📦 Batch subsystem scaffolding complete.");
        }
      };

      console.log("🧪 Autonomous Subsystem Scaffolding Engine is fully operational.");

      // Phase 36.2 — Operator Shell Extension Registry ===
      const OperatorShellExtensions = {};

      // === Phase 36.4 — Neural Shell Extension Persistence Layer ===

      function saveShellExtensions() {
        try {
          const serialized = {};
          Object.entries(OperatorShellExtensions).forEach(([cmd, ext]) => {
            serialized[cmd] = {
              description: ext.description,
              body: ext.handlerFn.toString()
            };
          });
          localStorage.setItem("operatorShellExtensions", JSON.stringify(serialized));
          console.log("💾 Shell extensions saved.");
        } catch (err) {
          console.warn("⚠ Failed to save shell extensions:", err);
        }
      }

      function loadShellExtensions() {
        try {
          const stored = localStorage.getItem("operatorShellExtensions");
          if (!stored) {
            console.log("ℹ No saved shell extensions found.");
            return;
          }
          const parsed = JSON.parse(stored);
          Object.entries(parsed).forEach(([cmd, ext]) => {
            try {
              const fn = eval(`(args, log) => ${ext.body.split("=>")[1]}`);
              registerShellCommand(cmd, ext.description, fn);
            } catch (err) {
              console.warn(`⚠ Failed to reconstruct command '${cmd}':`, err);
            }
          });
          console.log("🔄 Shell extensions restored.");
        } catch (err) {
          console.warn("⚠ Failed to load shell extensions:", err);
        }
      }

      // Wire save trigger into registration
      const originalRegisterShellCommand = registerShellCommand;
      registerShellCommand = function(cmd, description, handlerFn) {
        if (OperatorShellExtensions[cmd]) {
          console.warn(`⚠ Shell command '${cmd}' already registered.`);
          return;
        }
        OperatorShellExtensions[cmd] = { description, handlerFn };
        console.log(`🧬 Operator Shell Command Registered → ${cmd}`);
        saveShellExtensions();
      };

      // Auto-restore at startup
      loadShellExtensions();

      function registerShellCommand(cmd, description, handlerFn) {
        if (OperatorShellExtensions[cmd]) {
          console.warn(`⚠ Shell command '${cmd}' already registered.`);
          return;
        }
        OperatorShellExtensions[cmd] = { description, handlerFn };
        console.log(`🧬 Operator Shell Command Registered → ${cmd}`);
      }

      function listShellCommands() {
        return Object.keys(OperatorShellExtensions).map(cmd => ({
          cmd,
          description: OperatorShellExtensions[cmd].description
        }));
      }

      // Phase 36.0 — Live Operator Shell Console Injection
      registerSubsystem("operatorShell", "Operator Shell Console", (container) => {
        container.innerHTML = `
          <h3>💻 Operator Shell Console</h3>
          <p>Type commands to interact with the neural mesh:</p>
          <input type="text" id="operatorCommandInput" placeholder="Enter command..." style="width:90%;padding:8px;">
          <button id="executeCommandBtn" style="margin-top:10px;">Execute</button>
          <div id="shellOutput" style="margin-top:15px; background:#111; padding:10px; height:200px; overflow-y:auto;"></div>
        `;

        const shellOutput = document.getElementById("shellOutput");
        const logToShell = (msg) => {
          const div = document.createElement("div");
          div.textContent = msg;
          shellOutput.appendChild(div);
          shellOutput.scrollTop = shellOutput.scrollHeight;
        };

        // === Operator Shell Command Execution ===
        const executeCommand = () => {
          const input = document.getElementById("operatorCommandInput").value.trim();
          if (!input) return;
          logToShell(`> ${input}`);

          const commandChains = input.split("&&").map(cmd => cmd.trim());

          commandChains.forEach(command => {
            const tokens = command.split(" ");
            const cmd = tokens[0].toLowerCase();

            try {
              if (cmd === "scaffold" && tokens.length >= 3) {
                const id = tokens[1];
                const label = tokens.slice(2).join(" ");
                NeuralSubsystemScaffolder.scaffoldNewSubsystem(id, label);
                logToShell(`🛠 Subsystem '${label}' scaffolded.`);
              } else if (cmd === "list") {
                const subsystems = NeuralDockExpander.listRegisteredSubsystems();
                logToShell("📋 Subsystems:");
                Object.values(subsystems).forEach(s => logToShell(`- ${s.label} (${s.id})`));
              } else if (cmd === "inject" && tokens.length === 2) {
                const id = tokens[1];
                NeuralDockExpander.liveInjectRegisteredSubsystem(id);
                logToShell(`🚀 Injected subsystem '${id}'.`);
              } else if (cmd === "help") {
                logToShell("🧭 Built-in Commands: scaffold [id] [label], list, inject [id], clear, help");
                const extensions = listShellCommands();
                if (extensions.length > 0) {
                  logToShell("🧭 Registered Extensions:");
                  extensions.forEach(ext => logToShell(`- ${ext.cmd}: ${ext.description}`));
                }
              } else if (cmd === "clear") {
                shellOutput.innerHTML = '';
                logToShell("🧹 Shell cleared.");
              } else if (OperatorShellExtensions[cmd]) {
                OperatorShellExtensions[cmd].handlerFn(tokens.slice(1), logToShell);
              } else {
                logToShell("⚠ Unknown command. Type 'help' for options.");
              }
            } catch (err) {
              logToShell(`❌ Error: ${err.message}`);
            }
          });

          document.getElementById("operatorCommandInput").value = "";
        };

        document.getElementById("executeCommandBtn").addEventListener("click", executeCommand);
        document.getElementById("operatorCommandInput").addEventListener("keydown", (e) => {
          if (e.key === "Enter") executeCommand();
        });
      });

      setTimeout(() => injectSubsystem("operatorShell"), 2500);

      // Phase 36.3 — Operator Shell Extension Console Injection
      registerSubsystem("shellExtensionsPanel", "Shell Extension Console", (container) => {
        container.innerHTML = `
          <h3>🧬 Shell Extension Console</h3>
          <p>Register new operator shell commands dynamically.</p>
          <input type="text" id="newCommandName" placeholder="Command Name" style="width:45%;margin-bottom:5px;">
          <input type="text" id="newCommandDesc" placeholder="Description" style="width:45%;margin-bottom:5px;"><br>
          <textarea id="newCommandBody" placeholder="Command Body (JavaScript)" style="width:92%;height:120px;"></textarea><br>
          <button id="registerNewCommandBtn" style="margin-top:10px;">Register Command</button>
          <h4>🧮 Registered Extensions:</h4>
          <ul id="extensionList"></ul>
        `;

        const refreshExtensionList = () => {
          const list = document.getElementById("extensionList");
          list.innerHTML = "";
          const extensions = listShellCommands();
          extensions.forEach(ext => {
            const li = document.createElement("li");
            li.textContent = `${ext.cmd}: ${ext.description}`;
            list.appendChild(li);
          });
        };

        document.getElementById("registerNewCommandBtn").addEventListener("click", () => {
          const cmdName = document.getElementById("newCommandName").value.trim();
          const cmdDesc = document.getElementById("newCommandDesc").value.trim();
          const cmdBody = document.getElementById("newCommandBody").value.trim();

          if (!cmdName || !cmdBody) {
            alert("⚠ Command Name and Body are required.");
            return;
          }

          try {
            const fn = eval(`(args, log) => { ${cmdBody} }`);
            registerShellCommand(cmdName, cmdDesc, fn);
            refreshExtensionList();
            alert(`✅ Command '${cmdName}' registered successfully.`);
          } catch (err) {
            alert(`❌ Failed to register command: ${err.message}`);
          }
        });

        refreshExtensionList();
      });

      setTimeout(() => injectSubsystem("shellExtensionsPanel"), 3000);

      // Phase 36.5 — Shell Extension Registry Purge & Reset Console
      registerSubsystem("shellExtensionResetPanel", "Shell Extension Purge Console", (container) => {
        container.innerHTML = `
          <h3>🧹 Shell Extension Purge Console</h3>
          <p>Clear all registered operator shell commands.</p>
          <button id="purgeShellExtensionsBtn" style="margin-top:10px;">Purge All Extensions</button>
          <button id="restoreShellExtensionsBtn" style="margin-top:10px;">Restore Saved Extensions</button>
          <div id="purgeStatus" style="margin-top:10px; color: #cc99ff;"></div>
        `;

        document.getElementById("purgeShellExtensionsBtn").addEventListener("click", () => {
          if (!confirm("⚠ Are you sure you want to purge all operator shell extensions? This cannot be undone.")) return;

          Object.keys(OperatorShellExtensions).forEach(cmd => delete OperatorShellExtensions[cmd]);
          localStorage.removeItem("operatorShellExtensions");
          document.getElementById("purgeStatus").innerText = "✅ All extensions purged and memory cleared.";
          console.log("🧹 All OperatorShellExtensions cleared.");
        });

        document.getElementById("restoreShellExtensionsBtn").addEventListener("click", () => {
          loadShellExtensions();
          document.getElementById("purgeStatus").innerText = "🔄 Extensions restored from storage.";
          console.log("🔄 Shell Extensions restored from persistence layer.");
        });
      });

      setTimeout(() => injectSubsystem("shellExtensionResetPanel"), 3250);
    }

    // === Phase 38.6 — Forecast Module Loader Synchronization ===
    console.log("🌩 Forecast Modules Loader Synchronization Engaged.");
    for (const moduleName of SovereignManifest.forecastModules) {
      await import(`./scripts/forecast/${moduleName}.js`)
        .then(() => console.log(`Loaded ${moduleName}.js`))
        .catch(err => console.error(`❌ Failed to load ${moduleName}.js`, err));
    }

    // === Phase 38.7 — Core Module Loader Synchronization ===
    console.log("🌐 Core Modules Loader Synchronization Engaged.");
    for (const moduleName of SovereignManifest.coreModules) {
      await import(`./scripts/core/${moduleName}.js`)
        .then(() => console.log(`Loaded ${moduleName}.js`))
        .catch(err => console.error(`❌ Failed to load ${moduleName}.js`, err));
    }

    // === Recovery Loader Synchronization ===
    for (const moduleName of SovereignManifest.recoveryModules) {
      await import(`./scripts/recovery/${moduleName}.js`)
        .then(() => console.log(`Loaded ${moduleName}.js`))
        .catch(err => console.error(`❌ Failed to load ${moduleName}.js`, err));
    }

    // 🔮 Future phase: dynamically import logic modules here after injection complete
  });