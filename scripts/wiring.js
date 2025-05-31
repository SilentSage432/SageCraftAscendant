// ===============================
// Live overlay updater — Diagnostics
function updateDiagnosticOverlay() {
  const totalButtons = document.querySelectorAll('button').length;
  const listeners = document.querySelectorAll('button[listener-attached]').length;

  const upcMapCount = (window.upcToItemMap) ? Object.keys(window.upcToItemMap).length : 0;
  const eslMapCount = (window.eslToItemMap) ? Object.keys(window.eslToItemMap).length : 0;
  const bayMapCount = (window.bayToItemMap) ? Object.keys(window.bayToItemMap).length : 0;

  const overlay = document.getElementById('diagnosticOverlay');
  if (overlay) {
    overlay.innerHTML = `
      🛡 Diagnostics<br>
      🔘 Buttons: ${totalButtons}<br>
      🎯 Listeners: ${listeners}<br>
      🗂 UPC Map: ${upcMapCount}<br>
      🏷 ESL Map: ${eslMapCount}<br>
      🗃 Bay Map: ${bayMapCount}
    `;
  }
}


let overlayUpdateInterval = 2000;

function adjustOverlayUpdateInterval() {
  if (window.innerWidth <= 768) {
    overlayUpdateInterval = 5000;  // Mobile devices: slower refresh for battery
  } else {
    overlayUpdateInterval = 2000;  // Desktop: normal refresh rate
  }
}

window.addEventListener('resize', adjustOverlayUpdateInterval);
adjustOverlayUpdateInterval();

setInterval(updateDiagnosticOverlay, overlayUpdateInterval);

// ===============================
// Optimized Live Field Log Viewer Wiring

const logContainer = document.getElementById('fieldLogContent');
const refreshBtn = document.getElementById('refreshFieldLog');
const exportBtn = document.getElementById('exportFieldLog');
const filterButtons = document.querySelectorAll('.log-filter-btn');

function renderFieldLog(filter = 'all') {
  if (!logContainer) return;
  const logs = window.getFieldLog ? window.getFieldLog() : [];
  if (!logs.length) {
    logContainer.innerHTML = "<em>No log entries yet.</em>";
    return;
  }
  const filteredLogs = (filter === 'all') ? logs : logs.filter(entry => entry.eventType === filter);
  logContainer.innerHTML = filteredLogs
    .slice().reverse()
    .map(entry => {
      const time = new Date(entry.timestamp).toLocaleString();
      return `<div style="margin-bottom:5px;"><strong>${time}</strong>: [${entry.eventType}] ${JSON.stringify(entry.details)}</div>`;
    })
    .join('');
}

if (refreshBtn) refreshBtn.addEventListener('click', () => renderFieldLog());

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    renderFieldLog(filter);
  });
});

