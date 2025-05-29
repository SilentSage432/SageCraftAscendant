// Load persisted category from localStorage if available
if (!window.itemCategory) {
  const storedCategory = localStorage.getItem('itemCategory');
  window.itemCategory = storedCategory || 'uncategorized';
}

// Developer flag to force modal on every scan input
window.DEV_FORCE_MODAL = true; // Set to false to disable forced modal

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

  // Developer override: always prompt modal on scan input if flag is set
  if (window.DEV_FORCE_MODAL) {
    if (typeof window.promptCodeType === 'function') {
      window.promptCodeType(resolved || val);
      resetScanInput();
      return;
    }
  }
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
        const fallbackModal = document.getElementById("mapPromptModal");
        if (fallbackModal) {
          window.setCurrentUPC?.(resolved);
          fallbackModal.classList.remove("hidden");
        }
      }
      resetScanInput();
      return;
    }

    const modal = document.getElementById('mapPromptModal');
    if (modal) {
      window.setCurrentUPC?.(resolved);
      modal.classList.remove('hidden');
      resetScanInput();
      return;
    }

    processScan(resolved);
    // Show modal for known UPC as well
    const knownModal = document.getElementById('mapPromptModal');
    if (knownModal) {
      window.setCurrentUPC?.(resolved);
      knownModal.classList.remove('hidden');
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


window.setItemCategory = function (category) {
  window.itemCategory = category;
  localStorage.setItem('itemCategory', category);
  console.log(`📦 Category set to: ${category}`);
};

window.setCurrentUPC = function (code) {
  window.currentUPC = code;
};

window.promptCodeType = function(code) {
  window.setCurrentUPC?.(code);

  const overlay = document.getElementById("mapPromptOverlay");
  const modal = document.getElementById("mapPromptModal");

  if (overlay && modal) {
    overlay.style.display = "flex";
    modal.classList.remove("hidden");

    const codeTypeInput = modal.querySelector("#mapPromptLabel");
    if (codeTypeInput) codeTypeInput.textContent = "Enter Item Number:";

    const liveEntryInput = modal.querySelector("#mapPromptInput");
    if (liveEntryInput) {
      liveEntryInput.value = '';
      liveEntryInput.focus();
    }

    const inputSection = document.getElementById("mapInputSection");

    const productBtn = document.getElementById("mapTypeProduct");
    const eslBtn = document.getElementById("mapTypeESL");
    const bayBtn = document.getElementById("mapTypeBay");

    if (productBtn) {
      productBtn.addEventListener("click", () => {
        console.log("✅ Product selected");
        inputSection?.classList.remove("hidden");
        codeTypeInput.textContent = "Enter Product Item Number:";
      });
    }

    if (eslBtn) {
      eslBtn.addEventListener("click", () => {
        console.log("✅ ESL selected");
        inputSection?.classList.remove("hidden");
        codeTypeInput.textContent = "Enter ESL Mapping:";
      });
    }

    if (bayBtn) {
      bayBtn.addEventListener("click", () => {
        console.log("✅ Bay selected");
        inputSection?.classList.remove("hidden");
        codeTypeInput.textContent = "Enter Bay Location:";
      });
    }

    const confirmBtn = document.getElementById("confirmModalBtn");
    const cancelBtn = document.getElementById("cancelModalBtn");

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const tagTypeText = codeTypeInput?.textContent || '';
        const inputVal = liveEntryInput?.value?.trim();

        if (!inputVal || !window.setCurrentUPC) return;

        const upc = window.currentUPC;
        const tagType = tagTypeText.toLowerCase();

        if (tagType.includes("product")) {
          window.upcToItem = window.upcToItem || {};
          window.upcToItem[upc] = inputVal;
          processScan(inputVal);
        } else if (tagType.includes("esl")) {
          window.eslToUPC = window.eslToUPC || {};
          window.eslToUPC[upc] = inputVal;
          processScan(inputVal);
        } else if (tagType.includes("bay")) {
          window.locationMap = window.locationMap || {};
          window.locationMap[upc] = inputVal;
          processScan(inputVal);
        }

        if (typeof window.updateMapStatusDisplay === "function") {
          window.updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
        }

        modal.classList.add("hidden");
        overlay.style.display = "none";
        resetScanInput();
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        modal.classList.add("hidden");
        overlay.style.display = "none";
        resetScanInput();
      };
    }
  } else {
    console.warn("⚠️ mapPromptOverlay or mapPromptModal not found.");
  }
};