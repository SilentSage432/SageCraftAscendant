// Orbital HUD Controller — Neural Spatial Stabilizer Phase 6.0

window.addEventListener("load", () => {

  const hudConfig = [
    { id: "hudAuditModules", emoji: "🧮", label: "Audit Modules", target: "#count" },
    { id: "hudAnalysis", emoji: "📊", label: "Delta Analyzer", target: "#deltaAnalyzer" },
    { id: "hudReporting", emoji: "🖨", label: "Reporting Hub", target: "#reportingHub" },
    { id: "hudUtility", emoji: "🛠", label: "Utility Hub", target: "#utilityHub" },
    { id: "hudControl", emoji: "⚙", label: "Control Panel", target: "#tools" },
    { id: "hudMasterExport", emoji: "📦", label: "Master Export", target: "#masterExportHub" },
    { id: "hudSessionManager", emoji: "📂", label: "Session Manager", target: "#sessionManager" },
    { id: "hudMappingManager", emoji: "🧬", label: "Mapping Manager", target: "#mappings" },
    { id: "hudAdvancedTools", emoji: "🧠", label: "Advanced Tools", target: "#advancedTools" },
    { id: "hudAuditRotation", emoji: "🔄", label: "Audit Rotation", target: "#audit" },
    { id: "hudConfigPanel", emoji: "⚙️", label: "Config Panel", target: "#configPanel" },
    { id: "hudOperatorConsole", emoji: "🧪", label: "Operator Console", target: "#operatorConsolePanel" },
    { id: "hudDiagnostics", emoji: "🚩", label: "Diagnostics", target: "#diagnosticsModal" },
    { id: "hudDropbox", emoji: "📥", label: "Dropbox", target: "#dropboxModal" }
  ];

  // Build Orbital HUD Container
  const hudPanel = document.createElement("div");
  hudPanel.id = "orbitalHudPanel";
  hudPanel.style.cssText = `
    position: fixed;
    top: 80px;
    left: 20px;
    z-index: 9999;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    background: rgba(15,15,25,0.7);
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(153, 51, 255, 0.6);
  `;
  document.body.appendChild(hudPanel);

  hudConfig.forEach(({ id, emoji, label, target }) => {
    const btn = document.createElement("button");
    btn.classList.add("orbital-btn");
    btn.id = id;
    btn.title = label;
    btn.innerText = emoji;
    btn.addEventListener("click", () => {
      const panel = document.querySelector(target);
      if (panel) {
        panel.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`⚠ Target '${target}' not found.`);
      }
    });
    hudPanel.appendChild(btn);
  });

  console.log("✅ Orbital HUD Phase 6.0 fully stabilized.");
});
