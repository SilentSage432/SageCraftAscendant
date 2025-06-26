// 🧬 UI Harmony Engine — Phase 343.0 Initialization
// Automatically assigns verified panels to their proper docking zones and enforces layout integrity.

document.addEventListener("DOMContentLoaded", () => {
  const panelMap = {
    countConsole: "#consolePanelGroup",
    deltaAnalyzerConsole: "#consolePanelGroup",
    reportingHubConsole: "#consolePanelGroup",
    sessionManagerConsole: "#consolePanelGroup",
    utilityHubConsole: "#consolePanelGroup",
    oracleConsole: "#consolePanelGroup",
    sageFeedConsole: "#consolePanelGroup",
    whispererConsole: "#consolePanelGroup",
    grimoireConsole: "#consolePanelGroup",
    exceptionManagerConsole: "#consolePanelGroup",
    masterExportHubConsole: "#consolePanelGroup",
    progressDashboardConsole: "#consolePanelGroup",
    mappingsConsole: "#consolePanelGroup",
    toolsConsole: "#consolePanelGroup",
    auditConsole: "#consolePanelGroup"
  };

  Object.entries(panelMap).forEach(([id, containerSelector]) => {
    const panel = document.getElementById(id);
    const container = document.querySelector(containerSelector);
    if (panel && container && panel.parentElement !== container) {
      container.appendChild(panel);
      console.log(`🔁 UI Harmony: Reassigned ${id} to ${containerSelector}`);
    }
  });

  console.log("✅ UI Harmony Engine initialized.");
});

// 🧬 Phase 344.1 — Console Ancestry Alignment Protocol
function alignConsoleAncestry() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const uniqueIDs = new Set();

  document.querySelectorAll("[id]").forEach(el => {
    const id = el.id;
    if (uniqueIDs.has(id)) {
      el.remove(); // remove ghost
    } else {
      uniqueIDs.add(id);
      if (!panelGroup.contains(el)) {
        panelGroup.appendChild(el);
      }
    }
  });

  console.log("🧬 Ancestry Alignment Complete. Ghosts purged, panels realigned.");
}

document.addEventListener("DOMContentLoaded", alignConsoleAncestry);

// 🧬 Phase 344.2 — Layout Symmetry Reinforcement
function enforceLayoutSymmetry() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  panelGroup.querySelectorAll("section, div").forEach(panel => {
    if (!panel.classList.contains("console-panel")) {
      panel.classList.add("console-panel");
      panel.setAttribute("data-harmony", "true");
      console.log(`🧬 Symmetry Reinforced: ${panel.id}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", enforceLayoutSymmetry);

// 🧬 Phase 344.3 — Dock Alignment Validation Pass
function validateDockAlignment() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const misalignedPanels = [];

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    if (panel.parentElement !== panelGroup) {
      misalignedPanels.push(panel.id || "[unnamed panel]");
    }
  });

  if (misalignedPanels.length > 0) {
    console.warn("⚠️ Dock Alignment Issues Detected:", misalignedPanels);
  } else {
    console.log("✅ All panels correctly aligned in dock.");
  }
}

document.addEventListener("DOMContentLoaded", validateDockAlignment);

// 🧬 Phase 344.4 — Hidden Panel Detection & Visibility Check
function checkHiddenPanels() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const hiddenPanels = [];

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    const style = window.getComputedStyle(panel);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
      hiddenPanels.push(panel.id || "[unnamed panel]");
    }
  });

  if (hiddenPanels.length > 0) {
    console.warn("⚠️ Hidden Panels Detected:", hiddenPanels);
  } else {
    console.log("✅ All panels are visibly active.");
  }
}

document.addEventListener("DOMContentLoaded", checkHiddenPanels);

// 🧬 Phase 344.5 — Orphan Console Detector & Reassignment
function rehomeOrphanPanels() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const knownIDs = new Set([
    "countConsole", "deltaAnalyzerConsole", "reportingHubConsole", "sessionManagerConsole",
    "utilityHubConsole", "oracleConsole", "sageFeedConsole", "whispererConsole",
    "grimoireConsole", "exceptionManagerConsole", "masterExportHubConsole",
    "progressDashboardConsole", "mappingsConsole", "toolsConsole", "auditConsole"
  ]);

  document.querySelectorAll(".console-panel").forEach(panel => {
    const id = panel.id;
    if (!knownIDs.has(id)) {
      console.warn(`🧬 Orphan Panel Detected: ${id}`);
    } else if (panel.parentElement !== panelGroup) {
      panelGroup.appendChild(panel);
      console.log(`🧬 Orphan Rehomed: ${id}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", rehomeOrphanPanels);

// 🧬 Phase 427 — Panel Identity & Role Codex Enforcement
function enforcePanelCodex() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const defaultRole = "observer";
  const defaultZone = "staging-zone";

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    if (!panel.dataset.role) {
      panel.dataset.role = defaultRole;
      console.warn(`🧬 Role Assigned: ${panel.id} → ${defaultRole}`);
    }

    if (!panel.dataset.gridArea) {
      panel.dataset.gridArea = defaultZone;
      console.warn(`🧬 Grid Area Assigned: ${panel.id} → ${defaultZone}`);
    }
  });

  console.log("🧬 Panel Codex Enforcement Complete.");
}

document.addEventListener("DOMContentLoaded", enforcePanelCodex);

// 🧬 Phase 344.6 — Console Panel State Normalizer
function normalizePanelStates() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    // Ensure visibility
    panel.style.display = "block";
    panel.style.visibility = "visible";
    panel.style.opacity = "1";

    // Clean up stray styles
    panel.classList.remove("ghost", "misaligned", "duplicate");
    panel.removeAttribute("data-clone");
    console.log(`🧬 State Normalized: ${panel.id}`);
  });
}

