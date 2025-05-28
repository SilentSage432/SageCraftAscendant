// Load persisted category from localStorage if available
if (!window.itemCategory) {
  const storedCategory = localStorage.getItem('itemCategory');
  window.itemCategory = storedCategory || 'uncategorized';
}

function resolveScanCode(code) {
  const trimmed = code.trim();
  const match = trimmed.match(/\d{6,}/); // Extract 6+ digit number
  const cleanCode = match ? match[0] : trimmed;

  if (cleanCode.length === 13 && cleanCode.startsWith('0')) {
    return { type: 'esl', upc: cleanCode, item: null };
  }
  if (cleanCode.length === 12 && /^\d+$/.test(cleanCode)) {
    return cleanCode;
  }
  return null;
}

async function showCustomPrompt(code) {
  return new Promise((resolve) => {
    const confirmed = confirm(`Unrecognized code "${code}". Link as ESL tag?`);
    if (confirmed) resolve({ type: 'esl', upc: code, item: null });
    else resolve(null);
  });
}

async function handleScanInput(val) {
  const resolved = resolveScanCode(val);
  if (resolved) {
    if (typeof resolved === 'object' && resolved.type === 'esl') {
      console.log(`🔁 ESL ${resolved.upc} maps to Lowe’s #${resolved.item || '(unmapped)'}`);
      
      if (!resolved.item) {
        // Trigger the custom modal if no mapping is found
        if (typeof window.promptCodeType === 'function') {
          window.promptCodeType(resolved.upc);
        } else {
          const modal = document.getElementById("customModal");
          if (modal) {
            window.setCurrentUPC?.(resolved.upc);
            modal.style.display = "block";
          }
        }
        resetScanInput();
        return;
      }

      upcToItem[resolved.upc] = resolved.item;
      if (typeof window.updateMapStatusDisplay === 'function') {
        window.updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
      }
      processScan(resolved.item);
      resetScanInput();
      return;
    }

    // Check for unknown codes before processing the scan
    if (
      !window.upcToItem?.[resolved] &&
      !window.eslToUPC?.[resolved] &&
      !window.locationMap?.[resolved]
    ) {
      if (typeof window.promptCodeType === 'function') {
        window.promptCodeType(resolved);
      } else {
        const fallbackModal = document.getElementById("itemEntryModal");
        if (fallbackModal) {
          window.setCurrentUPC?.(resolved);
          fallbackModal.style.display = "block";
        }
      }
      resetScanInput();
      return;
    }

    const modal = document.getElementById('itemEntryModal');
    if (modal) {
      window.setCurrentUPC?.(resolved);
      modal.style.display = 'block';
      resetScanInput();
      return;
    }

    processScan(resolved);
    // Show modal for known UPC as well
    const knownModal = document.getElementById('itemEntryModal');
    if (knownModal) {
      window.setCurrentUPC?.(resolved);
      knownModal.style.display = 'block';
    }
    if (typeof window.updateMapStatusDisplay === 'function') {
      window.updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
    }
    resetScanInput();
    return;
  }

  if (locationMap[val]) {
    processScan(val);
    return;
  }

  const promptResult = await showCustomPrompt(val);
  if (promptResult) {
    window.setCurrentESLItem?.(val);
    const modal = document.getElementById('customModal');
    if (modal) modal.style.display = 'block';
  }
}

function processScan(item) {
  console.log(`🔍 Scanning item: ${item}`);
  if (!item) return;

  if (!window.liveCounts) window.liveCounts = {};

  if (!window.liveCounts[item]) {
    window.liveCounts[item] = 1;
  } else {
    window.liveCounts[item] += 1;
  }

  // Update sessionMap to reflect liveCounts and itemCategory
  if (!window.sessionMap) window.sessionMap = {};

  const activeCategory = localStorage.getItem('itemCategory') || window.itemCategory || 'uncategorized';
  window.itemCategory = activeCategory;

  if (!window.sessionMap[item]) {
    window.sessionMap[item] = {
      item: item,
      count: window.liveCounts[item],
      category: activeCategory,
      location: window.locationMap?.[item] || '',
      editable: true // placeholder for enabling inline edits
    };
  } else {
    window.sessionMap[item].count = window.liveCounts[item];
  }

  if (typeof window.updateLiveTable === 'function') {
    window.updateLiveTable();
  } else {
    console.warn('⚠️ updateLiveTable function is not defined');
  }
}

function resetScanInput() {
  const liveEntryInput = document.getElementById('liveEntry');
  if (liveEntryInput) liveEntryInput.value = '';
}

window.processScan = processScan;
window.handleScanInput = handleScanInput;
window.resetScanInput = resetScanInput;
window.resolveScanCode = resolveScanCode;

window.initScan = function () {
  console.log("🔧 Scan module initialized");
};

document.addEventListener("DOMContentLoaded", () => {
  const upcBtn = document.getElementById("assignUPCBtn");
  const eslBtn = document.getElementById("linkESLBtn");
  const bayBtn = document.getElementById("assignBayBtn");

  const transitionToEntry = (type) => {
    const modal = document.getElementById("customModal");
    if (modal) modal.style.display = "none";
    const entryModal = document.getElementById("itemEntryModal");
    if (entryModal) {
      entryModal.style.display = "block";
      const codeTypeInput = entryModal.querySelector("#codeType");
      if (codeTypeInput) codeTypeInput.value = type || '';
      const liveEntryInput = entryModal.querySelector("#liveEntry");
      if (liveEntryInput) liveEntryInput.focus();
    }
  };

  if (upcBtn) upcBtn.addEventListener("click", () => transitionToEntry('upc'));
  if (eslBtn) eslBtn.addEventListener("click", () => transitionToEntry('esl'));
  if (bayBtn) bayBtn.addEventListener("click", () => transitionToEntry('bay'));
});

window.setItemCategory = function (category) {
  window.itemCategory = category;
  localStorage.setItem('itemCategory', category);
  console.log(`📦 Category set to: ${category}`);
};

window.promptCodeType = function(code) {
  const modal = document.getElementById("customModal");
  if (!modal) {
    console.warn("⚠️ customModal not found in DOM.");
    return;
  }

  window.setCurrentUPC?.(code);
  modal.style.display = "block";

  const transitionToEntry = (type) => {
    const modal = document.getElementById("customModal");
    if (modal) modal.style.display = "none";
    const entryModal = document.getElementById("itemEntryModal");
    if (entryModal) {
      entryModal.style.display = "block";
      const codeTypeInput = entryModal.querySelector("#codeType");
      if (codeTypeInput) codeTypeInput.value = type || '';
      const liveEntryInput = entryModal.querySelector("#liveEntry");
      if (liveEntryInput) liveEntryInput.focus();
    }
  };

  const upcBtn = modal.querySelector("#assignUPCBtn");
  const eslBtn = modal.querySelector("#linkESLBtn");
  const bayBtn = modal.querySelector("#assignBayBtn");

  if (upcBtn && !upcBtn.hasAttribute("data-bound")) {
    upcBtn.addEventListener("click", () => transitionToEntry('upc'));
    upcBtn.setAttribute("data-bound", "true");
  }

  if (eslBtn && !eslBtn.hasAttribute("data-bound")) {
    eslBtn.addEventListener("click", () => transitionToEntry('esl'));
    eslBtn.setAttribute("data-bound", "true");
  }

  if (bayBtn && !bayBtn.hasAttribute("data-bound")) {
    bayBtn.addEventListener("click", () => transitionToEntry('bay'));
    bayBtn.setAttribute("data-bound", "true");
  }
};