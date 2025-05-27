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
      processScan(resolved.item || resolved.upc);
      resetScanInput();
      return;
    }
    processScan(resolved);
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
  window.liveCounts[item] = (window.liveCounts[item] || 0) + 1;
  if (typeof window.updateLiveTable === 'function') {
    window.updateLiveTable();
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