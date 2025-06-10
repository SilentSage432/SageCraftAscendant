// === Companion: The Gatekeeper ===
// Role: Access control, system protection, and volatility defense

window.SovereignCompanions = window.SovereignCompanions || {};

window.SovereignCompanions.Gatekeeper = (function () {
  const lockedPanels = new Set();

  function lockPanel(panelId) {
    lockedPanels.add(panelId);
    const el = document.getElementById(panelId);
    if (el) {
      el.classList.add("locked-panel");
      el.style.pointerEvents = "none";
      el.style.opacity = "0.5";
      console.log(`🔒 Gatekeeper has locked panel: ${panelId}`);
    }
  }

  function unlockPanel(panelId) {
    lockedPanels.delete(panelId);
    const el = document.getElementById(panelId);
    if (el) {
      el.classList.remove("locked-panel");
      el.style.pointerEvents = "auto";
      el.style.opacity = "1";
      console.log(`🔓 Gatekeeper has unlocked panel: ${panelId}`);
    }
  }

  function validateAccess(panelId, role = "default") {
    if (lockedPanels.has(panelId)) {
      console.warn(`🛑 Access denied to ${panelId} (locked by Gatekeeper).`);
      return false;
    }
    console.log(`✅ Access granted to ${panelId}`);
    return true;
  }

  function listLockedPanels() {
    return Array.from(lockedPanels);
  }

  return {
    lockPanel,
    unlockPanel,
    validateAccess,
    listLockedPanels
  };
})();
