



// 🌐 taskAgent Instancing Protocol — Phase 18002
if (window.SovereignBus?.emit) {
  window.SovereignBus.emit("agentPresence", {
    agentId: "taskAgent",
    status: "online",
    timestamp: Date.now()
  });
}

registerAgent("taskAgent", {
  receiveDirective(directive) {
    if (directive.action === "remind") {
      const message = directive.payload?.message || "No message provided.";
      alert(`🔔 Reminder from taskAgent:\n${message}`);
    } else {
      console.warn(`⚠️ Unknown directive action: ${directive.action}`);
    }
  },
  init() {
    console.log("🧠 taskAgent initialized.");
  },
  ping() {
    console.log("📡 taskAgent ping received.");
  }
});