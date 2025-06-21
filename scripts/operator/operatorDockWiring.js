// === Sovereign Panel Override Lock: Prevents post-load forced repositioning if panels are already aligned ===
document.body.dataset.gridLock = "true";

// === Temporary Auto-Snap Disablement for Manual Panel Placement ===
window.disableAutoSnap = true;
document.querySelectorAll('.holo-console').forEach(panel => {
  panel.dataset.snap = "manual";
  panel.style.transition = "none";
});
// === Phase 31.0 — Sovereign Dock Resurrection Sweep ===
setTimeout(() => {
  console.log("🧬 Phase 31.0 — Sovereign Dock Resurrection Sweep Initiated");

  const allPanels = document.querySelectorAll(".dock-panel, .holo-console");
  // Utility to reveal nested elements for .holo-console panels
  const revealNestedElements = (root) => {
    if (!root) return;
    const nestedElements = root.querySelectorAll('*');
    nestedElements.forEach((el) => {
      el.style.display = 'block';
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.zIndex = '9999';
      el.style.position = 'relative';
      if (!el.style.minHeight) el.style.minHeight = '40px';
      if (!el.style.minWidth) el.style.minWidth = '100px';
      if (!el.textContent.trim()) {
        el.innerHTML = '<span style="color: magenta; font-style: italic;">🔍 Empty Element</span>';
      }
    });
  };

  allPanels.forEach(panel => {
    // === Panel Override Lock: Prevent forced repositioning if gridLock is active ===
    const panelOverrideLock = document.body.dataset.gridLock === "true";
    if (panelOverrideLock) {
      console.warn("🛑 Panel Override Lock Active — Skipping Forced Repositioning.");
      return;
    }
    panel.style.display = "block";
    panel.style.visibility = "visible";
    panel.style.opacity = "1";
    // === Additional force overrides ===
    panel.style.height = "auto";
    panel.style.position = "relative";
    panel.style.transform = "translateY(0)";
    // ===
    panel.style.zIndex = "1000";
    panel.classList.remove("hidden", "collapsed");

    const group = panel.closest(".dock-panel-group");
    if (group) {
      group.classList.remove("hidden", "collapsed");
      group.style.display = "flex";
      // === Additional group force overrides ===
      group.style.opacity = "1";
      group.style.height = "auto";
      // ===
    }

    const grid = panel.closest("#dockGrid");
    if (grid) {
      grid.classList.remove("hidden");
      grid.style.display = "grid";
      // === Additional grid force overrides ===
      grid.style.opacity = "1";
      grid.style.height = "auto";
      // ===
    }

    // If this is a .holo-console panel, reveal nested elements and log SoulLink
    if (panel.classList.contains("holo-console")) {
      revealNestedElements(panel);
      console.log(`🧠 SoulLink awakened for: #${panel.id}`);
    }

    console.log(`✅ Resurrected Panel: ${panel.id}`);
  });

  // 🧬 Phase 311.2 — Persistent Visibility Lock-In
  if (typeof SovereignPanels !== "undefined" && SovereignPanels) {
    Object.keys(SovereignPanels || {}).forEach(panelId => {
      const el = document.getElementById(panelId);
      if (el) {
        Object.assign(el.style, {
          display: "block",
          visibility: "visible",
          opacity: "1",
          position: "relative",
          zIndex: "9999",
          minWidth: "400px",
          minHeight: "300px",
          backgroundColor: "#111",
          color: "#0f0",
          border: "1px solid lime",
          margin: "10px",
          overflow: "auto"
        });
        console.log(`🔓 Persistent Visibility Lock-In applied to: #${panelId}`);
      }
    });
  }

  console.log("✅ Phase 31.0 — All known panels forcibly revealed.");
}, 1500);

