// ===============================
// Master Button Wiring — wiring.js
// Inventory Auditor — Modular Refactor v1
// ===============================

/**
 * Global button map — all ID-to-function mappings
 */
const buttonActionMap = {
  saveSessionVault: () => console.log('💾 Save Session button clicked'),
  loadSession: () => console.log('📥 Load Session button clicked'),
  exportUPCBtn: () => exportUPC(),
  importUPCBtn: () => importUPC(),
  exportBtn: () => exportLocations(),
  importBtn: () => importLocations(),
  mergeMasterReport: () => console.log('🧩 Merge Master Report button clicked'),
  exportMappings: () => exportLocations(),
  importMappings: () => importLocations(),
  connectDropbox: () => beginDropboxLogin(),
  refreshDropboxToken: () => refreshAccessToken(),
  loadActiveSession: () => loadSessionFromDropbox(),
  syncDropboxMaps: () => syncAllMapsToDropbox(false),
  restoreDropboxMaps: () => restoreAllMapsFromDropbox(),
  disconnectDropbox: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('pkce_verifier');
    alert('🧹 Dropbox tokens cleared.');
  },
  saveSessionLocal: () => saveLocalSession(),
  loadSessionLocal: () => loadLocalSession(),
  clearSessionHistory: () => clearLocalSessions(),
  downloadBackupBtn: () => exportFullBackup(),
  clearAllSessions: () => clearAllStoredSessions(),
  cleanStaleSessions: () => cleanEmptySessions(),
  refreshAuditLog: () => renderAuditRotationTable(),
  modalBtnLocation: () => handleModalLocation(),
  modalBtnProduct: () => handleModalProduct(),
  modalBtnESL: () => handleModalESL(),
  modalBtnCancel: () => closeModalPrompt(),
  confirmEditBtn: () => confirmEdit(),
  cancelEditBtn: () => cancelEdit(),
  closeSummaryBtn: () => closeSummaryModal(),
  confirmAddItemBtn: () => confirmAddLiveItem(),
  cancelAddItemBtn: () => cancelAddLiveItem(),
  toggleDevDashboardBtn: () => toggleDevPanel(),
  closeBayBtn: () => closeCurrentBay(),
  addLiveItem: () => handleAddLiveItem(),
  moreOptionsBtn: () => toggleAdvancedControlsPanel(),
  toggleImportExport: () => toggleImportExportPanel(),
  exportAuditLog: () => exportAuditLogFile(),
  resetAuditLog: () => resetAuditLogFile(),
  clearLiveTableBtn: () => clearLiveTable(),
  saveSessionBtn: () => saveSessionToDropbox(),
  loadSessionBtn: () => loadSessionFromDropbox(),
  triggerImportExcelSession: () => importExcelSession(),
  browseDropboxSessions: () => browseDropboxFiles()
};

/**
 * Wiring executor
 */
function wireAllButtons() {
  Object.entries(buttonActionMap).forEach(([id, action]) => {
    const btn = document.getElementById(id);
    if (btn && !btn.hasAttribute('listener-attached')) {
      btn.addEventListener('click', action);
      btn.setAttribute('listener-attached', 'true');
      console.log(`✅ Wired: ${id}`);
    }
  });
}

// Auto-run after stabilization
window.addEventListener('load', () => {
  setTimeout(wireAllButtons, 500);
});

export { wireAllButtons };