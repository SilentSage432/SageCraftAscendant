// 🧲 gridSnapResolver.js
// Resolves the nearest grid sector for precise panel placement

export function resolveNearestGridSector(panel) {
  const grid = document.querySelector('#consoleGrid');
  if (!grid || !panel) return;

  const gridBounds = grid.getBoundingClientRect();
  const panelBounds = panel.getBoundingClientRect();

  const gridX = Math.round((panelBounds.left - gridBounds.left) / gridBounds.width * 12);
  const gridY = Math.round((panelBounds.top - gridBounds.top) / gridBounds.height * 12);

  return {
    x: Math.max(0, Math.min(gridX, 11)),
    y: Math.max(0, Math.min(gridY, 11))
  };
}
