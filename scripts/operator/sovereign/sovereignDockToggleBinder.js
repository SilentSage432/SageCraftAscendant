

// sovereignDockToggleBinder.js — Phase 1500-A Injection

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔧 Sovereign Dock Toggle Binder Initialized");

  const dockToggles = [
    { buttonId: "toggleDiagnosticsBtn", panelId: "diagnosticsPanel" },
    { buttonId: "toggleForecastBtn", panelId: "forecastPanel" },
    { buttonId: "toggleMutationBtn", panelId: "mutationPanel" },
    { buttonId: "toggleMemoryBtn", panelId: "memoryPanel" },
    { buttonId: "toggleRecoveryBtn", panelId: "recoveryPanel" },
    { buttonId: "toggleEventLogBtn", panelId: "eventLogPanel" },
    { buttonId: "toggleControlLatticeBtn", panelId: "controlLatticePanel" },
    { buttonId: "toggleMeshOverlayBtn", panelId: "meshOverlayPanel" },
    { buttonId: "toggleOracleBtn", panelId: "oraclePanel" },
    { buttonId: "toggleMacroBtn", panelId: "macroPanel" },
    { buttonId: "toggleShellBtn", panelId: "operatorShell" },
    { buttonId: "toggleShellExtensionsBtn", panelId: "shellExtensionsPanel" },
    { buttonId: "toggleShellResetBtn", panelId: "shellExtensionResetPanel" },
    { buttonId: "toggleReportingHubBtn", panelId: "reportingHub" },
    { buttonId: "toggleProgressDashboardBtn", panelId: "progressDashboard" },
    { buttonId: "toggleExceptionManagerBtn", panelId: "exceptionManager" },
    { buttonId: "toggleMappingsBtn", panelId: "mappings" },
    { buttonId: "toggleToolsBtn", panelId: "tools" }
  ];

  dockToggles.forEach(({ buttonId, panelId }) => {
    const btn = document.getElementById(buttonId);
    const panel = document.getElementById(panelId);

    if (!btn) {
      console.warn(`⚠ Dock Toggle Button '${buttonId}' not found.`);
      return;
    }
    if (!panel) {
      console.warn(`⚠ Dock Panel '${panelId}' not found.`);
      return;
    }

    btn.addEventListener("click", () => {
      panel.style.display = (panel.style.display === "none") ? "block" : "none";
      console.log(`🟢 Toggled panel '${panelId}'`);
    });
  });

  console.log("✅ Sovereign Dock Toggle Binder fully wired.");
});