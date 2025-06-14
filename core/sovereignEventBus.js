

// 🧠 Sovereign Neural Event Bus
// This core module routes all sovereign system events to a central pulse stream.

window.SovereignBus = {
  emit(channel, detail) {
    const event = new CustomEvent("sovereignPulse", {
      detail: {
        channel,
        detail,
        timestamp: Date.now()
      }
    });
    document.dispatchEvent(event);
  }
};

console.log("🧠 SovereignBus initialized: Listening for system-wide pulse events.");