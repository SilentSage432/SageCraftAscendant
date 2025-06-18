// === forecastConsole.panel.js — Forecast Console Panel Registration ===

if (typeof OperatorDockConsole === "undefined") {
  window.OperatorDockConsole = window.OperatorDockConsole || {};
}
if (typeof OperatorDockConsole.registerPanel !== "function") {
  OperatorDockConsole.registerPanel = function (config) {
    console.warn("⚠️ registerPanel fallback used — no native binding.");
  };
}

function registerForecastConsolePanel(attempt = 1) {
  if (typeof OperatorDockConsole !== "undefined" && typeof OperatorDockConsole.registerPanel === "function") {
    OperatorDockConsole.registerPanel({
      id: 'forecastConsole',
      name: 'Forecast Console',
      render: function () {
        const container = document.createElement("div");
        container.classList.add("forecast-console");
        container.innerHTML = `
          <h2>📊 Forecast Console</h2>
          <p>Welcome to the Forecast Console. Data insights and projections will appear here.</p>
          <div class="forecast-metrics">
            <p><strong>Trend Analysis:</strong> <span id="trendData">Loading...</span></p>
            <p><strong>Confidence Score:</strong> <span id="confidenceScore">Loading...</span></p>
            <p><strong>Recent Anomalies:</strong></p>
            <ul id="anomalyList">
              <li>None detected</li>
            </ul>
          </div>
        `;
        return container;
      }
    });
    console.log("✅ Forecast Console panel registered.");
  } else if (attempt <= 5) {
    console.warn(`⚠️ ForecastConsole: registerPanel not ready. Retrying (${attempt}/5)...`);
    setTimeout(() => registerForecastConsolePanel(attempt + 1), 500);
  } else {
    console.error("❌ ForecastConsole: Failed to register after multiple attempts.");
  }
}

document.addEventListener("OperatorDockReady", () => {
  registerForecastConsolePanel();

  // === Phase 300.19 — Panel Activation Binding ===
  if (typeof SageCraftAscendant !== "undefined" && SageCraftAscendant.OperatorConsole) {
    const forecastPanel = document.getElementById("forecastConsole");
    if (forecastPanel) {
      forecastPanel.addEventListener("click", () => {
        if (SageCraftAscendant.ForecastCortex) {
          const trendData = document.getElementById("trendData");
          const confidenceScore = document.getElementById("confidenceScore");
          const anomalyList = document.getElementById("anomalyList");

          if (trendData) trendData.textContent = SageCraftAscendant.ForecastCortex.getLatestTrend?.() || "N/A";
          if (confidenceScore) confidenceScore.textContent = SageCraftAscendant.ForecastCortex.getConfidenceScore?.() || "N/A";

          if (anomalyList) {
            const anomalies = SageCraftAscendant.ForecastCortex.getRecentAnomalies?.() || [];
            anomalyList.innerHTML = anomalies.length
              ? anomalies.map(anomaly => `<li>${anomaly}</li>`).join("")
              : "<li>None detected</li>";
          }
        }
      });
    }
  }
});