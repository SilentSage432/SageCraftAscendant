// === Phase 339.2 — Canonical Panel Verification Sweep ===
console.log("📜 Phase 339.2 — Canonical Panel Verification Sweep Activated");

const panelIds = [
  "countConsole",
  "deltaAnalyzerConsole",
  "reportingHubConsole",
  "sessionManagerConsole",
  "utilityHubConsole",
  "oracleConsole",
  "whispererConsole",
  "sageFeedConsole",
  "grimoireConsole",
  "auditConsole"
];

panelIds.forEach((panelId) => {
  const panel = document.getElementById(panelId);
  if (!panel) {
    console.warn(`❌ Panel missing: ${panelId}`);
    return;
  }

  const displayStyle = window.getComputedStyle(panel).display;
  const contentLength = panel.innerHTML.trim().length;

  if (displayStyle === "none") {
    console.warn(`⚠️ Panel '${panelId}' is hidden on load.`);
  }

  if (contentLength === 0) {
    console.warn(`🕳️ Panel '${panelId}' is structurally present but EMPTY.`);
  }

  console.log(`✅ Verified panel '${panelId}' — display: ${displayStyle}, content length: ${contentLength}`);
});

// === Phase 339.3 — Core Panel Restoration Map ===
const panelStatusMap = {};

panelIds.forEach((panelId) => {
  const panel = document.getElementById(panelId);
  if (!panel) {
    panelStatusMap[panelId] = "missing";
    return;
  }

  const displayStyle = window.getComputedStyle(panel).display;
  const contentLength = panel.innerHTML.trim().length;

  if (displayStyle === "none") {
    panelStatusMap[panelId] = "hidden";
  } else if (contentLength === 0) {
    panelStatusMap[panelId] = "empty";
  } else {
    panelStatusMap[panelId] = "verified";
  }
});

console.log("🗺️ Panel Restoration Map:", panelStatusMap);

// === Phase 339.4 — Resurrection Directive Blueprint Injection ===
const resurrectionDirectives = {};

Object.entries(panelStatusMap).forEach(([panelId, status]) => {
  switch (status) {
    case "missing":
      resurrectionDirectives[panelId] = "⚠️ Panel missing — create placeholder";
      break;
    case "hidden":
      resurrectionDirectives[panelId] = "🔄 Unhide via visibility patch";
      break;
    case "empty":
      resurrectionDirectives[panelId] = "💾 Inject fallback content or load handler";
      break;
    case "verified":
      resurrectionDirectives[panelId] = "✅ No action needed";
      break;
    default:
      resurrectionDirectives[panelId] = "❓ Unknown state";
  }
});

console.log("📘 Resurrection Directives:", resurrectionDirectives);

// === Phase 340.0 — Resurrection Handler Uplink ===
console.log("🧬 Phase 340.0 — Resurrection Handler Uplink Initialized");

Object.entries(resurrectionDirectives).forEach(([panelId, directive]) => {
  const panel = document.getElementById(panelId);
  if (!panel) {
    if (directive.includes("create placeholder")) {
      const placeholder = document.createElement("div");
      placeholder.id = panelId;
      placeholder.className = "resurrected-placeholder";
      placeholder.innerHTML = `<div class='placeholder-warning'>⚠️ ${panelId} placeholder injected</div>`;
      document.body.appendChild(placeholder);
      console.log(`🛠️ Placeholder injected for missing panel: ${panelId}`);
    }
    return;
  }

  if (directive.includes("Unhide")) {
    panel.style.visibility = "visible";
    panel.style.display = "block";
    panel.style.opacity = "1";
    console.log(`🧼 Visibility restored for panel: ${panelId}`);
  }

  if (directive.includes("Inject fallback")) {
    panel.innerHTML = `<div class='fallback-content'>🔧 Default content restored for ${panelId}</div>`;
    console.log(`♻️ Fallback content injected into panel: ${panelId}`);
  }
});

// === Phase 341.0 — Signal Link Reauthorization Sweep ===
console.log("📡 Phase 341.0 — Signal Link Reauthorization Sweep Activated");

panelIds.forEach((panelId) => {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  panel.dataset.signalLinked = "true";

  const signalIndicator = document.createElement("div");
  signalIndicator.className = "signal-indicator";
  signalIndicator.innerText = "🔗 Signal Linked";
  signalIndicator.style.fontSize = "0.75rem";
  signalIndicator.style.color = "#6ff";
  signalIndicator.style.opacity = "0.6";
  signalIndicator.style.marginTop = "0.25rem";

  // Avoid duplicates
  const alreadyExists = Array.from(panel.children).some(
    (child) => child.className === "signal-indicator"
  );
  if (!alreadyExists) {
    panel.appendChild(signalIndicator);
    console.log(`🔗 Signal link reauthorized for panel: ${panelId}`);
  }
});

// === Phase 342.0 — UI Memory Kernel Status Report ===
console.log("🧠 Phase 342.0 — UI Memory Kernel Status Report Activated");

const memoryKernelReport = {};

panelIds.forEach((panelId) => {
  const panel = document.getElementById(panelId);
  if (!panel) {
    memoryKernelReport[panelId] = "❌ MISSING";
    return;
  }

  const signalLinked = panel.dataset.signalLinked === "true";
  const hasIndicator = !!panel.querySelector(".signal-indicator");
  const contentLength = panel.innerHTML.trim().length;

  memoryKernelReport[panelId] = {
    signalLinked,
    signalIndicatorVisible: hasIndicator,
    contentLength,
    status:
      !signalLinked
        ? "⚠️ No Signal Link"
        : contentLength === 0
        ? "🕳️ Empty"
        : "✅ Online"
  };
});

console.log("🧠 Memory Kernel Diagnostic Report:", memoryKernelReport);

// === Phase 343.0 — UI Cleanup Sweep: Remove Redundant Signal Indicators ===
console.log("🧹 Phase 343.0 — UI Cleanup Sweep Activated");

panelIds.forEach((panelId) => {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  const signalIndicators = panel.querySelectorAll(".signal-indicator");
  if (signalIndicators.length > 1) {
    signalIndicators.forEach((indicator, index) => {
      if (index > 0) {
        indicator.remove();
        console.log(`🗑️ Removed duplicate signal indicator in: ${panelId}`);
      }
    });
  }
});

// === Phase 344.0 — Orphan Panel Relocation Protocol ===
console.log("🚚 Phase 344.0 — Orphan Panel Relocation Protocol Activated");

const consolePanelGroup = document.getElementById("consolePanelGroup");

if (consolePanelGroup) {
  panelIds.forEach((panelId) => {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const currentParent = panel.parentElement;
    if (currentParent && currentParent.id !== "consolePanelGroup") {
      consolePanelGroup.appendChild(panel);
      console.log(`🏠 Rehomed orphaned panel '${panelId}' to #consolePanelGroup`);
    }
  });
} else {
  console.warn("❌ #consolePanelGroup not found — orphan relocation skipped.");
}