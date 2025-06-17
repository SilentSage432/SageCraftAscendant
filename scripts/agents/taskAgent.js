


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