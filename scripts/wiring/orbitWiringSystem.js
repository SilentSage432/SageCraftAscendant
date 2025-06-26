const orbitConfig = [
  { id: "countConsole", icon: "📊", label: "Count" },
  { id: "deltaAnalyzerConsole", icon: "📈", label: "Delta" },
  { id: "reportingHubConsole", icon: "🗂", label: "Reports" },
  { id: "sessionManagerConsole", icon: "📋", label: "Sessions" },
  { id: "utilityHubConsole", icon: "🛠", label: "Utility" },
  { id: "oracleConsole", icon: "🔮", label: "Oracle" },
  { id: "whispererConsole", icon: "🌌", label: "Whisperer" },
  { id: "sageFeedConsole", icon: "🪶", label: "Sage Feed" },
  { id: "grimoireConsole", icon: "📖", label: "Grimoire" }
];

function renderOrbits(containerId = "orbitalDockContainer") {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("❌ Orbital Dock Container not found.");
    return;
  }

  orbitConfig.forEach((orbit) => {
    const btn = document.createElement("button");
    btn.className = "orbit-btn";
    btn.dataset.target = orbit.id;
    btn.innerHTML = `${orbit.icon} ${orbit.label}`;
    btn.addEventListener("click", () => toggleDockPanel(orbit.id));
    container.appendChild(btn);
  });

  console.log("🪐 Orbit buttons rendered successfully.");
}

function toggleDockPanel(consoleId) {
  const panel = document.getElementById(consoleId);
  if (!panel) {
    console.warn(`⚠️ Panel with ID '${consoleId}' not found.`);
    return;
  }

  const isHidden = panel.classList.contains("orbit-bound");

  if (isHidden) {
    panel.classList.remove("orbit-bound", "hidden");
    panel.style.display = "block";
    panel.style.opacity = 1;
    panel.style.visibility = "visible";
    panel.style.zIndex = 100;
    panel.classList.add("snap-pinned");
  } else {
    panel.classList.add("orbit-bound", "hidden");
    panel.style.display = "none";
    panel.style.opacity = 0;
    panel.style.visibility = "hidden";
    panel.style.zIndex = 0;
  }

  console.log(`🎛️ Toggled panel: ${consoleId} → ${isHidden ? "Visible" : "Hidden"}`);
}

export const OrbitWiringSystem = {
  renderOrbits,
  toggleDockPanel
};
