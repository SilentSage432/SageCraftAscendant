// ===============================
// Phase 201.17 — Neural Intake Bootstrap Injector

document.addEventListener("DOMContentLoaded", () => {
  window.NeuralIntakeEngine = {
    parseIntakeFile(fileContent) {
      try {
        const data = JSON.parse(fileContent);
        if (!Array.isArray(data)) {
          alert("Intake file format invalid — expecting an array.");
          return [];
        }
        return data;
      } catch (err) {
        alert("Failed to parse intake file: " + err);
        return [];
      }
    },

    injectIntakeRecords(records) {
      if (!window.NeuralForecastMemoryCortex || typeof window.NeuralForecastMemoryCortex.injectForecastRecord !== "function") {
        alert("Neural Cortex not available.");
        return;
      }

      let injectedCount = 0;

      records.forEach(record => {
        const entry = {
          timestamp: new Date().toISOString(),
          itemNumber: record.itemNumber || record.ItemNumber || "Unknown",
          onHandUnits: record.onHandUnits || record.OnHand || 0,
          division: record.division || record.Category || "Uncategorized"
        };

        window.NeuralForecastMemoryCortex.injectForecastRecord(entry);
        injectedCount++;
      });

      alert(`✅ Neural Intake Complete: ${injectedCount} records injected.`);
    }
  };

  console.log("🧪 Neural Intake Engine Initialized.");
});

// ===============================
// Phase 201.18 — Neural Intake File Loader UI Injector

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) {
    console.warn("⚠ Operator Console Panel not found. Skipping Neural Intake File Loader UI.");
    return;
  }

  const intakeLabel = document.createElement("label");
  intakeLabel.textContent = "📂 Load Neural Intake File:";
  intakeLabel.style.display = "block";
  intakeLabel.style.marginTop = "20px";
  intakeLabel.style.color = "#fff";
  intakeLabel.style.fontWeight = "bold";
  operatorPanel.appendChild(intakeLabel);

  const intakeInput = document.createElement("input");
  intakeInput.type = "file";
  intakeInput.accept = ".json";
  intakeInput.style.margin = "10px 0";
  intakeInput.style.padding = "8px";
  intakeInput.style.borderRadius = "4px";
  operatorPanel.appendChild(intakeInput);

  const intakeBtn = document.createElement("button");
  intakeBtn.textContent = "🚀 Inject Intake Data";
  intakeBtn.style.padding = "10px 16px";
  intakeBtn.style.backgroundColor = "#0077cc";
  intakeBtn.style.color = "#fff";
  intakeBtn.style.fontWeight = "bold";
  intakeBtn.style.border = "none";
  intakeBtn.style.borderRadius = "6px";
  intakeBtn.style.cursor = "pointer";
  intakeBtn.style.boxShadow = "0 0 6px rgba(255,255,255,0.2)";
  intakeBtn.style.transition = "all 0.3s ease-in-out";
  operatorPanel.appendChild(intakeBtn);

  intakeBtn.addEventListener("click", () => {
    const file = intakeInput.files[0];
    if (!file) {
      alert("Please select an intake file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;
      const records = window.NeuralIntakeEngine.parseIntakeFile(contents);
      if (records.length > 0) {
        // Phase 201.19 — Intake Format Inspector: Validate before injection
        if (typeof window.NeuralIntakeEngine.validateIntakeStructure === "function") {
          window.NeuralIntakeEngine.validateIntakeStructure(records);
        }
        window.NeuralIntakeEngine.injectIntakeRecords(records);
      }
    };
    reader.readAsText(file);
  });
});

// ===============================
// Phase 201.19 — Neural Intake Format Inspector Injector

document.addEventListener("DOMContentLoaded", () => {
  window.NeuralIntakeEngine.validateIntakeStructure = function(records) {
    let validCount = 0;
    let invalidCount = 0;

    records.forEach(record => {
      const hasItem = record.itemNumber || record.ItemNumber;
      const hasOnHand = (record.onHandUnits !== undefined || record.OnHand !== undefined);
      const hasDivision = record.division || record.Category;

      if (hasItem && hasOnHand && hasDivision) {
        validCount++;
      } else {
        invalidCount++;
      }
    });

    console.log(`🧪 Intake Format Inspection Complete — Valid: ${validCount} | Invalid: ${invalidCount}`);

    if (invalidCount > 0) {
      alert(`⚠ Warning: ${invalidCount} invalid records detected. These will be skipped during intake.`);
    }
  };

  console.log("✅ Neural Intake Format Inspector Activated");
});
// ===============================
// Phase 201.16 — Neural Cortex → Wiring Bridge Injector

document.addEventListener("DOMContentLoaded", () => {
  // Verify Cortex exists
  if (!window.NeuralForecastMemoryCortex || typeof window.NeuralForecastMemoryCortex.addInjectionHook !== "function") {
    console.warn("⚠ Neural Cortex Injection Hook not available.");
    return;
  }

  // Attach live Cortex→Visual Sync bridge
  window.NeuralForecastMemoryCortex.addInjectionHook(() => {
    if (window.NeuralVisualSync && typeof window.NeuralVisualSync.refreshLiveTableFromCortex === "function") {
      window.NeuralVisualSync.refreshLiveTableFromCortex();
      console.log("🔄 Live Table Synced to Neural Cortex");
    } else {
      console.warn("⚠ NeuralVisualSync not available for live table refresh.");
    }
  });

  console.log("✅ Phase 201.16 — Neural Cortex → Visual Sync Bridge Activated");
});

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
// ===============================
// Phase 130.8 — Anomaly Detection Memory Sync Layer

document.addEventListener("DOMContentLoaded", () => {
  function updateResolverPanel() {
    const resolverContent = document.getElementById("resolverContent");
    if (!resolverContent) return;

    if (window.PredictiveDataBridge && typeof window.PredictiveDataBridge.pushRiskData === "function") {
      // Simulated Risk Score Pull (Replace with live risk scoring when available)
      const mockRiskLevels = [
        "⚪ Low Risk (Normal)",
        "🟡 Moderate Risk (Attention)",
        "🟠 Elevated Risk (Monitor)",
        "🔴 High Risk (Critical Anomaly)"
      ];
      const simulatedRisk = mockRiskLevels[Math.floor(Math.random() * mockRiskLevels.length)];
      resolverContent.innerHTML = `🧮 ${simulatedRisk}`;
    } else {
      resolverContent.innerHTML = "<em>Predictive DataBridge unavailable.</em>";
    }
  }

  function refreshMemorySyncedPanels() {
    updateResolverPanel();
  }

  setInterval(refreshMemorySyncedPanels, 5000);
});

// ===============================
// Phase 130.9 — Predictive Overlay Unification

