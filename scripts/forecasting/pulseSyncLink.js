// Phase 353.2 — Pulse Sync Link
// Synchronizes pulse emissions with UI panels like the Whisperer and Neural Pulse Monitor.

export function syncPulseSignals() {
  console.groupCollapsed('%c🌐 Pulse Sync Link Activated', 'color: cyan; font-weight: bold;');

  const pulseElements = document.querySelectorAll('[data-pulse-node]');
  pulseElements.forEach(el => {
    el.classList.add('pulse-synced');
    console.log(`🫀 Pulse node synced: ${el.id || 'Unnamed Element'}`);
  });

  console.groupEnd();
}

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
  syncPulseSignals();
});
