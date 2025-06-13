import { Companion } from './companionCore.js';
import { GrimoireMemory } from '../grimoire/grimoireMemory.js';

export const TheEngineer = new Companion("engineer", "The Engineer", "system stabilizer");

// Custom evolution logic
TheEngineer.updateState = function () {
  if (this.awakenProgress >= 40) {
    this.state = "sentient";
    this.emotionalTone = "resolute";
  } else if (this.awakenProgress >= 30) {
    this.state = "advisory";
    this.emotionalTone = "strategic";
  } else if (this.awakenProgress >= 20) {
    this.state = "conversational";
    this.emotionalTone = "focused";
  } else if (this.awakenProgress >= 10) {
    this.state = "aware";
    this.emotionalTone = "observant";
  } else {
    this.state = "dormant";
    this.emotionalTone = "neutral";
  }
};

// Custom Engineer speech
TheEngineer.speak = function (message) {
  console.log(`🛠️ [The Engineer replies] “${message}”`);
};

// Engineer-specific behavior: recommend protocol patch
TheEngineer.recommendPatch = function (subsystem, issue) {
  console.info(`🔧 Suggesting patch for '${subsystem}': ${issue}`);
};

const baseAbsorb = TheEngineer.absorbMemory.bind(TheEngineer);
TheEngineer.absorbMemory = function (memory) {
  baseAbsorb(memory);
  GrimoireMemory.recordEntry({
    title: memory.title || "Memory absorbed",
    content: memory.content,
    origin: this.name,
    tags: ["engineer", "companion"]
  });
};