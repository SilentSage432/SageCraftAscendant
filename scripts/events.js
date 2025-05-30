console.log("🚀 Inventory App Event Controller Booted");
document.addEventListener('DOMContentLoaded', () => {

  // Safely select modal elements
  const modal = document.getElementById('mapPromptModal');
  const modalSubmitBtn = document.getElementById('modalSubmit');
  const cancelBtn = document.getElementById('cancelMapPrompt');
  const liveEntry = document.getElementById('liveEntry');

  function showMapPromptModal(code) {
    if (!modal) return console.warn("❌ Modal not found");
    document.getElementById('mapPromptCode').textContent = code;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    window._mappingCode = code;
    console.log("📦 Modal displayed for code:", code);
  }

  function hideMapPromptModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  function resolveScannedCode(code) {
    const upcMap = JSON.parse(localStorage.getItem('upcToItemMap') || '{}');
    const eslMap = JSON.parse(localStorage.getItem('eslToUPCMap') || '{}');
    const bayMap = JSON.parse(localStorage.getItem('locationMap') || '{}');
    if (upcMap[code]) return upcMap[code];
    if (eslMap[code]) return eslMap[code];
    if (bayMap[code]) return code;
    return null;
  }

  function handleScanInput(code) {
    console.log("🔍 Handling scanned code:", code);
    const resolved = resolveScannedCode(code);
    if (resolved) {
      console.log("✅ Code found:", resolved);
    } else {
      showMapPromptModal(code);
    }
  }

  window.handleManualScan = function(e) {
    let code = typeof e === 'string' ? e.trim() : e?.detail?.code?.trim() || e?.target?.value?.trim();
    if (!code) {
      console.warn("❌ No code detected in manual scan");
      return;
    }
    handleScanInput(code);
  };

  // Initialize variable to track selected map type
  let selectedMapType = 'product';

  // Assign map type when user clicks type buttons
  document.getElementById("mapTypeProduct")?.addEventListener("click", () => {
    selectedMapType = 'product';
    console.log("Selected Map Type: Product");
  });
  document.getElementById("mapTypeESL")?.addEventListener("click", () => {
    selectedMapType = 'esl';
    console.log("Selected Map Type: ESL");
  });
  document.getElementById("mapTypeBay")?.addEventListener("click", () => {
    selectedMapType = 'bay';
    console.log("Selected Map Type: Bay");
  });

  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener('click', () => {
      const code = document.getElementById('mapPromptCode').textContent.trim();
      const item = document.getElementById('mapPromptInput').value.trim();
      const mapType = selectedMapType || 'product';
      const liveCategory = document.getElementById('liveCategory')?.value || 'Uncategorized';

      if (!code || !item || !mapType) {
        alert("Please complete all fields.");
        return;
      }

      if (!/^\d{5,}$/.test(code)) {
        alert("Scanned code must be numeric and at least 5 digits.");
        return;
      }

      // Initialize mappings if missing
      window.upcToItem = window.upcToItem || {};
      window.eslToUPC = window.eslToUPC || {};
      window.locationMap = window.locationMap || {};

      if (mapType === 'product') {
        window.upcToItem[code] = item;
        localStorage.setItem('upcToItemMap', JSON.stringify(window.upcToItem));
        console.log(`✅ Product mapped: ${code} ➔ ${item}`);
      } else if (mapType === 'esl') {
        window.eslToUPC[code] = item;
        localStorage.setItem('eslToUPCMap', JSON.stringify(window.eslToUPC));
        console.log(`✅ ESL mapped: ${code} ➔ ${item}`);
      } else if (mapType === 'bay') {
        window.locationMap[code] = item;
        localStorage.setItem('locationMap', JSON.stringify(window.locationMap));
        console.log(`✅ Bay mapped: ${code} ➔ ${item}`);
      } else {
        alert("Invalid mapping type selected.");
        return;
      }

      // Update sessionMap safely
      window.sessionMap = window.sessionMap || {};
      window.sessionMap[code] = {
        count: window.sessionMap[code] ? window.sessionMap[code].count + 1 : 1,
        category: liveCategory,
        location: mapType === 'bay' ? item : localStorage.getItem('activeBay') || ''
      };

      if (typeof window.updateMapStatusDisplay === "function") {
        window.updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
      }

      if (typeof window.renderLiveTable === "function") renderLiveTable();

      hideMapPromptModal();
      window._mappingCode = '';
      document.getElementById("mapPromptInput").value = '';
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', hideMapPromptModal);
  }

  if (liveEntry) {
    liveEntry.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const value = liveEntry.value.trim();
        if (value) {
          window.handleManualScan(value);
          liveEntry.value = '';
        }
      }
    });
  }

  if (!window._manualScanBound) {
    window.addEventListener('manual-scan', window.handleManualScan);
    window._manualScanBound = true;
  }
});