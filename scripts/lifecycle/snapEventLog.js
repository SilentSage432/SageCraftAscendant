

// 📜 Phase 349 — Snap Event Archive Overlay

function ensureSnapLogHUD() {
  if (document.getElementById('snapEventLog')) return;

  const logContainer = document.createElement('div');
  logContainer.id = 'snapEventLog';
  logContainer.style.position = 'fixed';
  logContainer.style.bottom = '10px';
  logContainer.style.right = '10px';
  logContainer.style.width = '280px';
  logContainer.style.maxHeight = '40vh';
  logContainer.style.overflowY = 'auto';
  logContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  logContainer.style.color = '#0ff';
  logContainer.style.fontSize = '12px';
  logContainer.style.fontFamily = 'monospace';
  logContainer.style.padding = '10px';
  logContainer.style.border = '1px solid #0ff';
  logContainer.style.borderRadius = '8px';
  logContainer.style.zIndex = 99999;

  document.body.appendChild(logContainer);
}

function logSnapEvent(panel, type = 'unknown') {
  ensureSnapLogHUD();

  const id = panel?.id || '(no-id)';
  const x = panel?.style?.left || '?';
  const y = panel?.style?.top || '?';
  const timestamp = new Date().toLocaleTimeString();

  const entry = document.createElement('div');
  entry.className = 'snap-log-entry';
  entry.textContent = `[${timestamp}] ${type.toUpperCase()} SNAP → ${id} → (${x}, ${y})`;

  document.getElementById('snapEventLog').appendChild(entry);
}

export { logSnapEvent };