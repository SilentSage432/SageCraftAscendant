// SageCraft Ascendant — Orbit Registry Editor Scaffold

SageCraftAscendant.OrbitRegistryEditor = {
    list() {
      console.log("🧮 Orbit Registry Editor Listing:", SageCraftAscendant.OrbitRegistry.listOrbits());
    },
  
    wipe() {
      SageCraftAscendant.OrbitRegistry.clearRegistry();
      console.log("🧹 Orbit Registry fully wiped via Editor.");
    }
  };