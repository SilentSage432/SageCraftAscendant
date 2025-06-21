

// consoleGridLayoutResolver.js
// 🧭 Phase 352.3 — Console Grid Layout Resolver
// Responsible for resolving spatial alignment and layout rules of console grid elements.

export function resolveConsoleGridLayout() {
  const consolePanels = document.querySelectorAll('.console-panel');
  const gridContainer = document.querySelector('#consoleGrid');

  if (!gridContainer || consolePanels.length === 0) {
    console.warn('[GridResolver] Missing grid container or console panels.');
    return;
  }

  consolePanels.forEach((panel, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    panel.style.gridRowStart = row + 1;
    panel.style.gridColumnStart = col + 1;
    panel.dataset.gridPosition = `row-${row + 1}-col-${col + 1}`;
  });

  console.info('[GridResolver] Console grid layout resolved.');
}