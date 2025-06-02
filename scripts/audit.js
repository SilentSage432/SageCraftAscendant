export function initAudit() {
  console.log('🧮 Audit module initialized');

  const refreshAuditLog = document.getElementById('refreshAuditLog');
  if (refreshAuditLog) {
    refreshAuditLog.addEventListener('click', () => {
      renderAuditRotationTable();
    });
  }

  function saveAuditData() {
    localStorage.setItem('rotationData', JSON.stringify(rotationData));
  }

  function markAudited(category) {
    if (rotationData[category]) {
      rotationData[category].date = new Date().toISOString();
      saveAuditData();
      renderAuditRotationTable();
    }
  }

  function auditClickHandler(e) {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.audit) {
      const category = e.target.dataset.audit;
      markAudited(category);
    }
  }

  function renderAuditRotationTable() {
    const rotationTable = document.getElementById('rotationTable');
    if (!rotationTable || typeof rotationData !== 'object') return;

    rotationTable.innerHTML = '';

    rotationTable.removeEventListener('click', auditClickHandler);
    rotationTable.addEventListener('click', auditClickHandler);

    Object.entries(rotationData).forEach(([category, info]) => {
      const row = document.createElement('tr');
      const interval = info.interval || 30;

      const lastDate = new Date(info.date);
      const isValid = !isNaN(lastDate.getTime());
      const lastAuditedText = isValid ? lastDate.toLocaleDateString() : 'Not Set';

      const nextDue = isValid ? new Date(lastDate.getTime() + interval * 86400000) : null;
      const nextDueText = nextDue ? nextDue.toLocaleDateString() : 'N/A';

      const overdue = nextDue && new Date() > nextDue;

      row.innerHTML = `
        <td>${category}</td>
        <td>${interval} days</td>
        <td>${lastAuditedText}</td>
        <td>${nextDueText}</td>
        <td><button data-audit="${category}">✔️ Audit Now</button></td>
      `;

      if (overdue) {
        row.style.backgroundColor = '#ffdddd';
      }

      rotationTable.appendChild(row);
    });
  }

  renderAuditRotationTable(); // Render initially on load

  // Additional audit-related logic will be moved here over time
}


function runFullSystemAudit() {
  console.group("🔎 Full System Audit");

  try {
    console.log("✅ Audit system loaded:", typeof renderAuditRotationTable === 'function');
    console.log("✅ Active session health:", sessionStorage.length, "items");
    console.log("✅ Live counts integrity:", document.querySelectorAll("#liveTable tbody tr").length, "rows loaded");

    const upcMap = JSON.parse(localStorage.getItem("upcToItemMap") || "{}");
    const locationMap = JSON.parse(localStorage.getItem("locationMap") || "{}");
    const sessionData = JSON.parse(localStorage.getItem("savedSessions") || "{}");

    console.log("✅ Storage map: UPC map size:", Object.keys(upcMap).length);
    console.log("✅ Storage map: Location map size:", Object.keys(locationMap).length);
    console.log("✅ Storage map: Session count:", Object.keys(sessionData).length);

  } catch (err) {
    console.error("❌ Audit failed:", err);
  }

  console.groupEnd();
}

function runWiringExpectationAudit() {
  console.log("⚡ Running Wiring Expectation Audit...");
  // Insert actual expectation test logic here
}

function runAutoHealingLayer() {
  console.log("🩺 Running Auto-Healing Layer...");
  // Insert actual healing logic here
}

function runMasterDiagnostics() {
  console.log("🔧 Running Master Diagnostics...");
  // Insert actual diagnostic logic here
}

export { runFullSystemAudit, runWiringExpectationAudit, runAutoHealingLayer, runMasterDiagnostics };


// 🔰 Audit Archive Manager Injection - Phase 70

export const auditArchive = {
  listAudits: () => {
    const data = JSON.parse(localStorage.getItem("savedAuditArchives") || "{}");
    return Object.keys(data);
  },

  saveAudit: (id, auditData) => {
    const data = JSON.parse(localStorage.getItem("savedAuditArchives") || "{}");
    data[id] = auditData;
    localStorage.setItem("savedAuditArchives", JSON.stringify(data));
  },

  loadAudit: (id) => {
    const data = JSON.parse(localStorage.getItem("savedAuditArchives") || "{}");
    return data[id] || null;
  },

  deleteAudit: (id) => {
    const data = JSON.parse(localStorage.getItem("savedAuditArchives") || "{}");
    delete data[id];
    localStorage.setItem("savedAuditArchives", JSON.stringify(data));
  },

  generateMergedCSV: (mergedData) => {
    let csv = "Item #,Count,Category,Location\n";
    mergedData.forEach(entry => {
      csv += `${entry.item},${entry.count},${entry.category},${entry.location}\n`;
    });
    return csv;
  }
};

// 🔰 Phase 71.5 Merge Stability Hook Injection

function autoRefreshMergeList() {
  if (typeof window.refreshMergeSessionList === 'function') {
    window.refreshMergeSessionList();
  }
}

// Wrap existing save/delete calls to trigger merge list refresh
const originalSaveAudit = auditArchive.saveAudit;
auditArchive.saveAudit = function(id, auditData) {
  originalSaveAudit.call(this, id, auditData);
  autoRefreshMergeList();
}

const originalDeleteAudit = auditArchive.deleteAudit;
auditArchive.deleteAudit = function(id) {
  originalDeleteAudit.call(this, id);
  autoRefreshMergeList();
}

// 🔬 Phase 72 — Delta Analyzer Core

