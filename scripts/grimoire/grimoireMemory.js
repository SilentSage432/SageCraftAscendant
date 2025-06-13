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
  }
};
