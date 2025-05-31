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