export function compareAuditDeltas(baseAuditCSV, compareAuditCSV) {
  const parseCSV = (csv) => {
    const rows = csv.trim().split('\n').slice(1);
    const map = {};
    rows.forEach(row => {
      const [item, countStr, category, location] = row.split(',');
      map[item] = {
        count: parseInt(countStr, 10),
        category: category || '',
        location: location || ''
      };
    });
    return map;
  };

  const baseMap = parseCSV(baseAuditCSV);
  const compareMap = parseCSV(compareAuditCSV);

  const deltas = [];

  const allItems = new Set([...Object.keys(baseMap), ...Object.keys(compareMap)]);
  allItems.forEach(item => {
    const baseEntry = baseMap[item] || { count: 0, category: '', location: '' };
    const compareEntry = compareMap[item] || { count: 0, category: '', location: '' };
    const delta = compareEntry.count - baseEntry.count;

    deltas.push({
      item,
      baseCount: baseEntry.count,
      compareCount: compareEntry.count,
      delta,
      category: baseEntry.category || compareEntry.category,
      location: baseEntry.location || compareEntry.location
    });
  });

  return deltas;
}


export function generateDeltaCSV(deltas) {
  let csv = "Item #,Base Count,Compare Count,Delta,Category,Location\n";
  deltas.forEach(entry => {
    csv += `${entry.item},${entry.baseCount},${entry.compareCount},${entry.delta},${entry.category},${entry.location}\n`;
  });
  return csv;
}

// 🔬 Phase 73.5 Delta Review UI Integration
export function renderDeltaReviewTable(deltaData) {
  const tbody = document.querySelector('#deltaReviewTable tbody');
  tbody.innerHTML = '';

  if (!deltaData || deltaData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#888;">No delta loaded</td></tr>';
    return;
  }

  deltaData.forEach(row => {
    const tr = document.createElement('tr');
    const status = (row.delta !== 0) ? '⚠️ Review' : '✅ Match';

    tr.innerHTML = `
      <td>${row.item}</td>
      <td>${row.baseCount}</td>
      <td>${row.compareCount}</td>
      <td>${row.delta}</td>
      <td>${row.category || '-'}</td>
      <td>${row.location || '-'}</td>
      <td>${status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 🔬 Phase 73.5.5 — Delta Analyzer CSV Export Logic
function exportMergedDeltaCSV() {
  const deltas = window.auditArchive?.lastDeltaResults;
  if (!deltas || deltas.length === 0) {
    showToast("No delta data available to export.");
    return;
  }

  const csvContent = generateDeltaCSV(deltas);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'MergedDeltaExport.csv');
  link.click();
}

// 🔬 Phase 73.5.4 — Delta Analyzer Core Compute Logic
function performDeltaAnalysis() {
  const baseSelect = document.getElementById('baseAuditSelect');
  const compareSelect = document.getElementById('compareAuditSelect');

  if (!baseSelect.value || !compareSelect.value) {
    showToast("Please select both audits to compare.");
    return;
  }

  const baseAudit = auditArchive.loadAudit(baseSelect.value);
  const compareAudit = auditArchive.loadAudit(compareSelect.value);

  if (!baseAudit || !compareAudit) {
    showToast("One or both selected audits could not be loaded.");
    return;
  }

  const baseCSV = auditArchive.generateMergedCSV(baseAudit);
  const compareCSV = auditArchive.generateMergedCSV(compareAudit);
  const deltas = compareAuditDeltas(baseCSV, compareCSV);

  window.auditArchive.lastDeltaResults = deltas;
  renderDeltaReviewTable(deltas);
  showToast("Delta analysis complete.");
  // Phase 84 — Persist Delta Analyzer State
  localStorage.setItem("lastDeltaBaseAudit", baseSelect.value);
  localStorage.setItem("lastDeltaCompareAudit", compareSelect.value);
  localStorage.setItem("lastDeltaResults", JSON.stringify(deltas));
  // Phase 85.1 — Persist Merge Session State
  localStorage.setItem("lastMergeBaseAudit", baseSelect.value);
  localStorage.setItem("lastMergeCompareAudit", compareSelect.value);
  localStorage.setItem("lastMergedAudit", JSON.stringify(deltas));
}
// 🌐 Expose renderDeltaReviewTable globally for Delta Review UI
window.renderDeltaReviewTable = renderDeltaReviewTable;
// 🌐 Expose remaining Delta Analyzer functions globally
window.performDeltaAnalysis = performDeltaAnalysis;
window.exportMergedDeltaCSV = exportMergedDeltaCSV;


// 🔬 Phase 74 — Exception Manager Core Logic

function refreshExceptions() {
  const deltas = window.auditArchive?.lastDeltaResults;
  const tbody = document.querySelector('#exceptionTable tbody');
  tbody.innerHTML = '';

  if (!deltas || deltas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#888;">No exceptions loaded</td></tr>';
    return;
  }

  const exceptions = deltas.filter(row => Math.abs(row.delta) >= 5); // Threshold for exception flagging

  if (exceptions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#888;">No exceptions found</td></tr>';
    return;
  }

  exceptions.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.item}</td>
      <td>${row.delta}</td>
      <td>${row.category || '-'}</td>
      <td>${row.location || '-'}</td>
      <td><input type="text" placeholder="Tag" style="width: 100px;"></td>
      <td><input type="text" placeholder="Notes" style="width: 150px;"></td>
    `;
    tbody.appendChild(tr);
  });
  // Phase 86 — Persist Exceptions Data
  localStorage.setItem("lastExceptionsData", JSON.stringify(exceptions));
}

