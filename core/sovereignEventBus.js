// 🧠 Sovereign Neural Event Bus
// This core module routes all sovereign system events to a central pulse stream.

window.SovereignBus = {
  _listeners: {},

  emit(channel, detail) {
    const event = new CustomEvent(channel, {
      detail: {
        channel,
        detail,
        timestamp: Date.now()
      }
    });
    if (window.MeshSignalProcessor) {
      window.MeshSignalProcessor.process(channel, detail);
    }
    if (this._feedbackHandlers[channel]) {
      this.respond(channel, { type: 'echo', payload: detail });
    }
    document.dispatchEvent(event);
    console.log(`📡 SovereignBus emitted → ${channel}`, detail);
  },

  on(channel, callback) {
    if (!this._listeners[channel]) this._listeners[channel] = [];

    const handler = (e) => {
      callback(e.detail, e);
    };

    document.addEventListener(channel, handler);
    this._listeners[channel].push(handler);

    console.log(`🔊 SovereignBus listener added for → ${channel}`);
  },

  _feedbackHandlers: {},

  registerFeedback(channel, handler) {
    if (!this._feedbackHandlers[channel]) {
      this._feedbackHandlers[channel] = [];
    }
    this._feedbackHandlers[channel].push(handler);
    console.log(`🌀 Feedback handler registered for → ${channel}`);
  },

  respond(channel, data) {
    if (this._feedbackHandlers[channel]) {
      this._feedbackHandlers[channel].forEach(fn => fn(data));
      console.log(`🔁 SovereignBus response sent → ${channel}`, data);
    }
  },
};

window.SovereignBus.emit = window.SovereignBus.emit.bind(window.SovereignBus);

console.log("🧠 SovereignBus initialized: Listening for system-wide pulse events.");

// === Phase 17000 — Sovereign Agent Listener Integration ===
// === Phase 17002 — Sovereign Agent Directive Listener ===
SovereignBus.on('agentDirective', (event) => {
  const directive = event?.detail;
  if (!directive) {
    console.warn("⚠ Received empty directive payload.");
    return;
  }

  if (window.SovereignAgent && typeof SovereignAgent.receiveDirective === 'function') {
    console.log("📥 Sovereign Directive dispatched to Agent:", directive);
    SovereignAgent.receiveDirective(directive);
  } else {
    console.warn('⚠ SovereignAgent or receiveDirective method not found.');
  }
});
console.log("🤖 SovereignBus: Ready to relay directives to SovereignAgent.");