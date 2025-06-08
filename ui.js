export function showScanMappingLog(scannedCode, mappedItem) {
  const log = document.createElement('div');
  log.textContent = `✅ Code ${scannedCode} recognized as Lowe’s #${mappedItem}`;
  Object.assign(log.style, {
    position: 'fixed',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#222',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    zIndex: '9999',
    textAlign: 'center'
  });
  document.body.appendChild(log);
  setTimeout(() => document.body.removeChild(log), 3000);
}

export function updateLocationStatus(currentLocation) {
  const locationStatus = document.getElementById('locationStatus');
  if (!locationStatus) return;
  if (currentLocation) {
    locationStatus.textContent = `📍 Active Bay: ${currentLocation}`;
    locationStatus.style.color = 'limegreen';
  } else {
    locationStatus.textContent = '📍 No Active Bay';
    locationStatus.style.color = 'red';
  }
}

export function createToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    backgroundColor: '#222',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    marginTop: '10px',
    opacity: '0.95',
    transition: 'opacity 0.5s ease-out'
  });
  toast.classList.add('toast-message');

  const container = document.getElementById('toastContainer');
  if (container) {
    container.appendChild(toast);
  } else {
    document.body.appendChild(toast);
  }

  setTimeout(() => {
    toast.classList.add('fade-out');
  
    // Fallback: remove the toast after 1s if transitionend never fires
    const fallback = setTimeout(() => toast.remove(), 1000);
  
    toast.addEventListener('transitionend', () => {
      clearTimeout(fallback);
      toast.remove();
    });
  }, duration);
}

export function updateMapStatusDisplay(upcToItem, eslToUPC, locationMap) {
  const mapStatus = document.getElementById('mapStatusDisplay');
  if (!mapStatus) return;

  const upcCount = Object.keys(upcToItem || {}).length;
  const eslCount = Object.keys(eslToUPC || {}).length;
  const bayCount = Object.keys(locationMap || {}).length;

  mapStatus.textContent = `🧠 Map Status: UPC → ${upcCount} | ESL → ${eslCount} | Bay Codes → ${bayCount}`;
}

export function restoreFocusToEntry() {
  const input = document.getElementById('liveEntry');
  if (input) input.focus();
}
export function setupMoreOptionsToggle() {
  const moreOptionsBtn = document.getElementById('moreOptionsBtn');
  const moreOptionsSection = document.getElementById('advancedControls');

  if (moreOptionsBtn && moreOptionsSection) {
    moreOptionsBtn.addEventListener('click', () => {
      moreOptionsSection.classList.toggle('expanded');
    });
  }
}

export function updateLiveTable() {
  const tableBody = document.querySelector('#liveScanTableBody');
  if (!tableBody || !window.sessionMap) return;

  console.log('[🔍] Rendering live table from sessionMap:', window.sessionMap);

  tableBody.innerHTML = '';

  const entries = Object.entries(window.sessionMap);
  if (entries.length === 0) {
    const row = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = 5;
    emptyCell.textContent = '📭 No scanned items yet.';
    emptyCell.style.textAlign = 'center';
    row.appendChild(emptyCell);
    tableBody.appendChild(row);
    return;
  }

  entries.forEach(([itemNum, data]) => {
    const row = document.createElement('tr');

    const itemCell = document.createElement('td');
    itemCell.textContent = itemNum;
    row.appendChild(itemCell);

    const countCell = document.createElement('td');
    countCell.textContent = data.count || 0;
    row.appendChild(countCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = data.category || 'Uncategorized';
    row.appendChild(categoryCell);

    const locationCell = document.createElement('td');
    locationCell.textContent = data.location || '';
    row.appendChild(locationCell);

    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = '✏️ Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => {
      showEditModal(itemNum, data.count, (newVal) => {
        data.count = newVal;
        window.liveCounts[itemNum] = newVal;
        updateLiveTable();
      });
    });
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    tableBody.appendChild(row);
  });
}
// Modal-driven edit for item count
export function showEditModal(itemNum, currentCount, onConfirm) {
  // Remove existing modal if present
  const existing = document.getElementById('editModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'editModal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Count for Item ${itemNum}</h3>
        <input type="number" id="editItemCount" value="${currentCount}" min="0" />
        <div class="modal-buttons">
          <button id="confirmEditBtn">✅ Save</button>
          <button id="cancelEditBtn">❌ Cancel</button>
        </div>
      </div>
    </div>
  `;

  Object.assign(modal.style, {
    position: 'fixed',
    top: '0', left: '0',
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10000'
  });

  modal.querySelector('.modal-content').style.cssText = `
    background: #111;
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    min-width: 300px;
  `;

  modal.querySelector('.modal-buttons').style.cssText = `
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmEditBtn').onclick = () => {
    const val = parseInt(document.getElementById('editItemCount').value, 10);
    if (!isNaN(val)) {
      onConfirm(val);
      modal.remove();
    }
  };
  document.getElementById('cancelEditBtn').onclick = () => modal.remove();
}
// Renders a UI log for bay audit durations
export function renderBayAuditLog(auditTimes) {
  const existingSection = document.getElementById('bayAuditLog');
  if (existingSection) existingSection.remove();

  const container = document.createElement('section');
  container.id = 'bayAuditLog';
  container.innerHTML = `
    <h3>📋 Bay Audit Sessions</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border-bottom: 1px solid #444;">Bay</th>
          <th style="border-bottom: 1px solid #444;">Duration</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(auditTimes).map(([bay, time]) => `
          <tr>
            <td style="padding: 6px; border-bottom: 1px solid #333;">${bay}</td>
            <td style="padding: 6px; border-bottom: 1px solid #333;">${(time / 1000).toFixed(1)} seconds</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  container.style.cssText = `
    background: #222;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
  `;

  document.body.appendChild(container);
}