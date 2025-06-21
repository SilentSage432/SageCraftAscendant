

// consoleGridVisualizer.js
// Phase 353.1 — Console Placement Grid Visualizer

export function visualizeConsoleGrid() {
  const gridOverlay = document.createElement("div");
  gridOverlay.id = "console-grid-visualizer";
  gridOverlay.style.position = "fixed";
  gridOverlay.style.top = "0";
  gridOverlay.style.left = "0";
  gridOverlay.style.width = "100vw";
  gridOverlay.style.height = "100vh";
  gridOverlay.style.zIndex = "9999";
  gridOverlay.style.pointerEvents = "none";
  gridOverlay.style.display = "grid";
  gridOverlay.style.gridTemplateColumns = "repeat(12, 1fr)";
  gridOverlay.style.gridTemplateRows = "repeat(12, 1fr)";
  gridOverlay.style.gap = "1px";

  for (let i = 0; i < 144; i++) {
    const cell = document.createElement("div");
    cell.style.border = "1px dashed rgba(255, 0, 255, 0.3)";
    gridOverlay.appendChild(cell);
  }

  document.body.appendChild(gridOverlay);

  console.log("🧩 Console Grid Visualizer: Grid overlay initialized.");
}

// Optionally activate the grid on load
document.addEventListener("DOMContentLoaded", () => {
  visualizeConsoleGrid();
});