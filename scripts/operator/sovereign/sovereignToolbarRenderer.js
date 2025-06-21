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

  // Grouped button configuration for dropdown organization
  const buttonGroups = {
    Utilities: [
      { id: "utilityHub", label: "Utility Hub" },
      { id: "sessionManager", label: "Session Manager" },
      { id: "tools", label: "Tools" },
      { id: "mappings", label: "Mappings" }
    ],
    Forecast: [
      { id: "forecastConsole", label: "Forecast Console" },
      { id: "loreEngine", label: "Lore Engine" }
    ],
    Recovery: [
      { id: "exceptionManager", label: "Exception Manager" },
      { id: "progressDashboard", label: "Progress Dashboard" },
      { id: "audit", label: "Audit" }
    ],
    Sage: [
      { id: "count", label: "Count" },
      { id: "deltaAnalyzer", label: "Delta Analyzer" },
      { id: "reportingHub", label: "Reporting Hub" },
      { id: "masterExportHub", label: "Export Hub" },
      { id: "configPanel", label: "Config" }
    ]
  };

  const toolbarWrapper = document.createElement("div");
  toolbarWrapper.className = "sovereign-toolbar-container";

  // Render button groups as dropdowns
  Object.entries(buttonGroups).forEach(([groupName, buttons]) => {
    const groupContainer = document.createElement("div");
    groupContainer.className = "sovereign-toolbar-group";

    const groupLabel = document.createElement("div");
    groupLabel.className = "toolbar-group-label";
    groupLabel.innerText = groupName;

    const groupDropdown = document.createElement("div");
    groupDropdown.className = "toolbar-group-dropdown";

    buttons.forEach(cfg => {
      const btn = document.createElement("button");
      btn.setAttribute("data-toggle-dock", cfg.id);
      btn.innerText = cfg.label;
      btn.className = "sovereign-toolbar-button";
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sovereign-toolbar-button").forEach(button => {
          button.classList.remove("active");
        });
        btn.classList.add("active");

        const dockPanel = document.getElementById(cfg.id);
        const holoConsole = document.getElementById(`${cfg.id}Console`);

        Object.values(buttonGroups).flat().forEach(otherCfg => {
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

      groupDropdown.appendChild(btn);
    });

    groupContainer.appendChild(groupLabel);
    groupContainer.appendChild(groupDropdown);
    toolbarWrapper.appendChild(groupContainer);
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