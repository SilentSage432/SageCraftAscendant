// gridIntegrityScanner.js
// Scans the UI grid system for corruption, overlap, or drift and auto-corrects

let overlapCount = 0;
let driftCount = 0;

export function scanGridIntegrity() {
  const panels = document.querySelectorAll('.holo-console');
  const grid = {};

  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    const key = `${Math.round(rect.top)}x${Math.round(rect.left)}`;

    if (grid[key]) {
      console.warn(`Grid overlap detected at ${key}`, panel, grid[key]);
      resolveOverlap(panel, grid[key]);
      overlapCount++;
    } else {
      grid[key] = panel;
    }

    if (!isWithinBounds(rect)) {
      console.warn(`Panel drift detected:`, panel);
      correctDrift(panel);
      driftCount++;
    }
  });

  if (overlapCount > 0 || driftCount > 0) {
    console.info(`Grid corrections — Overlaps: ${overlapCount}, Drifts: ${driftCount}`);
  }
}

function isWithinBounds(rect) {
  return rect.left >= 0 && rect.top >= 0 &&
         rect.right <= window.innerWidth &&
         rect.bottom <= window.innerHeight;
}

function resolveOverlap(panelA, panelB) {
  panelA.style.transform = 'translate(10px, 10px)';
  applyPulseEffect(panelA);
}

function correctDrift(panel) {
  panel.style.transform = 'translate(0px, 0px)';
  applyPulseEffect(panel);
}

function applyPulseEffect(panel) {
  panel.classList.add('pulse-effect');
  setTimeout(() => {
    panel.classList.remove('pulse-effect');
  }, 800);
}

document.addEventListener('DOMContentLoaded', scanGridIntegrity);