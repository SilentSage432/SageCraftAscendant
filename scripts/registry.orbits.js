// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.1
// Subsystem: Orbit Registry

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.OrbitRegistry = (function() {
  const orbits = {};

  function registerOrbit(name, description, modules = [], icon = "icon-default.png") {
    if (orbits[name]) {
      console.warn(`⚠ Orbit '${name}' is already registered.`);
      return;
    }
    orbits[name] = {
      panelId: name,  // automatically match panelId to name for consistency
      label: description,
      modules,
      icon,
      registeredAt: new Date().toISOString()
    };
    console.log(`🪐 Orbit Registered: ${name}`);
  }

  // Register Lore Engine Orbit
  registerOrbit(
    "loreEngineConsole",
    "Lore Engine",
    [],
    "assets/icons/icon-lorebook.png"
  );

  // Register Forecast Console Orbit
  registerOrbit(
    "forecastConsole",
    "Forecast Console",
    [],
    "assets/icons/icon-forecast.png"
  );

  // Register Whisperer Console Orbit
  registerOrbit(
    "whispererConsole",
    "Whisperer Console",
    [],
    "assets/icons/icon-whisperer.png"
  );

  function listOrbits() {
    console.table(orbits);
    return orbits;
  }

  function getOrbit(name) {
    return orbits[name] || null;
  }

  function clearOrbits() {
    for (let key in orbits) {
      delete orbits[key];
    }
    console.log("🧹 Orbit Registry Cleared.");
  }

  return {
    registerOrbit,
    listOrbits,
    getOrbit,
    clearOrbits
  };
})();