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