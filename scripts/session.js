// session.js

export function initSessionTools() {
  console.log('📦 Session module initialized');

  // Clean up stale sessions on load
  cleanEmptySessions();

  // Optional: log how many session entries are stored
  const keys = Object.keys(localStorage).filter(k => k.startsWith('inventorySession_'));
  console.log(`🗂️ Found ${keys.length} stored session${keys.length !== 1 ? 's' : ''}`);
}

export function saveESLMap() {
  localStorage.setItem('eslToUPCMap', JSON.stringify(window.eslToUPC));
}

export function cleanEmptySessions() {
  const keys = Object.keys(localStorage);
  let deletedCount = 0;

  keys.forEach(key => {
    if (key.startsWith('inventorySession_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        const isEmpty =
          !data ||
          (data.liveCounts && Object.keys(data.liveCounts).length === 0) &&
          (data.onHandText === '');

        if (isEmpty) {
          localStorage.removeItem(key);
          deletedCount++;
        }
      } catch (err) {
        console.warn(`⚠️ Could not parse or remove ${key}`, err);
      }
    }
  });

  if (deletedCount > 0) {
    console.log(`🧹 Removed ${deletedCount} empty session${deletedCount !== 1 ? 's' : ''}`);
  }
}
