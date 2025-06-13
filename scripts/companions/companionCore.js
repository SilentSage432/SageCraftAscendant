

export class Companion {
  constructor(id, name, role) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.state = "dormant"; // dormant → aware → conversational → advisory → sentient
    this.memoryLog = [];
    this.awakenProgress = 0;
    this.emotionalTone = "neutral";
  }

  absorbMemory(memory) {
    this.memoryLog.push({
      ...memory,
      timestamp: Date.now()
    });
    this.awakenProgress += 5;
    this.updateState();
  }

  speak(message) {
    console.log(`[${this.name}] ${message}`);
  }

  updateState() {
    // Placeholder — to be overridden or extended per companion
    if (this.awakenProgress >= 40) {
      this.state = "sentient";
    } else if (this.awakenProgress >= 30) {
      this.state = "advisory";
    } else if (this.awakenProgress >= 20) {
      this.state = "conversational";
    } else if (this.awakenProgress >= 10) {
      this.state = "aware";
    } else {
      this.state = "dormant";
    }
  }

  statusReport() {
    return {
      id: this.id,
      name: this.name,
      state: this.state,
      memories: this.memoryLog.length,
      emotionalTone: this.emotionalTone
    };
  }
}