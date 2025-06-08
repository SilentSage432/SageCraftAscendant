// Wiring Expectation Audit v3.0 — Fully synced to current DOM
window.runWiringExpectationAudit = function () {
  console.log('%c[DEBUG] Running Wiring Expectation Audit v3.0...', 'color: yellow; font-weight: bold;');

  const expectedButtons = [
    { id: 'scanNav', label: 'Scan Nav', required: 1 },
    { id: 'onhandNav', label: 'OnHand Nav', required: 1 },
    { id: 'sessionsNav', label: 'Sessions Nav', required: 1 },
    { id: 'devNav', label: 'Dev Nav', required: 1 },
    { id: 'loadOnHandBtn', label: 'Load OnHand', required: 1 },
    { id: 'clearOnHandBtn', label: 'Clear OnHand', required: 1 },
    { id: 'toggleDevDashboardBtn', label: 'Toggle Dev Panel', required: 1 },
    { id: 'clearScanTable', label: 'Clear Scan Table', required: 1 },
    { id: 'uploadOnHandBtn', label: 'Upload OnHand', required: 1 },
    { id: 'closeBayBtn', label: 'Close Bay', required: 1 },
    { id: 'addLiveItem', label: 'Add Live Item', required: 1 },
    { id: 'moreOptionsBtn', label: 'More Options', required: 1 },
    { id: 'toggleImportExport', label: 'Toggle Import Export', required: 1 },
    { id: 'exportBtn', label: 'Export Bay Locations', required: 1 },
    { id: 'importBtn', label: 'Import Bay Locations', required: 1 },
    { id: 'exportUPCBtn', label: 'Export UPC Mappings', required: 1 },
    { id: 'importUPCBtn', label: 'Import UPC Mappings', required: 1 },
    { id: 'clearLiveTableBtn', label: 'Clear Live Table', required: 1 },
    { id: 'viewTrends', label: 'View Trends', required: 1 }
  ];

  expectedButtons.forEach(({ id, label, required }) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`%c✖ ${label} [ID: ${id}] — Element missing from DOM`, 'color: red;');
      return;
    }

    let listenerCount = 0;
    try {
      if (typeof getEventListeners === 'function') {
        const attached = getEventListeners(el);
        listenerCount = Object.keys(attached).reduce((sum, evt) => sum + attached[evt].length, 0);
      } else {
        listenerCount = "(cannot detect)";
      }
    } catch {
      listenerCount = "(not accessible)";
    }

    if (listenerCount >= required) {
      console.log(`%c✔ ${label} wired correctly (${listenerCount} listener(s))`, 'color: green;');
    } else {
      console.warn(`%c✖ ${label} wired incorrectly (${listenerCount} listener(s))`, 'color: orange;');
    }
  });

  console.log('%c[DEBUG] Wiring Expectation Audit v3.0 Complete.', 'color: yellow;');
};

// Auto-Healing Layer v3.0 — Fully syncs with current wiring map
window.runAutoHealingLayer = function () {
  console.log('%c[DEBUG] Running Auto-Healing Layer v3.0...', 'color: lime; font-weight: bold;');

  // NAV BUTTONS
  const navMap = {
    scanNav: 'count',
    onhandNav: 'onhand',
    sessionsNav: 'sessions',
    devNav: 'dev'
  };

  Object.entries(navMap).forEach(([id, tab]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.floating-nav .nav-icon').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(tab);
        if (target) target.classList.add('active');
        btn.classList.add('active');
      };
    }
  });

  // DEV DASHBOARD BUTTONS
  const devBtnMap = [
    { id: 'clearScanTable', fn: clearLiveTable },
    { id: 'uploadOnHandBtn', fn: uploadOnHandFile },
    { id: 'clearOnHandBtn', fn: () => document.getElementById('onHandInput').value = '' },
    { id: 'loadOnHandBtn', fn: () => document.getElementById('onHandFile').click() },
    { id: 'addLiveItem', fn: promptManualItemAdd },
    { id: 'viewTrends', fn: viewTrends }
  ];

  devBtnMap.forEach(({ id, fn }) => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = fn;
  });

  // DEV PANEL TOGGLE BUTTON
  const toggleBtn = document.getElementById('toggleDevDashboardBtn');
  const panel = document.getElementById('devDashboard');
  if (toggleBtn && panel) {
    toggleBtn.onclick = () => {
      panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
    };
  }

  console.log('%c[DEBUG] Auto-Healing Layer v3.0 Complete.', 'color: lime;');
};