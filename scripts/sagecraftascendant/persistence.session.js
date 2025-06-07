// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v1.4
// Subsystem: Persistence Session

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.PersistenceSession = (function() {

  const SESSION_KEY = "SageCraftAscendant_LastActivePanel";

  function saveActivePanel(panelId) {
    try {
      localStorage.setItem(SESSION_KEY, panelId);
      console.log(`💾 Active panel saved: ${panelId}`);
    } catch (err) {
      console.error("❌ Failed to save session:", err);
    }
  }

  function loadActivePanel() {
    try {
      return localStorage.getItem(SESSION_KEY) || null;
    } catch (err) {
      console.error("❌ Failed to load session:", err);
      return null;
    }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    console.log("🧹 Session cleared.");
  }

  return {
    saveActivePanel,
    loadActivePanel,
    clearSession
  };
})();