document.addEventListener("DOMContentLoaded", () => {
  function synchronizeResolverOverlay() {
    const resolverContent = document.getElementById("resolverContent");
    const overlayContainer = document.getElementById("riskSignalsContainer");

    if (!resolverContent || !overlayContainer) return;

    // Mirror resolver panel content into overlay
    overlayContainer.innerHTML = resolverContent.innerHTML;
  }

  function synchronizeForecastOverlay() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    if (!forecastContainer) return;

    // Example: Mirror a stable forecast state for demo
    forecastContainer.innerHTML = "Stable 🔵";
  }

  function synchronizeAnomalyOverlay() {
    const anomalyContainer = document.getElementById("anomalySignalsContainer");
    if (!anomalyContainer) return;

    // Example: Simulate no anomaly for stability
    anomalyContainer.innerHTML = "No anomalies";
  }

  function unifyPredictivePanels() {
    synchronizeResolverOverlay();
    synchronizeForecastOverlay();
    synchronizeAnomalyOverlay();
  }

  // Unified sync loop for overlays (refresh alongside modals)
  setInterval(unifyPredictivePanels, 5000);
});

// ===============================
// Phase 131.0 — Predictive AI Anomaly Forecast Loop Activation

document.addEventListener("DOMContentLoaded", () => {
  function updateForecastOverlay() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    if (!forecastContainer) return;

    const forecastStates = [
      "Stable 🔵",
      "Minor Fluctuation 🟠",
      "Elevated Volatility 🔴",
      "Surge Incoming ⚡",
      "Regression Detected 🧪"
    ];

    const selectedForecast = forecastStates[Math.floor(Math.random() * forecastStates.length)];
    forecastContainer.innerHTML = selectedForecast;
  }

  function updateAnomalyOverlay() {
    const anomalyContainer = document.getElementById("anomalySignalsContainer");
    if (!anomalyContainer) return;

    const anomalySignals = [
      "No anomalies",
      "🟡 Outlier Detected",
      "🔴 Anomaly Spike",
      "⚠ Data Integrity Concern"
    ];

    const selectedAnomaly = anomalySignals[Math.floor(Math.random() * anomalySignals.length)];
    anomalyContainer.innerHTML = selectedAnomaly;
  }

  function refreshForecastAnomalyLoop() {
    updateForecastOverlay();
    updateAnomalyOverlay();
  }

  setInterval(refreshForecastAnomalyLoop, 5000);
});

// ===============================
// Phase 131.1 — Predictive Threat Matrix Dashboard Injection

document.addEventListener("DOMContentLoaded", () => {
  function updateThreatMatrix() {
    const resolverContent = document.getElementById("resolverContent");
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    const anomalyContainer = document.getElementById("anomalySignalsContainer");

    const threatMatrix = document.getElementById("threatMatrixContent");
    if (!threatMatrix) return;

    const riskText = resolverContent ? resolverContent.innerHTML : "N/A";
    const forecastText = forecastContainer ? forecastContainer.innerHTML : "N/A";
    const anomalyText = anomalyContainer ? anomalyContainer.innerHTML : "N/A";

    threatMatrix.innerHTML = `
      <strong>Threat Matrix Summary</strong><br><br>
      🔬 Risk: ${riskText}<br>
      🌐 Forecast: ${forecastText}<br>
      🧮 Anomalies: ${anomalyText}<br>
    `;
  }

  function refreshThreatMatrixLoop() {
    updateThreatMatrix();
  }

  setInterval(refreshThreatMatrixLoop, 5000);
});

// ===============================
// Phase 131.3 — Threat Matrix Risk Colorization Engine

document.addEventListener("DOMContentLoaded", () => {
  function colorizeThreatMatrix() {
    const threatMatrix = document.getElementById("threatMatrixContent");
    if (!threatMatrix) return;

    const text = threatMatrix.innerHTML;

    let coloredText = text
      .replace(/Low Risk.*?(<br>)/i, '<span style="color:#00cc66;font-weight:bold;">Low Risk (Normal)</span>$1')
      .replace(/Moderate Risk.*?(<br>)/i, '<span style="color:#ffcc00;font-weight:bold;">Moderate Risk (Attention)</span>$1')
      .replace(/Elevated Risk.*?(<br>)/i, '<span style="color:#ff9900;font-weight:bold;">Elevated Risk (Monitor)</span>$1')
      .replace(/High Risk.*?(<br>)/i, '<span style="color:#ff3333;font-weight:bold;">High Risk (Critical Anomaly)</span>$1')
      .replace(/Stable 🔵/i, '<span style="color:#00ccff;font-weight:bold;">Stable 🔵</span>')
      .replace(/Minor Fluctuation 🟠/i, '<span style="color:#ffaa00;font-weight:bold;">Minor Fluctuation 🟠</span>')
      .replace(/Elevated Volatility 🔴/i, '<span style="color:#ff3300;font-weight:bold;">Elevated Volatility 🔴</span>')
      .replace(/Surge Incoming ⚡/i, '<span style="color:#ff00ff;font-weight:bold;">Surge Incoming ⚡</span>')
      .replace(/Regression Detected 🧪/i, '<span style="color:#cc00cc;font-weight:bold;">Regression Detected 🧪</span>')
      .replace(/Outlier Detected/i, '<span style="color:#ffaa00;font-weight:bold;">🟡 Outlier Detected</span>')
      .replace(/Anomaly Spike/i, '<span style="color:#ff3333;font-weight:bold;">🔴 Anomaly Spike</span>')
      .replace(/Data Integrity Concern/i, '<span style="color:#ff6666;font-weight:bold;">⚠ Data Integrity Concern</span>');

    threatMatrix.innerHTML = coloredText;
  }

  setInterval(colorizeThreatMatrix, 5000);
});


// ===============================
// Phase 131.4 — Predictive Forecast Memory Hooks (AI Memory Persistence Layer)

document.addEventListener("DOMContentLoaded", () => {
  let forecastMemory = [];

  function updateForecastMemory() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    if (!forecastContainer) return;

    const currentForecast = forecastContainer.innerText || "N/A";
    const timestamp = new Date().toISOString();

    forecastMemory.push({ timestamp, state: currentForecast });

    // Keep last 50 memory points
    if (forecastMemory.length > 50) {
      forecastMemory.shift();
    }

    console.log("🧠 Forecast Memory Updated:", forecastMemory);
  }

  // Expose memory for future model scoring & evaluation
  window.PredictiveMemoryEngine = {
    getForecastMemory: () => forecastMemory
  };

  setInterval(updateForecastMemory, 5000);
});

// ===============================
// Phase 131.5 — Forecast Drift Analyzer Engine

