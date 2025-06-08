// SageCraft Ascendant — Orbit Registry Core

SageCraftAscendant.OrbitRegistry = (function () {
    const orbits = {};
  
    function registerOrbit(panelId, label, modules = [], icon = "icon-default.png") {
      orbits[panelId] = { panelId, label, modules, icon };
      console.log(`🪐 Orbit registered: ${label} (${panelId})`);
    }
  
    function removeOrbit(panelId) {
      delete orbits[panelId];
      console.log(`🗑 Orbit removed: ${panelId}`);
    }
  
    function listOrbits() {
      return { ...orbits };
    }
  
    function clearRegistry() {
      for (let key in orbits) {
        delete orbits[key];
      }
      console.log("🧹 Orbit registry cleared.");
    }
  
    return { registerOrbit, removeOrbit, listOrbits, clearRegistry };
  })();