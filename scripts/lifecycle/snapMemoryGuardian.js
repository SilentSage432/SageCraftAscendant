// 🛡️ snapMemoryGuardian.js
// Guards the integrity of snap memory during layout resets and restores

window.SovereignMemory = window.SovereignMemory || {};

window.SovereignMemory.guardSnapMemory = function () {
  if (!window.SovereignMemory.snapMemoryStore) {
    console.warn("🛡️ No snap memory to guard.");
    return;
  }

  // Lock in snapshot state
  const lockedMemory = structuredClone(window.SovereignMemory.snapMemoryStore);
  console.log("🛡️ Snap Memory Guarded:", lockedMemory);

  // Preserve a backup in case of overwrite or corruption
  window.SovereignMemory.snapMemoryBackup = lockedMemory;
};

window.SovereignMemory.recoverFromBackup = function () {
  if (!window.SovereignMemory.snapMemoryBackup) {
    console.warn("🛡️ No backup found.");
    return;
  }

  window.SovereignMemory.snapMemoryStore = structuredClone(window.SovereignMemory.snapMemoryBackup);
  console.log("♻️ Snap Memory Recovered from Backup:", window.SovereignMemory.snapMemoryStore);
};

// 🔁 Auto-recover snap memory on page load if live state is empty
document.addEventListener("DOMContentLoaded", () => {
  if (
    !window.SovereignMemory.snapMemoryStore ||
    Object.keys(window.SovereignMemory.snapMemoryStore).length === 0
  ) {
    window.SovereignMemory.recoverFromBackup?.();
  }
});