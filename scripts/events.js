// --- Mapping Modal Confirm/Cancel and Scan Type Buttons ---
// Confirm button in mapping modal
{
  const btn = document.getElementById('confirmModalBtn');
  if (btn && !btn.dataset.bound) {
    btn.addEventListener('click', () => {
      if (typeof handleMappingConfirmation === 'function') {
        handleMappingConfirmation();
      }
    });
    btn.dataset.bound = 'true';
  }
}
// Cancel button in mapping modal
{
  const btn = document.getElementById('cancelModalBtn');
  if (btn && !btn.dataset.bound) {
    btn.addEventListener('click', () => {
      if (typeof closeSmartModal === 'function') {
        closeSmartModal();
      }
    });
    btn.dataset.bound = 'true';
  }
}
// --- Modal Code Type Selection Buttons (Product/ESL/Bay) ---
// Refactored: Add a single clean set of event listeners in DOMContentLoaded below
// --- Handlers for modal code type selection buttons ---
function handleProduct() {
  if (typeof setMappingType === 'function') setMappingType('product');
  window._selectedType = 'product';
  window.currentMapType = 'product';
  const inputSection = document.getElementById("mapInputSection");
  if (inputSection) inputSection.classList.remove("hidden");
  const inputField = document.getElementById("mapPromptInput");
  if (inputField) inputField.focus();
  // Prefill modal input with scanned code and focus submit
  if (window._mappingCode) {
    if (inputField) inputField.value = window._mappingCode;
  }
  const submitBtn = document.getElementById("modalSubmit");
  if (submitBtn) submitBtn.focus();
}
function handleESL() {
  if (typeof setMappingType === 'function') setMappingType('esl');
  window._selectedType = 'esl';
  window.currentMapType = 'esl';
  const inputSection = document.getElementById("mapInputSection");
  if (inputSection) inputSection.classList.remove("hidden");
  const inputField = document.getElementById("mapPromptInput");
  if (inputField) inputField.focus();
  // Prefill modal input with scanned code and focus submit
  if (window._mappingCode) {
    if (inputField) inputField.value = window._mappingCode;
  }
  const submitBtn = document.getElementById("modalSubmit");
  if (submitBtn) submitBtn.focus();
}
function handleBay() {
  if (typeof setMappingType === 'function') setMappingType('bay');
  window._selectedType = 'bay';
  window.currentMapType = 'bay';
  const inputSection = document.getElementById("mapInputSection");
  if (inputSection) inputSection.classList.remove("hidden");
  const inputField = document.getElementById("mapPromptInput");
  if (inputField) inputField.focus();
  // Prefill modal input with scanned code and focus submit
  if (window._mappingCode) {
    if (inputField) inputField.value = window._mappingCode;
  }
  const submitBtn = document.getElementById("modalSubmit");
  if (submitBtn) submitBtn.focus();
}
// --- Refactored: Attach modal code type selection listeners robustly on DOMContentLoaded ---
// --- Robustly bind key UI buttons using dataset.bound and a helper ---
document.addEventListener('DOMContentLoaded', () => {
  const bindOnce = (id, label) => {
    const el = document.getElementById(id);
    if (el && !el.dataset.bound) {
      el.addEventListener('click', () => {
        console.log(`✅ ${label} clicked`);
      });
      el.dataset.bound = 'true';
    }
  };

  // Ensure all 6 required buttons are reliably bound:
  bindOnce('addLiveItem', 'addLiveItem');
  bindOnce('modalBtnLocation', 'modalBtnLocation');
  bindOnce('modalBtnProduct', 'modalBtnProduct');
  bindOnce('modalBtnESL', 'modalBtnESL');
  bindOnce('mapTypeESL', 'mapTypeESL');
  bindOnce('mapTypeProduct', 'mapTypeProduct');
});

// --- Edit Modal Confirm/Cancel Buttons ---
{
  const btn = document.getElementById('confirmEditBtn');
  if (btn && !btn.dataset.bound) {
    btn.addEventListener('click', () => {
      if (typeof handleEditConfirmation === 'function') {
        handleEditConfirmation();
      }
    });
    btn.dataset.bound = 'true';
  }
}
{
  const btn = document.getElementById('cancelEditBtn');
  if (btn && !btn.dataset.bound) {
    btn.addEventListener('click', () => {
      if (typeof closeEditModal === 'function') {
        closeEditModal();
      }
    });
    btn.dataset.bound = 'true';
  }
}
// --- Confirm and Cancel Edit Button Listeners for editItemModal ---
// These listeners handle edits for the liveScanTable using the editItemModal modal.
{
  const btn = document.getElementById('confirmEditBtn');
  if (btn && !btn.dataset.bound2) { // allow for double binding for this unique handler
    btn.addEventListener('click', () => {
      const rowIndex = parseInt(document.getElementById('editItemModal').dataset.rowIndex, 10);
      const newQuantity = parseInt(document.getElementById('editItemQty').value, 10);
      const newCategory = document.getElementById('editItemCategory').value.trim();

      if (!isNaN(rowIndex) && !isNaN(newQuantity) && newCategory) {
        const table = document.getElementById('liveScanTable');
        const row = table.rows[rowIndex];
        if (row) {
          row.cells[1].textContent = newQuantity;
          row.cells[2].textContent = newCategory;

          const scannedItems = JSON.parse(localStorage.getItem('scannedItems') || '[]');
          if (scannedItems[rowIndex]) {
            scannedItems[rowIndex].quantity = newQuantity;
            scannedItems[rowIndex].category = newCategory;
            localStorage.setItem('scannedItems', JSON.stringify(scannedItems));
          }

          document.getElementById('editItemModal').classList.add('hidden');
          console.log('✅ Edit confirmed and saved.');
        }
      } else {
        console.warn('⚠️ Invalid edit values or row index.');
      }
    });
    btn.dataset.bound2 = 'true';
  }
}
{
  const btn = document.getElementById('cancelEditBtn');
  if (btn && !btn.dataset.bound2) {
    btn.addEventListener('click', () => {
      document.getElementById('editItemModal').classList.add('hidden');
      document.getElementById('editItemQty').value = '';
      document.getElementById('editItemCategory').value = '';
      console.log('❌ Edit cancelled.');
    });
    btn.dataset.bound2 = 'true';
  }
}
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
  if (modalEditConfirm && !modalEditConfirm.dataset.bound) {
    modalEditConfirm.addEventListener("click", handleModalEditConfirmClick);
    modalEditConfirm.dataset.bound = "true";
  }
}
// Try binding immediately in case button is present
bindModalEditConfirmListener();
// Also bind after DOMContentLoaded in case button is added later
document.addEventListener('DOMContentLoaded', bindModalEditConfirmListener);


