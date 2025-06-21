// consoleGridValidator.js
// Phase 352.2 — Console Grid Validator Module

export function validateConsoleGridStructure(gridSelector = '.console-grid') {
  const grid = document.querySelector(gridSelector);

  if (!grid) {
    console.warn(`[consoleGridValidator] Grid with selector "${gridSelector}" not found.`);
    return false;
  }

  const gridItems = grid.querySelectorAll('.console-panel');

  if (gridItems.length === 0) {
    console.warn('[consoleGridValidator] No console panels found in the grid.');
    return false;
  }

  let valid = true;
  gridItems.forEach((item, index) => {
    if (!item.id) {
      console.error(`[consoleGridValidator] Missing ID on console panel at index ${index}.`, item);
      valid = false;
    }
    if (!item.classList.contains('panel-ready')) {
      console.warn(`[consoleGridValidator] Console panel "${item.id}" is missing "panel-ready" class.`);
      valid = false;
    }
  });

  if (valid) {
    console.info('[consoleGridValidator] All console panels validated successfully.');
  }

  return valid;
}
