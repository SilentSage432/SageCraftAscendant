document.addEventListener("DOMContentLoaded", () => {
  const visiblePanels = new Set([
    'countConsole',
    'deltaAnalyzerConsole',
    'reportingHubConsole'
  ]);

  document.querySelectorAll('.holo-console').forEach(panel => {
    if (visiblePanels.has(panel.id)) {
      panel.style.setProperty("display", "grid", "important");
      panel.style.visibility = "visible";
    } else {
      panel.style.setProperty("display", "none", "important");
      panel.style.visibility = "hidden";
      console.warn(`🚫 Hiding non-whitelisted panel: ${panel.id}`);
    }
  });

  console.log("✅ Panel visibility reconciliation complete with enforcement.");
});