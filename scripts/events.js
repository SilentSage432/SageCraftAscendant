// --- Modal Edit Confirm Button Handler (for modalEditConfirm) ---
// --- Modal Edit Confirm Button Handler (for modalEditConfirm) ---
// The modalEditConfirm button may be created dynamically, so bind the event outside DOMContentLoaded
function handleModalEditConfirmClick() {
  // Assumes scannedItems, saveScannedItems, renderLiveScanTable, and showToast exist in global scope
  window.scannedItems = window.scannedItems || JSON.parse(localStorage.getItem('scannedItems') || '[]');
  function saveScannedItems() {
    localStorage.setItem('scannedItems', JSON.stringify(window.scannedItems));
  }
  function showToast(msg) { if (typeof createToast === 'function') createToast(msg); }

  const modalEditConfirm = document.getElementById("modalEditConfirm");
  const editIndex = modalEditConfirm?.dataset.index;
  const updatedCode = document.getElementById("editCodeInput")?.value.trim();
  let updatedType = document.getElementById("editTypeSelect")?.value;
  // Fallback: if dropdown is missing or empty, check for checked radio button
  if (!updatedType) {
    const selectedRadio = document.querySelector('input[name="itemType"]:checked');
    if (selectedRadio) {
      updatedType = selectedRadio.value;
    }
  }
  const updatedValue = document.getElementById("editValueInput")?.value.trim();

  if (!updatedCode || !updatedType || !updatedValue || editIndex === undefined) {
    showToast("Please fill out all fields.");
    return;
  }

  window.scannedItems[editIndex] = {
    code: updatedCode,
    type: updatedType,
    value: updatedValue,
    timestamp: new Date().toLocaleString()
  };

  saveScannedItems();
  if (typeof renderLiveScanTable === "function") renderLiveScanTable();
  showToast(`Updated entry #${parseInt(editIndex) + 1}`);
  const modal = document.getElementById("modalEdit");
  if (modal) modal.style.display = "none";
}

// Attach the handler either immediately or after DOMContentLoaded if button not yet present
function bindModalEditConfirmListener() {
  const modalEditConfirm = document.getElementById("modalEditConfirm");
  if (modalEditConfirm) {
    // Remove any previous listener to prevent double binding
    modalEditConfirm.removeEventListener("click", handleModalEditConfirmClick);
    modalEditConfirm.addEventListener("click", handleModalEditConfirmClick);
  }
}
// Try binding immediately in case button is present
bindModalEditConfirmListener();
// Also bind after DOMContentLoaded in case button is added later
document.addEventListener('DOMContentLoaded', bindModalEditConfirmListener);

import { createToast, updateMapStatusDisplay, renderBayAuditLog } from './ui.js';

window.createToast = createToast;
window.updateMapStatusDisplay = updateMapStatusDisplay;

// --- Bay Audit Timing State ---
let currentBay = null;
let bayAuditTimes = [];

// Show toast and handle unknown scan mappings interactively on manual scan event (modal version)
console.log('✅ Binding global manual-scan listener');

