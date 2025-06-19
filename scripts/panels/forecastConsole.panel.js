// === forecastConsole.panel.js — Forecast Console Panel Registration ===

// === Forecast Console Panel Styles ===
(function injectForecastConsoleStyles() {
  if (document.getElementById("forecast-console-styles")) return;
  const style = document.createElement("style");
  style.id = "forecast-console-styles";
  style.textContent = `
.console-metric {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.placeholder {
  color: #888;
  font-style: italic;
}

.pulse {
  animation: pulseEffect 1.2s infinite;
}

@keyframes pulseEffect {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
`;
  document.head.appendChild(style);
})();

// === Phase 29.10 — Interrupt Retry Chain on ConsoleReady ===
let forecastRetryAbort = false;

document.addEventListener("OperatorConsoleReady", () => {
  forecastRetryAbort = true;
  console.warn("⚠️ ForecastConsole: Interrupting retry loop — OperatorConsoleReady received early.");
  registerForecastConsolePanel();
});

function waitForRegisterPanel(attempt = 1) {
  if (
    typeof OperatorDockConsole !== "undefined" &&
    typeof OperatorDockConsole.registerPanel === "function"
  ) {
    registerForecastConsolePanel();
  } else if (attempt <= 20) {
    if (forecastRetryAbort) {
      console.warn("⚠️ ForecastConsole: Retry aborted — exiting early.");
      return;
    }

    console.warn(`⚠️ ForecastConsole: Waiting for registerPanel... (${attempt}/20)`);

    setTimeout(() => {
      if (forecastRetryAbort) {
        console.warn("⚠️ ForecastConsole: Retry aborted before next attempt — skipping.");
        return;
      }
      waitForRegisterPanel(attempt + 1);
    }, 300);
  } else {
    console.error("❌ ForecastConsole: registerPanel not available after max attempts.");
  }
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
          <p class="console-intro">Welcome to the Forecast Console. Data insights and projections will appear here.</p>
          <div class="forecast-metrics">
            <div class="console-metric">
              <p><strong>Trend Analysis:</strong> <span id="trendData" class="placeholder pulse">Analyzing...</span></p>
            </div>
            <div class="console-metric">
              <p><strong>Confidence Score:</strong> <span id="confidenceScore" class="placeholder pulse">Calculating...</span></p>
            </div>
            <div class="console-metric">
              <p><strong>Recent Anomalies:</strong></p>
              <ul id="anomalyList" class="anomaly-list placeholder">
                <li>Scanning...</li>
              </ul>
            </div>
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
  waitForRegisterPanel();

  // === Phase 300.19 — Panel Activation Binding ===
  const forecastPanel = document.getElementById("forecastConsole");
  if (forecastPanel) {
    forecastPanel.addEventListener("click", () => {
      const trendData = document.getElementById("trendData");
      const confidenceScore = document.getElementById("confidenceScore");
      const anomalyList = document.getElementById("anomalyList");

      if (SageCraftAscendant?.ForecastCortex) {
        if (trendData) {
          trendData.textContent = SageCraftAscendant.ForecastCortex.getLatestTrend?.() || "N/A";
        }

        if (confidenceScore) {
          confidenceScore.textContent = SageCraftAscendant.ForecastCortex.getConfidenceScore?.() || "N/A";
        }

        if (anomalyList) {
          const anomalies = SageCraftAscendant.ForecastCortex.getRecentAnomalies?.() || [];
          anomalyList.innerHTML = anomalies.length
            ? anomalies.map(anomaly => `<li>${anomaly}</li>`).join("")
            : "<li>None detected</li>";
        }
      }
    });
  }
});

// === Phase 29.9 — Fallback Listener for Late Operator Console Load ===
document.addEventListener("OperatorConsoleReady", () => {
  console.warn("⚠️ ForecastConsole: Late OperatorConsoleReady detected. Forcing manual register...");
  registerForecastConsolePanel();
});