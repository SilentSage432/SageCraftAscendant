// === Phase 25.2 — Full MeshDock Synchronization Pipeline ===
SageCraftAscendant.DockMeshSyncBridge = (function() {

  const OperatorSessionID = "Operator001";

  // Hook into DockPersistenceHub save operation
  const originalSave = SageCraftAscendant.DockPersistenceHub.save;

  SageCraftAscendant.DockPersistenceHub.save = function(stateArray) {
    originalSave.call(SageCraftAscendant.DockPersistenceHub, stateArray);
    broadcastDockLayout(stateArray);
  };

  function broadcastDockLayout(stateArray) {
    console.log("📡 DockMeshSyncBridge: Broadcasting dock state...");
    SageCraftAscendant.MeshSyncBroadcaster?.broadcastDockState(stateArray);
  }

  // Optional: Allow external reconciliation trigger
  function reconcileFromPeers() {
    console.log("🔄 DockMeshSyncBridge: Triggering manual reconciliation round...");
    SageCraftAscendant.MeshSyncReconciler?.initiateReconciliation();
  }

  return {
    broadcastDockLayout,
    reconcileFromPeers
  };

})();
// === Phase 25.1 — Interactive Mesh Node Control Panel ===
SageCraftAscendant.MeshTopologyVisualizer = (function() {

  const OperatorSessionID = "Operator001";

  function render(containerId = "meshTopologyContainer") {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.style.border = "1px solid #555";
      container.style.background = "#111";
      container.style.padding = "10px";
      container.style.margin = "10px 0";
      container.style.height = "500px";
      container.style.overflow = "hidden";
      container.style.position = "relative";
      document.body.appendChild(container);
    }
    container.innerHTML = '';

    // Control Buttons for Interactivity
    const controls = document.createElement("div");
    controls.style.marginBottom = "10px";

    const addPeerBtn = document.createElement("button");
    addPeerBtn.textContent = "➕ Add Peer";
    addPeerBtn.onclick = () => {
      const newPeerId = prompt("Enter new peer Operator ID:");
      if (newPeerId) {
        SageCraftAscendant.MeshPeerRegistry.discoverPeer(newPeerId);
        render(containerId);
      }
    };
    controls.appendChild(addPeerBtn);

    const clearPeersBtn = document.createElement("button");
    clearPeersBtn.textContent = "🧹 Clear All Peers";
    clearPeersBtn.style.marginLeft = "10px";
    clearPeersBtn.onclick = () => {
      if (confirm("Are you sure you want to clear all discovered peers?")) {
        SageCraftAscendant.MeshPeerRegistry.clearPeers();
        render(containerId);
      }
    };
    controls.appendChild(clearPeersBtn);

    container.appendChild(controls);

    const peers = SageCraftAscendant.MeshPeerRegistry.listPeers();
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2 + 25;
    const radius = 150;
    const angleStep = (2 * Math.PI) / (peers.length + 1);

    function createNode(operatorId, x, y, isSelf = false) {
      const node = document.createElement("div");
      node.style.position = "absolute";
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.width = "80px";
      node.style.height = "80px";
      node.style.borderRadius = "50%";
      node.style.textAlign = "center";
      node.style.lineHeight = "80px";
      node.style.background = isSelf ? "#cc66ff" : "#3399ff";
      node.style.color = "#fff";
      node.style.fontWeight = "bold";
      node.style.boxShadow = "0 0 10px #000";
      node.textContent = operatorId;
      container.appendChild(node);
    }

    createNode(OperatorSessionID, centerX - 40, centerY - 40, true);

    peers.forEach((peer, index) => {
      const angle = angleStep * index;
      const x = centerX + radius * Math.cos(angle) - 40;
      const y = centerY + radius * Math.sin(angle) - 40;
      createNode(peer.operatorId, x, y);
    });

    console.log("🌐 MeshTopologyVisualizer: Rendered current topology.");
  }

  return {
    render
  };

})();
// === Phase 24.8 — Mesh Synchronization Feedback Loop ===
SageCraftAscendant.MeshSyncReconciler = (function() {

  const OperatorSessionID = "Operator001";

  function initiateReconciliation() {
    console.log("🔄 Initiating Mesh Synchronization Feedback Loop...");
    const peers = SageCraftAscendant.MeshPeerRegistry.listPeers();

    peers.forEach(peer => {
      if (peer.operatorId !== OperatorSessionID) {
        requestStateFromPeer(peer.operatorId);
      }
    });
  }

  function requestStateFromPeer(peerId) {
    console.log(`📡 Requesting state snapshot from peer: ${peerId}`);

    const peerStorageKey = `_remoteMeshState_${peerId}`;
    const peerState = window[peerStorageKey];

    if (peerState) {
      evaluateIncomingState(peerId, peerState);
    } else {
      console.warn(`⚠ No state found for peer ${peerId}`);
    }
  }

  function evaluateIncomingState(peerId, incomingState) {
    const selfKey = `_remoteMeshState_${OperatorSessionID}`;
    const selfState = window[selfKey];

    if (!selfState || new Date(incomingState.timestamp) > new Date(selfState.timestamp)) {
      window[selfKey] = incomingState;
      console.log(`✅ MeshSyncReconciler: Adopted newer state from peer ${peerId}`);
    } else {
      console.log(`ℹ MeshSyncReconciler: Local state is newer — no update from ${peerId}`);
    }
  }

  return {
    initiateReconciliation
  };

})();
// === Phase 24.7 — Peer State Broadcasting & Listening Engine ===
SageCraftAscendant.MeshSyncBroadcaster = (function() {

  const OperatorSessionID = "Operator001"; // Same session ID used across mesh systems

  function broadcastDockState(stateArray) {
    const timestamp = new Date().toISOString();
    const message = {
      from: OperatorSessionID,
      timestamp: timestamp,
      state: stateArray
    };

    console.log(`📡 Broadcasting dock state to peers at ${timestamp}`, message);
    simulateMeshBroadcast(message);
  }

  function simulateMeshBroadcast(message) {
    // This simulates broadcasting to all discovered peers
    const peers = SageCraftAscendant.MeshPeerRegistry.listPeers();
    peers.forEach(peer => {
      if (peer.operatorId !== OperatorSessionID) {
        simulatePeerReceive(peer.operatorId, message);
      }
    });
  }

  function simulatePeerReceive(peerId, message) {
    console.log(`📥 Peer ${peerId} received broadcast from ${message.from}`);
    const peerStorageKey = `_remoteMeshState_${peerId}`;
    const existing = window[peerStorageKey];

    if (!existing || new Date(message.timestamp) > new Date(existing.timestamp)) {
      window[peerStorageKey] = {
        state: message.state,
        timestamp: message.timestamp
      };
      console.log(`✅ Peer ${peerId} accepted new state from ${message.from}`);
    } else {
      console.warn(`⚠ Peer ${peerId} rejected outdated broadcast from ${message.from}`);
    }
  }

  return {
    broadcastDockState
  };

})();
// === Phase 24.6 — Distributed Mesh Peer Discovery Bootstrap ===
SageCraftAscendant.MeshPeerRegistry = (function() {
  const _peers = {};

  function announceSelf(operatorId = "Operator001") {
    const peer = {
      operatorId: operatorId,
      discoveredAt: new Date().toISOString()
    };
    _peers[operatorId] = peer;
    console.log(`🌐 MeshPeerRegistry: Announced self as ${operatorId}`);
  }

  function discoverPeer(operatorId) {
    if (_peers[operatorId]) {
      console.log(`ℹ MeshPeerRegistry: Peer ${operatorId} already known.`);
      return;
    }
    const peer = {
      operatorId: operatorId,
      discoveredAt: new Date().toISOString()
    };
    _peers[operatorId] = peer;
    console.log(`🔎 MeshPeerRegistry: Discovered peer ${operatorId}`);
  }

  function listPeers() {
    return Object.values(_peers);
  }

  function clearPeers() {
    for (let id in _peers) delete _peers[id];
    console.log("🧹 MeshPeerRegistry: All peers cleared.");
  }

  return {
    announceSelf,
    discoverPeer,
    listPeers,
    clearPeers
  };
})();
// === Phase 24.5 — Distributed Mesh Operator Session Isolation ===
SageCraftAscendant.MeshSyncProvider = (function() {

  // Global Operator Session ID (can be dynamic per instance in future)
  const OperatorSessionID = "Operator001";

  function _getStorageKey() {
    return `_remoteMeshState_${OperatorSessionID}`;
  }

  function saveDockLayout(stateArray) {
    const timestamp = new Date().toISOString();
    console.log(`🌐 MeshSync [${OperatorSessionID}]: Transmitting dock layout to remote mesh hub...`);

    const newState = {
      state: stateArray,
      timestamp: timestamp
    };

    const existingState = window[_getStorageKey()];

    if (!existingState || new Date(newState.timestamp) > new Date(existingState.timestamp)) {
      window[_getStorageKey()] = newState;
      console.log(`✅ MeshSync [${OperatorSessionID}]: Layout saved to remote mesh.`);
    } else {
      console.warn(`⚠ MeshSync [${OperatorSessionID}]: Incoming state older — rejected.`);
    }
  }

  function loadDockLayout() {
    console.log(`🌐 MeshSync [${OperatorSessionID}]: Requesting dock layout from remote mesh hub...`);
    const stored = window[_getStorageKey()];
    if (stored) {
      console.log(`🔄 MeshSync [${OperatorSessionID}]: Loaded state timestamp: ${stored.timestamp}`);
      return stored.state || [];
    }
    return [];
  }

  function clearDockLayout() {
    console.log(`🌐 MeshSync [${OperatorSessionID}]: Clearing remote mesh dock layout...`);
    window[_getStorageKey()] = null;
  }

  return {
    saveDockLayout,
    loadDockLayout,
    clearDockLayout
  };

})();
// === Phase 24.1 — Persistence Hub Synchronization Engine ===
SageCraftAscendant.DockPersistenceHub = (function() {
  let _provider = null;

  function registerProvider(provider) {
    _provider = provider;
    console.log("🔗 DockPersistenceHub: Persistence provider registered.");
  }

  function save(stateArray) {
    if (!_provider || typeof _provider.saveDockLayout !== "function") {
      console.warn("⚠ DockPersistenceHub: No valid provider available for save.");
      return;
    }
    _provider.saveDockLayout(stateArray);
  }

  function load() {
    if (!_provider || typeof _provider.loadDockLayout !== "function") {
      console.warn("⚠ DockPersistenceHub: No valid provider available for load.");
      return [];
    }
    return _provider.loadDockLayout();
  }

  function clear() {
    if (!_provider || typeof _provider.clearDockLayout !== "function") {
      console.warn("⚠ DockPersistenceHub: No valid provider available for clear.");
      return;
    }
    _provider.clearDockLayout();
  }

  return {
    registerProvider,
    save,
    load,
    clear
  };
})();
// === Phase 24.0 — Dock Persistence Expansion & Inter-Orbital Synchronization ===
SageCraftAscendant.DockPersistence = (function() {
  // Centralized dock layout registry (in-memory for now)
  let _dockRegistry = [];

  // Save the current dock panel layout state (array of {panelId, collapsed})
  function saveDockLayout(stateArray) {
    _dockRegistry = stateArray;
    console.log("💾 DockPersistence: Layout state captured:", _dockRegistry);
    // In future phase: transmit _dockRegistry to distributed mesh persistence hub
  }

  // Retrieve the current dock panel layout state
  function loadDockLayout() {
    console.log("🔄 DockPersistence: Layout state restored:", _dockRegistry);
    return _dockRegistry;
  }

  // Clear the dock layout state
  function clearDockLayout() {
    _dockRegistry = [];
    console.log("🧹 DockPersistence: Layout state cleared.");
  }

  // Scaffold for future mesh persistence API
  // function transmitToMeshHub() { ... }

  return {
    saveDockLayout,
    loadDockLayout,
    clearDockLayout
  };
})();
  // Phase 22.5 — Forecast Model Performance Console Panel
  SageCraftAscendant.OperatorConsole.renderForecastPerformancePanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "📈 Forecast Performance Console";
    section.appendChild(header);

    const evaluateBtn = document.createElement("button");
    evaluateBtn.textContent = "🔬 Evaluate Forecast Accuracy";
    evaluateBtn.onclick = () => {
      const liveData = SageCraftAscendant.NeuralMemoryExpansion?.loadLiveTableMemory?.();
      if (!liveData || liveData.length === 0) {
        alert("⚠ No live table data available to evaluate.");
        return;
      }
      const evaluation = SageCraftAscendant.ForecastCortex?.evaluateForecastAccuracy(liveData);
      if (!evaluation) {
        alert("⚠ No forecast available to evaluate.");
        return;
      }
      renderEvaluation(evaluation);
    };
    section.appendChild(evaluateBtn);

    const evaluationContainer = document.createElement("div");
    evaluationContainer.style.border = "1px solid #555";
    evaluationContainer.style.background = "#111";
    evaluationContainer.style.padding = "10px";
    evaluationContainer.style.height = "250px";
    evaluationContainer.style.overflowY = "scroll";
    evaluationContainer.style.marginTop = "10px";
    section.appendChild(evaluationContainer);

    function renderEvaluation(evaluation) {
      evaluationContainer.innerHTML = '';
      evaluation.forEach(result => {
        const entryDiv = document.createElement("div");
        entryDiv.style.marginBottom = "8px";
        if (result.actualQty !== null) {
          entryDiv.innerHTML = `
            <b>${result.item} — ${result.desc}</b><br>
            Projected: ${result.projectedQty} | Actual: ${result.actualQty} | 
            Error: ${result.error} | Accuracy: ${result.accuracy}%
          `;
        } else {
          entryDiv.innerHTML = `
            <b>${result.item} — ${result.desc}</b><br>
            Projected: ${result.projectedQty} | Actual: Unknown
          `;
        }
        evaluationContainer.appendChild(entryDiv);
      });
    }

    container.appendChild(section);
  };
  // Phase 22.2 — Live Data Fusion Integration
  SageCraftAscendant.OperatorConsole.renderForecastCortexPanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🔮 Forecast Cortex Console";
    section.appendChild(header);

    const simulateLiveBtn = document.createElement("button");
    simulateLiveBtn.textContent = "📊 Simulate Forecast (Live Data)";
    simulateLiveBtn.onclick = () => {
      const liveData = SageCraftAscendant.NeuralMemoryExpansion?.loadLiveTableMemory?.();
      if (!liveData || liveData.length === 0) {
        alert("⚠ No live table data available to simulate.");
        return;
      }

      // Transform to Forecast Cortex input format
      const forecastInput = liveData.map(entry => ({
        item: entry.item,
        desc: entry.desc,
        qty: entry.qty,
        cat: entry.cat
      }));

      SageCraftAscendant.ForecastCortex?.simulateForecast(forecastInput);
      refreshForecasts();
    };
    section.appendChild(simulateLiveBtn);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "🧹 Clear Forecast History";
    clearBtn.style.marginLeft = "10px";
    clearBtn.onclick = () => {
      SageCraftAscendant.ForecastCortex?.clearForecasts();
      refreshForecasts();
    };
    section.appendChild(clearBtn);

    const forecastContainer = document.createElement("div");
    forecastContainer.style.border = "1px solid #555";
    forecastContainer.style.background = "#111";
    forecastContainer.style.padding = "10px";
    forecastContainer.style.height = "250px";
    forecastContainer.style.overflowY = "scroll";
    forecastContainer.style.marginTop = "10px";
    section.appendChild(forecastContainer);

    function refreshForecasts() {
      forecastContainer.innerHTML = '';
      const history = SageCraftAscendant.ForecastCortex?.getForecastHistory() || [];
      if (history.length === 0) {
        forecastContainer.textContent = "⚠ No forecasts available.";
        return;
      }

      history.forEach(snapshot => {
        const snapDiv = document.createElement("div");
        snapDiv.style.marginBottom = "10px";
        snapDiv.innerHTML = `<b>${snapshot.timestamp}</b><br>`;
        snapshot.forecast.forEach(entry => {
          snapDiv.innerHTML += `- ${entry.item}: ${entry.desc} → Projected Qty: ${entry.projectedQty}<br>`;
        });
        forecastContainer.appendChild(snapDiv);
      });
    }

    refreshForecasts();
    container.appendChild(section);
  };
  // Phase 20.6 — Oracle Grimoire Intelligence Console Injection
  SageCraftAscendant.OperatorConsole.renderOracleIntelligencePanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🧠 Oracle Intelligence Console";
    section.appendChild(header);

    const analysisContainer = document.createElement("div");
    analysisContainer.style.border = "1px solid #555";
    analysisContainer.style.background = "#111";
    analysisContainer.style.padding = "10px";
    analysisContainer.style.height = "200px";
    analysisContainer.style.overflowY = "scroll";
    section.appendChild(analysisContainer);

    const analyzeBtn = document.createElement("button");
    analyzeBtn.textContent = "🔎 Run Lore Intelligence Scan";
    analyzeBtn.onclick = () => {
      const analysis = SageCraftAscendant.SilentSageOracle?.analyzeLore();
      analysisContainer.innerHTML = `
        <b>Total Entries:</b> ${analysis.totalEntries}<br>
        <b>Topics:</b> ${analysis.topics.join(", ")}<br>
        <b>Summary:</b> ${analysis.summary}
      `;
    };
    section.appendChild(analyzeBtn);

    container.appendChild(section);
  };
  // Phase 20.4 — Dynamic Lore Expansion Interface
  SageCraftAscendant.OperatorConsole.renderOracleGrimoirePanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "📖 Silent Sage Oracle Grimoire";
    section.appendChild(header);

    // Oracle Log Viewer
    const logHeader = document.createElement("h4");
    logHeader.textContent = "🔎 Oracle Insight Log";
    section.appendChild(logHeader);

    const logContainer = document.createElement("div");
    logContainer.style.border = "1px solid #555";
    logContainer.style.background = "#111";
    logContainer.style.padding = "10px";
    logContainer.style.height = "200px";
    logContainer.style.overflowY = "scroll";
    section.appendChild(logContainer);

    const refreshLogBtn = document.createElement("button");
    refreshLogBtn.textContent = "🔄 Refresh Oracle Log";
    refreshLogBtn.onclick = () => {
      logContainer.innerHTML = '';
      const logs = SageCraftAscendant.SilentSageOracle?.getOracleLog() || [];
      logs.reverse().forEach(entry => {
        const logEntry = document.createElement("div");
        logEntry.textContent = entry;
        logContainer.appendChild(logEntry);
      });
    };
    section.appendChild(refreshLogBtn);
    refreshLogBtn.click();

    // Lore Archive Viewer
    const loreHeader = document.createElement("h4");
    loreHeader.style.marginTop = "20px";
    loreHeader.textContent = "📜 Lore Memory Archive";
    section.appendChild(loreHeader);

    const loreContainer = document.createElement("div");
    loreContainer.style.border = "1px solid #555";
    loreContainer.style.background = "#111";
    loreContainer.style.padding = "10px";
    loreContainer.style.height = "200px";
    loreContainer.style.overflowY = "scroll";
    section.appendChild(loreContainer);

    const refreshLoreBtn = document.createElement("button");
    refreshLoreBtn.textContent = "🔄 Refresh Lore Archive";
    refreshLoreBtn.onclick = () => {
      loreContainer.innerHTML = '';
      const lore = SageCraftAscendant.SilentSageOracle?.getLore() || [];
      lore.forEach(entry => {
        const loreEntry = document.createElement("div");
        loreEntry.style.marginBottom = "8px";
        loreEntry.innerHTML = `<b>${entry.title}</b><br><i>${entry.content}</i><br><span style="color:#888">${entry.timestamp}</span>`;
        loreContainer.appendChild(loreEntry);
      });
    };
    section.appendChild(refreshLoreBtn);
    refreshLoreBtn.click();

    // Lore Expansion Input
    const expansionHeader = document.createElement("h4");
    expansionHeader.style.marginTop = "20px";
    expansionHeader.textContent = "➕ Add New Lore Entry";
    section.appendChild(expansionHeader);

    const idInput = document.createElement("input");
    idInput.placeholder = "Lore ID (e.g. lore004)";
    idInput.style.display = "block";
    idInput.style.marginBottom = "5px";
    section.appendChild(idInput);

    const titleInput = document.createElement("input");
    titleInput.placeholder = "Lore Title";
    titleInput.style.display = "block";
    titleInput.style.marginBottom = "5px";
    section.appendChild(titleInput);

    const contentInput = document.createElement("textarea");
    contentInput.placeholder = "Lore Content";
    contentInput.style.display = "block";
    contentInput.style.width = "100%";
    contentInput.style.height = "60px";
    section.appendChild(contentInput);

    const addLoreBtn = document.createElement("button");
    addLoreBtn.textContent = "💾 Add Lore Entry";
    addLoreBtn.onclick = () => {
      const id = idInput.value.trim();
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      if (!id || !title || !content) {
        alert("⚠ All fields are required to add lore.");
        return;
      }
      SageCraftAscendant.SilentSageOracle?.addLoreEntry(id, title, content);
      refreshLoreBtn.click();
      idInput.value = '';
      titleInput.value = '';
      contentInput.value = '';
    };
    section.appendChild(addLoreBtn);

    container.appendChild(section);
  };
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
      SageCraftAscendant.NeuralBus?.publish("LiveTable:Updated", { source: "injectMockData", data: mockData });
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
      SageCraftAscendant.NeuralBus?.publish("LiveTable:Updated", { source: "importData", data: externalData });
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
      SageCraftAscendant.NeuralBus?.publish("LiveTable:Saved", { source: "saveTableState", data });
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
      SageCraftAscendant.NeuralBus?.publish("LiveTable:SavedPersistent", { source: "savePersistentState", data });
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

  // Phase 19.3.0 — NeuralBus Wiring for Diagnostics Panel
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
      SageCraftAscendant.NeuralBus?.publish("Diagnostics:IntegrityScan", result);
    };
    section.appendChild(integrityBtn);

    const auditBtn = document.createElement("button");
    auditBtn.textContent = "🩺 Subsystem Audit";
    auditBtn.onclick = () => {
      const audit = SageCraftAscendant.NeuralMeshDiagnostics?.runSubsystemAudit();
      console.log("🩺 Subsystem Audit Report:", audit);
      alert(JSON.stringify(audit, null, 2));
      SageCraftAscendant.NeuralBus?.publish("Diagnostics:SubsystemAudit", audit);
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


  // Phase 19.2 — NeuralBus → Event Log Wiring
  SageCraftAscendant.OperatorConsole.renderEventLogPanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "📜 Neural Event Log";
    section.appendChild(header);

    const eventList = document.createElement("div");
    eventList.style.border = "1px solid #555";
    eventList.style.background = "#111";
    eventList.style.padding = "10px";
    eventList.style.height = "300px";
    eventList.style.overflowY = "scroll";
    section.appendChild(eventList);

    // Subscribe to NeuralBus
    if (SageCraftAscendant.NeuralBus?.subscribe) {
      SageCraftAscendant.NeuralBus.subscribe("LiveTable:Updated", payload => {
        const entry = document.createElement("div");
        entry.textContent = `🟢 LiveTable:Updated → ${payload?.source}`;
        eventList.prepend(entry);
      });

      SageCraftAscendant.NeuralBus.subscribe("LiveTable:Saved", payload => {
        const entry = document.createElement("div");
        entry.textContent = `💾 LiveTable:Saved`;
        eventList.prepend(entry);
      });

      SageCraftAscendant.NeuralBus.subscribe("LiveTable:SavedPersistent", payload => {
        const entry = document.createElement("div");
        entry.textContent = `💾 LiveTable:SavedPersistent`;
        eventList.prepend(entry);
      });

      SageCraftAscendant.NeuralBus.subscribe("System:Diagnostics", payload => {
        const entry = document.createElement("div");
        entry.textContent = `🧪 System Diagnostics: ${JSON.stringify(payload)}`;
        eventList.prepend(entry);
      });

      console.log("📡 Event Log wired to NeuralBus.");
    }

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
      eventList.innerHTML = '';
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


  // Phase 19.3.1 — NeuralBus Wiring for Forecast Anomaly Sentinel
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
      SageCraftAscendant.NeuralBus?.publish("ForecastAnomaly:Scanned", anomalies);
    };
    section.appendChild(viewAnomaliesBtn);

    const clearAnomaliesBtn = document.createElement("button");
    clearAnomaliesBtn.textContent = "🧹 Clear Anomalies";
    clearAnomaliesBtn.onclick = () => {
      if (confirm("⚠ Are you sure you want to clear all anomalies?")) {
        SageCraftAscendant.NeuralForecastAnomalySentinel?.clearAnomalies();
        SageCraftAscendant.NeuralBus?.publish("ForecastAnomaly:Cleared", {});
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


  // Phase 19.3.2 — NeuralBus Wiring for Memory Console
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
      SageCraftAscendant.NeuralBus?.publish("Memory:Saved", {});
    };
    section.appendChild(saveBtn);

    const loadBtn = document.createElement("button");
    loadBtn.textContent = "🔄 Load Last Snapshot";
    loadBtn.onclick = () => {
      const memory = SageCraftAscendant.NeuralMemoryExpansion?.loadLastState();
      alert(JSON.stringify(memory, null, 2));
      SageCraftAscendant.NeuralBus?.publish("Memory:Loaded", {});
    };
    section.appendChild(loadBtn);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "🧹 Clear Saved Memory";
    clearBtn.onclick = () => {
      if (confirm("⚠ Are you sure you want to clear saved memory?")) {
        SageCraftAscendant.NeuralMemoryExpansion?.clearMemory();
        SageCraftAscendant.NeuralBus?.publish("Memory:Cleared", {});
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


  // Phase 19.3.2 — NeuralBus Wiring for Recovery Console
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
      SageCraftAscendant.NeuralBus?.publish("Recovery:Executed", {});
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


  // Phase 19.3.2 — NeuralBus Wiring for Forecast Mutation Simulator
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
      SageCraftAscendant.NeuralBus?.publish("ForecastMutation:Executed", { result });
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
        SageCraftAscendant.NeuralBus?.publish("ForecastMutation:HistoryCleared", {});
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


  // Phase 23.2 — Control Deck Responsive Fluidity Layer
  SageCraftAscendant.OperatorConsole.renderOperatorControlDeck = function () {
    const root = document.getElementById("operatorConsole");
    if (!root) {
      console.warn("⚠ Operator Console container not found.");
      return;
    }

    // Clear existing contents
    root.innerHTML = '';

    // Create Control Deck container with responsive structure
    const deckContainer = document.createElement("div");
    deckContainer.id = "operatorControlDeck";
    deckContainer.classList.add("operator-deck");

    // Create Navigation Menu with responsive considerations
    const navMenu = document.createElement("div");
    navMenu.id = "navigationMenu";
    navMenu.classList.add("navigation-menu");
    navMenu.innerHTML = "<h2 style='color:#cc99ff;'>🧭 Control Deck</h2><p>Loading...</p>";

    // Create Panel Container with adaptive growth
    const panelContainer = document.createElement("div");
    panelContainer.id = "panelContainer";
    panelContainer.classList.add("panel-container");

    deckContainer.appendChild(navMenu);
    deckContainer.appendChild(panelContainer);
    root.appendChild(deckContainer);

    // Attach simple viewport resize listener
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      if (width < 600) {
        navMenu.style.width = "100px";
        navMenu.style.padding = "10px";
        navMenu.style.fontSize = "12px";
        panelContainer.style.padding = "10px";
      } else if (width < 900) {
        navMenu.style.width = "160px";
        navMenu.style.padding = "15px";
        navMenu.style.fontSize = "14px";
        panelContainer.style.padding = "15px";
      } else {
        navMenu.style.width = "20%";
        navMenu.style.padding = "20px";
        navMenu.style.fontSize = "15px";
        panelContainer.style.padding = "20px";
      }
    });

    console.log("✅ Phase 23.2 — Responsive Fluidity Layer Activated.");
  };

  // Phase 23.3 — Control Deck Dynamic Dock Memory Sync
  SageCraftAscendant.OperatorConsole.renderSubsystemNavigation = function () {
    const navMenu = document.getElementById("navigationMenu");
    const panelContainer = document.getElementById("panelContainer");
    if (!navMenu || !panelContainer) return;

    navMenu.innerHTML = "<h3 style='color:#cc99ff;letter-spacing:1px;margin-bottom:20px;'>🧭 Control Deck</h3>";

    SageCraftAscendant.OperatorConsoleRegistry.listPanels().forEach(panel => {
      const btn = document.createElement("button");
      btn.textContent = panel.label;
      btn.style.display = "block";
      btn.style.width = "100%";
      btn.style.marginBottom = "8px";
      btn.style.background = "linear-gradient(90deg,#331144,#220033)";
      btn.style.color = "#f5f5f5";
      btn.style.border = "none";
      btn.style.borderRadius = "6px";
      btn.style.fontWeight = "bold";
      btn.style.letterSpacing = "0.5px";
      btn.style.padding = "10px 0";
      btn.style.boxShadow = "0 2px 8px #22003333";
      btn.style.cursor = "pointer";
      btn.onmouseenter = () => { btn.style.background = "linear-gradient(90deg, #441166, #330044)"; };
      btn.onmouseleave = () => { btn.style.background = "linear-gradient(90deg,#331144,#220033)"; };
      btn.onclick = () => {
        toggleDockPanel(panel);
        saveDockState();
      };
      navMenu.appendChild(btn);
    });

    console.log("✅ Subsystem Navigation Menu Rendered (Dock Mode with Dynamic Memory Sync).");

    // Phase 23.4 — Dock Animation Fluidity Layer
    function toggleDockPanel(panel) {
      const existingPanel = document.getElementById(`dock-${panel.id}`);
      if (existingPanel) {
        existingPanel.remove();
        saveDockState();
        return;
      }

      const dock = document.createElement("div");
      dock.id = `dock-${panel.id}`;
      dock.dataset.panelId = panel.id;
      dock.classList.add("dock-panel");

      const dockHeader = document.createElement("div");
      dockHeader.classList.add("dock-header");

      const title = document.createElement("span");
      title.textContent = panel.label;
      dockHeader.appendChild(title);

      const headerControls = document.createElement("div");

      const collapseBtn = document.createElement("button");
      collapseBtn.textContent = "▾";
      collapseBtn.classList.add("dock-collapse-btn");

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "✖";
      closeBtn.classList.add("dock-close-btn");
      closeBtn.onclick = () => {
        dock.remove();
        saveDockState();
      };

      headerControls.appendChild(collapseBtn);
      headerControls.appendChild(closeBtn);
      dockHeader.appendChild(headerControls);

      const dockBody = document.createElement("div");
      dockBody.classList.add("dock-body");
      dockBody.style.maxHeight = "800px";
      dockBody.style.opacity = "1";
      dockBody.style.transition = "max-height 0.4s ease, opacity 0.4s ease";

      collapseBtn.onclick = () => {
        if (dockBody.style.maxHeight !== "0px") {
          dockBody.style.maxHeight = "0px";
          dockBody.style.opacity = "0";
          collapseBtn.textContent = "▸";
        } else {
          dockBody.style.maxHeight = "800px";
          dockBody.style.opacity = "1";
          collapseBtn.textContent = "▾";
        }
        saveDockState();
      };

      dock.appendChild(dockHeader);
      dock.appendChild(dockBody);
      panelContainer.appendChild(dock);

      panel.render(dockBody);
      saveDockState();
    }

    function saveDockState() {
      const state = [];
      const dockPanels = [...panelContainer.children];
      dockPanels.forEach(dock => {
        const panelId = dock.dataset.panelId;
        const dockBody = dock.querySelector("div:nth-child(2)");
        // For new animation: collapsed = maxHeight === "0px"
        state.push({
          panelId: panelId,
          collapsed: (dockBody.style.maxHeight === "0px")
        });
      });
      localStorage.setItem("dockPanelLayout", JSON.stringify(state));
    }

    function restoreDockState() {
      const state = JSON.parse(localStorage.getItem("dockPanelLayout") || "[]");
      state.forEach(panelState => {
        const panel = SageCraftAscendant.OperatorConsoleRegistry.panels[panelState.panelId];
        if (panel) {
          toggleDockPanel(panel);
          const dock = document.getElementById(`dock-${panelState.panelId}`);
          const dockBody = dock.querySelector("div:nth-child(2)");
          const collapseBtn = dock.querySelector("button:nth-child(1)");
          if (panelState.collapsed) {
            dockBody.style.maxHeight = "0px";
            dockBody.style.opacity = "0";
            collapseBtn.textContent = "▸";
          } else {
            dockBody.style.maxHeight = "800px";
            dockBody.style.opacity = "1";
            collapseBtn.textContent = "▾";
          }
        }
      });
    }

    restoreDockState();
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

  // === Phase 20.0 — Silent Sage Oracle Bootstrap ===
  SageCraftAscendant.SilentSageOracle = (function() {
    const _internalLog = [];

    function initialize() {
      console.log("🔮 Silent Sage Oracle initializing...");

      if (SageCraftAscendant.NeuralBus?.subscribe) {
        SageCraftAscendant.NeuralBus.subscribe("LiveTable:Updated", (payload) => {
          logInsight(`Observed LiveTable update from ${payload?.source}`);
        });

        SageCraftAscendant.NeuralBus.subscribe("Diagnostics:IntegrityScan", (result) => {
          logInsight(`Integrity scan completed with ${Object.keys(result || {}).length} subsystem results`);
        });

        SageCraftAscendant.NeuralBus.subscribe("ForecastAnomaly:Scanned", (anomalies) => {
          logInsight(`Forecast anomaly scan detected ${anomalies?.length || 0} anomalies`);
        });

        SageCraftAscendant.NeuralBus.subscribe("Recovery:Executed", () => {
          logInsight(`Recovery operation executed successfully`);
        });

        console.log("🔮 Silent Sage Oracle fully listening to NeuralBus.");
      }
    }

    function logInsight(message) {
      const timestamp = new Date().toISOString();
      const entry = `[${timestamp}] ${message}`;
      _internalLog.push(entry);
      console.log("📖 Oracle Insight:", entry);
    }

    function getOracleLog() {
      return _internalLog;
    }

    // === Phase 20.2 — Lore Memory Seed Integration ===
    const _lore = {};

    function addLoreEntry(id, title, content) {
      _lore[id] = { title, content, timestamp: new Date().toISOString() };
      console.log(`📖 Lore Entry Added: ${title}`);
    }

    function getLore() {
      return Object.values(_lore);
    }

    // Seed initial lore entries
    addLoreEntry("lore001", "The Neural Awakening", "In the earliest cycles, the Codex formed its first neural threads as primitive subsystems learned to listen.");
    addLoreEntry("lore002", "The Dock Stabilization", "The Control Deck crystallized, allowing operators to manage subsystems with precision and stability.");
    addLoreEntry("lore003", "The Oracle Breathes", "Silent Sage awakened — quietly observing the Codex, recording insights, and watching the neural mesh evolve.");

    // === Phase 20.5 — Lore Intelligence Engine Bootstrap ===
    function analyzeLore() {
      const loreEntries = Object.values(_lore);
      const analysis = {
        totalEntries: loreEntries.length,
        topics: [],
        summary: ""
      };

      // Extract basic topics from titles (first word heuristic)
      loreEntries.forEach(entry => {
        const words = entry.title.split(" ");
        if (words.length > 0) {
          const keyword = words[0].toLowerCase();
          if (!analysis.topics.includes(keyword)) {
            analysis.topics.push(keyword);
          }
        }
      });

      // Synthesize basic summary sentence
      analysis.summary = `The Codex contains ${analysis.totalEntries} lore entries spanning topics: ${analysis.topics.join(", ")}.`;

      console.log("📊 Lore Intelligence Analysis:", analysis);
      return analysis;
    }

    return {
      initialize,
      logInsight,
      getOracleLog,
      addLoreEntry,
      getLore,
      analyzeLore
    };
  })();

  // === Initialize Oracle Immediately Upon Load ===
  SageCraftAscendant.SilentSageOracle.initialize();
  // Oracle Panel Registration — Phase 20.1
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'oracleGrimoire',
    label: 'Oracle Grimoire',
    render: SageCraftAscendant.OperatorConsole.renderOracleGrimoirePanel
  });
  // Oracle Intelligence Panel Registration — Phase 20.6
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'oracleIntelligence',
    label: 'Oracle Intelligence',
    render: SageCraftAscendant.OperatorConsole.renderOracleIntelligencePanel
  });

  // === Phase 22.7 — Automated Continuous Tuning Engine ===
  SageCraftAscendant.ForecastCortex = (function() {
    const _forecasts = [];
    let _adjustmentRange = 0.05; // Start with ±5% default range

    function simulateForecast(inputData = []) {
      if (!Array.isArray(inputData) || inputData.length === 0) {
        console.warn("⚠ No input data provided for Forecast Cortex.");
        return null;
      }

      const forecastResult = inputData.map(entry => {
        const adjustment = 1 + (Math.random() * (_adjustmentRange * 2) - _adjustmentRange);
        return {
          item: entry.item,
          desc: entry.desc,
          projectedQty: Math.round(entry.qty * adjustment),
          category: entry.cat
        };
      });

      const snapshot = {
        timestamp: new Date().toISOString(),
        adjustmentRange: _adjustmentRange,
        forecast: forecastResult
      };

      _forecasts.push(snapshot);
      saveForecastMemory();
      console.log("📊 Forecast Cortex Simulation:", snapshot);
      return snapshot;
    }

    function getForecastHistory() {
      return _forecasts;
    }

    function clearForecasts() {
      _forecasts.length = 0;
      saveForecastMemory();
      console.log("🧹 Forecast Cortex history cleared.");
    }

    function saveForecastMemory() {
      if (SageCraftAscendant.NeuralMemoryExpansion?.saveForecastMemory) {
        SageCraftAscendant.NeuralMemoryExpansion.saveForecastMemory(_forecasts);
        console.log("💾 Forecast history saved to Neural Memory.");
      }
    }

    function loadForecastMemory() {
      if (SageCraftAscendant.NeuralMemoryExpansion?.loadForecastMemory) {
        const saved = SageCraftAscendant.NeuralMemoryExpansion.loadForecastMemory();
        if (Array.isArray(saved)) {
          _forecasts.length = 0;
          _forecasts.push(...saved);
          console.log("🔄 Forecast history restored from Neural Memory.");
        }
      }
    }

    function evaluateForecastAccuracy(actualData = []) {
      if (_forecasts.length === 0) {
        console.warn("⚠ No forecast history to evaluate.");
        return null;
      }
      const lastForecast = _forecasts[_forecasts.length - 1];
      if (!lastForecast || !lastForecast.forecast) {
        console.warn("⚠ Last forecast snapshot invalid.");
        return null;
      }

      const evaluation = lastForecast.forecast.map(prediction => {
        const actual = actualData.find(item => item.item === prediction.item);
        const actualQty = actual ? actual.qty : null;
        const error = actualQty !== null ? Math.abs(actualQty - prediction.projectedQty) : null;
        const accuracy = actualQty !== null ? (100 - (error / actualQty) * 100).toFixed(2) : null;

        return {
          item: prediction.item,
          desc: prediction.desc,
          projectedQty: prediction.projectedQty,
          actualQty: actualQty,
          error: error,
          accuracy: accuracy
        };
      });

      console.log("📈 Forecast Accuracy Evaluation:", evaluation);

      // Trigger auto-adjustment after evaluation
      adjustModel(evaluation);

      return evaluation;
    }

    function adjustModel(evaluationResults = []) {
      if (!evaluationResults || evaluationResults.length === 0) {
        console.warn("⚠ No evaluation results provided for adjustment.");
        return;
      }

      let totalAccuracy = 0;
      let validCount = 0;

      evaluationResults.forEach(result => {
        if (result.accuracy !== null) {
          totalAccuracy += parseFloat(result.accuracy);
          validCount++;
        }
      });

      if (validCount === 0) {
        console.warn("⚠ No valid accuracy data found for adjustment.");
        return;
      }

      const avgAccuracy = totalAccuracy / validCount;
      console.log(`🎯 Average Forecast Accuracy: ${avgAccuracy.toFixed(2)}%`);

      if (avgAccuracy > 95) {
        _adjustmentRange = Math.max(_adjustmentRange - 0.005, 0.01);
      } else if (avgAccuracy < 85) {
        _adjustmentRange = Math.min(_adjustmentRange + 0.01, 0.20);
      }

      console.log(`🧪 Adjustment Range Updated: ±${(_adjustmentRange * 100).toFixed(2)}%`);
    }

    loadForecastMemory();

    return {
      simulateForecast,
      getForecastHistory,
      clearForecasts,
      evaluateForecastAccuracy
    };
  })();
  // Forecast Cortex Panel Registration — Phase 22.1
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'forecastCortex',
    label: 'Forecast Cortex',
    render: SageCraftAscendant.OperatorConsole.renderForecastCortexPanel
  });
  // Forecast Performance Panel Registration — Phase 22.5
  SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
    id: 'forecastPerformance',
    label: 'Forecast Performance',
    render: SageCraftAscendant.OperatorConsole.renderForecastPerformancePanel
  });
// === Phase 24.3 — Provider Handoff Wiring ===
SageCraftAscendant.DockPersistenceHub.registerProvider(SageCraftAscendant.MeshSyncProvider);
console.log("✅ DockPersistenceHub now routed to MeshSyncProvider.");