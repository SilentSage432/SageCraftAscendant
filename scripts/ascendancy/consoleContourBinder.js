// consoleContourBinder.js
// Phase 350.4 — Console Contour Syncing
// Description: Links panel outlines to magnetic grid contours for visual alignment

export function bindConsoleContours() {
  const panels = document.querySelectorAll('.console-panel');

  panels.forEach(panel => {
    const contour = document.createElement('div');
    contour.classList.add('console-contour');

    panel.appendChild(contour);
    updateContourPosition(panel, contour);
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.console-panel').forEach(panel => {
      const contour = panel.querySelector('.console-contour');
      if (contour) updateContourPosition(panel, contour);
    });
  });
}

function updateContourPosition(panel, contour) {
  const rect = panel.getBoundingClientRect();
  contour.style.position = 'absolute';
  contour.style.border = '1px dashed var(--accent-color, #00ffff)';
  contour.style.top = '0';
  contour.style.left = '0';
  contour.style.width = `${rect.width}px`;
  contour.style.height = `${rect.height}px`;
  contour.style.pointerEvents = 'none';
  contour.style.zIndex = '1';
}

// Auto-init if needed
document.addEventListener('DOMContentLoaded', () => {
  bindConsoleContours();
});
