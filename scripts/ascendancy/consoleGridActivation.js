// scripts/ascendancy/consoleGridActivation.js

export function activateConsoleGrid() {
  const consoleGridElements = document.querySelectorAll('.console-grid');

  if (!consoleGridElements.length) {
    console.warn('[ConsoleGridActivation] No console-grid elements found.');
    return;
  }

  consoleGridElements.forEach(grid => {
    grid.classList.add('activated-grid');
    grid.dataset.active = 'true';
  });

  console.log('[ConsoleGridActivation] Console grids activated successfully.');
}

document.addEventListener('DOMContentLoaded', () => {
  activateConsoleGrid();
});
