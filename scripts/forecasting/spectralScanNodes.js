

// Phase 353 — Spectral Scan Nodes
// Handles detection and response of spectral input nodes for dynamic forecasting and overlays.

export function initializeSpectralScanNodes() {
  console.groupCollapsed('%c🔮 Spectral Scan Nodes Initialized', 'color: violet; font-weight: bold;');

  const spectralNodes = document.querySelectorAll('[data-spectral-scan]');
  spectralNodes.forEach(node => {
    const scanType = node.getAttribute('data-spectral-scan');
    node.classList.add(`spectral-${scanType}`);
    console.log(`📡 Spectral node linked: ${scanType}`);
  });

  console.groupEnd();
}

// Optional auto-start on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initializeSpectralScanNodes();
});