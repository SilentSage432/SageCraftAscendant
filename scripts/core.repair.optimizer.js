// === SAGECRAFT ASCENDANT MODULE ===
// Codex ID: Ascendant.v4.6
// Subsystem: Self-Repair Optimizer Forge

window.SageCraftAscendant = window.SageCraftAscendant || {};

SageCraftAscendant.RepairOptimizer = (function() {

  let repairLog = JSON.parse(localStorage.getItem("repairOptimizerLog")) || [];

  function logRepairCycle(strategy, preVolatility, postVolatility) {
    const record = {
      timestamp: new Date().toISOString(),
      strategy,
      preVolatility,
      postVolatility,
      success: postVolatility < preVolatility
    };

    repairLog.push(record);
    localStorage.setItem("repairOptimizerLog", JSON.stringify(repairLog));

    console.log("🛠 Repair Optimizer Log Updated:", record);
  }

  function analyzeRepairPerformance() {
    if (repairLog.length === 0) {
      alert("No repair optimization history available.");
      return;
    }

    const total = repairLog.length;
    const successful = repairLog.filter(r => r.success).length;
    const failed = total - successful;
    const successRate = ((successful / total) * 100).toFixed(1);

    let summary = `⚙ Self-Repair Optimizer Summary\n\n`;
    summary += `Total Repairs Logged: ${total}\n`;
    summary += `Successful Improvements: ${successful}\n`;
    summary += `Failed Attempts: ${failed}\n`;
    summary += `Optimization Rate: ${successRate}%\n`;

    alert(summary);
  }

  return {
    logRepairCycle,
    analyzeRepairPerformance
  };

})();