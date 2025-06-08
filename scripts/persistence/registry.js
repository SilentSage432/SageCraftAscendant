// SageCraft Ascendant — Persistence Registry Engine

SageCraftAscendant.PersistenceRegistry = (function () {

    function saveRegistry(registryData) {
      try {
        const dataString = JSON.stringify(registryData);
        localStorage.setItem("sagecraftRegistry", dataString);
        console.log("💾 Persistence Registry: Registry data saved.");
      } catch (err) {
        console.warn("⚠ Persistence Registry Save Failed:", err);
      }
    }
  
    function loadRegistry() {
      try {
        const dataString = localStorage.getItem("sagecraftRegistry");
        return dataString ? JSON.parse(dataString) : {};
      } catch (err) {
        console.warn("⚠ Persistence Registry Load Failed:", err);
        return {};
      }
    }
  
    return { saveRegistry, loadRegistry };
  
  })();