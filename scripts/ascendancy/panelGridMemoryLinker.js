// panelGridMemoryLinker.js
// Phase 352.3 — Panel Grid Memory Association

export function linkPanelGridMemory(panelElement, gridCoordinates) {
  if (!panelElement || !gridCoordinates) return;

  const { row, col } = gridCoordinates;

  // Apply coordinates as data attributes
  panelElement.dataset.gridRow = row;
  panelElement.dataset.gridCol = col;

  // Save to localStorage for persistent memory (optional enhancement)
  const panelId = panelElement.id || `panel-${Date.now()}`;
  panelElement.id = panelId;

  const storedGrid = JSON.parse(localStorage.getItem("panelGridMemory") || "{}");
  storedGrid[panelId] = { row, col };
  localStorage.setItem("panelGridMemory", JSON.stringify(storedGrid));
}

export function restorePanelGridMemory(panelElement) {
  const panelId = panelElement.id;
  if (!panelId) return;

  const storedGrid = JSON.parse(localStorage.getItem("panelGridMemory") || "{}");
  const coords = storedGrid[panelId];
  if (coords) {
    panelElement.dataset.gridRow = coords.row;
    panelElement.dataset.gridCol = coords.col;
  }
}

export function reconcileGridPanelIDs() {
  const panels = document.querySelectorAll(".holo-console");
  const storedGrid = JSON.parse(localStorage.getItem("panelGridMemory") || "{}");

  panels.forEach((panel, index) => {
    if (!panel.id) {
      const generatedId = `panel-${Date.now()}-${index}`;
      panel.id = generatedId;
      storedGrid[generatedId] = {
        row: panel.dataset.gridRow || 0,
        col: panel.dataset.gridCol || 0,
      };
    } else {
      // Ensure stored memory is up to date
      storedGrid[panel.id] = {
        row: panel.dataset.gridRow || 0,
        col: panel.dataset.gridCol || 0,
      };
    }
  });

  localStorage.setItem("panelGridMemory", JSON.stringify(storedGrid));
}