document.addEventListener("DOMContentLoaded", normalizePanelStates);

// 🧬 Phase 344.7 — Console Integrity Scanner
function scanConsoleIntegrity() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const idSet = new Set();
  const issues = [];

  document.querySelectorAll(".console-panel").forEach(panel => {
    const id = panel.id;

    if (!id) {
      issues.push("❗ Panel without ID detected.");
      return;
    }

    if (idSet.has(id)) {
      issues.push(`❗ Duplicate panel ID: ${id}`);
    } else {
      idSet.add(id);
    }

    if (!panel.innerHTML.trim()) {
      issues.push(`⚠️ Empty panel content: ${id}`);
    }
  });

  if (issues.length > 0) {
    console.warn("🧪 Console Integrity Scan Issues:", issues);
  } else {
    console.log("✅ Console Integrity Scan Passed.");
  }
}

document.addEventListener("DOMContentLoaded", scanConsoleIntegrity);

// 🧬 Phase 344.8 — Panel Activation Handshake System
function initiatePanelHandshake() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    const panelId = panel.id || "[unnamed panel]";
    
    // Create a custom ready event
    const readyEvent = new CustomEvent("panelReady", {
      detail: { panelId: panelId, timestamp: Date.now() }
    });

    // Dispatch the event
    panel.dispatchEvent(readyEvent);

    // Mark panel as active and log
    panel.setAttribute("data-status", "active");
    console.log(`🟢 Panel Handshake: ${panelId} is active`);
  });
}

document.addEventListener("DOMContentLoaded", initiatePanelHandshake);

// 🧬 Phase 345.0 — Console Panel Vital Signs Logger
function logPanelVitals() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    const panelId = panel.id || "[unnamed panel]";
    const rect = panel.getBoundingClientRect();
    const visible = !(rect.width === 0 || rect.height === 0);
    const computedStyle = window.getComputedStyle(panel);
    const opacity = computedStyle.opacity;
    const display = computedStyle.display;
    const visibility = computedStyle.visibility;

    console.log(`🧬 Vital Signs [${panelId}]: Visible=${visible}, Opacity=${opacity}, Display=${display}, Visibility=${visibility}`);
  });
}

document.addEventListener("DOMContentLoaded", logPanelVitals);

// 🧬 Phase 345.1 — Console Layout Geometry Mapper
function mapConsoleLayoutGeometry() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const layoutMap = [];

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    const rect = panel.getBoundingClientRect();
    layoutMap.push({
      id: panel.id || "[unnamed]",
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    });
  });

  console.table(layoutMap);
}

document.addEventListener("DOMContentLoaded", mapConsoleLayoutGeometry);

// 🧬 Phase 345.2 — Console Dock Grid Allocation Visualizer
function visualizeDockGridAllocation() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    panel.style.outline = "1px dashed magenta";
    panel.style.margin = "2px";
    panel.setAttribute("data-grid-visual", "active");
    console.log(`📐 Grid Visualizer: ${panel.id} outlined for inspection.`);
  });
}

document.addEventListener("DOMContentLoaded", visualizeDockGridAllocation);


// 🧬 Phase 345.4 — Console Grid Conflict Detector
function detectGridConflicts() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const occupiedZones = new Map();
  const conflicts = [];

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    const rect = panel.getBoundingClientRect();
    const key = `${Math.round(rect.x)}x${Math.round(rect.y)}`;

    if (occupiedZones.has(key)) {
      conflicts.push({
        zone: key,
        panels: [occupiedZones.get(key), panel.id]
      });
    } else {
      occupiedZones.set(key, panel.id);
    }
  });

  if (conflicts.length > 0) {
    console.warn("⚠️ Grid Conflicts Detected:", conflicts);
  } else {
    console.log("✅ No panel overlap conflicts detected.");
  }
}

document.addEventListener("DOMContentLoaded", detectGridConflicts);

// 🧬 Phase 345.5 — Auto-Focus Primary Console
function focusPrimaryConsole() {
  const primary = document.getElementById("countConsole") || document.querySelector(".console-panel");
  if (!primary) return;

  primary.scrollIntoView({ behavior: "smooth", block: "center" });
  primary.classList.add("focused-console");

  console.log(`🎯 Auto-Focused on Primary Console: ${primary.id}`);
}

document.addEventListener("DOMContentLoaded", focusPrimaryConsole);