function exportExceptionsCSV() {
  const tbody = document.querySelector('#exceptionTable tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  if (rows.length === 0 || rows[0].querySelector('td').textContent.includes("No exceptions")) {
    showToast("No exceptions to export.");
    return;
  }

  let csv = "Item #,Delta,Category,Location,Tag,Notes\n";

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const item = cells[0].textContent.trim();
    const delta = cells[1].textContent.trim();
    const category = cells[2].textContent.trim();
    const location = cells[3].textContent.trim();
    const tag = cells[4].querySelector('input').value.trim();
    const notes = cells[5].querySelector('input').value.trim();

    csv += `${item},${delta},${category},${location},${tag},${notes}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'AuditExceptions.csv');
  link.click();
}

// 🌐 Expose exception functions globally for wiring.js
window.refreshExceptions = refreshExceptions;
window.exportExceptionsCSV = exportExceptionsCSV;

// 🔬 Phase 75 — Audit Progress Dashboard Logic

function refreshProgress() {
  const data = JSON.parse(localStorage.getItem("rotationData") || "{}");
  const tbody = document.querySelector('#progressTable tbody');
  tbody.innerHTML = '';

  if (!data || Object.keys(data).length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">No progress data loaded</td></tr>';
    return;
  }

  Object.entries(data).forEach(([category, info]) => {
    const interval = info.interval || 30;
    const lastDate = new Date(info.date);
    const isValid = !isNaN(lastDate.getTime());
    const lastAuditedText = isValid ? lastDate.toLocaleDateString() : 'Not Set';

    const nextDue = isValid ? new Date(lastDate.getTime() + interval * 86400000) : null;
    const nextDueText = nextDue ? nextDue.toLocaleDateString() : 'N/A';

    const overdue = nextDue && new Date() > nextDue;
    const status = overdue ? '🚩 Overdue' : '✅ On Schedule';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${category}</td>
      <td>${lastAuditedText}</td>
      <td>${nextDueText}</td>
      <td>${status}</td>
    `;
    tbody.appendChild(tr);
  });
}

