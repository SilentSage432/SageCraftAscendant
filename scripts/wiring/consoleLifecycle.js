

// === Phase 335.0 — Interactive Console Lifecycle Rebind ===
console.log("🔄 Phase 335.0 — Console Lifecycle Rebind Initialized");

const consolePanels = [
  "oracleConsole",
  "sessionManagerConsole",
  "deltaAnalyzerConsole",
  "utilityHubConsole",
  "reportingHubConsole",
  "auditConsole",
  "grimoireConsole",
  "sageFeedConsole",
  "whispererConsole"
];

const consoleStateMap = {};

function bindConsoleLifecycle(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`⚠️ Console '${id}' not found in DOM.`);
    return;
  }

  consoleStateMap[id] = {
    isOpen: false,
    hasFocus: false
  };

  el.addEventListener("click", () => {
    consoleStateMap[id].isOpen = true;
    consoleStateMap[id].hasFocus = true;
    dispatchConsoleEvent(id, "panelOpened");
  });

  el.addEventListener("focusin", () => {
    consoleStateMap[id].hasFocus = true;
    dispatchConsoleEvent(id, "panelFocused");
  });

  el.addEventListener("focusout", () => {
    consoleStateMap[id].hasFocus = false;
    dispatchConsoleEvent(id, "panelBlurred");
  });

  console.log(`✅ Bound lifecycle to console: ${id}`);
}

function dispatchConsoleEvent(id, action) {
  const eventName = `console:${id}:${action}`;
  console.log(`📡 Dispatching event: ${eventName}`);
  document.dispatchEvent(new CustomEvent(eventName, { detail: { id, action } }));
}

document.addEventListener("DOMContentLoaded", () => {
  consolePanels.forEach(bindConsoleLifecycle);
  if (window.ResurrectionQueue) {
    ResurrectionQueue.syncFromDOM();
  }
});