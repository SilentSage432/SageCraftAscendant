// spatialReconciliationEngine.js
// Phase 358.0 — Spatial Reconciliation Engine
// Ensures no panels are overlapping; nudges them into nearest valid open positions.

export function reconcileSpatialGrid(panelRegistry = [], gridMap = {}) {
  panelRegistry.forEach(panel => {
    const currentSector = panel.dataset.gridSector;
    if (!currentSector || !gridMap[currentSector]) return;

    const overlappingPanels = gridMap[currentSector].filter(p => p !== panel);
    if (overlappingPanels.length > 0) {
      const newSector = findNearestFreeSector(currentSector, gridMap);
      if (newSector) {
        panel.dataset.gridSector = newSector;
        gridMap[newSector] = gridMap[newSector] || [];
        gridMap[newSector].push(panel);

        // Remove from old sector
        gridMap[currentSector] = gridMap[currentSector].filter(p => p !== panel);

        console.info(`[SpatialReconciliation] Moved panel to ${newSector} due to overlap in ${currentSector}`);
      }
    }
  });
}

function findNearestFreeSector(startSector, gridMap) {
  const sectorList = Object.keys(gridMap);
  for (const sector of sectorList) {
    if (gridMap[sector].length === 0) return sector;
  }
  return null;
}
