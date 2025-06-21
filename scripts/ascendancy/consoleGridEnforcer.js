// consoleGridEnforcer.js
// Phase 352.3 — Console Grid Enforcement Injector

export function enforceConsoleGrid() {
  const gridPanels = document.querySelectorAll('.console-panel[data-grid-x][data-grid-y]');

  gridPanels.forEach(panel => {
    const gridX = parseInt(panel.getAttribute('data-grid-x'), 10);
    const gridY = parseInt(panel.getAttribute('data-grid-y'), 10);

    if (!isNaN(gridX) && !isNaN(gridY)) {
      panel.style.position = 'absolute';
      panel.style.left = `${gridX * 300}px`;  // assuming 300px width slots
      panel.style.top = `${gridY * 250}px`;   // assuming 250px height slots
      panel.classList.add('grid-enforced');
    } else {
      console.warn(`Grid coordinates missing or invalid for panel:`, panel);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  enforceConsoleGrid();
});
