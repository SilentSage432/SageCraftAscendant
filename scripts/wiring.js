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
// Live Field Log Viewer Wiring
function renderFieldLog(filter = 'all') {
  const container = document.getElementById('fieldLogContent');
  if (!container) return;

  const logs = window.getFieldLog ? window.getFieldLog() : [];
  if (!logs.length) {
    container.innerHTML = "<em>No log entries yet.</em>";
    return;
  }

  const filteredLogs = (filter === 'all') ? logs : logs.filter(entry => entry.eventType === filter);

  const logHtml = filteredLogs
    .slice().reverse()
    .map(entry => {
      const time = new Date(entry.timestamp).toLocaleString();
      return `<div style="margin-bottom:5px;"><strong>${time}</strong>: [${entry.eventType}] ${JSON.stringify(entry.details)}</div>`;
    })
    .join('');
  container.innerHTML = logHtml;
}

const refreshBtn = document.getElementById('refreshFieldLog');
if (refreshBtn) {
  refreshBtn.addEventListener('click', renderFieldLog);
}

const filterButtons = document.querySelectorAll('.log-filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    renderFieldLog(filter);
  });
});

export { wireAllButtons, runWiringMasterHarvest, runFullSystemAudit };
window.runWiringMasterHarvest = runWiringMasterHarvest;

// Expose full audit function globally for console access
window.runFullSystemAudit = runFullSystemAudit;