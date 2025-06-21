// consoleClarityScanner.js
// Phase 351.0 — Spectral Console Clarity Scanner Deployment

export function scanConsoleClarity() {
  const panels = document.querySelectorAll('.holo-console');
  panels.forEach(panel => {
    const bounds = panel.getBoundingClientRect();

    if (bounds.width === 0 || bounds.height === 0) {
      console.warn(`[ClarityScanner] Panel "${panel.id}" has zero width or height.`);
    }

    if (bounds.top < 0 || bounds.left < 0) {
      console.warn(`[ClarityScanner] Panel "${panel.id}" is rendering off-screen.`);
    }

    const overlap = [...panels].filter(other =>
      other !== panel &&
      panel.getBoundingClientRect().top < other.getBoundingClientRect().bottom &&
      panel.getBoundingClientRect().bottom > other.getBoundingClientRect().top &&
      panel.getBoundingClientRect().left < other.getBoundingClientRect().right &&
      panel.getBoundingClientRect().right > other.getBoundingClientRect().left
    );

    if (overlap.length > 0) {
      console.warn(`[ClarityScanner] Panel "${panel.id}" is overlapping ${overlap.length} other panel(s).`);
    }
  });
}