if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const logs = window.getFieldLog ? window.getFieldLog() : [];
    const prettyJSON = JSON.stringify(logs, null, 2);
    const blob = new Blob([prettyJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fieldLog_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Full global exposure for master wiring stability
function wireAllButtons() {
  console.log("Wiring process starting...");

  const buttonMap = {
    addItemBtn: () => window.addItemModal(),
    addLiveItemBtn: () => window.addLiveItem(),
    clearHistoryBtn: () => window.clearHistory(),
    clearLiveTableBtn: () => window.clearLiveTable(),
    clearSnapshotsBtn: () => window.clearSnapshots(),
    connectDropboxBtn: () => window.connectDropbox(),
    deleteNamedSessionBtn: () => window.deleteNamedSession(),
    disconnectDropboxBtn: () => window.disconnectDropbox(),
    downloadExcelBtn: () => window.downloadExcelTemplate(),
    exportAuditLogBtn: () => window.exportAuditLog(),
    exportMappingsBtn: () => window.exportMappings(),
    exportUPCBtn: () => window.exportUPCMappings(),
    exportFieldLog: () => {
      const logs = window.getFieldLog ? window.getFieldLog() : [];
      const prettyJSON = JSON.stringify(logs, null, 2);
      const blob = new Blob([prettyJSON], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fieldLog_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    importMappingsBtn: () => window.importMappings(),
    importUPCBtn: () => window.importUPCMappings(),
    loadSessionBtn: () => window.loadSession(),
    masterBackupBtn: () => window.syncEverythingToDropbox({}, ''),
    masterRestoreBtn: () => window.restoreEverythingFromDropbox({}, {}, () => {}),
    moreOptionsBtn: () => window.toggleMoreOptions(),
    navAboutBtn: () => window.switchTab('about'),
    navAuditBtn: () => window.switchTab('audit'),
    navCountBtn: () => window.switchTab('count'),
    navInventoryBtn: () => window.switchTab('inventory'),
    navToolsBtn: () => window.switchTab('tools'),
    navVaultBtn: () => window.switchTab('vault'),
    purgeLocalStorageBtn: () => window.purgeLocalStorage(),
    refreshAuditLogBtn: () => window.refreshAuditLog(),
    refreshDropboxTokenBtn: () => window.refreshDropboxToken(),
    refreshFieldLog: () => renderFieldLog(),
    reconnectDropboxBtn: () => window.reconnectDropbox(),
    resetAuditLogBtn: () => window.resetAuditLog(),
    restoreDropboxMapsBtn: () => window.restoreDropboxMaps(),
    runWireAuditBtn: () => runWireAudit(),
    saveSessionBtn: () => window.saveSession(),
    saveSessionLocalBtn: () => window.saveSessionLocal(),
    syncDropboxMapsBtn: () => window.syncDropboxMaps(),
    syncMappingsBtn: () => window.syncMappings(),
    toggleImportExportBtn: () => window.toggleImportExport(),
    triggerSnapshotBtn: () => window.triggerSnapshot(),
    uploadDropboxFileBtn: () => window.uploadDropboxFile(),
    viewExportHistoryBtn: () => window.viewExportHistory(),
    viewSnapshotsBtn: () => window.viewSnapshots(),
    viewTrendsBtn: () => window.viewTrends(),
    cancelAddItemBtn: () => window.cancelAddItem(),
    cancelEditBtn: () => window.cancelEdit(),
    confirmAddItemBtn: () => window.confirmAddItem(),
    confirmEditBtn: () => window.confirmEdit(),
    // ---- BEGIN ADDITIVE ENTRIES ----
    addLiveItemBtn: () => window.addLiveItem(),
    toggleImportExportBtn: () => window.toggleImportExport(),
    exportBtn: () => window.exportMappings(),
    importBtn: () => window.importMappings(),
    viewTrendsBtn: () => window.viewTrends(),
    uploadDropboxFileBtn: () => window.uploadDropboxFile(),
    downloadDropboxFileBtn: () => window.downloadDropboxFile(),
    downloadBackupBtn: () => window.downloadBackupFile(),
    resetAuditLogBtn: () => window.resetAuditLog(),
    triggerImportExcelSessionBtn: () => window.triggerImportExcelSession(),
    browseDropboxSessionsBtn: () => window.browseDropboxSessions(),
    saveNamedSessionBtn: () => window.saveNamedSession(),
    loadNamedSessionBtn: () => window.loadNamedSession(),
    deleteNamedSessionBtn: () => window.deleteNamedSession(),
    mergeMasterReportBtn: () => window.mergeMasterReport(),
    exportMappingsBtn: () => window.exportMappings(),
    importMappingsBtn: () => window.importMappings(),
    connectDropboxBtn: () => window.connectDropbox(),
    refreshDropboxTokenBtn: () => window.refreshDropboxToken(),
    loadActiveSessionBtn: () => window.loadActiveSession(),
    syncDropboxMapsBtn: () => window.syncDropboxMaps(),
    restoreDropboxMapsBtn: () => window.restoreDropboxMaps(),
    disconnectDropboxBtn: () => window.disconnectDropbox(),
    saveSessionLocalBtn: () => window.saveSessionLocal(),
    loadSessionLocalBtn: () => window.loadSessionLocal(),
    clearSessionsBtn: () => window.clearSessions(),
    clearStaleSessionsBtn: () => window.clearStaleSessions(),
    clearNamedSessionBtn: () => window.clearNamedSession(),
    clearAllSessionsBtn: () => window.clearAllSessions(),
    clearSessionHistoryBtn: () => window.clearSessionHistory(),
    refreshAuditLogBtn: () => window.refreshAuditLog(),
    modalBinLocationBtn: () => window.modalBinLocation(),
    modalBinProductBtn: () => window.modalBinProduct(),
    modalBinCancelBtn: () => window.modalBinCancel(),
    modalBtnLocation: () => window.modalBtnLocation(),
    modalBtnProduct: () => window.modalBtnProduct(),
    modalBtnCancel: () => window.modalBtnCancel(),
    cancelFinalEditBtn: () => window.cancelFinalEdit(),
    confirmFinalEditBtn: () => window.confirmFinalEdit(),
    runAutoHealingBtn: () => window.runAutoHealing(),
    runHealingAuditBtn: () => window.runHealingAudit(),
    runMasterDiagnosticBtn: () => window.runMasterDiagnostic(),
    runFinalIntegrityAuditBtn: () => window.runFinalIntegrityAudit(),
    runFullSystemAuditBtn: () => window.runFullSystemAudit(),
    // ---- END ADDITIVE ENTRIES ----
  };

  Object.entries(buttonMap).forEach(([btnId, handler]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      if (!btn.hasAttribute('listener-attached')) {
        btn.addEventListener('click', handler);
        btn.setAttribute('listener-attached', 'true');
        console.log(`Listener wired for ${btnId}`);
      }
    }
  });

  console.log("Wiring process complete.");
}
window.wireAllButtons = wireAllButtons;

function runWireAudit() {
  const totalButtons = document.querySelectorAll('button').length;
  const listeners = document.querySelectorAll('button[listener-attached]').length;
  console.log(`🧪 Wire Audit → Total Buttons: ${totalButtons}, Wired Listeners: ${listeners}`);

  const unwired = [...document.querySelectorAll('button')]
    .filter(btn => !btn.hasAttribute('listener-attached') && btn.id && btn.id.trim() !== '');

  if (unwired.length === 0) {
    console.log("✅ All functional buttons fully wired.");
  } else {
    console.warn(`⚠ Unwired Functional Buttons (${unwired.length}):`, unwired.map(btn => btn.id));
  }
}

window.runWireAudit = runWireAudit;

// ===============================
// Forensic Button Inventory Tool
function runForensicSweep() {
  const buttonMapKeys = Object.keys({
    addItemBtn: null,
    addLiveItemBtn: null,
    browseDropboxSessionsBtn: null,
    clearAllSessionsBtn: null,
    clearHistoryBtn: null,
    clearNamedSessionBtn: null,
    clearSessionHistoryBtn: null,
    clearSnapshotsBtn: null,
    clearStaleSessionsBtn: null,
    clearLiveTableBtn: null,
    clearSessionsBtn: null,
    connectDropboxBtn: null,
    deleteNamedSessionBtn: null,
    disconnectDropboxBtn: null,
    downloadExcelBtn: null,
    exportAuditLogBtn: null,
    exportBayMappings: null,
    exportBtn: null,
    exportMappingsBtn: null,
    exportUPCBtn: null,
    exportFieldLog: null,
    importBayMappings: null,
    importMappingsBtn: null,
    importUPCBtn: null,
    loadActiveSessionBtn: null,
    loadNamedSessionBtn: null,
    loadSessionBtn: null,
    loadSessionLocalBtn: null,
    masterBackupBtn: null,
    masterRestoreBtn: null,
    mergeMasterReportBtn: null,
    moreOptionsBtn: null,
    modalBinCancelBtn: null,
    modalBinEditBtn: null,
    modalBinLocationBtn: null,
    modalBinProductBtn: null,
    modalBtnCancel: null,
    modalBtnESL: null,
    modalBtnLocation: null,
    modalBtnProduct: null,
    navAboutBtn: null,
    navAuditBtn: null,
    navCountBtn: null,
    navInventoryBtn: null,
    navToolsBtn: null,
    navVaultBtn: null,
    purgeLocalStorageBtn: null,
    refreshAuditLogBtn: null,
    refreshDropboxTokenBtn: null,
    refreshFieldLog: null,
    reconnectDropboxBtn: null,
    resetAuditLogBtn: null,
    restoreDropboxMapsBtn: null,
    runAutoHealingBtn: null,
    runFinalIntegrityAuditBtn: null,
    runFullSystemAuditBtn: null,
    runHealingAuditBtn: null,
    runMasterDiagnosticBtn: null,
    runWireAuditBtn: null,
    saveNamedSessionBtn: null,
    saveSessionBtn: null,
    saveSessionLocalBtn: null,
    syncDropboxMapsBtn: null,
    syncMappingsBtn: null,
    toggleImportExportBtn: null,
    triggerImportExcelSessionBtn: null,
    triggerSnapshotBtn: null,
    uploadDropboxFileBtn: null,
    viewExportHistoryBtn: null,
    viewSnapshotsBtn: null,
    viewTrendsBtn: null,
    cancelAddItemBtn: null,
    cancelEditBtn: null,
    cancelFinalEditBtn: null,
    confirmAddItemBtn: null,
    confirmEditBtn: null,
    confirmFinalEditBtn: null,
  });

  const domButtons = [...document.querySelectorAll('button')].map(btn => btn.id).filter(id => id);
  const ghostMappings = buttonMapKeys.filter(key => !domButtons.includes(key));

  console.log("🧬 Forensic Sweep Report:");
  console.log(`• Total ButtonMap Entries: ${buttonMapKeys.length}`);
  console.log(`• DOM Buttons Found: ${domButtons.length}`);
  console.log(`• Ghost ButtonMap Entries: ${ghostMappings.length}`);
  console.log("🧟 Ghost IDs:", ghostMappings);
}
window.runForensicSweep = runForensicSweep;

// ===============================
// Full Stability Sync Layer — Safety Sweep Post-Boot
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    console.log("🔄 Executing Stability Sync Pass...");
    window.wireAllButtons();
  }, 500);
});