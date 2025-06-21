// gridMagnetMatrix.js
// Phase 353.6 — Grid Magnet Lock Matrix

export function engageMagnetMatrix(consolePanels = []) {
  consolePanels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    const grid = document.querySelector('.console-grid');

    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    const gridX = Math.round((rect.left - gridRect.left) / gridRect.width * 100);
    const gridY = Math.round((rect.top - gridRect.top) / gridRect.height * 100);

    panel.style.position = 'absolute';
    panel.style.left = `${gridX}%`;
    panel.style.top = `${gridY}%`;
    panel.setAttribute('data-magnetized', 'true');
  });
}

export function isMagnetized(panel) {
  return panel.getAttribute('data-magnetized') === 'true';
}

export function releaseFromMagnet(panel) {
  panel.removeAttribute('data-magnetized');
  panel.style.left = '';
  panel.style.top = '';
}