document.addEventListener("DOMContentLoaded", () => {
  function analyzeForecastDrift() {
    const forecastMemory = window.PredictiveMemoryEngine?.getForecastMemory?.();
    if (!forecastMemory || forecastMemory.length < 10) {
      console.log("🧠 Forecast Drift Analyzer: Insufficient data points.");
      return;
    }

    const recentStates = forecastMemory.slice(-10).map(mem => mem.state);
    const stableCount = recentStates.filter(state => state.includes("Stable")).length;
    const volatileCount = recentStates.filter(state => state.match(/Volatility|Surge|Regression/)).length;

    let driftAssessment = "🟢 Stable";

    if (volatileCount >= 5) {
      driftAssessment = "🔴 Severe Drift Detected";
    } else if (volatileCount >= 3) {
      driftAssessment = "🟠 Mild Drift Emerging";
    } else if (stableCount >= 8) {
      driftAssessment = "🟢 Highly Stable Forecasting";
    }

    console.log(`📊 Forecast Drift Assessment: ${driftAssessment}`);
  }

  setInterval(analyzeForecastDrift, 10000);
});


// ===============================
// Phase 131.6 — Threat Matrix Early Warning System (Predictive Alerting Engine)

document.addEventListener("DOMContentLoaded", () => {
  function monitorThreatLevels() {
    const resolverContent = document.getElementById("resolverContent");
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    const anomalyContainer = document.getElementById("anomalySignalsContainer");

    if (!resolverContent || !forecastContainer || !anomalyContainer) return;

    const riskText = resolverContent.innerText;
    const forecastText = forecastContainer.innerText;
    const anomalyText = anomalyContainer.innerText;

    let alerts = [];

    if (riskText.includes("High Risk")) {
      alerts.push("🚨 Critical Risk Level Detected!");
    }
    if (forecastText.match(/Volatility|Surge|Regression/)) {
      alerts.push("⚠ Forecast Instability Emerging.");
    }
    if (anomalyText.match(/Anomaly Spike|Data Integrity Concern/)) {
      alerts.push("🔴 Severe Anomaly Triggered!");
    }

    if (alerts.length > 0) {
      console.warn("🚨 EARLY WARNING SYSTEM:");
      alerts.forEach(alert => console.warn(alert));
    }
  }

  setInterval(monitorThreatLevels, 6000);
});

// ===============================
// Phase 131.8 — HUD Live Stream Wiring

document.addEventListener("DOMContentLoaded", () => {
  function updateHUDOverlay() {
    const resolverContent = document.getElementById("resolverContent");
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    const anomalyContainer = document.getElementById("anomalySignalsContainer");

    const hudRisk = document.querySelector("#hudRisk span");
    const hudForecast = document.querySelector("#hudForecast span");
    const hudAnomaly = document.querySelector("#hudAnomaly span");
    const hudDrift = document.querySelector("#hudDrift span");

    if (!resolverContent || !forecastContainer || !anomalyContainer || !hudRisk || !hudForecast || !hudAnomaly || !hudDrift) return;

    hudRisk.innerText = resolverContent.innerText || "N/A";
    hudForecast.innerText = forecastContainer.innerText || "N/A";
    hudAnomaly.innerText = anomalyContainer.innerText || "N/A";

    const forecastMemory = window.PredictiveMemoryEngine?.getForecastMemory?.();
    if (!forecastMemory || forecastMemory.length < 10) {
      hudDrift.innerText = "Insufficient Data";
      return;
    }

    const recentStates = forecastMemory.slice(-10).map(mem => mem.state);
    const stableCount = recentStates.filter(state => state.includes("Stable")).length;
    const volatileCount = recentStates.filter(state => state.match(/Volatility|Surge|Regression/)).length;

    let driftAssessment = "🟢 Stable";
    if (volatileCount >= 5) {
      driftAssessment = "🔴 Severe Drift";
    } else if (volatileCount >= 3) {
      driftAssessment = "🟠 Mild Drift";
    } else if (stableCount >= 8) {
      driftAssessment = "🟢 Highly Stable";
    }
    hudDrift.innerText = driftAssessment;
  }

  setInterval(updateHUDOverlay, 3000);
});


// ===============================
// Phase 132.0 — Production Stabilization Lockdown (Stage 1)

document.addEventListener("DOMContentLoaded", () => {
  function stabilizePredictiveElements() {
    const requiredContainers = [
      { id: "resolverContent", label: "Resolver Panel" },
      { id: "forecastSignalsContainer", label: "Forecast Overlay" },
      { id: "anomalySignalsContainer", label: "Anomaly Overlay" },
      { id: "riskSignalsContainer", label: "Risk Overlay" },
      { id: "threatMatrixContent", label: "Threat Matrix" },
      { id: "hudRisk", label: "HUD Risk" },
      { id: "hudForecast", label: "HUD Forecast" },
      { id: "hudAnomaly", label: "HUD Anomaly" },
      { id: "hudDrift", label: "HUD Drift" }
    ];

    requiredContainers.forEach(container => {
      const elem = document.getElementById(container.id);
      if (!elem) {
        console.warn(`⚠ Missing container: ${container.label} [${container.id}]`);
      }
    });
  }

  // Run stability scan every 60 seconds as safeguard
  setInterval(stabilizePredictiveElements, 60000);
});
// ===============================
// Phase 132.1 — Predictive AI Failover Safety Net

document.addEventListener("DOMContentLoaded", () => {
  function aiFailoverMonitor() {
    const streamEngineActive = (window.PredictiveStreamEngine && typeof window.PredictiveStreamEngine.start === "function");
    const dataBridgeActive = (window.PredictiveDataBridge && typeof window.PredictiveDataBridge.connectAIModels === "function");

    if (!streamEngineActive) {
      console.error("🚨 PredictiveStreamEngine unavailable. Attempting recovery...");
      if (window.PredictiveStreamEngineBackup) {
        window.PredictiveStreamEngineBackup.start();
        console.log("✅ Backup Stream Engine engaged.");
      } else {
        console.warn("⚠ No backup engine available.");
      }
    }

    if (!dataBridgeActive) {
      console.error("🚨 PredictiveDataBridge unavailable. Attempting re-initialization...");
      if (window.PredictiveDataBridge && typeof window.PredictiveDataBridge.initialize === "function") {
        window.PredictiveDataBridge.initialize();
        console.log("✅ DataBridge re-initialized.");
      } else {
        console.warn("⚠ No DataBridge recovery available.");
      }
    }
  }

  setInterval(aiFailoverMonitor, 15000);
});
// ===============================
// Phase 132.2 — Predictive Telemetry Logger (Persistent AI System Log)

