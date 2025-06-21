// panelGridAnchor.js
import { getAllConsolePanels } from '../ascendancy/consoleAtlas.js';

export function anchorPanelsToGrid() {
  const panels = getAllConsolePanels();

  panels.forEach(panel => {
    if (!(panel instanceof HTMLElement)) return;
    const id = panel.getAttribute('id');
    const savedPosition = localStorage.getItem(`panel-grid-position-${id}`);

    if (savedPosition) {
      try {
        const { top, left } = JSON.parse(savedPosition);
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
        panel.setAttribute('data-anchored', 'true');
      } catch (e) {
        console.warn(`Invalid position data for panel ${id}:`, e);
      }
    }
  });
}

export function storePanelPosition(id, top, left) {
  const position = { top, left };
  localStorage.setItem(`panel-grid-position-${id}`, JSON.stringify(position));
}

export function finalizeGridAlignment() {
  const panels = getAllConsolePanels();

  panels.forEach(panel => {
    if (!(panel instanceof HTMLElement)) return;
    const id = panel.getAttribute('id');
    const rect = panel.getBoundingClientRect();
    const snappedTop = Math.round(rect.top / 10) * 10;
    const snappedLeft = Math.round(rect.left / 10) * 10;

    panel.style.top = `${snappedTop}px`;
    panel.style.left = `${snappedLeft}px`;
    panel.setAttribute('data-snapped-final', 'true');
    storePanelPosition(id, snappedTop, snappedLeft);
  });
}

// Optional: Automatically anchor on load
document.addEventListener('DOMContentLoaded', anchorPanelsToGrid);