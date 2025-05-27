function handleScanInput(val) {
  const resolved = resolveScanCode(val);
  if (resolved) {
    if (typeof resolved === 'object' && resolved.type === 'esl') {
      console.log(`🔁 ESL ${resolved.upc} maps to Lowe’s #${resolved.item}`);
      upcToItem[resolved.upc] = resolved.item;
      processScan(resolved.item);
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
}

function processScan(item) {
  console.log(`🔍 Scanning item: ${item}`);
  // Placeholder: implement actual scan handling logic here
}

function resetScanInput() {
  const liveEntryInput = document.getElementById('liveEntry');
  if (liveEntryInput) liveEntryInput.value = '';
}

export { processScan, handleScanInput };

export function initScan() {
  console.log("🔧 Scan module initialized");
}