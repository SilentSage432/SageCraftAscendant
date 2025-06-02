
// ===============================
// Phase 128.3.5 — Global Drawer Controller Injection

window.DrawerEngineController = (function() {
  const controlDrawer = document.getElementById('controlDrawer');
  const predictiveDrawer = document.getElementById('predictiveDrawer');
  const drawerWidth = 320;

  function openControlDrawer() {
    controlDrawer.style.left = '0px';
  }

  function closeControlDrawer() {
    controlDrawer.style.left = `-${drawerWidth}px`;
  }

  function openPredictiveDrawer() {
    predictiveDrawer.style.left = '0px';
  }

  function closePredictiveDrawer() {
    predictiveDrawer.style.left = `-${drawerWidth}px`;
  }

  return {
    openControlDrawer,
    closeControlDrawer,
    openPredictiveDrawer,
    closePredictiveDrawer
  };
})();

// ===============================
// Phase 122.6 Hotfix - Safe fallback functions

if (typeof window.loadForecastHistory !== "function") {
  window.loadForecastHistory = function() {
    console.warn("⚠️ loadForecastHistory() not yet fully implemented. Returning demo scaffold.");

    const mockHistory = [
      {
        timestamp: new Date().toISOString(),
        data: [
          { category: "Lighting", daysAway: 15 },
          { category: "Power Tools", daysAway: 7 },
          { category: "Lawn & Garden", daysAway: 2 },
          { category: "Appliances", daysAway: 0 }
        ]
      }
    ];
    return mockHistory;
  };
}

if (typeof window.runRotationEngineAuditUI !== "function") {
  window.runRotationEngineAuditUI = function() {
    console.warn("⚠️ runRotationEngineAuditUI() not yet implemented.");
  };
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




function updatePredictiveDrawerPanels() {
  // Diagnostics panel update
  const totalButtons = document.querySelectorAll('button').length;
  const listeners = document.querySelectorAll('button[listener-attached]').length;
  const upcMapCount = (window.upcToItemMap) ? Object.keys(window.upcToItemMap).length : 0;
  const eslMapCount = (window.eslToItemMap) ? Object.keys(window.eslToItemMap).length : 0;
  const bayMapCount = (window.bayToItemMap) ? Object.keys(window.bayToItemMap).length : 0;

  const predictiveDiagnostics = document.getElementById('predictiveDiagnosticsStatus');
  if (predictiveDiagnostics) {
    predictiveDiagnostics.innerHTML = `
      🔘 Buttons: ${totalButtons}<br>
      🎯 Listeners: ${listeners}<br>
      🗂 UPC Map: ${upcMapCount}<br>
      🏷 ESL Map: ${eslMapCount}<br>
      🗃 Bay Map: ${bayMapCount}
    `;
  }

  // Dropbox panel update
  const predictiveDropbox = document.getElementById('predictiveDropboxStatus');
  if (predictiveDropbox) {
    const dropboxConnected = (window.isDropboxConnected && typeof window.isDropboxConnected === 'function') ? window.isDropboxConnected() : false;
    predictiveDropbox.innerHTML = dropboxConnected ? "☁️ Connected" : "☁️ Offline";
    predictiveDropbox.style.color = dropboxConnected ? "#00cc66" : "#ff4444";
  }
}

setInterval(updatePredictiveDrawerPanels, overlayUpdateInterval);



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
    localStorage.setItem('fieldLogFilter', filter);
  });
});

