// 📜 Phase 349 — Snap Event Archive Overlay

function logSnapEvent(panel, type = 'unknown') {
  const id = panel?.id || '(no-id)';
  const x = panel?.style?.left || '?';
  const y = panel?.style?.top || '?';
  const timestamp = new Date().toLocaleTimeString();

  console.log(`[${timestamp}] ${type.toUpperCase()} SNAP → ${id} → (${x}, ${y})`);
}

export { logSnapEvent };