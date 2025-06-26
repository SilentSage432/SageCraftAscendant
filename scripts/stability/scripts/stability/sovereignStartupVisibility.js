document.addEventListener("DOMContentLoaded", () => {
    const panelsToShow = [
      "sovereignTerminalConsole", // if this is your central terminal
      "neuralPulseMonitorConsole", // health monitor
    ];
  
    document.querySelectorAll(".holo-console").forEach(panel => {
      const shouldShow = panelsToShow.includes(panel.id);
      panel.style.display = shouldShow ? "grid" : "none";
      panel.style.visibility = shouldShow ? "visible" : "hidden";
      panel.style.opacity = shouldShow ? "1" : "0";
    });
  
    console.log("✅ Sovereign startup visibility enforced.");
  });