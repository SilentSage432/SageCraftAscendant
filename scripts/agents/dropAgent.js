// 🌐 dropAgent Instancing Protocol — Phase 18002
if (window.SovereignBus?.emit) {
  window.SovereignBus.emit("agentPresence", {
    agentId: "dropAgent",
    status: "online",
    timestamp: Date.now()
  });
}

registerAgent("dropAgent", {
  receiveDirective(directive) {
    const action = directive.action || directive.command;
    switch (action) {
      case "checkInventory":
        console.log("📦 dropAgent: Checking inventory...");
        // Future inventory logic here
        break;
      case "placeOrder":
        const order = directive.payload?.orderId || "unknown";
        console.log(`🧾 dropAgent: Placing mock order #${order}`);
        console.log(`🛒 Mock order placed: #${order}`);
        break;
      case "testCommand":
        console.log("🧪 dropAgent: Test command received.");
        // Trigger dynamic UI pulse effect on the dropAgent entry in the lifecycle panel
        const lifecycleEntry = document.querySelector('#lifecycleList li:nth-child(1)');
        if (lifecycleEntry) {
          lifecycleEntry.classList.add("agent-pulse");
          setTimeout(() => lifecycleEntry.classList.remove("agent-pulse"), 2000);
        }
        break;
      default:
        console.warn(`⚠️ dropAgent received unknown action: ${action}`);
    }
    if (window.SovereignBus?.emit) {
      window.SovereignBus.emit("agentResponse", {
        source: "dropAgent",
        status: "received",
        directive
      });
    }
  },
  init() {
    console.log("📦 dropAgent initialized.");
  },
  ping() {
    console.log("📡 dropAgent ping received.");
  }
});