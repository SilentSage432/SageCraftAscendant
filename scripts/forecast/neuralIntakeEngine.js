

// Neural Intake Engine — Fully Modularized Cortex Injector

const NeuralIntakeEngine = (function() {
  function parseIntakeFile(fileContent) {
    try {
      const data = JSON.parse(fileContent);
      if (!Array.isArray(data)) {
        alert("Intake file format invalid — expecting an array.");
        return [];
      }
      return data;
    } catch (err) {
      alert("Failed to parse intake file: " + err);
      return [];
    }
  }

  function injectIntakeRecords(records) {
    if (!window.NeuralForecastMemoryCortex || typeof window.NeuralForecastMemoryCortex.injectForecastRecord !== "function") {
      alert("Neural Cortex not available.");
      return;
    }

    let injectedCount = 0;

    records.forEach(record => {
      const entry = {
        timestamp: new Date().toISOString(),
        itemNumber: record.itemNumber || record.ItemNumber || "Unknown",
        onHandUnits: record.onHandUnits || record.OnHand || 0,
        division: record.division || record.Category || "Uncategorized"
      };

      window.NeuralForecastMemoryCortex.injectForecastRecord(entry);
      injectedCount++;
    });

    console.log(`✅ Injected ${injectedCount} records into Cortex.`);
  }

  function bootstrap() {
    console.log("🧬 Neural Intake Engine initialized.");
  }

  return {
    bootstrap,
    parseIntakeFile,
    injectIntakeRecords
  };
})();