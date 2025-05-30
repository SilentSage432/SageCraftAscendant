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

function setItemCategory(category) {
  window.itemCategory = category;
  localStorage.setItem('itemCategory', category);
  console.log(`📦 Category set to: ${category}`);
}

function setCurrentUPC(code) {
  window.currentUPC = code;
}

window.initScan = function () {
  console.log("🔧 Scan module initialized");
};

function promptCodeType(code) {
  setCurrentUPC?.(code);
  if (!window.appBootComplete) {
    console.warn("🚫 Modal blocked: App not fully initialized.");
    return;
  }
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

      window.upcToItem = window.upcToItem || {};
      window.eslToUPC = window.eslToUPC || {};
      window.locationMap = window.locationMap || {};

      if (selectedType === "product") {
        window.upcToItem[upc] = value;
        console.log(`✅ Product mapping: ${upc} ➔ ${value}`);
      } else if (selectedType === "esl") {
        window.eslToUPC[upc] = value;
        console.log(`✅ ESL mapping: ${upc} ➔ ${value}`);
      } else if (selectedType === "bay") {
        window.locationMap[upc] = value;
        console.log(`✅ Bay mapping: ${upc} ➔ ${value}`);
      }

      localStorage.setItem('upcToItemMap', JSON.stringify(window.upcToItem));
      localStorage.setItem('eslToUPCMap', JSON.stringify(window.eslToUPC));
      localStorage.setItem('locationMap', JSON.stringify(window.locationMap));

      if (typeof window.updateMapStatusDisplay === "function") {
        window.updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
      }

      handleUnifiedScan(value);
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
}

// Delayed modal injection until appBootComplete
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded fired — deferring modal injection");

  function injectModal() {
    const targetContainer = document.getElementById("app") || document.body;

    if (!document.getElementById("mapPromptModal")) {
      const modalContainer = document.createElement("div");
      modalContainer.id = "mapPromptModal";
      modalContainer.className = "hidden modal-overlay";
      modalContainer.style.display = 'none';
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
  }

  // Wait until full app boot finishes before injecting modal
  const modalObserver = setInterval(() => {
    if (window.appBootComplete === true) {
      clearInterval(modalObserver);
      injectModal();
    }
  }, 50);
});
