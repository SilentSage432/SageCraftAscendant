// === Phase 341.2 — Console Panel Memory Restoration Layer ===
console.log("🧠 Phase 341.2 — Console Panel Memory Restoration Layer Engaged");

document.addEventListener("DOMContentLoaded", () => {
  const lastViewedPanelId = localStorage.getItem("lastViewedConsolePanel");

  if (lastViewedPanelId) {
    const panel = document.getElementById(lastViewedPanelId);
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth" });
      panel.classList.add("highlighted-restore");
      console.log(`🔄 Restored last viewed panel: ${lastViewedPanelId}`);
    } else {
      console.warn(`⚠️ Panel not found for restoration: ${lastViewedPanelId}`);
    }
  }

  const panels = document.querySelectorAll("#consolePanelGroup > div, #consolePanelGroup > section");
  panels.forEach(panel => {
    panel.addEventListener("click", () => {
      localStorage.setItem("lastViewedConsolePanel", panel.id);
      console.log(`💾 Saved last viewed panel: ${panel.id}`);
    });
  });
});

export const knownConsoleIds = [
  "countConsole",
  "deltaAnalyzerConsole",
  "reportingHubConsole",
  "sessionManagerConsole",
  "utilityHubConsole",
  "oracleConsole",
  "whispererConsole",
  "sageFeedConsole",
  "grimoireConsole",
  "exceptionManagerConsole",
  "progressDashboardConsole",
  "masterExportHubConsole",
  "mappingsConsole",
  "toolsConsole",
  "auditConsole"
];

export function getTerminalPanels() {
  return Array.from(document.querySelectorAll("#consolePanelGroup > div, #consolePanelGroup > section"));
}