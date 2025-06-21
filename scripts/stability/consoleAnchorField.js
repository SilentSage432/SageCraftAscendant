// 🧲 consoleAnchorField.js
// Ensures that console panels are magnetically anchored to stable grid positions.

export function stabilizeAnchorField(panelElement, anchorPoint) {
  if (!panelElement || !anchorPoint) return;

  panelElement.style.position = 'absolute';
  panelElement.style.left = `${anchorPoint.x}px`;
  panelElement.style.top = `${anchorPoint.y}px`;
  panelElement.dataset.anchored = 'true';
}

export function isPanelAnchored(panelElement) {
  return panelElement?.dataset?.anchored === 'true';
}

export function releaseAnchor(panelElement) {
  if (!panelElement) return;

  panelElement.removeAttribute('data-anchored');
  panelElement.style.left = '';
  panelElement.style.top = '';
}
