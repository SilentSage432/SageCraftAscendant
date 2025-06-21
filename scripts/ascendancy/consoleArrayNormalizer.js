// consoleArrayNormalizer.js
// Phase 352.3 — Console Array Integrity Sweep
// This utility ensures console arrays are consistent, valid, and properly structured.
// It eliminates ghosts, trims IDs, and preps panel diagnostics.

export function normalizeConsoleArray(consoleArray) {
  if (!Array.isArray(consoleArray)) return [];

  return consoleArray
    .filter(item => item && typeof item === 'object' && item.id)
    .map(item => ({
      id: item.id.trim(),
      name: item.name?.trim() || 'Unnamed Console',
      status: item.status || 'inactive',
      visible: typeof item.visible === 'boolean' ? item.visible : true
    }));
}
