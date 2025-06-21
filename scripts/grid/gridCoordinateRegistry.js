

// 🗺️ gridCoordinateRegistry.js — Maintains registry of console grid positions

const gridCoordinateMap = new Map();

export function registerGridCoordinate(consoleId, x, y) {
  gridCoordinateMap.set(consoleId, { x, y });
  console.log(`📌 Registered grid coordinates for ${consoleId}: (${x}, ${y})`);
}

export function getGridCoordinate(consoleId) {
  return gridCoordinateMap.get(consoleId);
}

export function getAllRegisteredCoordinates() {
  return Array.from(gridCoordinateMap.entries()).map(([id, coords]) => ({
    consoleId: id,
    ...coords
  }));
}

export function clearGridRegistry() {
  gridCoordinateMap.clear();
  console.log("🧹 Grid coordinate registry cleared.");
}