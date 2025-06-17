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

// Delayed SovereignBus Bootstrap to ensure agents are fully registered
setTimeout(() => {
  if (!window.SovereignAgents) {
    console.warn("⚠ SovereignAgents registry not initialized.");
    return;
  }

  const directiveHandler = (event) => {
    const directive = event?.detail;
    if (!directive) {
      console.warn("⚠ Received empty directive payload.");
      return;
    }

    const target = directive.target;
    const agent = window.SovereignAgents?.[target];

    if (agent && typeof agent.receiveDirective === 'function') {
      console.log(`📥 Directive dispatched to agent '${target}':`, directive);
      agent.receiveDirective(directive);
    } else {
      console.warn(`❌ Agent '${target}' is not defined or not yet loaded.`);
    }
  };

  SovereignBus.on('agentDirective', directiveHandler);
  console.log("🤖 SovereignBus (Delayed): Ready to relay directives to SovereignAgents.");
}, 500);

// === Phase 17000 — Sovereign Agent Listener Integration ===
// === Phase 17002 — Sovereign Agent Directive Listener ===
SovereignBus.on('agentDirective', (event) => {
  const directive = event?.detail;
  if (!directive) {
    console.warn("⚠ Received empty directive payload.");
    return;
  }

  const agent = window.SovereignAgent;
  const handler = agent?.receiveDirective;

  if (typeof handler === 'function') {
    console.log("📥 Sovereign Directive dispatched to Agent:", directive);
    handler.call(agent, directive);
  } else {
    console.warn('⚠ SovereignAgent or receiveDirective method not found.');
    console.debug('🛠 Available SovereignAgent:', agent);
  }
});
console.log("🤖 SovereignBus: Ready to relay directives to SovereignAgent.");