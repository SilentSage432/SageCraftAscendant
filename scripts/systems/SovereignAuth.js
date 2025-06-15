// 🛡️ SovereignAuth.js — Tier-Based Access Control System

const SovereignAuth = (() => {
  const operatorTiers = {
    ROOT: 'Sovereign Operator',
    ALPHA: 'Core Engineer',
    BETA: 'Technician',
    GAMMA: 'Observer',
  };

  let currentTier = null;

  const updateTierDisplay = () => {
    const tierStatusEl = document.getElementById('sovereignTierStatus');
    if (tierStatusEl) {
      tierStatusEl.innerHTML = currentTier ? `🛡️ ${currentTier}` : '🔒 Not Authenticated';
    }
  };

  const login = (passcode) => {
    switch (passcode) {
      case 'sovereign-override':
        currentTier = operatorTiers.ROOT;
        break;
      case 'alpha-protocol':
        currentTier = operatorTiers.ALPHA;
        break;
      case 'beta-access':
        currentTier = operatorTiers.BETA;
        break;
      case 'gamma-view':
        currentTier = operatorTiers.GAMMA;
        break;
      default:
        currentTier = null;
        return false;
    }
    console.log(`🛡️ Access granted: ${currentTier}`);
    document.dispatchEvent(new CustomEvent('sovereignAuthGranted', {
      detail: { tier: currentTier }
    }));
    const tierStatusEl = document.getElementById('sovereignTierStatus');
    if (tierStatusEl) {
      tierStatusEl.innerHTML = `🛡️ ${currentTier}`;
      tierStatusEl.classList.add('authenticated');
    }
    return true;
  };

  const getTier = () => currentTier;
  const hasAccess = (requiredTier) => currentTier === requiredTier;

  updateTierDisplay();

  const toggleLoginPanel = () => {
    const wrapper = document.getElementById("sovereignLoginWrapper");
    if (wrapper) {
      const isVisible = wrapper.style.display === "block";
      wrapper.style.display = isVisible ? "none" : "block";
    }
  };

  return {
    login,
    getTier,
    hasAccess,
    TIERS: operatorTiers,
    toggleLoginPanel
  };
})();

window.SovereignAuth = SovereignAuth;
window.toggleLoginPanel = SovereignAuth.toggleLoginPanel;

// Optional: Export for ES module environments
// export default SovereignAuth;
