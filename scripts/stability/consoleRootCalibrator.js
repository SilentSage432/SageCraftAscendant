

// 🧭 consoleRootCalibrator.js
// Anchors the root grid origin for all console alignment calculations

export function calibrateRootNode() {
  const rootNode = document.querySelector('.console-root-anchor');

  if (!rootNode) {
    console.warn('[consoleRootCalibrator] Root node not found. Calibration skipped.');
    return null;
  }

  const rect = rootNode.getBoundingClientRect();
  const calibrationData = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    timestamp: Date.now(),
  };

  console.log('[consoleRootCalibrator] Root node calibrated:', calibrationData);
  return calibrationData;
}