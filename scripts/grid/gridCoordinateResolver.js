

// gridCoordinateResolver.js
// 🧭 Resolves a DOM panel's screen position into a logical grid coordinate (e.g., Q1-S3)

export function resolveGridCoordinates(panelElement) {
  const grid = document.getElementById("sovereignOrbitDock");
  if (!grid || !panelElement) return null;

  const gridRect = grid.getBoundingClientRect();
  const panelRect = panelElement.getBoundingClientRect();

  const x = panelRect.left + panelRect.width / 2;
  const y = panelRect.top + panelRect.height / 2;

  const relativeX = x - gridRect.left;
  const relativeY = y - gridRect.top;

  const column = Math.floor((relativeX / gridRect.width) * 4); // 4 sectors wide
  const row = Math.floor((relativeY / gridRect.height) * 4);   // 4 sectors tall

  if (column < 0 || column > 3 || row < 0 || row > 3) return null;

  const quadrantMap = [
    ["Q1-S1", "Q1-S2", "Q1-S3", "Q1-S4"],
    ["Q2-S1", "Q2-S2", "Q2-S3", "Q2-S4"],
    ["Q3-S1", "Q3-S2", "Q3-S3", "Q3-S4"],
    ["Q4-S1", "Q4-S2", "Q4-S3", "Q4-S4"]
  ];

  return quadrantMap[row][column];
}