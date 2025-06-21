

// 🧲 consoleAnchorMatrix.js
// Governs magnetic locking of consoles to grid sectors/quadrants.

export function lockConsoleToQuadrant(consoleElement) {
  const grid = document.querySelector('#sovereignOrbitDock');
  if (!grid || !consoleElement) return;

  const gridRect = grid.getBoundingClientRect();
  const consoleRect = consoleElement.getBoundingClientRect();

  const centerX = consoleRect.left + consoleRect.width / 2;
  const centerY = consoleRect.top + consoleRect.height / 2;

  const horizontal = centerX < gridRect.left + gridRect.width / 2 ? 'left' : 'right';
  const vertical = centerY < gridRect.top + gridRect.height / 2 ? 'top' : 'bottom';

  const quadrant = `${vertical}-${horizontal}`;

  // Apply quadrant as data attribute or class for styling/logic
  consoleElement.setAttribute('data-quadrant', quadrant);

  // Optionally: snap to quadrant edge
  switch (quadrant) {
    case 'top-left':
      consoleElement.style.left = '5%';
      consoleElement.style.top = '5%';
      break;
    case 'top-right':
      consoleElement.style.right = '5%';
      consoleElement.style.top = '5%';
      break;
    case 'bottom-left':
      consoleElement.style.left = '5%';
      consoleElement.style.bottom = '5%';
      break;
    case 'bottom-right':
      consoleElement.style.right = '5%';
      consoleElement.style.bottom = '5%';
      break;
  }
}