// --- Bay Audit Timing State ---
let currentBay = null;
let bayAuditTimes = [];
let selectedCategory = null;

// Show toast and handle unknown scan mappings interactively on manual scan event (modal version)
console.log('✅ Binding global manual-scan listener');

window.handleManualScan = function (e) {
  const { code, quantity, category } = e.detail;

  // DEV hook: reroute scan through handleScanInput if defined
  if (typeof window.handleScanInput === 'function') {
    return window.handleScanInput(code);
  }

  console.log('🧪 Primary manual-scan triggered:', code);

  const upcMap = JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
  const eslMap = JSON.parse(localStorage.getItem('eslToUPCMap') || '{}');
  const bayMap = JSON.parse(localStorage.getItem('locationMap') || '{}');

  let itemNum = '';
  // Stricter check: Only consider as mapped if the code is a direct key and the value is not empty
  if (Object.prototype.hasOwnProperty.call(upcMap, code) && typeof upcMap[code] === "string" && upcMap[code].trim() !== "") {
    itemNum = upcMap[code];
  } else if (Object.prototype.hasOwnProperty.call(eslMap, code) && typeof eslMap[code] === "string" && eslMap[code].trim() !== "") {
    itemNum = eslMap[code];
  } else if (Object.prototype.hasOwnProperty.call(bayMap, code) && typeof bayMap[code] === "string" && bayMap[code].trim() !== "") {
    itemNum = code;
  }

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
    window.sessionMap[itemNum].category = localStorage.getItem('lastUsedCategory') || category || window.sessionMap[itemNum].category || '';
    window.sessionMap[itemNum].location = bayMap[itemNum] || window.sessionMap[itemNum].location || '';
    if (typeof window.updateLiveTable === 'function') {
      console.log('[🧪] Calling updateLiveTable for', itemNum, window.sessionMap[itemNum]);
      window.updateLiveTable();
      // --- PATCH: update session stats after table update
      updateSessionStats(getTotalItemCount(), (currentBay && currentBay.name) || currentBay || 'None', selectedCategory || 'None');
    }
    createToast(`✅ Added ${quantity} to Item #${itemNum} (${category})`);
    window.dispatchEvent(new CustomEvent('session-updated'));
    return;
  } else {
    // Store last scanned code for triggerAddModal usage
    window.lastScannedCode = code;

    // --- PATCH: Show itemEntryModal for unknown UPCs if present and no other modal is active
    const itemEntryModal = document.getElementById('itemEntryModal');
    // Check if any modal is currently visible (simple check: look for modals with display not 'none')
    const isAnyModalActive = Array.from(document.querySelectorAll('.modal'))
      .some(modal => modal.style.display && modal.style.display !== 'none');
    if (itemEntryModal && !isAnyModalActive) {
      itemEntryModal.style.display = 'block';
      const upcInput = document.getElementById('upcInputField');
      if (upcInput) upcInput.value = code;
      const itemNumInput = document.getElementById('itemNumberInputField');
      if (itemNumInput) itemNumInput.focus();
      return; // Do not show any other modal
    }

    // --- (Legacy/other modal fallback, if itemEntryModal is not present) ---
    // Explicitly show the modal prompt for unmapped codes
    const modal = document.getElementById('mapPromptModal');
    const codeSpan = document.getElementById('mapPromptCode');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '9999';
    codeSpan.textContent = code;
    window._mappingCode = code;
  }

  // --- (If itemEntryModal is used, do not show fallback modal or customModal logic) ---
  // All customModal logic for unknown UPCs is removed/commented out.
  // Always update the live table after a scan (manual or mapped)
  if (typeof window.updateLiveTable === 'function') {
    console.log('[🧪] updateLiveTable firing from handleManualScan');
    window.updateLiveTable();
    // --- PATCH: update session stats after table update
    updateSessionStats(getTotalItemCount(), (currentBay && currentBay.name) || currentBay || 'None', selectedCategory || 'None');
  }
};

