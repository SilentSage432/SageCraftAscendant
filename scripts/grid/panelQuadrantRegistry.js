

// 🧭 panelQuadrantRegistry.js — Tracks and registers quadrant positions of console panels

const quadrantRegistry = {};

export function registerPanelQuadrant(panelId, quadrant) {
  if (!panelId || !quadrant) return;
  quadrantRegistry[panelId] = quadrant;
  console.log(`📍 Panel [${panelId}] registered in quadrant: ${quadrant}`);
}

export function getPanelQuadrant(panelId) {
  return quadrantRegistry[panelId] || null;
}

export function getAllQuadrantMappings() {
  return { ...quadrantRegistry };
}

export function clearQuadrantRegistry() {
  for (const key in quadrantRegistry) {
    delete quadrantRegistry[key];
  }
  console.log("🧼 Quadrant registry cleared.");
}

console.log("🧭 panelQuadrantRegistry.js module initialized");