// === Phase 310.9 — Panel Content Injector Audit ===
setTimeout(() => {
  console.log("🔍 Phase 310.9 — Panel Content Injector Audit Initiated");

  const dockPanels = document.querySelectorAll(".dock-panel, .holo-console");
  dockPanels.forEach(panel => {
    const hasContent = panel.innerHTML.trim().length > 0;
    if (!hasContent) {
      console.warn(`⚠️ Empty Panel Detected: #${panel.id}`);
      panel.innerHTML = `<h2>🧪 Placeholder for ${panel.id}</h2><p>No content detected. This panel may require population or rehydration.</p>`;
      panel.style.minHeight = "120px";
      panel.style.backgroundColor = "rgba(20,20,20,0.5)";
      panel.style.border = "1px dashed red";
      console.log(`🩹 Injected placeholder into: #${panel.id}`);
    } else {
      console.log(`✅ Panel #${panel.id} contains content.`);
    }
  });

  // 🌐 Phase 311.3 — Sovereign Panel Anchor Mapping Injection
  // SOVEREIGN_PANEL_REGISTRY should be defined, fallback to a set of known IDs if not present
  const SOVEREIGN_PANEL_REGISTRY = window.SOVEREIGN_PANEL_REGISTRY || {
    sageTerminal: true,
    oracleConsole: true,
    grimoireConsole: true,
    whispererConsole: true
  };
  const sovereignAnchors = {
    sageTerminal: { top: "20px", left: "20px" },
    oracleConsole: { top: "20px", right: "20px" },
    grimoireConsole: { bottom: "20px", left: "20px" },
    whispererConsole: { bottom: "20px", right: "20px" },
  };

  Object.keys(SOVEREIGN_PANEL_REGISTRY).forEach((panelId, index) => {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    panel.style.position = sovereignAnchors[panelId] ? "fixed" : "absolute";
    panel.style.display = "block";
    panel.style.opacity = "1";
    panel.style.visibility = "visible";
    panel.style.zIndex = 1000 + index;
    panel.style.width = panel.style.width || "400px";
    panel.style.height = panel.style.height || "300px";
    panel.style.backgroundColor = panel.style.backgroundColor || "#111";
    panel.style.color = panel.style.color || "#0f0";

    // Anchor positioning
    const anchor = sovereignAnchors[panelId];
    if (anchor) {
      if (anchor.top) panel.style.top = anchor.top;
      if (anchor.bottom) panel.style.bottom = anchor.bottom;
      if (anchor.left) panel.style.left = anchor.left;
      if (anchor.right) panel.style.right = anchor.right;
    } else {
      panel.style.top = `${(index * 50) % 500}px`;
      panel.style.left = `${(index * 60) % 700}px`;
    }

    console.log(`📌 Anchored Panel: #${panelId}`);
  });

  console.log("✅ Phase 310.9 — Panel content audit complete.");

  // 🧩 Dark Revealer Placeholder Injection
  document.querySelectorAll('.console-body').forEach(body => {
    if (!body.innerHTML.trim()) {
      const placeholder = document.createElement('div');
      placeholder.textContent = '🧩 Diagnostic placeholder active';
      placeholder.style.padding = '10px';
      placeholder.style.background = 'rgba(255,255,255,0.05)';
      placeholder.style.color = 'lime';
      placeholder.style.border = '1px solid lime';
      placeholder.style.marginTop = '5px';
      body.appendChild(placeholder);
    }
  });

  // === Phase 312.0 — Console Soul Imprint Audit Initiated ===
  console.log("🔎 Phase 312.0 — Console Soul Imprint Audit Initiated");

  const resurrectedPanels = document.querySelectorAll('.holo-console');
  resurrectedPanels.forEach(panel => {
    const id = panel.id || "(no id)";
    const inner = panel.innerHTML.trim();

    if (!inner || inner.length < 10) {
      console.warn(`👻 Hollow Panel Detected: #${id}`);
      panel.innerHTML = `
        <div class="console-header">🩻 [${id}] Console Placeholder</div>
        <div class="console-body">
          <p><em>This console has not yet been assigned content. Check for injection logic or template bind failure.</em></p>
        </div>
      `;
    } else {
      console.log(`✅ Panel #${id} contains ${inner.length} characters of content.`);
    }
  });

  // === Phase 313.5 — Soul Imprint Rebinding & Dynamic Payload Recovery ===
  console.log("🔧 Phase 313.5 — Initiating Soul Imprint Rebinding...");

  const consoleIdList = [
    "countConsole",
    "deltaAnalyzerConsole",
    "reportingHubConsole",
    "sessionManagerConsole",
    "utilityHubConsole",
    "whispererConsole",
    "sovereignTerminal"
  ];

  consoleIdList.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`❌ Panel '${id}' not found in DOM.`);
      return;
    }

    if (panel.innerHTML.trim().length === 0 || panel.innerHTML.includes("Placeholder")) {
      panel.innerHTML = `
        <div class="console-header">🔄 Rebinding: ${id}</div>
        <div class="console-body">
          <p><em>Reconstructed content injected. Awaiting full system sync...</em></p>
        </div>
      `;
      panel.classList.add("console-rebound");
      console.log(`🩺 Soul Imprint rebound for: ${id}`);
    } else {
      console.log(`✅ Panel ${id} already contains valid content.`);
    }
  });

  console.log("✅ Phase 313.5 — Soul Imprint Rebinding Complete");

  // === Phase 314.0 — Internal Logic Resurrection Protocol ===
  console.log("🧠 Phase 314.0 — Internal Logic Resurrection Protocol Initiated");

  const resurrectionRoutines = {
    countConsole: window.getCountDockContent,
    deltaAnalyzerConsole: window.getDeltaAnalyzerContent,
    reportingHubConsole: window.getReportingHubContent,
    sessionManagerConsole: window.getSessionManagerContent,
    utilityHubConsole: window.getUtilityHubContent,
    whispererConsole: window.renderWhispererMemory,
    sovereignTerminal: window.renderSageTerminal
  };

  Object.entries(resurrectionRoutines).forEach(([id, builder]) => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`❌ Resurrection skipped — Panel '${id}' not found.`);
      return;
    }

    if (panel.innerHTML.includes("Rebinding")) {
      if (typeof builder === "function") {
        const result = builder();
        if (typeof result === "string") {
          panel.innerHTML = result;
          console.log(`🔮 Dynamic content restored for '${id}'`);
        } else {
          console.warn(`⚠ Builder for '${id}' did not return string content.`);
        }
      } else {
        console.warn(`⚠ No valid builder function found for '${id}'`);
      }
    } else {
      console.log(`✅ '${id}' already has bound content.`);
    }
  });

  console.log("✅ Phase 314.0 — Internal Logic Resurrection Complete");

  // === Phase 315.0 — Signal Link Reintegration & Panel Behavior Hooks ===
  console.log("📡 Phase 315.0 — Signal Link Reintegration Initiated");

  const interactionMap = {
    countConsole: () => {
      SafeBind("countConsole", "click", () => {
        console.log("🧩 Count Console interaction triggered.");
      });
    },
    deltaAnalyzerConsole: () => {
      SafeBind("deltaAnalyzerConsole", "click", () => {
        console.log("📈 Delta Analyzer interaction triggered.");
      });
    },
    reportingHubConsole: () => {
      SafeBind("reportingHubConsole", "click", () => {
        console.log("📄 Reporting Hub interaction triggered.");
      });
    },
    sessionManagerConsole: () => {
      SafeBind("sessionManagerConsole", "click", () => {
        console.log("📂 Session Manager activated.");
      });
    },
    utilityHubConsole: () => {
      SafeBind("utilityHubConsole", "click", () => {
        console.log("🛠 Utility Hub interaction triggered.");
      });
    },
    whispererConsole: () => {
      SafeBind("whispererConsole", "click", () => {
        console.log("🔊 Whisperer Console activated.");
      });
    },
    sovereignTerminal: () => {
      SafeBind("sovereignTerminal", "click", () => {
        console.log("💻 Sovereign Terminal input focus engaged.");
      });
    }
  };

  Object.entries(interactionMap).forEach(([id, hookFn]) => {
    const panel = document.getElementById(id);
    if (panel && typeof hookFn === "function") {
      try {
        hookFn();
        console.log(`🔗 Behavior hook bound for ${id}`);
      } catch (err) {
        console.warn(`⚠️ Error binding behavior for ${id}:`, err);
      }
    } else {
      console.warn(`⚠️ No panel or hook found for ${id}`);
    }
  });

  console.log("✅ Phase 315.0 — Signal Link Reintegration Complete");

  // === Phase 316.0 — Core Signal Testing & Event Flow Diagnostics ===
  console.log("🧪 Phase 316.0 — Core Signal Testing & Event Flow Diagnostics Initiated");

  consoleIdList.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`❌ [Diagnostics] Panel '${id}' not found for signal test.`);
      return;
    }

    // Emit test ping event
    const pingEvent = new CustomEvent("sovereignPing", {
      detail: { panelId: id, timestamp: Date.now() }
    });

    panel.dispatchEvent(pingEvent);
    console.log(`📡 Ping event dispatched for '${id}'`);

    // Temporary listener for echo test
    const echoHandler = (e) => {
      console.log(`🔁 Echo received from '${id}':`, e.detail);
      panel.removeEventListener("sovereignPingEcho", echoHandler);
    };

    panel.addEventListener("sovereignPingEcho", echoHandler);

    // Timeout fallback
    setTimeout(() => {
      panel.removeEventListener("sovereignPingEcho", echoHandler);
      console.warn(`⏱ No echo response from '${id}' within timeout window.`);
    }, 1500);
  });

  console.log("✅ Phase 316.0 — Event Dispatch & Echo Diagnostics Complete");

  // === Phase 317.0 — Anomaly Link Rebinding & Latent Channel Awakening ===
  console.log("🧩 Phase 317.0 — Anomaly Link Rebinding Initiated");

  consoleIdList.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`❌ [Rebind] Panel '${id}' not found in DOM.`);
      return;
    }

    // Listen for ping to trigger echo
    panel.addEventListener("sovereignPing", (e) => {
      console.log(`🛰 Responding to ping on ${id}`);
      const echo = new CustomEvent("sovereignPingEcho", {
        detail: {
          receivedFrom: e.detail.panelId,
          echoTime: Date.now(),
          responseStatus: "💫 Rebound Acknowledged"
        }
      });
      panel.dispatchEvent(echo);
    });

    // Check for suppressed or non-responsive behavior
    if (!panel.classList.contains("console-rebound")) {
      panel.classList.add("console-rebound");
      panel.innerHTML += `<div class="console-diagnostic">💡 Latent channel awakened for '${id}'</div>`;
      console.log(`⚡ Latent behavior channel awakened for '${id}'`);
    }
  });

  console.log("✅ Phase 317.0 — Anomaly Link Rebinding Complete");

  // === Phase 318.0 — Sovereign Memory Sync & Historical Overlay Validation ===
  console.log("🧬 Phase 318.0 — Sovereign Memory Sync Initiated");

  const overlayKeyPrefix = "dockOverlay_";

  consoleIdList.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`❌ [Overlay] Panel '${id}' not found for memory sync.`);
      return;
    }

    const storedOverlay = localStorage.getItem(`${overlayKeyPrefix}${id}`);
    if (storedOverlay) {
      try {
        const parsed = JSON.parse(storedOverlay);
        if (parsed && parsed.content) {
          panel.innerHTML = parsed.content;
          panel.classList.add("console-memory-overlay");
          console.log(`🧠 Memory overlay applied to '${id}'`);
        }
      } catch (err) {
        console.warn(`⚠ Failed to parse overlay for '${id}':`, err);
      }
    } else {
      console.log(`📭 No memory overlay found for '${id}'`);
    }
  });

  console.log("✅ Phase 318.0 — Memory Sync & Overlay Validation Complete");

  // === Phase 319.0 — Legacy Restoration Engine & Temporal Backfill Protocols ===
  console.log("⏳ Phase 319.0 — Legacy Restoration Engine Initiated");

  consoleIdList.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`❌ Legacy restoration skipped — Panel '${id}' not found.`);
      return;
    }

    const legacyContentKey = `legacyBackup_${id}`;
    const legacyContent = localStorage.getItem(legacyContentKey);

    if (legacyContent && !panel.classList.contains("console-memory-overlay")) {
      try {
        const content = JSON.parse(legacyContent);
        if (content && typeof content.html === "string") {
          panel.innerHTML = content.html;
          panel.classList.add("console-legacy-restore");
          console.log(`🕰 Legacy content restored to '${id}'`);
        }
      } catch (err) {
        console.warn(`⚠ Failed to parse legacy content for '${id}':`, err);
      }
    } else {
      console.log(`📭 No legacy content found or overlay already active for '${id}'`);
    }
  });

  console.log("✅ Phase 319.0 — Legacy Restoration Complete");

  // === Phase 320.0 — Sovereign Uplink Test & Panel State Commit ===
  console.log("📶 Phase 320.0 — Sovereign Uplink Test Initiated");

  const panelSnapshot = {
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    panels: {}
  };

  consoleIdList.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`❌ Uplink skipped — Panel '${id}' not found.`);
      return;
    }

    panelSnapshot.panels[id] = {
      visible: panel.style.display !== "none" && panel.style.visibility !== "hidden",
      zIndex: panel.style.zIndex,
      contentLength: panel.innerHTML.trim().length,
      position: {
        top: panel.style.top || null,
        left: panel.style.left || null
      },
      classes: [...panel.classList]
    };

    console.log(`📡 Panel '${id}' snapshot captured.`);
  });

  localStorage.setItem("sovereignUplinkSnapshot", JSON.stringify(panelSnapshot));
  console.log("✅ Phase 320.0 — Panel State Committed to Uplink Memory");

  // === Phase 321.0 — Operator Recall Sync & Event Horizon Tagging ===
  console.log("🧠 Phase 321.0 — Operator Recall Sync Initiated");

  const operatorRecallKey = "operatorRecallState";
  const recallState = {
    syncTime: new Date().toISOString(),
    systemTag: "SAGECRAFT_OP_RECALL",
    panelCount: consoleIdList.length,
    recallPoints: {}
  };

  consoleIdList.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`⚠ Recall tag skipped — Panel '${id}' not found.`);
      return;
    }

    recallState.recallPoints[id] = {
      lastSeen: Date.now(),
      classSignature: [...panel.classList],
      anchorPosition: {
        top: panel.style.top || null,
        left: panel.style.left || null
      },
      overlayState: panel.classList.contains("console-memory-overlay"),
      legacyState: panel.classList.contains("console-legacy-restore"),
      rebound: panel.classList.contains("console-rebound")
    };

    console.log(`📍 Recall point tagged for '${id}'`);
  });

  localStorage.setItem(operatorRecallKey, JSON.stringify(recallState));
  console.log("✅ Phase 321.0 — Operator Recall Sync Complete");

  // === Phase 322.0 — Sovereign Resurrection Seal & Ritual Completion Stamp ===
  console.log("🔮 Phase 322.0 — Sovereign Resurrection Seal Initiated");

  const ritualSeal = {
    timestamp: new Date().toISOString(),
    manifest: "SAGECRAFT_ASCENDANT_CORE",
    sessionId: `ASCEND-${Math.floor(Math.random() * 1e6)}`,
    verifiedPanels: consoleIdList.length,
    integrityToken: btoa(consoleIdList.join(":") + "::RESURRECTED")
  };

  localStorage.setItem("sovereignRitualSeal", JSON.stringify(ritualSeal));

  console.log("✅ Phase 322.0 — Resurrection Ritual Complete & Seal Stored", ritualSeal);

  // === Phase 323.0 — Ghost Panel Differentiation & Shell Tagging ===
  console.log("👻 Phase 323.0 — Ghost Panel Differentiation Initiated");

  const knownPanelIds = new Set([
    ...consoleIdList,
    ...Object.keys(SOVEREIGN_PANEL_REGISTRY || {})
  ]);

  const allDockPanels = document.querySelectorAll(".dock-panel, .holo-console");

  allDockPanels.forEach(panel => {
    const id = panel.id;
    if (!id || !knownPanelIds.has(id)) {
      panel.classList.add("console-ghost-shell");
      panel.setAttribute("data-status", "ghost");
      panel.style.outline = "2px dashed magenta";
      panel.style.backgroundColor = "rgba(255,0,255,0.05)";
      panel.innerHTML += `<div class="ghost-tag">👻 Ghost Shell Detected: '${id || "no-id"}'</div>`;
      console.warn(`👻 Ghost shell identified: '${id || "no-id"}'`);
    } else {
      console.log(`✅ Verified mesh-linked panel: '${id}'`);
    }
  });

  console.log("✅ Phase 323.0 — Ghost Panel Differentiation Complete");

  // === Phase 324.5 — Ghost Panel Reclassification Protocol ===
  console.log("🔍 Phase 324.5 — Reclassifying Ghost Panels with Content");

  const ghostPanels = document.querySelectorAll(".console-ghost-shell");

  ghostPanels.forEach(panel => {
    const htmlLength = panel.innerHTML.trim().length;
    if (htmlLength > 0) {
      panel.classList.remove("console-ghost-shell");
      panel.classList.add("console-unbound-active");
      panel.setAttribute("data-status", "unbound-active");
      panel.style.outline = "2px dashed orange";
      panel.innerHTML += `<div class="ghost-tag">🟠 Reclassified as Unbound Active</div>`;
      console.log(`🟠 '${panel.id || "no-id"}' reclassified as unbound-active (content length: ${htmlLength})`);
    } else {
      console.log(`👻 '${panel.id || "no-id"}' remains ghost-shell (empty)`);
    }
  });

  console.log("✅ Phase 324.5 — Ghost Reclassification Complete");

  // === Phase 325.0 — Controlled Ghost Purge Protocol ===
  console.log("🧹 Phase 325.0 — Controlled Ghost Purge Initiated");

  const ghostShells = document.querySelectorAll(".console-ghost-shell");
  const purgeLog = [];

  ghostShells.forEach(panel => {
    const id = panel.id || "(no-id)";
    purgeLog.push(id);
    panel.remove();
    console.warn(`💀 Purged ghost panel: '${id}'`);
  });

  console.log(`✅ Phase 325.0 — Purged ${purgeLog.length} ghost panels`);
  if (purgeLog.length) {
    console.log("🗂 Purge Summary:", purgeLog);
  }

  // === Phase 326.0 — Echo Traceback & Phantom Reinstatement Audit ===
  console.log("🧪 Phase 326.0 — Echo Traceback Audit Initiated");

  const activePanelIds = new Set();
  document.querySelectorAll(".dock-panel, .holo-console").forEach(panel => {
    if (panel.id) activePanelIds.add(panel.id);
  });

  const duplicateMap = {};
  document.querySelectorAll("[id]").forEach(el => {
    const id = el.id;
    if (!duplicateMap[id]) duplicateMap[id] = [];
    duplicateMap[id].push(el);
  });

  const duplicates = Object.entries(duplicateMap).filter(([_, els]) => els.length > 1);
  if (duplicates.length > 0) {
    console.warn("⚠️ Duplicate IDs detected:", duplicates.map(([id]) => id));
  }

  const lastPurgeLog = JSON.parse(localStorage.getItem("lastGhostPurgeLog") || "[]");
  const resurrected = lastPurgeLog.filter(id => activePanelIds.has(id));

  if (resurrected.length > 0) {
    console.warn("👻 Phantom panels detected after purge:", resurrected);
  }

  console.log("✅ Phase 326.0 — Echo Traceback Audit Complete");

  // === Phase 326.5 — Phantom Exorcism Protocol ===
  console.log("🧯 Phase 326.5 — Phantom Exorcism Protocol Initiated");

  const purgeList = JSON.parse(localStorage.getItem("lastGhostPurgeLog") || "[]");
  let purgedCount = 0;

  purgeList.forEach(id => {
    const elems = document.querySelectorAll(`#${id}`);
    if (elems.length > 0) {
      elems.forEach(el => {
        el.remove();
        purgedCount++;
        console.warn(`💀 Exorcised phantom: '${id}'`);
      });
    }
  });

  console.log(`✅ Phase 326.5 — Phantom Exorcism Complete (${purgedCount} elements removed)`);

  // === Phase 327.0 — Sovereign ID Conflict Resolution ===
  console.log("🛠 Phase 327.0 — Sovereign ID Conflict Resolution Initiated");

  const idTracker = {};
  const allElementsWithId = document.querySelectorAll("[id]");
  let conflictCount = 0;

  allElementsWithId.forEach(el => {
    const id = el.id;
    if (!idTracker[id]) {
      idTracker[id] = [el];
    } else {
      idTracker[id].push(el);
      const duplicateIndex = idTracker[id].length;
      const newId = `${id}-duplicate-${duplicateIndex}`;
      el.setAttribute("id", newId);
      el.classList.add("duplicate-id-resolved");
      el.style.outline = "2px dotted red";
      el.setAttribute("data-duplicate-from", id);
      console.warn(`🪓 ID conflict resolved: '${id}' ➡ '${newId}'`);
      conflictCount++;
    }
  });

  console.log(`✅ Phase 327.0 — ID Conflict Resolution Complete (${conflictCount} resolved)`);

  // === Phase 328.0 — Duplicate Manifest Generation Protocol ===
  console.log("📜 Phase 328.0 — Duplicate Manifest Generation Initiated");

  const duplicateManifest = [];

  document.querySelectorAll(".duplicate-id-resolved").forEach(el => {
    const originalId = el.getAttribute("data-duplicate-from") || "(unknown)";
    duplicateManifest.push({
      originalId: originalId,
      newId: el.id,
      tag: el.tagName,
      parent: el.parentElement?.id || "(no parent id)",
      contentLength: el.innerHTML.trim().length
    });
  });

  console.table(duplicateManifest);
  localStorage.setItem("duplicateManifest", JSON.stringify(duplicateManifest, null, 2));

  console.log(`✅ Phase 328.0 — Duplicate Manifest Generated (${duplicateManifest.length} entries)`);

  // === Phase 329.0 — Sovereign Cleanse & Sanctum Rehoming Protocol ===
  console.log("🧹 Phase 329.0 — Sovereign Cleanse & Sanctum Rehoming Initiated");

  // Create the Sanctum container if it doesn't exist
  let sanctum = document.getElementById("sovereignSanctum");
  if (!sanctum) {
    sanctum = document.createElement("div");
    sanctum.id = "sovereignSanctum";
    sanctum.style.border = "2px dashed #a0f";
    sanctum.style.padding = "12px";
    sanctum.style.margin = "20px";
    sanctum.style.background = "#110022";
    sanctum.style.color = "#fff";
    sanctum.innerHTML = "<h3>🧬 Sovereign Sanctum</h3><p>Reclaimed panels reside here for rebind.</p>";
    document.body.appendChild(sanctum);
  }

  const manifest = JSON.parse(localStorage.getItem("duplicateManifest") || "[]");
  let purged = 0;
  let rehomed = 0;
  const keptIds = new Set();

  manifest.forEach(entry => {
    const el = document.getElementById(entry.newId);
    if (!el) return;

    const preserveConditions =
      entry.parent.includes("consolePanelGroup") ||
      entry.parent.includes("grimoireConsole") ||
      entry.parent.includes("whispererConsole") ||
      entry.contentLength > 2000;

    if (preserveConditions) {
      // Rehome into Sanctum if not already appended
      sanctum.appendChild(el);
      el.classList.add("sanctified-panel");
      el.style.border = "1px solid #a0f";
      el.setAttribute("data-rebound", "true");
      rehomed++;
      keptIds.add(entry.newId);
    } else {
      el.remove();
      purged++;
    }
  });

  console.log(`✅ Phase 329.0 — Sovereign Cleanse Complete (${purged} purged, ${rehomed} rehomed to sovereignSanctum)`);

  // === Phase 330.0 — Sanctum Rebind Pass ===
  console.log("🔗 Phase 330.0 — Sanctum Rebind Pass Initiated");

  const sanctifiedPanels = document.querySelectorAll('#sovereignSanctum [data-rebound="true"]');
  let reboundCount = 0;
  let failedBindings = [];

  sanctifiedPanels.forEach(panel => {
    const originalId = panel.getAttribute("data-duplicate-from");
    if (!originalId) {
      failedBindings.push({ id: panel.id, reason: "No originalId reference" });
      return;
    }

    // Attempt to rebind known mesh behaviors
    try {
      switch (originalId) {
        case "oracleConsole":
          // Re-attach oracle listeners
          panel.querySelector("input")?.addEventListener("keydown", e => {
            if (e.key === "Enter") console.log("🔮 Oracle query:", e.target.value);
          });
          break;

        case "sageFeedConsole":
          // Rebind Sage feed submit logic
          panel.querySelector("button")?.addEventListener("click", () => {
            const input = panel.querySelector("textarea");
            const log = panel.querySelector('[id*="feedLog"]');
            if (input && log) {
              const msg = input.value.trim();
              const p = document.createElement("p");
              p.textContent = "🌀 " + msg;
              log.appendChild(p);
              input.value = "";
            }
          });
          break;

        case "countConsole":
          // Placeholder behavior for inventory count display
          panel.querySelectorAll("div, span, section").forEach(el => {
            el.style.outline = "1px dashed #6f6";
          });
          break;

        // Add additional rebind cases as needed...

        default:
          failedBindings.push({ id: panel.id, reason: "No binding rule for " + originalId });
          return;
      }

      panel.setAttribute("data-rebound-status", "active");
      panel.style.boxShadow = "0 0 12px #6f6";
      reboundCount++;
    } catch (err) {
      failedBindings.push({ id: panel.id, reason: err.message });
    }
  });

  console.log(`✅ Phase 330.0 — Sanctum Rebind Complete (${reboundCount} rebound)`);
  if (failedBindings.length > 0) {
    console.warn("⚠️ Rebind Failures:", failedBindings);
  }

  // === Phase 331.0 — Final Sanctification Sweep & Ghost Collapse ===
  console.log("🧹 Phase 331.0 — Final Sanctification Sweep Initiated");

  const allDuplicates = document.querySelectorAll('[id*="-duplicate-"]');
  let ghostsCollapsed = 0;
  let shadowVault = [];

  allDuplicates.forEach(el => {
    const isSanctified = el.closest("#sovereignSanctum");
    const isAlive = el.getAttribute("data-rebound-status") === "active";
    const isVisible = el.offsetParent !== null;
    const isEmpty = el.innerHTML.trim().length === 0;

    if (!isSanctified && !isAlive && (isEmpty || !isVisible)) {
      shadowVault.push({
        id: el.id,
        tag: el.tagName,
        reason: isEmpty ? "Empty Shell" : "Hidden Shadow"
      });
      el.remove();
      ghostsCollapsed++;
    }
  });

  console.log(`✅ Phase 331.0 — Ghost Collapse Complete (${ghostsCollapsed} removed)`);
  if (shadowVault.length > 0) {
    localStorage.setItem("shadowVault", JSON.stringify(shadowVault, null, 2));
    console.warn("🪦 Shadow Vault archived to localStorage:", shadowVault);
  }

  // === Phase 332.0 — Lore Engine Bootstrap & Whisperer Echo Relay ===
  console.log("📜 Phase 332.0 — Lore Engine Bootstrap & Whisperer Echo Relay Initiated");

  function whisperToConsole(msg) {
    const echoTargets = [
      document.querySelector("#whispererConsoleOutput"),
      document.querySelector('[id*="whispererConsoleOutput"][data-rebound-status="active"]'),
      document.querySelector("#grimoirePanelContent"),
      document.querySelector('[id*="grimoirePanelContent"][data-rebound-status="active"]')
    ].filter(Boolean);

    echoTargets.forEach(target => {
      const entry = document.createElement("p");
      entry.textContent = `🗝️ ${msg}`;
      entry.className = "echo-whisper";
      target.appendChild(entry);
    });

    console.log("🪶 Whisper Echo:", msg);
  }

  // Optional test whisper
  setTimeout(() => {
    whisperToConsole("The soul remembers even when the interface forgets...");
  }, 800);

  // Hook Sage Feed and Oracle to echo system
  const sageFeedInput = document.querySelector('[id*="sageFeedInput"][data-rebound-status="active"]');
  const oracleInput = document.querySelector('[id*="oracleInput"][data-rebound-status="active"]');

  if (sageFeedInput) {
    sageFeedInput.addEventListener("keydown", e => {
      if (e.key === "Enter") whisperToConsole("🌀 " + e.target.value);
    });
  }

  if (oracleInput) {
    oracleInput.addEventListener("keydown", e => {
      if (e.key === "Enter") whisperToConsole("🔮 Oracle responds: " + e.target.value);
    });
  }

  console.log("✅ Phase 332.0 — Lore & Whisperer Echo Relay Active");

  // === Phase 333.0 — Echo Channel Relay & Diagnostic Broadcast Sync ===
  console.log("📣 Phase 333.0 — Echo Channel Relay & Diagnostic Broadcast Sync Initiated");

  const echoTargets = [
    "#forecastConsole",
    "#sageFeedConsole",
    "#grimoireConsole",
    "#loreEngineConsole"
  ];

  echoTargets.forEach(selector => {
    const el = document.querySelector(`[id*="${selector.replace('#','')}"][data-rebound-status="active"]`) || document.querySelector(selector);
    if (el) {
      el.addEventListener("sovereignBroadcast", e => {
        const echoMsg = e.detail?.message || "📡 Unknown broadcast message";
        const p = document.createElement("p");
        p.textContent = echoMsg;
        p.className = "broadcast-echo";
        el.appendChild(p);
        console.log(`📣 EchoChannel: '${selector}' received broadcast ->`, echoMsg);
      });
    }
  });

  // 🔁 Global broadcast trigger
  window.sovereignBroadcast = function(msg) {
    const event = new CustomEvent("sovereignBroadcast", { detail: { message: `📡 ${msg}` } });
    echoTargets.forEach(selector => {
      const el = document.querySelector(`[id*="${selector.replace('#','')}"][data-rebound-status="active"]`) || document.querySelector(selector);
      if (el) el.dispatchEvent(event);
    });
    console.log("📡 Sovereign broadcast dispatched:", msg);
  };

  // Optional test ping
  setTimeout(() => {
    sovereignBroadcast("Phase 333.0 broadcast test: channels online.");
  }, 600);

  console.log("✅ Phase 333.0 — Echo Channel Relay Operational");

  // === Phase 334.0 — UI Hygiene & Signal Purge ===
  console.log("🧹 Phase 334.0 — UI Hygiene & Signal Purge Initiated");

  (function cleanDuplicatePanels() {
    const allPanels = document.querySelectorAll("[id*='-duplicate-']");
    let removedCount = 0;

    allPanels.forEach(panel => {
      const originalId = panel.id.split("-duplicate-")[0];
      const keep = document.getElementById(originalId);

      if (!keep) {
        // Reassign if no original exists
        panel.id = originalId;
        panel.setAttribute("data-rebound-status", "cleaned");
      } else {
        panel.remove();
        removedCount++;
      }
    });

    console.log(`🧼 Phase 334.0 — Removed ${removedCount} duplicate/ghost panels`);
  })();

  (function rehomeOrphans() {
    const approvedParents = [
      "consolePanelGroup", "sanctum", "predictiveHud"
    ];

    const floating = Array.from(document.querySelectorAll("section, div")).filter(el => {
      const pid = el.parentElement?.id || "";
      return (
        el.id && !el.closest(approvedParents.map(id => `#${id}`).join(", "))
      );
    });

    floating.forEach(el => {
      document.querySelector("#consolePanelGroup")?.appendChild(el);
      el.setAttribute("data-rebound-status", "reparented");
    });

    console.log(`🏠 Phase 334.0 — Reparented ${floating.length} orphan panels`);
  })();

  (function trimLoreEchoes() {
    const selectors = [".echo-whisper", ".broadcast-echo"];
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(panel => {
        const parent = panel.parentElement;
        const entries = parent?.querySelectorAll(selector);
        if (entries && entries.length > 25) {
          [...entries].slice(0, entries.length - 25).forEach(e => e.remove());
        }
      });
    });

    console.log("✂️ Phase 334.0 — Trimmed excessive lore/broadcast echoes");
  })();

  console.log("✅ Phase 334.0 — Mesh Clean, Ready for Neural Sync");

  // === Phase 334.3 — Sovereign Containment Audit & Panel Rehoming ===
  console.log("📦 Phase 334.3 — Sovereign Containment Audit Initiated");

  const dockGrid = document.getElementById("dockGrid");
  const operatorDockGrid = document.getElementById("operatorDockGrid");

  const allPanelsToCheck = document.querySelectorAll(".dock-panel, .holo-console");
  allPanelsToCheck.forEach(panel => {
    const isContained =
      panel.closest(".dock-panel-group") ||
      panel.closest("#dockGrid") ||
      panel.closest("#operatorDockGrid");

    if (!isContained) {
      const wrapper = document.createElement("div");
      wrapper.className = "dock-panel-group";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.margin = "10px";
      wrapper.appendChild(panel);

      if (dockGrid) {
        dockGrid.appendChild(wrapper);
        console.log(`📎 Rehomed uncontained panel: '${panel.id}' ➜ #dockGrid`);
      } else if (operatorDockGrid) {
        operatorDockGrid.appendChild(wrapper);
        console.log(`📎 Rehomed uncontained panel: '${panel.id}' ➜ #operatorDockGrid`);
      } else {
        document.body.appendChild(wrapper);
        console.warn(`⚠️ Fallback: Rehomed '${panel.id}' directly to body (no grid container found).`);
      }
    }
  });

  console.log("✅ Phase 334.3 — Containment Audit Complete");

  // === Phase 334.5 — UI Stabilization & Resynchronization Layer ===
  console.log("🧘 Phase 334.5 — UI Stabilization & Resynchronization Layer Initiated");

  // Trigger repaint and reflow
  document.querySelectorAll(".dock-panel, .holo-console").forEach(panel => {
    panel.style.transition = "opacity 0.2s ease-in-out";
    panel.style.opacity = "0.99"; // Trigger reflow
    setTimeout(() => {
      panel.style.opacity = "1";
    }, 50);
  });

  // Force resize recalculation
  window.dispatchEvent(new Event('resize'));
  console.log("📐 Resize event dispatched for layout recalibration");

  // Reset z-index tiers for all panels to stack logically
  const allPanelsForZ = [...document.querySelectorAll(".dock-panel, .holo-console")];
  allPanelsForZ.sort((a, b) => (a.id || "").localeCompare(b.id || ""));
  allPanelsForZ.forEach((panel, index) => {
    panel.style.zIndex = `${100 + index}`;
  });
  console.log("🧱 Sovereign Z-index layers recalibrated");

  // Scroll anchoring (optional refinement)
  document.querySelectorAll(".dock-panel-group").forEach(group => {
    group.style.scrollSnapAlign = "start";
    group.style.scrollMarginTop = "10px";
  });
  console.log("🧲 Scroll snapping enforced on dock groups");

  // Lock body scroll if any modals or overlays are active
  const modal = document.querySelector(".sovereign-modal, .access-overlay");
  if (modal) {
    document.body.style.overflow = "hidden";
    console.log("🔒 Body scroll locked due to active modal");
  } else {
    document.body.style.overflow = "";
    console.log("🔓 Body scroll unlocked");
  }

  console.log("✅ Phase 334.5 — UI Stabilization & Resynchronization Complete");

  console.log("🧿 Phase 312.0 — Soul Imprint Audit Complete");

  // 🛠️ Phase 311.4 — Sovereign Panel Interaction Layer Activation
  const allPanels = document.querySelectorAll(".holo-console");
  allPanels.forEach(panel => {
    // Make draggable
    panel.style.position = "absolute";
    panel.style.cursor = "move";
    panel.onmousedown = function (e) {
      e.preventDefault();
      const shiftX = e.clientX - panel.getBoundingClientRect().left;
      const shiftY = e.clientY - panel.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        panel.style.left = pageX - shiftX + 'px';
        panel.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
      };
    };
    panel.ondragstart = function () {
      return false;
    };

    // Focus behavior
    panel.addEventListener("mousedown", () => {
      allPanels.forEach(p => p.style.zIndex = "10");
      panel.style.zIndex = "1000";
    });

    // Ensure interaction possible
    panel.style.pointerEvents = "auto";
    panel.style.userSelect = "text";
  });
  console.log("✅ Phase 311.4 — Sovereign Panel Interaction Layer Activated");
}, 2200);
// === Sovereign Dock Panel Map for Alias Resolution ===

