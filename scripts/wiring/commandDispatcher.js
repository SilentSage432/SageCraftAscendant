import { SovereignEventHub } from "../sovereign/sovereignEventHub.js";


// === Phase 337.0 — Sovereign Command Dispatch Hooks ===
console.log("🧠 Phase 337.0 — Command Dispatcher Active");

// Central registry for sovereign commands
const SovereignCommands = {
  run: "sovereign:runCommand",
  clear: "sovereign:clearConsole",
  inject: "sovereign:injectPayload",
  save: "sovereign:saveSnapshot",
  reset: "sovereign:resetPanel",
  export: "sovereign:exportData",
  help: "sovereign:showHelp"
};

function dispatchSovereignCommand(type, payload = {}) {
  const eventName = SovereignCommands[type];
  if (!eventName) {
    console.warn(`⚠️ Unknown sovereign command: ${type}`);
    return;
  }
  console.log(`📡 Dispatching sovereign command: ${eventName}`);
  SovereignEventHub.dispatch(eventName, payload);
}

// Optional: attach global function for external triggers
window.SovereignCommand = dispatchSovereignCommand;

// Example usage triggers (can be hooked to buttons, hotkeys, etc.)
document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("injectCommandBtn");
  const clearBtn = document.getElementById("clearConsoleBtn");

  if (runBtn) {
    runBtn.addEventListener("click", () => {
      dispatchSovereignCommand("inject", {
        source: "injectCommandBtn",
        value: document.getElementById("sovereignCommand")?.value || ""
      });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      dispatchSovereignCommand("clear", { source: "clearConsoleBtn" });
    });
  }

  // === Phase 338.2 — Register Feedback, Logs, and Analytics Handlers ===
  SovereignEventHub.listen("sovereign:injectPayload", (payload) => {
    console.log(`📥 Inject Payload Handler: ${payload.value}`);
    // Feedback module could handle this as visual echo or logging
  });

  // === Phase 338.3 — Response Feedback Visualization Layer ===
  SovereignEventHub.listen("sovereign:injectPayload", (payload) => {
    const responseEl = document.getElementById("commandResponse");
    if (!responseEl) return;
    const response = document.createElement("div");
    response.className = "console-response-line";
    response.innerText = `🧠 Oracle says: ${payload.value}`;
    responseEl.appendChild(response);
  });

  SovereignEventHub.listen("sovereign:clearConsole", (payload) => {
    console.log("🧹 Console cleared");
    const responseEl = document.getElementById("commandResponse");
    if (responseEl) responseEl.innerHTML = "";
  });

  SovereignEventHub.listen("sovereign:saveSnapshot", (payload) => {
    console.log("📸 Snapshot saved");
    // Placeholder: integrate future save-to-disk or archive module
  });
});