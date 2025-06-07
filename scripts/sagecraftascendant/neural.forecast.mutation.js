

// === SageCraft Ascendant: Phase 16.0 — Neural Forecast Mutation Layer ===

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.NeuralForecastMutation = (function () {

  const _mutationHistory = [];

  function mutateForecasts(originalForecasts, mutationFactor = 0.15, scenarios = 5) {
    const mutatedScenarios = [];

    for (let i = 0; i < scenarios; i++) {
      const mutated = originalForecasts.map(entry => {
        const factor = 1 + (Math.random() * mutationFactor * 2 - mutationFactor);
        const mutatedValue = parseFloat((entry.value * factor).toFixed(2));
        return {
          ...entry,
          mutatedValue,
          mutationFactor: factor.toFixed(3)
        };
      });
      mutatedScenarios.push(mutated);
    }

    _mutationHistory.push({
      timestamp: new Date().toISOString(),
      mutationFactor,
      scenarios,
      mutatedScenarios
    });

    console.log("🧬 Forecast Mutations Generated:", mutatedScenarios);
    return mutatedScenarios;
  }

  function getMutationHistory() {
    return [..._mutationHistory];
  }

  function clearMutationHistory() {
    _mutationHistory.length = 0;
    console.warn("🧹 Forecast Mutation History Cleared.");
  }

  return {
    mutateForecasts,
    getMutationHistory,
    clearMutationHistory
  };

})();