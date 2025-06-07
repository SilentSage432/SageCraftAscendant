// Phase 6.4 — Cortex Snapshot Loader & Replay Module
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.ForecastSnapshotLoader = (function() {

  function loadSnapshot(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const snapshot = JSON.parse(event.target.result);
        if (!snapshot.records || !Array.isArray(snapshot.records)) {
          alert("❌ Invalid snapshot format.");
          return;
        }

        // Clear existing Cortex first (optional safety — can be enhanced)
        if (window.NeuralForecastMemoryCortex?.clearForecast) {
          window.NeuralForecastMemoryCortex.clearForecast();
        }

        snapshot.records.forEach(record => {
          if (window.NeuralForecastMemoryCortex?.injectForecastRecord) {
            window.NeuralForecastMemoryCortex.injectForecastRecord(record);
          }
        });

        console.log(`✅ Snapshot loaded: ${snapshot.records.length} records restored.`);
        alert(`✅ Snapshot loaded: ${snapshot.records.length} records restored.`);
      } catch (err) {
        console.error("❌ Failed to load snapshot:", err);
        alert("⚠ Failed to parse snapshot file.");
      }
    };

    reader.readAsText(file);
  }

  function promptSnapshotLoad() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.style.display = "none";

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      loadSnapshot(file);
    });

    document.body.appendChild(input);
    input.click();
  }

  return {
    loadSnapshot,
    promptSnapshotLoad
  };

})();