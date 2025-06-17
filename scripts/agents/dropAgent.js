

registerAgent("dropAgent", {
  receiveDirective(directive) {
    switch (directive.action) {
      case "checkInventory":
        console.log("📦 dropAgent: Checking inventory...");
        // Future inventory logic here
        break;
      case "placeOrder":
        const order = directive.payload?.orderId || "unknown";
        console.log(`🧾 dropAgent: Placing mock order #${order}`);
        alert(`🛒 Mock order placed: #${order}`);
        break;
      default:
        console.warn(`⚠️ dropAgent received unknown action: ${directive.action}`);
    }
  },
  init() {
    console.log("📦 dropAgent initialized.");
  },
  ping() {
    console.log("📡 dropAgent ping received.");
  }
});