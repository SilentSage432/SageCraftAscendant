// 🧠 memorySocketLinker.js
// Phase 347.0 — Sovereign Memory Socket Linking
// Establishes persistent memory connections for console panels

const MemorySocketLinker = (() => {
  const sockets = {};

  function registerSocket(panelId, initialState = {}) {
    if (!panelId) return;
    if (!sockets[panelId]) {
      sockets[panelId] = {
        state: initialState,
        timestamp: new Date().toISOString()
      };
      console.log(`🧠 Memory socket linked for: ${panelId}`);
    }
  }

  function updateSocket(panelId, newState) {
    if (sockets[panelId]) {
      sockets[panelId].state = { ...sockets[panelId].state, ...newState };
      sockets[panelId].timestamp = new Date().toISOString();
      console.log(`🔄 Socket state updated for: ${panelId}`);
    }
  }

  function getSocket(panelId) {
    return sockets[panelId] || null;
  }

  function listSockets() {
    return Object.keys(sockets);
  }

  return {
    registerSocket,
    updateSocket,
    getSocket,
    listSockets
  };
})();

window.MemorySocketLinker = MemorySocketLinker;
