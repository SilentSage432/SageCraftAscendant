// === Phase X+ — Orbit Button Interaction Memory (Orbit Memory Ghosts) ===
// This section visually echoes orbit button clicks with a ghost effect.
(function orbitMemoryGhostsEcho() {
  // Helper: create the ghost overlay layer if not present
  function ensureGhostLayer() {
    let ghostLayer = document.getElementById("orbitMemoryGhosts");
    if (!ghostLayer) {
      ghostLayer = document.createElement("div");
      ghostLayer.id = "orbitMemoryGhosts";
      ghostLayer.style.position = "fixed";
      ghostLayer.style.pointerEvents = "none";
      ghostLayer.style.top = "0";
      ghostLayer.style.left = "0";
      ghostLayer.style.width = "100vw";
      ghostLayer.style.height = "100vh";
      ghostLayer.style.zIndex = "9999";
      ghostLayer.style.display = "block";
      document.body.appendChild(ghostLayer);
    }
    return ghostLayer;
  }

  // Add basic CSS for orbit-ghosts if not present
  function injectGhostStyles() {
    if (document.getElementById("orbitMemoryGhostsStyles")) return;
    const style = document.createElement("style");
    style.id = "orbitMemoryGhostsStyles";
    style.textContent = `
      #orbitMemoryGhosts .orbit-ghost {
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: radial-gradient(circle at 50% 50%, #cc99ffbb 0%, #33114477 80%, transparent 100%);
        box-shadow: 0 0 32px 8px #cc99ff55, 0 0 8px 2px #fff5;
        opacity: 0.7;
        animation: orbitGhostPulse 1.2s cubic-bezier(.4,0,.2,1) 1, orbitGhostFade 6s linear 1;
        pointer-events: none;
        transition: opacity 0.6s;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #fff;
        font-size: 1.1em;
        text-shadow: 0 0 6px #331144, 0 0 2px #fff;
      }
      @keyframes orbitGhostPulse {
        0% { transform: scale(0.2); opacity: 0.1; }
        30% { transform: scale(1.1); opacity: 0.85; }
        60% { transform: scale(0.98); opacity: 0.7; }
        100% { transform: scale(1); opacity: 0.7; }
      }
      @keyframes orbitGhostFade {
        0% { opacity: 0.7; }
        80% { opacity: 0.7; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  function markOrbitMemory(orbitId, btn) {
    const ghostLayer = ensureGhostLayer();
    injectGhostStyles();

    // Try to position the ghost over the button
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    if (btn && typeof btn.getBoundingClientRect === "function") {
      const rect = btn.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const ghost = document.createElement("div");
    ghost.classList.add("orbit-ghost");
    ghost.dataset.orbit = orbitId;
    ghost.style.left = (x - 30) + "px";
    ghost.style.top = (y - 30) + "px";
    ghost.textContent = orbitId || "";

    // Remove after delay
    setTimeout(() => ghost.remove(), 6000);

    ghostLayer.appendChild(ghost);
  }

  // Hook into existing orbit button interaction
  function hookOrbitButtons() {
    const orbitBtns = document.querySelectorAll("#sovereignOrbitDock .orbit-button");
    if (!orbitBtns.length) return;
    orbitBtns.forEach(btn => {
      if (btn.dataset.orbitMemoryHooked) return;
      btn.addEventListener("click", () => {
        const orbitId = btn.getAttribute("data-orbit-id") || btn.textContent.trim();
        markOrbitMemory(orbitId, btn);
      });
      btn.dataset.orbitMemoryHooked = "1";
    });
  }

  // Try to hook immediately, then on DOMContentLoaded, then on mutations
  if (document.readyState === "complete" || document.readyState === "interactive") {
    hookOrbitButtons();
  } else {
    document.addEventListener("DOMContentLoaded", hookOrbitButtons);
  }
  // Also try again after a short delay in case of late-rendered buttons
  setTimeout(hookOrbitButtons, 1000);
  // Observe DOM for new orbit buttons
  if (window.MutationObserver) {
    const obs = new MutationObserver(hookOrbitButtons);
    obs.observe(document.body, { childList: true, subtree: true });
  }
})();
// Early OperatorConsole Exposure Layer
if (typeof window.SageCraftAscendant === 'undefined') {
  window.SageCraftAscendant = {};
}

if (typeof window.SageCraftAscendant.OperatorConsole === 'undefined') {
  window.SageCraftAscendant.OperatorConsole = {};
  console.log("🧠 OperatorConsole exposed early under SageCraftAscendant.");
}
import { whenReady } from './core/utils/readyTools.js';
// === Panel Manual Recovery Helper ===
window.OperatorDockConsole = window.OperatorDockConsole || {};
OperatorDockConsole.forceRegister = function(panelId) {
  if (typeof registerPanel === "function") {
    registerPanel(panelId);
    console.log(`✅ Manual registerPanel triggered for: ${panelId}`);
  } else {
    console.error("❌ registerPanel function not available in current scope.");
  }
};
// === Phase 27.2 — Neural Macro Console Panel Injection ===

// Ensure OperatorDockConsole global exists for early references
// Phase 1: OperatorConsole Initialization
if (!window.OperatorDockConsole) {
  window.OperatorDockConsole = {
    diagnostics: () => {
      console.log("🧪 OperatorDockConsole Diagnostics: Running checks...");
      // Future diagnostics logic can be implemented here
      return "Diagnostics complete.";
    }
  };
  console.log("✅ OperatorDockConsole initialized globally.");
}
// Safeguard for renderMacroConsolePanel on window
if (typeof window.renderMacroConsolePanel === "undefined") {
  window.renderMacroConsolePanel = function () {
    console.warn("⚠️ renderMacroConsolePanel not implemented yet.");
  };
}
if (typeof SageCraftAscendant.OperatorConsole === "object") {
  SageCraftAscendant.OperatorConsole.renderMacroConsolePanel = function (container) {
    if (!container) return;

    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🎯 Neural Macro Console";
    section.appendChild(header);

    const macroList = document.createElement("div");
    macroList.style.border = "1px solid #555";
    macroList.style.background = "#111";
    macroList.style.padding = "10px";
    macroList.style.height = "250px";
    macroList.style.overflowY = "scroll";
    section.appendChild(macroList);

    function refreshMacroList() {
      macroList.innerHTML = '';
      for (let i = 1; i <= 9; i++) {
        const slot = document.createElement("div");
        slot.style.marginBottom = "8px";
        slot.textContent = `Slot ${i}: `;
        const assigned = SageCraftAscendant.NeuralMacroCodex?.isSlotAssigned?.(i) ? '🟢 Assigned' : '⚪ Empty';
        slot.innerHTML += assigned;
        macroList.appendChild(slot);
      }
    }

    // Expose macroRegistry for panel (for display only)
    if (!SageCraftAscendant.NeuralMacroCodex.macroRegistry) {
      // Provide a reference to macroRegistry for display
      Object.defineProperty(SageCraftAscendant.NeuralMacroCodex, "macroRegistry", {
        get: function () { return this._macroRegistry || {}; },
        set: function (val) { this._macroRegistry = val; }
      });
      SageCraftAscendant.NeuralMacroCodex.macroRegistry = {};
    }
    // Sync reference for display (in case already defined in closure)
    if (typeof SageCraftAscendant.NeuralMacroCodex._macroRegistry === "undefined" && typeof SageCraftAscendant.NeuralMacroCodex.registerMacro === "function") {
      // Try to find the macroRegistry in the closure (hacky, but for panel display)
      // We can't access closure directly, so fallback to empty object if not available
    }

    refreshMacroList();

    const slotInput = document.createElement("input");
    slotInput.type = "number";
    slotInput.min = 1;
    slotInput.max = 9;
    slotInput.placeholder = "Slot #";
    slotInput.style.width = "50px";
    slotInput.style.marginRight = "10px";
    section.appendChild(slotInput);

    const registerBtn = document.createElement("button");
    registerBtn.textContent = "➕ Bind Mock Macro";
    registerBtn.onclick = () => {
      const slotNum = parseInt(slotInput.value);
      if (slotNum >= 1 && slotNum <= 9) {
        SageCraftAscendant.NeuralMacroCodex?.registerMacro(slotNum, () => {
          alert(`🎯 Mock Macro Executed → Slot ${slotNum}`);
        });
        // Also update macroRegistry for display
        if (SageCraftAscendant.NeuralMacroCodex.macroRegistry) {
          SageCraftAscendant.NeuralMacroCodex.macroRegistry[slotNum] = true;
        }
        refreshMacroList();
      } else {
        alert("⚠ Enter valid slot 1-9");
      }
    };
    section.appendChild(registerBtn);

    // === Phase 27.6 — Export/Import UI Controls ===

    const exportBtn = document.createElement("button");
    exportBtn.textContent = "📤 Export Macros";
    exportBtn.style.marginLeft = "10px";
    exportBtn.onclick = () => {
      SageCraftAscendant.NeuralMacroCodex?.exportMacros();
    };
    section.appendChild(exportBtn);

    const importLabel = document.createElement("label");
    importLabel.style.marginTop = "10px";
    importLabel.style.display = "block";
    importLabel.textContent = "📥 Import Macros:";

    const importInput = document.createElement("input");
    importInput.type = "file";
    importInput.accept = ".json";
    importInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          SageCraftAscendant.NeuralMacroCodex?.importMacros(evt.target.result);
          refreshMacroList();
          alert("✅ Macro Registry imported.");
        } catch (err) {
          alert("⚠ Failed to import macros.");
        }
      };
      reader.readAsText(file);
    };

    section.appendChild(importLabel);
    section.appendChild(importInput);

    container.appendChild(section);
};
} else {
  console.warn("⚠️ OperatorDockConsole not initialized yet. Skipping panel binding.");
}

// Macro Console Panel Registration — Phase 27.2
// (Old OperatorDockConsole.registerPanel logic removed)
// === Phase 27.1 — Neural Hotkey Macro Channel Bootstrap ===
SageCraftAscendant.NeuralMacroCodex = (function() {
  const macroRegistry = loadMacroRegistry();

  function registerMacro(slotNumber, actionFn) {
    if (slotNumber < 1 || slotNumber > 9) {
      console.warn(`⚠ Invalid macro slot: ${slotNumber}. Only slots 1-9 allowed.`);
      return;
    }
    macroRegistry[slotNumber] = actionFn;
    saveMacroRegistry();
    console.log(`🎯 Neural Macro Registered → Slot ${slotNumber}`);
  }

  function saveMacroRegistry() {
    try {
      const slots = Object.keys(macroRegistry);
      const persistence = slots.reduce((acc, slot) => {
        acc[slot] = true; // We only persist assigned slots; logic bodies are mocked anyway
        return acc;
      }, {});
      localStorage.setItem("neuralMacroRegistry", JSON.stringify(persistence));
      console.log("💾 Neural Macro Registry saved.");
    } catch (err) {
      console.warn("⚠ Failed to save Macro Registry:", err);
    }
  }

  function loadMacroRegistry() {
    try {
      const stored = localStorage.getItem("neuralMacroRegistry");
      if (stored) {
        const parsed = JSON.parse(stored);
        const restored = {};
        for (const slot in parsed) {
          restored[slot] = () => {
            alert(`🎯 Persisted Macro Slot ${slot} Executed`);
          };
        }
        console.log("🔄 Neural Macro Registry restored.");
        return restored;
      }
    } catch (err) {
      console.warn("⚠ Failed to load Macro Registry:", err);
    }
    return {};
  }

  function initialize() {
    console.log("🎯 Neural Macro Codex Initialized");

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.altKey) {
        const numKey = parseInt(e.key);
        if (numKey >= 1 && numKey <= 9) {
          const macro = macroRegistry[numKey];
          if (macro) {
            console.log(`🎯 Neural Macro Slot ${numKey} Executed`);
            macro();
          } else {
            console.warn(`⚠ No macro assigned to Slot ${numKey}`);
          }
        }
      }
    });
  }

  function isSlotAssigned(slotNumber) {
    return !!macroRegistry[slotNumber];
  }

  // === Phase 27.5 — Export & Import Channels ===
  function exportMacros() {
    try {
      const slots = Object.keys(macroRegistry);
      const exportData = slots.reduce((acc, slot) => {
        acc[slot] = true; // We still export presence only (for safety with mock actions)
        return acc;
      }, {});
      const exportString = JSON.stringify(exportData, null, 2);
      downloadFile(exportString, 'NeuralMacroRegistryExport.json');
      console.log("📤 Macro Registry exported.");
    } catch (err) {
      console.warn("⚠ Failed to export Macro Registry:", err);
    }
  }

  function importMacros(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      for (const slot in imported) {
        const slotNum = parseInt(slot);
        if (slotNum >= 1 && slotNum <= 9) {
          macroRegistry[slotNum] = () => {
            alert(`🎯 Imported Macro Slot ${slotNum} Executed`);
          };
        }
      }
      saveMacroRegistry();
      console.log("📥 Macro Registry imported.");
    } catch (err) {
      console.warn("⚠ Failed to import Macro Registry:", err);
    }
  }

  function downloadFile(content, filename) {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return {
    registerMacro,
    initialize,
    isSlotAssigned,
    exportMacros,
    importMacros
  };

})();

// Initialize Neural Macro Codex immediately
SageCraftAscendant.NeuralMacroCodex.initialize();
// === Phase 27.0 — Operator Gesture Control Bootstrap ===
SageCraftAscendant.OperatorGestures = (function() {

  function initialize() {
    console.log("🎛 Operator Gesture Control Initialized");

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case "d":
            toggleAllDockPanels();
            break;
          case "m":
            toggleMeshVisualizer();
            break;
          case "r":
            triggerMeshReconciliation();
            break;
        }
      }
    });
  }

  function toggleAllDockPanels() {
    const dockPanels = document.querySelectorAll(".dock-panel .dock-collapse-btn");
    dockPanels.forEach(btn => btn.click());
    console.log("🎛 Operator Gesture: Toggled all dock panels.");
  }

  function toggleMeshVisualizer() {
    const containerId = "meshTopologyContainer";
    let container = document.getElementById(containerId);
    if (container) {
      container.remove();
      console.log("🎛 Operator Gesture: Mesh Visualizer hidden.");
    } else {
      SageCraftAscendant.MeshTopologyVisualizer?.render();
      console.log("🎛 Operator Gesture: Mesh Visualizer shown.");
    }
  }

  function triggerMeshReconciliation() {
    SageCraftAscendant.MeshSyncReconciler?.initiateReconciliation();
    console.log("🎛 Operator Gesture: Mesh Reconciliation initiated.");
  }

  return {
    initialize
  };

})();

// Initialize Operator Gestures immediately
SageCraftAscendant.OperatorGestures.initialize();
// === Phase 25.2 — Full MeshDock Synchronization Pipeline ===
SageCraftAscendant.DockMeshSyncBridge = (function() {

  const OperatorSessionID = "Operator001";

  // Hook into DockPersistenceHub save operation (intercept and wrap)
  if (typeof DockPersistenceHub !== 'undefined') {
    DockPersistenceHub.overrideDefaultPersistence();
  } else {
    console.warn("⚠️ DockPersistenceHub not yet defined — skipping override.");
  }

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

// === Phase 22.5 — Forecast Model Performance Console Panel
// Ensure OperatorDockConsole is initialized before any dependent assignments
if (!window.OperatorDockConsole) {
  window.OperatorDockConsole = {
    diagnostics: () => {
      console.log("🧪 OperatorDockConsole Diagnostics: Running checks...");
      return "Diagnostics complete.";
    }
  };
  console.log("✅ OperatorDockConsole initialized globally.");
}

// --- Forecast Performance Console Panel: Safe registration block ---
function forecastRenderFunc(container) {
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
}

// Assign or defer registration depending on registerPanel readiness
if (
  typeof SageCraftAscendant.OperatorConsole === "object" &&
  typeof SageCraftAscendant.OperatorConsole.registerPanel !== "function"
) {
  console.warn("⚠️ registerPanel method is not yet available. Deferring forecast console registration...");
  const intervalId = setInterval(() => {
    if (typeof SageCraftAscendant.OperatorConsole.registerPanel === "function") {
      console.log("✅ Delayed forecast panel registration proceeding...");
      SageCraftAscendant.OperatorConsole.renderForecastPerformancePanel = forecastRenderFunc;
      clearInterval(intervalId);
    }
  }, 500);
  // Do not assign yet, will assign when ready
} else if (typeof SageCraftAscendant.OperatorConsole === "object") {
  SageCraftAscendant.OperatorConsole.renderForecastPerformancePanel = forecastRenderFunc;
}

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

    // Forecast Console Panel Registration for OperatorDockConsole (modernized)
    // --- Begin new forecastConsole.panel.js code injection ---
    if (typeof OperatorDockConsole !== "undefined" && typeof OperatorDockConsole.registerPanel === "function") {
      OperatorDockConsole.registerPanel({
        id: 'forecastConsole',
        name: 'Forecast Console',
        render: function(container) {
          const section = document.createElement("section");
          section.classList.add("console-section");

          const title = document.createElement("h3");
          title.textContent = "Forecast Performance Evaluation";
          section.appendChild(title);

          const evaluationContainer = document.createElement("div");
          evaluationContainer.id = "forecastEvaluationResults";
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

          // Expose the renderer globally for mesh or other consumers
          SageCraftAscendant.OperatorConsole.renderForecastPerformancePanel = renderEvaluation;

          container.appendChild(section);
        }
      });
    }
    // --- End forecastConsole.panel.js code injection ---

  // === Forecast Intelligence Console Panel ===
  function renderForecastConsole() {
    const container = document.getElementById("forecastConsole");
    if (!container) {
      console.warn("⚠️ Forecast Console container not found.");
      return;
    }

    container.innerHTML = `
      <h2>📈 Forecast Intelligence Console</h2>
      <div class="forecast-metrics">
        <p><strong>Trend Stability:</strong> <span id="trendStability">-</span></p>
        <p><strong>Drift Trajectory:</strong> <span id="driftTrajectory">-</span></p>
        <p><strong>Signal Clarity:</strong> <span id="signalClarity">-</span></p>
      </div>
      <ul id="forecastLogs" class="console-log-list"></ul>
    `;

    // Populate with mock values
    document.getElementById("trendStability").textContent = `${Math.floor(Math.random() * 100)}%`;
    document.getElementById("driftTrajectory").textContent = `${(Math.random() * 10).toFixed(2)} units`;
    document.getElementById("signalClarity").textContent = `${(Math.random() * 100).toFixed(1)} dB`;

    const logs = [
      "📡 Synchronizing horizon predictors...",
      "🧪 Analyzing pattern volatility...",
      "🌀 Drift containment systems holding...",
      "🌐 Confidence index recalibrated...",
      "🛡 Threat vector foresight stabilized..."
    ];

    const logContainer = document.getElementById("forecastLogs");
    if (logContainer) {
      logContainer.innerHTML = "";
      logs.forEach(log => {
        const li = document.createElement("li");
        li.textContent = `[${new Date().toLocaleTimeString()}] ${log}`;
        logContainer.appendChild(li);
      });
    }
  }

  // === Lore Engine Console Initialization ===
  if (document.getElementById("loreEngineConsole")) {
    console.log("🧠 Lore Engine Console Initialized");
    document.getElementById("loreEngineConsole").innerHTML = `
      <div class="lore-engine-header">📜 Welcome to the Lore Engine</div>
      <div class="lore-engine-body">Awaiting memory stream...</div>
    `;

    // === Grimoire Archive Skeleton Injection ===
    document.getElementById("loreEngineConsole").innerHTML += `
      <div class="grimoire-section">
        <h3 class="grimoire-header">📖 Grimoire Archive</h3>
        <div id="grimoireLog" class="grimoire-log" style="border: 1px solid #555; background: #111; color: #eee; padding: 10px; height: 150px; overflow-y: scroll; margin-bottom: 10px;">
          <p><i>🧭 Awaiting unlocked lore entries...</i></p>
        </div>

        <div class="grimoire-entry-form" style="margin-top: 10px;">
          <input id="grimoireEntryId" type="text" placeholder="Lore ID" style="margin-bottom: 5px; display: block;" />
          <input id="grimoireEntryTitle" type="text" placeholder="Lore Title" style="margin-bottom: 5px; display: block;" />
          <textarea id="grimoireEntryContent" placeholder="Lore Content" rows="4" style="width: 100%; margin-bottom: 5px;"></textarea>
          <button id="addGrimoireEntryBtn">💾 Add Lore Entry</button>
        </div>
      </div>
    `;

    document.getElementById("addGrimoireEntryBtn").onclick = () => {
      const id = document.getElementById("grimoireEntryId").value.trim();
      const title = document.getElementById("grimoireEntryTitle").value.trim();
      const content = document.getElementById("grimoireEntryContent").value.trim();
      if (!id || !title || !content) {
        alert("⚠ Please complete all fields to add a lore entry.");
        return;
      }

      const timestamp = new Date().toLocaleString();
      const entryHtml = `<div style="margin-bottom: 10px;">
        <b>${title}</b><br>
        <i>${content}</i><br>
        <span style="color: #888;">${timestamp}</span>
      </div>`;

      document.getElementById("grimoireLog").innerHTML += entryHtml;

      document.getElementById("grimoireEntryId").value = '';
      document.getElementById("grimoireEntryTitle").value = '';
      document.getElementById("grimoireEntryContent").value = '';
    };
  }

  // === Forecast Console Panel Registration (Stabilized Retry Mechanism) ===
  // (Removed duplicate retry logic for forecastConsole panel registration, now handled in forecastConsole.panel.js)
  // Phase 22.2 — Live Data Fusion Integration
  // Wrap renderForecastCortexPanel assignment in whenReady to ensure OperatorDockConsole is defined
  // --- PATCH: Safe invocation of renderForecastCortexPanel ---
  const forecastRenderFn = window?.SageSystem?.renderForecastCortexPanel;
  if (typeof forecastRenderFn === 'function') {
    whenReady(forecastRenderFn);
  } else {
    console.warn('⚠️ renderForecastCortexPanel is not a function or not available yet.');
  }
// === Phase 28.1 — Operator Script Console Panel Injection ===
// === Phase 28.1 — Operator Script Console Panel Injection (Conditional-Safe Assignment) ===
// (whenReady definition moved below)
// === Phase 29.0 — Dock Panel Resurrection Bootstrap ===


// 🧠 Lore Engine Console Initialization
const loreEngineConsole = document.getElementById("loreEngineConsole");
if (loreEngineConsole) {
  console.log("✅ loreEngineConsole initialized and wired to DOM");
} else {
  console.warn("⚠️ loreEngineConsole not found in DOM");
}

// === Register Lore Engine Console Panel ===
if (typeof registerPanel === "function" && typeof loreEngineConsole !== "undefined") {
  registerPanel("loreEngineConsole", loreEngineConsole);
}


// === Phase 18.1 — Neural Live Table Panel Renderer ===
function renderLiveTablePanel(container) {
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

  const injectBtn = document.createElement("button");
  injectBtn.textContent = "➕ Inject Mock Data";
  injectBtn.style.marginTop = "10px";
  injectBtn.onclick = () => {
    SageCraftAscendant.NeuralLiveTable.injectMockData();
  };
  section.appendChild(injectBtn);

  container.appendChild(section);
}

// Assign renderLiveTablePanel to SageCraftAscendant.consolePanels for compatibility
SageCraftAscendant.consolePanels = SageCraftAscendant.consolePanels || {};
SageCraftAscendant.consolePanels.renderLiveTablePanel = renderLiveTablePanel;
  
  // End of DOMContentLoaded listener
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

// === HUD Element Validation (Phase X) ===
function validateHUDElements() {
  const requiredElements = [
    'dockStatusText',
    'lastSync',
    'itemSpan',
    'categorySpan',
    'recentList'
  ];

  let allFound = true;

  for (const id of requiredElements) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`⚠️ HUD element "${id}" is missing or null.`);
      allFound = false;
    } else {
      console.log(`✅ Revalidation: Element "${id}" successfully located.`);
    }
  }

  return allFound;
}

// Call before any HUD operations
if (validateHUDElements()) {
  // Proceed with HUD binding logic...
  // (Keep existing HUD population code here)
} else {
  console.warn("⚠️ Skipping HUD operations — one or more required elements missing.");
}

// === Phase 30.0 — Operator Telemetry Pulse Channels ===
setInterval(() => {
  const pulseChannels = [
    { channel: "vitals", detail: `Core=${Math.floor(Math.random() * 8) + 3}, Drift=${(Math.random() * 1.25).toFixed(3)}` },
    { channel: "security", detail: `Audit Log Cleared` },
    { channel: "memory", detail: `Neural Sync: ${(Math.random() * 100).toFixed(2)}%` },
    { channel: "orbits", detail: `Active: ${Math.floor(Math.random() * 10)}` },
    { channel: "threat", detail: `No threat anomalies` },
    { channel: "governance", detail: `Directives validated @ ${new Date().toLocaleTimeString()}` }
  ];

  pulseChannels.forEach(({ channel, detail }) => {
    document.dispatchEvent(new CustomEvent("sovereignPulse", {
      detail: { channel, detail }
    }));
  });
}, 4000);

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

    // 🧠 Emit operator console launch to SovereignBus
    if (window.SovereignBus) {
      SovereignBus.emit("operator.console", "Operator Command Console deployed.");
    }

    console.log("✅ Operator Console fully rendered.");
  }


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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('diagnostics', 'Diagnostics Console', 'renderDiagnosticsPanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }

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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('meshIntegrity', 'Mesh Integrity Overlay', 'renderMeshIntegrityPanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }


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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('eventLog', 'Event Log Console', 'renderEventLogPanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }


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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('forecastAnomaly', 'Forecast Anomaly Sentinel', 'renderForecastAnomalyPanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }


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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('controlLattice', 'Control Lattice Console', 'renderControlLatticePanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }


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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('memoryControl', 'Memory Control Console', 'renderMemoryPanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }


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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('recoveryConsole', 'Recovery Console', 'renderRecoveryPanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }


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
  if (typeof registerWhenReady === "function") {
    registerWhenReady('forecastMutation', 'Forecast Mutation Simulator', 'renderForecastMutationPanel');
  } else {
    console.warn("⚠️ registerWhenReady is not defined — skipping forecast console registration.");
  }



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
  // === Phase 28.1 — Operator Script Console Panel Injection ===
  function renderScriptConsolePanel(container) {
    container.innerHTML = `
      <div class="script-console">
        <textarea id="scriptInput" placeholder="Write your Operator Script here..."></textarea>
        <div class="controls">
          <button id="runScript">▶️ Run</button>
          <button id="saveScript">💾 Save</button>
          <button id="clearScript">🧹 Clear</button>
          <select id="scriptSelector"></select>
        </div>
      </div>
    `;

    const scriptInput = container.querySelector('#scriptInput');
    const runBtn = container.querySelector('#runScript');
    const saveBtn = container.querySelector('#saveScript');
    const clearBtn = container.querySelector('#clearScript');
    const scriptSelector = container.querySelector('#scriptSelector');

    runBtn.onclick = () => eval(scriptInput.value);
    saveBtn.onclick = () => {
      const name = prompt("Save as:");
      if (name) {
        localStorage.setItem(`script-${name}`, scriptInput.value);
        updateScriptSelector();
      }
    };
    clearBtn.onclick = () => scriptInput.value = '';

    function updateScriptSelector() {
      scriptSelector.innerHTML = '';
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('script-')) {
          const option = document.createElement('option');
          option.value = key.replace('script-', '');
          option.textContent = key.replace('script-', '');
          scriptSelector.appendChild(option);
        }
      });
    }

    scriptSelector.onchange = () => {
      const script = localStorage.getItem(`script-${scriptSelector.value}`);
      if (script) scriptInput.value = script;
    };

    updateScriptSelector();
  }

  return Object.assign(
    {},
    typeof renderOperatorConsole === "function" ? { renderOperatorConsole } : {},
    typeof renderDiagnosticsPanel === "function" ? { renderDiagnosticsPanel } : {},
    typeof renderMeshIntegrityPanel === "function" ? { renderMeshIntegrityPanel } : {},
    typeof renderEventLogPanel === "function" ? { renderEventLogPanel } : {},
    typeof renderForecastAnomalyPanel === "function" ? { renderForecastAnomalyPanel } : {},
    typeof renderControlLatticePanel === "function" ? { renderControlLatticePanel } : {},
    typeof renderMemoryPanel === "function" ? { renderMemoryPanel } : {},
    typeof renderRecoveryPanel === "function" ? { renderRecoveryPanel } : {},
    typeof renderForecastMutationPanel === "function" ? { renderForecastMutationPanel } : {},
    typeof renderOperatorControlDeck === "function" ? { renderOperatorControlDeck } : {},
    typeof renderSubsystemNavigation === "function" ? { renderSubsystemNavigation } : {},
    typeof renderScriptConsolePanel === "function" ? { renderScriptConsolePanel } : {},
    typeof registerOrbitInjectionControls === "function" ? { registerOrbitInjectionControls } : {},
    typeof registerOrbitRemovalControls === "function" ? { registerOrbitRemovalControls } : {},
    typeof registerOrbitRegistryControls === "function" ? { registerOrbitRegistryControls } : {}
  );
})();

  // === Phase 28.0 — Neural Operator Scripting Layer Bootstrap ===
SageCraftAscendant.OperatorScripts = (function () {
  
  const _scriptRegistry = {};

  function registerScript(id, label, steps) {
    if (!id || typeof steps !== 'function') {
      console.warn("⚠ Invalid script registration attempt.");
      return;
    }
    _scriptRegistry[id] = { label, steps };
    console.log(`🧬 Operator Script Registered → ${label} (${id})`);
    saveScriptRegistry();
  }

  function executeScript(id) {
    const script = _scriptRegistry[id];
    if (!script) {
      console.warn(`⚠ No Operator Script found for ID: ${id}`);
      return;
    }
    console.log(`🚀 Executing Operator Script → ${script.label}`);
    try {
      script.steps();
      SageCraftAscendant.NeuralBus?.publish("OperatorScript:Executed", { id, label: script.label });
    } catch (err) {
      console.error(`💥 Operator Script Execution Failed: ${err}`);
    }
  }

  function listScripts() {
    return _scriptRegistry;
  }

  function saveScriptRegistry() {
    try {
      const simpleRegistry = Object.entries(_scriptRegistry).reduce((acc, [id, script]) => {
        acc[id] = { label: script.label, steps: script.steps.toString() };
        return acc;
      }, {});
      localStorage.setItem("operatorScriptRegistry", JSON.stringify(simpleRegistry));
      console.log("💾 Operator Script Registry (with logic bodies) saved.");
    } catch (err) {
      console.warn("⚠ Failed to save Operator Script Registry:", err);
    }
  }

  function loadScriptRegistry() {
    try {
      const stored = localStorage.getItem("operatorScriptRegistry");
      if (stored) {
        const parsed = JSON.parse(stored);
        for (const id in parsed) {
          const scriptObj = parsed[id];
          let reconstructedFn = () => {
            alert(`🧬 Placeholder for Operator Script '${scriptObj.label}'`);
          };
          try {
            reconstructedFn = eval(`(${scriptObj.steps})`);
          } catch (err) {
            console.warn(`⚠ Failed to reconstruct script steps for '${id}':`, err);
          }
          _scriptRegistry[id] = { label: scriptObj.label, steps: reconstructedFn };
        }
        console.log("🔄 Operator Script Registry (with logic bodies) restored.");
      }
    } catch (err) {
      console.warn("⚠ Failed to load Operator Script Registry:", err);
    }
  }
  return {
    registerScript,
    executeScript,
    listScripts,
    saveScriptRegistry,
    loadScriptRegistry
  };
})();

// === Telemetry Broadcast: Sovereign Pulse Vitals ===
setInterval(() => {
  const channel = "vitals";
  const detail = `Core=${Math.floor(Math.random() * 8) + 3}, Drift=${(Math.random() * 1.25).toFixed(3)}`;
  document.dispatchEvent(new CustomEvent("sovereignPulse", {
    detail: { channel, detail }
  }));
}, 3000);

// === Phase X — Orbit Controls Registration (Safe Guarded) ===
// Replace direct calls to registerOrbitInjectionControls and registerOrbitRemovalControls with guarded block
if (
  typeof SageCraftAscendant !== 'undefined' &&
  typeof SageCraftAscendant.OperatorConsole !== 'undefined'
) {
  if (typeof SageCraftAscendant.OperatorConsole.registerOrbitInjectionControls === 'function') {
    SageCraftAscendant.OperatorConsole.registerOrbitInjectionControls();
  }
  if (typeof SageCraftAscendant.OperatorConsole.registerOrbitRemovalControls === 'function') {
    SageCraftAscendant.OperatorConsole.registerOrbitRemovalControls();
  }
} else {
  console.warn("⚠️ Orbit control methods skipped — OperatorConsole not available.");
}

// === Forecast Cortex Panel Render assignment helper ===
function waitForOperatorDockConsole(attempts = 20) {
  if (window.OperatorDockConsole) {
    window.OperatorDockConsole.renderForecastCortexPanel = function () {
      // 🚀 Custom rendering logic here
      console.log("🌀 Forecast Cortex Panel Rendered");
    };
    console.log("✅ renderForecastCortexPanel successfully assigned.");
  } else if (attempts > 0) {
    console.warn("⏳ Waiting for OperatorDockConsole to initialize...");
    setTimeout(() => waitForOperatorDockConsole(attempts - 1), 200);
  } else {
    console.error("❌ OperatorDockConsole not available after multiple attempts.");
  }
}

// Trigger delayed check
waitForOperatorDockConsole();
// ✅ Declare whenReady utility if not already defined

// --- PATCH: Robust whenReady implementation with type check ---
