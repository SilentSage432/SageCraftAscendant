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
  const finalTarget = document.getElementById("consolePanelGroup") || gridRegion;
  finalTarget.appendChild(consoleElement);
}

// export function initializeConsoleGridBindings() {
//   const bindings = [
//     { consoleId: 'countConsole', gridId: 'gridRegion1' },
//     { consoleId: 'sessionManagerConsole', gridId: 'gridRegion4' },
//     { consoleId: 'utilityHubConsole', gridId: 'gridRegion5' },
//     { consoleId: 'sovereignTerminal', gridId: 'gridRegion6' }
//   ];
//
//   bindings.forEach(({ consoleId, gridId }) => {
//     const consoleEl = document.getElementById(consoleId);
//     if (consoleEl && !consoleEl.classList.contains("suppress-onload")) {
//       allocateConsoleToGrid(consoleEl, gridId);
//     } else if (!consoleEl) {
//       console.warn(`Console with ID "${consoleId}" not found for grid binding.`);
//     }
//   });
// }

// document.addEventListener('DOMContentLoaded', initializeConsoleGridBindings);