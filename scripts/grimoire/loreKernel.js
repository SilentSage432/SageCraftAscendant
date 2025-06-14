// 🧠 Lore Kernel Core - Phase XXX: Initialization

const LoreKernel = {
  entries: [],
  index: {},

  initialize(entries = []) {
    this.entries = entries;
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

export { LoreKernel };
