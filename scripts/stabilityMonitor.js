

// Neural Stability Monitor — Fully Modularized 400.X Stability Engines

const StabilityMonitor = (function() {
  const strainHistory = [];
  const stabilityIndex = [];

  function evaluateForecastStability(forecastHistory) {
    let total = 0;
    let count = 0;

    forecastHistory.forEach(record => {
      total += Number(record.onHandUnits || 0);
      count++;
    });

    const average = count === 0 ? 0 : (total / count);
    const stabilityScore = computeElasticityIndex(average, count);
    stabilityIndex.push(stabilityScore);
    strainHistory.push({ timestamp: new Date().toISOString(), stabilityScore });

    console.log(`📊 Stability Score Calculated: ${stabilityScore}`);
    return stabilityScore;
  }

  function computeElasticityIndex(avg, count) {
    if (count === 0) return 100;
    const elasticity = 100 - (Math.abs(avg - 50) / 50) * 100;
    return Math.max(0, Math.min(100, elasticity.toFixed(2)));
  }

  function getLatestStability() {
    return stabilityIndex.length > 0 ? stabilityIndex[stabilityIndex.length - 1] : "N/A";
  }

  function bootstrap() {
    console.log("🧬 Stability Monitor initialized.");
  }

  return {
    bootstrap,
    evaluateForecastStability,
    getLatestStability
  };
})();