// ===============================
import { 
  runFullSystemAudit, 
  runWiringExpectationAudit, 
  runAutoHealingLayer, 
  runMasterDiagnostics 
} from './audit.js';
// Master Button Wiring — wiring.js
// Inventory Auditor — Modular Refactor v1
// ===============================

/**
 * Toggle Developer Panel Visibility
 */
function toggleDevPanel() {
  const panel = document.getElementById('devToolsPanel');
  if (panel) {
    if (panel.style.display === 'none' || panel.style.display === '') {
      panel.style.display = 'block';
      const totalCount = document.querySelectorAll('button').length;
      const listenerCount = document.querySelectorAll('button[listener-attached]').length;
      const monitorContent = `🛠 ${totalCount} btn | 🎯 ${listenerCount} listeners`;
      const statsElem = document.getElementById('devPanelStats');
      if (statsElem) {
        statsElem.textContent = monitorContent;
      }
      console.log("🔧 Dev Panel Opened");
    } else {
      panel.style.display = 'none';
      console.log("🔧 Dev Panel Closed");
    }
  } else {
    console.warn("Developer panel element not found.");
  }
}

/**
 * Global button map — all ID-to-function mappings
 */
const buttonActionMap = {
  // ✅ SESSION CONTROLS
  saveSessionVault: () => saveSessionToDropbox(),
  loadSession: () => loadSessionFromDropbox(),
  saveSessionBtn: () => saveSessionToDropbox(),
  loadSessionBtn: () => loadSessionFromDropbox(),
  saveSessionLocal: () => saveLocalSession(),
  loadSessionLocal: () => loadLocalSession(),
  clearSessionHistory: () => clearLocalSessions(),
  clearAllSessions: () => clearAllStoredSessions(),
  clearStaleSessionsBtn: () => cleanEmptySessions(),
  deleteNamedSession: () => deleteNamedSession(),
  mergeMasterReport: () => mergeMasterSessionReports(),

  // ✅ IMPORT / EXPORT CONTROLS
  exportUPCBtn: () => exportUPC(),
  importUPCBtn: () => importUPC(),
  exportBtn: () => exportLocations(),
  importBtn: () => importLocations(),
  exportMappings: () => exportLocations(),
  importMappings: () => importLocations(),
  triggerImportExcelSession: () => importExcelSession(),
  browseDropboxSessions: () => browseDropboxFiles(),
  downloadBackupBtn: () => exportFullBackup(),
  exportAuditLog: () => exportAuditLogFile(),
  resetAuditLog: () => resetAuditLogFile(),

  // ✅ DROPBOX CONTROLS
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
  refreshAuditLog: () => renderAuditRotationTable(),

  // ✅ MODAL & ACTION CONTROLS
  modalBtnLocation: () => handleModalLocation(),
  modalBtnProduct: () => handleModalProduct(),
  modalBtnESL: () => handleModalESL(),
  modalBtnCancel: () => closeModalPrompt(),
  confirmEditBtn: () => confirmEdit(),
  cancelEditBtn: () => cancelEdit(),
  closeSummaryBtn: () => closeSummaryModal(),
  confirmAddItemBtn: () => confirmAddLiveItem(),
  cancelAddItemBtn: () => cancelAddLiveItem(),
  closeBayBtn: () => closeCurrentBay(),
  addLiveItem: () => handleAddLiveItem(),
  moreOptionsBtn: () => toggleAdvancedControlsPanel(),
  toggleImportExport: () => toggleImportExportPanel(),

  // (existing entries continue below, fully intact)
  runFullSystemAuditBtn: () => runFullSystemAudit(),
  runWiringAuditBtn: () => runWiringExpectationAudit(),
  runAutoHealingBtn: () => runAutoHealingLayer(),
  runMasterDiagnosticBtn: () => runMasterDiagnostics(),

  // ✅ NAVIGATION CONTROLS
  navCountBtn: () => activateTab('count'),
  navVaultBtn: () => activateTab('vault'),
  navToolsBtn: () => activateTab('tools'),
  navAuditBtn: () => activateTab('audit'),

  // ✅ REMAINING SESSION CONTROLS
  saveNamedSession: () => saveNamedSession(),
  loadNamedSession: () => loadNamedSession(),

  // ✅ REMAINING AUDIT / UTILITIES
  clearHistoryBtn: () => clearAuditHistory(),
  clearSnapshotsBtn: () => clearSnapshots(),

  // ✅ FINAL WIRING COMPLETIONS
  viewSnapshotsBtn: () => viewSnapshots(),
  cleanStaleSessions: () => cleanEmptySessions(),
  viewTrends: () => handleViewTrends(),
  closeTrendsBtn: () => {
    document.getElementById('trendsModal').style.display = 'none';
  },
  uploadDropboxFile: () => handleDropboxUpload(),
  downloadToExcelBtn: () => exportLiveTableToExcel(),
  clearStaleSessionsBtn: () => cleanStaleSessions(),

  // ✅ FILE EXPORT / IMPORT UTILITIES
  clearLiveTableBtn: () => clearLiveTable(),

  navMonitorBtn: () => {
    const monitor = document.getElementById('listenerMonitor');
    if (monitor.style.display === 'none' || monitor.style.display === '') {
      monitor.style.display = 'block';
    } else {
      monitor.style.display = 'none';
    }
  },
  toggleDevDashboardBtn: () => toggleDevPanel()
  // ✅ FINAL CLEANUP
  // No trailing comma here
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

// Navigation tab wiring
document.getElementById('navCountBtn').addEventListener('click', () => activateTab('count'));
document.getElementById('navVaultBtn').addEventListener('click', () => activateTab('vault'));
document.getElementById('navToolsBtn').addEventListener('click', () => activateTab('tools'));
document.getElementById('navAuditBtn').addEventListener('click', () => activateTab('audit'));

function activateTab(target) {
  document.querySelectorAll('.tab-section').forEach(section => {
    if (section.id === target) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  document.querySelectorAll('.tablink').forEach(btn => {
    if (btn.dataset.target === target) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}
/**
 * Wiring Master Harvest - Live Button Enumeration
 */
function runWiringMasterHarvest() {
  const allButtons = document.querySelectorAll('button');
  console.log("🔎 Master Wiring Harvest — Total Buttons Found:", allButtons.length);
  allButtons.forEach(btn => {
    const id = btn.id || '(no id)';
    const wired = btn.hasAttribute('listener-attached') ? '✅ Wired' : '⚠️ Unwired';
    console.log(`${id} — ${wired}`);
  });
}

export { wireAllButtons, runWiringMasterHarvest, runFullSystemAudit };
window.runWiringMasterHarvest = runWiringMasterHarvest;

// Expose full audit function globally for console access
window.runFullSystemAudit = runFullSystemAudit;