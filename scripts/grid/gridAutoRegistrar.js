

// 🧠 Phase 347.2 — Dynamic Panel Registry

import panelGridMatrix from './gridMatrix.js';

const dynamicRegistry = {};

function autoRegisterPanels() {
  const panels = document.querySelectorAll('.holo-console-panel');
  let gridX = 80;
  let gridY = 680;
  const stepX = 300;
  const maxRowWidth = 3;
  let count = 0;

  panels.forEach(panel => {
    const panelId = panel.id;

    if (!panelId || panelGridMatrix[panelId] || dynamicRegistry[panelId]) return;

    // Assign default position based on row logic
    dynamicRegistry[panelId] = { x: gridX, y: gridY };
    console.log(`🆕 [AutoRegistry] Panel ID "${panelId}" assigned to (${gridX}, ${gridY})`);

    gridX += stepX;
    count++;

    if (count % maxRowWidth === 0) {
      gridX = 80;
      gridY += 300;
    }
  });
}

export { dynamicRegistry, autoRegisterPanels };