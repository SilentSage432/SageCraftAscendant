// === Panel Loader System ===
// Dynamically injects panel partials into #consoleMountZone

const PanelLoader = {
  essentialPanels: [
    { id: "whispererConsole", url: "partials/whispererConsole.html" },
    { id: "neuralPulsePanel", url: "partials/neuralPulsePanel.html" },
    { id: "coreCommandInput", url: "partials/coreCommandInput.html" }
  ],

  lazyPanels: [
    { id: "oracleConsole", url: "partials/oracleConsole.html" },
    { id: "anomalySanctumConsole", url: "partials/anomalySanctumConsole.html" },
    { id: "auditConsole", url: "partials/auditConsole.html" },
    { id: "deltaAnalyzerConsole", url: "partials/deltaAnalyzerConsole.html" },
    { id: "exceptionManager", url: "partials/exceptionManager.html" },
    { id: "mappingsConsole", url: "partials/mappingsConsole.html" },
    { id: "masterExportHubConsole", url: "partials/masterExportHubConsole.html" },
    { id: "memoryKernelConsole", url: "partials/memoryKernelConsole.html" },
    { id: "toolsConsole", url: "partials/toolsConsole.html" },
    { id: "untilityHubConsole", url: "partials/untilityHubConsole.html" }
  ],

  async loadById(panelId) {
    const panel = this.lazyPanels.find(p => p.id === panelId);
    if (panel) {
      await this.loadPanel(panel.id, panel.url);
    } else {
      console.warn(`⚠️ Panel with ID "${panelId}" not found in lazyPanels.`);
    }
  },

  async loadPanel(id, url) {
    const zone = document.getElementById("consoleMountZone");
    if (!zone || document.getElementById(id)) return;

    try {
      const res = await fetch(url);
      const html = await res.text();
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      const panel = wrapper.firstElementChild;
      if (panel) {
        zone.appendChild(panel);
      }
    } catch (err) {
      console.error(`❌ Failed to load panel ${id}:`, err);
    }
  },

  async loadEssentialPanels() {
    for (const { id, url } of this.essentialPanels) {
      await this.loadPanel(id, url);
    }
  }
};

// Automatically load essential panels on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  PanelLoader.loadEssentialPanels();
  for (const { id, url } of PanelLoader.lazyPanels) {
    const mount = document.querySelector(`[data-panel="${id}"]`);
    if (mount) {
      PanelLoader.loadPanel(id, url);
    }
  }
});
