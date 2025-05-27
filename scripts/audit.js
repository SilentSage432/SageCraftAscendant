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