// === Utility: SafeBind for Robust Event Listener Attachment ===

// === Reveal Dock Panel Utility ===
function revealDockPanel(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return console.warn(`⛔ Panel ${panelId} not found.`);

  const dockGrid = document.getElementById("dockGrid");
  dockGrid?.classList.remove("hidden");

  panel.classList.remove("hidden");
  panel.style.display = "block";
  panel.style.opacity = "1";
  panel.style.visibility = "visible";
  panel.style.transform = "translateY(0)";
  panel.style.zIndex = "450";

  const panelGroup = panel.closest(".dock-panel-group");
  if (panelGroup) {
    panelGroup.classList.remove("collapsed");
    panelGroup.classList.remove("hidden");
  }
}
function SafeBind(selector, event, handler) {
  const el = document.getElementById(selector);
  if (el) {
    el.addEventListener(event, handler);
    console.log(`✅ Bound ${event} to #${selector}`);
  } else {
    console.warn(`⚠️ SafeBind failed — element #${selector} not found.`);
  }
}
// Example usage for SafeBind, replacing direct addEventListener calls:
// SafeBind("scanTime", "click", handleScanTime);
// SafeBind("driftSpan", "click", handleDriftSpan);
// SafeBind("spikeSpan", "click", handleSpikeSpan);
// SafeBind("logList", "click", handleLogList);
// SafeBind("sessionManagerBtn", "click", openSessionManager);
// SafeBind("someOtherBtn", "click", handleOtherAction);
const SovereignDockPanelMap = {
  count: "#countConsole",
  deltaAnalyzer: "#deltaAnalyzerConsole",
  reportingHub: "#reportingHubConsole",
  sessionManager: "#sessionManagerConsole",
  utilityHub: "#utilityHubConsole",
  oracle: "#oracleConsole",
  whisperer: "#whispererConsole"
};

// Dock wiring object for future dynamic dock control
var OperatorDockWiring = {
    // === Phase 1000.0: Sovereign Dock Population Matrix Injection ===
    populateDockMatrix: function () {
        // 🔒 Phase 500.36 — Dock Grid DOM Safety Check
        const dockGridContainer = document.getElementById("sovereignDockGrid");
        if (!dockGridContainer) {
          console.warn("⚠️ Dock Grid container not found. Deferring matrix injection...");
          // Optional: Retry injection later or trigger fallback
          return;
        }
        console.log("🚀 Sovereign Dock Population Matrix Injection Activated");

        const dockDefinitions = [
            { id: "count", label: "📊 Live Counts", description: "Live inventory counting subsystem online." },
            { id: "deltaAnalyzer", label: "Δ Delta Analyzer", description: "Delta analytics subsystem loaded." },
            { id: "exceptionManager", label: "⚠ Exception Manager", description: "Monitoring anomaly exceptions." },
            { id: "progressDashboard", label: "🚦 Progress Dashboard", description: "System progress indicators operational." },
            { id: "reportingHub", label: "📄 Reporting Hub", description: "Report generation subsystem ready." },
            { id: "masterExportHub", label: "📤 Master Export Hub", description: "Bulk export interfaces deployed." },
            { id: "utilityHub", label: "🛠 Utility Hub", description: "Utility tools accessible here." },
            { id: "sessionManager", label: "📂 Session Manager", description: "Session archival and recovery available." },
            { id: "mappings", label: "🗺 Mappings Interface", description: "Mapping configuration subsystem loaded." },
            { id: "tools", label: "🔧 Tools Panel", description: "Developer and diagnostic tools online." },
            { id: "audit", label: "📋 Audit Manager", description: "System audit controls engaged." },
            { id: "configPanel", label: "⚙ Configuration Panel", description: "Codex configuration settings loaded." }
        ];

        const dockGrid = document.getElementById("operatorDockGrid");
        if (!dockGrid) {
            console.warn("❌ Dock Grid container not found.");
            return;
        }

    dockDefinitions.forEach(def => {
        let panel = document.getElementById(def.id);
        if (!panel) {
            panel = document.createElement("div");
            panel.id = def.id;
            panel.classList.add("tab-section", "dock-panel");
            dockGrid.appendChild(panel);
            console.log(`✅ Sovereign Dock Panel Created: ${def.id}`);
            // --- Force visibility override after panel appended ---
            const dockPanel = document.getElementById(def.id);
            if (dockPanel) {
                dockPanel.style.display = "block";
                dockPanel.style.visibility = "visible";
                dockPanel.style.opacity = "1";
                dockPanel.style.zIndex = "1"; // Ensure it's above hidden overlays
                dockPanel.classList.remove("hidden", "collapsed");
                console.log(`✅ Visibility override applied to: ${def.id}`);
                // === Inserted: Reliable panel footprint and visual styling ===
                dockPanel.style.minHeight = "240px";
                dockPanel.style.minWidth = "400px";
                dockPanel.style.margin = "12px";
                dockPanel.style.padding = "8px";
                dockPanel.style.backgroundColor = "#111";
                dockPanel.style.border = "2px solid lime";
                dockPanel.style.boxShadow = "0 0 12px lime";
                dockPanel.style.overflowY = "auto";
                dockPanel.style.flex = "0 0 auto";
                dockPanel.style.zIndex = "1000";
                dockPanel.style.position = "relative";
                // If this is a .holo-console, reveal nested and log SoulLink
                if (dockPanel.classList.contains("holo-console")) {
                  revealNestedElements(dockPanel);
                  console.log(`🧠 SoulLink awakened for: #${dockPanel.id}`);
                }
            } else {
                console.warn(`⚠️ Dock panel not found for visibility injection: ${def.id}`);
            }
        } else {
            // Panel exists, ensure styling is applied after forcing display
            panel.style.display = "block";
            // === Inserted: Reliable panel footprint and visual styling ===
            panel.style.minHeight = "240px";
            panel.style.minWidth = "400px";
            panel.style.margin = "12px";
            panel.style.padding = "8px";
            panel.style.backgroundColor = "#111";
            panel.style.border = "2px solid lime";
            panel.style.boxShadow = "0 0 12px lime";
            panel.style.overflowY = "auto";
            panel.style.flex = "0 0 auto";
            panel.style.zIndex = "1000";
            panel.style.position = "relative";
            // If this is a .holo-console, reveal nested and log SoulLink
            if (panel.classList.contains("holo-console")) {
              revealNestedElements(panel);
              console.log(`🧠 SoulLink awakened for: #${panel.id}`);
            }
        }
        panel.innerHTML = `<h2>${def.label}</h2><p>${def.description}</p>`;
    });

        console.log("✅ Sovereign Dock Population Matrix Injection Complete.");
    },
    dockSchemaVersion: 1,
    eventHooks: {},
    injectDiagnosticLabels: function () {
        console.log("🔮 Injecting diagnostic labels into dock panels...");

        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            if (!panel.innerHTML.trim()) {
                panel.innerHTML = `
                    <h2 style="color: magenta; font-weight: bold;">📛 ${panel.id}</h2>
                    <p>This panel is active but has no content injected.</p>
                `;
            }
        });

        console.log("✅ Diagnostic labels injected into empty dock panels.");
    },
