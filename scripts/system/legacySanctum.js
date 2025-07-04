// scripts/system/legacySanctum.js

export function archiveLegacyPanels() {
    const legacySelectors = [
      '#predictiveHudContainer',
      '#lowesLinkPanel',
      '#devToolsContainer'
    ];
  
    legacySelectors.forEach(id => {
      const el = document.querySelector(id);
      if (el) {
        el.style.display = 'none';
        el.dataset.sanctumBound = 'true';
        console.log(`🧪 Archived legacy panel: ${id}`);
      }
    });
  }