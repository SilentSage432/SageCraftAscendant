// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.8
// Subsystem: Mesh Integrity Sentinel

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.MeshIntegrity = (function() {

  function runIntegrityScan() {
    console.log("🩺 Running SageCraft Mesh Integrity Scan...");

    const orbits = SageCraftAscendant.OrbitRegistry.listOrbits();
    if (!orbits) {
      console.error("❌ OrbitRegistry unavailable.");
      return;
    }

    let total = Object.keys(orbits).length;
    let validCount = 0;

    Object.keys(orbits).forEach(orbitKey => {
      const orbit = orbits[orbitKey];
      const panel = document.querySelector(`#${orbit.panelId}`);

      if (!panel) {
        console.warn(`⚠ Orbit '${orbit.label}' → Panel '${orbit.panelId}' not found in DOM.`);
      } else {
        validCount++;
      }
    });

    console.log(`✅ Integrity Scan Complete — ${validCount}/${total} orbits successfully mapped to DOM panels.`);
  }

  return {
    runIntegrityScan
  };
})();