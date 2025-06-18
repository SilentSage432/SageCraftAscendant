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

  return {
    registerCompanion,
    getCompanion,
    updateState,
    injectMemory,
    updateTraits(id, traits) {
      if (!companions[id]) return false;
      companions[id].traits = { ...companions[id].traits, ...traits };
      console.log(`✨ Traits updated for ${id}:`, companions[id].traits);
      return true;
    },
    overwriteMemory(id, memoryArray) {
      if (!companions[id]) return false;
      companions[id].memory = memoryArray;
      console.log(`♻️ Memory overwritten for ${id}.`);
      return true;
    },
    removeCompanion(id) {
      if (!companions[id]) return false;
      delete companions[id];
      console.log(`🗑️ Companion removed: ${id}`);
      return true;
    },
    getAllCompanions,
  };
})();

// 🌐 Expose to global namespace
window.CompanionProtocol = CompanionProtocol;