// (rest of object unchanged)

    on: function(eventName, callback) {
        if (!this.eventHooks[eventName]) {
            this.eventHooks[eventName] = [];
        }
        this.eventHooks[eventName].push(callback);
        console.log(`🔔 Event hook registered for '${eventName}'`);
    },

    triggerEvent: function(eventName, payload) {
        if (!this.eventHooks[eventName]) return;
        this.eventHooks[eventName].forEach(callback => {
            try {
                callback(payload);
            } catch (err) {
                console.error(`❌ Error in event hook for '${eventName}':`, err);
            }
        });
        this.broadcastLiveState(eventName, payload);
    },

    initializeDockPanels: function() {
        console.log("🔧 Initializing dock panels...");
        // Example wiring logic (stub for now — future expansion ready)
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            panel.addEventListener("click", () => {
                console.log(`Dock panel ${panel.id} activated.`);
            });
        });
    },

    restoreDockState: function() {
        console.log("🔄 Restoring dock state...");
        const stateJSON = localStorage.getItem("dockState");
        if (!stateJSON) {
            console.warn("⚠ No saved dock state found.");
            return;
        }
        const state = JSON.parse(stateJSON);
        if (!state.version) {
            console.warn("⚠ Legacy dock state detected — initiating migration.");
            const migratedState = this.migrateLegacyDockState(state);
            localStorage.setItem("dockState", JSON.stringify(migratedState));
            state.version = migratedState.version;
            state.panels = migratedState.panels;
        }
        if (!state.version || state.version > this.dockSchemaVersion) {
            console.warn("⚠ Incompatible or newer dock state version detected.");
            return;
        }
        if (!this.validateDockState(state)) {
            console.warn("❌ Invalid dock state detected. Aborting restore.");
            return;
        }
        const panels = state.panels || {};
        Object.keys(panels).forEach(id => {
            const selector = SovereignDockPanelMap[id] || `#${id}`;
            const panel = document.querySelector(selector);
            if (!panel) return;
            const dockInfo = panels[id];

        // Panel Override Lock: skip visibility/position update if gridLock is active
        const panelOverrideLock = document.body.dataset.gridLock === "true";
        if (panelOverrideLock) {
            console.warn(`🛑 Panel Override Lock Active — Skipping Forced Repositioning for: ${id}`);
            return;
        }
        // Optionally log subsystem trying to mutate layout
        console.warn(`⚠️ Layout mutation attempted by: ${id}`);
        // Apply visibility
        if (dockInfo.visible) {
            panel.classList.remove("hidden");
        } else {
            panel.classList.add("hidden");
        }

        // Apply position
        if (dockInfo.position) {
            if (dockInfo.position.top) panel.style.top = dockInfo.position.top;
            if (dockInfo.position.left) panel.style.left = dockInfo.position.left;
        }
        });
        console.log("✅ Dock state restored.");
        this.triggerEvent("restore", state);
    },

    registerDynamicDock: function(dockId, onClickHandler) {
        console.log(`🚀 Dynamically registering dock panel: ${dockId}`);
        const panel = document.getElementById(dockId);
        if (!panel) {
            console.warn(`❌ Dock panel '${dockId}' not found.`);
            return;
        }

        // Attach provided click handler or default
        const handler = onClickHandler || (() => {
            console.log(`Dock panel ${dockId} activated.`);
        });

        panel.addEventListener("click", handler);
        console.log(`✅ Dock panel '${dockId}' successfully wired.`);

        // Optionally ensure dock panel state saved immediately after registration
        this.saveDockState();
    },

    enableAutoSync: function() {
        console.log("🔄 Enabling Auto-Sync Dock Persistence...");

        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            // Observe class changes for visibility changes
            const observer = new MutationObserver(() => {
                this.saveDockState();
            });

            observer.observe(panel, { attributes: true, attributeFilter: ['class'] });

            // Optional: listen to position changes if you implement draggable docks
            panel.addEventListener("mouseup", () => {
                this.saveDockState();
            });
        });

        console.log("✅ Auto-Sync now actively monitoring dock changes.");
    },

    resetDockState: function() {
        console.log("🧹 Resetting dock state...");
        localStorage.removeItem("dockState");
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            panel.classList.remove("hidden");
            panel.style.top = "";
            panel.style.left = "";
        });
        console.log("✅ Dock state reset to default.");
        this.triggerEvent("reset");
    },

    registerSubsystemDock: function(subsystemConfig) {
        console.log("🔌 Subsystem Dock Registration Initiated...");

        if (!subsystemConfig || !subsystemConfig.dockId) {
            console.warn("❌ Invalid subsystem configuration object.");
            return;
        }

        const dockId = subsystemConfig.dockId;
        const onClick = subsystemConfig.onClick || (() => {
            console.log(`Subsystem Dock ${dockId} clicked.`);
        });

        const panel = document.getElementById(dockId);
        if (!panel) {
            console.warn(`❌ Dock panel '${dockId}' not found in DOM.`);
            return;
        }

        panel.addEventListener("click", onClick);
        console.log(`✅ Subsystem Dock '${dockId}' successfully registered.`);

        // Set initial visibility if specified
        if (typeof subsystemConfig.visible === "boolean") {
            if (subsystemConfig.visible) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }
        }

        // --- Visibility override after registration/wiring ---
        const dockPanel = document.getElementById(dockId);
        if (dockPanel) {
            dockPanel.style.display = "block";
            dockPanel.style.visibility = "visible";
            dockPanel.style.opacity = "1";
            dockPanel.style.zIndex = "1"; // Ensure it's above hidden overlays
            dockPanel.classList.remove("hidden", "collapsed");
            console.log(`✅ Visibility override applied to: ${dockId}`);
        } else {
            console.warn(`⚠️ Dock panel not found for visibility injection: ${dockId}`);
        }

        // Save immediately after registration
        this.saveDockState();
    },

    exportDockSnapshot: function() {
        console.log("📤 Exporting dock snapshot...");
        const state = {
            version: this.dockSchemaVersion,
            panels: {}
        };
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            state.panels[panel.id] = {
                visible: !panel.classList.contains("hidden"),
                position: {
                    top: panel.style.top || null,
                    left: panel.style.left || null
                }
            };
        });
        console.log("✅ Dock snapshot export complete.");
        return state;
    },

    importDockSnapshot: function(snapshot) {
        console.log("📥 Importing dock snapshot...");
        if (!snapshot || typeof snapshot !== "object") {
            console.warn("❌ Invalid snapshot provided.");
            return;
        }
        if (!snapshot.version) {
            console.warn("⚠ Legacy snapshot detected — initiating migration.");
            snapshot = this.migrateLegacyDockState(snapshot);
        }
        if (snapshot.version > this.dockSchemaVersion) {
            console.warn("⚠ Incompatible snapshot version.");
            return;
        }
        if (!this.validateDockState(snapshot)) {
            console.warn("❌ Invalid snapshot detected. Aborting import.");
            return;
        }
        const panels = snapshot.panels || {};
        Object.keys(panels).forEach(id => {
            const selector = SovereignDockPanelMap[id] || `#${id}`;
            const panel = document.querySelector(selector);
            if (!panel) return;
            const dockInfo = panels[id];

        // Panel Override Lock: skip visibility/position update if gridLock is active
        const panelOverrideLock = document.body.dataset.gridLock === "true";
        if (panelOverrideLock) {
            console.warn(`🛑 Panel Override Lock Active — Skipping Forced Repositioning for: ${id}`);
            return;
        }
        // Optionally log subsystem trying to mutate layout
        console.warn(`⚠️ Layout mutation attempted by: ${id}`);
        // Apply visibility
        if (dockInfo.visible) {
            panel.classList.remove("hidden");
        } else {
            panel.classList.add("hidden");
        }

        // Apply position
        if (dockInfo.position) {
            if (dockInfo.position.top) panel.style.top = dockInfo.position.top;
            if (dockInfo.position.left) panel.style.left = dockInfo.position.left;
        }
        });

        // Save the imported state into localStorage
        localStorage.setItem("dockState", JSON.stringify(snapshot));

        console.log("✅ Dock snapshot import complete.");
        this.triggerEvent("import", snapshot);
    },

    registerNewDock: function(dockId) {
        console.log(`➕ Registering new dynamic dock panel: ${dockId}`);
        // Logic to register dynamically added dock panels
        const newPanel = document.getElementById(dockId);
        if (newPanel) {
            newPanel.addEventListener("click", () => {
                console.log(`Dynamic dock panel ${dockId} activated.`);
            });
        } else {
            console.warn(`Dock panel ${dockId} not found.`);
        }
    },

    saveDockState: function() {
        console.log("💾 Saving dock state...");
        const state = {
            version: this.dockSchemaVersion,
            panels: {}
        };
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            state.panels[panel.id] = {
                visible: !panel.classList.contains("hidden"),
                position: {
                    top: panel.style.top || null,
                    left: panel.style.left || null
                }
            };
        });
        localStorage.setItem("dockState", JSON.stringify(state));
        this.triggerEvent("save", state);
        console.log("✅ Dock state saved.");
    },

    migrateLegacyDockState: function(legacyState) {
        console.log("🛠 Migrating legacy dock state...");

        const migrated = {
            version: this.dockSchemaVersion,
            panels: {}
        };

        Object.keys(legacyState).forEach(id => {
            const legacyPanel = legacyState[id];
            migrated.panels[id] = {
                visible: typeof legacyPanel.visible === "boolean" ? legacyPanel.visible : true,
                position: legacyPanel.position || { top: null, left: null }
            };
        });

        console.log("✅ Legacy dock state migration complete.");
        return migrated;
    },

    validateDockState: function(state) {
        console.log("🔍 Validating dock state integrity...");

        if (!state || typeof state !== "object") {
            console.error("❌ State is not an object.");
            return false;
        }

        if (!state.version || typeof state.version !== "number") {
            console.error("❌ Missing or invalid schema version.");
            return false;
        }

        if (!state.panels || typeof state.panels !== "object") {
            console.error("❌ Missing panels object.");
            return false;
        }

        let allValid = true;

        Object.keys(state.panels).forEach(id => {
            const panel = state.panels[id];
            if (typeof panel.visible !== "boolean") {
                console.warn(`⚠ Panel '${id}' has invalid 'visible' property.`);
                allValid = false;
            }
            if (!panel.position || typeof panel.position !== "object") {
                console.warn(`⚠ Panel '${id}' has missing or invalid position object.`);
                allValid = false;
            }
        });

        if (allValid) {
            console.log("✅ Dock state integrity confirmed.");
            this.triggerEvent("validate", state);
        } else {
            console.warn("⚠ Dock state contains inconsistencies.");
        }

        return allValid;
    },

    logDockState: function() {
        console.log("🧪 Dock State Diagnostics:");
        const dockPanels = document.querySelectorAll(".dock-panel");
        const snapshot = {
            version: this.dockSchemaVersion,
            panels: {}
        };
        dockPanels.forEach(panel => {
            snapshot.panels[panel.id] = {
                visible: !panel.classList.contains("hidden"),
                position: {
                    top: panel.style.top || null,
                    left: panel.style.left || null
                }
            };
        });
        console.table(snapshot.panels);
        console.log("🧪 Schema Version:", snapshot.version);
    },

    saveProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        const snapshot = this.exportDockSnapshot();
        localStorage.setItem(`dockProfile_${profileName}`, JSON.stringify(snapshot));
        console.log(`✅ Dock profile '${profileName}' saved.`);
        this.triggerEvent("profileSave", { profileName, snapshot });
    },

    loadProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
        if (!profileJSON) {
            console.warn(`⚠ Dock profile '${profileName}' not found.`);
            return;
        }
        const snapshot = JSON.parse(profileJSON);
        this.importDockSnapshot(snapshot);
        console.log(`✅ Dock profile '${profileName}' loaded.`);
        this.triggerEvent("profileLoad", { profileName, snapshot });
    },

    deleteProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        localStorage.removeItem(`dockProfile_${profileName}`);
        console.log(`🗑 Dock profile '${profileName}' deleted.`);
        this.triggerEvent("profileDelete", { profileName });
    },

    listProfiles: function() {
        console.log("📂 Available Dock Profiles:");
        const keys = Object.keys(localStorage).filter(key => key.startsWith("dockProfile_"));
        const profiles = keys.map(key => key.replace("dockProfile_", ""));
        console.table(profiles);
        return profiles;
    },

    // Export the specified profile as a downloadable JSON file
    exportProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
        if (!profileJSON) {
            console.warn(`⚠ Dock profile '${profileName}' not found.`);
            return;
        }
        const blob = new Blob([profileJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${profileName}_dockProfile.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log(`📤 Profile '${profileName}' exported as file.`);
        this.triggerEvent("profileExport", { profileName });
    },

    // Import a profile from raw JSON data (string), saving under the given profile name
    importProfileFromJSON: function(profileName, jsonData) {
        if (!profileName || !jsonData) {
            console.warn("❌ Profile name and valid JSON data required.");
            return;
        }
        let parsed;
        try {
            parsed = JSON.parse(jsonData);
        } catch (err) {
            console.error("❌ Failed to parse JSON data.", err);
            return;
        }
        if (!parsed.version) {
            console.warn("⚠ Legacy profile data detected — initiating migration.");
            parsed = this.migrateLegacyDockState(parsed);
        }
        if (!this.validateDockState(parsed)) {
            console.warn("❌ Invalid profile data detected. Import aborted.");
            return;
        }
        localStorage.setItem(`dockProfile_${profileName}`, JSON.stringify(parsed));
        console.log(`📥 Profile '${profileName}' successfully imported from JSON.`);
        this.triggerEvent("profileImport", { profileName, snapshot: parsed });
    },

    // Default profile management
    setDefaultProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        localStorage.setItem("defaultDockProfile", profileName);
        console.log(`✅ Default dock profile set to '${profileName}'.`);
        this.triggerEvent("defaultProfileSet", { profileName });
    },

    getDefaultProfile: function() {
        return localStorage.getItem("defaultDockProfile") || null;
    },

    loadDefaultProfile: function() {
        const profileName = this.getDefaultProfile();
        if (!profileName) {
            console.log("⚠ No default dock profile set.");
            return;
        }
        console.log(`🔄 Attempting to load default dock profile '${profileName}'...`);
        this.loadProfile(profileName);
    },

    // Profile Sync Core
    syncProfile: function(profileName, syncHandler) {
        if (!profileName || typeof syncHandler !== "function") {
            console.warn("❌ Profile name and valid sync handler function required.");
            return;
        }
        const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
        if (!profileJSON) {
            console.warn(`⚠ Dock profile '${profileName}' not found.`);
            return;
        }
        let parsed;
        try {
            parsed = JSON.parse(profileJSON);
        } catch (err) {
            console.error("❌ Failed to parse profile JSON for sync.", err);
            return;
        }
        if (!parsed.version) {
            console.warn("⚠ Legacy profile data detected — initiating migration before sync.");
            parsed = this.migrateLegacyDockState(parsed);
        }
        if (!this.validateDockState(parsed)) {
            console.warn("❌ Invalid profile data detected. Sync aborted.");
            return;
        }
        try {
            syncHandler(profileName, parsed);
            console.log(`📡 Profile '${profileName}' passed to external sync handler.`);
            this.triggerEvent("profileSync", { profileName, snapshot: parsed });
        } catch (err) {
            console.error("❌ Error occurred while executing sync handler:", err);
        }
    },

    syncAllProfiles: function(syncHandler) {
        if (typeof syncHandler !== "function") {
            console.warn("❌ Valid sync handler function required.");
            return;
        }
        const keys = Object.keys(localStorage).filter(key => key.startsWith("dockProfile_"));
        keys.forEach(key => {
            const profileName = key.replace("dockProfile_", "");
            this.syncProfile(profileName, syncHandler);
        });
        console.log("✅ All profiles passed to sync handler.");
    },

    // Profile Merge Engine with conflict strategies
    mergeProfiles: function(primaryProfileName, secondaryProfileName, mergedProfileName, strategy = "preferPrimary") {
        if (!primaryProfileName || !secondaryProfileName || !mergedProfileName) {
            console.warn("❌ All three profile names are required for merge.");
            return;
        }

        const loadProfile = (profileName) => {
            const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
            if (!profileJSON) {
                console.warn(`⚠ Dock profile '${profileName}' not found.`);
                return null;
            }
            let parsed;
            try {
                parsed = JSON.parse(profileJSON);
            } catch (err) {
                console.error(`❌ Failed to parse profile '${profileName}'.`, err);
                return null;
            }
            if (!parsed.version) {
                console.warn(`⚠ Legacy profile '${profileName}' detected — migrating.`);
                parsed = this.migrateLegacyDockState(parsed);
            }
            if (!this.validateDockState(parsed)) {
                console.warn(`❌ Invalid profile '${profileName}'. Merge aborted.`);
                return null;
            }
            return parsed;
        };

        const primary = loadProfile(primaryProfileName);
        const secondary = loadProfile(secondaryProfileName);

        if (!primary || !secondary) {
            console.warn("❌ Merge aborted due to profile load failure.");
            return;
        }

        const merged = {
            version: this.dockSchemaVersion,
            panels: { ...primary.panels }
        };

        Object.keys(secondary.panels).forEach(id => {
            const secondaryPanel = secondary.panels[id];
            if (!merged.panels[id]) {
                merged.panels[id] = secondaryPanel;
            } else {
                const primaryPanel = merged.panels[id];

                switch (strategy) {
                    case "preferSecondary":
                        merged.panels[id] = secondaryPanel;
                        break;
                    case "mergeVisibility":
                        merged.panels[id].visible = primaryPanel.visible || secondaryPanel.visible;
                        merged.panels[id].position = primaryPanel.position || secondaryPanel.position || { top: null, left: null };
                        break;
                    case "preferPrimary":
                    default:
                        // Default: preserve primary, only fill missing position from secondary
                        if (!primaryPanel.position && secondaryPanel.position) {
                            merged.panels[id].position = secondaryPanel.position;
                        }
                        break;
                }
            }
        });

        localStorage.setItem(`dockProfile_${mergedProfileName}`, JSON.stringify(merged));
        console.log(`🔗 Profiles '${primaryProfileName}' + '${secondaryProfileName}' merged into '${mergedProfileName}' using strategy '${strategy}'.`);
        this.triggerEvent("profileMerge", { mergedProfileName, strategy, merged });
    },

    // Role-Based Profile Assignment Methods
    assignProfileToRole: function(roleName, profileName) {
        if (!roleName || !profileName) {
            console.warn("❌ Role name and profile name are required.");
            return;
        }
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        const roleMap = roleMapJSON ? JSON.parse(roleMapJSON) : {};
        roleMap[roleName] = profileName;
        localStorage.setItem("dockRoleMap", JSON.stringify(roleMap));
        console.log(`🎯 Role '${roleName}' assigned to profile '${profileName}'.`);
        this.triggerEvent("roleAssigned", { roleName, profileName });
    },

    getProfileForRole: function(roleName) {
        if (!roleName) {
            console.warn("❌ Role name required.");
            return null;
        }
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        if (!roleMapJSON) return null;
        const roleMap = JSON.parse(roleMapJSON);
        return roleMap[roleName] || null;
    },

    activateRole: function(roleName) {
        if (!roleName) {
            console.warn("❌ Role name required.");
            return;
        }
        const profileName = this.getProfileForRole(roleName);
        if (!profileName) {
            console.warn(`⚠ No profile assigned for role '${roleName}'.`);
            return;
        }
        console.log(`🚀 Activating role '${roleName}' with profile '${profileName}'.`);
        this.loadProfile(profileName);
        this.triggerEvent("roleActivated", { roleName, profileName });
    },

    // Role Cascade System: Activate multiple roles with merge strategies
    activateRoles: function(roleNamesArray, mergeStrategy = "preferPrimary") {
        if (!Array.isArray(roleNamesArray) || roleNamesArray.length === 0) {
            console.warn("❌ Valid array of roles required.");
            return;
        }

        const roleMapJSON = localStorage.getItem("dockRoleMap");
        if (!roleMapJSON) {
            console.warn("⚠ No role mappings found.");
            return;
        }
        const roleMap = JSON.parse(roleMapJSON);

        // Sort the incoming roles by priority before merging
        const sortedRoles = [...roleNamesArray].sort((a, b) => {
            return this.getRolePriority(b) - this.getRolePriority(a);
        });

        const profileNames = sortedRoles.map(roleName => {
            const profileName = roleMap[roleName];
            if (!profileName) {
                console.warn(`⚠ No profile assigned to role '${roleName}'.`);
            }
            return profileName;
        }).filter(p => !!p);

        if (profileNames.length === 0) {
            console.warn("⚠ No valid profiles found for provided roles.");
            return;
        }

        // If only one valid profile, load directly
        if (profileNames.length === 1) {
            console.log(`🚀 Activating single role '${sortedRoles[0]}' with profile '${profileNames[0]}'.`);
            this.loadProfile(profileNames[0]);
            return;
        }

        // Merge profiles sequentially
        const tempMergedProfile = `__tempMerged_${Date.now()}`;
        const primaryProfile = profileNames[0];

        for (let i = 1; i < profileNames.length; i++) {
            const secondaryProfile = profileNames[i];
            const mergeTarget = (i === 1) ? primaryProfile : tempMergedProfile;
            const mergeDestination = (i === profileNames.length - 1) ? tempMergedProfile : tempMergedProfile;

            this.mergeProfiles(mergeTarget, secondaryProfile, mergeDestination, mergeStrategy);
        }

        // Load the final merged profile
        this.loadProfile(tempMergedProfile);
        console.log(`🔗 Composite roles [${sortedRoles.join(", ")}] merged and activated.`);
        this.triggerEvent("roleCascadeActivated", { roles: sortedRoles, strategy: mergeStrategy });
    },

    // Role Priority Engine methods
    setRolePriority: function(roleName, priorityScore) {
        if (!roleName || typeof priorityScore !== "number") {
            console.warn("❌ Role name and numeric priority required.");
            return;
        }
        const priorityMapJSON = localStorage.getItem("dockRolePriority");
        const priorityMap = priorityMapJSON ? JSON.parse(priorityMapJSON) : {};
        priorityMap[roleName] = priorityScore;
        localStorage.setItem("dockRolePriority", JSON.stringify(priorityMap));
        console.log(`🎯 Role '${roleName}' priority set to '${priorityScore}'.`);
        this.triggerEvent("rolePrioritySet", { roleName, priorityScore });
    },

    getRolePriority: function(roleName) {
        const priorityMapJSON = localStorage.getItem("dockRolePriority");
        if (!priorityMapJSON) return 0;
        const priorityMap = JSON.parse(priorityMapJSON);
        return priorityMap[roleName] || 0;
    },

    // Role Cluster Profile System
    defineRoleCluster: function(clusterName, roleArray) {
        if (!clusterName || !Array.isArray(roleArray)) {
            console.warn("❌ Cluster name and valid role array required.");
            return;
        }
        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        const clusterMap = clusterMapJSON ? JSON.parse(clusterMapJSON) : {};
        clusterMap[clusterName] = roleArray;
        localStorage.setItem("dockRoleClusters", JSON.stringify(clusterMap));
        console.log(`🗂 Role cluster '${clusterName}' defined with roles: [${roleArray.join(", ")}].`);
        this.triggerEvent("roleClusterDefined", { clusterName, roleArray });
    },

    getRoleCluster: function(clusterName) {
        if (!clusterName) {
            console.warn("❌ Cluster name required.");
            return null;
        }
        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        if (!clusterMapJSON) return null;
        const clusterMap = JSON.parse(clusterMapJSON);
        return clusterMap[clusterName] || null;
    },

    activateRoleCluster: function(clusterName, mergeStrategy = "preferPrimary") {
        const roles = this.getRoleCluster(clusterName);
        if (!roles) {
            console.warn(`⚠ Role cluster '${clusterName}' not found.`);
            return;
        }
        console.log(`🚀 Activating role cluster '${clusterName}'...`);
        this.activateRoles(roles, mergeStrategy);
    },

    // === Cluster Priority Arbitration System ===

    setClusterPriority: function(clusterName, priorityScore) {
        if (!clusterName || typeof priorityScore !== "number") {
            console.warn("❌ Cluster name and numeric priority required.");
            return;
        }
        const priorityMapJSON = localStorage.getItem("dockClusterPriority");
        const priorityMap = priorityMapJSON ? JSON.parse(priorityMapJSON) : {};
        priorityMap[clusterName] = priorityScore;
        localStorage.setItem("dockClusterPriority", JSON.stringify(priorityMap));
        console.log(`🎯 Cluster '${clusterName}' priority set to '${priorityScore}'.`);
        this.triggerEvent("clusterPrioritySet", { clusterName, priorityScore });
    },

    getClusterPriority: function(clusterName) {
        const priorityMapJSON = localStorage.getItem("dockClusterPriority");
        if (!priorityMapJSON) return 0;
        const priorityMap = JSON.parse(priorityMapJSON);
        return priorityMap[clusterName] || 0;
    },

    activateRoleClusters: function(clusterNamesArray, mergeStrategy = "preferPrimary") {
        if (!Array.isArray(clusterNamesArray) || clusterNamesArray.length === 0) {
            console.warn("❌ Valid array of cluster names required.");
            return;
        }

        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        if (!clusterMapJSON) {
            console.warn("⚠ No role clusters found.");
            return;
        }
        const clusterMap = JSON.parse(clusterMapJSON);

        // Sort clusters by their priority
        const sortedClusters = [...clusterNamesArray].sort((a, b) => {
            return this.getClusterPriority(b) - this.getClusterPriority(a);
        });

        // Gather all roles from the sorted clusters
        const combinedRoles = [];
        sortedClusters.forEach(clusterName => {
            const roles = clusterMap[clusterName];
            if (roles && Array.isArray(roles)) {
                combinedRoles.push(...roles);
            } else {
                console.warn(`⚠ Cluster '${clusterName}' not found or invalid.`);
            }
        });

        // Activate combined roles with standard activateRoles system
        console.log(`🚀 Activating role clusters [${sortedClusters.join(", ")}] with combined roles...`);
        this.activateRoles(combinedRoles, mergeStrategy);
        this.triggerEvent("roleClustersActivated", { clusters: sortedClusters, strategy: mergeStrategy });
    },

    // === Snapshot Sandbox System ===
    loadSnapshotToSandbox: function(snapshot) {
        console.log("🧪 Loading snapshot into sandbox...");
        if (!snapshot || typeof snapshot !== "object") {
            console.warn("❌ Invalid snapshot provided.");
            return;
        }
        if (!snapshot.version) {
            console.warn("⚠ Legacy snapshot detected — initiating migration.");
            snapshot = this.migrateLegacyDockState(snapshot);
        }
        if (snapshot.version > this.dockSchemaVersion) {
            console.warn("⚠ Incompatible snapshot version.");
            return;
        }
        if (!this.validateDockState(snapshot)) {
            console.warn("❌ Invalid snapshot detected. Aborting sandbox load.");
            return;
        }
        this._sandboxSnapshot = snapshot;
        console.log("✅ Snapshot loaded into sandbox.");
        this.triggerEvent("sandboxLoaded", snapshot);
    },

    applySandbox: function() {
        if (!this._sandboxSnapshot) {
            console.warn("⚠ No sandbox snapshot loaded.");
            return;
        }
        console.log("🧪 Applying sandbox snapshot to live state...");
        this.importDockSnapshot(this._sandboxSnapshot);
        delete this._sandboxSnapshot;
        console.log("✅ Sandbox applied.");
        this.triggerEvent("sandboxApplied");
    },

    discardSandbox: function() {
        if (!this._sandboxSnapshot) {
            console.warn("⚠ No sandbox snapshot to discard.");
            return;
        }
        delete this._sandboxSnapshot;
        console.log("🗑 Sandbox snapshot discarded.");
        this.triggerEvent("sandboxDiscarded");
    },

    // === Dock State Delta Engine ===
    compareDockStates: function(snapshotA, snapshotB) {
        console.log("🧮 Calculating dock state delta...");

        if (!snapshotA || !snapshotB) {
            console.warn("❌ Both snapshots required for comparison.");
            return null;
        }

        const delta = {
            addedPanels: [],
            removedPanels: [],
            modifiedPanels: []
        };

        const panelsA = snapshotA.panels || {};
        const panelsB = snapshotB.panels || {};

        const allPanelIds = new Set([
            ...Object.keys(panelsA),
            ...Object.keys(panelsB)
        ]);

        allPanelIds.forEach(id => {
            const panelA = panelsA[id];
            const panelB = panelsB[id];

            if (panelA && !panelB) {
                delta.removedPanels.push(id);
            } else if (!panelA && panelB) {
                delta.addedPanels.push(id);
            } else if (panelA && panelB) {
                const changes = {};

                if (panelA.visible !== panelB.visible) {
                    changes.visibilityChanged = { from: panelA.visible, to: panelB.visible };
                }

                if (JSON.stringify(panelA.position) !== JSON.stringify(panelB.position)) {
                    changes.positionChanged = { from: panelA.position, to: panelB.position };
                }

                if (Object.keys(changes).length > 0) {
                    delta.modifiedPanels.push({ id, changes });
                }
            }
        });

        console.log("✅ Dock state delta calculated:", delta);
        this.triggerEvent("dockDeltaCalculated", delta);
        return delta;
    },

    // === Dock Delta Application Engine ===
    applyDockDelta: function(targetSnapshot, delta) {
        console.log("🔧 Applying dock state delta...");

        if (!targetSnapshot || !delta) {
            console.warn("❌ Target snapshot and delta are required.");
            return null;
        }

        const updatedSnapshot = JSON.parse(JSON.stringify(targetSnapshot)); // Deep clone

        // Apply added panels
        delta.addedPanels.forEach(panelId => {
            if (!updatedSnapshot.panels[panelId]) {
                updatedSnapshot.panels[panelId] = {
                    visible: true,
                    position: { top: null, left: null }
                };
            }
        });

        // Apply removed panels
        delta.removedPanels.forEach(panelId => {
            delete updatedSnapshot.panels[panelId];
        });

        // Apply modified panels
        delta.modifiedPanels.forEach(({ id, changes }) => {
            if (!updatedSnapshot.panels[id]) return;
            const panel = updatedSnapshot.panels[id];

            if (changes.visibilityChanged) {
                panel.visible = changes.visibilityChanged.to;
            }

            if (changes.positionChanged) {
                panel.position = changes.positionChanged.to;
            }
        });

        console.log("✅ Dock state delta applied.");
        this.triggerEvent("dockDeltaApplied", updatedSnapshot);
        return updatedSnapshot;
    },

    // === Delta Chain Processor ===
    applyDeltaChain: function(targetSnapshot, deltaChainArray) {
        console.log("🔗 Applying delta chain...");

        if (!targetSnapshot || !Array.isArray(deltaChainArray)) {
            console.warn("❌ Target snapshot and valid delta chain array required.");
            return null;
        }

        let workingSnapshot = JSON.parse(JSON.stringify(targetSnapshot)); // Deep clone

        deltaChainArray.forEach((delta, index) => {
            console.log(`⚙ Applying delta ${index + 1} of ${deltaChainArray.length}...`);
            workingSnapshot = this.applyDockDelta(workingSnapshot, delta);
        });

        console.log("✅ Delta chain fully applied.");
        this.triggerEvent("deltaChainApplied", workingSnapshot);
        return workingSnapshot;
    },

    // === Delta Conflict Scanner ===
    scanDeltaConflicts: function(deltaChainArray) {
        console.log("🩺 Scanning delta chain for conflicts...");

        if (!Array.isArray(deltaChainArray) || deltaChainArray.length === 0) {
            console.warn("❌ Valid delta chain array required.");
            return null;
        }

        const conflictMap = {};

        deltaChainArray.forEach((delta, deltaIndex) => {
            // Handle added panels
            delta.addedPanels.forEach(panelId => {
                if (!conflictMap[panelId]) {
                    conflictMap[panelId] = { added: [], removed: [], modified: [] };
                }
                conflictMap[panelId].added.push(deltaIndex);
            });

            // Handle removed panels
            delta.removedPanels.forEach(panelId => {
                if (!conflictMap[panelId]) {
                    conflictMap[panelId] = { added: [], removed: [], modified: [] };
                }
                conflictMap[panelId].removed.push(deltaIndex);
            });

            // Handle modified panels
            delta.modifiedPanels.forEach(({ id, changes }) => {
                if (!conflictMap[id]) {
                    conflictMap[id] = { added: [], removed: [], modified: [] };
                }
                conflictMap[id].modified.push({ deltaIndex, changes });
            });
        });

        const conflicts = {};

        Object.keys(conflictMap).forEach(panelId => {
            const entry = conflictMap[panelId];

            // Conflict detection logic
            if (entry.added.length > 1) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].multipleAdditions = entry.added;
            }
            if (entry.removed.length > 1) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].multipleRemovals = entry.removed;
            }
            if (entry.added.length > 0 && entry.removed.length > 0) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].addRemoveCollision = { added: entry.added, removed: entry.removed };
            }
            if (entry.modified.length > 1) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].multipleModifications = entry.modified;
            }
        });

        console.log("🩺 Delta conflict scan complete:", conflicts);
        this.triggerEvent("deltaConflictsDetected", conflicts);
        return conflicts;
    },

    // === Predictive Merge Simulator ===
    simulateMerge: function(targetSnapshot, deltaChainArray) {
        console.log("🧪 Simulating predictive merge...");

        if (!targetSnapshot || !Array.isArray(deltaChainArray)) {
            console.warn("❌ Target snapshot and valid delta chain array required.");
            return null;
        }

        let workingSnapshot = JSON.parse(JSON.stringify(targetSnapshot)); // Deep clone

        deltaChainArray.forEach((delta, index) => {
            console.log(`🔮 Simulating delta ${index + 1} of ${deltaChainArray.length}...`);
            workingSnapshot = this.applyDockDelta(workingSnapshot, delta);
        });

        console.log("✅ Predictive merge simulation complete.");
        this.triggerEvent("predictiveMergeSimulated", workingSnapshot);
        return workingSnapshot;
    },

    // === Neural Arbitration Engine ===
    arbitrateMergeConflicts: function(deltaChainArray, strategyProfile = "strictPreferPrimary") {
        console.log("⚖️ Running merge arbitration...");

        if (!Array.isArray(deltaChainArray) || deltaChainArray.length === 0) {
            console.warn("❌ Valid delta chain array required.");
            return null;
        }

        const arbitrationDelta = {
            addedPanels: [],
            removedPanels: [],
            modifiedPanels: []
        };

        const mutationMap = {};

        deltaChainArray.forEach((delta, deltaIndex) => {
            delta.addedPanels.forEach(panelId => {
                if (!mutationMap[panelId]) mutationMap[panelId] = { added: [], removed: [], modified: [] };
                mutationMap[panelId].added.push({ deltaIndex });
            });
            delta.removedPanels.forEach(panelId => {
                if (!mutationMap[panelId]) mutationMap[panelId] = { added: [], removed: [], modified: [] };
                mutationMap[panelId].removed.push({ deltaIndex });
            });
            delta.modifiedPanels.forEach(({ id, changes }) => {
                if (!mutationMap[id]) mutationMap[id] = { added: [], removed: [], modified: [] };
                mutationMap[id].modified.push({ deltaIndex, changes });
            });
        });

        Object.keys(mutationMap).forEach(panelId => {
            const entry = mutationMap[panelId];

            // === Addition / Removal Arbitration ===
            if (entry.added.length > 0 && entry.removed.length === 0) {
                arbitrationDelta.addedPanels.push(panelId);
            }
            if (entry.removed.length > 0 && entry.added.length === 0) {
                arbitrationDelta.removedPanels.push(panelId);
            }
            if (entry.added.length > 0 && entry.removed.length > 0) {
                if (strategyProfile === "strictPreferPrimary") {
                    arbitrationDelta.addedPanels.push(panelId);
                } else if (strategyProfile === "strictPreferSecondary") {
                    arbitrationDelta.removedPanels.push(panelId);
                }
            }

            // === Modification Arbitration ===
            if (entry.modified.length > 0) {
                const lastChange = entry.modified[entry.modified.length - 1]; // Default: favor most recent change
                const resolvedChanges = {};

                if (strategyProfile === "visibilityFavorActive") {
                    const visibilityHistory = entry.modified.map(m => m.changes.visibilityChanged?.to).filter(v => v !== undefined);
                    if (visibilityHistory.includes(true)) {
                        resolvedChanges.visibilityChanged = { to: true };
                    } else if (visibilityHistory.includes(false)) {
                        resolvedChanges.visibilityChanged = { to: false };
                    }
                } else {
                    // Default: take most recent change for visibility
                    if (lastChange.changes.visibilityChanged) {
                        resolvedChanges.visibilityChanged = lastChange.changes.visibilityChanged;
                    }
                }

                if (strategyProfile === "positionFavorRecent") {
                    if (lastChange.changes.positionChanged) {
                        resolvedChanges.positionChanged = lastChange.changes.positionChanged;
                    }
                } else {
                    if (lastChange.changes.positionChanged) {
                        resolvedChanges.positionChanged = lastChange.changes.positionChanged;
                    }
                }

                arbitrationDelta.modifiedPanels.push({
                    id: panelId,
                    changes: resolvedChanges
                });
            }
        });

        console.log("✅ Arbitration complete:", arbitrationDelta);
        this.triggerEvent("mergeArbitrationCompleted", arbitrationDelta);
        return arbitrationDelta;
    },

    // === Anomaly Recovery Engine ===
    recoverDockState: function(snapshot) {
        console.log("🩺 Initiating anomaly recovery on dock state...");

        if (!snapshot || typeof snapshot !== "object") {
            console.warn("❌ Invalid snapshot provided.");
            return null;
        }

        const recovered = {
            version: this.dockSchemaVersion,
            panels: {}
        };

        const panels = snapshot.panels || {};

        Object.keys(panels).forEach(id => {
            const panel = panels[id];
            const recoveredPanel = {};

            // Recover visibility
            if (typeof panel.visible !== "boolean") {
                console.warn(`⚠ Panel '${id}' had invalid visibility — defaulting to 'true'.`);
                recoveredPanel.visible = true;
            } else {
                recoveredPanel.visible = panel.visible;
            }

            // Recover position
            if (!panel.position || typeof panel.position !== "object") {
                console.warn(`⚠ Panel '${id}' had invalid position — resetting.`);
                recoveredPanel.position = { top: null, left: null };
            } else {
                recoveredPanel.position = {
                    top: typeof panel.position.top === "string" ? panel.position.top : null,
                    left: typeof panel.position.left === "string" ? panel.position.left : null
                };
            }

            recovered.panels[id] = recoveredPanel;
        });

        console.log("✅ Dock state anomaly recovery complete.");
        this.triggerEvent("dockStateRecovered", recovered);
        return recovered;
    },

    // === Live State Observer Methods ===
    subscribeLiveState: function(callback) {
        if (typeof callback !== "function") {
            console.warn("❌ Valid callback function required to subscribe.");
            return;
        }
        if (!this._liveStateSubscribers) {
            this._liveStateSubscribers = new Set();
        }
        this._liveStateSubscribers.add(callback);
        console.log("🛰 Live state subscriber added.");
    },

    unsubscribeLiveState: function(callback) {
        if (!this._liveStateSubscribers || typeof callback !== "function") {
            console.warn("❌ Valid callback function required to unsubscribe.");
            return;
        }
        this._liveStateSubscribers.delete(callback);
        console.log("🛰 Live state subscriber removed.");
    },

    broadcastLiveState: function(eventType, payload) {
        if (!this._liveStateSubscribers) return;
        this._liveStateSubscribers.forEach(callback => {
            try {
                callback({ eventType, payload });
            } catch (err) {
                console.error("❌ Error in live state subscriber callback:", err);
            }
        });
    },

    // === Cross-System Bridge API Interface ===
    getDockAPI: function() {
        console.log("🌉 Exposing Cross-System Dock API...");

        return {
            exportDockSnapshot: this.exportDockSnapshot.bind(this),
            importDockSnapshot: this.importDockSnapshot.bind(this),
            saveDockState: this.saveDockState.bind(this),
            restoreDockState: this.restoreDockState.bind(this),
            resetDockState: this.resetDockState.bind(this),
            loadSnapshotToSandbox: this.loadSnapshotToSandbox.bind(this),
            applySandbox: this.applySandbox.bind(this),
            discardSandbox: this.discardSandbox.bind(this),
            compareDockStates: this.compareDockStates.bind(this),
            applyDockDelta: this.applyDockDelta.bind(this),
            applyDeltaChain: this.applyDeltaChain.bind(this),
            scanDeltaConflicts: this.scanDeltaConflicts.bind(this),
            simulateMerge: this.simulateMerge.bind(this),
            arbitrateMergeConflicts: this.arbitrateMergeConflicts.bind(this),
            recoverDockState: this.recoverDockState.bind(this),
            subscribeLiveState: this.subscribeLiveState.bind(this),
            unsubscribeLiveState: this.unsubscribeLiveState.bind(this),
            saveProfile: this.saveProfile.bind(this),
            loadProfile: this.loadProfile.bind(this),
            deleteProfile: this.deleteProfile.bind(this),
            listProfiles: this.listProfiles.bind(this),
            importProfileFromJSON: this.importProfileFromJSON.bind(this),
            exportProfile: this.exportProfile.bind(this),
            setDefaultProfile: this.setDefaultProfile.bind(this),
            getDefaultProfile: this.getDefaultProfile.bind(this),
            loadDefaultProfile: this.loadDefaultProfile.bind(this),
            mergeProfiles: this.mergeProfiles.bind(this),
            assignProfileToRole: this.assignProfileToRole.bind(this),
            getProfileForRole: this.getProfileForRole.bind(this),
            activateRole: this.activateRole.bind(this),
            activateRoles: this.activateRoles.bind(this),
            setRolePriority: this.setRolePriority.bind(this),
            getRolePriority: this.getRolePriority.bind(this),
            defineRoleCluster: this.defineRoleCluster.bind(this),
            getRoleCluster: this.getRoleCluster.bind(this),
            activateRoleCluster: this.activateRoleCluster.bind(this),
            setClusterPriority: this.setClusterPriority.bind(this),
            getClusterPriority: this.getClusterPriority.bind(this),
            activateRoleClusters: this.activateRoleClusters.bind(this),

            // Sovereign Panel Scaffold API (Phase 500.5)
            getCountDockContent: () => "<h2>📊 Live Counts</h2><p>Placeholder content for Live Counts panel.</p>",
            getDeltaAnalyzerContent: () => "<h2>Δ Delta Analyzer</h2><p>Placeholder content for Delta Analyzer.</p>",
            getExceptionManagerContent: () => "<h2>⚠ Exception Manager</h2><p>Placeholder content for Exception Manager.</p>",
            getProgressDashboardContent: () => "<h2>🚦 Progress Dashboard</h2><p>Placeholder content for Progress Dashboard.</p>",
            getReportingHubContent: () => "<h2>📄 Reporting Hub</h2><p>Placeholder content for Reporting Hub.</p>",
            getMasterExportHubContent: () => "<h2>📤 Master Export Hub</h2><p>Placeholder content for Master Export Hub.</p>",
            getUtilityHubContent: () => "<h2>🛠 Utility Hub</h2><p>Placeholder content for Utility Hub.</p>",
            getSessionManagerContent: () => "<h2>📂 Session Manager</h2><p>Placeholder content for Session Manager.</p>",
            getMappingsContent: () => "<h2>🗺 Mappings Interface</h2><p>Placeholder content for Mappings Interface.</p>",
            getToolsContent: () => "<h2>🔧 Tools Panel</h2><p>Placeholder content for Tools Panel.</p>",
            getAuditContent: () => "<h2>📋 Audit Manager</h2><p>Placeholder content for Audit Manager.</p>",
            getConfigPanelContent: () => "<h2>⚙ Configuration Panel</h2><p>Placeholder content for Configuration Panel.</p>"
        };
    },

    // === Sovereign Integrity Auditor ===
    runIntegrityAudit: function() {
        console.log("🩺 Running full Sovereign Mesh Integrity Audit...");

        const report = {
            profiles: [],
            roles: [],
            clusters: [],
            orphanedProfiles: [],
            orphanedRoles: [],
            orphanedClusters: [],
            invalidProfiles: [],
            invalidSnapshots: []
        };

        // Scan Profiles
        const keys = Object.keys(localStorage).filter(key => key.startsWith("dockProfile_"));
        keys.forEach(key => {
            const profileName = key.replace("dockProfile_", "");
            const profileJSON = localStorage.getItem(key);
            try {
                const parsed = JSON.parse(profileJSON);
                if (!this.validateDockState(parsed)) {
                    report.invalidProfiles.push(profileName);
                }
                report.profiles.push(profileName);
            } catch {
                report.invalidProfiles.push(profileName);
            }
        });

        // Scan Role Map
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        if (roleMapJSON) {
            const roleMap = JSON.parse(roleMapJSON);
            Object.entries(roleMap).forEach(([role, profile]) => {
                report.roles.push(role);
                if (!report.profiles.includes(profile)) {
                    report.orphanedProfiles.push(profile);
                    report.orphanedRoles.push(role);
                }
            });
        }

        // Scan Role Clusters
        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        if (clusterMapJSON) {
            const clusterMap = JSON.parse(clusterMapJSON);
            Object.entries(clusterMap).forEach(([cluster, roles]) => {
                report.clusters.push(cluster);
                if (!Array.isArray(roles)) {
                    report.orphanedClusters.push(cluster);
                }
            });
        }

        console.log("🩺 Integrity Audit Complete:", report);
        this.triggerEvent("integrityAuditCompleted", report);
        return report;
    }
};

