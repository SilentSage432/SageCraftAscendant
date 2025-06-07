// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.2
// Subsystem: Dock Mesh

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.MeshDock = (function() {

  function renderDock() {
    const orbitalDock = document.getElementById("orbitalDockContainer");
    if (!orbitalDock) {
      console.warn("⚠ Orbital Dock Container not found.");
      return;
    }

    orbitalDock.innerHTML = '';

    const orbits = SageCraftAscendant.OrbitRegistry.listOrbits();
    Object.keys(orbits).forEach(orbitKey => {
      const orbit = orbits[orbitKey];
      const button = document.createElement("button");
      button.classList.add("orbital-btn");
      button.setAttribute("data-target", `#${orbit.panelId}`);
      button.setAttribute("aria-label", orbit.label);

      const img = document.createElement("img");
      img.src = `assets/icons/${orbit.icon}`;
      img.alt = orbit.label;
      button.appendChild(img);

      button.addEventListener("click", () => {
        console.log(`🛰 Orbit Activated: ${orbit.panelId}`);
        // 🔧 Hook in your Panel Activation Logic (if any)
      });

      orbitalDock.appendChild(button);
    });

    console.log("✅ Orbital Dock fully rendered.");
  }

  return {
    renderDock
  };
})();