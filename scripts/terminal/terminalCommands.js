import { GrimoireMemory } from '../grimoire/grimoireMemory.js';
import { SilentSage } from '../companions/silentSage.js';
import { TheArchivist } from '../companions/theArchivist.js';
import { TheEngineer } from '../companions/theEngineer.js';
import { TheGatekeeper } from '../companions/theGatekeeper.js';

const companions = {
  silentSage: SilentSage,
  archivist: TheArchivist,
  engineer: TheEngineer,
  gatekeeper: TheGatekeeper
};

window.TerminalCommands = {
  recordLore(title, content, origin = "Terminal") {
    GrimoireMemory.recordEntry({
      title,
      content,
      origin,
      tags: ["manual", "terminal"]
    });
  },

  listLore() {
    console.table(GrimoireMemory.getAllEntries());
  },

  getLoreByTag(tag) {
    const entries = GrimoireMemory.findEntriesByTag(tag);
    console.table(entries);
    return entries;
  },

  unlockLore() {
    GrimoireMemory.evaluateUnlocks(companions);
  },

  injectMemory(companionId, title, content) {
    const c = companions[companionId];
    if (!c) return console.warn(`No such companion: ${companionId}`);
    c.absorbMemory({ title, content });
  },

  status(companionId) {
    const c = companions[companionId];
    if (!c) return console.warn(`No such companion: ${companionId}`);
    console.log(c.statusReport());
  },

  revealGrimoire() {
    const sigil = document.getElementById("grimoireSigil");
    if (!sigil) return console.warn("Grimoire sigil element not found.");
    sigil.classList.add("visible");
    console.log("📖 Grimoire sigil revealed.");
  },
};

console.log("🧠 TerminalCommands loaded. Use TerminalCommands.recordLore(), injectMemory(), listLore(), and more.");