// Ensure DOMContentLoaded event is safely bound
document.addEventListener("DOMContentLoaded", () => {
    if (typeof OperatorDockWiring.populateDockMatrix === "function") {
        OperatorDockWiring.populateDockMatrix();
    } else {
        console.warn("⚠️ OperatorDockWiring.populateDockMatrix not found.");
    }
    if (typeof OperatorDockWiring.injectDiagnosticLabels === "function") {
        OperatorDockWiring.injectDiagnosticLabels();
    }
});

// === HoloConsole Collapsible Toggle Logic ===
document.addEventListener("DOMContentLoaded", () => {
  // Holo toggle logic
  const toggles = document.querySelectorAll(".holo-toggle");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const consolePanel = document.getElementById(targetId);
      if (consolePanel) {
        consolePanel.classList.toggle("open");
        // --- Render GrimoireMemory if toggling grimoireConsole ---
        if (targetId === "grimoireConsole" && typeof GrimoireMemory !== "undefined" && typeof GrimoireMemory.renderTo === "function") {
          GrimoireMemory.renderTo();
        }
      }
    });
  });

// === Orbit Button Registration (data-target based, improved toggle logic) ===
  // Panel activation logic with nested layout visibility (refactored)
  function showDockPanel(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) {
      console.warn(`⛔ Panel ${panelId} not found.`);
      return;
    }

    // Unhide the parent dockGrid
    const dockGrid = document.getElementById('dockGrid');
    if (dockGrid?.classList.contains('hidden')) {
      dockGrid.classList.remove('hidden');
    }

    // Unhide the panel group if collapsed
    const group = panel.closest('.dock-panel-group');
    if (group?.classList.contains('collapsed')) {
      group.classList.remove('collapsed');
    }

    // === Force visibility override for panel (fix for inherited/blocked styles) ===
    panel.classList.remove("hidden");
    panel.classList.remove("collapsed");
    panel.style.display = "block";
    panel.style.opacity = "1";
    panel.style.visibility = "visible";
    panel.style.zIndex = 1000;
    panel.style.height = "auto";
    panel.style.transform = "translateY(0)";

    // --- legacy force overrides ---
    panel.style.position = "relative";

    // Expand its parent if needed
    const dockGroup = panel.closest(".dock-panel-group");
    if (dockGroup) {
      dockGroup.classList.remove("collapsed");
      dockGroup.style.display = "flex";
    }

    const dockGridElem = panel.closest("#dockGrid");
    if (dockGridElem) {
      dockGridElem.classList.remove("hidden");
      dockGridElem.style.display = "grid";
      dockGridElem.style.visibility = "visible";
    }

    console.log(`✅ Panel ${panelId} fully activated and visible.`);
  }

  document.querySelectorAll('.orbit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      // Remove 'active-orbit' from all panels and hide them
      document.querySelectorAll('.dock-panel').forEach(p => {
        p.classList.remove('active-orbit');
        p.classList.add('hidden');
      });
      // Activate the panel using the new showDockPanel function
      showDockPanel(targetId);
      // Mark as active-orbit if found
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active-orbit');
        // === Force visibility override for panel (fix for inherited/blocked styles) ===
        panel.classList.remove("hidden");
        panel.classList.remove("collapsed");
        panel.style.display = "block";
        panel.style.opacity = "1";
        panel.style.visibility = "visible";
        panel.style.zIndex = 1000;
        panel.style.height = "auto";
        panel.style.transform = "translateY(0)";
        // Legacy override
        panel.style.position = "relative";

        // Expand its parent if needed
        const dockGroup = panel.closest(".dock-panel-group");
        if (dockGroup) {
          dockGroup.classList.remove("collapsed");
          dockGroup.style.display = "flex";
        }

        const dockGrid = panel.closest("#dockGrid");
        if (dockGrid) {
          dockGrid.classList.remove("hidden");
          dockGrid.style.display = "grid";
          dockGrid.style.visibility = "visible";
        }
      }
    });
  });

  // === SageFeed Orbit Button Toggle Logic ===
  const orbitBtn = document.querySelector('.sagefeed-orbit');
  orbitBtn?.addEventListener('click', () => {
    const targetId = orbitBtn.getAttribute('data-target');
    const panel = document.getElementById(targetId);

    if (!panel) return;

    if (panel.classList.contains('console-active')) {
      panel.classList.remove('console-active');
      panel.classList.add('hidden');
      console.log(`🔻 Panel ${targetId} closed.`);
    } else {
      panel.classList.remove('hidden');
      panel.classList.add('console-active');
      console.log(`✅ Panel ${targetId} opened.`);
    }
  });
});