function exportProgressCSV() {
  const data = JSON.parse(localStorage.getItem("rotationData") || "{}");
  if (!data || Object.keys(data).length === 0) {
    showToast("No progress data to export.");
    return;
  }

  let csv = "Category,Last Audited,Next Due,Status\n";

  Object.entries(data).forEach(([category, info]) => {
    const interval = info.interval || 30;
    const lastDate = new Date(info.date);
    const isValid = !isNaN(lastDate.getTime());
    const lastAuditedText = isValid ? lastDate.toLocaleDateString() : 'Not Set';

    const nextDue = isValid ? new Date(lastDate.getTime() + interval * 86400000) : null;
    const nextDueText = nextDue ? nextDue.toLocaleDateString() : 'N/A';

    const overdue = nextDue && new Date() > nextDue;
    const status = overdue ? 'Overdue' : 'On Schedule';

    csv += `${category},${lastAuditedText},${nextDueText},${status}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'AuditProgress.csv');
  link.click();
}

// 🌐 Expose progress functions globally for wiring.js
window.refreshProgress = refreshProgress;
window.exportProgressCSV = exportProgressCSV;


// 🔬 Phase 76 — Reporting Hub Logic

function exportDeltaReport() {
  const deltas = window.auditArchive?.lastDeltaResults;
  if (!deltas || deltas.length === 0) {
    showToast("No delta data available to export.");
    return;
  }

  const csvContent = generateDeltaCSV(deltas);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'DeltaReport.csv');
  link.click();
}

function exportExceptionsReport() {
  const tbody = document.querySelector('#exceptionTable tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  if (rows.length === 0 || rows[0].querySelector('td').textContent.includes("No exceptions")) {
    showToast("No exceptions to export.");
    return;
  }

  let csv = "Item #,Delta,Category,Location,Tag,Notes\n";

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const item = cells[0].textContent.trim();
    const delta = cells[1].textContent.trim();
    const category = cells[2].textContent.trim();
    const location = cells[3].textContent.trim();
    const tag = cells[4].querySelector('input').value.trim();
    const notes = cells[5].querySelector('input').value.trim();

    csv += `${item},${delta},${category},${location},${tag},${notes}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'ExceptionsReport.csv');
  link.click();
}

function exportProgressReport() {
  const data = JSON.parse(localStorage.getItem("rotationData") || "{}");
  if (!data || Object.keys(data).length === 0) {
    showToast("No progress data to export.");
    return;
  }

  let csv = "Category,Last Audited,Next Due,Status\n";

  Object.entries(data).forEach(([category, info]) => {
    const interval = info.interval || 30;
    const lastDate = new Date(info.date);
    const isValid = !isNaN(lastDate.getTime());
    const lastAuditedText = isValid ? lastDate.toLocaleDateString() : 'Not Set';

    const nextDue = isValid ? new Date(lastDate.getTime() + interval * 86400000) : null;
    const nextDueText = nextDue ? nextDue.toLocaleDateString() : 'N/A';

    const overdue = nextDue && new Date() > nextDue;
    const status = overdue ? 'Overdue' : 'On Schedule';

    csv += `${category},${lastAuditedText},${nextDueText},${status}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'ProgressReport.csv');
  link.click();
}

// 🌐 Expose reporting functions globally for wiring.js
window.exportDeltaReport = exportDeltaReport;
window.exportExceptionsReport = exportExceptionsReport;
window.exportProgressReport = exportProgressReport;

// 🔬 Phase 77 — Master Export System (MES) Logic

function exportAllSessions() {
  const sessions = JSON.parse(localStorage.getItem("savedSessions") || "{}");
  if (!sessions || Object.keys(sessions).length === 0) {
    showToast("No session data to export.");
    return;
  }

  let csv = "Session ID,Created On,Item Count\n";
  Object.entries(sessions).forEach(([id, session]) => {
    const itemCount = Array.isArray(session) ? session.length : 0;
    csv += `${id},${new Date().toLocaleDateString()},${itemCount}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'AllSessions.csv');
  link.click();
}

function exportAllMappings() {
  const map = JSON.parse(localStorage.getItem("upcToItemMap") || "{}");
  if (!map || Object.keys(map).length === 0) {
    showToast("No mapping data to export.");
    return;
  }

  let csv = "UPC,Item #\n";
  Object.entries(map).forEach(([upc, item]) => {
    csv += `${upc},${item}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'AllMappings.csv');
  link.click();
}

function exportFullDelta() {
  const deltas = window.auditArchive?.lastDeltaResults;
  if (!deltas || deltas.length === 0) {
    showToast("No delta data available to export.");
    return;
  }

  const csvContent = generateDeltaCSV(deltas);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'FullDelta.csv');
  link.click();
}

function exportFullExceptions() {
  const tbody = document.querySelector('#exceptionTable tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  if (rows.length === 0 || rows[0].querySelector('td').textContent.includes("No exceptions")) {
    showToast("No exceptions to export.");
    return;
  }

  let csv = "Item #,Delta,Category,Location,Tag,Notes\n";

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const item = cells[0].textContent.trim();
    const delta = cells[1].textContent.trim();
    const category = cells[2].textContent.trim();
    const location = cells[3].textContent.trim();
    const tag = cells[4].querySelector('input').value.trim();
    const notes = cells[5].querySelector('input').value.trim();

    csv += `${item},${delta},${category},${location},${tag},${notes}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'FullExceptions.csv');
  link.click();
}

function exportFullProgress() {
  const data = JSON.parse(localStorage.getItem("rotationData") || "{}");
  if (!data || Object.keys(data).length === 0) {
    showToast("No progress data to export.");
    return;
  }

  let csv = "Category,Last Audited,Next Due,Status\n";

  Object.entries(data).forEach(([category, info]) => {
    const interval = info.interval || 30;
    const lastDate = new Date(info.date);
    const isValid = !isNaN(lastDate.getTime());
    const lastAuditedText = isValid ? lastDate.toLocaleDateString() : 'Not Set';

    const nextDue = isValid ? new Date(lastDate.getTime() + interval * 86400000) : null;
    const nextDueText = nextDue ? nextDue.toLocaleDateString() : 'N/A';

    const overdue = nextDue && new Date() > nextDue;
    const status = overdue ? 'Overdue' : 'On Schedule';

    csv += `${category},${lastAuditedText},${nextDueText},${status}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'FullProgress.csv');
  link.click();
}

// 🌐 Expose Master Export functions globally
window.exportAllSessions = exportAllSessions;
window.exportAllMappings = exportAllMappings;
window.exportFullDelta = exportFullDelta;
window.exportFullExceptions = exportFullExceptions;
window.exportFullProgress = exportFullProgress;


// 🔬 Phase 82 — Master Export Automation Logic

function exportAllReports() {
  exportDeltaReport();
  setTimeout(() => { exportExceptionsReport(); }, 500);
  setTimeout(() => { exportProgressReport(); }, 1000);
}


window.exportAllReports = exportAllReports;


// 🔬 Phase 83.3.2 — Direct Session Loader by Name

window.loadNamedSessionByName = function(sessionName) {
  const sessions = JSON.parse(localStorage.getItem("savedSessions") || "{}");
  const sessionData = sessions[sessionName];
  if (!sessionData) {
    console.warn("⚠️ Unable to restore session:", sessionName);
    showToast("Session data not found.");
    return;
  }

  console.log("🔄 Restoring session:", sessionName);
  // Your existing session loading logic goes here (replace live table data, etc)
  window.liveTableData = sessionData;
  refreshLiveTable();
  showToast(`Session "${sessionName}" restored.`);
}

// Phase 84 — Restore Delta Analyzer State
window.restoreDeltaAnalyzerState = function() {
  const baseSelect = document.getElementById('baseAuditSelect');
  const compareSelect = document.getElementById('compareAuditSelect');
  const savedBase = localStorage.getItem("lastDeltaBaseAudit");
  const savedCompare = localStorage.getItem("lastDeltaCompareAudit");
  const savedDeltas = localStorage.getItem("lastDeltaResults");

  if (savedBase && [...baseSelect.options].some(opt => opt.value === savedBase)) {
    baseSelect.value = savedBase;
  }
  if (savedCompare && [...compareSelect.options].some(opt => opt.value === savedCompare)) {
    compareSelect.value = savedCompare;
  }
  if (savedDeltas) {
    try {
      const parsedDeltas = JSON.parse(savedDeltas);
      window.auditArchive.lastDeltaResults = parsedDeltas;
      renderDeltaReviewTable(parsedDeltas);
      console.log("🔄 Delta Analyzer state restored.");
    } catch (err) {
      console.warn("⚠️ Failed to parse stored deltas:", err);
    }
  }
};

// Phase 85.1 — Restore Merge Session State
window.restoreMergeSessionState = function() {
  const baseSelect = document.getElementById('baseAuditSelect');
  const compareSelect = document.getElementById('compareAuditSelect');
  const savedBase = localStorage.getItem("lastMergeBaseAudit");
  const savedCompare = localStorage.getItem("lastMergeCompareAudit");
  const savedMerged = localStorage.getItem("lastMergedAudit");

  if (savedBase && [...baseSelect.options].some(opt => opt.value === savedBase)) {
    baseSelect.value = savedBase;
  }
  if (savedCompare && [...compareSelect.options].some(opt => opt.value === savedCompare)) {
    compareSelect.value = savedCompare;
  }
  if (savedMerged) {
    try {
      const parsedMerged = JSON.parse(savedMerged);
      window._lastMergedAudit = parsedMerged;
      console.log("🔄 Merge session state restored.");
    } catch (err) {
      console.warn("⚠️ Failed to parse stored merged audit:", err);
    }
  }
};

// Phase 86 — Restore Exceptions State
window.restoreExceptionsState = function() {
  const savedExceptions = localStorage.getItem("lastExceptionsData");
  if (!savedExceptions) return;

  try {
    const exceptions = JSON.parse(savedExceptions);
    const tbody = document.querySelector('#exceptionTable tbody');
    tbody.innerHTML = '';

    exceptions.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.item}</td>
        <td>${row.delta}</td>
        <td>${row.category || '-'}</td>
        <td>${row.location || '-'}</td>
        <td><input type="text" placeholder="Tag" style="width: 100px;"></td>
        <td><input type="text" placeholder="Notes" style="width: 150px;"></td>
      `;
      tbody.appendChild(tr);
    });

    console.log("🔄 Exceptions state restored.");
  } catch (err) {
    console.warn("⚠️ Failed to parse stored exceptions:", err);
  }
};

// 🔬 Phase 88 — Predictive Delta Forecast Engine

window.generateForecastSummary = function() {
  const deltas = window.auditArchive?.lastDeltaResults;
  if (!deltas || deltas.length === 0) {
    showToast("No delta data available for forecasting.");
    return;
  }

  let shrinkTotal = 0;
  let swellTotal = 0;
  const shrinkItems = {};
  const swellItems = {};

  deltas.forEach(entry => {
    if (entry.delta < 0) {
      shrinkTotal += Math.abs(entry.delta);
      shrinkItems[entry.item] = (shrinkItems[entry.item] || 0) + Math.abs(entry.delta);
    }
    if (entry.delta > 0) {
      swellTotal += entry.delta;
      swellItems[entry.item] = (swellItems[entry.item] || 0) + entry.delta;
    }
  });

  const sortedShrink = Object.entries(shrinkItems).sort((a,b) => b[1]-a[1]).slice(0,5);
  const sortedSwell = Object.entries(swellItems).sort((a,b) => b[1]-a[1]).slice(0,5);

  console.log("🔮 Forecast Summary:");
  console.log("Total Shrink:", shrinkTotal);
  console.log("Total Swell:", swellTotal);
  console.log("Top Shrink Items:", sortedShrink);
  console.log("Top Swell Items:", sortedSwell);

  const summary = {
    shrinkTotal,
    swellTotal,
    topShrink: sortedShrink,
    topSwell: sortedSwell
  };
  // Phase 90 — Persist Forecast Summary
  localStorage.setItem("lastForecastSummary", JSON.stringify({
    shrinkTotal,
    swellTotal,
    topShrink: sortedShrink,
    topSwell: sortedSwell
  }));
  return summary;
};


// 🔬 Phase 89 — Forecast UI Table Engine

window.renderForecastSummaryTable = function(summary) {
  const container = document.getElementById('forecastSummaryContainer');
  container.innerHTML = '';

  if (!summary) {
    container.innerHTML = '<div style="color:#aaa;">No forecast data available.</div>';
    return;
  }

  const summaryDiv = document.createElement('div');
  summaryDiv.innerHTML = `
    <h3>📊 Forecast Summary</h3>
    <p><strong>Total Shrink:</strong> ${summary.shrinkTotal}</p>
    <p><strong>Total Swell:</strong> ${summary.swellTotal}</p>
  `;
  container.appendChild(summaryDiv);

  const shrinkTable = document.createElement('table');
  shrinkTable.className = 'forecast-table';
  shrinkTable.innerHTML = `
    <thead><tr><th colspan="2">Top Shrink Items</th></tr></thead>
    <tbody>${summary.topShrink.map(([item, qty]) => `<tr><td>${item}</td><td>${qty}</td></tr>`).join('')}</tbody>
  `;
  container.appendChild(shrinkTable);

  const swellTable = document.createElement('table');
  swellTable.className = 'forecast-table';
  swellTable.innerHTML = `
    <thead><tr><th colspan="2">Top Swell Items</th></tr></thead>
    <tbody>${summary.topSwell.map(([item, qty]) => `<tr><td>${item}</td><td>${qty}</td></tr>`).join('')}</tbody>
  `;
  container.appendChild(swellTable);
};

// 🔬 Phase 91 — Predictive Heuristic Learning Engine

window.generateHeuristicWeights = function() {
  const deltas = window.auditArchive?.lastDeltaResults;
  if (!deltas || deltas.length === 0) {
    showToast("No delta data available for heuristic analysis.");
    return;
  }

  const weights = {};

  deltas.forEach(entry => {
    if (!weights[entry.item]) {
      weights[entry.item] = { shrink: 0, swell: 0, total: 0 };
    }
    if (entry.delta < 0) {
      weights[entry.item].shrink += 1;
    }
    if (entry.delta > 0) {
      weights[entry.item].swell += 1;
    }
    weights[entry.item].total += 1;
  });

  const sorted = Object.entries(weights).sort((a, b) => b[1].total - a[1].total);
  console.log("🔬 Heuristic Weights Generated:", sorted);

  return sorted;
};

// 🔬 Phase 91.3 — Heuristic Table Renderer

window.renderHeuristicTable = function(heuristics) {
  const container = document.getElementById('heuristicSummaryContainer');
  container.innerHTML = '';

  if (!heuristics || heuristics.length === 0) {
    container.innerHTML = '<div style="color:#aaa;">No heuristic data available.</div>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'forecast-table';
  table.innerHTML = `
    <thead><tr><th>Item #</th><th>Shrink Hits</th><th>Swell Hits</th><th>Total Hits</th></tr></thead>
    <tbody>${heuristics.map(([item, counts]) => `
      <tr>
        <td>${item}</td>
        <td>${counts.shrink}</td>
        <td>${counts.swell}</td>
        <td>${counts.total}</td>
      </tr>
    `).join('')}</tbody>
  `;

  container.appendChild(table);
};

// 🔬 Phase 92.1 — Intelligent Anomaly Risk Scoring Engine

window.generateAnomalyRiskScores = function() {
  const heuristics = window.generateHeuristicWeights();
  if (!heuristics || heuristics.length === 0) {
    showToast("No heuristic data available for risk scoring.");
    return;
  }

  const riskTable = heuristics.map(([item, counts]) => {
    const score = (counts.shrink * 3) + (counts.swell * 1); // Weighted scoring formula
    let riskLevel = 'Low';
    if (score >= 10) riskLevel = 'Critical';
    else if (score >= 7) riskLevel = 'High';
    else if (score >= 4) riskLevel = 'Moderate';

    return {
      item,
      shrinkHits: counts.shrink,
      swellHits: counts.swell,
      totalHits: counts.total,
      score,
      riskLevel
    };
  });

  console.log("🚩 Risk Factor Table Generated:", riskTable);
  return riskTable;
};

// 🔬 Phase 92.2 — Risk Table Renderer

window.renderRiskFactorTable = function(riskData) {
  const container = document.getElementById('riskFactorContainer');
  container.innerHTML = '';

  if (!riskData || riskData.length === 0) {
    container.innerHTML = '<div style="color:#aaa;">No risk data available.</div>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'forecast-table';
  table.innerHTML = `
    <thead><tr><th>Item #</th><th>Shrink Hits</th><th>Swell Hits</th><th>Score</th><th>Risk Level</th></tr></thead>
    <tbody>${riskData.map(row => `
      <tr>
        <td>${row.item}</td>
        <td>${row.shrinkHits}</td>
        <td>${row.swellHits}</td>
        <td>${row.score}</td>
        <td style="font-weight:bold; color:${getRiskColor(row.riskLevel)}">${row.riskLevel}</td>
      </tr>
    `).join('')}</tbody>
  `;

  container.appendChild(table);
};

// 🔬 Risk Color Helper
function getRiskColor(level) {
  switch(level) {
    case 'Critical': return '#ff3333';
    case 'High': return '#ff9900';
    case 'Moderate': return '#ffcc00';
    default: return '#33cc33';
  }
}

// 🔬 Phase 93.1 — AI-Powered Audit Target Recommendation Engine

window.generateAuditRecommendations = function() {
  const riskData = window.generateAnomalyRiskScores();
  if (!riskData || riskData.length === 0) {
    showToast("No risk data available for recommendations.");
    return;
  }

  const recommendations = riskData.map(row => {
    let priority = 'Low';
    let note = 'Normal monitoring';

    if (row.riskLevel === 'Critical') {
      priority = 'Immediate';
      note = 'Urgent re-audit required';
    } else if (row.riskLevel === 'High') {
      priority = 'High';
      note = 'Schedule high-priority audit';
    } else if (row.riskLevel === 'Moderate') {
      priority = 'Medium';
      note = 'Add to upcoming rotation';
    }

    return {
      item: row.item,
      category: row.category || '-',
      location: row.location || '-',
      riskLevel: row.riskLevel,
      priority,
      note
    };
  });

  console.log("🎯 Audit Recommendations Generated:", recommendations);
  return recommendations;
};

// 🔬 Phase 93.2 — Audit Recommendation Table Renderer

window.renderAuditRecommendationsTable = function(recommendations) {
  const container = document.getElementById('auditRecommendationsContainer');
  container.innerHTML = '';

  if (!recommendations || recommendations.length === 0) {
    container.innerHTML = '<div style="color:#aaa;">No audit recommendations available.</div>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'forecast-table';
  table.innerHTML = `
    <thead><tr><th>Item #</th><th>Category</th><th>Location</th><th>Risk</th><th>Priority</th><th>Recommendation</th></tr></thead>
    <tbody>${recommendations.map(row => `
      <tr>
        <td>${row.item}</td>
        <td>${row.category}</td>
        <td>${row.location}</td>
        <td style="font-weight:bold; color:${getRiskColor(row.riskLevel)}">${row.riskLevel}</td>
        <td>${row.priority}</td>
        <td>${row.note}</td>
      </tr>
    `).join('')}</tbody>
  `;

  container.appendChild(table);
};

// 🔬 Phase 94.1 — Long-Term Learning Memory Engine

window.feedLongTermMemory = function() {
  const deltas = window.auditArchive?.lastDeltaResults;
  if (!deltas || deltas.length === 0) {
    showToast("No delta data available to feed long-term memory.");
    return;
  }

  const memory = JSON.parse(localStorage.getItem("longTermHeuristicMemory") || "{}");

  deltas.forEach(entry => {
    if (!memory[entry.item]) {
      memory[entry.item] = { shrink: 0, swell: 0, total: 0 };
    }
    if (entry.delta < 0) {
      memory[entry.item].shrink += Math.abs(entry.delta);
    }
    if (entry.delta > 0) {
      memory[entry.item].swell += entry.delta;
    }
    memory[entry.item].total += Math.abs(entry.delta);
  });

  localStorage.setItem("longTermHeuristicMemory", JSON.stringify(memory));
  console.log("📚 Long-term memory updated:", memory);
  showToast("Long-term learning memory updated.");
};

// 🔬 Phase 95.1 — Historical Trend Aggregation Engine

window.generateHistoricalTrendSummary = function() {
  const memory = JSON.parse(localStorage.getItem("longTermHeuristicMemory") || "{}");
  if (!memory || Object.keys(memory).length === 0) {
    showToast("No long-term memory data available.");
    return;
  }

  let shrinkTotal = 0;
  let swellTotal = 0;
  let totalActivity = 0;

  Object.values(memory).forEach(record => {
    shrinkTotal += record.shrink;
    swellTotal += record.swell;
    totalActivity += record.total;
  });

  const summary = {
    shrinkTotal,
    swellTotal,
    totalActivity
  };

  console.log("📈 Historical Trend Summary:", summary);
  return summary;
};


// 🔬 Phase 95.2 — Historical Trend Renderer

window.renderHistoricalTrendDashboard = function(summary) {
  const container = document.getElementById('historicalTrendContainer');
  container.innerHTML = '';

  if (!summary) {
    container.innerHTML = '<div style="color:#aaa;">No historical data available.</div>';
    return;
  }

  const summaryDiv = document.createElement('div');
  summaryDiv.innerHTML = `
    <h3>📊 Historical Trend Dashboard</h3>
    <p><strong>Total Shrink:</strong> ${summary.shrinkTotal}</p>
    <p><strong>Total Swell:</strong> ${summary.swellTotal}</p>
    <p><strong>Total Audit Activity:</strong> ${summary.totalActivity}</p>
  `;
  container.appendChild(summaryDiv);
};

// 🔬 Phase 96.1 — Predictive Anomaly Forecast Curve Engine

window.generateForecastCurve = function() {
  const memory = JSON.parse(localStorage.getItem("longTermHeuristicMemory") || "{}");
  if (!memory || Object.keys(memory).length === 0) {
    showToast("No long-term memory data available for forecasting.");
    return;
  }

  const projection = [];
  let shrinkProjected = 0;
  let swellProjected = 0;

  for (let month = 1; month <= 6; month++) {
    shrinkProjected += Math.floor((Object.values(memory).reduce((acc, rec) => acc + rec.shrink, 0)) * 0.15);
    swellProjected += Math.floor((Object.values(memory).reduce((acc, rec) => acc + rec.swell, 0)) * 0.10);

    projection.push({
      month: `+${month} mo`,
      shrink: shrinkProjected,
      swell: swellProjected
    });
  }

  console.log("📉 Forecast Curve Projection:", projection);
  return projection;
};

// 🔬 Phase 96.2 — Forecast Curve Renderer

window.renderForecastCurveChart = function(projection) {
  const container = document.getElementById('forecastCurveContainer');
  container.innerHTML = '';

  if (!projection || projection.length === 0) {
    container.innerHTML = '<div style="color:#aaa;">No forecast curve data available.</div>';
    return;
  }

  const labels = projection.map(p => p.month);
  const shrinkData = projection.map(p => p.shrink);
  const swellData = projection.map(p => p.swell);

  const canvas = document.createElement('canvas');
  canvas.id = 'forecastCurveChart';
  container.appendChild(canvas);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Shrink Projection', data: shrinkData, borderColor: '#ff3333', fill: false },
        { label: 'Swell Projection', data: swellData, borderColor: '#3399ff', fill: false }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: '6-Month Forecast Curve' }
      }
    }
  });
};
// 🔬 Phase 97.1 — AI Pattern Analyzer Engine

