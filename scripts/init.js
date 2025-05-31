// ===============================
// App Bootloader — init.js
// Inventory Auditor — Modular Refactor v1
// ===============================

import './globals.js';
import { formatDate, generateUUID, delay } from './utilities.js';
import { handleScanInput } from './scanHandlers.js';
import { handleAddItem, handleConfirmAddItem } from './addHandlers.js';
import { handleEditItem, handleConfirmEdit, handleCancelEdit, handleCloseSummary, handleToggleDevDashboard } from './editHandlers.js';
import { globalButtonMap } from './buttonMap.js';
import { 
  syncAllMapsToDropbox,
  restoreAllMapsFromDropbox,
  refreshAccessToken,
  getDropboxAccessToken,
  saveSessionToDropbox,
  loadSessionFromDropbox,
  listDropboxSessions,
  loadSelectedDropboxSession,
  beginDropboxLogin,
  handleDropboxCallback,
  initDropbox,
  bootstrapMappings
} from './dropbox.js';
import { wireAllButtons } from './wiring.js';
import { displayAppVersion } from './version.js';

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
  syncAllMapsToDropbox,
  restoreAllMapsFromDropbox,
  refreshAccessToken,
  getDropboxAccessToken,
  saveSessionToDropbox,
  loadSessionFromDropbox,
  listDropboxSessions,
  loadSelectedDropboxSession,
  beginDropboxLogin,
  handleDropboxCallback,
  initDropbox,
  bootstrapMappings
};

// DOMContentLoaded lifecycle manager
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOMContentLoaded: App boot starting");

  bootstrapMappings();  // Cloud-first mappings load

  if (!window.__buttonsWired__) {
    wireAllButtons();
    displayAppVersion();
    window.__buttonsWired__ = true;
  }

  console.log("✅ Master wiring executed post-boot");
});