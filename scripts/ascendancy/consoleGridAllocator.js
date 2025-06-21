

// scripts/ascendancy/consoleGridAllocator.js
// Phase 352.0 — Sovereign Console Grid Allocation Matrix

export function allocateConsoleToGrid(consoleElement, gridRegionId) {
  const gridRegion = document.getElementById(gridRegionId);
  if (!gridRegion) {
    console.warn(`Grid region "${gridRegionId}" not found.`);
    return;
  }

  // Apply consistent styling and append
  consoleElement.classList.add('grid-bound-console');
  gridRegion.appendChild(consoleElement);
}

export function initializeConsoleGridBindings() {
  const bindings = [
    { consoleId: 'countConsole', gridId: 'gridRegion1' },
    { consoleId: 'deltaAnalyzerConsole', gridId: 'gridRegion2' },
    { consoleId: 'reportingHubConsole', gridId: 'gridRegion3' },
    { consoleId: 'sessionManagerConsole', gridId: 'gridRegion4' },
    { consoleId: 'utilityHubConsole', gridId: 'gridRegion5' },
    { consoleId: 'sovereignTerminal', gridId: 'gridRegion6' }
  ];

  bindings.forEach(({ consoleId, gridId }) => {
    const consoleEl = document.getElementById(consoleId);
    if (consoleEl) {
      allocateConsoleToGrid(consoleEl, gridId);
    } else {
      console.warn(`Console with ID "${consoleId}" not found for grid binding.`);
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeConsoleGridBindings);