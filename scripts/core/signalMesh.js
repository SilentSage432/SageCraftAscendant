// 🧠 SignalMesh — Neural Broadcast Grid
// Allows all companions to broadcast and receive internal system events

window.SignalMesh = (function () {
  const listeners = {};

  function broadcast(eventType, payload = {}) {
    if (!listeners[eventType]) return;
    for (const callback of listeners[eventType]) {
      try {
        callback(payload);
      } catch (e) {
        console.warn(`🧠 SignalMesh error in ${eventType} listener:`, e);
      }
    }
  }

  function listen(eventType, callback) {
    if (!listeners[eventType]) {
      listeners[eventType] = [];
    }
    listeners[eventType].push(callback);
  }

  function clear(eventType) {
    if (listeners[eventType]) {
      delete listeners[eventType];
    }
  }

  // 🌌 Sovereign Panel Signal Router
  listen("panel.activate", (payload) => {
    const { target } = payload;
    if (!target) return;

    const el = document.getElementById(target);
    if (el) {
      el.style.display = "block";
      el.classList.add("active-panel");
    }
  });

  listen("panel.deactivate", (payload) => {
    const { target } = payload;
    if (!target) return;

    const el = document.getElementById(target);
    if (el) {
      el.style.display = "none";
      el.classList.remove("active-panel");
    }
  });

  // 🧠 MeshMemory Sync Layer — Phase 16030
  const memoryStore = {};
  const memoryListeners = {};

  const MeshMemory = {
    set(key, value) {
      memoryStore[key] = value;
      if (memoryListeners[key]) {
        for (const cb of memoryListeners[key]) {
          try {
            cb(value);
          } catch (e) {
            console.warn(`💾 MeshMemory error for key "${key}":`, e);
          }
        }
      }
    },
    get(key) {
      return memoryStore[key];
    },
    listen(key, callback) {
      if (!memoryListeners[key]) {
        memoryListeners[key] = [];
      }
      memoryListeners[key].push(callback);
    },
    clear(key) {
      delete memoryStore[key];
      delete memoryListeners[key];
    },
    all() {
      return { ...memoryStore };
    }
  };

  window.MeshMemory = MeshMemory;

  return {
    broadcast,
    listen,
    clear
  };
})();