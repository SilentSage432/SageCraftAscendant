// consoleGridMagnetizer.js
// Phase 353.4 — Magnetic Anchor Lock System

import { getConsolePanels } from '../ascendancy/consoleAtlas.js';
import { getGridBounds, realignPanelsToGrid } from '../ascendancy/consoleGridBinder.js';

/**
 * Calculates the nearest grid cell based on position
 */
function getNearestGridPosition(panel, gridBounds) {
  const { left, top, width, height } = gridBounds;
  const panelRect = panel.getBoundingClientRect();

  const colCount = 6;
  const rowCount = 4;

  const cellWidth = width / colCount;
  const cellHeight = height / rowCount;

  const relativeLeft = panelRect.left - left;
  const relativeTop = panelRect.top - top;

  const col = Math.round(relativeLeft / cellWidth);
  const row = Math.round(relativeTop / cellHeight);

  return {
    x: Math.max(0, Math.min(col, colCount - 1)),
    y: Math.max(0, Math.min(row, rowCount - 1)),
  };
}

/**
 * Snaps a panel to the nearest grid cell
 */
function snapToGrid(panel, gridBounds) {
  const gridPos = getNearestGridPosition(panel, gridBounds);

  const cellWidth = gridBounds.width / 6;
  const cellHeight = gridBounds.height / 4;

  // Add smooth transition for snapping (handled by CSS style in activateMagneticSnap)
  panel.style.left = `${gridBounds.left + gridPos.x * cellWidth}px`;
  panel.style.top = `${gridBounds.top + gridPos.y * cellHeight}px`;
}

function hasMovedSignificantly(panel, previousPos, threshold = 10) {
  const dx = Math.abs(panel.offsetLeft - previousPos.x);
  const dy = Math.abs(panel.offsetTop - previousPos.y);
  return dx > threshold || dy > threshold;
}

/**
 * Main magnetic snap activation
 */
export function activateMagneticSnap() {
  const panels = getConsolePanels();
  const gridBounds = getGridBounds();

  panels.forEach(panel => {
    panel.style.transition = 'top 0.2s ease, left 0.2s ease';
    let lastPosition = { x: panel.offsetLeft, y: panel.offsetTop };

    panel.addEventListener('mouseup', () => {
      if (hasMovedSignificantly(panel, lastPosition)) {
        snapToGrid(panel, gridBounds);
        lastPosition = { x: panel.offsetLeft, y: panel.offsetTop };
      }
    });
  });
}


// Activate snap on load
window.addEventListener('DOMContentLoaded', activateMagneticSnap);

export { realignPanelsToGrid };