console.log("✨ Orbit Summoner Initialized");

window.OrbitSummoner = {
  invoke: () => {
    const orbitPanels = [
        'countConsole',
        'deltaAnalyzerConsole',
        'reportingHubConsole'
      ];

    orbitPanels.forEach(id => {
      const panel = document.getElementById(id);
      if (panel) {
        panel.style.display = 'grid';
        panel.style.visibility = 'visible';
        panel.style.opacity = '1';
      }
    });

    console.log("🪐 Orbit Panels Summoned:", orbitPanels);
  }
};

// Auto-invoke on load for testing purposes
document.addEventListener("DOMContentLoaded", () => {
  if (window?.OrbitSummoner?.invoke) {
    OrbitSummoner.invoke();
  }
});