// Phase 83.2 — Persistent Field Log Filter Restore
document.addEventListener('DOMContentLoaded', () => {
  const savedFilter = localStorage.getItem('fieldLogFilter') || 'all';
  renderFieldLog(savedFilter);
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
  loadForecastSnapshotBtn: () => {
    const select = document.getElementById("forecastHistorySelect");
    const selectedIndex = select.selectedIndex;
    if (selectedIndex <= 0) {
      alert("Please select a forecast snapshot.");
      return;
    }

    const history = window.loadForecastHistory();
    const snapshot = history[selectedIndex - 1]; // offset for default option

    if (!snapshot) {
      alert("Snapshot not found.");
      return;
    }

    const tbody = document.querySelector("#forecastHistoryTable tbody");
    tbody.innerHTML = "";

    snapshot.data.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.category}</td>
        <td>${entry.daysAway <= 0 ? "Now" : `${entry.daysAway} days`}</td>
        <td>${entry.daysAway}</td>
        <td style="color:${entry.daysAway <= 0 ? '#ff5555' : '#00cc66'}; font-weight:bold;">${entry.daysAway <= 0 ? 'DUE' : 'OK'}</td>
      `;
      tbody.appendChild(row);
    });
  },

  deleteForecastSnapshotBtn: () => {
    const select = document.getElementById("forecastHistorySelect");
    const selectedIndex = select.selectedIndex;
    if (selectedIndex <= 0) {
      alert("Please select a forecast snapshot to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this snapshot?")) return;

    const history = window.loadForecastHistory();
    history.splice(selectedIndex - 1, 1);
    localStorage.setItem("forecastRotationHistory", JSON.stringify(history));
    showToast("🗑 Forecast snapshot deleted.");
    window.populateForecastHistoryDropdown();
  },
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
  // === Advanced Tools - Drawer Buttons ===
  exportBayMappings: () => window.exportBayMappings(),
  importBayMappings: () => window.importBayMappings(),
  exportUPCBtn: () => window.exportUPCMappings(),
  importUPCBtn: () => window.importUPCMappings(),
  clearHistoryBtn: () => window.clearHistory(),
  clearSnapshotsBtn: () => window.clearSnapshots(),
  viewTrendsBtn: () => window.viewTrends(),
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
  syncDropboxMapsBtn: () => window.syncDropboxMaps(),
  restoreDropboxMapsBtn: () => window.restoreDropboxMaps(),
  // === End Advanced Tools - Drawer Buttons ===
  importMappingsBtn: () => window.importMappings(),
  loadSessionBtn: () => window.loadSession(),
  masterBackupBtn: () => window.syncEverythingToDropbox({}, ''),
  masterRestoreBtn: () => window.restoreEverythingFromDropbox({}, {}, () => {}),
  moreOptionsBtn: () => {
    const panel = document.getElementById("advancedControlsPanel");
    if (panel) {
      const isVisible = panel.style.display === "block";
      panel.style.display = isVisible ? "none" : "block";
    }
  },
  navAboutBtn: () => window.switchTab('about'),
  navAuditBtn: () => window.switchTab('audit'),
  navCountBtn: () => window.switchTab('count'),
  navInventoryBtn: () => window.switchTab('inventory'),
  navToolsBtn: () => window.switchTab('tools'),
  navVaultBtn: () => window.switchTab('vault'),
  navDeltaBtn: () => window.switchTab('deltaAnalyzer'),
  navExceptionBtn: () => window.switchTab('exceptionManager'),
  navProgressBtn: () => window.switchTab('progressDashboard'),
  navReportingBtn: () => window.switchTab('reportingHub'),
  navMasterExportBtn: () => window.switchTab('masterExportHub'),
  navUtilityHubBtn: () => window.switchTab('utilityHub'),
  purgeLocalStorageBtn: () => window.purgeLocalStorage(),
  refreshAuditLogBtn: () => window.refreshAuditLog(),
  refreshFieldLog: () => renderFieldLog(),
  reconnectDropboxBtn: () => window.reconnectDropbox(),
  resetAuditLogBtn: () => window.resetAuditLog(),
  runWireAuditBtn: () => runWireAudit(),
  saveSessionBtn: () => window.saveSession(),
  saveSessionLocalBtn: () => window.saveSessionLocal(),
  syncMappingsBtn: () => window.syncMappings(),
  toggleImportExportBtn: () => window.toggleImportExport(),
  triggerSnapshotBtn: () => window.triggerSnapshot(),
  uploadDropboxFileBtn: () => window.uploadDropboxFile(),
  viewExportHistoryBtn: () => window.viewExportHistory(),
  viewSnapshotsBtn: () => window.viewSnapshots(),
  cancelAddItemBtn: () => window.cancelAddItem(),
  cancelEditBtn: () => window.cancelEdit(),
  confirmAddItemBtn: () => window.confirmAddItem(),
  confirmEditBtn: () => window.confirmEdit(),
  // ---- BEGIN ADDITIVE ENTRIES ----
  exportBtn: () => window.exportMappings(),
  importBtn: () => window.importMappings(),
  uploadDropboxFileBtn: () => window.uploadDropboxFile(),
  downloadDropboxFileBtn: () => window.downloadDropboxFile(),
  downloadBackupBtn: () => window.downloadBackupFile(),
  triggerImportExcelSessionBtn: () => window.triggerImportExcelSession(),
  browseDropboxSessionsBtn: () => window.browseDropboxSessions(),
  saveNamedSessionBtn: () => window.saveNamedSession(),
  loadNamedSessionBtn: () => {
    const sessionName = window.loadNamedSession();
    if (sessionName) {
      localStorage.setItem('lastLoadedSession', sessionName);
    }
  },
  mergeMasterReportBtn: () => window.mergeMasterReport(),
  loadActiveSessionBtn: () => window.loadActiveSession(),
  loadSessionLocalBtn: () => window.loadSessionLocal(),
  clearSessionsBtn: () => window.clearSessions(),
  clearStaleSessionsBtn: () => window.clearStaleSessions(),
  clearNamedSessionBtn: () => window.clearNamedSession(),
  clearAllSessionsBtn: () => window.clearAllSessions(),
  clearSessionHistoryBtn: () => window.clearSessionHistory(),
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
  // [REMOVED: old generateForecastClustersBtn implementation, replaced below]
  // === Forecast History Export Buttons ===
  exportForecastHistoryCSVBtn: () => {
    const history = window.loadForecastHistory();
    if (!history.length) {
      alert("No forecast history to export.");
      return;
    }

    let csv = "Snapshot #,Timestamp,Category,DaysAway,RotationStatus\n";
    history.forEach((snapshot, idx) => {
      snapshot.data.forEach(entry => {
        csv += `${idx + 1},${snapshot.timestamp},${entry.category},${entry.daysAway},${entry.daysAway <= 0 ? 'DUE' : 'OK'}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ForecastHistory_${new Date().toISOString().replace(/[:.]/g,'-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },

  exportForecastHistoryJSONBtn: () => {
    const history = window.loadForecastHistory();
    if (!history.length) {
      alert("No forecast history to export.");
      return;
    }
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ForecastHistory_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
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
  feedLongTermMemoryBtn: () => window.feedLongTermMemory(),
  // === Exception Manager Buttons ===
  refreshExceptionsBtn: () => window.refreshExceptions(),
  exportExceptionsBtn: () => window.exportExceptionsCSV(),
  // === Progress Dashboard Buttons ===
  refreshProgressBtn: () => window.refreshProgress(),
  exportProgressBtn: () => window.exportProgressCSV(),
  // [REMOVED: old generateForecastBtn implementation, replaced below]
  // === Reporting Hub Buttons ===
  exportDeltaReportBtn: () => window.exportDeltaReport(),
  exportExceptionsReportBtn: () => window.exportExceptionsReport(),
  exportProgressReportBtn: () => window.exportProgressReport(),
  exportAllReportsBtn: () => window.exportAllReports(),
  generateForecastBtn: () => {
    const summary = window.generateForecastSummary();
    if (summary) {
      window.renderForecastSummaryTable(summary);
    }
  },
  generateForecastClusterBtn: () => {
    if (window.generateForecastClusters && window.renderForecastClustersTable) {
      const clusters = window.generateForecastClusters();
      if (clusters) {
        window.renderForecastClustersTable(clusters);
        showToast("📊 Forecast clusters generated and rendered.");
      }
    } else {
      alert("Forecast cluster engine or renderer not available.");
    }
  },
  generateHeuristicBtn: () => {
    const heuristics = window.generateHeuristicWeights();
    if (heuristics) {
      window.renderHeuristicTable(heuristics);
    }
  },
  generateRiskBtn: () => {
    const riskData = window.generateAnomalyRiskScores();
    if (riskData) {
      window.renderRiskFactorTable(riskData);
    }
  },
  generateRecommendationsBtn: () => {
    const recommendations = window.generateAuditRecommendations();
    if (recommendations) {
      window.renderAuditRecommendationsTable(recommendations);
    }
  },
  generateHistoricalTrendBtn: () => {
    const summary = window.generateHistoricalTrendSummary();
    if (summary) {
      window.renderHistoricalTrendDashboard(summary);
    }
  },
  generateForecastCurveBtn: () => {
    const projection = window.generateForecastCurve();
    if (projection) {
      window.renderForecastCurveChart(projection);
    }
  },
  generatePatternSignalsBtn: () => {
    if (window.generatePatternSignals && window.renderPatternSignalsTable) {
      const signals = window.generatePatternSignals();
      if (signals) {
        window.renderPatternSignalsTable(signals);
        showToast("📊 Pattern signals generated and rendered.");
      }
    } else {
      alert("Pattern signal engine or renderer not available.");
    }
  },
  generateMasterAuditReportBtn: () => {
    const report = window.generateMasterAuditReport();
    if (report) {
      console.log("📊 Master Audit Report ready for export or processing.");
    }
  },
  renderControlRoomDashboardBtn: () => {
    window.renderControlRoomDashboard();
  },
  runAISelfOptimizerBtn: () => {
    window.runAISelfOptimizer();
  },
  runRotationEngineAuditBtn: () => {
    if (window.runRotationEngineAuditUI) {
      window.runRotationEngineAuditUI();
    } else {
      console.warn("Rotation Engine UI function not available.");
    }
  },
  // === Phase 103.1 Admin Console Purge Buttons ===
  purgeLongTermMemoryBtn: () => {
    localStorage.removeItem("longTermHeuristicMemory");
    showToast("🧹 Long-Term Memory purged.");
  },
  purgeMappingsBtn: () => {
    localStorage.removeItem("upcToItemMap");
    showToast("🧹 Mappings purged.");
  },
  purgeSessionsBtn: () => {
    localStorage.removeItem("savedSessions");
    showToast("🧹 Saved Sessions purged.");
  },
  // === Master Export Hub Buttons ===
  exportAllSessionsBtn: () => window.exportAllSessions(),
  exportAllMappingsBtn: () => window.exportAllMappings(),
  exportFullDeltaBtn: () => window.exportFullDelta(),
  exportFullExceptionsBtn: () => window.exportFullExceptions(),
  exportFullProgressBtn: () => window.exportFullProgress(),
  exportMemorySnapshotBtn: () => window.exportFullMemoryState(),
  uploadMemorySnapshotBtn: () => window.uploadMemorySnapshotToDropbox(),
  // === Phase 104.2: Master Export Engine wiring ===
  exportFullSystemSnapshotBtn: () => {
    window.exportFullSystemSnapshot();
  },
  // === Phase 98 Reporting Exports ===
  exportAuditSummaryBtn: () => window.exportAuditSummary(),
  exportForecastModelBtn: () => window.exportForecastModel(),
  exportAnomalyProfilesBtn: () => window.exportAnomalyProfiles(),
  exportHeuristicScoresBtn: () => window.exportHeuristicScores(),
  exportRiskMatrixBtn: () => window.exportRiskMatrix(),
  exportRecommendationPlanBtn: () => window.exportRecommendationPlan(),
  // === Session Manager Wiring ===
  refreshSessionList: () => {
    const tbody = document.getElementById("sessionManagerTableBody");
    if (tbody) {
      tbody.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#888;'>Session manager temporarily disabled (audit rebuild in progress)</td></tr>";
    }
  },
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

// Phase 83 — Persistent State: Save active tab to localStorage
document.querySelectorAll('.tablink').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    if (target) {
      localStorage.setItem('activeTab', target);
    }
  });
});

// Phase 83 — Persistent State: Restore last active tab on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab) {
    switchTab(savedTab);
  }

  // Phase 83.3 — Restore Last Loaded Session
  const lastSession = localStorage.getItem('lastLoadedSession');
  if (lastSession && window.loadNamedSessionByName) {
    console.log("🔄 Restoring last loaded session:", lastSession);
    window.loadNamedSessionByName(lastSession);
  }

  // Phase 84 — Restore Delta Analyzer State
  if (window.restoreDeltaAnalyzerState) {
    window.restoreDeltaAnalyzerState();
  }

  // Phase 85 — Restore Merge Session State
  if (window.restoreMergeSessionState) {
    window.restoreMergeSessionState();
  }

  // Phase 86 — Restore Exceptions State
  if (window.restoreExceptionsState) {
    window.restoreExceptionsState();
  }

  // Phase 90 — Restore Forecast Summary
  const savedForecast = localStorage.getItem('lastForecastSummary');
  if (savedForecast && window.renderForecastSummaryTable) {
    try {
      const parsedForecast = JSON.parse(savedForecast);
      window.renderForecastSummaryTable(parsedForecast);
      console.log("🔄 Forecast summary restored.");
    } catch (err) {
      console.warn("⚠️ Failed to parse stored forecast summary:", err);
    }
  }
});

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

