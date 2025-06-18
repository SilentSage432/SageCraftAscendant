

// 🧠 Companion Protocol Framework | SageCraft Ascendant
// -----------------------------------------------------

const CompanionProtocol = (() => {
  const companions = {};

  function registerCompanion(id, config = {}) {
    if (!id) throw new Error("Companion must have an ID.");
    companions[id] = {
      id,
      name: config.name || "Unnamed Companion",
      role: config.role || "Undefined",
      state: config.state || "idle",
      memory: config.memory || [],
      traits: config.traits || {},
      ...config,
    };
    console.log(`🤝 Companion registered: ${id}`);
    return companions[id];
  }

  function getCompanion(id) {
    return companions[id] || null;
  }

  function updateState(id, newState) {
    if (!companions[id]) return false;
    companions[id].state = newState;
    console.log(`🌀 ${id} state updated to '${newState}'`);
    return true;
  }

  function injectMemory(id, memoryEntry) {
    if (!companions[id]) return false;
    companions[id].memory.push(memoryEntry);
    console.log(`💾 Memory injected into ${id}:`, memoryEntry);
    return true;
  }

  function getAllCompanions() {
    return Object.values(companions);
  }

  return {
    registerCompanion,
    getCompanion,
    updateState,
    injectMemory,
    getAllCompanions,
  };
})();

// 🌐 Expose to global namespace
window.CompanionProtocol = CompanionProtocol;