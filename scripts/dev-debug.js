// Master Dev Profiler Switch
const DEV_PROFILE = true;  // ✅ Set to false for full production stripping

// Only activate in debug mode
if (DEV_PROFILE && window.location.href.includes('debug=true')) {
    console.log('%c[DEBUG MODE ENABLED]', 'color: limegreen; font-weight: bold;');
  
    // Simulate a scan
    window.simulateScan = function (code = '0123456789012') {
      console.log('%c[DEBUG] Simulating scan:', 'color: cyan;', code);
      window.dispatchEvent(new CustomEvent('manual-scan', { detail: code }));
    };
  
    // Category utilities
    window.getCurrentCategory = function () {
      const cat = localStorage.getItem('selectedCategory');
      console.log('%c[DEBUG] Current Category:', 'color: gold;', cat);
      return cat;
    };
  
    window.setCategory = function (category = 'Dishwashers') {
      localStorage.setItem('selectedCategory', category);
      console.log('%c[DEBUG] Category manually set to:', 'color: orange;', category);
    };
  
    // Dump live scan table
    window.dumpScanTable = function () {
      const rows = [...document.querySelectorAll('#liveScanTableBody tr')];
      console.log(`%c[DEBUG] Table has ${rows.length} rows:`, 'color: lightblue;');
      rows.forEach((row, i) => {
        const cells = [...row.children].map(td => td.textContent.trim());
        console.log(`%cRow ${i + 1}:`, 'color: silver;', cells);
      });
    };
  
    // Mapping tracker
    window.checkMapStatus = function () {
      console.log('%c[DEBUG] UPC Map:', 'color: violet;', window.upcToItem);
      console.log('%c[DEBUG] ESL Map:', 'color: pink;', window.eslToItem);
      console.log('%c[DEBUG] Bay Map:', 'color: turquoise;', window.locationMap);
    };
  
    // Toast tester
    window.showToastTest = function (msg = '🔧 Debug Toast Active') {
      if (typeof showToast === 'function') {
        showToast(msg, 'debug');
      } else {
        console.warn('[DEBUG] showToast() not available.');
      }
    };
  
    // Inspect session data
    window.inspectSessionData = function () {
      const session = JSON.parse(localStorage.getItem('sessionData') || '{}');
      console.log('%c[DEBUG] Session Data:', 'color: chartreuse;', session);
    };

    // Run a full audit of critical elements and listeners
    window.runAuditReport = function () {
      console.log('%c[DEBUG] Running Full Audit Report...', 'color: magenta; font-weight: bold;');

      const expectedIds = [
        'scanInput', 'addItemBtn', 'categorySelect', 'liveScanTableBody',
        'confirmEditBtn', 'cancelEditBtn', 'editModal', 'confirmModalBtn', 'cancelModalBtn'
      ];

      expectedIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          console.log(`%c✔ Element #${id} exists.`, 'color: green;');
        } else {
          console.warn(`%c✖ Element #${id} is missing.`, 'color: red;');
        }
      });

      const testEvent = 'manual-scan';
      const listenerCount = getEventListeners ? getEventListeners(window)[testEvent]?.length : undefined;
      if (listenerCount > 0) {
        console.log(`%c✔ '${testEvent}' has ${listenerCount} listener(s).`, 'color: green;');
      } else {
        console.warn(`%c✖ '${testEvent}' has no attached listeners.`, 'color: red;');
      }

      console.log('%c[DEBUG] Audit complete.', 'color: magenta;');
    };
    // Quick debug scan (unified scan engine)
    window.debugScan = async function (code = "123456789012") {
      console.log(`🧪 Debug Scan Triggered for code: ${code}`);
      await handleUnifiedScan(code, { source: "debug" });
    };

    // Clear console logs
    window.clearDebugLogs = function () {
      console.clear();
      console.log('%c[DEBUG] Console cleared.', 'color: gray;');
    };

    // Full button listener audit utility
    window.auditAllButtonListeners = function () {
      console.log('%c[DEBUG] Running Button Listener Audit...', 'color: magenta; font-weight: bold;');
      const buttons = document.querySelectorAll("button");
      console.log(`%cFound ${buttons.length} buttons:`, 'color: cyan;');
      buttons.forEach((btn, i) => {
        const label = btn.textContent.trim() || `[Button ${i + 1}]`;
        console.log(`%c- Button: ${label}`, 'color: lightgreen;');
      });
      console.log('%c[DEBUG] Button Audit Complete.', 'color: magenta;');
    };

    // Full button event listener binding audit (advanced)
    window.auditButtonEventBindings = function () {
      console.log('%c[DEBUG] Running Full Button Event Listener Audit...', 'color: magenta; font-weight: bold;');
      const buttons = document.querySelectorAll("button");
      console.log(`%cFound ${buttons.length} buttons:`, 'color: cyan;');
      buttons.forEach((btn, i) => {
        const label = btn.textContent.trim() || `[Button ${i + 1}]`;
        let listenerCount = 0;

        try {
          if (typeof getEventListeners === 'function') {
            const attached = getEventListeners(btn);
            listenerCount = Object.keys(attached).reduce((sum, evt) => sum + attached[evt].length, 0);
          } else {
            listenerCount = "(cannot detect in this browser)";
          }
        } catch {
          listenerCount = "(not accessible)";
        }

        console.log(`%c- Button: ${label} — Listeners: ${listenerCount}`, 'color: lightgreen;');
      });
      console.log('%c[DEBUG] Full Button Event Listener Audit Complete.', 'color: magenta;');
    };

    // Full global event listener audit (window-level)
    window.auditGlobalEventBindings = function () {
      console.log('%c[DEBUG] Running Global Window Event Listener Audit...', 'color: magenta; font-weight: bold;');

      try {
        if (typeof getEventListeners === 'function') {
          const globalEvents = getEventListeners(window);
          const keys = Object.keys(globalEvents);
          if (keys.length === 0) {
            console.log('%c[DEBUG] No global event listeners attached to window.', 'color: gray;');
          } else {
            console.log(`%cFound ${keys.length} global event types:`, 'color: cyan;');
            keys.forEach(eventType => {
              console.log(`%c- ${eventType}: ${globalEvents[eventType].length} listener(s)`, 'color: lightgreen;');
            });
          }
        } else {
          console.warn('%c[DEBUG] getEventListeners() not available in this browser.', 'color: orange;');
        }
      } catch (err) {
        console.error('%c[DEBUG] Failed to audit global event listeners:', 'color: red;', err);
      }

      console.log('%c[DEBUG] Global Event Listener Audit Complete.', 'color: magenta;');
    };

    // Full system deep audit
    window.runFullSystemAudit = function () {
      console.log('%c[DEBUG] Running Full System Deep Audit...', 'color: limegreen; font-weight: bold;');

      try {
        window.runAuditReport?.();
      } catch (e) {
        console.warn('[DEBUG] runAuditReport failed:', e);
      }

      try {
        window.auditAllButtonListeners?.();
      } catch (e) {
        console.warn('[DEBUG] auditAllButtonListeners failed:', e);
      }

      try {
        window.auditButtonEventBindings?.();
      } catch (e) {
        console.warn('[DEBUG] auditButtonEventBindings failed:', e);
      }

      try {
        window.auditGlobalEventBindings?.();
      } catch (e) {
        console.warn('[DEBUG] auditGlobalEventBindings failed:', e);
      }

      console.log('%c[DEBUG] Full System Audit Complete.', 'color: limegreen;');
    };

    // Wiring Expectation Audit v2.0 — Fully synced to DOM reality
    window.runWiringExpectationAudit = function () {
      console.log('%c[DEBUG] Running Wiring Expectation Audit v2.0...', 'color: yellow; font-weight: bold;');

      const expectedButtons = [
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

      console.log('%c[DEBUG] Wiring Expectation Audit v2.0 Complete.', 'color: yellow;');
    };

    // Auto-Healing Debug Layer v2.0 (DOM-Synced)
    window.runAutoHealingLayer = function () {
      console.log('%c[DEBUG] Running Auto-Healing Layer v2.0...', 'color: deepskyblue; font-weight: bold;');

      const wiringMap = [
        { id: 'exportBtn', label: 'Export Bay Locations', bind: () => exportBtn?.addEventListener('click', () => { console.log('[Auto-Heal] Export Bay Locations Clicked'); }) },
        { id: 'importBtn', label: 'Import Bay Locations', bind: () => importBtn?.addEventListener('click', () => { console.log('[Auto-Heal] Import Bay Locations Clicked'); }) },
        { id: 'exportUPCBtn', label: 'Export UPC Mappings', bind: () => exportUPCBtn?.addEventListener('click', () => { console.log('[Auto-Heal] Export UPC Mappings Clicked'); }) },
        { id: 'importUPCBtn', label: 'Import UPC Mappings', bind: () => importUPCBtn?.addEventListener('click', () => { console.log('[Auto-Heal] Import UPC Mappings Clicked'); }) }
      ];

      wiringMap.forEach(({ id, label, bind }) => {
        const el = document.getElementById(id);
        if (!el) {
          console.warn(`%c[Auto-Heal] ${label} — Element not found, skipping heal.`, 'color: orange;');
          return;
        }

        let listenerCount = 0;
        try {
          if (typeof getEventListeners === 'function') {
            const attached = getEventListeners(el);
            listenerCount = Object.keys(attached).reduce((sum, evt) => sum + attached[evt].length, 0);
          }
        } catch {}

        if (listenerCount === 0) {
          console.log(`%c[Auto-Heal] Healing listener for ${label}.`, 'color: deepskyblue;');
          try { bind(); } catch (err) {
            console.warn(`[Auto-Heal] Failed binding ${label}:`, err);
          }
        } else {
          console.log(`%c[Auto-Heal] ${label} already wired (${listenerCount} listener(s)).`, 'color: green;');
        }
      });

      console.log('%c[DEBUG] Auto-Healing Layer v2.0 Complete.', 'color: deepskyblue;');
    };

    // Master Diagnostic Layer — combines full system audit, wiring audit, and auto-healing
    window.runMasterDiagnostics = function () {
      console.log('%c[MASTER DIAGNOSTIC] Initiating Full System Diagnostic...', 'color: cyan; font-weight: bold;');

      try {
        window.runFullSystemAudit?.();
      } catch (e) {
        console.warn('[Master Diagnostic] runFullSystemAudit failed:', e);
      }

      try {
        window.runWiringExpectationAudit?.();
      } catch (e) {
        console.warn('[Master Diagnostic] runWiringExpectationAudit failed:', e);
      }

      try {
        window.runAutoHealingLayer?.();
      } catch (e) {
        console.warn('[Master Diagnostic] runAutoHealingLayer failed:', e);
      }

      console.log('%c[MASTER DIAGNOSTIC] Full Diagnostic Complete.', 'color: cyan; font-weight: bold;');
    };

    // Stability Safeguard Layer — protects against multiple boot binding conflicts
    window.stabilitySafeguard = function () {
      console.log('%c[STABILITY GUARD] Checking for multiple DOMContentLoaded or duplicate bindings...', 'color: gold; font-weight: bold;');

      if (window.__safeguardAlreadyInitialized) {
        console.warn('%c[STABILITY GUARD] Safeguard already initialized, duplicate boot prevented.', 'color: red;');
        return;
      }

      window.__safeguardAlreadyInitialized = true;

      const loadedEvents = performance.getEntriesByType("navigation");
      if (loadedEvents.length > 0) {
        console.log('%c[STABILITY GUARD] Navigation type:', 'color: lime;', loadedEvents[0].type);
      }

      const totalButtons = document.querySelectorAll("button").length;
      console.log(`%c[STABILITY GUARD] Total buttons present on DOM: ${totalButtons}`, 'color: cyan;');
    };

    window.stabilitySafeguard();

    // Auto-run full master diagnostics on dev boot
    console.log('%c[DEV BOOT] Running full system diagnostics automatically...', 'color: orange; font-weight: bold;');
    setTimeout(() => {
      try {
        window.runMasterDiagnostics?.();
      } catch (e) {
        console.warn('[DEV BOOT] Master Diagnostics failed on boot:', e);
      }
    }, 500);
}