// Phase 10.0 — Dynamic Orbital Dock Renderer

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.DynamicOrbitalDock = (function() {

  function renderDynamicDock() {
    const dockContainer = document.getElementById("orbitalDockContainer");
    if (!dockContainer) {
      console.error("Dock container not found.");
      return;
    }

    // Clear dock first
    dockContainer.innerHTML = "";

    const orbits = window.NeuralOrbitRegistry?.listOrbits?.() || {};
    Object.values(orbits).forEach(orbit => {
      const button = document.createElement("button");
      button.textContent = orbit.label;
      button.title = orbit.panelId;
      button.classList.add("orbital-button");
      button.addEventListener("click", () => {
        switchControlPanel(orbit.panelId);
      });

      dockContainer.appendChild(button);
    });

    console.log("✅ Dynamic Orbital Dock Rendered.");
  }

  return {
    renderDynamicDock
  };

})();