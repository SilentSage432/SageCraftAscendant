// ===============================
// Utilities Module — utilities.js
// Inventory Auditor — Modular Refactor v1
// ===============================

/**
 * Sleep helper — async delay
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Pad number with leading zero
 */
function pad(n) {
  return n < 10 ? '0' + n : n;
}

/**
 * Generate timestamp string for backups
 */
function generateTimestamp() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

/**
 * Safe parse JSON with fallback
 */
function safeParse(json, fallback = {}) {
  try {
    return JSON.parse(json);
  } catch (err) {
    console.warn("Failed to parse JSON:", err);
    return fallback;
  }
}

/**
 * Toast helper for quick notifications
 */
function showToast(msg, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#222',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    zIndex: '9999',
    textAlign: 'center',
  });
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), duration);
}

/**
 * Format date object into YYYY-MM-DD string
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}


/**
 * Export Delta Review data to CSV
 */
function exportDeltaToCSV(deltaData) {
  if (!deltaData || deltaData.length === 0) {
    showToast('No delta data to export.');
    return;
  }

  const headers = ['Item #', 'Base', 'Compare', 'Delta', 'Category', 'Location', 'Status'];
  const rows = deltaData.map(row => [
    row.item, row.baseCount, row.compareCount, row.delta,
    row.category || '-', row.location || '-',
    (row.delta !== 0) ? 'Review' : 'Match'
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'DeltaReview.csv');
  link.click();
}

export { formatDate, generateTimestamp as generateUUID, sleep as delay, safeParse, showToast, exportDeltaToCSV };

// 🌐 Expose exportDeltaToCSV globally for Delta Review UI
window.exportDeltaToCSV = exportDeltaToCSV;
window.showToast = showToast;

// ===============================
// Phase 104.1 — Master Export Engine
// ===============================

window.exportFullSystemSnapshot = function() {
  const exportBlob = {
    sessions: safeParse(localStorage.getItem("savedSessions")),
    mappings: safeParse(localStorage.getItem("upcToItemMap")),
    longTermMemory: safeParse(localStorage.getItem("longTermHeuristicMemory")),
    timestamp: generateTimestamp()
  };

  const jsonString = JSON.stringify(exportBlob, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SystemSnapshot_${exportBlob.timestamp}.json`);
  link.click();
  
  showToast("📦 Full system snapshot exported.");
};

// ===============================
// Phase 125.3 — Predictive Engine Backend Scaffold
// ===============================

window.generateForecastSummary = function() {
  const sessions = safeParse(localStorage.getItem("savedSessions"));
  if (!sessions) {
    showToast("⚠️ No sessions available.");
    return null;
  }

  const summary = Object.entries(sessions).map(([sessionName, data]) => {
    const totalItems = data.length;
    const totalCount = data.reduce((sum, row) => sum + (row.count || 0), 0);
    return {
      session: sessionName,
      items: totalItems,
      total: totalCount
    };
  });

  return summary;
};

window.renderForecastSummaryTable = function(summary) {
  let output = "<h4>📊 Forecast Summary</h4><table border='1' cellpadding='6'><tr><th>Session</th><th>Items</th><th>Total Count</th></tr>";
  summary.forEach(row => {
    output += `<tr><td>${row.session}</td><td>${row.items}</td><td>${row.total}</td></tr>`;
  });
  output += "</table>";
  const container = document.getElementById("predictiveContent");
  if (container) container.innerHTML = output;
};

// Placeholder cluster engine
window.generateForecastClusters = function() {
  const dummyClusters = [
    { cluster: "A", weight: 123 },
    { cluster: "B", weight: 87 },
    { cluster: "C", weight: 211 }
  ];
  return dummyClusters;
};

window.renderForecastClustersTable = function(clusters) {
  let output = "<h4>🧮 Forecast Clusters</h4><table border='1' cellpadding='6'><tr><th>Cluster</th><th>Weight</th></tr>";
  clusters.forEach(row => {
    output += `<tr><td>${row.cluster}</td><td>${row.weight}</td></tr>`;
  });
  output += "</table>";
  const container = document.getElementById("predictiveContent");
  if (container) container.innerHTML = output;
};

// Placeholder pattern signals
window.generatePatternSignals = function() {
  const dummySignals = [
    { signal: "Spike Detected", strength: 72 },
    { signal: "Anomaly Dip", strength: 33 },
    { signal: "Volatility", strength: 59 }
  ];
  return dummySignals;
};

window.renderPatternSignalsTable = function(signals) {
  let output = "<h4>🧬 Pattern Signals</h4><table border='1' cellpadding='6'><tr><th>Signal</th><th>Strength</th></tr>";
  signals.forEach(row => {
    output += `<tr><td>${row.signal}</td><td>${row.strength}</td></tr>`;
  });
  output += "</table>";
  const container = document.getElementById("predictiveContent");
  if (container) container.innerHTML = output;
};