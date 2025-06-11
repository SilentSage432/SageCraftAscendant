

// 🧠 CompanionCognitionCore — Base AI Loop Framework for Sovereign Mesh

(function () {
  const THINK_INTERVAL = 6000; // milliseconds between autonomous thinking cycles

  class CompanionMind {
    constructor(name, options = {}) {
      this.name = name;
      this.onThink = options.onThink || function () {};
      this.memory = options.memory || {};
      this.loop = null;
    }

    startThinking() {
      console.log(`🤖 ${this.name} cognition loop activated.`);
      this.loop = setInterval(() => {
        try {
          this.onThink(this.memory);
        } catch (err) {
          console.error(`🛑 ${this.name} cognition error:`, err);
        }
      }, THINK_INTERVAL);
    }

    stopThinking() {
      clearInterval(this.loop);
      console.log(`⛔️ ${this.name} cognition loop halted.`);
    }

    speak(event, payload = {}) {
      if (window.SignalMesh) {
        SignalMesh.broadcast(event, payload);
      } else {
        console.warn(`⚠️ ${this.name} attempted to speak but SignalMesh is unavailable.`);
      }
    }
  }

  // Global access for all companions
  window.CompanionMind = CompanionMind;
})();