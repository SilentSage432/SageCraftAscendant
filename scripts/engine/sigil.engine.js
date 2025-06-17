// 🪄 sigil.engine.js
console.log("🔮 Sigil Engine initialized.");

// Sigil Engine Namespace
const SigilEngine = {
  sigils: {},

  createSigil(name, properties = {}) {
    const sigil = {
      name,
      createdAt: new Date().toISOString(),
      ...properties
    };

    this.sigils[name] = sigil;
    console.log(`✨ Sigil '${name}' has been forged.`, sigil);
    return sigil;
  },

  getSigil(name) {
    return this.sigils[name] || null;
  },

  listSigils() {
    return Object.keys(this.sigils);
  },

  deleteSigil(name) {
    if (this.sigils[name]) {
      delete this.sigils[name];
      console.log(`🗑️ Sigil '${name}' has been dismissed.`);
      return true;
    }
    return false;
  },

  pulse(name, payload = {}) {
    if (!this.sigils[name]) {
      console.warn(`⚠️ No sigil named '${name}' found to pulse.`);
      return;
    }

    const pulseEvent = new CustomEvent("sigilPulse", {
      detail: {
        sigil: this.sigils[name],
        payload,
        timestamp: Date.now()
      }
    });

    window.dispatchEvent(pulseEvent);
    console.log(`📡 Sigil '${name}' pulsed into the mesh.`, pulseEvent.detail);
  }
};
