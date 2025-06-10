

// === Companion: The Archivist ===
// Role: Codex memory manager and system historian

window.SovereignCompanions = window.SovereignCompanions || {};

window.SovereignCompanions.Archivist = (function () {
  function saveSnapshot(label = "Manual Snapshot") {
    const snapshot = {
      timestamp: new Date().toISOString(),
      label,
      modulesOnline: Object.keys(window.SovereignSubsystems || {}),
      directive: window.currentDirective || "N/A",
      initiatedBy: "Tyson Zaugg, Sovereign Architect"
    };

    if (!window.SovereignCodexSnapshots) {
      console.warn("📘 SovereignCodex not found. Initializing...");
      window.SovereignCodexSnapshots = [];
    }

    window.SovereignCodexSnapshots.push(snapshot);
    console.log("📝 Codex Snapshot Saved:", snapshot);
  }

  function getAllSnapshots() {
    return window.SovereignCodexSnapshots || [];
  }

  function getLatestSnapshot() {
    const all = getAllSnapshots();
    return all.length ? all[all.length - 1] : null;
  }

  return {
    saveSnapshot,
    getAllSnapshots,
    getLatestSnapshot
  };
})();