window.addEventListener('manual-scan', window.handleManualScan);

function initEventListeners() {
  // --- PATCH: Listen for category selector changes and update session stats mini panel ---
  const categorySelector = document.getElementById('liveCategory') || document.getElementById('categorySelect');
  if (categorySelector) {
    categorySelector.addEventListener('change', () => {
      selectedCategory = categorySelector.value || 'None';
      updateSessionStats(getTotalItemCount(), (currentBay && currentBay.name) || currentBay || 'None', selectedCategory || 'None');
    });
    // Initialize selectedCategory on load
    selectedCategory = categorySelector.value || 'None';
  }
  // --- PATCH: Listen for bay selector changes (if any) and update session stats mini panel ---
  const baySelector = document.getElementById('baySelect');
  if (baySelector) {
    baySelector.addEventListener('change', () => {
      currentBay = baySelector.value || 'None';
      updateSessionStats(getTotalItemCount(), (currentBay && currentBay.name) || currentBay || 'None', selectedCategory || 'None');
    });
  }
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
          // document.getElementById('liveCategory').value = 'Uncategorized'; // Removed to preserve selected category
          liveEntry.focus();
        }
      }
    });
  }
  // --- Add all main UI button listeners here ---
  // Example: navigation tab buttons, etc.
  // (Already present: see setupTabNavigation and other UI component listeners below.)
  console.log('🎛️ Event listeners initialized');
  // Update map status display on startup with data from localStorage
  // (Removed direct call to updateMapStatusDisplay to avoid ReferenceError before async import)

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
    if (!batchScanToggle.dataset.bound) {
      batchScanToggle.addEventListener('change', () => {
        window.batchScanEnabled = batchScanToggle.checked;
        localStorage.setItem('config_batchScan', batchScanToggle.checked);
        createToast(`🔄 Batch Scan ${batchScanToggle.checked ? 'enabled' : 'disabled'}`);
      });
      batchScanToggle.dataset.bound = 'true';
    }
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

    if (!autosaveToggle.dataset.bound) {
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
      autosaveToggle.dataset.bound = 'true';
    }
  }

  if (autosaveIntervalSelect) {
    const saved = localStorage.getItem('config_autosaveInterval') || '5';
    autosaveIntervalSelect.value = saved;

    if (!autosaveIntervalSelect.dataset.bound) {
      autosaveIntervalSelect.addEventListener('change', () => {
        const mins = parseInt(autosaveIntervalSelect.value, 10);
        localStorage.setItem('config_autosaveInterval', mins);
        if (autosaveToggle?.checked) {
          startAutosave(mins);
          createToast(`🔄 Autosave interval updated to ${mins} min`);
        }
      });
      autosaveIntervalSelect.dataset.bound = 'true';
    }
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

    if (!numericKeypadToggle.dataset.bound) {
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
      numericKeypadToggle.dataset.bound = 'true';
    }
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

  // --- Map Prompt Modal Cancel Button ---
  const cancelMapPromptBtn = document.getElementById('cancelMapPrompt');
  if (cancelMapPromptBtn) {
    cancelMapPromptBtn.addEventListener('click', () => {
      const modal = document.getElementById('mapPromptModal');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    });
  }

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

      // --- SESSION SUMMARY MODAL LOGIC (Refactored as per request) ---
      // Show session summary modal ONLY when closing a bay
      const summaryModal = document.getElementById('summaryModal');
      const summaryContent = document.getElementById('summaryContent');
      const activeBay = localStorage.getItem('activeBay');
      const auditData = JSON.parse(localStorage.getItem('auditData')) || {};
      const bayData = auditData[activeBay] || {};
      const totalItems = Object.values(bayData).reduce((sum, count) => sum + count, 0);
      const uniqueUPCs = Object.keys(bayData).length;
      const auditTimers = JSON.parse(localStorage.getItem('bayAuditTimers')) || {};
      const auditTime = auditTimers[activeBay] || 0;

      if (summaryContent) {
        summaryContent.innerHTML = `
          <p><strong>Bay:</strong> ${activeBay}</p>
          <p><strong>Total Items Scanned:</strong> ${totalItems}</p>
          <p><strong>Unique Items:</strong> ${uniqueUPCs}</p>
          <p><strong>Audit Time:</strong> ${auditTime} seconds</p>
        `;
      }

      // Only show the summary modal in response to this user action (closing bay)
      if (summaryModal) {
        summaryModal.style.display = 'block';
        // Remove 'show' class if present and ensure modal does not show by default after page load
        summaryModal.classList.remove('show');
      }
    });
  }

  // --- Summary Modal Close Button Listener ---
  const closeSummaryBtn = document.getElementById('closeSummaryBtn');
  if (closeSummaryBtn) {
    closeSummaryBtn.addEventListener('click', () => {
      document.getElementById('summaryModal').style.display = 'none';
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
  if (addLiveItemBtn && !addLiveItemBtn.dataset.bound) {
    addLiveItemBtn.addEventListener('click', () => {
      console.log('✅ Add Item button clicked');
      const input = document.getElementById('liveEntry');
      const quantity = parseInt(document.getElementById('liveQty')?.value || '1', 10);
      const category = document.getElementById('liveCategory')?.value || 'Uncategorized';

      // Store last used category for persistence
      localStorage.setItem('lastUsedCategory', category);
      // PATCH: update selectedCategory global
      selectedCategory = category;

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
      // document.getElementById('liveCategory').value = 'Uncategorized'; // Removed to preserve selected category
      input.focus();
      // PATCH: update session stats after adding item
      updateSessionStats(getTotalItemCount(), (currentBay && currentBay.name) || currentBay || 'None', selectedCategory || 'None');
    });
    addLiveItemBtn.dataset.bound = 'true';
  }

  // --- PATCH: Add diagnostic listeners for buttons that previously had no click event ---
  // Add after existing button bindings
  const loadActiveSessionBtn = document.getElementById('loadActiveSession');
  if (loadActiveSessionBtn && !loadActiveSessionBtn.dataset.bound) {
    loadActiveSessionBtn.addEventListener('click', () => {
      console.log('loadActiveSession clicked (listener added)');
    });
    loadActiveSessionBtn.dataset.bound = 'true';
  }

  const saveSessionLocalBtn = document.getElementById('saveSessionLocal');
  if (saveSessionLocalBtn && !saveSessionLocalBtn.dataset.bound) {
    saveSessionLocalBtn.addEventListener('click', () => {
      console.log('saveSessionLocal clicked (listener added)');
    });
    saveSessionLocalBtn.dataset.bound = 'true';
  }

  const loadSessionLocalBtn = document.getElementById('loadSessionLocal');
  if (loadSessionLocalBtn && !loadSessionLocalBtn.dataset.bound) {
    loadSessionLocalBtn.addEventListener('click', () => {
      console.log('loadSessionLocal clicked (listener added)');
    });
    loadSessionLocalBtn.dataset.bound = 'true';
  }

  const clearSessionHistoryBtn = document.getElementById('clearSessionHistory');
  if (clearSessionHistoryBtn && !clearSessionHistoryBtn.dataset.bound) {
    clearSessionHistoryBtn.addEventListener('click', () => {
      console.log('clearSessionHistory clicked (listener added)');
    });
    clearSessionHistoryBtn.dataset.bound = 'true';
  }

  const clearAllSessionsBtn = document.getElementById('clearAllSessions');
  if (clearAllSessionsBtn && !clearAllSessionsBtn.dataset.bound) {
    clearAllSessionsBtn.addEventListener('click', () => {
      console.log('clearAllSessions clicked (listener added)');
    });
    clearAllSessionsBtn.dataset.bound = 'true';
  }

  const bayLocationBtn = document.getElementById('bayLocationBtn');
  if (bayLocationBtn && !bayLocationBtn.dataset.bound) {
    bayLocationBtn.addEventListener('click', () => {
      console.log('bayLocationBtn clicked (listener added)');
    });
    bayLocationBtn.dataset.bound = 'true';
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

function setupTabNavigation() {
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
        // Explicitly update the live scan table after adding an item
        if (typeof renderLiveTable === "function") renderLiveTable();
      }

      // Persist the last selected map type globally
      if (currentMapType) {
        window._lastSelectedMapType = currentMapType;
      }

      // --- Mapping Logic for each type (Modal Confirm) ---
      if (currentMapType === "product") {
        // Product mapping: update upcToItemMap
        let upcToItemMap = JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
        upcToItemMap[code] = input;
        localStorage.setItem('upcToItemMap', JSON.stringify(upcToItemMap));
        showToast(`Mapped ${code} to Product: ${input}`);
        updateMapStatusDisplay();
        if (typeof renderLiveScanTable === "function") renderLiveScanTable();
        // --- Update sessionMap for product mappings with category ---
        if (!window.sessionMap) window.sessionMap = {};
        if (!window.sessionMap[input]) window.sessionMap[input] = { count: 0 };
        window.sessionMap[input].count += 1;
        window.sessionMap[input].category = liveCategory;
        window.sessionMap[input].location = localStorage.getItem('activeBay') || '';
      } else if (currentMapType === "esl") {
        // ESL mapping: update eslMap (use eslToUPCMap or similar)
        let eslMap = JSON.parse(localStorage.getItem('eslToUPCMap') || '{}');
        eslMap[code] = input;
        localStorage.setItem('eslToUPCMap', JSON.stringify(eslMap));
        showToast(`Mapped ${code} to ESL: ${input}`);
        updateMapStatusDisplay();
        if (typeof renderLiveScanTable === "function") renderLiveScanTable();
        // Update sessionMap for esl
        if (!window.sessionMap) window.sessionMap = {};
        if (!window.sessionMap[input]) window.sessionMap[input] = { count: 0 };
        window.sessionMap[input].count += 1;
        window.sessionMap[input].category = liveCategory;
        window.sessionMap[input].location = localStorage.getItem('activeBay') || '';
      } else if (currentMapType === "bay") {
        // Bay mapping: update locationMap
        let locationMap = JSON.parse(localStorage.getItem('locationMap') || '{}');
        locationMap[code] = input;
        localStorage.setItem('locationMap', JSON.stringify(locationMap));
        showToast(`Mapped ${code} to Bay: ${input}`);
        updateMapStatusDisplay();
        if (typeof renderLiveScanTable === "function") renderLiveScanTable();
        // Update sessionMap for bay
        if (!window.sessionMap) window.sessionMap = {};
        if (!window.sessionMap[input]) window.sessionMap[input] = { count: 0 };
        window.sessionMap[input].count += 1;
        window.sessionMap[input].category = liveCategory;
        window.sessionMap[input].location = input;
      }

      // Dispatch session-updated event after all map types
      window.dispatchEvent(new CustomEvent('session-updated'));

      // Reset _mappingCode and currentMapType after modal closes
      window._mappingCode = '';
      window.currentMapType = '';

      // Hide the modal completely and reset input/section
      const modal = document.getElementById("mapPromptModal");
      if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
      }
      const inputField = document.getElementById("mapPromptInput");
      if (inputField) inputField.value = "";
      const inputSection = document.getElementById("mapInputSection");
      if (inputSection) inputSection.classList.add("hidden");
    });
  }

  // Preselect the last used type when showing the modal, using localStorage for persistence
  const origHandleManualScan = window.handleManualScan;
  window.handleManualScan = function (...args) {
    // Call the original
    origHandleManualScan.apply(this, args);
    // After modal is shown (else block in handleManualScan), preselect last-used map type from localStorage
    setTimeout(() => {
      const savedType = localStorage.getItem('lastSelectedMapType');
      if (savedType) {
        const radio = document.querySelector(`input[name="itemType"][value="${savedType}"]`);
        if (radio) radio.checked = true;
      }
    }, 0);
  };
});