// Expose globally if needed for cross-module usage
window.OperatorDockWiring = OperatorDockWiring;

// Operator Dock Admin Console Interface
const OperatorDockConsole = {
    save: () => OperatorDockWiring.saveDockState(),
    restore: () => OperatorDockWiring.restoreDockState(),
    reset: () => OperatorDockWiring.resetDockState(),
    export: () => OperatorDockWiring.exportDockSnapshot(),
    import: (snapshot) => OperatorDockWiring.importDockSnapshot(snapshot),
    log: () => OperatorDockWiring.logDockState(),
    validate: () => {
        const stateJSON = localStorage.getItem("dockState");
        if (!stateJSON) {
            console.warn("⚠ No saved dock state to validate.");
            return;
        }
        const state = JSON.parse(stateJSON);
        return OperatorDockWiring.validateDockState(state);
    },
    migrateLegacy: (legacyState) => OperatorDockWiring.migrateLegacyDockState(legacyState)
};

window.OperatorDockConsole = OperatorDockConsole;
console.log("🧭 Operator Dock Admin Console Ready — Type 'OperatorDockConsole' to begin diagnostics.");


// === Phase 300.7: Subsystem Dock Content Injection ===

setTimeout(() => {
    console.log("🚀 Executing Phase 300.7 Dock Content Injection...");

    const dockContents = {
        count: `<h2>📊 Live Counts</h2><p>Live inventory counting subsystem online.</p>`,
        deltaAnalyzer: `<h2>Δ Delta Analyzer</h2><p>Delta analytics subsystem loaded.</p>`,
        exceptionManager: `<h2>⚠ Exception Manager</h2><p>Monitoring anomaly exceptions.</p>`,
        progressDashboard: `<h2>🚦 Progress Dashboard</h2><p>System progress indicators operational.</p>`,
        reportingHub: `<h2>📄 Reporting Hub</h2><p>Report generation subsystem ready.</p>`,
        masterExportHub: `<h2>📤 Master Export Hub</h2><p>Bulk export interfaces deployed.</p>`,
        utilityHub: `<h2>🛠 Utility Hub</h2><p>Utility tools accessible here.</p>`,
        sessionManager: `<h2>📂 Session Manager</h2><p>Session archival and recovery available.</p>`,
        mappings: `<h2>🗺 Mappings Interface</h2><p>Mapping configuration subsystem loaded.</p>`,
        tools: `<h2>🔧 Tools Panel</h2><p>Developer and diagnostic tools online.</p>`,
        audit: `<h2>📋 Audit Manager</h2><p>System audit controls engaged.</p>`,
        configPanel: `<h2>⚙ Configuration Panel</h2><p>Codex configuration settings loaded.</p>`
    };

    Object.entries(dockContents).forEach(([dockId, content]) => {
        const panel = document.getElementById(dockId);
        if (panel) {
            panel.innerHTML = content;
            console.log(`✅ Content injected into ${dockId}`);
        } else {
            console.warn(`⚠ Dock panel ${dockId} not found.`);
        }
    });

}, 600);

