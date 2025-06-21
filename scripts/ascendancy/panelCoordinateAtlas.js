

// panelCoordinateAtlas.js
// Central registry for panel positions, sizes, and layout metadata

export const panelCoordinates = {
  countConsole: { x: 100, y: 150, width: 400, height: 300 },
  deltaAnalyzerConsole: { x: 600, y: 150, width: 400, height: 300 },
  reportingHubConsole: { x: 1100, y: 150, width: 400, height: 300 },
  sessionManagerConsole: { x: 100, y: 500, width: 400, height: 300 },
  utilityHubConsole: { x: 600, y: 500, width: 400, height: 300 },
  sovereignTerminal: { x: 1100, y: 500, width: 400, height: 300 }
};

export function getPanelCoordinates(panelId) {
  return panelCoordinates[panelId] || null;
}

export function setPanelCoordinates(panelId, coords) {
  panelCoordinates[panelId] = coords;
}