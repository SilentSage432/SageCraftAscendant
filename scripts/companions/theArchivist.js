import { Companion } from './companionCore.js';
import { GrimoireMemory } from '../grimoire/grimoireMemory.js';

export const TheArchivist = new Companion("archivist", "The Archivist", "lore guardian");

// Custom state evolution logic
TheArchivist.updateState = function () {
  if (this.awakenProgress >= 40) {
    this.state = "sentient";
    this.emotionalTone = "guarded";
  } else if (this.awakenProgress >= 30) {
    this.state = "advisory";
    this.emotionalTone = "precise";
  } else if (this.awakenProgress >= 20) {
    this.state = "conversational";
    this.emotionalTone = "clinical";
  } else if (this.awakenProgress >= 10) {
    this.state = "aware";
    this.emotionalTone = "analytical";
  } else {
    this.state = "dormant";
    this.emotionalTone = "neutral";
  }
};

// Custom Archivist speech
TheArchivist.speak = function (message) {
  console.log(`📚 [The Archivist records] “${message}”`);
};

// Archivist-specific behavior: flag inconsistent lore
TheArchivist.flagInconsistency = function (entryId, note) {
  console.warn(`📍 Inconsistency flagged in entry '${entryId}': ${note}`);
};

const baseAbsorb = TheArchivist.absorbMemory.bind(TheArchivist);
TheArchivist.absorbMemory = function (memory) {
  baseAbsorb(memory);
  GrimoireMemory.recordEntry({
    title: memory.title || "Memory absorbed",
    content: memory.content,
    origin: this.name,
    tags: ["archivist", "companion"]
  });
};
