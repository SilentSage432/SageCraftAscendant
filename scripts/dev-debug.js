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
  }