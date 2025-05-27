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

  const loadSessionBtn = document.getElementById('loadFromDropbox');
  if (loadSessionBtn) {
    loadSessionBtn.addEventListener('click', () => {
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