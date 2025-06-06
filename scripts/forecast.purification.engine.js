// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v3.7
// Subsystem: Forecast Cortex Purification Engine

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.ForecastPurificationEngine = (function() {

  function purifyCortex() {
    let cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Cortex memory unavailable.");
      return 0;
    }

    const originalSize = cortex.length;
    const uniqueRecords = new Map();

    cortex.forEach(entry => {
      const key = `${entry.itemNumber}_${entry.division}_${entry.timestamp}`;
      if (!uniqueRecords.has(key)) {
        uniqueRecords.set(key, entry);
      }
    });

    // Sanitize malformed entries
    let purified = Array.from(uniqueRecords.values()).filter(entry => {
      return entry.itemNumber && entry.division && typeof entry.onHandUnits === "number";
    });

    const cleaned = purified.length;
    const removed = originalSize - cleaned;

    console.log(`🧹 Cortex Purification Complete — ${removed} invalid/duplicate records removed.`);

    // Replace cortex with purified set
    if (typeof SageCraftAscendant.ForecastCortex?.replaceForecastHistory === "function") {
      SageCraftAscendant.ForecastCortex.replaceForecastHistory(purified);
    }

    return removed;
  }

  return {
    purifyCortex
  };

})();