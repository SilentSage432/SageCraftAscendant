// 🧭 Phase 343.0 — Dock Panel Assignment and Home Binding

document.addEventListener("DOMContentLoaded", () => {
  const dockingMap = {
    "#countConsole": "#consolePanelGroup",
    "#deltaAnalyzerConsole": "#consolePanelGroup",
    "#reportingHubConsole": "#consolePanelGroup",
    "#sessionManagerConsole": "#consolePanelGroup",
    "#utilityHubConsole": "#consolePanelGroup",
    "#oracleConsole": "#consolePanelGroup",
    "#sageFeedConsole": "#consolePanelGroup",
    "#grimoireConsole": "#consolePanelGroup",
    "#whispererConsole": "#consolePanelGroup",
    "#exceptionManagerConsole": "#consolePanelGroup",
    "#masterExportHubConsole": "#consolePanelGroup",
    "#progressDashboardConsole": "#consolePanelGroup",
    "#mappingsConsole": "#consolePanelGroup",
    "#toolsConsole": "#consolePanelGroup",
    "#auditConsole": "#consolePanelGroup"
  };

  Object.entries(dockingMap).forEach(([panelSelector, targetSelector]) => {
    const panel = document.querySelector(panelSelector);
    const target = document.querySelector(targetSelector);

    if (panel && target && !target.contains(panel)) {
      target.appendChild(panel);
      console.log(`✅ Docked ${panelSelector} into ${targetSelector}`);
    }
  });

  console.log("🧭 Phase 343.0 — Dock Panel Assignment Complete");
});