window.generatePatternSignals = function() {
  const memory = JSON.parse(localStorage.getItem("longTermHeuristicMemory") || "{}");
  if (!memory || Object.keys(memory).length === 0) {
    showToast("No long-term memory data available for pattern analysis.");
    return;
  }

  const categoryPatterns = {};

  Object.entries(memory).forEach(([item, record]) => {
    const category = record.category || 'Uncategorized';
    if (!categoryPatterns[category]) {
      categoryPatterns[category] = { shrink: 0, swell: 0, total: 0, items: 0 };
    }
    categoryPatterns[category].shrink += record.shrink;
    categoryPatterns[category].swell += record.swell;
    categoryPatterns[category].total += record.total;
    categoryPatterns[category].items += 1;
  });

  const signals = Object.entries(categoryPatterns).map(([category, counts]) => {
    const shrinkRate = counts.shrink / counts.total;
    const swellRate = counts.swell / counts.total;
    let signal = 'Stable';

    if (shrinkRate > 0.5) signal = 'Severe Shrink Risk';
    else if (shrinkRate > 0.3) signal = 'High Shrink Tendency';
    else if (swellRate > 0.5) signal = 'Severe Swell Risk';
    else if (swellRate > 0.3) signal = 'High Swell Tendency';

    return {
      category,
      shrinkTotal: counts.shrink,
      swellTotal: counts.swell,
      total: counts.total,
      signal
    };
  });

  console.log("📊 Category Pattern Signals Generated:", signals);
  return signals;
};