window.handleManualScan = function (e) {
  const { code, quantity, category } = e.detail;

  console.log('🧪 Primary manual-scan triggered:', code);

  const upcMap = JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
  const eslMap = JSON.parse(localStorage.getItem('eslToUPCMap') || '{}');
  const bayMap = JSON.parse(localStorage.getItem('locationMap') || '{}');

  let itemNum = '';
  if (upcMap[code]) itemNum = upcMap[code];
  else if (eslMap[code]) itemNum = eslMap[code];
  else if (bayMap[code]) itemNum = code;

  // --- Bay Tag UI Handling ---
  if (bayMap[code]) {
    // This is a valid bay tag scan
    localStorage.setItem('activeBay', bayMap[code]);
    const bayStatusDisplay = document.getElementById('bayStatusDisplay');
    const closeBayWrapper = document.getElementById('closeBayWrapper');

    // --- BAY TIMER LOGIC ---
    currentBay = {
      name: bayMap[code],
      startTime: Date.now()
    };
    console.log(`⏱️ Timer started for bay: ${bayMap[code]}`);

    // Update UI for active bay
    if (bayStatusDisplay) {
      bayStatusDisplay.textContent = `📦 Bay Active: ${bayMap[code]}`;
      bayStatusDisplay.style.color = 'green';
    }
    if (closeBayWrapper) {
      closeBayWrapper.style.display = 'block';
    }
    // Optionally, you could return here if you want scanning a bay tag to only update the bay UI.
    // return;
  }

  if (itemNum) {
    if (!window.sessionMap) window.sessionMap = {};
    if (!window.sessionMap[itemNum]) {
      window.sessionMap[itemNum] = { count: 0 };
    }
    window.sessionMap[itemNum].count += quantity;
    console.log('[🧪] Added to sessionMap:', itemNum, window.sessionMap[itemNum]);
    window.sessionMap[itemNum].category = category || window.sessionMap[itemNum].category || '';
    window.sessionMap[itemNum].location = bayMap[itemNum] || window.sessionMap[itemNum].location || '';
    if (typeof window.updateLiveTable === 'function') {
      console.log('[🧪] Calling updateLiveTable for', itemNum, window.sessionMap[itemNum]);
      window.updateLiveTable();
    }
    createToast(`✅ Added ${quantity} to Item #${itemNum} (${category})`);
    window.dispatchEvent(new CustomEvent('session-updated'));
    return;
  }

  const modal = document.getElementById('mapPromptModal');
  const codeSpan = document.getElementById('mapPromptCode');
  const inputSection = document.getElementById('mapInputSection');
  const inputField = document.getElementById('mapPromptInput');
  const confirmBtn = document.getElementById('mapConfirmBtn');
  const label = document.getElementById('mapPromptLabel');

  modal.classList.remove('hidden');
  // Forcefully center modal with fixed positioning and z-index for visibility, and ensure vibrant, visible modal
  modal.style.display = 'flex';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.zIndex = '9999';
  modal.style.background = '#1a0033'; // deep purple background
  modal.style.border = '2px solid #a972ff';
  modal.style.padding = '2rem';
  modal.style.borderRadius = '12px';
  modal.style.boxShadow = '0 0 20px #a972ff';
  modal.style.color = '#fff';
  codeSpan.textContent = code;
  inputSection.classList.add('hidden');
  inputField.value = '';

  window._mappingCode = code;
  window._selectedType = '';

  // Only update currentMapType on user interaction with the selectors
  document.getElementById('mapTypeESL').onclick = () => {
    label.textContent = `Enter Lowe's Item # for this ESL:`;
    inputSection.classList.remove('hidden');
    window._selectedType = 'esl';
    window.currentMapType = 'esl';
    // set radio if present
    const eslRadio = document.querySelector('input[name="itemType"][value="esl"]');
    if (eslRadio) eslRadio.checked = true;
  };

  document.getElementById('mapTypeProduct').onclick = () => {
    label.textContent = `Enter Lowe's Item # for this Product:`;
    inputSection.classList.remove('hidden');
    window._selectedType = 'product';
    window.currentMapType = 'product';
    const prodRadio = document.querySelector('input[name="itemType"][value="product"]');
    if (prodRadio) prodRadio.checked = true;
  };

  document.getElementById('mapTypeBay').onclick = () => {
    label.textContent = `Enter Bay Name:`;
    inputSection.classList.remove('hidden');
    window._selectedType = 'bay';
    window.currentMapType = 'bay';
    const bayRadio = document.querySelector('input[name="itemType"][value="bay"]');
    if (bayRadio) bayRadio.checked = true;
  };

  // --- MODAL SUBMIT HANDLING (NEW LOGIC) ---
  // This block replaces the confirmBtn.onclick for new modal submit logic
  if (document.getElementById('modalSubmit')) {
    document.getElementById('modalSubmit').addEventListener('click', () => {
      // Get selected type and item number
      const itemType = document.querySelector('input[name="itemType"]:checked')?.value;
      const itemNumber = document.getElementById('modalItemNumber').value.trim();
      // Get liveCategory from UI, default to 'Uncategorized'
      const liveCategory = document.getElementById('liveCategory')?.value || 'Uncategorized';

      function showToast(msg) { if (typeof createToast === 'function') createToast(msg); }
      function saveUPCMap() {
        localStorage.setItem('upcToItemMap', JSON.stringify(window.upcToItem || {}));
      }
      function saveLocationMap() {
        localStorage.setItem('locationMap', JSON.stringify(window.locationMap || {}));
      }
      function updateBayStatusDisplay() {
        if (typeof window.updateMapStatusDisplay === 'function') {
          window.updateMapStatusDisplay(
            window.locationMap || {},
            window.upcToItem || {},
            window.eslToUPC || {}
          );
        }
      }
      function addItemToScanTable(itemNum, code, type, category) {
        if (typeof window.addItemToScanTable === 'function') {
          window.addItemToScanTable(itemNum, code, type, category);
        }
      }
      function closeModal() {
        const modal = document.getElementById('mapPromptModal');
        if (modal) {
          modal.style.display = 'none';
          modal.classList.add('hidden');
        }
      }

      // Fallback to global maps if not defined
      window.upcToItem = window.upcToItem || JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
      window.locationMap = window.locationMap || JSON.parse(localStorage.getItem('locationMap') || '{}');
      window.eslToUPC = window.eslToUPC || JSON.parse(localStorage.getItem('eslToUPCMap') || '{}');

      if (!itemNumber) {
        showToast('Please enter a valid item number.');
        return;
      }
      if (!itemType) {
        showToast('Please select a category for this code.');
        return;
      }
      // Use most recent scanned value
      const scannedCode = window.lastScannedCode || window._mappingCode || '';

      if (itemType === 'esl') {
        window.upcToItem[scannedCode] = itemNumber;
        saveUPCMap();
        showToast(`ESL ${scannedCode} mapped to item ${itemNumber}`);
      } else if (itemType === 'product') {
        window.upcToItem[scannedCode] = itemNumber;
        saveUPCMap();
        showToast(`Product ${scannedCode} mapped to item ${itemNumber}`);
      } else if (itemType === 'bay') {
        window.locationMap[scannedCode] = itemNumber;
        saveLocationMap();
        currentBay = itemNumber;
        localStorage.setItem('activeBay', itemNumber);
        updateBayStatusDisplay();
        showToast(`Bay ${itemNumber} activated`);
      }

      // --- Ensure sessionMap is updated for product mappings with category ---
      if (itemType === 'product') {
        if (!window.sessionMap) window.sessionMap = {};
        if (!window.sessionMap[itemNumber]) window.sessionMap[itemNumber] = { count: 0 };
        window.sessionMap[itemNumber].count += 1;
        window.sessionMap[itemNumber].category = liveCategory;
        window.sessionMap[itemNumber].location = localStorage.getItem('activeBay') || '';
      }

      addItemToScanTable(itemNumber, scannedCode, itemType, liveCategory);
      closeModal();
    });
  }

  // Always update the live table after a scan (manual or mapped)
  if (typeof window.updateLiveTable === 'function') {
    console.log('[🧪] updateLiveTable firing from handleManualScan');
    window.updateLiveTable();
  }
};