// 🧬 Phase 345.6 — Ancestral Echo Detector & Isolation Sweep
/*
function isolateLegacyEchoes() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const officialIDs = new Set([
    "countConsole", "deltaAnalyzerConsole", "reportingHubConsole", "sessionManagerConsole",
    "utilityHubConsole", "oracleConsole", "sageFeedConsole", "whispererConsole",
    "grimoireConsole", "exceptionManagerConsole", "masterExportHubConsole",
    "progressDashboardConsole", "mappingsConsole", "toolsConsole", "auditConsole"
  ]);

  document.querySelectorAll(".console-panel").forEach(panel => {
    const id = panel.id;
    if (!officialIDs.has(id)) {
      panel.setAttribute("data-legacy", "true");
      panel.classList.add("legacy-echo");
      console.warn(`👻 Legacy Echo Detected: ${id} — Tagged for review.`);
    }
  });

  console.log("🧬 Legacy Echo Isolation Sweep Complete.");
}

// document.addEventListener("DOMContentLoaded", isolateLegacyEchoes);
*/
// 🧬 Phase 345.7 — Console Panel Classification Indexer
function classifyConsolePanels() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    panel.classList.add("classified-core");
    console.log(`🗂️ Panel Classified: ${panel.id} → Core`);
  });
}

document.addEventListener("DOMContentLoaded", classifyConsolePanels);

// 🧬 Phase 346.0 — Console Registry Architect
function buildConsoleRegistry() {
  const panelGroup = document.getElementById("consolePanelGroup");
  if (!panelGroup) return;

  const registry = {};

  panelGroup.querySelectorAll(".console-panel").forEach(panel => {
    const id = panel.id || "[unnamed panel]";
    const rect = panel.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(panel);

    registry[id] = {
      id,
      status: panel.dataset.legacy === "true" ? "legacy" : "core",
      visible: !(rect.width === 0 || rect.height === 0),
      display: computedStyle.display,
      visibility: computedStyle.visibility,
      opacity: computedStyle.opacity,
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      tags: {
        harmony: panel.dataset.harmony === "true",
        legacy: panel.dataset.legacy === "true",
        active: panel.dataset.status === "active"
      }
    };
  });

  window.SovereignConsoleRegistry = registry;
  console.log("📚 SovereignConsoleRegistry Initialized:", registry);
}

document.addEventListener("DOMContentLoaded", buildConsoleRegistry);

// 🧬 Phase 346.1 — Registry Monitor & Snapshot Recorder
function monitorRegistryChanges() {
  if (!window.SovereignConsoleRegistry) {
    console.warn("⚠️ SovereignConsoleRegistry not initialized.");
    return;
  }

  const snapshot = JSON.stringify(window.SovereignConsoleRegistry, null, 2);
  const timestamp = new Date().toISOString();
  console.log(`📸 Snapshot @ ${timestamp}:\n`, snapshot);

  // Optional: Store snapshot for future comparison
  window.SovereignConsoleSnapshots = window.SovereignConsoleSnapshots || [];
  window.SovereignConsoleSnapshots.push({
    timestamp,
    snapshot: JSON.parse(snapshot)
  });
}


document.addEventListener("DOMContentLoaded", () => {
  setInterval(monitorRegistryChanges, 15000); // log every 15 seconds
});

// 🧬 Phase 346.2 — Console Registry Drift Detector
function detectRegistryDrift() {
  if (!window.SovereignConsoleRegistry || !window.SovereignConsoleSnapshots) {
    console.warn("⚠️ Registry or Snapshots not available for drift detection.");
    return;
  }

  const latestSnapshot = window.SovereignConsoleSnapshots.slice(-1)[0]?.snapshot;
  if (!latestSnapshot) {
    console.warn("⚠️ No snapshot available for comparison.");
    return;
  }

  const currentRegistry = window.SovereignConsoleRegistry;
  const driftLog = [];

  Object.entries(currentRegistry).forEach(([id, currentState]) => {
    const snapshotState = latestSnapshot[id];
    if (!snapshotState) {
      driftLog.push(`➕ New Panel Detected: ${id}`);
      return;
    }

    const keysToCompare = ['x', 'y', 'width', 'height', 'status', 'display', 'visibility', 'opacity'];
    keysToCompare.forEach(key => {
      if (currentState[key] !== snapshotState[key]) {
        driftLog.push(`🔄 Drift Detected in ${id} — ${key}: ${snapshotState[key]} → ${currentState[key]}`);
      }
    });
  });

  const oldIDs = Object.keys(latestSnapshot);
  const newIDs = Object.keys(currentRegistry);
  const removedIDs = oldIDs.filter(id => !newIDs.includes(id));
  removedIDs.forEach(id => {
    driftLog.push(`❌ Panel Removed: ${id}`);
  });

  if (driftLog.length > 0) {
    console.warn("📉 Registry Drift Detected:\n", driftLog);
  } else {
    console.log("✅ No drift detected in SovereignConsoleRegistry.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(detectRegistryDrift, 20000); // drift check every 20s
});