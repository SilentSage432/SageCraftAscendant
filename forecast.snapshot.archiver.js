// Phase 6.3 — Neural Cortex Snapshot Archiver
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastSnapshotArchiver = (function() {

  function archiveSnapshot() {
    const cortex = window.NeuralForecastMemoryCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      alert("⚠ Cortex memory is empty. Nothing to archive.");
      return;
    }

    const snapshot = {
      timestamp: new Date().toISOString(),
      records: cortex
    };

    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `CortexSnapshot_${snapshot.timestamp.replace(/[:.]/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);

    window.SovereignBus?.emit("whispererVitals", {
      source: "SnapshotArchiver",
      status: "📦 Cortex snapshot archive complete.",
      timestamp: new Date().toISOString()
    });
    console.log("📦 Cortex snapshot archive complete.");
  }

  return {
    archiveSnapshot
  };
})();