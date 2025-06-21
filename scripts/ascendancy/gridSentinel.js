import { knownConsoleIds } from './consolePanelMemory.js';

// 🛡️ Grid Sentinel — Ensures layout integrity for console grid panels

export function initializeGridSentinel() {
  const gridPanels = document.querySelectorAll('.console-panel[data-grid-bound]');
  
  gridPanels.forEach(panel => {
    validatePosition(panel);
  });

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
        validatePosition(mutation.target);
      }
    });
  });

  gridPanels.forEach(panel => {
    observer.observe(panel, { attributes: true, attributeFilter: ['style'] });
  });

  console.log('🛡️ Grid Sentinel: Monitoring active panels.');

  knownConsoleIds.forEach(id => {
    if (!document.getElementById(id)) {
      console.warn(`🛡️ Grid Sentinel: Missing expected console panel with ID: ${id}`);
    }
  });
}

function validatePosition(panel) {
  const rect = panel.getBoundingClientRect();
  const parent = panel.parentElement?.getBoundingClientRect();
  
  if (!rect || !parent) return;

  const outOfBounds =
    rect.left < parent.left ||
    rect.top < parent.top ||
    rect.right > parent.right ||
    rect.bottom > parent.bottom;

  if (outOfBounds) {
    panel.style.left = '0px';
    panel.style.top = '0px';
    console.warn(`🛡️ Grid Sentinel: Repositioned out-of-bounds panel`, panel);
  }
}