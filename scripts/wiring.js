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

// ===============================
// Phase 19.5 — Resolver Bootstrap Linker Injection

// Full global exposure for master wiring stability
const buttonMap = {
    addItemBtn: () => window.addItemModal(),
    addLiveItemBtn: () => window.addLiveItem(),
    clearHistoryBtn: () => window.clearHistory(),
    clearLiveTableBtn: () => window.clearLiveTable(),
    clearSnapshotsBtn: () => window.clearSnapshots(),
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
    moreOptionsBtn: () => {
      document.getElementById("importExportControls").classList.toggle("hidden");
    },
    navAboutBtn: () => window.switchTab('about'),
    navAuditBtn: () => window.switchTab('audit'),
    navCountBtn: () => window.switchTab('count'),
    navInventoryBtn: () => window.switchTab('inventory'),
    navToolsBtn: () => window.switchTab('tools'),
    navVaultBtn: () => window.switchTab('vault'),
    navDeltaBtn: () => window.switchTab('deltaAnalyzer'),
    purgeLocalStorageBtn: () => window.purgeLocalStorage(),
    refreshAuditLogBtn: () => window.refreshAuditLog(),
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
    // === Delta Review Interface Buttons ===
    refreshDeltaView: () => {
      const data = window.auditArchive?.lastDeltaResults || [];
      window.renderDeltaReviewTable(data);
    },
    exportDeltaView: () => {
      const data = window.auditArchive?.lastDeltaResults || [];
      window.exportDeltaToCSV(data);
    },
    runDeltaAnalysis: () => window.performDeltaAnalysis(),
    exportDeltaCSV: () => window.exportMergedDeltaCSV(),
    // === Session Manager Wiring ===
    refreshSessionList: () => {
      const tbody = document.getElementById("sessionManagerTableBody");
      if (tbody) {
        tbody.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#888;'>Session manager temporarily disabled (audit rebuild in progress)</td></tr>";
      }
    },
    exportDeltaReportBtn: () => window.exportTools.exportDeltaReport(),
    // === Audit History Panel Buttons ===
    viewAuditHistoryBtn: () => {
      const panel = document.getElementById('auditHistoryPanel');
      if (!panel) return;

      const select = document.getElementById('auditHistorySelect');
      if (!select) return;

      // Clear previous options
      select.innerHTML = '<option value="">Select archived audit...</option>';

      const audits = window.auditArchive.listAudits();
      audits.forEach(timestamp => {
        const option = document.createElement('option');
        option.value = timestamp;
        option.textContent = timestamp;
        select.appendChild(option);
      });

      panel.classList.toggle('hidden');
    },
    loadSelectedAuditBtn: () => {
      const select = document.getElementById('auditHistorySelect');
      const selected = select.value;
      if (!selected) {
        alert("Please select an audit to load.");
        return;
      }

      const data = window.auditArchive.loadAudit(selected);
      if (!data) {
        alert("Audit not found.");
        return;
      }

      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `DeltaAudit_${selected}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    deleteSelectedAuditBtn: () => {
      const select = document.getElementById('auditHistorySelect');
      const selected = select.value;
      if (!selected) {
        alert("Please select an audit to delete.");
        return;
      }

      if (confirm(`Are you sure you want to delete audit: ${selected}?`)) {
        window.auditArchive.deleteAudit(selected);
        alert("Audit deleted.");
        document.getElementById('viewAuditHistoryBtn').click();
      }
    },
    // === Cloud Archive Sync Buttons ===
    uploadArchiveBtn: () => window.cloudArchiveSync.uploadArchive(),
    downloadArchiveBtn: () => window.cloudArchiveSync.downloadArchive(),
    // === Merge UI Buttons ===
    performMergeBtn: () => {
      const select = document.getElementById('mergeSessionSelect');
      const options = [...select.selectedOptions].map(opt => opt.value);
      if (options.length < 2) {
        alert("Please select at least 2 sessions to merge.");
        return;
      }
      const merged = window.auditArchive.mergeAudits(options);
      window._lastMergedAudit = merged;
      alert("✅ Merge complete. You may now export.");
    },
    exportMergedAuditBtn: () => {
      if (!window._lastMergedAudit) {
        alert("No merged audit available. Perform a merge first.");
        return;
      }
      const csv = window.auditArchive.generateMergedCSV(window._lastMergedAudit);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `MergedAudit_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  };

function wireAllButtons() {
  console.log("Wiring process starting...");

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

// ===============================
// Add Item Modal — Phase 2.5 Auto-Population Stability Patch


function addItemModal(scannedValue = '') {
  // Always fully rebuild modal for clean state
  const existingModal = document.getElementById('addItemModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'addItemModal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.background = '#fff';
  modal.style.padding = '20px';
  modal.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  modal.style.zIndex = '9999';
  modal.style.borderRadius = '8px';
  modal.innerHTML = `
    <h3>Add New Item</h3>
    <label>Scanned Value:</label><br>
    <input type="text" id="scannedValueInput" style="width:100%;padding:8px;margin-bottom:10px;" value="${scannedValue}"><br>
    <button id="saveItemBtn">Save</button>
    <button id="cancelItemBtn" style="margin-left:10px;">Cancel</button>
  `;
  document.body.appendChild(modal);

  document.getElementById('saveItemBtn').onclick = () => {
    const inputVal = document.getElementById('scannedValueInput').value.trim();
    console.log("Saved Item:", inputVal);
    alert("✅ Item Saved: " + inputVal);
    modal.remove();
  };

  document.getElementById('cancelItemBtn').onclick = () => {
    modal.remove();
  };
}

window.addItemModal = addItemModal;

// ===============================
// Smart Scan Classifier + Auto Prompt

// Phase 19.5 — Bootstrap Synchronization Injection

document.addEventListener("scanResolverReady", () => {
  window.handleScanInput = window.scanResolver.handleScanInput;
  console.log("✅ Scan Resolver fully linked to handleScanInput.");

  (function bootstrapGlobalSync() {
    function checkResolver() {
      if (window.scanResolver && typeof window.scanResolver.handleScanInput === 'function') {
        window.handleScanInput = window.scanResolver.handleScanInput;
        console.log("✅ Scan Resolver fully linked to handleScanInput (Global Stabilizer).");
      } else {
        console.warn("⏳ Waiting for scanResolver (Global Stabilizer)...");
        setTimeout(checkResolver, 200);
      }
    }
    checkResolver();
  })();
});

// ===============================
// Global Scan Capture Hook

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const activeInput = document.activeElement;
    if (activeInput && activeInput.tagName === 'INPUT') {
      const scannedValue = activeInput.value.trim();
      if (scannedValue) {
        console.log("Auto-captured scan:", scannedValue);
        handleScanInput(scannedValue);
        activeInput.value = '';
        activeInput.focus();  // maintain live scanning focus
      }
    }
  }
});

// ===============================
// Global Tab Controller — Floating Nav Logic

function switchTab(target) {
  const allSections = document.querySelectorAll('.tab-section');
  const allNavButtons = document.querySelectorAll('.tablink');

  allSections.forEach(section => {
    section.style.display = (section.id === target) ? 'block' : 'none';
  });

  allNavButtons.forEach(button => {
    const btnTarget = button.dataset.target;
    if (btnTarget === target) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    }
  });
}

window.switchTab = switchTab;

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

    if (typeof buttonMap.refreshSessionList === 'function') {
      console.log("🧬 Auto-refreshing Session Manager...");
      buttonMap.refreshSessionList();
    }
  }, 500);
});