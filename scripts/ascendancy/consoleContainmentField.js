/**
 * Console Containment Field Calibration System
 * Prevents console panels from overlapping, misalignment, or breaking layout boundaries
 */

export function calibrateContainmentFields() {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    // Ensure each panel is positioned correctly
    panel.style.position = 'absolute';

    // Set boundary constraints (can be customized)
    panel.style.maxWidth = '100%';
    panel.style.maxHeight = '100%';

    // Prevent overflow from parent container
    panel.style.overflow = 'auto';

    // Optional: Snap to grid or define minimum visible bounds
    if (panel.offsetTop < 0) panel.style.top = '10px';
    if (panel.offsetLeft < 0) panel.style.left = '10px';
  });

  console.log('[🔒] Containment fields calibrated for all console panels.');
}

// Optional auto-trigger on DOM load
document.addEventListener('DOMContentLoaded', calibrateContainmentFields);
