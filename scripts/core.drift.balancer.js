// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v4.0
// Subsystem: Drift Balancer Core

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.DriftBalancer = (function() {

  function calculateDriftBalance() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Cortex memory unavailable.");
      return;
    }

    let driftBuckets = { stable: 0, lightDrift: 0, heavyDrift: 0 };

    cortex.forEach(entry => {
      const variance = Math.abs(entry.onHandUnits - entry.itdSalesUnits);
      
      if (variance < 5) {
        driftBuckets.stable++;
      } else if (variance >= 5 && variance < 15) {
        driftBuckets.lightDrift++;
      } else {
        driftBuckets.heavyDrift++;
      }
    });

    const total = cortex.length;
    console.table([
      { State: 'Stable', Count: driftBuckets.stable, Percent: ((driftBuckets.stable/total)*100).toFixed(1)+'%' },
      { State: 'Light Drift', Count: driftBuckets.lightDrift, Percent: ((driftBuckets.lightDrift/total)*100).toFixed(1)+'%' },
      { State: 'Heavy Drift', Count: driftBuckets.heavyDrift, Percent: ((driftBuckets.heavyDrift/total)*100).toFixed(1)+'%' },
    ]);

    alert("✅ Drift Balancer scan complete. See console for detailed analysis.");
  }

  return {
    calculateDriftBalance
  };

})();