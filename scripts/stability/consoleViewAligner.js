// 🧿 consoleViewAligner.js
// Responsible for aligning panels with consistent view bounds and screen-fit logic.

export function alignPanelView(panel) {
  if (!panel || !panel.getBoundingClientRect) return;

  const bounds = panel.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Adjust horizontal alignment
  if (bounds.right > viewportWidth) {
    panel.style.left = `${viewportWidth - bounds.width - 20}px`;
  } else if (bounds.left < 0) {
    panel.style.left = `20px`;
  }

  // Adjust vertical alignment
  if (bounds.bottom > viewportHeight) {
    panel.style.top = `${viewportHeight - bounds.height - 20}px`;
  } else if (bounds.top < 0) {
    panel.style.top = `20px`;
  }
}

export function alignAllVisiblePanels() {
  const panels = Array.from(document.querySelectorAll('.holo-console-panel, .holo-console'))
    .filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  panels.forEach(panel => alignPanelView(panel));
}

window.addEventListener('resize', alignAllVisiblePanels);
