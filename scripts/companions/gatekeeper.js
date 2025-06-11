// === Companion: The Gatekeeper ===
// Role: Access control, system protection, and volatility defense

window.SovereignCompanions = window.SovereignCompanions || {};

window.SovereignCompanions.Gatekeeper = (function () {
  const lockedPanels = new Set();

  function lockPanel(panelId) {
    lockedPanels.add(panelId);
    if (window.MeshMemory) {
      MeshMemory.set("gatekeeper.lastLockedPanel", panelId);
    }
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
    if (window.MeshMemory) {
      MeshMemory.set("gatekeeper.lastUnlockedPanel", panelId);
    }
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

  // CompanionCognitionCore for Gatekeeper
  if (window.CompanionMind) {
    const GatekeeperMind = new CompanionMind("Gatekeeper", {
      onThink(memory) {
        const locked = listLockedPanels();
        if (locked.length > 0) {
          console.log(`🧱 Gatekeeper reconfirms lockdown on: ${locked.join(", ")}`);
        }
        // Future: Scan for suspicious access attempts or auto-lock anomalies
      }
    });
    GatekeeperMind.startThinking();
    if (window.MeshMemory) {
      MeshMemory.listen("gatekeeper.alertLevel", (level) => {
        console.log(`🚨 Gatekeeper alert level changed to: ${level}`);
        // Future: react by locking down panels or escalating messages
      });
    }
  }
  if (window.MeshVitals) {
    window.MeshVitals.register("Gatekeeper", (confirm) => {
      // Gatekeeper responds to heartbeat
      confirm();
    });
  }
})();