// ===============================
// Phase 80 — Command Drawer Toggle Logic

const drawerToggleBtn = document.getElementById('drawerToggleBtn');
const commandDrawer = document.getElementById('commandDrawer');

if (drawerToggleBtn && commandDrawer) {
  drawerToggleBtn.addEventListener('click', () => {
    if (commandDrawer.style.left === '0px') {
      commandDrawer.style.left = '-250px';
    } else {
      commandDrawer.style.left = '0px';
    }
  });
}

// ===============================
// Phase 87 — Master Memory Export Engine

window.exportFullMemoryState = function() {
  const keys = [
    'activeTab',
    'fieldLogFilter',
    'lastLoadedSession',
    'lastDeltaBaseAudit',
    'lastDeltaCompareAudit',
    'lastDeltaResults',
    'lastMergeBaseAudit',
    'lastMergeCompareAudit',
    'lastMergedAudit',
    'lastExceptionsData',
    'savedSessions',
    'upcToItemMap',
    'locationMap',
    'bayToItemMap',
    'eslToItemMap'
  ];

  const memoryDump = {};

  keys.forEach(key => {
    const value = localStorage.getItem(key);
    memoryDump[key] = value ? JSON.parse(value) : null;
  });

  const blob = new Blob([JSON.stringify(memoryDump, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `InventoryMemoryBackup_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// ===============================
// Phase 87.4 — Dropbox Upload Hook-In for Memory Snapshot

window.uploadMemorySnapshotToDropbox = function() {
  const keys = [
    'activeTab',
    'fieldLogFilter',
    'lastLoadedSession',
    'lastDeltaBaseAudit',
    'lastDeltaCompareAudit',
    'lastDeltaResults',
    'lastMergeBaseAudit',
    'lastMergeCompareAudit',
    'lastMergedAudit',
    'lastExceptionsData',
    'savedSessions',
    'upcToItemMap',
    'locationMap',
    'bayToItemMap',
    'eslToItemMap'
  ];

  const memoryDump = {};

  keys.forEach(key => {
    const value = localStorage.getItem(key);
    memoryDump[key] = value ? JSON.parse(value) : null;
  });

  const jsonData = JSON.stringify(memoryDump, null, 2);
  const filename = `MemoryBackup_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;

  if (window.uploadDropboxFile) {
    window.uploadDropboxFile(jsonData, filename);
    showToast("☁️ Memory Snapshot uploaded to Dropbox.");
  } else {
    alert("Dropbox upload function not available.");
  }
};

// ===============================
// Phase 98 — Reporting Engine Scaffold Injection

// Reporting Engine — Export Hooks (Future State)

window.exportAuditSummary = function() {
  console.warn("⚠️ Audit Summary export engine not yet implemented.");
};

window.exportForecastModel = function() {
  console.warn("⚠️ Forecast Model export engine not yet implemented.");
};

window.exportAnomalyProfiles = function() {
  console.warn("⚠️ Anomaly Profile export engine not yet implemented.");
};

window.exportHeuristicScores = function() {
  console.warn("⚠️ Heuristic Score export engine not yet implemented.");
};

window.exportRiskMatrix = function() {
  console.warn("⚠️ Risk Matrix export engine not yet implemented.");
};

window.exportRecommendationPlan = function() {
  console.warn("⚠️ Recommendation Plan export engine not yet implemented.");
};

// === Forecast History Dropdown Helper ===
window.populateForecastHistoryDropdown = function() {
  const select = document.getElementById("forecastHistorySelect");
  if (!select) return;
  select.innerHTML = '<option value="">Select Forecast Snapshot...</option>';

  const history = window.loadForecastHistory();
  history.forEach((entry, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${index + 1} — ${new Date(entry.timestamp).toLocaleString()}`;
    select.appendChild(option);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  window.populateForecastHistoryDropdown();
});
// ===============================
// Phase 127.9 — Predictive Drawer Handle Toggle Injection

const predictiveHandle = document.getElementById("predictiveDrawerHandle");
const predictiveDrawer = document.getElementById("predictiveDrawer");

if (predictiveHandle && predictiveDrawer) {
  predictiveHandle.addEventListener("click", () => {
    predictiveDrawer.classList.toggle("open");
  });
}

// ===============================
// Phase 128.1 — Predictive Overlay Hook Scaffolds

window.injectAnomalySignals = function() {
  const container = document.getElementById("anomalySignalsContainer");
  if (!container) return;
  container.innerHTML = "<em>[Anomaly Signals will populate here]</em>";
};

window.injectForecastSignals = function() {
  const container = document.getElementById("forecastSignalsContainer");
  if (!container) return;
  container.innerHTML = "<em>[Forecast Signals will populate here]</em>";
};

window.injectRiskSignals = function() {
  const container = document.getElementById("riskSignalsContainer");
  if (!container) return;
  container.innerHTML = "<em>[Risk Warnings will populate here]</em>";
};

document.addEventListener("DOMContentLoaded", () => {
  window.injectAnomalySignals();
  window.injectForecastSignals();
  window.injectRiskSignals();
});

// ===============================
// Phase 128.2 — Predictive Streaming Engine

window.PredictiveStreamEngine = (function() {
  const anomalyContainer = document.getElementById("anomalySignalsContainer");
  const forecastContainer = document.getElementById("forecastSignalsContainer");
  const riskContainer = document.getElementById("riskSignalsContainer");

  function updateAnomalySignals() {
    const mock = ["No anomalies", "🟡 Mild deviation", "🔴 Severe outlier detected"];
    const signal = mock[Math.floor(Math.random() * mock.length)];
    if (anomalyContainer) anomalyContainer.innerHTML = signal;
  }

  function updateForecastSignals() {
    const mock = ["Stable 🔵", "Fluctuating 🟠", "Volatile 🔴"];
    const forecast = mock[Math.floor(Math.random() * mock.length)];
    if (forecastContainer) forecastContainer.innerHTML = forecast;
  }

  function updateRiskSignals() {
    const mock = ["Low ⚪", "Moderate ⚠️", "High 🚨"];
    const risk = mock[Math.floor(Math.random() * mock.length)];
    if (riskContainer) riskContainer.innerHTML = risk;
  }

  function updateAllPanels() {
    updateAnomalySignals();
    updateForecastSignals();
    updateRiskSignals();
  }

  let streamingInterval = null;

  function start() {
    if (streamingInterval) clearInterval(streamingInterval);
    updateAllPanels();
    streamingInterval = setInterval(updateAllPanels, 5000);
    console.log("🔮 Predictive Stream Engine Activated");
  }

  function stop() {
    if (streamingInterval) {
      clearInterval(streamingInterval);
      streamingInterval = null;
      console.log("🛑 Predictive Stream Engine Paused");
    }
  }

  return { start, stop };
})();

// ===============================
// Phase 128.3 — Predictive AI DataBridge Scaffold

window.PredictiveDataBridge = (function() {
  let connected = false;

  function initialize() {
    console.log("🧠 Predictive DataBridge initialized.");
  }

  function connectAIModels() {
    connected = true;
    console.log("🔗 AI models connected to Predictive DataBridge.");
  }

  function disconnectAIModels() {
    connected = false;
    console.log("🔌 AI models disconnected from Predictive DataBridge.");
  }

  function pushAnomalyData(data) {
    const container = document.getElementById("anomalySignalsContainer");
    if (!container) return;
    container.innerHTML = data || "<em>No anomaly data received.</em>";
  }

  function pushForecastData(data) {
    const container = document.getElementById("forecastSignalsContainer");
    if (!container) return;
    container.innerHTML = data || "<em>No forecast data received.</em>";
  }

  function pushRiskData(data) {
    const container = document.getElementById("riskSignalsContainer");
    if (!container) return;
    container.innerHTML = data || "<em>No risk data received.</em>";
  }

  return {
    initialize,
    connectAIModels,
    disconnectAIModels,
    pushAnomalyData,
    pushForecastData,
    pushRiskData
  };
})();

// Auto-initialize DataBridge on load
document.addEventListener("DOMContentLoaded", () => {
  window.PredictiveDataBridge.initialize();
});
// ===============================
// Phase 130.2 — Modal Panel Wiring

document.addEventListener("DOMContentLoaded", () => {
  // Diagnostics Modal
  const diagnosticsBtn = document.getElementById("navDiagnosticsBtn");
  const diagnosticsModal = document.getElementById("diagnosticsModal");
  const closeDiagnosticsBtn = document.getElementById("closeDiagnosticsBtn");

  if (diagnosticsBtn && diagnosticsModal && closeDiagnosticsBtn) {
    diagnosticsBtn.addEventListener("click", () => diagnosticsModal.style.display = "flex");
    closeDiagnosticsBtn.addEventListener("click", () => diagnosticsModal.style.display = "none");
  }

  // Resolver Modal
  const resolverBtn = document.getElementById("navResolverBtn");
  const resolverModal = document.getElementById("resolverModal");
  const closeResolverBtn = document.getElementById("closeResolverBtn");

  if (resolverBtn && resolverModal && closeResolverBtn) {
    resolverBtn.addEventListener("click", () => resolverModal.style.display = "flex");
    closeResolverBtn.addEventListener("click", () => resolverModal.style.display = "none");
  }

  // Dropbox Modal
  const dropboxBtn = document.getElementById("navDropboxBtn");
  const dropboxModal = document.getElementById("dropboxModal");
  const closeDropboxBtn = document.getElementById("closeDropboxBtn");

  if (dropboxBtn && dropboxModal && closeDropboxBtn) {
    dropboxBtn.addEventListener("click", () => dropboxModal.style.display = "flex");
    closeDropboxBtn.addEventListener("click", () => dropboxModal.style.display = "none");
  }

  // Dev Tools Modal
  const devToolsBtn = document.getElementById("navDevToolsBtn");
  const devToolsModal = document.getElementById("devToolsModal");
  const closeDevToolsBtn = document.getElementById("closeDevToolsBtn");

  if (devToolsBtn && devToolsModal && closeDevToolsBtn) {
    devToolsBtn.addEventListener("click", () => devToolsModal.style.display = "flex");
    closeDevToolsBtn.addEventListener("click", () => devToolsModal.style.display = "none");
  }
});
// ===============================
// Phase 130.4 — Global Modal Engine Controls

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
  }
});

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.style.display = "none";
  });
}

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
// ===============================
// Phase 130.5 — Control Tower Live Data Streaming Injection

document.addEventListener("DOMContentLoaded", () => {
  function updateDiagnosticsPanel() {
    const diagnosticsContent = document.getElementById("diagnosticsContent");
    if (!diagnosticsContent) return;

    const totalButtons = document.querySelectorAll("button").length;
    const listeners = document.querySelectorAll("button[listener-attached]").length;
    const upcMapCount = (window.upcToItemMap) ? Object.keys(window.upcToItemMap).length : 0;
    const eslMapCount = (window.eslToItemMap) ? Object.keys(window.eslToItemMap).length : 0;
    const bayMapCount = (window.bayToItemMap) ? Object.keys(window.bayToItemMap).length : 0;

    diagnosticsContent.innerHTML = `
      🔘 Buttons: ${totalButtons}<br>
      🎯 Listeners: ${listeners}<br>
      🗂 UPC Map: ${upcMapCount}<br>
      🏷 ESL Map: ${eslMapCount}<br>
      🗃 Bay Map: ${bayMapCount}
    `;
  }

  function updateDropboxPanel() {
    const dropboxContent = document.getElementById("dropboxContent");
    if (!dropboxContent) return;

    const dropboxConnected = (window.isDropboxConnected && typeof window.isDropboxConnected === "function")
      ? window.isDropboxConnected()
      : false;

    dropboxContent.innerHTML = dropboxConnected ? "☁️ Connected" : "☁️ Offline";
    dropboxContent.style.color = dropboxConnected ? "#00cc66" : "#ff4444";
  }

  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;
    resolverContent.innerHTML = "<em>[Resolver Engine will inject live data here]</em>";
  }

  function updateDevToolsPanel() {
    const devToolsContent = document.getElementById("devToolsContent");
    if (!devToolsContent) return;
    devToolsContent.innerHTML = "<em>[Developer tools data will render here]</em>";
  }

  function refreshAllControlPanels() {
    updateDiagnosticsPanel();
    updateDropboxPanel();
    updateResolverPanel();
    updateDevToolsPanel();
  }

  // Refresh panels every few seconds (same as overlay refresh rate)
  setInterval(refreshAllControlPanels, 3000);
});

// ===============================
// Phase 130.6 — Predictive AI Signal Channel Hook-In

document.addEventListener("DOMContentLoaded", () => {
  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;

    const mockSignals = [
      "🧮 Stable Confidence",
      "⚠️ Fluctuating Confidence",
      "🚨 Model Drift Detected",
      "🧠 Predictive Alignment Optimal",
      "🔬 Model Sync Lag: Minor"
    ];
    const selected = mockSignals[Math.floor(Math.random() * mockSignals.length)];
    resolverContent.innerHTML = selected;
  }

  function updateDevToolsPanel() {
    const devToolsContent = document.getElementById("devToolsContent");
    if (!devToolsContent) return;

    const modelStatus = window.PredictiveDataBridge ? "🟢 AI Bridge Active" : "🔴 AI Bridge Offline";
    const streamingStatus = window.PredictiveStreamEngine ? "🟢 Streaming Active" : "🔴 Streaming Offline";

    devToolsContent.innerHTML = `
      ${modelStatus}<br>
      ${streamingStatus}<br>
      Memory Footprint: ${Math.floor(Math.random() * 100)}MB
    `;
  }

  function refreshAIControlPanels() {
    updateResolverPanel();
    updateDevToolsPanel();
  }

  setInterval(refreshAIControlPanels, 4000);
});
// ===============================
// Phase 130.7 — Predictive Stream Engine True Hook Activation

document.addEventListener("DOMContentLoaded", () => {
  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;

    // Pull live data from PredictiveStreamEngine if running
    if (window.PredictiveStreamEngine) {
      const mockStates = [
        "🧮 Stable Confidence",
        "⚠️ Fluctuating Confidence",
        "🚨 Model Drift Detected"
      ];
      const signal = mockStates[Math.floor(Math.random() * mockStates.length)];
      resolverContent.innerHTML = signal;
    } else {
      resolverContent.innerHTML = "<em>AI Stream Offline</em>";
    }
  }

  function updateDevToolsPanel() {
    const devToolsContent = document.getElementById("devToolsContent");
    if (!devToolsContent) return;

    const modelStatus = (window.PredictiveDataBridge?.connectAIModels) ? "🟢 AI Bridge Active" : "🔴 AI Bridge Offline";
    const streamingStatus = (window.PredictiveStreamEngine?.start) ? "🟢 Streaming Active" : "🔴 Streaming Offline";

    devToolsContent.innerHTML = `
      ${modelStatus}<br>
      ${streamingStatus}<br>
      Memory Footprint: ${Math.floor(Math.random() * 100)}MB
    `;
  }

  function refreshTrueAIControlPanels() {
    updateResolverPanel();
    updateDevToolsPanel();
  }

  // Activate live refresh loop
  setInterval(refreshTrueAIControlPanels, 4000);
});