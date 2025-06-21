// 🧠 Phase 346.4 — Neural Console Harmony Sync

document.addEventListener("DOMContentLoaded", () => {
  if (!window.SovereignConsoleRegistry || !Array.isArray(window.SovereignConsoleRegistry)) {
    console.warn("⚠️ SovereignConsoleRegistry is not defined or invalid.");
    return;
  }

  const registeredIds = new Set(window.SovereignConsoleRegistry);
  const allPanels = document.querySelectorAll(".holo-console");

  allPanels.forEach(panel => {
    const panelId = panel.getAttribute("id");

    if (registeredIds.has(panelId)) {
      panel.classList.add("synced-panel");
      panel.setAttribute("data-sync-status", "synced");
    } else {
      console.warn(`🌀 Unsynced Panel Detected: ${panelId}`);
      panel.classList.add("unsynced-panel");
      panel.setAttribute("data-sync-status", "unsynced");

      // Additional ghost panel detection
      if (panelId?.includes("duplicate") || panel.classList.contains("ghost-panel")) {
        console.warn(`👻 Ghost Panel Flagged: ${panelId}`);
        panel.classList.add("ghost-panel");
        panel.setAttribute("data-sync-status", "ghost");
      }
    }
  });

  console.log(`✅ Harmony Sync complete: ${document.querySelectorAll(".synced-panel").length} panels synchronized.`);

  // 🧬 Phase 346.7 — Console Resurrection Registry Checkpoint
  const ghostPanels = document.querySelectorAll('.holo-console.ghost-panel');

  ghostPanels.forEach(panel => {
    const panelId = panel.getAttribute("id");
    console.info(`🔁 Preparing ghost panel for resurrection: ${panelId}`);

    // Optional: Tag ghost panels with a resurrection marker
    panel.setAttribute("data-resurrect-ready", "true");

    // You could append logic here to queue resurrection steps
  });

  console.log(`🧬 Resurrection Registry Pass: ${ghostPanels.length} ghost panels flagged for resurrection.`);
});