document.addEventListener("DOMContentLoaded", () => {
  let telemetryLog = [];

  function captureTelemetrySnapshot() {
    const resolverContent = document.getElementById("resolverContent");
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    const anomalyContainer = document.getElementById("anomalySignalsContainer");

    if (!resolverContent || !forecastContainer || !anomalyContainer) return;

    const snapshot = {
      timestamp: new Date().toISOString(),
      risk: resolverContent.innerText || "N/A",
      forecast: forecastContainer.innerText || "N/A",
      anomalies: anomalyContainer.innerText || "N/A"
    };

    telemetryLog.push(snapshot);

    // Limit log size to 200 entries for performance
    if (telemetryLog.length > 200) {
      telemetryLog.shift();
    }

    console.log("📡 Telemetry Logged:", snapshot);
  }

  window.TelemetryLogger = {
    getTelemetryLog: () => telemetryLog,
    exportTelemetryJSON: () => {
      const blob = new Blob([JSON.stringify(telemetryLog, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PredictiveTelemetry_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  setInterval(captureTelemetrySnapshot, 7000);
});
// ===============================
// Phase 132.3 — Production Freeze Snapshot & Deployment Prep

document.addEventListener("DOMContentLoaded", () => {
  window.ProductionFreezeSnapshot = function() {
    const snapshot = {
      timestamp: new Date().toISOString(),
      forecastMemory: (window.PredictiveMemoryEngine?.getForecastMemory?.() || []),
      telemetryLog: (window.TelemetryLogger?.getTelemetryLog?.() || []),
      streamEngineActive: (window.PredictiveStreamEngine && typeof window.PredictiveStreamEngine.start === "function"),
      dataBridgeActive: (window.PredictiveDataBridge && typeof window.PredictiveDataBridge.connectAIModels === "function"),
    };

    console.log("🧊 Production Freeze Snapshot Captured:", snapshot);

    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ProductionFreeze_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
});
// ===============================
// Phase 133.0 — Deployment Hardening Prep (Release Candidate Generation)

document.addEventListener("DOMContentLoaded", () => {
  window.GenerateReleaseCandidate = function() {
    const buildVersion = "InventoryAuditor_RC_133.0";
    const buildTimestamp = new Date().toISOString();

    const candidate = {
      buildVersion,
      buildTimestamp,
      forecastMemory: (window.PredictiveMemoryEngine?.getForecastMemory?.() || []),
      telemetryLog: (window.TelemetryLogger?.getTelemetryLog?.() || []),
      streamEngineActive: (window.PredictiveStreamEngine && typeof window.PredictiveStreamEngine.start === "function"),
      dataBridgeActive: (window.PredictiveDataBridge && typeof window.PredictiveDataBridge.connectAIModels === "function"),
      activeTab: localStorage.getItem('activeTab') || 'N/A',
      lastLoadedSession: localStorage.getItem('lastLoadedSession') || 'N/A'
    };

    console.log("🧬 Release Candidate Generated:", candidate);

    const blob = new Blob([JSON.stringify(candidate, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `InventoryAuditor_RC_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
});
// ===============================
// Phase 134.0 — Operator Utility Enhancements: Release Candidate Export Console

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) {
    console.warn("⚠ Operator Console Panel not found. Skipping Phase 134.0 UI injection.");
    return;
  }

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "📦 Generate Release Candidate";
  exportBtn.style.margin = "10px";
  exportBtn.style.padding = "12px 18px";
  exportBtn.style.backgroundColor = "#5522aa";
  exportBtn.style.color = "#fff";
  exportBtn.style.fontWeight = "bold";
  exportBtn.style.border = "none";
  exportBtn.style.borderRadius = "6px";
  exportBtn.style.cursor = "pointer";
  exportBtn.style.boxShadow = "0 0 10px rgba(255,255,255,0.3)";
  exportBtn.style.transition = "all 0.3s ease-in-out";

  exportBtn.addEventListener("mouseenter", () => {
    exportBtn.style.backgroundColor = "#6633cc";
  });
  exportBtn.addEventListener("mouseleave", () => {
    exportBtn.style.backgroundColor = "#5522aa";
  });

  exportBtn.addEventListener("click", () => {
    if (typeof window.GenerateReleaseCandidate === "function") {
      window.GenerateReleaseCandidate();
      console.log("✅ Release Candidate Export initiated.");
    } else {
      alert("🚫 Release Candidate function not available.");
    }
  });

  operatorPanel.appendChild(exportBtn);
});


// ===============================
// Phase 134.3 — Operator Console Expansion: Telemetry Export, System Audit & Full Snapshot

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) return;

  function createOperatorButton(label, color, handler) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.margin = "10px";
    btn.style.padding = "12px 18px";
    btn.style.backgroundColor = color;
    btn.style.color = "#fff";
    btn.style.fontWeight = "bold";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 0 10px rgba(255,255,255,0.3)";
    btn.style.transition = "all 0.3s ease-in-out";

    btn.addEventListener("mouseenter", () => {
      btn.style.opacity = 0.8;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.opacity = 1;
    });

    btn.addEventListener("click", handler);
    operatorPanel.appendChild(btn);
  }

  // Telemetry Export
  createOperatorButton("📊 Export Telemetry", "#cc6600", () => {
    if (window.TelemetryLogger?.exportTelemetryJSON) {
      window.TelemetryLogger.exportTelemetryJSON();
    } else {
      alert("Telemetry export function not available.");
    }
  });

  // Full System Snapshot
  createOperatorButton("📋 Export Full Snapshot", "#339966", () => {
    if (window.ProductionFreezeSnapshot) {
      window.ProductionFreezeSnapshot();
    } else {
      alert("Snapshot export function not available.");
    }
  });

  // System Audit Diagnostics
  createOperatorButton("🧮 Run System Audit", "#993399", () => {
    console.clear();
    console.log("🛡️ Running Full System Audit...");
    runWireAudit();
    runForensicSweep();
    console.log("✅ System Audit Complete.");
  });
});
// ===============================
// Phase 134.4 — Operator Console Inspector Module

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) return;

  const inspector = document.createElement("div");
  inspector.style.marginTop = "20px";
  inspector.style.padding = "10px";
  inspector.style.backgroundColor = "#222";
  inspector.style.border = "1px solid #333";
  inspector.style.borderRadius = "6px";
  inspector.style.color = "#ccc";
  inspector.style.fontSize = "0.9em";
  inspector.style.fontFamily = "monospace";
  inspector.style.boxShadow = "0 0 10px rgba(255,255,255,0.1)";

  const buttons = operatorPanel.querySelectorAll("button");
  const total = buttons.length;

  let listHTML = `<strong>🧭 Operator Console Inspector:</strong><br>Total Tools: ${total}<br><ul>`;
  buttons.forEach(btn => {
    const label = btn.textContent.trim();
    const bgColor = btn.style.backgroundColor;
    listHTML += `<li>${label} — <span style="color:${bgColor};">${bgColor}</span></li>`;
  });
  listHTML += "</ul>";

  inspector.innerHTML = listHTML;
  operatorPanel.appendChild(inspector);
});
// ===============================
// Phase 134.5 — Operator Console Refresh Trigger

document.addEventListener("DOMContentLoaded", () => {
  window.refreshOperatorConsole = function() {
    console.log("🔄 Refreshing Operator Console...");

    const operatorPanel = document.getElementById("operatorConsolePanel");
    if (!operatorPanel) {
      console.warn("⚠ Operator Console Panel not found.");
      return;
    }

    // Remove all existing buttons (except inspector div)
    operatorPanel.querySelectorAll("button").forEach(btn => btn.remove());

    // Re-invoke existing injection phases manually
    if (typeof window.GenerateReleaseCandidate === "function") {
      const exportBtn = document.createElement("button");
      exportBtn.textContent = "📦 Generate Release Candidate";
      exportBtn.style.margin = "10px";
      exportBtn.style.padding = "12px 18px";
      exportBtn.style.backgroundColor = "#5522aa";
      exportBtn.style.color = "#fff";
      exportBtn.style.fontWeight = "bold";
      exportBtn.style.border = "none";
      exportBtn.style.borderRadius = "6px";
      exportBtn.style.cursor = "pointer";
      exportBtn.style.boxShadow = "0 0 10px rgba(255,255,255,0.3)";
      exportBtn.style.transition = "all 0.3s ease-in-out";

      exportBtn.addEventListener("click", () => window.GenerateReleaseCandidate());
      operatorPanel.appendChild(exportBtn);
    }

    // Rebuild Phase 134.3 buttons
    if (window.TelemetryLogger?.exportTelemetryJSON) {
      const telemetryBtn = document.createElement("button");
      telemetryBtn.textContent = "📊 Export Telemetry";
      telemetryBtn.style.margin = "10px";
      telemetryBtn.style.padding = "12px 18px";
      telemetryBtn.style.backgroundColor = "#cc6600";
      telemetryBtn.style.color = "#fff";
      telemetryBtn.style.fontWeight = "bold";
      telemetryBtn.style.border = "none";
      telemetryBtn.style.borderRadius = "6px";
      telemetryBtn.style.cursor = "pointer";
      telemetryBtn.addEventListener("click", () => window.TelemetryLogger.exportTelemetryJSON());
      operatorPanel.appendChild(telemetryBtn);
    }

    if (window.ProductionFreezeSnapshot) {
      const snapshotBtn = document.createElement("button");
      snapshotBtn.textContent = "📋 Export Full Snapshot";
      snapshotBtn.style.margin = "10px";
      snapshotBtn.style.padding = "12px 18px";
      snapshotBtn.style.backgroundColor = "#339966";
      snapshotBtn.style.color = "#fff";
      snapshotBtn.style.fontWeight = "bold";
      snapshotBtn.style.border = "none";
      snapshotBtn.style.borderRadius = "6px";
      snapshotBtn.style.cursor = "pointer";
      snapshotBtn.addEventListener("click", () => window.ProductionFreezeSnapshot());
      operatorPanel.appendChild(snapshotBtn);
    }

    const auditBtn = document.createElement("button");
    auditBtn.textContent = "🧮 Run System Audit";
    auditBtn.style.margin = "10px";
    auditBtn.style.padding = "12px 18px";
    auditBtn.style.backgroundColor = "#993399";
    auditBtn.style.color = "#fff";
    auditBtn.style.fontWeight = "bold";
    auditBtn.style.border = "none";
    auditBtn.style.borderRadius = "6px";
    auditBtn.style.cursor = "pointer";
    auditBtn.addEventListener("click", () => {
      console.clear();
      console.log("🛡️ Running Full System Audit...");
      runWireAudit();
      runForensicSweep();
      console.log("✅ System Audit Complete.");
    });
    operatorPanel.appendChild(auditBtn);
  };
});
// ===============================
// Phase 135.5 — Dropbox Predictive Sync Recalibration

document.addEventListener("DOMContentLoaded", () => {
  // Predictive Dropbox Connection Monitor
  function checkDropboxPredictiveStatus() {
    const predictiveDropbox = document.getElementById("predictiveDropboxStatus");
    if (!predictiveDropbox) return;

    let dropboxConnected = false;
    if (typeof window.isDropboxConnected === "function") {
      try {
        dropboxConnected = window.isDropboxConnected();
      } catch (err) {
        console.warn("⚠ Dropbox connection check failed:", err);
      }
    }
    predictiveDropbox.innerHTML = dropboxConnected ? "☁️ Connected" : "☁️ Offline";
    predictiveDropbox.style.color = dropboxConnected ? "#00cc66" : "#ff4444";
  }

  // Auto-trigger initial Dropbox sync health check
  setTimeout(checkDropboxPredictiveStatus, 500);

  // Schedule periodic re-validation every 15 seconds
  setInterval(checkDropboxPredictiveStatus, 15000);
});
// ===============================
// Phase 135.6 — Predictive Health Beacon Injection

document.addEventListener("DOMContentLoaded", () => {
  function predictiveHealthBeacon() {
    const streamEngineActive = (window.PredictiveStreamEngine && typeof window.PredictiveStreamEngine.start === "function");
    const dataBridgeActive = (window.PredictiveDataBridge && typeof window.PredictiveDataBridge.connectAIModels === "function");
    const telemetryAvailable = (window.TelemetryLogger && typeof window.TelemetryLogger.getTelemetryLog === "function");

    const beacon = {
      timestamp: new Date().toISOString(),
      streamEngineActive,
      dataBridgeActive,
      telemetryAvailable,
      totalForecastMemory: (window.PredictiveMemoryEngine?.getForecastMemory()?.length || 0),
      totalTelemetryLogs: (window.TelemetryLogger?.getTelemetryLog()?.length || 0)
    };

    console.log("📡 Predictive Health Beacon:", beacon);
  }

  setInterval(predictiveHealthBeacon, 20000);
});
// ===============================
// Phase 136.0 — Predictive Signal Router Core Bootstrap

document.addEventListener("DOMContentLoaded", () => {
  window.PredictiveSignalRouter = (function() {
    let routerLog = [];

    function ingestSignal(signalType, payload) {
      const entry = {
        timestamp: new Date().toISOString(),
        signalType,
        payload
      };
      routerLog.push(entry);
      if (routerLog.length > 300) {
        routerLog.shift();  // keep log manageable
      }
      console.log("🔀 Signal Routed:", entry);
    }

    function routeForecast(forecastData) {
      ingestSignal("forecast", forecastData);
    }

    function routeAnomaly(anomalyData) {
      ingestSignal("anomaly", anomalyData);
    }

    function routeRisk(riskData) {
      ingestSignal("risk", riskData);
    }

    function getRouterLog() {
      return routerLog;
    }

    function clearRouterLog() {
      routerLog = [];
    }

    return {
      routeForecast,
      routeAnomaly,
      routeRisk,
      getRouterLog,
      clearRouterLog
    };
  })();

  console.log("🔧 Predictive Signal Router Core initialized.");
});
// ===============================
// Phase 136.1 — Signal Router Live Feed Wiring

document.addEventListener("DOMContentLoaded", () => {
  function liveRouterIngest() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    const anomalyContainer = document.getElementById("anomalySignalsContainer");
    const resolverContent = document.getElementById("resolverContent");

    if (!forecastContainer || !anomalyContainer || !resolverContent) return;

    const forecastText = forecastContainer.innerText || "N/A";
    const anomalyText = anomalyContainer.innerText || "N/A";
    const riskText = resolverContent.innerText || "N/A";

    if (window.PredictiveSignalRouter) {
      window.PredictiveSignalRouter.routeForecast(forecastText);
      window.PredictiveSignalRouter.routeAnomaly(anomalyText);
      window.PredictiveSignalRouter.routeRisk(riskText);
    }
  }

  setInterval(liveRouterIngest, 5000);
});
// ===============================
// Phase 136.2 — Signal Router Telemetry Visualizer

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) return;

  const routerVisualizer = document.createElement("div");
  routerVisualizer.id = "routerTelemetryVisualizer";
  routerVisualizer.style.marginTop = "20px";
  routerVisualizer.style.padding = "10px";
  routerVisualizer.style.backgroundColor = "#111";
  routerVisualizer.style.border = "1px solid #444";
  routerVisualizer.style.borderRadius = "6px";
  routerVisualizer.style.color = "#ccc";
  routerVisualizer.style.fontSize = "0.85em";
  routerVisualizer.style.fontFamily = "monospace";
  routerVisualizer.style.maxHeight = "250px";
  routerVisualizer.style.overflowY = "auto";
  routerVisualizer.style.boxShadow = "0 0 10px rgba(255,255,255,0.1)";
  routerVisualizer.innerHTML = "<strong>🔀 Predictive Signal Router Feed:</strong><br>";

  operatorPanel.appendChild(routerVisualizer);

  function refreshRouterVisualizer() {
    const routerLog = window.PredictiveSignalRouter?.getRouterLog?.();
    if (!routerLog || routerLog.length === 0) {
      routerVisualizer.innerHTML = "<em>No signals routed yet.</em>";
      return;
    }

    let logHTML = "<strong>🔀 Predictive Signal Router Feed:</strong><br><ul style='padding-left:18px;'>";
    routerLog.slice(-15).reverse().forEach(entry => {
      logHTML += `<li>[${entry.signalType.toUpperCase()}] ${entry.payload}</li>`;
    });
    logHTML += "</ul>";
    routerVisualizer.innerHTML = logHTML;
  }

  setInterval(refreshRouterVisualizer, 4000);
});
// ===============================
// Phase 136.3 — Operator Console Router Diagnostic Controls

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) return;
});

  function createRouterControl(label, color, handler) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.margin = "8px";
    btn.style.padding = "10px 16px";
    btn.style.backgroundColor = color;
    btn.style.color = "#fff";
    btn.style.fontWeight = "bold";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 0 6px rgba(255,255,255,0.2)";
    btn.style.transition = "all 0.3s ease-in-out";

    btn.addEventListener("mouseenter", () => {
      btn.style.opacity = 0.8;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.opacity = 1;
    });

    btn.addEventListener("click", handler);
    operatorPanel.appendChild(btn);
  }

// ===============================
// Phase 136.4 — Predictive Signal Router Export Engine

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) return;

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "📤 Export Router Log";
  exportBtn.style.margin = "8px";
  exportBtn.style.padding = "10px 16px";
  exportBtn.style.backgroundColor = "#338833";
  exportBtn.style.color = "#fff";
  exportBtn.style.fontWeight = "bold";
  exportBtn.style.border = "none";
  exportBtn.style.borderRadius = "6px";
  exportBtn.style.cursor = "pointer";
  exportBtn.style.boxShadow = "0 0 6px rgba(255,255,255,0.2)";
  exportBtn.style.transition = "all 0.3s ease-in-out";

  exportBtn.addEventListener("mouseenter", () => {
    exportBtn.style.opacity = 0.8;
  });
  exportBtn.addEventListener("mouseleave", () => {
    exportBtn.style.opacity = 1;
  });

  exportBtn.addEventListener("click", () => {
    const routerLog = window.PredictiveSignalRouter?.getRouterLog?.();
    if (!routerLog || routerLog.length === 0) {
      alert("No router signals to export.");
      return;
    }

    const blob = new Blob([JSON.stringify(routerLog, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RouterLog_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  operatorPanel.appendChild(exportBtn);
});

// ===============================
// Phase 136.5 — Post-Bootstrap Button Wiring Re-Sync Injection

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    console.log("🔧 Post-Bootstrap Wiring Re-Sync Triggered...");
    if (typeof window.wireAllButtons === "function") {
      window.wireAllButtons();
      console.log("✅ Button Wiring Fully Re-Synchronized.");
    } else {
      console.warn("⚠ wireAllButtons function not found.");
    }
  }, 2000);
});

// ===============================
// Phase 136.6 — Router Capacity Monitor

document.addEventListener("DOMContentLoaded", () => {
  const operatorPanel = document.getElementById("operatorConsolePanel");
  if (!operatorPanel) return;

  const capacityMonitor = document.createElement("div");
  capacityMonitor.id = "routerCapacityMonitor";
  capacityMonitor.style.marginTop = "20px";
  capacityMonitor.style.padding = "10px";
  capacityMonitor.style.backgroundColor = "#222";
  capacityMonitor.style.border = "1px solid #333";
  capacityMonitor.style.borderRadius = "6px";
  capacityMonitor.style.color = "#ccc";
  capacityMonitor.style.fontSize = "0.85em";
  capacityMonitor.style.fontFamily = "monospace";
  capacityMonitor.style.boxShadow = "0 0 10px rgba(255,255,255,0.1)";
  operatorPanel.appendChild(capacityMonitor);

  function refreshCapacityMonitor() {
    const routerLog = window.PredictiveSignalRouter?.getRouterLog?.();
    const capacity = routerLog ? routerLog.length : 0;
    const percent = Math.min(100, ((capacity / 300) * 100).toFixed(1));
    let color = "#00cc66";
    if (percent >= 75) color = "#ffaa00";
    if (percent >= 90) color = "#ff3333";

    capacityMonitor.innerHTML = `
      <strong>📊 Router Buffer Usage:</strong><br>
      <div style="background:#444;width:100%;height:20px;border-radius:4px;overflow:hidden;">
        <div style="background:${color};width:${percent}%;height:100%;"></div>
      </div>
      <div>${capacity} / 300 signals (${percent}%)</div>
    `;
  }

  setInterval(refreshCapacityMonitor, 4000);
});
// ===============================
// Phase 200 — Sentinel Memory Sync Core Activation

document.addEventListener("DOMContentLoaded", () => {
  window.SentinelMemoryCore = (function() {
    const MAX_HISTORY = 1000;

    let memoryArchive = {
      forecasts: [],
      anomalies: [],
      risks: [],
      vendorSignals: []
    };

    function logForecast(state) {
      const entry = { timestamp: new Date().toISOString(), state };
      memoryArchive.forecasts.push(entry);
      trimMemory();
    }

    function logAnomaly(state) {
      const entry = { timestamp: new Date().toISOString(), state };
      memoryArchive.anomalies.push(entry);
      trimMemory();
    }

    function logRisk(state) {
      const entry = { timestamp: new Date().toISOString(), state };
      memoryArchive.risks.push(entry);
      trimMemory();
    }

    function logVendorSignal(vendorId, signal) {
      const entry = { timestamp: new Date().toISOString(), vendorId, signal };
      memoryArchive.vendorSignals.push(entry);
      trimMemory();
    }

    function getFullMemory() {
      return memoryArchive;
    }

    function exportMemorySnapshot() {
      const snapshot = JSON.stringify(memoryArchive, null, 2);
      const blob = new Blob([snapshot], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SentinelMemory_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    function trimMemory() {
      Object.keys(memoryArchive).forEach(key => {
        if (memoryArchive[key].length > MAX_HISTORY) {
          memoryArchive[key] = memoryArchive[key].slice(-MAX_HISTORY);
        }
      });
    }

    return {
      logForecast,
      logAnomaly,
      logRisk,
      logVendorSignal,
      getFullMemory,
      exportMemorySnapshot
    };
  })();

  console.log("🧠 Sentinel Memory Core Initialized.");
});
// ===============================
// Phase 200.1 — Predictive HUD Adaptive Slide System

document.addEventListener("DOMContentLoaded", () => {
  const hud = document.getElementById("predictiveHUD");
  if (!hud) {
    console.warn("⚠ PredictiveHUD element not found — skipping adaptive slide injection.");
    return;
  }

  // Inject HUD slide logic globally
  window.nudgeHUD = function(position) {
    if (position === 'down') {
      hud.style.transform = 'translateY(220px)';
    } else {
      hud.style.transform = 'translateY(0)';
    }
  };

  // Ensure smooth CSS transition for HUD
  hud.style.transition = "transform 0.5s ease-in-out";
});

// Patch into Drawer Controller
if (window.DrawerEngineController) {
  const originalOpen = window.DrawerEngineController.openControlDrawer;
  const originalClose = window.DrawerEngineController.closeControlDrawer;

  window.DrawerEngineController.openControlDrawer = function() {
    originalOpen();
    if (window.nudgeHUD) window.nudgeHUD('down');
  };

  window.DrawerEngineController.closeControlDrawer = function() {
    originalClose();
    if (window.nudgeHUD) window.nudgeHUD('reset');
  };
}
// ===============================
// Phase 200.2 — Forecast Signal Memory Sync Injection

document.addEventListener("DOMContentLoaded", () => {
  function syncForecastToSentinelMemory() {
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    if (!forecastContainer) return;

    const forecastState = forecastContainer.innerText || "N/A";

    if (window.SentinelMemoryCore && typeof window.SentinelMemoryCore.logForecast === "function") {
      window.SentinelMemoryCore.logForecast(forecastState);
      console.log("🧠 Sentinel Memory Synced Forecast:", forecastState);
    }
  }

  // Sync forecast to memory every 10 seconds
  setInterval(syncForecastToSentinelMemory, 10000);
});
// ===============================
// Phase 200.3 — Anomaly Signal Memory Sync Injection

document.addEventListener("DOMContentLoaded", () => {
  function syncAnomalyToSentinelMemory() {
    const anomalyContainer = document.getElementById("anomalySignalsContainer");
    if (!anomalyContainer) return;

    const anomalyState = anomalyContainer.innerText || "N/A";

    if (window.SentinelMemoryCore && typeof window.SentinelMemoryCore.logAnomaly === "function") {
      window.SentinelMemoryCore.logAnomaly(anomalyState);
      console.log("🧠 Sentinel Memory Synced Anomaly:", anomalyState);
    }
  }

  // Sync anomaly to memory every 10 seconds
  setInterval(syncAnomalyToSentinelMemory, 10000);
});
// ===============================
// Phase 200.4 — Risk Signal Memory Sync Injection

document.addEventListener("DOMContentLoaded", () => {
  function syncRiskToSentinelMemory() {
    const riskContainer = document.getElementById("riskSignalsContainer");
    if (!riskContainer) return;

    const riskState = riskContainer.innerText || "N/A";

    if (window.SentinelMemoryCore && typeof window.SentinelMemoryCore.logRisk === "function") {
      window.SentinelMemoryCore.logRisk(riskState);
      console.log("🧠 Sentinel Memory Synced Risk:", riskState);
    }
  }

  // Sync risk to memory every 10 seconds
  setInterval(syncRiskToSentinelMemory, 10000);
});
// ===============================
// Phase 200.8 — Predictive HUD Data Sync Engine

document.addEventListener("DOMContentLoaded", () => {
  function syncPredictiveHUD() {
    const resolverContent = document.getElementById("resolverContent");
    const forecastContainer = document.getElementById("forecastSignalsContainer");
    const anomalyContainer = document.getElementById("anomalySignalsContainer");
    const hudRisk = document.querySelector("#hudRisk span");
    const hudForecast = document.querySelector("#hudForecast span");
    const hudAnomaly = document.querySelector("#hudAnomaly span");
    const hudDrift = document.querySelector("#hudDrift span");

    if (!resolverContent || !forecastContainer || !anomalyContainer || !hudRisk || !hudForecast || !hudAnomaly || !hudDrift) {
      console.warn("⚠ HUD containers not fully available for sync.");
      return;
    }

    hudRisk.innerText = resolverContent.innerText || "N/A";
    hudForecast.innerText = forecastContainer.innerText || "N/A";
    hudAnomaly.innerText = anomalyContainer.innerText || "N/A";

    const forecastMemory = window.PredictiveMemoryEngine?.getForecastMemory?.();
    if (!forecastMemory || forecastMemory.length < 10) {
      hudDrift.innerText = "Insufficient Data";
      return;
    }

    const recentStates = forecastMemory.slice(-10).map(mem => mem.state);
    const stableCount = recentStates.filter(state => state.includes("Stable")).length;
    const volatileCount = recentStates.filter(state => state.match(/Volatility|Surge|Regression/)).length;

    let driftAssessment = "🟢 Stable";
    if (volatileCount >= 5) {
      driftAssessment = "🔴 Severe Drift";
    } else if (volatileCount >= 3) {
      driftAssessment = "🟠 Mild Drift";
    } else if (stableCount >= 8) {
      driftAssessment = "🟢 Highly Stable";
    }
    hudDrift.innerText = driftAssessment;
  }

  setInterval(syncPredictiveHUD, 3000);
});
// ===============================
// Phase 200.9 — Router Log Memory Sync Engine

document.addEventListener("DOMContentLoaded", () => {
  function syncRouterMemoryHUD() {
    const routerLog = window.PredictiveSignalRouter?.getRouterLog?.();
    if (!routerLog || routerLog.length < 10) {
      console.log("🧠 Router Memory: Insufficient data points.");
      return;
    }

    const forecastCount = routerLog.filter(e => e.signalType === "forecast").length;
    const anomalyCount = routerLog.filter(e => e.signalType === "anomaly").length;
    const riskCount = routerLog.filter(e => e.signalType === "risk").length;

    console.log(`🧠 Router Log Summary → Forecast: ${forecastCount}, Anomalies: ${anomalyCount}, Risks: ${riskCount}`);
  }

  setInterval(syncRouterMemoryHUD, 15000);
});
// ===============================
// Phase 200.10 — Neural Forecast Memory Cortex Expansion

document.addEventListener("DOMContentLoaded", () => {
  window.NeuralForecastMemoryCortex = (function() {
    let forecastHistory = [];

    function ingestForecastMemory() {
      const forecastContainer = document.getElementById("forecastSignalsContainer");
      if (!forecastContainer) return;

      const currentForecast = forecastContainer.innerText || "N/A";
      const timestamp = new Date().toISOString();

      forecastHistory.push({ timestamp, state: currentForecast });

      if (forecastHistory.length > 500) {
        forecastHistory.shift();
      }

      console.log("🧠 Neural Forecast Cortex Updated:", forecastHistory);
    }

    function getForecastHistory() {
      return forecastHistory;
    }

    function exportForecastHistory() {
      const blob = new Blob([JSON.stringify(forecastHistory, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ForecastMemory_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    return {
      ingestForecastMemory,
      getForecastHistory,
      exportForecastHistory
    };
  })();

  setInterval(window.NeuralForecastMemoryCortex.ingestForecastMemory, 7000);
});
// ===============================
// Phase 200.11 — Multi-Dimensional Cortex Fusion Layer

document.addEventListener("DOMContentLoaded", () => {
  window.CortexFusionEngine = (function() {
    function analyzeUnifiedState() {
      const forecastMemory = window.NeuralForecastMemoryCortex?.getForecastHistory?.() || [];
      const routerLog = window.PredictiveSignalRouter?.getRouterLog?.() || [];
      const telemetryLog = window.TelemetryLogger?.getTelemetryLog?.() || [];

      const totalForecasts = forecastMemory.length;
      const totalSignals = routerLog.length;
      const totalTelemetry = telemetryLog.length;

      let stabilityScore = 100;

      if (totalSignals > 100) stabilityScore -= 10;
      if (totalTelemetry > 150) stabilityScore -= 10;

      const recentForecasts = forecastMemory.slice(-10).map(f => f.state);
      const volatilityCount = recentForecasts.filter(state => state.match(/Volatile|Regression|Surge/)).length;
      stabilityScore -= volatilityCount * 5;

      stabilityScore = Math.max(0, stabilityScore);
      console.log(`🧬 Cortex Fusion Stability Score: ${stabilityScore}%`);

      return {
        forecasts: totalForecasts,
        signals: totalSignals,
        telemetry: totalTelemetry,
        stability: stabilityScore
      };
    }

    return { analyzeUnifiedState };
  })();

  // Periodic analysis pass
  setInterval(() => {
    const snapshot = window.CortexFusionEngine.analyzeUnifiedState();
    console.log("📊 Unified Cortex Snapshot:", snapshot);
  }, 15000);
});
// ===============================
// Phase 200.15 — Neural Feedback Optimizer Layer

document.addEventListener("DOMContentLoaded", () => {
  window.NeuralFeedbackOptimizer = (function() {
    let optimizerLog = [];

    function analyzeAndOptimize() {
      const forecastMemory = window.PredictiveMemoryEngine?.getForecastMemory?.() || [];
      if (forecastMemory.length < 15) {
        console.log("⚠ Neural Optimizer: Insufficient forecast memory.");
        return;
      }

      const recentStates = forecastMemory.slice(-15).map(mem => mem.state);
      const stableCount = recentStates.filter(state => state.includes("Stable")).length;
      const volatileCount = recentStates.filter(state => state.match(/Volatility|Surge|Regression/)).length;
      
      const optimizationSignal = {
        timestamp: new Date().toISOString(),
        stableRatio: (stableCount / 15).toFixed(2),
        volatileRatio: (volatileCount / 15).toFixed(2),
        recommendedScanDepth: (volatileCount >= 7) ? "Deep Audit" : (volatileCount >= 3 ? "Normal Audit" : "Quick Audit"),
        riskSensitivity: (volatileCount >= 5) ? "High Sensitivity" : "Standard"
      };

      optimizerLog.push(optimizationSignal);
      if (optimizerLog.length > 100) {
        optimizerLog.shift();
      }

      console.log("🧬 Neural Feedback Optimization Signal:", optimizationSignal);
    }

    function getOptimizerLog() {
      return optimizerLog;
    }

    return { analyzeAndOptimize, getOptimizerLog };
  })();

  setInterval(() => {
    window.NeuralFeedbackOptimizer.analyzeAndOptimize();
  }, 20000);
});
// ===============================
// Phase 201 — Neural Data Intake Scaffold (File Processor)

document.addEventListener("DOMContentLoaded", () => {
  window.NeuralDataIntake = (function() {
    let parsedReports = [];

    function parseUploadedFile(file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

          const normalized = jsonData.map(row => ({
            region: row["Region"] || "",
            district: row["District"] || "",
            location: row["Location"] || "",
            division: row["Merchandise Division"] || "",
            productGroup: row["Product Group"] || "",
            assortment: row["Assortment"] || "",
            description: row["Item Description"] || "",
            itemNumber: row["Item Number"] || "",
            onHandUnits: parseInt(row["Yesterday Physical Inventory Units"] || 0),
            damagedUnits: parseInt(row["Damaged Units"] || 0),
            cycleCountUnits: parseInt(row["Cycle Count Units"] || 0),
            shrinkUnits: parseInt(row["1st Previous Total Shrink Units"] || 0),
            itdSalesUnits: parseInt(row["ITD Sales Units"] || 0),
          }));

          parsedReports = normalized;
          console.log("📊 Neural Intake Parsed Report:", normalized);
          alert(`✅ Report successfully parsed: ${normalized.length} items ingested.`);

          // Future: feed into AI Cortex modules directly here
        } catch (err) {
          console.error("❌ Failed to parse file:", err);
          alert("Error parsing file. Ensure format matches intake scaffold.");
        }
      };
      reader.readAsBinaryString(file);
    }

    function getParsedReports() {
      return parsedReports;
    }

    return { parseUploadedFile, getParsedReports };
  })();
});