// dev-debug.js

// Only activate in debug mode
if (window.location.href.includes('debug=true')) {
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
    // Quick debug scan
    window.debugScan = function (code = "123456789012") {
      console.log(`🧪 Debug Scan Triggered for code: ${code}`);
      handleScanInput(code);
    };

    // Clear console logs
    window.clearDebugLogs = function () {
      console.clear();
      console.log('%c[DEBUG] Console cleared.', 'color: gray;');
    };

    // Force open item entry modal with predefined code
    window.triggerAddModal = function (code = '123456789012') {
      const input = document.getElementById('scanInput');
      if (input) {
        input.value = code;
        console.log('%c[DEBUG] Forcing item entry modal for:', 'color: lime;', code);
        const event = new CustomEvent('manual-scan', { detail: code });
        window.dispatchEvent(event);
      } else {
        console.warn('[DEBUG] scanInput not found.');
      }
    };
}