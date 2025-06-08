// SageCraft Ascendant — Operator Console Core

SageCraftAscendant.OperatorConsole = (function () {

    function renderOperatorConsole() {
      const operatorTools = document.getElementById("operatorTools");
      if (!operatorTools) {
        console.warn("⚠ Operator Tools Panel not found.");
        return;
      }
  
      operatorTools.innerHTML = ''; // Clear previous content
  
      const controls = [
        { label: "🧪 Audit Integrity Scan", action: () => NeuralAuditSentinel?.auditWiring() },
        { label: "🛡 Run Self-Healing Engine", action: () => NeuralSelfHealingEngine?.runSelfHealing() },
        { label: "🌀 Clear Forecast History", action: () => NeuralForecastEngine?.clearForecast() },
        { label: "🧠 Start Cortex Loop", action: () => NeuralCortexEngine?.startCortexLoop() },
        { label: "🪐 Validate Orbital Mesh", action: () => NeuralOrbitalMeshReconciliation?.validateOrbitalMesh() },
        { label: "⚖ Reset Supervisor Escalation", action: () => NeuralOperatorOverride?.resetSupervisorEscalation() },
        { label: "🛠 Rebuild Orbital Mesh", action: () => NeuralOperatorOverride?.manualMeshRebuild() },
        { label: "💾 Save Memory Snapshot", action: () => NeuralTemporalRollbackCore?.saveSnapshot() },
        { label: "📂 List Snapshots", action: () => listSnapshots() },
        { label: "🧹 Clear Snapshots", action: () => clearSnapshots() }
      ];
  
      controls.forEach(ctrl => {
        const btn = document.createElement("button");
        btn.innerText = ctrl.label;
        btn.addEventListener("click", ctrl.action);
        operatorTools.appendChild(btn);
      });
  
      console.log("✅ Operator Console Rendered.");
    }
  
    return { renderOperatorConsole };
  })();