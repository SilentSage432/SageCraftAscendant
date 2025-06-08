// SageCraft Ascendant — Session Persistence Engine

SageCraftAscendant.PersistenceSession = (function () {

    function saveSessionState(stateObject) {
      try {
        const stateString = JSON.stringify(stateObject);
        localStorage.setItem("sagecraftSession", stateString);
        console.log("💾 Persistence Session: Session state saved.");
      } catch (err) {
        console.warn("⚠ Persistence Session Save Failed:", err);
      }
    }
  
    function loadSessionState() {
      try {
        const stateString = localStorage.getItem("sagecraftSession");
        return stateString ? JSON.parse(stateString) : null;
      } catch (err) {
        console.warn("⚠ Persistence Session Load Failed:", err);
        return null;
      }
    }
  
    function clearSession() {
      try {
        localStorage.removeItem("sagecraftSession");
        console.log("🧹 Persistence Session: Cleared.");
      } catch (err) {
        console.warn("⚠ Persistence Session Clear Failed:", err);
      }
    }
  
    return { saveSessionState, loadSessionState, clearSession };
  
  })();