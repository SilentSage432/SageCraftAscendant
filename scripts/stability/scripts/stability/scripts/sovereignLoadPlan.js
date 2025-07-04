console.log("🧠 Sovereign Load Plan Engaged");

// Sacred panels (active consoles to remain visible)
const panelsToActivate = [
  "countConsole",
  "deltaAnalyzerConsole",
  "reportingHubConsole",
  "sessionManagerConsole",
  "utilityHubConsole",
  "whispererConsole",
  "oracleConsole"
];

// Visibility enforcer — run once on load
function enforcePanelVisibility() {
  document.querySelectorAll(".holo-console").forEach(panel => {
    if (panelsToActivate.includes(panel.id)) {
      panel.style.display = "grid";
      panel.style.visibility = "visible";
      panel.style.opacity = "1";
    } else {
      panel.style.display = "none";
      panel.style.visibility = "hidden";
      panel.style.opacity = "0";
      panel.innerHTML = ""; // Optional: clear junk
    }
  });
}

// Initial sweep (no longer observed dynamically)
enforcePanelVisibility();

console.log("✅ Sovereign Visibility Guard Engaged");