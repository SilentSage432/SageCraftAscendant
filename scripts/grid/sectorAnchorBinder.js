

// 🧲 sectorAnchorBinder.js — Anchors panels to their designated sectors

export function bindSectorAnchors(panelId, sectorId) {
  const panel = document.getElementById(panelId);
  const sector = document.getElementById(sectorId);

  if (!panel || !sector) {
    console.warn(`SectorAnchorBinder: Missing panel or sector [${panelId}, ${sectorId}]`);
    return;
  }

  const sectorRect = sector.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();

  const offsetX = sectorRect.left - panelRect.left;
  const offsetY = sectorRect.top - panelRect.top;

  panel.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  panel.dataset.anchored = 'true';

  console.log(`✅ Panel "${panelId}" anchored to sector "${sectorId}"`);
}