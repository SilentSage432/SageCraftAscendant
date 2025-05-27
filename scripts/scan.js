import { updateMapStatusDisplay } from './ui.js';

function resolveScanCode(code) {
  const trimmed = code.trim();
  if (trimmed.length === 13 && trimmed.startsWith('0')) {
    return { type: 'esl', upc: trimmed, item: null };
  }
  if (trimmed.length === 12 && /^\d+$/.test(trimmed)) {
    return trimmed;
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
      if (resolved.item) upcToItem[resolved.upc] = resolved.item;
      if (typeof updateMapStatusDisplay === 'function') {
        updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
      }
      processScan(resolved.item || resolved.upc);
      resetScanInput();
      return;
    }
    processScan(resolved);
    if (typeof updateMapStatusDisplay === 'function') {
      updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
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

export { processScan, handleScanInput, resetScanInput, resolveScanCode };

export function initScan() {
  console.log("🔧 Scan module initialized");
}