

import { logSnapEvent } from './snapEventLog.js';

// 🧲 Phase 348 — Snap Magnetizer Enhancements

import panelGridMatrix from '../grid/gridMatrix.js';
import { dynamicRegistry } from '../grid/gridAutoRegistrar.js';

const MAGNET_THRESHOLD = 20;

function getSnapTargetFor(panel) {
  const panelId = panel.id;
  const target = panelGridMatrix[panelId] || dynamicRegistry[panelId];

  if (!target) return null;

  const currentX = parseInt(panel.style.left || 0);
  const currentY = parseInt(panel.style.top || 0);
  const dx = Math.abs(currentX - target.x);
  const dy = Math.abs(currentY - target.y);

  if (dx <= MAGNET_THRESHOLD && dy <= MAGNET_THRESHOLD) {
    return target;
  }

  return null;
}

function magnetizePanel(panel) {
  const snapTarget = getSnapTargetFor(panel);

  if (snapTarget) {
    panel.style.left = `${snapTarget.x}px`;
    panel.style.top = `${snapTarget.y}px`;

    console.log(`🧲 [Magnetizer] Snapped "${panel.id}" to (${snapTarget.x}, ${snapTarget.y})`);
    logSnapEvent(panel, 'magnet');
  }
}

export { magnetizePanel, getSnapTargetFor };