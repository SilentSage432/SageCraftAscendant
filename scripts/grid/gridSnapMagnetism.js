// gridSnapMagnetism.js
// 🔒 Magnetic Snap Reinforcement Module
// Ensures panels magnetically snap to grid anchors with resistance/attraction logic.

export function engageMagneticSnap(panelElement, gridMatrix) {
  if (!panelElement || !gridMatrix || !Array.isArray(gridMatrix)) return;

  const panelRect = panelElement.getBoundingClientRect();
  const snapThreshold = 30; // pixels

  let closestAnchor = null;
  let minDistance = Infinity;

  gridMatrix.forEach(anchor => {
    const dx = anchor.x - panelRect.left;
    const dy = anchor.y - panelRect.top;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance && distance <= snapThreshold) {
      minDistance = distance;
      closestAnchor = anchor;
    }
  });

  if (closestAnchor) {
    panelElement.style.left = `${closestAnchor.x}px`;
    panelElement.style.top = `${closestAnchor.y}px`;
    panelElement.setAttribute('data-snapped', 'true');
  } else {
    panelElement.setAttribute('data-snapped', 'false');
  }
}
