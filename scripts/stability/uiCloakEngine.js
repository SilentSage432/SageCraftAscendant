  const allowedPanels = [
    "neuralPulsePanel",
    "sovereignTerminal",
    "whispererConsole"
  ];

  function nukeUnwantedPanels() {
    document.querySelectorAll('.holo-console').forEach(panel => {
      if (!allowedPanels.includes(panel.id)) {
        panel.remove(); // Scorched earth
        console.log(`🔥 Purged: ${panel.id}`);
      }
    });
  }

  // Initial sweep
  window.addEventListener("DOMContentLoaded", () => {
    nukeUnwantedPanels();

    // Persistent guard
    const observer = new MutationObserver(nukeUnwantedPanels);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log("🧨 Mutation Observer activated — rogue panels will be purged on sight.");
  });