// === Phase 300.9: Dock Grid Unification Protocol ===

setTimeout(() => {
    console.log("🚀 Executing Phase 300.9 Dock Grid Unification...");

    const dockMap = {
        count: "countContainer",
        deltaAnalyzer: "deltaAnalyzerSection",
        exceptionManager: "exceptionManagerSection",
        progressDashboard: "progressDashboardSection",
        reportingHub: "reportingHubSection",
        masterExportHub: "masterExportSection",
        utilityHub: "utilityHubSection",
        sessionManager: "sessionManagerSection",
        mappings: "mappingManagerSection",
        tools: "toolsPanel",
        audit: "auditSection",
        configPanel: "configPanelSection"
    };

    // Enhanced migration validation
    const dockBindings = Object.entries(dockMap).map(([panelId, legacyId]) => ({ panelId, legacyId }));
    dockBindings.forEach(binding => {
      const targetId = `${binding.panelId}Console`;
      const panelEl = document.getElementById(targetId);
      if (!panelEl) {
        console.warn(`⚠ Migration skipped — panel not found for: ${targetId}`);
        return;
      }
      try {
        panelEl.classList.add("dock-panel");
        console.log(`✅ Migration completed for panel: ${targetId}`);
      } catch (e) {
        console.error(`❌ Error during migration for ${targetId}:`, e);
      }
    });

    // (Original migration logic for legacy containers, if needed)
    /*
    Object.entries(dockMap).forEach(([dockId, legacyId]) => {
        const legacyContainer = document.getElementById(legacyId);
        const newDockPanel = document.getElementById(dockId);

        if (legacyContainer && newDockPanel) {
            newDockPanel.innerHTML = legacyContainer.innerHTML;
            legacyContainer.remove();
            console.log(`✅ Migrated '${legacyId}' ➔ '${dockId}'`);
        } else {
            // console.warn(`⚠ Skipped migration for '${dockId}'`);
        }
    });
    */

    console.log("✅ Phase 300.9 Dock Grid Unification complete.");

}, 800);


// === Phase 300.13: Dynamic Dock Panel Population Injection ===

setTimeout(() => {
    console.log("🚀 Executing Phase 300.13: Dynamic Dock Panel Population...");

    // Inserted DOM safety check for dock grid
    const dockGrid = document.getElementById("dockGrid");
    if (!dockGrid) {
      console.warn("❌ Dock Grid not found. Skipping dynamic dock population.");
      return;
    }

    // (If "operatorDockGrid" is correct, you may want to adjust the ID above accordingly)

    const dockDefinitions = [
        { id: "count", label: "📊 Live Counts", description: "Live inventory counting subsystem online." },
        { id: "deltaAnalyzer", label: "Δ Delta Analyzer", description: "Delta analytics subsystem loaded." },
        { id: "exceptionManager", label: "⚠ Exception Manager", description: "Monitoring anomaly exceptions." },
        { id: "progressDashboard", label: "🚦 Progress Dashboard", description: "System progress indicators operational." },
        { id: "reportingHub", label: "📄 Reporting Hub", description: "Report generation subsystem ready." },
        { id: "masterExportHub", label: "📤 Master Export Hub", description: "Bulk export interfaces deployed." },
        { id: "utilityHub", label: "🛠 Utility Hub", description: "Utility tools accessible here." },
        { id: "sessionManager", label: "📂 Session Manager", description: "Session archival and recovery available." },
        { id: "mappings", label: "🗺 Mappings Interface", description: "Mapping configuration subsystem loaded." },
        { id: "tools", label: "🔧 Tools Panel", description: "Developer and diagnostic tools online." },
        { id: "audit", label: "📋 Audit Manager", description: "System audit controls engaged." },
        { id: "configPanel", label: "⚙ Configuration Panel", description: "Codex configuration settings loaded." },
        // Add Lore Engine panel
        { id: "loreEngine", label: "📖 Lore Engine", description: "Lore Engine subsystem online." }
    ];

    dockDefinitions.forEach(def => {
        let panel = document.getElementById(def.id);
        if (!panel) {
            panel = document.createElement("div");
            panel.id = def.id;
            panel.classList.add("tab-section");
            dockGrid.appendChild(panel);
            console.log(`✅ Created Dock Panel: ${def.id}`);
        }
        panel.innerHTML = `<h2>${def.label}</h2><p>${def.description}</p>`;
    });

    // Inject Lore Engine Console panel if not present
    if (!document.getElementById("loreEngineConsole")) {
        const lorePanel = document.createElement("div");
        lorePanel.id = "loreEngineConsole";
        lorePanel.classList.add("holo-console");
        lorePanel.innerHTML = `
          <div class="console-header" onclick="this.parentElement.classList.toggle('collapsed')">
            📖 Lore Engine Console
          </div>
          <div class="console-body">
            <p><strong>Status:</strong> <span class="lore-status">🟢 Online</span></p>
            <p><strong>Engine Message:</strong> <span class="lore-message">Awaiting...</span></p>
            <div class="lore-log">
              <p>📚 <em>Recent Lore Entries:</em></p>
              <ul class="lore-entries">
                <li class="faint">No lore entries yet.</li>
              </ul>
            </div>
            <button class="trigger-lore-sync">🔄 Sync Lore Engine</button>
          </div>
        `;
        document.body.appendChild(lorePanel);
        console.log("✅ Lore Engine Console initialized and wired to DOM");
        // --- Force panel visible overrides after wiring ---
        const panelId = "loreEngineConsole";
        const dockPanel = document.getElementById(panelId);
        if (dockPanel) {
          dockPanel.style.display = "block";
          dockPanel.style.visibility = "visible";
          dockPanel.style.opacity = "1";
          dockPanel.style.zIndex = "1";
          dockPanel.classList.remove("hidden", "collapsed");
          console.log(`✅ Visibility override applied to: ${panelId}`);
        } else {
          console.warn(`⚠️ Dock panel not found for visibility injection: ${panelId}`);
        }
        // 🧠 Contextual Lore Injection Trigger
        if (typeof SovereignBus !== "undefined" && typeof SovereignBus.emit === "function") {
          SovereignBus.emit("loreEvent", {
            title: "Mesh Initialization Complete",
            summary: "The Sovereign Mesh System reached full operational capacity. All agents and subsystems are stabilized.",
            timestamp: Date.now(),
            tags: ["bootstrap", "mesh", "agents", "lore"]
          });
        }
    }

    // === Phase 400.1: Sovereign Toolbar DOM Injection ===
    console.log("🚀 Executing Phase 400.1 — Sovereign Toolbar DOM Injection...");
    if (typeof SovereignToolbarRenderer?.renderToolbar === "function") {
        SovereignToolbarRenderer.renderToolbar();
        console.log("✅ Sovereign Toolbar successfully rendered.");
    } else {
        console.warn("⚠ SovereignToolbarRenderer.renderToolbar not available.");
    }

}, 1000);


// === Phase 700.3-B: Sovereign Dock Toggle Core Rebuild Injection ===

