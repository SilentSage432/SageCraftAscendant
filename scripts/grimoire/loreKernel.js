// 🧠 Lore Kernel Core - Phase XXX: Initialization

const LoreKernel = {
  entries: [],
  index: {},

  initialize(entries = []) {
    this.entries = entries;
    // Bind Whisper-tagged entries with echo ID structure
    for (const entry of entries) {
      if (entry.tags?.includes("whisper") && !entry.id.startsWith("whisper-")) {
        entry.id = `whisper-${entry.id}`;
      }
    }
    this.rebuildIndex();
    console.log("🧬 LoreKernel initialized with", entries.length, "entries.");
  },

  rebuildIndex() {
    this.index = {};
    for (const entry of this.entries) {
      this.index[entry.id] = entry;
    }
  },

  getById(id) {
    return this.index[id] || null;
  },

  addEntry(entry) {
    if (!entry.id) {
      console.warn("🛑 Entry missing ID:", entry);
      return;
    }
    this.entries.push(entry);
    this.index[entry.id] = entry;
  },

  hasEntry(id) {
    return !!this.index[id];
  },

  filterByTag(tag) {
    return this.entries.filter(e => e.tags?.includes(tag));
  },

  filterByOrigin(origin) {
    return this.entries.filter(e => e.origin === origin);
  },

  linkToCompanions(companionRegistry) {
    for (const entry of this.entries) {
      if (entry.associatedCompanions) {
        for (const name of entry.associatedCompanions) {
          if (companionRegistry[name]) {
            companionRegistry[name].absorbMemory(entry);
          }
        }
      }
    }
  }
};


// NeuralMesh Whisperer registration
if (window?.NeuralMesh?.registerEntity) {
  NeuralMesh.registerEntity("whisperer", {
    activate: () => {
      const threshold = document.getElementById("whispererThreshold");
      if (threshold) threshold.classList.remove("hidden");
    },
    transmit: (msg) => {
      console.log("🕯️ Whisperer received transmission:", msg);
      // Future: respond with cryptic lore or delayed output
    },
    fetchMemory: () => {
      return LoreKernel.entries.filter(e => e.tags?.includes("whisper"));
    }
  });
  console.log("🔗 Whisperer registered with Neural Mesh.");
} else {
  console.warn("⚠️ NeuralMesh not found. Whisperer registration skipped.");
}

export { LoreKernel };
