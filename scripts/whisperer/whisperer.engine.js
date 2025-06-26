console.log("🧠 Whisperer Engine Initialized | Phase 22: Lore Tag Echoes + Memory Flag Detection");

const WhispererLoreEngine = {
  loreEntries: [],
  memoryFlags: [],

  echoLoreTag(tag, content) {
    const timestamp = new Date().toISOString();
    const entry = { tag, content, timestamp };
    this.loreEntries.push(entry);
    console.log(`📖 Lore Echo | [${tag}] ${content}`);
    this.flagMemory(tag, content);
  },

  flagMemory(tag, reason) {
    const flag = {
      tag,
      reason,
      time: new Date().toLocaleTimeString(),
      status: "⚠️ Flagged"
    };
    this.memoryFlags.push(flag);
    console.log(`🚩 Memory Flag | [${tag}] Reason: ${reason}`);
  },

  getLoreLog() {
    return this.loreEntries;
  },

  getFlaggedMemory() {
    return this.memoryFlags;
  }
};

window.WhispererLoreEngine = WhispererLoreEngine;
