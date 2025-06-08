// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v5.1
// Subsystem: Recursive Forecast Memory Loop

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.RecursiveForecastMemory = (function() {

  const recursiveStore = [];

  function archiveForecastSnapshot(forecast) {
    recursiveStore.push({
      timestamp: new Date().toISOString(),
      forecastSnapshot: forecast
    });
    console.log("🧬 Forecast snapshot archived into recursive memory.");
  }

  function listRecursiveMemory() {
    console.table(recursiveStore);
    alert(`📊 Recursive Forecast Memory contains ${recursiveStore.length} snapshots.`);
  }

  function injectRecursiveWeighting() {
    if (recursiveStore.length === 0) {
      alert("⚠ No recursive memory snapshots stored.");
      return;
    }

    let weightedMod = 0;

    recursiveStore.forEach(record => {
      const snapshot = record.forecastSnapshot;
      snapshot.forEach(entry => {
        weightedMod += parseFloat(entry.projectedRisk);
      });
    });

    const averageWeight = (weightedMod / (recursiveStore.length * snapshot.length)).toFixed(1);

    alert(`🧮 Recursive Forecast Weight Modifier Calculated: +${averageWeight}%`);

    return averageWeight;
  }

  return {
    archiveForecastSnapshot,
    listRecursiveMemory,
    injectRecursiveWeighting
  };

})();