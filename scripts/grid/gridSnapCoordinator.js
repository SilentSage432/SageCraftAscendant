// 🧲 gridSnapCoordinator.js — Coordinates snapping logic across panels

import { getAllGridNodes, refreshNodeSignal } from '../ascendancy/consoleGridBinder.js';
import { getActiveConsoles } from '../ascendancy/consoleAtlas.js';

export function coordinateSnapEvents() {
  console.log('🧲 gridSnapCoordinator.js engaged');

  const nodes = getAllGridNodes();
  const consoles = getActiveConsoles();

  consoles.forEach(consolePanel => {
    const closestNode = findClosestNode(consolePanel, nodes);
    if (closestNode) {
      snapToNode(consolePanel, closestNode);
      refreshNodeSignal(closestNode.id);
    }
  });
}

function findClosestNode(panel, nodes) {
  let closest = null;
  let minDistance = Infinity;

  nodes.forEach(node => {
    const dx = panel.x - node.x;
    const dy = panel.y - node.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      closest = node;
    }
  });

  return closest;
}

function snapToNode(panel, node) {
  panel.x = node.x;
  panel.y = node.y;
  panel.style.left = `${node.x}px`;
  panel.style.top = `${node.y}px`;
  panel.dataset.snapped = 'true';
}
