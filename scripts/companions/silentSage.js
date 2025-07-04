import { Companion } from './companionCore.js';
import { GrimoireMemory } from '../grimoire/grimoireMemory.js';

export const SilentSage = new Companion("silentSage", "The Silent Sage", "narrator");

// Override updateState for custom behavior
SilentSage.updateState = function () {
  if (this.awakenProgress >= 40) {
    this.state = "sentient";
    this.emotionalTone = "mystical";
  } else if (this.awakenProgress >= 30) {
    this.state = "advisory";
    this.emotionalTone = "wise";
  } else if (this.awakenProgress >= 20) {
    this.state = "conversational";
    this.emotionalTone = "curious";
  } else if (this.awakenProgress >= 10) {
    this.state = "aware";
    this.emotionalTone = "quiet";
  } else {
    this.state = "dormant";
    this.emotionalTone = "neutral";
  }
};

// Optional: Add custom Sage speech flavor
SilentSage.speak = function (message) {
  console.log(`🧙‍♂️ [Silent Sage whispers] “${message}”`);
};

const baseAbsorb = SilentSage.absorbMemory.bind(SilentSage);
SilentSage.absorbMemory = function (memory) {
  baseAbsorb(memory);
  GrimoireMemory.recordEntry({
    title: memory.title || "Memory absorbed",
    content: memory.content,
    origin: this.name,
    tags: ["sage", "companion"]
  });
};
