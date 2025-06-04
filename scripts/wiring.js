// === NavigationCore Global Bootstrap ===
window.NavigationCore = (function() {
  function bootstrap() {
    console.log("🧭 NavigationCore initialized.");

    const navButtons = document.querySelectorAll('.tablink');
    navButtons.forEach(btn => {
      const target = btn.dataset.target;
      if (!target) return;

      btn.addEventListener("click", () => {
        console.log(`🛰 Activating target panel: ${target}`);
        activatePanel(target);
      });
    });
  }

  function activatePanel(targetId) {
    const fullPanelId = `panel${targetId}`;
    const panels = document.querySelectorAll(".panel");
    panels.forEach(panel => {
      panel.style.display = (panel.id === fullPanelId) ? "block" : "none";
    });
  }

  // === Dynamic Router Synchronization ===
  function resolveTarget(targetId) {
    console.log(`🧬 Resolving dynamic target for: ${targetId}`);
    if (window.OrbitalAnchorRegistry && typeof window.OrbitalAnchorRegistry.getAnchor === "function") {
      const anchor = window.OrbitalAnchorRegistry.getAnchor(targetId);
      if (anchor) {
        console.log(`✅ Target found in Anchor Registry: ${targetId}`);
        activatePanel(targetId);
        return;
      }
    }
    console.warn(`⚠ Target not found in Anchor Registry: ${targetId}`);
    activatePanel(targetId); // Fallback to static panel resolution
  }

  function auditRoutingMesh() {
    console.log("🔎 Beginning Neural Routing Integrity Audit...");
    const buttons = document.querySelectorAll('.orbital-btn, .tablink');
    buttons.forEach(btn => {
      const targetId = btn.dataset.target;
      if (!targetId) {
        console.warn("⚠ Button found with missing target attribute.");
        return;
      }

      console.log(`🧪 Auditing target: ${targetId}`);
      if (window.OrbitalAnchorRegistry.getAnchor(targetId)) {
        console.log(`✅ Anchor found for ${targetId}`);
      } else {
        console.warn(`⚠ No anchor found for ${targetId}`);
      }

      const domId = `panel${targetId}`;
      const panelElement = document.getElementById(domId);
      if (panelElement) {
        console.log(`✅ DOM panel exists for ${domId}`);
      } else {
        console.warn(`⚠ Missing DOM panel for ${domId}`);
      }
    });
  }

  function synchronizeOrbitalCascade() {
    console.log("🔧 Executing Neural Orbital Event Cascade Synchronizer...");

    const buttons = document.querySelectorAll('.orbital-btn, .tablink');
    let missingTargets = 0;
    let missingAnchors = 0;

    buttons.forEach(btn => {
      const targetId = btn.dataset.target;
      if (!targetId) {
        console.warn("⚠ Found button with missing target attribute.");
        missingTargets++;
        return;
      }

      const anchor = window.OrbitalAnchorRegistry?.getAnchor(targetId);
      if (!anchor) {
        console.warn(`⚠ Missing anchor in registry for target: ${targetId}`);
        missingAnchors++;
      }
    });

    if (missingTargets === 0 && missingAnchors === 0) {
      console.log("✅ Neural Orbital Cascade fully synchronized.");
    } else {
      console.warn(`⚠ Synchronization warnings — MissingTargets: ${missingTargets}, MissingAnchors: ${missingAnchors}`);
    }
  }

  return { 
    bootstrap,
    activateTab: activatePanel,
    resolveTarget,
    auditRoutingMesh,
    synchronizeOrbitalCascade
  };
})();

// === Wiring Synchronizer Phase 14 ===

NavigationCore.attachOrbitalWiring = function() {
  console.log("🔌 Wiring Synchronizer Phase 14 Activated...");

  const navButtons = document.querySelectorAll('.tablink, .orbital-btn');
  navButtons.forEach(btn => {
    const target = btn.dataset.target;
    if (!target) return;

    btn.addEventListener("click", () => {
      console.log(`🛰 Orbital HUD Dispatching Neural Resolve for: ${target}`);
      NavigationCore.resolveTarget(target);
    });
  });

  console.log("✅ Wiring Synchronizer Phase 14 completed.");
};

// === Neural Orbital Anchor Registry Injection (Phase 26) ===
window.OrbitalAnchorRegistry = (function() {
  const anchors = {};

  function buildRegistry() {
    console.log("📡 Building Orbital Anchor Registry...");
    const buttons = document.querySelectorAll('.orbital-btn, .tablink');
    buttons.forEach(btn => {
      const target = btn.dataset.target;
      if (target) {
        anchors[target] = btn;
        console.log(`🛰 Anchor Registered: ${target}`);
      }
    });
  }

  function getAnchor(target) {
    return anchors[target] || null;
  }

  function listAnchors() {
    return Object.keys(anchors);
  }

  return {
    buildRegistry,
    getAnchor,
    listAnchors
  };
})();
// === Unified Neural Bootloader Stabilization ===

document.addEventListener("DOMContentLoaded", () => {
  console.log("⚙ Neural Bootstrap Sequence Starting...");
  
  try {
    OrbitalAnchorRegistry.buildRegistry();
    NavigationCore.attachOrbitalWiring();
    OrbitalController.bootstrap();
    NavigationCore.auditRoutingMesh();
    NavigationCore.synchronizeOrbitalCascade();

    console.log("✅ Neural Bootstrap Complete.");
  } catch (err) {
    console.error("❌ Neural Bootstrap Failure:", err);
  }
});

