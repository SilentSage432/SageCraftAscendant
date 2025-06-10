// ✅ Sovereign Hook Activated — Renderer Ready for Deployment
// === Phase 1903: Sovereign Toolbar Dynamic Renderer Bootstrap ===

function renderSovereignToolbar() {
  console.log("🧭 Sovereign Toolbar Renderer Engaged...");

  const mountPoint = document.getElementById("sovereignToolbarMount");
  if (!mountPoint) {
    console.error("❌ Sovereign Toolbar Mount Point Missing!");
    return;
  }

  // Clear existing buttons
  mountPoint.innerHTML = '';

  const buttonConfigs = [
    { id: "count", label: "Count" },
    { id: "deltaAnalyzer", label: "Delta Analyzer" },
    { id: "exceptionManager", label: "Exception Manager" },
    { id: "progressDashboard", label: "Progress Dashboard" },
    { id: "reportingHub", label: "Reporting Hub" },
    { id: "masterExportHub", label: "Export Hub" },
    { id: "utilityHub", label: "Utility Hub" },
    { id: "sessionManager", label: "Session Manager" },
    { id: "mappings", label: "Mappings" },
    { id: "tools", label: "Tools" },
    { id: "audit", label: "Audit" },
    { id: "configPanel", label: "Config" },
    { id: "forecastConsole", label: "Forecast Console" }
  ];

  const toolbarWrapper = document.createElement("div");
  toolbarWrapper.className = "sovereign-toolbar-container";

  buttonConfigs.forEach(cfg => {
    const btn = document.createElement("button");
    btn.setAttribute("data-toggle-dock", cfg.id);
    btn.innerText = cfg.label;
    btn.className = "sovereign-toolbar-button";
    btn.addEventListener("click", () => {
      // Remove active state from all buttons
      document.querySelectorAll(".sovereign-toolbar-button").forEach(button => {
        button.classList.remove("active");
      });
      btn.classList.add("active");

      // Define dual panel types for future-proofing
      const dockPanel = document.getElementById(cfg.id);
      const holoConsole = document.getElementById(`${cfg.id}Console`);

      // Hide all other panels (both types)
      buttonConfigs.forEach(otherCfg => {
        const otherDock = document.getElementById(otherCfg.id);
        const otherConsole = document.getElementById(`${otherCfg.id}Console`);
        if (otherDock && otherCfg.id !== cfg.id) {
          otherDock.classList.add("hidden");
          otherDock.style.display = 'none';
        }
        if (otherConsole && otherCfg.id !== cfg.id) {
          otherConsole.classList.add("hidden");
          otherConsole.style.display = 'none';
        }
      });

      // Determine target panel to toggle
      const target = holoConsole || dockPanel;
      if (!target) {
        console.warn(`⚠ No target found for toggle: Neither '${cfg.id}' nor '${cfg.id}Console' exists in DOM.`);
        return;
      }

      const isHidden = target.classList.contains("hidden");
      if (isHidden) {
        target.classList.remove("hidden");
        target.style.display = 'block';
      } else {
        target.classList.add("hidden");
        target.style.display = 'none';
      }

      console.log(`🔄 Toggled panel: ${cfg.label} → ${isHidden ? 'Visible' : 'Hidden'}`);
    });
    console.log(`🔘 Rendering button: ${cfg.label} (ID: ${cfg.id})`);
    toolbarWrapper.appendChild(btn);
  });

  mountPoint.appendChild(toolbarWrapper);

  console.log("✅ Sovereign Toolbar fully populated.");
  console.log("🔗 Sovereign Toolbar Renderer Hook Confirmed.");
}
// === Phase 1906.4: Sovereign DOM Scaffold Temporal Correction Layer ===

function renderSovereignToolbarSafe() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(() => {
        renderSovereignToolbar();
      }, 0);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        renderSovereignToolbar();
      });
    }
  }
  
// Sovereign Export Hook

class SovereignToolbarRenderer {
  static renderToolbar() {
    renderSovereignToolbarSafe();
  }
}

// Sovereign Subsystem Registration
window.SovereignSubsystems = window.SovereignSubsystems || {};
window.SovereignSubsystems['toolbarRenderer'] = SovereignToolbarRenderer;