// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v4.3
// Subsystem: Neural Stabilization Feedback Loop

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.StabilizationFeedback = (function() {

  function executeFeedbackLoop() {
    const cortex = SageCraftAscendant.ForecastCortex?.getForecastHistory?.();
    if (!cortex || cortex.length === 0) {
      console.warn("⚠ Cortex memory unavailable.");
      return;
    }

    const total = cortex.length;
    const volatile = cortex.filter(entry => entry.stabilityHint === "Volatile").length;
    const stabilityPercent = ((total - volatile) / total) * 100;

    // Current thresholds from UI (or defaults)
    const driftThresholdInput = document.getElementById("driftThresholdInput");
    let currentDriftThreshold = parseInt(driftThresholdInput?.value || "10");

    // Adjustment rules
    if (stabilityPercent >= 90 && currentDriftThreshold > 5) {
      currentDriftThreshold -= 1;
      console.log("🧬 Stability excellent — tightening drift threshold:", currentDriftThreshold);
    }
    else if (stabilityPercent <= 70) {
      currentDriftThreshold += 1;
      console.log("⚠ Stability degraded — easing drift threshold:", currentDriftThreshold);
    } else {
      console.log("✅ Stability nominal — no threshold adjustment.");
    }

    // Apply updated threshold back to Governance UI
    if (driftThresholdInput) {
      driftThresholdInput.value = currentDriftThreshold;
    }

    alert("✅ Feedback Loop completed. Drift threshold auto-tuned.");
  }

  return {
    executeFeedbackLoop
  };

})();