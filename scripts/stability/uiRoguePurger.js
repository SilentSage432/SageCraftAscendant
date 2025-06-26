console.log("🧼 uiRoguePurger: Reinforced Controlled Panel Purge Activated");

const allowedPanels = [
  "sovereignTerminal",
  "neuralPulsePanel",
  "agentLifecyclePanel",
  "whispererConsole",
  "oracleConsole"
];

function purgeRoguePanels() {
  const allPanels = document.querySelectorAll(".holo-console");

  allPanels.forEach(panel => {
    const id = panel.id;
    if (!allowedPanels.includes(id)) {
      console.warn(`🛑 Purging: ${id}`);
      panel.style.display = "none";
      panel.style.visibility = "hidden";
      panel.style.opacity = "0";
    } else {
      console.log(`✅ Preserved: ${id}`);
    }
  });

  console.log("✅ Reinforced UI Purge Completed.");
}

// Use a slight delay to override any late renderers
requestAnimationFrame(() => {
  setTimeout(purgeRoguePanels, 100);
});