OperatorDockWiring.initializeToggleSystem = function() {
    console.log("🚀 Sovereign Dock Toggle System Initialized");

    const dockButtons = document.querySelectorAll(".dock-toggle-button");

    dockButtons.forEach(button => {
        const targetId = button.getAttribute("data-target");
        if (!targetId) {
            console.warn("⚠ Dock toggle button missing data-target attribute.");
            return;
        }

        button.addEventListener("click", () => {
            const panel = document.getElementById(targetId);
            if (!panel) {
                console.warn(`❌ Dock panel '${targetId}' not found.`);
                return;
            }
            panel.classList.toggle("hidden");
            console.log(`🔀 Toggled visibility for dock panel '${targetId}'`);
            OperatorDockWiring.saveDockState();
        });
    });
};

// === Register Subsystem Docks ===
// (Add new subsystem dock registrations below this line)

OperatorDockWiring.registerSubsystemDock({
    dockId: "exceptionManager",
    onClick: () => {
        console.log("⚠ Sovereign Exception Manager Activated");
        alert("🚨 Exception Manager Panel Loaded — Sovereign Mesh Stabilization Online");
    }
});

// === Register Lore Engine subsystem dock ===
registerSubsystemDock("loreEngine", "loreEngineConsole");


// === Phase 500 — Dock Panel Registration Listeners ===
document.addEventListener("OperatorDockReady", () => {
  console.log("🧩 OperatorDockReady event detected — registering Forecast Console panel...");
  if (typeof registerPanel === "function") {
    registerPanel("forecastConsole", {
      title: "Forecast Console",
      icon: "📡",
      contentId: "forecastConsolePanel"
    });
    console.log("✅ Forecast Console panel registered via event.");
  } else {
    console.error("❌ registerPanel is not available.");
  }
});

// SovereignBus loreEvent listener registration (after all listeners are added)
if (typeof SovereignBus !== "undefined" && typeof SovereignBus.listen === "function") {
  SovereignBus.listen("loreEvent", (entry) => {
    if (typeof window.SAGE !== "undefined" && typeof window.SAGE.registerLore === "function") {
      window.SAGE.registerLore(entry);
    } else {
      console.warn("Lore registration skipped — SAGE.registerLore not yet available.");
    }
  });
}

OperatorDockWiring.registerSubsystemDock({
    dockId: "whispererConsole",
    onClick: () => {
        console.log("👁 Whisperer Console Activated");
        alert("🧠 Whisperer Mesh Online — Listening Beyond the Veil...");
        revealDockPanel("whispererConsole");
    },
    visible: false
});
OperatorDockWiring.registerSubsystemDock({
    dockId: "count",
    onClick: () => {
        console.log("📊 Sovereign Live Counts Panel Activated");
        alert("📊 Live Counts Panel Loaded — Inventory Counting System Online");
        const countPanel = document.getElementById("countConsole");
        if (countPanel) {
            revealDockPanel("countConsole");
        } else {
            console.warn("⚠ Dock panel 'count' not found. Delaying registration and retrying...");
            setTimeout(() => {
                const retryPanel = document.getElementById("countConsole");
                if (retryPanel) {
                    registerSubsystemDock("count", retryPanel);
                    console.log("✅ Dock panel 'countConsole' registered on retry.");
                } else {
                    console.error("❌ Retry failed: 'countConsole' still not found.");
                }
            }, 500); // retry after short delay
        }
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "deltaAnalyzer",
    onClick: () => {
        console.log("Δ Sovereign Delta Analyzer Panel Activated");
        alert("🔍 Delta Analyzer Panel Loaded — Drift Detection Online");
        revealDockPanel("deltaAnalyzerConsole");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "reportingHub",
    onClick: () => {
        console.log("📄 Reporting Hub Activated");
        alert("📄 Reporting Hub Loaded — Report Generation Ready");
        revealDockPanel("reportingHubConsole");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "sessionManager",
    onClick: () => {
        console.log("📂 Session Manager Activated");
        alert("📂 Session Manager Loaded — Archive and Recovery Online");
        revealDockPanel("sessionManagerConsole");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "utilityHub",
    onClick: () => {
        console.log("🛠 Utility Hub Activated");
        alert("🛠 Utility Hub Loaded — Diagnostic Tools Ready");
        revealDockPanel("utilityHubConsole");
    }
});

// === Sovereign Command Console Subsystem Dock Registration ===
registerSubsystemDock({
  id: "sovereignCommandConsole",
  title: "Sovereign Command",
  orbit: "sovereignCommand",
  domElementId: "sovereignCommandConsole",
  classList: ["panel", "sovereign-command-console"],
  inject: true,
  template: `
    <div class="console-header">🛸 Sovereign Command Console</div>
    <div class="console-body">
      <div class="console-section">
        <p><strong>Directive Input:</strong></p>
        <input type="text" id="sovereignCommandInput" placeholder="e.g., override protocol gamma">
        <button class="execute-command">Execute</button>
      </div>
      <div class="console-section">
        <p><strong>Log Output:</strong></p>
        <ul class="sovereign-command-log">
          <li class="faint">Awaiting command...</li>
        </ul>
      </div>
    </div>
  `
});

// === Register subsystem alias "whisperer" for "whispererConsole" ===
// Register the Whisperer subsystem dock for orbit button support

// --- Ensure registerSubsystemDock is available globally ---
function registerSubsystemDock(config) {
    // Accepts either (dockId, dockConfig) for legacy or (config) for new API
    if (!config) {
        console.warn("registerSubsystemDock: No configuration provided.");
        return;
    }
    // If string, legacy signature
    if (typeof config === "string") {
        console.warn("registerSubsystemDock: Legacy API signature detected, please update usage.");
        return;
    }
    // Modern config: expects either {dockId, onClick, ...} or {orbit, panelId, ...}
    if (config.dockId) {
        // Existing registration logic
        const dockId = config.dockId;
        let panel = document.getElementById(dockId);
        if (!panel) {
            panel = document.createElement('div');
            panel.id = dockId;
            panel.className = 'sovereign-dock-panel';
            document.body.appendChild(panel);
        }
        Object.assign(panel.style, config.style || {});
        if (config.content) panel.innerHTML = config.content;
        if (typeof config.onClick === "function") {
            panel.addEventListener("click", config.onClick);
        }
        if (typeof config.visible === "boolean") {
            if (config.visible) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }
        }
        console.log(`✅ Subsystem Dock '${dockId}' successfully registered.`);
        return;
    }
    // New orbit/panelId config (for alias/activation mapping)
    if (config.orbit && config.panelId) {
        // Optionally: store this mapping for orbit button support, or just log it.
        // In real system, you may want to wire this to button activation logic.
        window.SovereignDockOrbitMap = window.SovereignDockOrbitMap || {};
        window.SovereignDockOrbitMap[config.orbit] = {
            panelId: config.panelId,
            title: config.title,
            icon: config.icon
        };
        console.log(`✅ Subsystem Dock alias registered: orbit='${config.orbit}', panelId='${config.panelId}'`);
        return;
    }
    console.warn("registerSubsystemDock: Invalid configuration object.", config);
}

// (activateDockPanel function removed, use showDockPanel instead)

registerSubsystemDock({
  orbit: 'whisperer',
  panelId: 'whispererConsole',
  title: 'The Whisperer',
  icon: 'assets/icons/icon-whisperer-glyph.png'
});

// === Lore Engine Panel Registration ===
registerSubsystemDock({
  orbit: "loreEngine",
  panelId: "loreEngineConsole",
  title: "Lore Engine",
  icon: "assets/icons/icon-lorebook.png"
});

// === Register dock alias for loreEngine ===
if (typeof registerDockAlias === "function") {
  registerDockAlias("loreEngine", "loreEngineConsole");
}

// 🧠 Phase 400.9 — Delta Analyzer Console Initialization
const deltaAnalyzerConsole = document.createElement('div');
deltaAnalyzerConsole.classList.add('holo-console');
deltaAnalyzerConsole.id = 'deltaAnalyzerConsole';
deltaAnalyzerConsole.innerHTML = `
  <div class="console-header" onclick="this.parentElement.classList.toggle('collapsed')">
    🌀 Delta Analyzer Console
  </div>
  <div class="console-body">
    <p>Delta drift data, spike detection, and correction logs will render here.</p>
  </div>
`;
document.body.appendChild(deltaAnalyzerConsole);

// === HoloConsole Initialization for All Sovereign Panels ===
const dockConsoles = {
    countConsole: {
        title: "📊 Live Counts Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="live-status">🟢 Online</span></p>
        <p><strong>Last Sync:</strong> <span class="last-sync">Fetching...</span></p>
        <div class="count-log">
          <p>🗂 <em>Items Tracked:</em> <span class="count-items">0</span></p>
          <p>📦 <em>Active Categories:</em> <span class="count-categories">0</span></p>
          <p>📍 <em>Recent Additions:</em></p>
          <ul class="recent-items">
            <li class="faint">No data yet.</li>
          </ul>
        </div>
        <button class="refresh-counts">🔄 Refresh Data</button>
      </div>
    `
    },
    deltaAnalyzerConsole: {
        title: "🧮 Delta Analyzer Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="delta-status">🟢 Monitoring</span></p>
        <p><strong>Last Anomaly Scan:</strong> <span class="delta-scan-time">Fetching...</span></p>
        <div class="delta-log">
          <p>📈 <em>Drift Events Detected:</em> <span class="drift-events">0</span></p>
          <p>🚨 <em>Critical Spikes:</em> <span class="critical-spikes">0</span></p>
          <p>📋 <em>Log Entries:</em></p>
          <ul class="delta-log-entries">
            <li class="faint">Awaiting data...</li>
          </ul>
        </div>
        <button class="run-delta-scan">🔁 Run Anomaly Scan</button>
      </div>
    `
    },
    reportingHubConsole: {
        title: "📄 Reporting Hub Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="report-status">🟢 Ready</span></p>
        <p><strong>Last Report:</strong> <span class="last-report-time">None</span></p>
        <div class="report-log">
          <p>📝 <em>Recent Reports:</em></p>
          <ul class="report-entries">
            <li class="faint">No reports generated yet.</li>
          </ul>
        </div>
        <button class="generate-report">📤 Generate System Report</button>
      </div>
    `
    },
    sessionManagerConsole: {
        title: "📂 Session Manager Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="session-status">🟢 Monitoring</span></p>
        <p><strong>Last Backup:</strong> <span class="last-backup-time">N/A</span></p>
        <div class="session-log">
          <p>💾 <em>Stored Sessions:</em></p>
          <ul class="session-entries">
            <li class="faint">No archived sessions found.</li>
          </ul>
        </div>
        <button class="trigger-backup">💾 Archive Current Session</button>
        <button class="trigger-restore">♻️ Restore Last Session</button>
      </div>
    `
    },
    utilityHubConsole: {
        title: "🛠 Utility Hub Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="utility-status">🟢 Online</span></p>
        <p><strong>Command Queue:</strong> <span class="utility-queue">Idle</span></p>
        <div class="utility-log">
          <p>📚 <em>Utility Log:</em></p>
          <ul class="utility-entries">
            <li class="faint">Awaiting operations...</li>
          </ul>
        </div>
        <button class="run-diagnostics">🧪 Run Diagnostics</button>
        <button class="clear-log">🧹 Clear Log</button>
      </div>
    `
    },
    whispererConsole: {
        title: "🧠 Whisperer Console",
        body: `
        <div class="console-section">
          <p><strong>Status:</strong> <span class="whisperer-status">🟢 Listening</span></p>
          <p><strong>Time Origin Message:</strong> <span class="origin-message">Awaiting...</span></p>
          <div class="whisperer-log">
            <p>📡 <em>Captured Signals:</em></p>
            <ul class="whisperer-entries">
              <li class="faint">No transmissions received.</li>
            </ul>
          </div>
          <button class="trigger-whisper-sync">🔁 Sync Whisperer</button>
        </div>
      `
    }
};

Object.entries(dockConsoles).forEach(([id, content]) => {
    const consoleEl = document.createElement('div');
    consoleEl.classList.add('holo-console');
    consoleEl.id = id;
    consoleEl.innerHTML = `
      <div class="console-header" onclick="this.parentElement.classList.toggle('collapsed')">
        ${content.title}
      </div>
      <div class="console-body">
        ${content.body}
      </div>
    `;
    document.body.appendChild(consoleEl);
    console.log(`✅ ${id} initialized and wired to DOM`);
});

// Ensure Whisperer Console is ap<truncated__content/>

// === Phase: HUD Element Safe-Binding for Key UI Elements ===
// Wrap direct getElementById bindings with safe-check for HUD elements
const dockStatusText = document.getElementById("dockStatusText");
if (!dockStatusText) {
  console.warn("⚠️ [HUD Warning] dockStatusText not found. Will revalidate on next HUD cycle.");
}
const lastSync = document.getElementById("lastSync");
if (!lastSync) {
  console.warn("⚠️ [HUD Warning] lastSync not found. Will revalidate on next HUD cycle.");
}
const itemSpan = document.getElementById("itemSpan");
if (!itemSpan) {
  console.warn("⚠️ [HUD Warning] itemSpan not found. Will revalidate on next HUD cycle.");
}
const categorySpan = document.getElementById("categorySpan");
if (!categorySpan) {
  console.warn("⚠️ [HUD Warning] categorySpan not found. Will revalidate on next HUD cycle.");
}
const recentList = document.getElementById("recentList");
if (!recentList) {
  console.warn("⚠️ [HUD Warning] recentList not found. Will revalidate on next HUD cycle.");
}
OperatorDockWiring.registerSubsystemDock({
    dockId: "oracleConsole",
    onClick: () => {
        console.log("🔮 Oracle Console Activated");
        revealDockPanel("oracleConsole");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "grimoireConsole",
    onClick: () => {
        console.log("📜 Grimoire Console Activated");
        revealDockPanel("grimoireConsole");
    }
});
// 🚨 Phase 311.0 — Dock Panel Interactivity Audit
document.querySelectorAll('.holo-console').forEach(panel => {
  panel.addEventListener('click', () => {
    console.log(`🧪 Interactivity Audit: Panel ${panel.id || 'unknown'} clicked.`);
  });
});
console.log("✅ Phase 311.0: Dock Panel Interactivity Audit hooks applied.");
// === Final Resurrection Scan Diagnostic Injection ===
setTimeout(() => {
  console.log("🔍 Final Resurrection Scan Initiated");
  const consoles = document.querySelectorAll(".holo-console");
  consoles.forEach((panel, index) => {
    const style = window.getComputedStyle(panel);
    const rect = panel.getBoundingClientRect();
    console.log(`🔮 Console #${index + 1} — ID: ${panel.id}`);
    console.log("→ display:", style.display, "| visibility:", style.visibility, "| opacity:", style.opacity);
    console.log("→ rect:", rect);
    console.log("→ z-index:", style.zIndex, "| position:", style.position, "| background:", style.backgroundColor);
  });
  console.log("✅ Final Resurrection Scan Complete.");
}, 1500);
// === Audit Block: Interference Sweep for Post-Load Panel Mutations ===
window.addEventListener("load", () => {
  console.log("🚨 Interference Sweep Initiated...");
  const panels = document.querySelectorAll('.holo-console');
  panels.forEach(panel => {
    const id = panel.id || 'unnamed';
    const role = panel.dataset.role || 'undefined';
    const zone = panel.dataset.gridArea || 'unset';
    const style = getComputedStyle(panel);
    console.log(`🧪 Panel: ${id} | Role: ${role} | Zone: ${zone} | Display: ${style.display} | Position: ${style.position}`);
  });
  console.log("✅ Sweep Complete — Check for reflow triggers, style overrides, or missing role commitments.");
});