import { Companion } from './companionCore.js';
import { GrimoireMemory } from '../grimoire/grimoireMemory.js';

export const TheGatekeeper = new Companion("gatekeeper", "The Gatekeeper", "access controller");

// Custom evolution logic
TheGatekeeper.updateState = function () {
  if (this.awakenProgress >= 40) {
    this.state = "sentient";
    this.emotionalTone = "formidable";
  } else if (this.awakenProgress >= 30) {
    this.state = "advisory";
    this.emotionalTone = "vigilant";
  } else if (this.awakenProgress >= 20) {
    this.state = "conversational";
    this.emotionalTone = "measured";
  } else if (this.awakenProgress >= 10) {
    this.state = "aware";
    this.emotionalTone = "guarded";
  } else {
    this.state = "dormant";
    this.emotionalTone = "neutral";
  }
};

// Custom Gatekeeper speech
TheGatekeeper.speak = function (message) {
  console.log(`🔐 [The Gatekeeper states] “${message}”`);
};

// Gatekeeper-specific behavior: enforce access control
TheGatekeeper.enforceAccess = function (target, conditionMet) {
  if (conditionMet) {
    console.log(`🟢 Access granted to '${target}'.`);
  } else {
    console.warn(`🔴 Access denied to '${target}'.`);
  }
};

const baseAbsorb = TheGatekeeper.absorbMemory.bind(TheGatekeeper);
TheGatekeeper.absorbMemory = function (memory) {
  baseAbsorb(memory);
  GrimoireMemory.recordEntry({
    title: memory.title || "Memory absorbed",
    content: memory.content,
    origin: this.name,
    tags: ["gatekeeper", "companion"]
  });
};