// 🔬 Phase 97.2 — Pattern Signal Table Renderer

window.renderPatternSignalsTable = function(signals) {
  const container = document.getElementById('patternSignalsContainer');
  container.innerHTML = '';

  if (!signals || signals.length === 0) {
    container.innerHTML = '<div style="color:#aaa;">No pattern signals available.</div>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'forecast-table';
  table.innerHTML = `
    <thead><tr><th>Category</th><th>Total Shrink</th><th>Total Swell</th><th>Total Activity</th><th>Signal</th></tr></thead>
    <tbody>${signals.map(row => `
      <tr>
        <td>${row.category}</td>
        <td>${row.shrinkTotal}</td>
        <td>${row.swellTotal}</td>
        <td>${row.total}</td>
        <td style="font-weight:bold;">${row.signal}</td>
      </tr>
    `).join('')}</tbody>
  `;

  container.appendChild(table);
};

// 🔬 Phase 99.1 — Master Audit Command Processor

window.generateMasterAuditReport = function() {
  console.log("🧭 Master Audit Command Processor activated.");

  const forecastSummary = window.generateForecastSummary();
  const heuristicWeights = window.generateHeuristicWeights();
  const riskFactors = window.generateAnomalyRiskScores();
  const recommendations = window.generateAuditRecommendations();
  const longTermSummary = window.generateHistoricalTrendSummary();
  const forecastCurve = window.generateForecastCurve();
  const patternSignals = window.generatePatternSignals();

  const masterReport = {
    forecastSummary,
    heuristicWeights,
    riskFactors,
    recommendations,
    longTermSummary,
    forecastCurve,
    patternSignals
  };

  console.log("📊 Master Audit Report Generated:", masterReport);
  showToast("Master Audit Report compiled successfully.");
  return masterReport;
};

// 🔬 Phase 100.1 — AI Control Room Dashboard Engine

window.renderControlRoomDashboard = function() {
  const container = document.getElementById('controlRoomContainer');
  container.innerHTML = '';

  let upcMap = JSON.parse(localStorage.getItem("upcToItemMap") || "{}");
  let sessions = JSON.parse(localStorage.getItem("savedSessions") || "{}");
  let longTermMemory = JSON.parse(localStorage.getItem("longTermHeuristicMemory") || "{}");

  const totalMappings = Object.keys(upcMap).length;
  const totalSessions = Object.keys(sessions).length;
  const totalMemoryItems = Object.keys(longTermMemory).length;

  const panel = document.createElement('div');
  panel.innerHTML = `
    <h3>🧭 AI Control Room</h3>
    <p><strong>Total Active Sessions:</strong> ${totalSessions}</p>
    <p><strong>Mapped UPCs:</strong> ${totalMappings}</p>
    <p><strong>Long-Term Memory Items:</strong> ${totalMemoryItems}</p>
  `;

  container.appendChild(panel);
};

// 🔬 Phase 101.1 — AI Self-Tuning Optimizer Engine

window.runAISelfOptimizer = function() {
  console.log("⚙️ Running AI Self-Optimizer...");

  const memory = JSON.parse(localStorage.getItem("longTermHeuristicMemory") || "{}");
  if (!memory || Object.keys(memory).length === 0) {
    showToast("No long-term memory available for optimizer.");
    return;
  }

  let adjustments = 0;

  Object.entries(memory).forEach(([item, record]) => {
    if (record.total > 100) {
      const shrinkBias = record.shrink / record.total;
      const swellBias = record.swell / record.total;

      if (shrinkBias > 0.6) {
        record.shrink = Math.floor(record.shrink * 0.95);
        adjustments++;
      }
      if (swellBias > 0.6) {
        record.swell = Math.floor(record.swell * 0.95);
        adjustments++;
      }
    }
  });

  localStorage.setItem("longTermHeuristicMemory", JSON.stringify(memory));
  console.log(`✅ AI Optimizer complete — ${adjustments} records adjusted.`);
  showToast(`AI Optimizer complete — ${adjustments} items balanced.`);
};


// 🔬 Phase 120 — Rotation Engine Audit Deployment

function runRotationEngineAudit() {
  console.group("🔄 Running Rotation Engine Audit...");

  try {
    const rotationData = JSON.parse(localStorage.getItem("rotationData") || "{}");
    if (!rotationData || Object.keys(rotationData).length === 0) {
      showToast("⚠ No rotation data found.");
      console.warn("No rotation data found.");
      return;
    }

    const overdueList = [];

    Object.entries(rotationData).forEach(([category, info]) => {
      const interval = info.interval || 30;
      const lastDate = new Date(info.date);
      const isValid = !isNaN(lastDate.getTime());
      const nextDue = isValid ? new Date(lastDate.getTime() + interval * 86400000) : null;
      const overdue = nextDue && new Date() > nextDue;

      if (overdue) {
        overdueList.push({
          category,
          lastAudited: isValid ? lastDate.toLocaleDateString() : 'Not Set',
          nextDue: nextDue ? nextDue.toLocaleDateString() : 'N/A'
        });
      }
    });

    if (overdueList.length === 0) {
      showToast("✅ All categories on schedule.");
      console.log("All categories on schedule.");
    } else {
      console.warn("🚩 Overdue Categories Detected:", overdueList);
      alert(`${overdueList.length} overdue categories found.\nSee console for details.`);
    }
  } catch (err) {
    console.error("❌ Rotation Engine Audit failed:", err);
  }

  console.groupEnd();
}

// 🌐 Expose Rotation Engine globally
window.runRotationEngineAudit = runRotationEngineAudit;