// --- Edit Modal Logic for Live Scan Table ---
// Handles confirm/cancel for editing live scan table entries
// --- Edit Modal Logic for Live Scan Table ---
// Handles confirm/cancel for editing live scan table entries
document.addEventListener('DOMContentLoaded', () => {
  // Confirm Edit Handler
  const confirmEditBtn = document.getElementById('confirmEditItem');
  if (confirmEditBtn && !confirmEditBtn.dataset.bound) {
    confirmEditBtn.addEventListener('click', () => {
      // Update all fields from modal
      const item = document.getElementById('editItemNumberInput')?.value.trim();
      const quantity = parseInt(document.getElementById('editQtyInput')?.value.trim(), 10);
      const category = document.getElementById('editCategorySelect')?.value;
      const code = document.getElementById('editCodeInput')?.value.trim();
      const type = document.getElementById('editTypeSelect')?.value;
      const value = document.getElementById('editValueInput')?.value.trim();
      const index = parseInt(confirmEditBtn.dataset.index, 10);

      if (!item || isNaN(quantity) || !category || !code || !type || !value || isNaN(index)) {
        console.warn("⚠️ Incomplete edit modal data.");
        return;
      }

      const scannedItems = window.scannedItems || JSON.parse(localStorage.getItem("scannedItems") || "[]");

      scannedItems[index] = {
        itemNumber: item,
        quantity,
        category,
        code,
        type,
        value,
        timestamp: new Date().toLocaleString()
      };

      window.scannedItems = scannedItems;
      localStorage.setItem("scannedItems", JSON.stringify(scannedItems));
      updateLiveTable();
      document.getElementById("editModal").classList.remove("show");
    });
    confirmEditBtn.dataset.bound = 'true';
  }

  // Cancel Edit Handler
  const cancelEditBtn = document.getElementById('cancelEditItem');
  if (cancelEditBtn && !cancelEditBtn.dataset.bound) {
    cancelEditBtn.addEventListener('click', () => {
      document.getElementById('editModal').classList.remove('show');
      const row = document.querySelector('#liveScanTableBody tr.editing');
      if (row) row.classList.remove('editing');
    });
    cancelEditBtn.dataset.bound = 'true';
  }
});

