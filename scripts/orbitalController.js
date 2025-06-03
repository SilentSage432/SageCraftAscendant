// Neural Orbital Master Controller — Full Purification Build

window.addEventListener("load", () => {
  const orbitalHUDConfig = [
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

  const hudPanel = document.getElementById("orbitalHudPanel");

  // Build and wire buttons in one pass
  orbitalHUDConfig.forEach(({ id, emoji, label, target }) => {
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
        console.warn(`⚠ Target panel '${target}' not found for button '${id}'`);
      }
    });
    hudPanel.appendChild(btn);
  });

  console.log("✅ Neural Orbital Controller fully purified and online.");

  // Orbital Phase 4 — Neural Expansion Dock Initialization
  const expansionDock = document.createElement("div");
  expansionDock.id = "orbitalExpansionDock";
  expansionDock.style.cssText = `
    margin-top: 24px;
    padding: 12px;
    border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 0.85rem;
    color: #aaa;
    text-align: center;
  `;
  expansionDock.innerText = "Neural Expansion Dock — Ready for Module Injection";
  hudPanel.appendChild(expansionDock);

  // Orbital Phase 5 — Live Expansion Module Deployment

  // Expose neural expansion interface globally
  window.NeuralExpansionDock = {
    injectModule: (moduleId, contentHtml) => {
      const moduleBlock = document.createElement("div");
      moduleBlock.id = moduleId;
      moduleBlock.style.cssText = `
        margin-top: 16px;
        padding: 12px;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 8px;
        background: rgba(255,255,255,0.04);
        color: #fff;
        text-align: left;
      `;
      moduleBlock.innerHTML = contentHtml;
      expansionDock.appendChild(moduleBlock);
      console.log(`🧬 Neural Expansion Module '${moduleId}' successfully injected.`);
    }
  };
});