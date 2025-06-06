// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v2.0
// Subsystem: Governance Policy Core

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.GovernancePolicy = (function () {
  const DEFAULT_POLICY = {
    riskThreshold: 80,
    driftThreshold: 10,
    errorThreshold: 5
  };

  function loadPolicy() {
    const stored = localStorage.getItem("SageCraftGovernancePolicy");
    return stored ? JSON.parse(stored) : { ...DEFAULT_POLICY };
  }

  function savePolicy(policy) {
    localStorage.setItem("SageCraftGovernancePolicy", JSON.stringify(policy));
  }

  function applyPolicy(policy) {
    document.getElementById("riskThresholdInput").value = policy.riskThreshold;
    document.getElementById("driftThresholdInput").value = policy.driftThreshold;
    document.getElementById("errorThresholdInput").value = policy.errorThreshold;
    document.getElementById("policyStatusOutput").innerText = "✅ Current Policy Active";
  }

  function capturePolicyFromUI() {
    return {
      riskThreshold: parseInt(document.getElementById("riskThresholdInput").value),
      driftThreshold: parseInt(document.getElementById("driftThresholdInput").value),
      errorThreshold: parseInt(document.getElementById("errorThresholdInput").value)
    };
  }

  function initialize() {
    const policy = loadPolicy();
    applyPolicy(policy);
  }

  function updatePolicyFromUI() {
    const updatedPolicy = capturePolicyFromUI();
    savePolicy(updatedPolicy);
    applyPolicy(updatedPolicy);
    console.log("✅ Governance Policy Updated:", updatedPolicy);
  }

  return {
    initialize,
    updatePolicyFromUI,
    loadPolicy,
    savePolicy
  };
})();