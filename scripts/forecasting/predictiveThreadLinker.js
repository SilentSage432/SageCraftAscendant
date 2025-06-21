

// Phase 352 — Predictive Thread Linker
// Connects and harmonizes forecasting inputs with live data overlays and mesh-based signals.

export function linkPredictiveThreads() {
  console.groupCollapsed('%c🧵 Predictive Thread Linker Activated', 'color: deepskyblue; font-weight: bold;');

  const predictiveNodes = document.querySelectorAll('[data-thread]');
  predictiveNodes.forEach(node => {
    const threadType = node.getAttribute('data-thread');
    node.classList.add(`thread-${threadType}`);
    console.log(`🔗 Linked predictive thread: ${threadType}`);
  });

  console.groupEnd();
}

// Optional auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
  linkPredictiveThreads();
});