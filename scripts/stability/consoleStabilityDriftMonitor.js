

// 🛰️ consoleStabilityDriftMonitor.js — UI Stability Drift Monitoring Layer

export function monitorPanelDrift() {
  const panels = document.querySelectorAll('.console-panel');

  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    const style = getComputedStyle(panel);

    const transform = style.transform;
    const hasTransformDrift = transform && transform !== 'none';

    const offscreen = rect.top < 0 || rect.left < 0 || rect.bottom > window.innerHeight || rect.right > window.innerWidth;

    if (hasTransformDrift || offscreen) {
      console.warn(`🛰️ Drift detected on panel ID: ${panel.id}`);
      panel.style.transform = 'none';
      panel.style.transition = 'all 0.3s ease-out';
      panel.style.left = '0px';
      panel.style.top = '0px';
    }
  });
}

// Auto-run on window resize or config load
window.addEventListener('resize', monitorPanelDrift);
document.addEventListener('DOMContentLoaded', monitorPanelDrift);