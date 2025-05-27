import { createToast } from './ui.js';
import { updateMapStatusDisplay } from './ui.js';

export function initEventListeners() {
  console.log('🎛️ Event listeners initialized');

  setupTabNavigation();

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
      const input = document.getElementById('liveEntry');
      const quantity = parseInt(document.getElementById('liveQty')?.value || '1', 10);
      const category = document.getElementById('liveCategory')?.value || 'Uncategorized';

      if (!input || !input.value.trim()) {
        alert('Please enter a valid item code.');
        return;
      }

      const value = input.value.trim();
      const event = new CustomEvent('manual-scan', {
        detail: { code: value, quantity, category }
      });

      window.dispatchEvent(event);
    });
  }

  const loadFromDropboxBtn = document.getElementById('loadFromDropbox');
  if (loadFromDropboxBtn) {
    loadFromDropboxBtn.addEventListener('click', () => {
      const event = new CustomEvent('load-dropbox-session');
      window.dispatchEvent(event);
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