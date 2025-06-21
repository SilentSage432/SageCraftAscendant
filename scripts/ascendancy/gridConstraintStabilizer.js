

// 🧩 Grid Constraint Stabilizer
// Ensures all grid-bound panels respect their assigned constraints

export function stabilizeGridConstraints() {
  const panels = document.querySelectorAll('.console-panel[data-grid-x][data-grid-y]');
  panels.forEach(panel => {
    const gridX = parseInt(panel.getAttribute('data-grid-x'), 10);
    const gridY = parseInt(panel.getAttribute('data-grid-y'), 10);

    if (!isNaN(gridX) && !isNaN(gridY)) {
      panel.style.gridColumnStart = gridX;
      panel.style.gridRowStart = gridY;
      panel.style.position = 'relative';
    } else {
      console.warn(`Panel ${panel.id || 'unnamed'} is missing valid grid data attributes.`);
    }
  });
}