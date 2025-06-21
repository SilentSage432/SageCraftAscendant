// consoleDockInjectionFinalizer.js
// Final pass to ensure all console docks are bound and injected into the correct DOM containers

import { knownConsoleIds } from './consolePanelMemory.js';
import { rebindConsoleToGroup } from './panelDockBinder.js';

document.addEventListener('DOMContentLoaded', () => {
  knownConsoleIds.forEach(consoleId => {
    const consoleEl = document.getElementById(consoleId);
    if (consoleEl && !consoleEl.classList.contains('docked')) {
      rebindConsoleToGroup(consoleId);
      consoleEl.classList.add('docked');
      console.log(`[Console Finalizer] ${consoleId} docked successfully.`);
    }
  });
});
