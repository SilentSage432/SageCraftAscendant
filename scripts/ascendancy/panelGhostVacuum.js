// 🧹 Phase 346.3 — Ghost Panel Sweeper & Memory Vacuum
(function ghostPanelVacuum() {
  const orphanedPanels = [];
  const ghostThreshold = 500; // Minimum content length to ignore as ghost

  document.querySelectorAll('.holo-console, .console-panel').forEach(panel => {
    const id = panel.id || '(no-id)';
    const contentSize = panel.innerText.trim().length;

    if (!document.body.contains(panel)) {
      orphanedPanels.push({ id, reason: 'Detached from DOM' });
      panel.remove();
    } else if (contentSize < ghostThreshold) {
      orphanedPanels.push({ id, reason: `Likely ghost (content length ${contentSize})` });
      panel.classList.add('ghosted-panel');
    }
  });

  if (orphanedPanels.length) {
    console.warn(`👻 Ghost Panel Sweep Report — ${orphanedPanels.length} potential ghosts found:`, orphanedPanels);
  } else {
    console.log('🧹 Ghost Panel Vacuum Complete — No issues detected.');
  }
})();
