// Phase 351 — Forecast Matrix Sync Core
// Used for coordinating layered forecast-related visualizations and diagnostic overlays.

export function syncForecastMatrix() {
  console.groupCollapsed('%c📊 Forecast Matrix Sync Initialized', 'color: violet; font-weight: bold;');

  const forecastPanels = document.querySelectorAll('[data-forecast]');
  forecastPanels.forEach(panel => {
    const type = panel.getAttribute('data-forecast');
    panel.classList.add(`forecast-${type}`);
    console.log(`🌀 Synced forecast panel: ${type}`);
  });

  console.groupEnd();
}

// Optional: Auto-run sync when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  syncForecastMatrix();
});
