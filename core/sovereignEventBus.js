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
  }
};

window.SovereignBus.emit = window.SovereignBus.emit.bind(window.SovereignBus);

console.log("🧠 SovereignBus initialized: Listening for system-wide pulse events.");