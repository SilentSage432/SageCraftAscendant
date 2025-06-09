// === Sovereign Control Toolbar Dynamic Injection — Phase 1901 ===

export function initializeSovereignToolbar() {
  console.log("🧭 Sovereign Toolbar Initialization Triggered...");

  let existingToolbar = document.getElementById("sovereignControlToolbar");
  if (existingToolbar) {
    console.warn("⚠ Sovereign Toolbar already exists. Skipping reinjection.");
    return;
  }

  const toolbar = document.createElement("div");
  toolbar.id = "sovereignControlToolbar";
  toolbar.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(34, 0, 51, 0.9);
    border: 1px solid #cc66ff;
    border-radius: 10px;
    padding: 10px 25px;
    box-shadow: 0 0 12px rgba(204,102,255,0.6);
    z-index: 999;
    display: flex;
    gap: 12px;
  `;

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
    { id: "configPanel", label: "Config" }
  ];

  buttonConfigs.forEach(cfg => {
    const btn = document.createElement("button");
    btn.innerText = cfg.label;
    btn.style.cssText = `
      background: #550088;
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 5px;
      font-weight: bold;
      transition: all 0.2s ease;
      cursor: pointer;
    `;
    btn.onmouseover = () => btn.style.background = '#7700aa';
    btn.onmouseout = () => btn.style.background = '#550088';
    btn.onclick = () => {
      const panel = document.getElementById(cfg.id);
      if (!panel) {
        console.warn(`⚠ Panel '${cfg.id}' not found.`);
        return;
      }
      const isHidden = panel.style.display === 'none' || panel.classList.contains("hidden");
      panel.style.display = isHidden ? 'block' : 'none';
    };
    toolbar.appendChild(btn);
  });

  document.body.appendChild(toolbar);
  console.log("✅ Sovereign Control Toolbar successfully injected.");
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSovereignToolbar();
});