// Load persisted category from localStorage if available
if (!window.itemCategory) {
  const storedCategory = localStorage.getItem('itemCategory');
  window.itemCategory = storedCategory || 'uncategorized';
}

// Developer flag to force modal on every scan input
window.DEV_FORCE_MODAL = false; // Set to false to disable forced modal

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
  if (!val || typeof val !== 'string' || !val.trim()) {
    console.warn("❌ handleScanInput(): No valid code provided");
    return;
  }
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
  const modal = document.getElementById("mapPromptModal");

  if (!modal) {
    console.warn("⚠️ mapPromptModal not found.");
    return;
  }

  modal.classList.remove("hidden");
  modal.style.display = "flex";

  const codeLabel = modal.querySelector("#mapPromptLabel");
  const inputSection = modal.querySelector("#mapInputSection");
  const liveEntryInput = modal.querySelector("#mapPromptInput");

  // Reset input field and hide input section by default
  if (liveEntryInput) {
    liveEntryInput.value = "";
    liveEntryInput.blur();
  }
  if (inputSection) inputSection.classList.add("hidden");
  if (codeLabel) codeLabel.textContent = "What type of tag is this?";

  let selectedType = null;

  const productBtn = document.getElementById("mapTypeProduct");
  const eslBtn = document.getElementById("mapTypeESL");
  const bayBtn = document.getElementById("mapTypeBay");
  const confirmBtn = document.getElementById("confirmModalBtn");
  const cancelBtn = document.getElementById("cancelModalBtn");

  function activateInput(labelText, type) {
    selectedType = type;
    if (inputSection) inputSection.classList.remove("hidden");
    if (codeLabel) codeLabel.textContent = labelText;
    if (liveEntryInput) liveEntryInput.focus();
  }

  if (productBtn) productBtn.onclick = () => activateInput("Enter Product Item Number:", "product");
  if (eslBtn) eslBtn.onclick = () => activateInput("Enter ESL Mapping:", "esl");
  if (bayBtn) bayBtn.onclick = () => activateInput("Enter Bay Location:", "bay");

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      const value = liveEntryInput?.value?.trim();
      if (!selectedType || !value) {
        showToast?.("Please select type and enter value.");
        return;
      }
      const upc = window.currentUPC;

      // Initialize mapping stores if not present
      window.upcToItem = window.upcToItem || {};
      window.eslToUPC = window.eslToUPC || {};
      window.locationMap = window.locationMap || {};

      if (selectedType === "product") {
        window.upcToItem[upc] = value;
        console.log(`✅ Product mapping: ${upc} ➔ ${value}`);
        processScan(value);
      } else if (selectedType === "esl") {
        window.eslToUPC[upc] = value;
        console.log(`✅ ESL mapping: ${upc} ➔ ${value}`);
        processScan(value);
      } else if (selectedType === "bay") {
        window.locationMap[upc] = value;
        console.log(`✅ Bay mapping: ${upc} ➔ ${value}`);
        processScan(value);
      }

      // Persist mappings to localStorage
      localStorage.setItem('upcToItemMap', JSON.stringify(window.upcToItem));
      localStorage.setItem('eslToUPCMap', JSON.stringify(window.eslToUPC));
      localStorage.setItem('locationMap', JSON.stringify(window.locationMap));

      if (typeof window.updateMapStatusDisplay === "function") {
        window.updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
      }
      modal.classList.add("hidden");
      resetScanInput();
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      modal.classList.add("hidden");
      resetScanInput();
    };
  }
};

// Ensure modal structure is always injected at boot
document.addEventListener("DOMContentLoaded", () => {
  const targetContainer = document.getElementById("app") || document.body;

  if (!document.getElementById("mapPromptModal")) {
    const modalContainer = document.createElement("div");
    modalContainer.id = "mapPromptModal";
    modalContainer.className = "hidden modal-overlay";
    modalContainer.innerHTML = `
      <div class="modal-content">
        <h2>Unknown Code</h2>
        <p id="mapPromptLabel">What type of tag is this?</p>
        <div id="mapInputSection" class="hidden">
          <input type="text" id="mapPromptInput" placeholder="Enter value...">
        </div>
        <div class="button-grid">
          <button id="mapTypeProduct">Product</button>
          <button id="mapTypeESL">ESL Tag</button>
          <button id="mapTypeBay">Bay Tag</button>
        </div>
        <div class="button-grid">
          <button id="confirmModalBtn" class="confirm">Confirm</button>
          <button id="cancelModalBtn" class="cancel">Cancel</button>
        </div>
      </div>
    `;
    targetContainer.appendChild(modalContainer);
    console.log("✅ Modal injected and ready.");

    window.currentUPC = null;
    window.selectedMapType = null;
  }
});
