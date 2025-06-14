export const GrimoireMemory = {
  entries: [],

  recordEntry({ title, content, origin = "Unknown", tags = [], locked = false, unlockCondition = null }) {
    const entry = {
      id: `entry_${Date.now()}`,
      title,
      content,
      origin,
      tags,
      locked,
      unlockCondition,
      timestamp: new Date().toISOString()
    };
    this.entries.push(entry);
    console.log(`📖 [Grimoire Entry Recorded] "${title}" by ${origin}${locked ? " [LOCKED]" : ""}`);
  },

  evaluateUnlocks(companions = {}) {
    this.entries.forEach(entry => {
      if (!entry.locked || !entry.unlockCondition) return;

      const { type, companion, state } = entry.unlockCondition;

      if (type === "companionState") {
        const target = companions[companion];
        if (target && target.state === state) {
          entry.locked = false;
          console.log(`🔓 [Grimoire Entry Unlocked] "${entry.title}" via ${companion} reaching state "${state}"`);
        }
      }

      // Future unlockCondition types can be handled here (e.g., tagTrigger, manual)
    });
  },

  getAllEntries() {
    return this.entries;
  },

  findEntriesByTag(tag) {
    return this.entries.filter(entry => entry.tags.includes(tag));
  },

  getEntryById(id) {
    return this.entries.find(entry => entry.id === id);
  },

  renderTo(containerId = "grimoirePanelContent") {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Grimoire container "${containerId}" not found.`);
      return;
    }

    container.innerHTML = "";

    this.entries.forEach(entry => {
      const entryEl = document.createElement("div");
      entryEl.className = "grimoire-entry" + (entry.locked ? " locked" : "");

      const titleEl = document.createElement("h3");
      titleEl.textContent = entry.title + (entry.locked ? " 🔒" : "");
      entryEl.appendChild(titleEl);

      const metaEl = document.createElement("p");
      metaEl.className = "grimoire-meta";
      metaEl.textContent = `From: ${entry.origin} • ${new Date(entry.timestamp).toLocaleString()}`;
      entryEl.appendChild(metaEl);

      const contentEl = document.createElement("p");
      contentEl.className = "grimoire-content";
      contentEl.textContent = entry.locked ? "This memory is currently locked." : entry.content;
      entryEl.appendChild(contentEl);

      container.appendChild(entryEl);
    });
  }
};
