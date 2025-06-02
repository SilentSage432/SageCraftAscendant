// Forecast Pattern Signal Generator — Phase 122.3

window.generatePatternSignals = function() {
  const history = window.loadForecastHistory();
  if (!history.length) {
    alert("No forecast history available for pattern signal generation.");
    return null;
  }

  const signals = [];

  history.forEach(snapshot => {
    snapshot.data.forEach(entry => {
      let riskLevel = 'Low';

      if (entry.daysAway <= 3) {
        riskLevel = 'Critical';
      } else if (entry.daysAway <= 7) {
        riskLevel = 'High';
      } else if (entry.daysAway <= 14) {
        riskLevel = 'Moderate';
      }

      signals.push({
        timestamp: snapshot.timestamp,
        category: entry.category,
        daysAway: entry.daysAway,
        riskLevel: riskLevel
      });
    });
  });

  console.table(signals);
  return signals;
};

// Forecast Pattern Signal Table Renderer — Phase 122.4

window.renderPatternSignalsTable = function(signals) {
  const wrapperId = "patternSignalsPanel";
  const existingWrapper = document.getElementById(wrapperId);

  if (!existingWrapper) {
    console.warn("⚠ Pattern Signals panel not found.");
    return;
  }

  const tbody = existingWrapper.querySelector("tbody");
  tbody.innerHTML = "";

  if (!signals.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888;">No pattern signals available</td></tr>`;
    return;
  }

  signals.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.timestamp}</td>
      <td>${entry.category}</td>
      <td>${entry.daysAway}</td>
      <td style="color:${entry.riskLevel === 'Critical' ? '#ff5555' : (entry.riskLevel === 'High' ? '#ff9933' : (entry.riskLevel === 'Moderate' ? '#ffd700' : '#00cc66'))}; font-weight:bold;">${entry.riskLevel}</td>
    `;
    tbody.appendChild(row);
  });
};

// Auto-trigger UI sync after load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("rotationAuditPanel")) {
    window.runRotationEngineAuditUI();
  }

  if (document.getElementById("forecastTable")) {
    const forecast = window.loadForecastFromMemory();
    const tbody = document.querySelector("#forecastTable tbody");
    tbody.innerHTML = "";

    if (!forecast.length) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888;">No forecast data loaded</td></tr>`;
    } else {
      forecast.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.category}</td>
          <td>${entry.daysAway <= 0 ? "Now" : `${entry.daysAway} days`}</td>
          <td>${entry.daysAway}</td>
          <td style="color:${entry.daysAway <= 0 ? '#ff5555' : '#00cc66'}; font-weight:bold;">${entry.daysAway <= 0 ? 'DUE' : 'OK'}</td>
        `;
        tbody.appendChild(row);
      });
    }
  }
});
