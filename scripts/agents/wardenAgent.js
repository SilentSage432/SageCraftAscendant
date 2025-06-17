



// 🌐 wardenAgent Instancing Protocol — Phase 18002
if (window.SovereignBus?.emit) {
  window.SovereignBus.emit("agentPresence", {
    agentId: "wardenAgent",
    status: "online",
    timestamp: Date.now()
  });
}

registerAgent("wardenAgent", {
  receiveDirective(directive) {
    switch (directive.action) {
      case "scanAnomalies":
        console.log("🧿 wardenAgent: Scanning for anomalies...");
        if (typeof renderAnomalySanctum === "function") {
          renderAnomalySanctum();
        }
        break;
      case "sweepGhosts":
        console.log("👻 wardenAgent: Sweeping ghost agents...");
        if (typeof sweepGhostAgents === "function") {
          sweepGhostAgents();
        }
        break;
      default:
        console.warn(`⚠️ wardenAgent received unknown action: ${directive.action}`);
    }
  },
  init() {
    console.log("🧿 wardenAgent initialized.");
  },
  ping() {
    console.log("📡 wardenAgent ping received.");
  }
});

// ⏱️ Maintain wardenAgent presence by updating lastPing every 10 seconds
setInterval(() => {
  if (window.SovereignAgents?.wardenAgent) {
    window.SovereignAgents.wardenAgent.lastPing = Date.now();
  }
}, 10000);