// Function to open the edit modal and prefill values (to be called from table row edit button)
window.openEditModalForRow = function(row) {
  // Clear previous editing states
  document.querySelectorAll('#liveScanTableBody tr.editing').forEach(r => r.classList.remove('editing'));
  row.classList.add('editing');

  // Prefill modal inputs
  document.getElementById('editItemNumberInput').value = row.querySelector('.item-number')?.textContent || '';
  document.getElementById('editQtyInput').value = row.querySelector('.quantity')?.textContent || '1';
  document.getElementById('editCategorySelect').value = row.querySelector('.category')?.textContent || '';

  const code = row.dataset.code || '';
  const type = row.dataset.type || '';
  const value = row.dataset.value || '';

  if (document.getElementById('editCodeInput')) {
    document.getElementById('editCodeInput').value = code;
  }

  if (document.getElementById('editValueInput')) {
    document.getElementById('editValueInput').value = value;
  }

  const typeSelect = document.getElementById('editTypeSelect');
  if (typeSelect) {
    typeSelect.value = type;
    // Fallback: if typeSelect is not available, try to set radio
    const radio = document.querySelector(`input[name="itemType"][value="${type}"]`);
    if (radio) radio.checked = true;
  }

  // Show modal
  const modal = document.getElementById('editModal');
  if (modal) modal.classList.add('show');

  // Store row index for saving
  const index = Array.from(row.parentNode.children).indexOf(row);
  const confirmBtn = document.getElementById('editConfirmBtn');
  if (confirmBtn) {
    confirmBtn.setAttribute('data-index', index);
  }
};

