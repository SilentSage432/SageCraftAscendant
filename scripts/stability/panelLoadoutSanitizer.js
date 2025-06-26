

console.log("🧹 Panel Loadout Sanitizer Activated");

const allowedPanels = [
  "countConsole",
  "deltaAnalyzerConsole",
  "reportingHubConsole"
];

document.querySelectorAll(".holo-console").forEach(panel => {
  if (!allowedPanels.includes(panel.id)) {
    panel.style.display = "none";
    panel.style.visibility = "hidden";
    panel.style.opacity = "0";
  } else {
    panel.style.display = "grid";
    panel.style.visibility = "visible";
    panel.style.opacity = "1";
  }
});