

// === Phase 334.6 — Sovereign Console Button Hook Audit ===
console.log("🎯 Phase 334.6 — Button Hook Audit Initialized");

const sovereignButtonMap = {
  countBtn: "countConsole",
  deltaBtn: "deltaAnalyzerConsole",
  reportBtn: "reportingHubConsole",
  sessionBtn: "sessionManagerConsole",
  utilityBtn: "utilityHubConsole",
  oracleBtn: "oracleConsole",
  whispererBtn: "whispererConsole",
  sageFeedBtn: "sageFeedConsole",
  grimoireBtn: "grimoireConsole",
  auditBtn: "auditConsole"
};

Object.entries(sovereignButtonMap).forEach(([btnId, panelId]) => {
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);

  if (!btn) {
    console.warn(`⚠️ Button not found: ${btnId}`);
    return;
  }

  if (!panel) {
    console.warn(`⚠️ Panel not found: ${panelId}`);
    return;
  }

  btn.addEventListener("click", () => {
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
    console.log(`🔄 Toggled ${panelId} via ${btnId}`);
  });
});