(function() {
// --- PATCH: Utility to get total item count in the live scan table
function getTotalItemCount() {
  const rows = document.querySelectorAll('#liveScanTableBody tr');
  return rows.length;
}
// --- PATCH: Update session stats mini panel
function updateSessionStats(count = 0, bay = 'None', category = 'None') {
  if (document.getElementById('sessionItemCount')) document.getElementById('sessionItemCount').textContent = count;
  if (document.getElementById('sessionBay')) document.getElementById('sessionBay').textContent = bay;
  if (document.getElementById('sessionCategory')) document.getElementById('sessionCategory').textContent = category;
}
// Expose globally if needed
window.updateSessionStats = updateSessionStats;
window.getTotalItemCount = getTotalItemCount;

// --- PATCH: Expose triggerAddModal globally for simulateScan and dev console
window.triggerAddModal = function (code = '') {
  const input = document.getElementById('liveEntry');
  if (input) input.value = code;
  const quantity = parseInt(document.getElementById('liveQty')?.value || '1', 10);
  const category = document.getElementById('liveCategory')?.value || 'Uncategorized';

  if (typeof window.handleManualScan === 'function') {
    window.handleManualScan({ detail: { code, quantity, category } });
  }
};

// --- PATCH: Replace editable row rendering in updateLiveTable for full-field editing ---
// (This patch assumes updateLiveTable exists elsewhere, but the following block is to be placed inside it)
// Find the section: if (editingIndex === index) { ... }
// and replace with:
//
// if (editingIndex === index) {
//   ... (see below) ...
// }
//
// [The following code block should be used in updateLiveTable:]
//
// if (editingIndex === index) {
//   const itemInput = document.createElement("input");
//   itemInput.value = item;
//   itemCell.textContent = "";
//   itemCell.appendChild(itemInput);
//
//   const qtyInput = document.createElement("input");
//   qtyInput.type = "number";
//   qtyInput.value = count;
//   countCell.textContent = "";
//   countCell.appendChild(qtyInput);
//
//   const catInput = document.createElement("input");
//   catInput.value = category || "";
//   categoryCell.textContent = "";
//   categoryCell.appendChild(catInput);
//
//   const bayInput = document.createElement("input");
//   bayInput.value = location || "";
//   locationCell.textContent = "";
//   locationCell.appendChild(bayInput);
//
//   const saveBtn = document.createElement("button");
//   saveBtn.textContent = "Save";
//   saveBtn.onclick = () => {
//     const newItem = itemInput.value.trim();
//     const newQty = parseInt(qtyInput.value);
//     const newCat = catInput.value.trim();
//     const newBay = bayInput.value.trim();
//
//     if (!isNaN(newQty) && newItem) {
//       liveCounts[newItem] = newQty;
//       if (newItem !== item) delete liveCounts[item];
//
//       sessionMap[newItem] = newQty;
//       if (newItem !== item) delete sessionMap[item];
//
//       itemCategory[newItem] = newCat;
//       if (newItem !== item) delete itemCategory[item];
//
//       locationMap[newItem] = newBay;
//       if (newItem !== item) delete locationMap[item];
//
//       editingIndex = null;
//       updateLiveTable();
//     }
//   };
//
//   const cancelBtn = document.createElement("button");
//   cancelBtn.textContent = "Cancel";
//   cancelBtn.onclick = () => {
//     editingIndex = null;
//     updateLiveTable();
//   };
//
//   actionCell.textContent = "";
//   actionCell.appendChild(saveBtn);
//   actionCell.appendChild(cancelBtn);
// }

// --- Ensure UI helpers and event listeners are loaded in order ---
(async () => {
  const { createToast, updateMapStatusDisplay, renderBayAuditLog } = await import('./ui.js');
  window.createToast = createToast;
  window.updateMapStatusDisplay = updateMapStatusDisplay;
  window.renderBayAuditLog = renderBayAuditLog;

  // ✅ Safe to initialize after UI helpers are loaded
  initEventListeners();
  if (typeof initializeUI === 'function') {
    initializeUI();
  }
  // DO NOT automatically open the session summary modal on load
  // If you previously had:
  // document.getElementById("summaryModal").style.display = 'flex';
  // or showModal(summaryModal);
  // or showSessionSummary()/openSessionSummaryModal() here, it is now removed/commented.
  // Confirmed: no summaryModal.style.display = 'flex' or showModal(summaryModal) on page load.
})();
// Expose these functions globally for dev-debug.js and others
window.initEventListeners = initEventListeners;
window.setupTabNavigation = setupTabNavigation;
// --- Edit Modal Logic for Live Scan Table (Alternative Edit Modal) ---
// Wire up modal confirm/cancel for alternative edit modal if present
document.addEventListener('DOMContentLoaded', () => {
  // Select modal buttons
  const editConfirmBtn = document.getElementById('editConfirmBtn');
  const editCancelBtn = document.getElementById('editCancelBtn');

  // Add event listeners as per requirements
  if (editConfirmBtn) {
    editConfirmBtn.addEventListener('click', () => {
      const index = editConfirmBtn.getAttribute('data-index');
      handleEditConfirm(index);
    });
  }

  if (editCancelBtn) {
    editCancelBtn.addEventListener('click', () => {
      closeModal('editModal');
    });
  }
});

// Ensure handleEditConfirm is defined
function handleEditConfirm(index) {
  const newItem = document.getElementById('editItemNumberInput')?.value.trim();
  const newQty = parseInt(document.getElementById('editQtyInput')?.value.trim(), 10);
  const newCategory = document.getElementById('editCategorySelect')?.value;

  if (index !== null && !isNaN(newQty) && newItem && newCategory) {
    if (typeof updateItemEntry === 'function') {
      updateItemEntry(index, newItem, newQty, newCategory);
    }
    if (typeof closeModal === 'function') {
      closeModal('editModal');
    }
  } else {
    console.warn('Invalid input on edit modal.');
  }
}
// --- PATCH: Add missing event listeners for buttons not handled above ---
// Listeners for additional buttons as per requirements
[
  "uploadDropboxFile",
  "viewSnapshotsBtn",
  "clearSnapshotsBtn",
  "browseDropboxSessions",
  "exportMappings",
  "importMappings",
  "batchScanToggle",
  "numericKeypadToggle",
  "autosaveIntervalSelect",
  "autosaveToggle",
  "syncDropboxMaps",
  "restoreDropboxMaps",
  "downloadBackupBtn",
  "cleanStaleSessions",
  // Removed: "modalBtnLocation",
  // Removed: "modalBtnProduct",
  // Removed: "modalBtnESL",
  "modalBtnCancel",
  // NOTE: mapTypeESL, mapTypeProduct, mapTypeBay handled below
  "toggleToasts"
].forEach(id => {
  document.getElementById(id)?.addEventListener("click", () => {
    console.log(`${id} clicked (listener added)`);
  });
});

// --- PATCH: Bind mapTypeProduct, mapTypeESL, and mapTypeBay buttons to transition to next input section ---
document.addEventListener("DOMContentLoaded", () => {
  const mapProduct = document.querySelector("#mapPromptModal #mapTypeProduct");
  const mapESL = document.querySelector("#mapPromptModal #mapTypeESL");
  const mapBay = document.querySelector("#mapPromptModal #mapTypeBay");

  if (mapProduct && !mapProduct.dataset.bound) {
    mapProduct.addEventListener("click", () => {
      console.log("✅ Product selected from mapPrompt");
      const modal = document.getElementById('mapPromptModal');
      if (modal) modal.classList.remove("hidden");
      handleProduct();
    });
    mapProduct.dataset.bound = "true";
  }

  if (mapESL && !mapESL.dataset.bound) {
    mapESL.addEventListener("click", () => {
      console.log("✅ ESL selected from mapPrompt");
      const modal = document.getElementById('mapPromptModal');
      if (modal) modal.classList.remove("hidden");
      handleESL();
    });
    mapESL.dataset.bound = "true";
  }

  if (mapBay && !mapBay.dataset.bound) {
    mapBay.addEventListener("click", () => {
      console.log("✅ Bay selected from mapPrompt");
      const modal = document.getElementById('mapPromptModal');
      if (modal) modal.classList.remove("hidden");
      handleBay();
    });
    mapBay.dataset.bound = "true";
  }
});

// --- PATCH: Prevent summary modal from opening automatically on page load ---
// There is no code here that shows the summary modal (#summaryModal) on page load or outside of a user-triggered function.
// All summary modal displays (e.g., summaryModal.style.display = 'block') are inside click event handlers or conditionals.

// --- RESTORED: Handle scanned UPCs (from scanner or input field) ---
// Place this after modal setup logic so showItemModal is available
(function() {
  // Helper: get current bay (from memory or storage)
  function getCurrentBay() {
    // Prefer in-memory currentBay if available, else from localStorage
    if (typeof currentBay === 'object' && currentBay && currentBay.name) return currentBay.name;
    return localStorage.getItem('activeBay') || currentBay || '';
  }

  // Helper: update scan stats display (fallback to updateSessionStats if available)
  function updateScanStatsDisplay() {
    if (typeof updateSessionStats === 'function') {
      updateSessionStats(getTotalItemCount(), getCurrentBay() || 'None', localStorage.getItem('selectedCategory') || 'None');
    }
  }

  // Helper: increment item count in session (fallback logic)
  function incrementItemCount(upc, itemNumber, category, bay) {
    window.sessionMap = window.sessionMap || {};
    if (!window.sessionMap[itemNumber]) window.sessionMap[itemNumber] = { count: 0 };
    window.sessionMap[itemNumber].count += 1;
    window.sessionMap[itemNumber].category = category;
    window.sessionMap[itemNumber].location = bay;
    if (typeof window.updateLiveTable === 'function') window.updateLiveTable();
  }

  // Helper: show toast
  function showToast(msg, type) {
    if (typeof createToast === 'function') createToast(msg, type);
  }

  // Helper: show item modal for unknown UPC
  function showItemModal(upc) {
    // Prefer itemEntryModal if present, else fallback to mapPromptModal
    const itemEntryModal = document.getElementById('itemEntryModal');
    const isAnyModalActive = Array.from(document.querySelectorAll('.modal'))
      .some(modal => modal.style.display && modal.style.display !== 'none');
    if (itemEntryModal && !isAnyModalActive) {
      itemEntryModal.style.display = 'block';
      const upcInput = document.getElementById('upcInputField');
      if (upcInput) upcInput.value = upc;
      const itemNumInput = document.getElementById('itemNumberInputField');
      if (itemNumInput) itemNumInput.focus();
      return;
    }
    // Fallback to mapPromptModal
    const modal = document.getElementById('mapPromptModal');
    const codeSpan = document.getElementById('mapPromptCode');
    if (modal && codeSpan) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.position = 'fixed';
      modal.style.top = '50%';
      modal.style.left = '50%';
      modal.style.transform = 'translate(-50%, -50%)';
      modal.style.zIndex = '9999';
      codeSpan.textContent = upc;
      window._mappingCode = upc;
    }
  }

  // --- UPC to Item map (in-memory or from storage) ---
  function getUPCToItemMap() {
    return window.upcToItem || JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
  }

  // Main handler for scanned UPCs
  window.handleScannedUPC = function handleScannedUPC(upc) {
    const bay = getCurrentBay();
    const category = localStorage.getItem('selectedCategory') || '';
    const upcToItem = getUPCToItemMap();
    const scannedItem = upcToItem[upc];

    if (!bay || !category) {
      showToast('Please select a bay and category before scanning.', 'error');
      return;
    }

    if (scannedItem) {
      incrementItemCount(upc, scannedItem, category, bay);
    } else {
      showItemModal(upc);
    }

    updateScanStatsDisplay(); // Refresh stats after each scan
  };

  // Attach scan line input listener (if present)
  document.addEventListener('DOMContentLoaded', () => {
    const scanLine = document.getElementById('scanLine');
    if (scanLine) {
      scanLine.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const input = e.target.value.trim();
          e.target.value = '';
          if (input) {
            handleScannedUPC(input);
          }
        }
      });
    }
  });
})();
// --- PATCH: Failsafe for all major action buttons to prevent multiple bindings ---
[
  "confirmModalBtn",
  "cancelModalBtn",
  "confirmEditBtn",
  "cancelEditBtn",
  "confirmEditItem",
  "cancelEditItem",
  "modalEditConfirm",
  "modalBtnProduct",
  "modalBtnESL",
  "modalBtnLocation",
  "modalBtnBay",
  "mapTypeESL",
  "mapTypeProduct",
  "mapTypeBay",
  "cancelMapPrompt",
  "closeBayBtn",
  "viewTrendsBtn",
  "exportBtn",
  "importBtn",
  "exportUPCBtn",
  "importUPCBtn",
  "addLiveItem",
  "loadFromDropbox",
  "connectDropbox",
  "refreshDropboxToken",
  "syncDropboxMaps",
  "restoreDropboxMaps",
  "disconnectDropbox",
  "saveSessionBtn",
  "clearLiveTableBtn",
  "loadSessionBtn",
  "uploadToExcelBtn",
  "browseDropboxSessions",
  "manualToggleBtn",
  "exportTemplateBtn",
  "toggleImportExport",
  "uploadDropboxFile",
  "triggerImportExcelSession",
  "viewTrends",
  "saveNamedSessionBtn",
  "loadNamedSessionBtn",
  "deleteNamedSessionBtn",
  "downloadBackupBtn",
  "cleanStaleSessions",
  "mergeMasterReport",
  "auditRotationBtn"
].forEach(id => {
  const btn = document.getElementById(id);
  if (btn && !btn.dataset.bound) {
    // Only set the .dataset.bound property, do not override existing handlers
    btn.dataset.bound = 'true';
  }
});

