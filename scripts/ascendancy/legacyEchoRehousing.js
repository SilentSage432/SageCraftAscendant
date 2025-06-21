// Phase 349.0 — Legacy Echo Rehousing Protocol
// Purpose: Rebind and correctly relocate legacy echo panel elements into their appropriate homes within the current DOM structure.

const LegacyEchoRehousing = (() => {
  function rehouseEchoPanels() {
    const orphanedPanels = document.querySelectorAll('[id^="echoArchivePanel-duplicate"]');
    const whispererConsole = document.getElementById('whispererConsole');

    if (!whispererConsole) {
      console.warn("Whisperer Console not found. Aborting echo rehousing.");
      return;
    }

    orphanedPanels.forEach(panel => {
      if (!whispererConsole.contains(panel)) {
        whispererConsole.appendChild(panel);
        panel.classList.add("rehoused-echo");
        console.log(`✅ Rehoused legacy echo panel: ${panel.id}`);
      }
    });
  }

  function init() {
    document.addEventListener("DOMContentLoaded", rehouseEchoPanels);
  }

  return {
    init
  };
})();

LegacyEchoRehousing.init();