window.addEventListener('manual-scan', window.handleManualScan);

export function initEventListeners() {
  // --- Live Entry scanner input handler ---
  const liveEntry = document.getElementById('liveEntry');
  if (liveEntry) {
    liveEntry.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const quantity = parseInt(document.getElementById('liveQty')?.value || '1', 10);
        const category = document.getElementById('liveCategory')?.value || 'Uncategorized';
        const value = liveEntry.value.trim();
        if (value && typeof window.handleManualScan === 'function') {
          window.handleManualScan({ detail: { code: value, quantity, category } });
          liveEntry.value = '';
          document.getElementById('liveQty').value = '1';
          document.getElementById('liveCategory').value = 'Uncategorized';
          liveEntry.focus();
        }
      }
    });
  }
  console.log('🎛️ Event listeners initialized');
  // Update map status display on startup with data from localStorage
  updateMapStatusDisplay(
    JSON.parse(localStorage.getItem('locationMap') || '{}'),
    JSON.parse(localStorage.getItem('upcToItemMap') || '{}'),
    JSON.parse(localStorage.getItem('eslToUPCMap') || '{}')
  );

  setupTabNavigation();

  // --- Appearance Controls ---
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    const darkPref = localStorage.getItem('config_darkMode');
    if (darkPref === 'true') document.body.classList.add('dark-mode');
    darkModeToggle.checked = darkPref === 'true';
    darkModeToggle.addEventListener('change', () => {
      const enabled = darkModeToggle.checked;
      localStorage.setItem('config_darkMode', enabled);
      document.body.classList.toggle('dark-mode', enabled);
      createToast(`🌓 Dark mode ${enabled ? 'enabled' : 'disabled'}`);
    });
  }

  const fontSizeSelect = document.getElementById('fontSizeSelect');
  if (fontSizeSelect) {
    const savedSize = localStorage.getItem('config_fontSize') || 'medium';
    document.body.classList.add(`font-${savedSize}`);
    fontSizeSelect.value = savedSize;
    fontSizeSelect.addEventListener('change', () => {
      const newSize = fontSizeSelect.value;
      document.body.classList.remove('font-small', 'font-medium', 'font-large');
      document.body.classList.add(`font-${newSize}`);
      localStorage.setItem('config_fontSize', newSize);
      createToast(`🔠 Font size set to ${newSize}`);
    });
  }

  // --- Scan Behavior Toggles ---
  const batchScanToggle = document.getElementById('batchScanToggle');
  if (batchScanToggle) {
    const saved = localStorage.getItem('config_batchScan') === 'true';
    batchScanToggle.checked = saved;
    window.batchScanEnabled = saved;
    batchScanToggle.addEventListener('change', () => {
      window.batchScanEnabled = batchScanToggle.checked;
      localStorage.setItem('config_batchScan', batchScanToggle.checked);
      createToast(`🔄 Batch Scan ${batchScanToggle.checked ? 'enabled' : 'disabled'}`);
    });
  }

  // --- Autosave Controls ---
  const autosaveToggle = document.getElementById('autosaveToggle');
  const autosaveIntervalSelect = document.getElementById('autosaveIntervalSelect');
  let autosaveIntervalId = null;

  function startAutosave(minutes) {
    if (autosaveIntervalId) clearInterval(autosaveIntervalId);
    autosaveIntervalId = setInterval(async () => {
      const sessionData = window.sessionMap || {};
      localStorage.setItem('savedSession', JSON.stringify(sessionData));
      console.log('💾 Autosave complete');

      // Also autosave to Excel
      try {
        const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs');
        const sessionRows = Object.entries(sessionData).map(([item, data]) => ({
          'Item #': item,
          'Count': data.count || 1,
          'Category': data.category || '',
          'Location': data.location || ''
        }));

        const ws = XLSX.utils.json_to_sheet(sessionRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Session');

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `autosave-session-${timestamp}.xlsx`;
        XLSX.writeFile(wb, filename);

        // Also autosave to Dropbox if authenticated
        try {
          const accessToken = localStorage.getItem('dropboxAccessToken');
          if (accessToken) {
            const sessionBlob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
            const jsonFilename = `/autosave-session-${timestamp}.json`;

            await fetch('https://content.dropboxapi.com/2/files/upload', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Dropbox-API-Arg': JSON.stringify({
                  path: jsonFilename,
                  mode: 'overwrite',
                  autorename: false,
                  mute: true
                }),
                'Content-Type': 'application/octet-stream'
              },
              body: sessionBlob
            });

            console.log(`📤 Autosaved session to Dropbox: ${jsonFilename}`);
          }
        } catch (err) {
          console.error('❌ Dropbox autosave failed:', err);
        }
      } catch (err) {
        console.error('❌ Excel autosave failed:', err);
      }
    }, minutes * 60 * 1000);
  }

  if (autosaveToggle) {
    const enabled = localStorage.getItem('config_autosave') === 'true';
    autosaveToggle.checked = enabled;

    if (enabled && autosaveIntervalSelect) {
      const savedMinutes = parseInt(localStorage.getItem('config_autosaveInterval') || '5', 10);
      startAutosave(savedMinutes);
    }

    autosaveToggle.addEventListener('change', () => {
      localStorage.setItem('config_autosave', autosaveToggle.checked);
      if (!autosaveToggle.checked) {
        clearInterval(autosaveIntervalId);
        createToast('⛔ Autosave disabled');
      } else {
        const mins = parseInt(autosaveIntervalSelect?.value || '5', 10);
        startAutosave(mins);
        createToast(`✅ Autosave enabled (every ${mins} min)`);
      }
    });
  }

  if (autosaveIntervalSelect) {
    const saved = localStorage.getItem('config_autosaveInterval') || '5';
    autosaveIntervalSelect.value = saved;

    autosaveIntervalSelect.addEventListener('change', () => {
      const mins = parseInt(autosaveIntervalSelect.value, 10);
      localStorage.setItem('config_autosaveInterval', mins);
      if (autosaveToggle?.checked) {
        startAutosave(mins);
        createToast(`🔄 Autosave interval updated to ${mins} min`);
      }
    });
  }

  const numericKeypadToggle = document.getElementById('numericKeypadToggle');
  if (numericKeypadToggle) {
    const saved = localStorage.getItem('config_numericKeypad') === 'true';
    numericKeypadToggle.checked = saved;
    document.body.classList.toggle('numeric-keypad', saved);

    // Set inputmode on load if enabled
    const liveEntry = document.getElementById('liveEntry');
    if (liveEntry) {
      if (saved) {
        liveEntry.setAttribute('inputmode', 'numeric');
      } else {
        liveEntry.removeAttribute('inputmode');
      }
    }

    numericKeypadToggle.addEventListener('change', () => {
      const enabled = numericKeypadToggle.checked;
      localStorage.setItem('config_numericKeypad', enabled);
      document.body.classList.toggle('numeric-keypad', enabled);

      const liveEntry = document.getElementById('liveEntry');
      if (liveEntry) {
        if (enabled) {
          liveEntry.setAttribute('inputmode', 'numeric');
        } else {
          liveEntry.removeAttribute('inputmode');
        }
      }

      createToast(`🔢 Numeric Keypad ${enabled ? 'enabled' : 'disabled'}`);
    });
  }

  // Clear only inventory session keys
  const clearSessionBtn = document.getElementById('clearSession');
  if (clearSessionBtn) {
    clearSessionBtn.addEventListener('click', () => {
      console.log('🧹 Clear session triggered');
      const keys = Object.keys(localStorage);
      let count = 0;
      keys.forEach(key => {
        if (key.startsWith('inventorySession_')) {
          localStorage.removeItem(key);
          count++;
        }
      });
      alert(`🗑️ Removed ${count} session record${count !== 1 ? 's' : ''}`);
      location.reload();
    });
  }

  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      localStorage.clear();
      alert('🧹 Local storage cleared');
      location.reload();
    });
  }

  const resetAllMapsBtn = document.getElementById('resetAllMapsBtn');
  if (resetAllMapsBtn) {
    resetAllMapsBtn.addEventListener('click', () => {
      if (confirm('⚠️ This will erase all saved maps. Are you sure?')) {
        localStorage.removeItem('upcToItemMap');
        localStorage.removeItem('eslToUPCMap');
        localStorage.removeItem('locationMap');
        alert('🧼 All maps have been reset');
        updateMapStatusDisplay({}, {}, {});
        location.reload();
      }
    });
  }

  const viewTrendsBtn = document.getElementById('viewTrendsBtn');
  if (viewTrendsBtn) {
    viewTrendsBtn.addEventListener('click', () => {
      console.log('📊 View trends button clicked — feature in progress.');
      alert('📊 View trends is coming soon.');
    });
  }

  // Add additional UI button/event listeners here as needed

  // --- Close Bay Button Listener ---
  const closeBayBtn = document.getElementById('closeBayBtn');
  if (closeBayBtn) {
    closeBayBtn.addEventListener('click', () => {
      // Clear current bay from storage or memory
      currentBay = null;
      localStorage.removeItem('activeBay');

      // Update bay status display
      const bayStatus = document.getElementById('bayStatusDisplay');
      bayStatus.textContent = '🚫 No Active Bay';
      bayStatus.style.color = 'red';

      // Show bay closed notice
      document.getElementById('bayClosedNotice').style.display = 'inline';

      // Optional: reset bay-related logic if needed
      createToast('Bay closed successfully.');
    });
  }

  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const upcMap = JSON.parse(localStorage.getItem('locationMap') || '{}');
      const blob = new Blob([JSON.stringify(upcMap, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'bay_location_backup.json';
      a.click();
    });
  }

  const importBtn = document.getElementById('importBtn');
  if (importBtn) {
    importBtn.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json';
      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = JSON.parse(reader.result);
            localStorage.setItem('locationMap', JSON.stringify(data));
            alert('✅ Bay location map imported successfully');
            location.reload();
          } catch (e) {
            alert('❌ Failed to import bay location map.');
          }
        };
        reader.readAsText(file);
      });
      fileInput.click();
    });
  }

  const exportUPCBtn = document.getElementById('exportUPCBtn');
  if (exportUPCBtn) {
    exportUPCBtn.addEventListener('click', () => {
      const upcMap = JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
      const blob = new Blob([JSON.stringify(upcMap, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'upc_mappings_backup.json';
      a.click();
    });
  }

  const importUPCBtn = document.getElementById('importUPCBtn');
  if (importUPCBtn) {
    importUPCBtn.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json';
      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = JSON.parse(reader.result);
            localStorage.setItem('upcToItemMap', JSON.stringify(data));
            alert('✅ UPC mappings imported successfully');
            location.reload();
          } catch (e) {
            alert('❌ Failed to import UPC mappings.');
          }
        };
        reader.readAsText(file);
      });
      fileInput.click();
    });
  }

  document.getElementById('exportAuditLog')?.addEventListener('click', async () => {
    // Use global bayAuditTimes object for export
    if (!window.bayAuditTimes || Object.keys(window.bayAuditTimes).length === 0) {
      alert('No audit logs to export.');
      return;
    }
    // Load SheetJS
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs');
    const wsData = [['Bay Name', 'Duration', 'Timestamp']];
    if (Array.isArray(window.bayAuditTimes)) {
      window.bayAuditTimes.forEach(entry => {
        wsData.push([entry.bay, entry.duration, entry.timestamp]);
      });
    } else {
      // fallback for object format (legacy)
      for (const [bay, duration] of Object.entries(window.bayAuditTimes)) {
        wsData.push([bay, (duration / 1000).toFixed(1), '']);
      }
    }
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bay Audit Log');
    XLSX.writeFile(workbook, 'bay-audit-log.xlsx');
  });

  const resetAuditLogBtn = document.getElementById('resetAuditLog');
  if (resetAuditLogBtn) {
    resetAuditLogBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all bay audit logs?')) {
        window.bayAuditTimes = [];
        renderBayAuditLog(window.bayAuditTimes);
        alert('Audit log cleared.');
      }
    });
  }

  const moreOptionsBtn = document.getElementById('moreOptionsBtn');
  if (moreOptionsBtn) {
    moreOptionsBtn.addEventListener('click', () => {
      const morePanel = document.getElementById('moreOptionsPanel');
      if (morePanel) {
        morePanel.classList.toggle('hidden');
      }
    });
  }

  // Wire up the Add Item button
  const addLiveItemBtn = document.getElementById('addLiveItem');
  if (addLiveItemBtn) {
    addLiveItemBtn.addEventListener('click', () => {
      console.log('✅ Add Item button clicked');
      const input = document.getElementById('liveEntry');
      const quantity = parseInt(document.getElementById('liveQty')?.value || '1', 10);
      const category = document.getElementById('liveCategory')?.value || 'Uncategorized';

      if (!input || !input.value.trim()) {
        alert('Please enter a valid item code.');
        return;
      }

      const value = input.value.trim();
      // Call handleManualScan directly instead of dispatching event
      if (typeof window.handleManualScan === 'function') {
        window.handleManualScan({ detail: { code: value, quantity, category } });
      } else {
        console.warn('❌ handleManualScan is not defined');
      }
      console.log('📤 manual-scan dispatched with:', value, quantity, category);
      // Reset inputs after manual scan
      input.value = '';
      document.getElementById('liveQty').value = '1';
      document.getElementById('liveCategory').value = 'Uncategorized';
      input.focus();
    });
  }

  const loadFromDropboxBtn = document.getElementById('loadFromDropbox');
  if (loadFromDropboxBtn) {
    loadFromDropboxBtn.addEventListener('click', () => {
      if (typeof window.handleManualScan === 'function') {
        window.handleManualScan({ detail: { code: value, quantity, category } });
      } else {
        console.warn('❌ handleManualScan is not defined');
      }
    });
  }

  const connectBtn = document.getElementById('connectDropbox');
  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      const event = new CustomEvent('connect-dropbox');
      window.dispatchEvent(event);
    });
  }

  const refreshBtn = document.getElementById('refreshDropboxToken');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const event = new CustomEvent('refresh-dropbox-token');
      window.dispatchEvent(event);
    });
  }

  const syncBtn = document.getElementById('syncDropboxMaps');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      const event = new CustomEvent('sync-all-maps');
      window.dispatchEvent(event);
    });
  }

  const restoreBtn = document.getElementById('restoreDropboxMaps');
  if (restoreBtn) {
    restoreBtn.addEventListener('click', () => {
      const event = new CustomEvent('restore-all-maps');
      window.dispatchEvent(event);
    });
  }

  const disconnectBtn = document.getElementById('disconnectDropbox');
  if (disconnectBtn) {
    disconnectBtn.addEventListener('click', () => {
      localStorage.removeItem('dropboxAccessToken');
      localStorage.removeItem('dropboxRefreshToken');
      alert('🔌 Dropbox disconnected.');
    });
  }

  // Additional button listeners
  const saveSessionBtn = document.getElementById('saveSessionBtn');
  if (saveSessionBtn) {
    saveSessionBtn.addEventListener('click', () => {
      console.log('💾 Save Session button clicked');
      const sessionData = JSON.stringify(window.sessionMap || {});
      localStorage.setItem('savedSession', sessionData);
      createToast('💾 Session saved to local storage.');
    });
  }

  const clearLiveTableBtn = document.getElementById('clearLiveTableBtn');
  if (clearLiveTableBtn) {
    clearLiveTableBtn.addEventListener('click', () => {
      console.log('🧹 Clear Live Table button clicked');
      window.sessionMap = {};
      const table = document.getElementById('liveTableBody');
      if (table) table.innerHTML = '';
      createToast('🧹 Live table cleared.');
    });
  }

  // Load session from local storage button
  const loadSessionBtn = document.getElementById('loadSessionBtn');
  if (loadSessionBtn) {
    loadSessionBtn.addEventListener('click', () => {
      console.log('📥 Load Session button clicked');
      const data = localStorage.getItem('savedSession');
      if (data) {
        window.sessionMap = JSON.parse(data);
        createToast('🔄 Session loaded from local storage.');
        const event = new CustomEvent('session-loaded');
        window.dispatchEvent(event);
      } else {
        createToast('⚠️ No saved session found in local storage.');
      }
    });
  }


  const uploadToExcelBtn = document.getElementById('uploadToExcelBtn');
  if (uploadToExcelBtn) {
    uploadToExcelBtn.addEventListener('click', () => {
      const event = new CustomEvent('upload-excel');
      window.dispatchEvent(event);
    });
  }

  // --- Dropbox Sessions Browse/Select ---
  const browseBtn = document.getElementById('browseDropboxSessions');
  const sessionSelect = document.getElementById('dropboxSessionSelect');

  if (browseBtn && sessionSelect) {
    browseBtn.addEventListener('click', async () => {
      sessionSelect.style.display = 'inline-block';
      sessionSelect.innerHTML = '<option>Loading sessions...</option>';
      try {
        const { listDropboxSessions, loadSelectedDropboxSession } = await import('./dropbox.js');
        const sessions = await listDropboxSessions();
        sessionSelect.innerHTML = '<option value="">Select a session</option>';
        sessions.forEach(name => {
          const opt = document.createElement('option');
          opt.value = name;
          opt.textContent = name;
          sessionSelect.appendChild(opt);
        });
      } catch (err) {
        sessionSelect.innerHTML = '<option>Error loading sessions</option>';
        console.error(err);
      }
    });

    sessionSelect.addEventListener('change', async () => {
      const filename = sessionSelect.value;
      if (!filename) return;
      try {
        const { loadSelectedDropboxSession } = await import('./dropbox.js');
        const onHandInput = document.getElementById('onHandInput');
        const updateLiveTable = window.updateLiveTable || (() => {});
        await loadSelectedDropboxSession(filename, window.sessionMap, onHandInput, updateLiveTable);
      } catch (err) {
        console.error('Failed to load selected session:', err);
      }
    });
  }

  const manualToggleBtn = document.getElementById('manualToggleBtn');
  if (manualToggleBtn) {
    manualToggleBtn.addEventListener('click', () => {
      const manualSection = document.getElementById('manualEntrySection');
      if (manualSection) {
        manualSection.classList.toggle('hidden');
      }
    });
  }

  // Export template button listener
  const exportTemplateBtn = document.getElementById('exportTemplateBtn');
  if (exportTemplateBtn) {
    exportTemplateBtn.addEventListener('click', () => {
      import('https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs').then(XLSX => {
        const headers = [{ Item: '', Count: '' }];
        const ws = XLSX.utils.json_to_sheet(headers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Template');
        XLSX.writeFile(wb, 'Template.xlsx');
      });
    });
  }

  // --- Import/Export Options Toggle ---
  const toggleImportExport = document.getElementById('toggleImportExport');
  if (toggleImportExport) {
    toggleImportExport.addEventListener('click', () => {
      const group = document.getElementById('importExportControls');
      if (group) {
        const hidden = group.classList.toggle('hidden');
        group.setAttribute('aria-hidden', hidden);
      }
    });
  }

  // --- On-Hand File Upload Trigger ---
  const uploadDropboxFile = document.getElementById('uploadDropboxFile');
  if (uploadDropboxFile) {
    uploadDropboxFile.addEventListener('click', () => {
      const input = document.getElementById('onHandFileInput');
      if (input) input.click();
    });
  }

  // --- Excel Session Upload Trigger ---
  const importExcelTrigger = document.getElementById('triggerImportExcelSession');
  if (importExcelTrigger) {
    importExcelTrigger.addEventListener('click', () => {
      const fileInput = document.getElementById('importExcelSession');
      if (fileInput) fileInput.click();
    });
  }

  // --- View Trends Modal Open ---
  const viewTrends = document.getElementById('viewTrends');
  if (viewTrends) {
    viewTrends.addEventListener('click', () => {
      const modal = document.getElementById('trendsModal');
      if (modal) modal.style.display = 'flex';
    });
  }

  // Session versioning support
  const saveNamedSessionBtn = document.getElementById('saveNamedSession');
  const versionSessionNameInput = document.getElementById('versionSessionName');
  const namedSessionSelect = document.getElementById('namedSessionSelect');
  const loadNamedSessionBtn = document.getElementById('loadNamedSession');
  const deleteNamedSessionBtn = document.getElementById('deleteNamedSession');

  // Load saved session keys into dropdown
  function refreshNamedSessionDropdown() {
    namedSessionSelect.innerHTML = '<option value="">Select a saved session</option>';
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('inventorySession_')) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = key.replace('inventorySession_', '');
        namedSessionSelect.appendChild(opt);
      }
    });
  }

  if (saveNamedSessionBtn && versionSessionNameInput) {
    saveNamedSessionBtn.addEventListener('click', () => {
      const name = versionSessionNameInput.value.trim();
      if (!name) return alert('Please enter a session name.');
      localStorage.setItem(`inventorySession_${name}`, JSON.stringify(window.sessionMap || {}));
      createToast(`💾 Saved session: ${name}`);
      refreshNamedSessionDropdown();
      versionSessionNameInput.value = '';
    });
  }

  if (loadNamedSessionBtn && namedSessionSelect) {
    loadNamedSessionBtn.addEventListener('click', () => {
      const key = namedSessionSelect.value;
      if (!key) return;
      const data = localStorage.getItem(key);
      if (data) {
        window.sessionMap = JSON.parse(data);
        createToast(`📥 Loaded session: ${key.replace('inventorySession_', '')}`);
        const event = new CustomEvent('session-loaded');
        window.dispatchEvent(event);
      }
    });
  }

  if (deleteNamedSessionBtn && namedSessionSelect) {
    deleteNamedSessionBtn.addEventListener('click', () => {
      const key = namedSessionSelect.value;
      if (!key) return;
      if (confirm(`Are you sure you want to delete "${key.replace('inventorySession_', '')}"?`)) {
        localStorage.removeItem(key);
        createToast(`❌ Deleted session: ${key.replace('inventorySession_', '')}`);
        refreshNamedSessionDropdown();
      }
    });
  }

  if (namedSessionSelect) {
    refreshNamedSessionDropdown();
  }

  // --- Config Panel Settings ---
  const autoRestoreCheckbox = document.getElementById('toggleAutoRestore');
  const toastsCheckbox = document.getElementById('toggleToasts');

  // Load saved config values
  if (autoRestoreCheckbox) {
    const stored = localStorage.getItem('config_autoRestore');
    autoRestoreCheckbox.checked = stored !== 'false'; // default true
    autoRestoreCheckbox.addEventListener('change', () => {
      localStorage.setItem('config_autoRestore', autoRestoreCheckbox.checked);
      createToast(`Auto-Restore ${autoRestoreCheckbox.checked ? 'enabled' : 'disabled'}`);
    });
  }

  if (toastsCheckbox) {
    const stored = localStorage.getItem('config_showToasts');
    toastsCheckbox.checked = stored !== 'false'; // default true
    toastsCheckbox.addEventListener('change', () => {
      localStorage.setItem('config_showToasts', toastsCheckbox.checked);
      createToast(`Toasts ${toastsCheckbox.checked ? 'enabled' : 'disabled'}`);
    });
  }

  // --- Advanced Tools ---
  const downloadBackupBtn = document.getElementById('downloadBackupBtn');
  if (downloadBackupBtn) {
    downloadBackupBtn.addEventListener('click', () => {
      const backup = {
        sessionMap: window.sessionMap || {},
        locationMap: JSON.parse(localStorage.getItem('locationMap') || '{}'),
        upcToItemMap: JSON.parse(localStorage.getItem('upcToItemMap') || '{}'),
        eslToUPCMap: JSON.parse(localStorage.getItem('eslToUPCMap') || '{}'),
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `inventory_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      createToast('📦 Backup downloaded.');
    });
  }

  const cleanStaleSessionsBtn = document.getElementById('cleanStaleSessions');
  if (cleanStaleSessionsBtn) {
    cleanStaleSessionsBtn.addEventListener('click', () => {
      let removed = 0;
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('inventorySession_')) {
          const val = localStorage.getItem(key);
          if (val && val === '{}' || val === JSON.stringify({})) {
            localStorage.removeItem(key);
            removed++;
          }
        }
      });
      createToast(`🧹 Removed ${removed} stale session${removed !== 1 ? 's' : ''}`);
      if (removed > 0) location.reload();
    });
  }

  // --- Merge Master Report Export ---
  const mergeMasterReportBtn = document.getElementById('mergeMasterReport');
  if (mergeMasterReportBtn) {
    mergeMasterReportBtn.addEventListener('click', async () => {
      const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs');

      // Gather session data
      const mergedRows = [];
      const keys = Object.keys(localStorage).filter(k => k.startsWith('inventorySession_'));

      keys.forEach(key => {
        const session = JSON.parse(localStorage.getItem(key));
        Object.entries(session).forEach(([item, data]) => {
          mergedRows.push({
            'Item #': item,
            'Count': data.count || 1,
            'Category': data.category || '',
            'Location': data.location || ''
          });
        });
      });

      // Format each sheet
      const summarySheet = XLSX.utils.json_to_sheet(mergedRows);
      const upcMap = JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
      const upcSheet = XLSX.utils.json_to_sheet(Object.entries(upcMap).map(([upc, item]) => ({
        'UPC': upc,
        'Item #': item
      })));

      const bayMap = JSON.parse(localStorage.getItem('locationMap') || '{}');
      const baySheet = XLSX.utils.json_to_sheet(Object.entries(bayMap).map(([item, bay]) => ({
        'Item #': item,
        'Bay': bay
      })));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, summarySheet, 'Session Summary');
      XLSX.utils.book_append_sheet(wb, upcSheet, 'UPC Mappings');
      XLSX.utils.book_append_sheet(wb, baySheet, 'Bay Locations');
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Coming soon...']]), 'Audit Rotation');
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Coming soon...']]), 'Weekly Counts');

      const now = new Date().toISOString().replace(/[:.]/g, '-');
      XLSX.writeFile(wb, `merged-inventory-report-${now}.xlsx`);
      createToast('📊 Merged Master Report generated.');
    });
  }

  // --- Audit Rotation Button ---
  document.getElementById('auditRotationBtn')?.addEventListener('click', () => {
    // Audit rotation logic: cycle through sections and persist state in localStorage
    const auditSections = ['Appliances', 'Kitchen & Cabinets', 'Millwork'];
    let currentAuditIndex = parseInt(localStorage.getItem('currentAuditIndex')) || 0;

    const currentSection = auditSections[currentAuditIndex];
    createToast(`🔍 Auditing: ${currentSection}`);
    console.log(`🔍 Now auditing section: ${currentSection}`);

    // Move to the next section for next time
    currentAuditIndex = (currentAuditIndex + 1) % auditSections.length;
    localStorage.setItem('currentAuditIndex', currentAuditIndex);
  });

  // Override createToast if disabled
  if (localStorage.getItem('config_showToasts') === 'false') {
    window.createToast = () => {};
  }
}

export function setupTabNavigation() {
  const tabs = document.querySelectorAll('.tablink');
  const sections = document.querySelectorAll('.tab-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}
// --- Modal Confirm/Submit Button Handler (for mapPromptModal) ---
document.addEventListener('DOMContentLoaded', () => {
  const modalSubmitBtn = document.getElementById("modalSubmit");
  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener("click", () => {
      // This logic assumes the presence of global variables: currentMapType, upcToItem, locationMap, saveUPCMap, saveLocationMap, showToast
      // Fallbacks for demo: if not present, define them
      window.upcToItem = window.upcToItem || JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
      window.locationMap = window.locationMap || JSON.parse(localStorage.getItem('locationMap') || '{}');
      function saveUPCMap() { localStorage.setItem('upcToItemMap', JSON.stringify(window.upcToItem)); }
      function saveLocationMap() { localStorage.setItem('locationMap', JSON.stringify(window.locationMap)); }
      function showToast(msg) { if (typeof createToast === 'function') createToast(msg); }

      // --- scannedItems logic ---
      window.scannedItems = window.scannedItems || JSON.parse(localStorage.getItem('scannedItems') || '[]');
      function saveScannedItems() {
        localStorage.setItem('scannedItems', JSON.stringify(window.scannedItems));
      }

      // Use currentMapType only as set by user interaction, do not reset after confirm
      const input = document.getElementById("mapPromptInput")?.value.trim();
      const code = document.getElementById("mapPromptCode")?.textContent;
      // Only use the value set by the selector; do not reset here
      const currentMapType = window.currentMapType || window._selectedType || '';
      // Get liveCategory from UI, default to 'Uncategorized'
      const liveCategory = document.getElementById('liveCategory')?.value || 'Uncategorized';

      if (!input || !code) {
        showToast("Please enter a valid value.");
        return;
      }

      // Before rendering table, add manual entry to scannedItems if not already present
      const alreadyExists = window.scannedItems.some(
        item => item.code === code && item.type === currentMapType && item.value === input
      );
      if (!alreadyExists) {
        window.scannedItems.push({
          code,
          type: currentMapType,
          value: input,
          timestamp: new Date().toLocaleString()
        });
        saveScannedItems();
      }

      if (currentMapType === "product") {
        window.upcToItem[code] = input;
        saveUPCMap();
        showToast(`Mapped ${code} to Product: ${input}`);
        updateMapStatusDisplay(); // Refresh status display
        if (typeof renderLiveScanTable === "function") renderLiveScanTable(); // Refresh the scanned items table
        // --- Update sessionMap for product mappings with category ---
        if (!window.sessionMap) window.sessionMap = {};
        if (!window.sessionMap[input]) window.sessionMap[input] = { count: 0 };
        window.sessionMap[input].count += 1;
        window.sessionMap[input].category = liveCategory;
        window.sessionMap[input].location = localStorage.getItem('activeBay') || '';
      } else if (currentMapType === "bay") {
        window.locationMap[code] = input;
        saveLocationMap();
        showToast(`Mapped ${code} to Bay: ${input}`);
        updateMapStatusDisplay();
        if (typeof renderLiveScanTable === "function") renderLiveScanTable();
      } else if (currentMapType === "esl") {
        window.upcToItem[code] = input;
        saveUPCMap();
        showToast(`Mapped ${code} to ESL: ${input}`);
        updateMapStatusDisplay();
        if (typeof renderLiveScanTable === "function") renderLiveScanTable();
      }

      // Do NOT reset window.currentMapType here; keep it as last user selection
      // Do NOT reset any category or map type radio/toggle UI here
      const modal = document.getElementById("mapPromptModal");
      if (modal) modal.style.display = "none";
      const inputSection = document.getElementById("mapInputSection");
      if (inputSection) inputSection.classList.add("hidden");
      const inputField = document.getElementById("mapPromptInput");
      if (inputField) inputField.value = "";
    });
  }
});