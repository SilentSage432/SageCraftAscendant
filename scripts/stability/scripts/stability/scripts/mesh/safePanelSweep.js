// 🧹 safePanelSweep.js
// Ensures only coreCommandInput and neuralPulsePanel are visible on load

document.addEventListener("DOMContentLoaded", () => {
  const allowedPanels = [
    "coreCommandInput",       // Central terminal
    "neuralPulsePanel"        // Neural health monitor
  ];

  document.querySelectorAll('.holo-console').forEach(panel => {
    const id = panel.id;
    if (!id) return;

    if (!allowedPanels.includes(id)) {
      panel.style.display = "none";
      panel.style.visibility = "hidden";
      panel.style.opacity = "0";
    } else {
      panel.style.display = "grid";
      panel.style.visibility = "visible";
      panel.style.opacity = "1";
    }
  });

  console.log("🧹 safePanelSweep.js: Only core terminal and neural panel are visible.");
});