// --- PATCH: Diagnostic to validate button presence and listener binding ---
document.addEventListener('DOMContentLoaded', () => {
  const buttonsToCheck = [
    { id: 'addLiveItem', label: 'Add Item' },
    { id: 'downloadToExcelBtn', label: 'Download Excel' },
    { id: 'loadActiveSession', label: 'Load Active Session' },
    { id: 'loadSessionLocal', label: 'Load Session Locally' },
    { id: 'clearSessionHistory', label: 'Clear Session History' },
    { id: 'clearAllSessions', label: 'Clear All Sessions' },
    { id: 'bayLocationBtn', label: 'Bay Location' },
    { id: 'mapTypeProduct', label: 'Product' },
    { id: 'mapTypeESL', label: 'ESL Tag' }
  ];

  buttonsToCheck.forEach(({ id, label }) => {
    const btn = document.getElementById(id);
    if (btn) {
      if (!btn.dataset.bound) {
        btn.addEventListener('click', () => {
          console.log(`✅ ${label} clicked (listener active)`);
        });
        btn.dataset.bound = 'true';
        console.log(`🟢 Bound listener for: ${label} (${id})`);
      }
    } else {
      console.warn(`❌ Button not found in DOM: ${label} (${id})`);
    }
  });
});

// --- Ensure final IIFE is properly closed ---
})();

// 🔄 Bulletproof Button Rebinding (No Conditions)
(function bindAllButtons() {
  const buttonIds = [
    'addLiveItem',
    'modalBtnLocation',
    'modalBtnProduct',
    'modalBtnESL',
    'mapTypeESL',
    'mapTypeProduct'
  ];

  buttonIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        console.log(`✅ ${id} clicked`);
      });
    }
  });

  console.log('🔁 Rebinding attempt complete.');
})();