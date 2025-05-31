// ===============================
// App Bootloader — init.js
// Inventory Auditor — Modular Refactor v1
// ===============================

import './globals.js';
import { formatDate, generateUUID, delay } from './utilities.js';
import { handleScanInput, handleAddItem, handleEditItem } from './handlers.js';
import './dropbox.js';
import { wireAllButtons } from './wiring.js';
import './wiringObserver.js';

// Unified Global Export Bridge
window.InventoryApp = {
  // Utilities
  formatDate,
  generateUUID,
  delay,

  // Handlers
  handleScanInput,
  handleAddItem,
  handleEditItem,
  handleConfirmEdit,
  handleCancelEdit,
  handleCloseSummary,
  handleToggleDevDashboard,

  // Dropbox
  uploadDropboxFile,
  downloadDropboxFile,
  connectDropbox,
  disconnectDropbox,
  refreshDropboxToken,

  // Wiring Diagnostics (optional dev tools)
  runFullSystemAudit,
  runWiringExpectationAudit,
  runAutoHealingLayer,

  // Additional Utilities (optional as needed)
  clearLiveTable,
  clearSessionHistory,
  clearAllSessions,
  clearStaleSessions,
  refreshAuditLog,

  // New OnHand Upload Hook
  uploadOnHandFile
};

// DOMContentLoaded lifecycle manager
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOMContentLoaded: App boot starting");

  // (Optional future hooks — pre-wiring tasks can be placed here)

  console.log("✅ Inventory Auditor fully booted.");

  // ✅ Global wiring executed immediately on DOMContentLoaded
  wireAllButtons();
  console.log("✅ Master wiring executed post-boot");
});
