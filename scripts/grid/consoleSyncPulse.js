

// consoleSyncPulse.js
// 🧠 Emits micro-pulses to ensure active panel alignment in the grid system.

export function emitSyncPulse(panelId) {
  const event = new CustomEvent('consoleSyncPulse', {
    detail: { panelId, timestamp: Date.now() },
  });
  document.dispatchEvent(event);
}

export function listenForSyncPulse(callback) {
  document.addEventListener('consoleSyncPulse', (e) => {
    callback(e.detail);
  });
}