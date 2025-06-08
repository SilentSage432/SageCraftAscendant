// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.2
// Subsystem: Neural Navigation Core

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.NeuralNavigationCore = (function () {
  function activatePanel(panelId) {
    const panels = document.querySelectorAll(".tab-section");
    panels.forEach(panel => panel.classList.remove("active-panel"));

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add("active-panel");
    }
  }

  return {
    activatePanel
  };
})();