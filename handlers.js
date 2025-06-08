// handlers.js — fully modular clean export

export { handleScanInput } from './scanHandlers.js';
export { handleAddItem, handleConfirmAddItem } from './addHandlers.js';
export { handleEditItem, handleConfirmEdit } from './editHandlers.js';
export { globalButtonMap } from './buttonMap.js';


// Phase 107.C — Bay Scan Integrity Validator

window.validateBayScan = function(scannedCode) {
  const expectedBay = scannedCode; // full raw string
  localStorage.setItem("sessionBay", expectedBay);

  console.log("📦 Bay Scan Captured:", expectedBay);

  if (!expectedBay || expectedBay.length === 0) {
    console.warn("⚠️ Empty bay ID stored — possible scan issue.");
    showToast("⚠️ Bay Scan Warning: Empty ID stored.");
  } else if (!isNaN(expectedBay) && expectedBay.length !== scannedCode.length) {
    console.warn("⚠️ Potential digit loss detected during bay scan.");
    showToast("⚠️ Bay Scan Alert: Digit count mismatch.");
  } else {
    showToast("✅ Bay Scan Stored: " + expectedBay);
  }
};