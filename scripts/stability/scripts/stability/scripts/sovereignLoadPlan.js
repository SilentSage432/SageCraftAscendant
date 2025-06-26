console.log("🧠 Sovereign Load Plan Engaged");

// Sacred panels
const panelsToActivate = [
  "countConsole",
  "deltaAnalyzerConsole",
  "reportingHubConsole",
  "sessionManagerConsole",
  "utilityHubConsole",
  "whispererConsole",
  "oracleConsole"
];

// Visibility enforcer
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

// Initial sweep
enforcePanelVisibility();

// 🧿 Mutation Observer — Watch for intrusions
const observer = new MutationObserver(() => {
  enforcePanelVisibility();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log("✅ Sovereign Guard Activated");