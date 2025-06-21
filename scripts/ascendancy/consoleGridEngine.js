// 🧩 consoleGridEngine.js
// Purpose: Core logic to support adaptive layout and anchoring of console grid elements.

export function initializeGridEngine() {
  console.log("🧩 Console Grid Engine Activated");

  const gridArea = document.getElementById('consoleGridArea');
  if (!gridArea) {
    console.warn("Grid area not found: #consoleGridArea");
    return;
  }

  const panels = gridArea.querySelectorAll('.holo-console');
  panels.forEach(panel => {
    panel.style.position = 'absolute';
    panel.draggable = true;

    panel.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData("text/plain", panel.id);
    });

    gridArea.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    gridArea.addEventListener('drop', (e) => {
      e.preventDefault();
      const panelId = e.dataTransfer.getData("text/plain");
      const draggedPanel = document.getElementById(panelId);
      if (draggedPanel) {
        draggedPanel.style.left = `${e.offsetX}px`;
        draggedPanel.style.top = `${e.offsetY}px`;
      }
    });
  });
}

/**
 * Synchronizes a panel's DOM element to its current grid position.
 * @param {string} panelId
 */
export function syncPanelToGrid(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) {
    console.warn(`[syncPanelToGrid] Panel not found: ${panelId}`);
    return;
  }
  // Ensure grid area is defined
  const gridArea = document.getElementById('consoleGridArea');
  if (!gridArea) {
    console.warn("[syncPanelToGrid] Grid area not found: #consoleGridArea");
    return;
  }
  // Position panel at its current offset within the grid
  panel.style.position = 'absolute';
  panel.style.left = `${panel.offsetLeft}px`;
  panel.style.top = `${panel.offsetTop}px`;
  console.log(`[syncPanelToGrid] Synchronized panel ${panelId} at (${panel.offsetLeft}, ${panel.offsetTop})`);
}