// === Phase 39 Neural Mesh Activation ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("🧬 Neural Orbital Mesh Activation Running");

  const buttons = document.querySelectorAll('.orbital-btn');

  buttons.forEach(button => {
    const targetSelector = button.dataset.target;
    if (!targetSelector) {
      console.warn("⚠ Orbital button missing data-target attribute.");
      return;
    }

    const targetPanel = document.querySelector(targetSelector);
    if (!targetPanel) {
      console.warn(`⚠ Could not find target panel: ${targetSelector}`);
      return;
    }

    button.addEventListener("click", () => {
      document.querySelectorAll('.tabcontent').forEach(panel => {
        panel.classList.remove("active");
      });
      targetPanel.classList.add("active");
      targetPanel.scrollIntoView({ behavior: "smooth" });
      console.log(`✅ Activated ${targetSelector}`);
    });
  });

  console.log("✅ Neural Orbital Mesh Activation Complete");
});
// === Phase 40 Purification Injection ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("🧹 Phase 40 — Orbital Purification Audit & Wiring Compression Activated");

  const anchors = [
    { id: "operatorConsolePanel", icon: "icon-console.png" },
    { id: "count", icon: "icon-audit.png" },
    { id: "deltaAnalyzer", icon: "icon-delta.png" },
    { id: "reportingHub", icon: "icon-report.png" },
    { id: "utilityHub", icon: "icon-utility.png" },
    { id: "tools", icon: "icon-tools.png" },
    { id: "masterExportHub", icon: "icon-export.png" },
    { id: "sessionManager", icon: "icon-session.png" },
    { id: "mappings", icon: "icon-mapping.png" },
    { id: "advancedTools", icon: "icon-advanced.png" },
    { id: "rotation", icon: "icon-rotation.png" },
    { id: "dropboxModal", icon: "icon-dropbox.png" }
  ];

  anchors.forEach(anchor => {
    const panel = document.getElementById(anchor.id);
    const button = document.querySelector(`.tablink[data-target="${anchor.id}"]`);

    if (!panel) {
      console.warn(`⚠ Missing DOM Panel for: ${anchor.id}`);
    }
    if (!button) {
      console.warn(`⚠ Missing DOM Button for: ${anchor.id}`);
    } else {
      const img = document.createElement("img");
      img.src = `/assets/icons/${anchor.icon}`;
      img.alt = anchor.id;
      img.classList.add("orbital-icon");
      button.innerHTML = "";
      button.appendChild(img);
    }
  });

  console.log("✅ Orbital Purification Compression Complete.");
});

// === Phase 41: Orbital Anchor Wiring Bootstrap ===

NavigationCore.bootstrapOrbitalAnchors = function() {
  console.log("🧬 Phase 41 — Orbital Anchor Wiring Bootstrap Starting...");

  const anchors = [
    { id: "operatorConsolePanel", selector: "#paneloperatorConsolePanel" },
    { id: "count", selector: "#panelcount" },
    { id: "deltaAnalyzer", selector: "#paneldeltaAnalyzer" },
    { id: "reportingHub", selector: "#panelreportingHub" },
    { id: "utilityHub", selector: "#panelutilityHub" },
    { id: "tools", selector: "#paneltools" },
    { id: "masterExportHub", selector: "#panelmasterExportHub" },
    { id: "sessionManager", selector: "#panelsessionManager" },
    { id: "mappings", selector: "#panelmappings" },
    { id: "advancedTools", selector: "#paneladvancedTools" },
    { id: "rotation", selector: "#panelrotation" },
    { id: "dropboxModal", selector: "#paneldropboxModal" }
  ];

  anchors.forEach(anchor => {
    const button = document.querySelector(`.orbital-btn[data-target="${anchor.id}"]`);
    const panel = document.querySelector(anchor.selector);

    if (!button) {
      console.warn(`⚠ Orbital Button not found for target: ${anchor.id}`);
      return;
    }

    if (!panel) {
      console.warn(`⚠ DOM Panel not found for target: ${anchor.id}`);
      return;
    }

    button.addEventListener("click", () => {
      document.querySelectorAll('.tabcontent, .panel').forEach(p => p.classList.remove("active"));
      panel.classList.add("active");
      panel.scrollIntoView({ behavior: "smooth" });
      console.log(`✅ Activated Orbital Panel: ${anchor.id}`);
    });
  });

  console.log("✅ Phase 41 — Orbital Anchor Wiring Bootstrap Complete.");
};

// 🔧 Inject into Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  NavigationCore.bootstrapOrbitalAnchors();
});

// === Phase 43: Orbital Router Activation Mesh ===
NavigationCore.activateOrbitalRouterMesh = function() {
  console.log("🧬 Phase 43 — Orbital Router Activation Mesh Engaged");

  const buttons = document.querySelectorAll('.orbital-btn');
  buttons.forEach(button => {
    const targetId = button.dataset.target;
    if (!targetId) {
      console.warn("⚠ Orbital Button missing data-target attribute.");
      return;
    }

    const panel = document.getElementById(`panel${targetId}`);
    if (!panel) {
      console.warn(`⚠ Panel not found for target: ${targetId}`);
      return;
    }

    // Remove any previous listeners for safety (collision protection)
    button.replaceWith(button.cloneNode(true));
    const freshButton = document.querySelector(`.orbital-btn[data-target="${targetId}"]`);

    freshButton.addEventListener("click", () => {
      document.querySelectorAll('.tabcontent, .panel').forEach(p => p.classList.remove("active"));
      panel.classList.add("active");
      panel.scrollIntoView({ behavior: "smooth" });
      console.log(`✅ Orbital Router activated: ${targetId}`);
    });
  });

  console.log("✅ Phase 43 — Orbital Router Mesh Fully Synchronized.");
};

document.addEventListener("DOMContentLoaded", () => {
  NavigationCore.activateOrbitalRouterMesh();
});