// 🛰️ panelDriftSignal.js
// Emits warning signals when panel drift is detected beyond safe thresholds

export function emitDriftWarning(panelId, driftVector) {
  console.warn(`⚠️ Panel [${panelId}] is drifting with vector:`, driftVector);
  const event = new CustomEvent("panelDriftDetected", {
    detail: {
      panelId,
      driftVector
    }
  });
  window.dispatchEvent(event);
}

export function registerDriftSignalHandler(handler) {
  window.addEventListener("panelDriftDetected", (e) => {
    handler(e.detail);
  });
}
