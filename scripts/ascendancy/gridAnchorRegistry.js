// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// 🔗 Sovereign Grid Anchor Registry
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

export const gridAnchorRegistry = new Map();

export function registerGridAnchor(anchorId, metadata = {}) {
  if (!anchorId) return;
  gridAnchorRegistry.set(anchorId, metadata);
}

export function getGridAnchor(anchorId) {
  return gridAnchorRegistry.get(anchorId);
}

export function hasGridAnchor(anchorId) {
  return gridAnchorRegistry.has(anchorId);
}

export function getAllGridAnchors() {
  return Array.from(gridAnchorRegistry.entries());
}

export function removeGridAnchor(anchorId) {
  gridAnchorRegistry.delete(anchorId);
}
