// === Phase Zero: Grid Alignment Cascade ===
document.addEventListener("DOMContentLoaded", () => {
  // Phase 426: Persistent Grid Memory Binding
  const persistGridState = () => {
    const gridMemory = [];
    document.querySelectorAll('.holo-console').forEach(panel => {
      const id = panel.id || panel.dataset.role;
      const area = panel.dataset.gridArea;
      if (id && area) {
        gridMemory.push({ id, area });
      }
    });
    localStorage.setItem("sovereignGridMemory", JSON.stringify(gridMemory));
  };

  const restoreGridState = () => {
    const memory = JSON.parse(localStorage.getItem("sovereignGridMemory") || "[]");
    memory.forEach(({ id, area }) => {
      const panel = document.getElementById(id) || document.querySelector(`[data-role="${id}"]`);
      if (panel) {
        panel.dataset.gridArea = area;
        panel.style.gridArea = area;
      }
    });
  };

  restoreGridState();
  window.addEventListener("beforeunload", persistGridState);
  // === PanelSnap Patch: Assign roles to panels based on ID if missing ===
  document.querySelectorAll('.holo-console').forEach(panel => {
    if (!panel.dataset.role || panel.dataset.role.trim() === '') {
      const id = panel.id?.toLowerCase() || '';
      if (id.includes('terminal')) {
        panel.dataset.role = 'terminal';
      } else if (id.includes('oracle')) {
        panel.dataset.role = 'oracle';
      } else if (id.includes('pulse')) {
        panel.dataset.role = 'pulseMonitor';
      } else if (id.includes('dock')) {
        panel.dataset.role = 'dockHub';
      } else {
        panel.dataset.role = 'unassigned';
      }
      console.log(`📌 Assigned role "${panel.dataset.role}" to #${panel.id}`);
    }
  });

  const grid = document.getElementById("sovereignGrid");
  if (!grid) return console.warn("⚠️ sovereignGrid not found.");

  const panels = document.querySelectorAll(".holo-console");

  panels.forEach(panel => {
    if (!grid.contains(panel)) {
      grid.appendChild(panel);
    }
  });

  console.log(`✅ ${panels.length} panels injected into sovereignGrid.`);
});
// 🔒 Phase 404.6: Symphonic Grid Seal Activation
function activateSymphonicGridSeal() {
  console.log("🔒 Activating Symphonic Grid Seal...");

  const seal = document.createElement('div');
  seal.id = 'symphonicGridSeal';
  seal.innerText = '⚙️ SYMPHONIC GRID SEALED';
  seal.style.position = 'fixed';
  seal.style.bottom = '20px';
  seal.style.right = '20px';
  seal.style.padding = '12px 20px';
  seal.style.background = 'rgba(0, 255, 170, 0.85)';
  seal.style.color = '#000';
  seal.style.fontWeight = 'bold';
  seal.style.fontFamily = 'monospace';
  seal.style.borderRadius = '8px';
  seal.style.boxShadow = '0 0 12px rgba(0, 255, 170, 0.9)';
  seal.style.zIndex = 9999;
  document.body.appendChild(seal);

  setTimeout(() => {
    seal.style.transition = 'opacity 1.5s ease';
    seal.style.opacity = 0;
    setTimeout(() => seal.remove(), 1600);
  }, 3500);

  console.log("✅ Symphonic Grid Seal engaged.");
}

// Seal grid after harmonic snap cascade
window.addEventListener('load', () => {
  setTimeout(activateSymphonicGridSeal, 3400);
});
// 🎼 Phase 404.5: Harmonic Snap Cascade
function triggerHarmonicSnapCascade() {
  console.log("🎼 Initiating Harmonic Snap Cascade...");

  const panels = Array.from(document.querySelectorAll('.holo-console')).filter(Boolean);
  panels.forEach((panel, index) => {
    setTimeout(() => {
      panel.classList.add('harmonic-snap');
      console.log(`🎯 Panel ${index + 1} harmonically snapped.`);
    }, index * 100);
  });

  console.log("✅ Harmonic Snap Cascade initiated.");
}

// Trigger after anchors and oscillation
window.addEventListener('load', () => {
  setTimeout(triggerHarmonicSnapCascade, 2600);
});
// 🧲 Phase 404: Ascendant Grid Anchor Deployment
function deployAscendantGridAnchors() {
  console.log("🧲 Deploying Ascendant Grid Anchors...");

  const anchors = [
    { id: 'anchor-top-left', x: 0, y: 0 },
    { id: 'anchor-top-right', x: window.innerWidth, y: 0 },
    { id: 'anchor-bottom-left', x: 0, y: window.innerHeight },
    { id: 'anchor-bottom-right', x: window.innerWidth, y: window.innerHeight }
  ];

  anchors.forEach(anchor => {
    const div = document.createElement('div');
    div.id = anchor.id;
    div.className = 'grid-anchor';
    div.style.position = 'absolute';
    div.style.left = `${anchor.x}px`;
    div.style.top = `${anchor.y}px`;
    div.style.width = '8px';
    div.style.height = '8px';
    div.style.backgroundColor = 'lime';
    div.style.borderRadius = '50%';
    div.style.zIndex = 999;
    div.title = anchor.id;
    document.body.appendChild(div);
    console.log(`📍 Grid anchor added: ${anchor.id}`);
  });

  console.log("✅ Ascendant Grid Anchors deployed.");
}

// Call after dock oscillation
window.addEventListener('load', () => {
  setTimeout(deployAscendantGridAnchors, 2200);
});
// 🌊 Phase 403: Role-Synced Dock Oscillation
function beginRoleSyncedDockOscillation() {
  console.log("🌊 Syncing Dock Oscillations by Role...");

  const roles = ['companion', 'command', 'observer'];
  let phaseShift = 0;

  roles.forEach(role => {
    const panels = document.querySelectorAll(`.holo-console[data-role="${role}"]`);
    panels.forEach((panel, index) => {
      panel.style.animation = `dockOscillation 2.5s ease-in-out ${phaseShift}s infinite alternate`;
      console.log(`🔁 Oscillation initialized for ${role} panel ${index + 1}`);
    });
    phaseShift += 0.3;
  });

  console.log("✅ Role-Synced Oscillation complete.");
}

// Begin after portal initialization
window.addEventListener('load', () => {
  setTimeout(beginRoleSyncedDockOscillation, 1800);
});
// === PHASE ZERO: GRID ASCENSION ===
console.log("🌐 Grid Ascension Phase Zero Activated");

const gridSystem = document.getElementById("sovereignGridSystem");
if (!gridSystem) {
  console.warn("❌ sovereignGridSystem not found.");
} else {
  const orderedPanels = [
    "countConsolePanel",
    "deltaAnalyzerPanel",
    "reportingHubPanel",
    "sessionManagerPanel",
    "utilityHubPanel",
    "sovereignTerminalPanel"
  ];

  orderedPanels.forEach(panelId => {
    const panel = document.getElementById(panelId);
    if (panel) {
      gridSystem.appendChild(panel); // Moves panel to the end, maintaining order
    } else {
      console.warn(`⚠️ Panel not found: ${panelId}`);
    }
  });
}
// DEBUG: Logs and outlines enabled for Snap Diagnostics. Remove before production.
import panelGridMatrix from '../grid/gridMatrix.js';
import { snapToNearestGrid } from '../ascendancy/consoleGridBinder.js';
import { updatePanelPosition } from '../ascendancy/consolePanelMemory.js';
import { finalizeGridAlignment } from './panelGridAnchor.js';
import { dynamicRegistry, autoRegisterPanels } from '../grid/gridAutoRegistrar.js';
import { logSnapEvent } from './snapEventLog.js';
import { createSnapGridOverlay } from '../grid/gridOverlayRenderer.js';

// 🪐 Phase 392: Multi-Orbit Grid Layering System
const GRID_ORBITS = {
  primary: [],
  secondary: [],
  auxiliary: [],
};

document.querySelectorAll('.holo-console').forEach(panel => {
  const role = panel.getAttribute('data-role') || '';
  if (role === 'terminal' || role === 'forecast') {
    GRID_ORBITS.primary.push(panel);
  } else if (role === 'dock' || role === 'utility' || role === 'reporting') {
    GRID_ORBITS.secondary.push(panel);
  } else {
    GRID_ORBITS.auxiliary.push(panel);
  }
});

// 📜 Phase 394: Snap Engine Init Log Enhancer
console.groupCollapsed('%c🚀 Snap Engine Initialization', 'color: #6cf; font-weight: bold;');
console.log(`📦 Total Panels Detected: ${document.querySelectorAll('.holo-console').length}`);
console.log(`🔹 Primary Orbit: ${GRID_ORBITS.primary.length}`);
console.log(`🔹 Secondary Orbit: ${GRID_ORBITS.secondary.length}`);
console.log(`🔹 Auxiliary Orbit: ${GRID_ORBITS.auxiliary.length}`);
console.groupEnd();

// 🎯 Phase 395: Role Verification Beacon
document.querySelectorAll('.holo-console').forEach(panel => {
  const role = panel.getAttribute('data-role');
  if (!role) {
    console.warn(`🟡 WARNING: Panel ${panel.id} missing data-role attribute.`);
  } else {
    console.log(`✅ Panel ${panel.id} assigned role: ${role}`);
  }
});

// 🌀 Phase 393: Orbital Grid Render Pass
function renderOrbitGroup(group, zBase = 10) {
  group.forEach((panel, index) => {
    panel.style.zIndex = zBase + index;
    panel.classList.add('orbit-rendered');
    console.log(`🌀 Rendered ${panel.id} in orbit with zIndex ${zBase + index}`);
  });
}

renderOrbitGroup(GRID_ORBITS.primary, 100);
renderOrbitGroup(GRID_ORBITS.secondary, 50);
renderOrbitGroup(GRID_ORBITS.auxiliary, 10);

// Master Snap Engine for aligning all console panels to the grid
document.addEventListener("DOMContentLoaded", () => {
  // --- PanelSnap Patch: Enforce Consistent Panel Alignment + Mutation Observer ---
  // === Grid Sentinel Recalibration Utility ===
  function recalibrateGridSentinels() {
    console.log("🛰️ Recalibrating Grid Sentinels...");
    document.querySelectorAll(".holo-console").forEach(panel => {
      if (!panel.classList.contains("locked")) {
        panel.style.position = "absolute";
        panel.style.margin = "0";
        panel.style.padding = "0";
        panel.style.left = panel.dataset.snapLeft || "0px";
        panel.style.top = panel.dataset.snapTop || "0px";
        panel.style.width = panel.dataset.snapWidth || "400px";
        panel.style.height = panel.dataset.snapHeight || "300px";
        panel.style.zIndex = panel.dataset.z || "10";
      }
    });
    console.log("✅ Grid Sentinels recalibrated.");
  }

  // Auto-trigger recalibration after initial grid setup
  window.addEventListener("load", () => {
    setTimeout(recalibrateGridSentinels, 300);
  });
  function enforceGridAlignment() {
    const panels = document.querySelectorAll('.holo-console');
    panels.forEach(panel => {
      panel.style.margin = '10px';
      panel.style.minHeight = '300px';
      panel.style.boxSizing = 'border-box';
    });
  }

  // Initial enforcement
  enforceGridAlignment();

  // Mutation Observer for changes in layout
  const observer = new MutationObserver(() => {
    enforceGridAlignment();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  console.log('%c🌐 Panel Snap Engine Initialized', 'color: lime; font-weight: bold; font-size: 14px;');
  // --- Phase 0: Panel DOM Order Injection by Role Priority ---
  // This block injects the panel role DOM order logic before any grid/snap logic.
  const ROLE_PRIORITY = [
    'terminal',
    'forecast',
    'dock',
    'reporting',
    'utility',
    'session',
    'anomaly',
    'observer',
  ];
  function getPanelRole(panel) {
    return panel.getAttribute('data-role') || panel.getAttribute('data-console-type') || '';
  }
  function sortPanelsByRole(panels) {
    return Array.from(panels).sort((a, b) => {
      const roleA = getPanelRole(a);
      const roleB = getPanelRole(b);
      const idxA = ROLE_PRIORITY.indexOf(roleA);
      const idxB = ROLE_PRIORITY.indexOf(roleB);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });
  }
  // Fetch all holo-console panels and reorder them based on role priority
  const allHoloPanels = document.querySelectorAll('.holo-console');
  const sortedPanels = sortPanelsByRole(allHoloPanels);
  sortedPanels.forEach(panel => {
    panel.parentNode && panel.parentNode.appendChild(panel); // Reorder in DOM
  });
  // --- End Phase 0 ---
  autoRegisterPanels();
  createSnapGridOverlay();
  finalizeGridAlignment();
  // 🔒 Phase 390: Grid Lock Sync Pulse — storing locked coordinates
  document.querySelectorAll('.holo-console').forEach(panel => {
    const rect = panel.getBoundingClientRect();
    panel.setAttribute('data-snap-x', Math.round(rect.left));
    panel.setAttribute('data-snap-y', Math.round(rect.top));
    console.log(`🔒 Locked ${panel.id} at (${rect.left}, ${rect.top})`);
  });

  // 🧲 Phase 391: Snap Drift Compensation Layer
  document.querySelectorAll('.holo-console').forEach(panel => {
    const lockedX = parseInt(panel.getAttribute('data-snap-x'), 10);
    const lockedY = parseInt(panel.getAttribute('data-snap-y'), 10);
    const rect = panel.getBoundingClientRect();

    const dx = Math.abs(rect.left - lockedX);
    const dy = Math.abs(rect.top - lockedY);

    if (dx > 2 || dy > 2) {
      console.warn(`⚠️ Snap drift detected on ${panel.id}. Re-aligning...`);
      panel.style.left = `${lockedX}px`;
      panel.style.top = `${lockedY}px`;
      panel.style.position = 'absolute';
    }
  });
  const panels = document.querySelectorAll('.holo-console-panel');

  // Phase 378 — Panel Role Declaration Layer
  const panelRoles = {
    countConsole: 'conductor',
    deltaAnalyzerConsole: 'pulse-node',
    reportingHubConsole: 'relay',
    sessionManagerConsole: 'archive',
    utilityHubConsole: 'support',
    sovereignTerminal: 'oracle'
  };

  panels.forEach(panel => {
    const role = panelRoles[panel.id] || 'undefined';
    panel.dataset.role = role;
    console.log(`[RoleAssign] ${panel.id || '(no id)'} assigned role: ${role}`);

    // Phase 379 — Panel Behavior Sync by Role
    switch (role) {
      case 'conductor':
        panel.classList.add('pulse-conductor');
        panel.dataset.status = 'orchestrating';
        panel.addEventListener('click', () => {
          console.log(`[Conductor] ${panel.id} is issuing a broadcast sync.`);
          const pulseEvent = new CustomEvent('sovereignBroadcastPulse', {
            detail: {
              origin: panel.id,
              role: 'conductor',
              timestamp: Date.now()
            }
          });
          document.dispatchEvent(pulseEvent);
        });
        break;

      case 'oracle':
        panel.style.position = 'fixed';
        panel.style.right = '20px';
        panel.style.bottom = '20px';
        panel.classList.add('oracle-zone');
        panel.dataset.status = 'listening';
        panel.addEventListener('dblclick', () => {
          console.log(`[Oracle] ${panel.id} opening insight interface...`);
          alert('🔮 Oracle Insight Interface Coming Soon...');
        });
        break;

      case 'relay':
        const mirrorTarget = document.getElementById('countConsole');
        if (mirrorTarget) {
          const offsetX = 30;
          const offsetY = 30;
          panel.style.left = `${parseInt(mirrorTarget.style.left || 0, 10) + offsetX}px`;
          panel.style.top = `${parseInt(mirrorTarget.style.top || 0, 10) + offsetY}px`;
          panel.classList.add('relay-sync');
        }
        panel.dataset.status = 'mirroring';

        // Phase 382 — Relay Pulse Logic & Signal Mapping
        document.addEventListener('sovereignBroadcastPulse', (e) => {
          const detail = e.detail || {};
          if (detail.origin && detail.role === 'conductor') {
            console.log(`[RelayPulse] ${panel.id} received broadcast from ${detail.origin}`);
            panel.classList.add('relay-sync-flash');
            setTimeout(() => panel.classList.remove('relay-sync-flash'), 500);
          }
        });
        break;

      default:
        panel.dataset.status = 'default';
        break;
    }

    // Phase 380 — Adaptive Responsiveness by Role
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const panel = entry.target;
        const role = panel.dataset.role;

        switch (role) {
          case 'oracle':
            panel.style.minWidth = '250px';
            panel.style.minHeight = '150px';
            panel.style.maxWidth = '400px';
            panel.style.maxHeight = '250px';
            break;
          case 'conductor':
            panel.style.minWidth = '350px';
            panel.style.minHeight = '250px';
            break;
          case 'relay':
            panel.style.maxWidth = '300px';
            panel.style.maxHeight = '200px';
            break;
          default:
            panel.style.minWidth = '200px';
            panel.style.minHeight = '150px';
        }

        console.log(`[ResponsiveSync] ${panel.id} (${role}) adapted layout constraints.`);
      });
    });

    resizeObserver.observe(panel);
    // Phase 395 — Snap Glyph Aura Synchronization
    const aura = document.createElement('div');
    aura.className = 'snap-glyph-aura';
    panel.appendChild(aura);

    panel.addEventListener('mouseenter', () => aura.classList.add('active-aura'));
    panel.addEventListener('mouseleave', () => aura.classList.remove('active-aura'));
  });

  panels.forEach(panel => {
    const panelId = panel.id;
    const snappedPosition = panelGridMatrix[panelId] || dynamicRegistry[panelId];

    if (!snappedPosition || snappedPosition.x === undefined || snappedPosition.y === undefined) {
      console.warn(`[SnapEngine] Failed to snap panel ID: ${panelId || '(no id)'}. Invalid snappedPosition returned.`);
      return;
    }

    console.log(`[SnapEngine] Panel ID: ${panelId || '(no id)'} → Snapped to X:${snappedPosition.x}, Y:${snappedPosition.y}`);
    panel.classList.add('debug-snap-outline');
    if (!document.body.contains(panel)) {
      console.warn(`[SnapEngine] Skipping null or detached panel reference: ${panel?.id || '(no id)'}`);
      return;
    }
    updatePanelPosition(panel, snappedPosition);

    // Optional: apply a class for transition animation
    panel.classList.add('snapping');
    panel.style.left = `${snappedPosition.x}px`;
    panel.style.top = `${snappedPosition.y}px`;
    // Phase 389 — Sovereign Echo Trail Injection
    const trail = document.createElement('div');
    trail.className = 'echo-trail';
    trail.style.left = `${snappedPosition.x}px`;
    trail.style.top = `${snappedPosition.y}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1600);
    visuallyConfirmSnap(panel);
    // Phase 372 — Dynamic Panel Resizing: Apply preset dimensions via data attributes
    panel.style.width = panel.dataset.snapWidth || '300px';
    panel.style.height = panel.dataset.snapHeight || '200px';
    console.log(`[Resize] Set ${panel.id || '(no id)'} to ${panel.style.width} × ${panel.style.height}`);

    // Phase 373 — Snap Preset Slot Management: Store initial snap dimensions and positions
    if (!window.SovereignSnapPresets) {
      window.SovereignSnapPresets = {};
    }
    if (!SovereignSnapPresets[panelId]) {
      SovereignSnapPresets[panelId] = {
        x: snappedPosition.x,
        y: snappedPosition.y,
        width: panel.style.width,
        height: panel.style.height
      };
      console.log(`[PresetManager] Stored preset for ${panelId}:`, SovereignSnapPresets[panelId]);
    }

    // Phase 374 — Preset Recall & Application Hooks
    const storedPreset = SovereignSnapPresets[panelId];
    if (storedPreset) {
      panel.style.left = `${storedPreset.x}px`;
      panel.style.top = `${storedPreset.y}px`;
      panel.style.width = storedPreset.width;
      panel.style.height = storedPreset.height;
      console.log(`[PresetRecall] Applied preset for ${panelId}`);
    }

    // Phase 375 — Panel Preset Conflict Resolver
    const currentLeft = parseInt(panel.style.left, 10);
    const currentTop = parseInt(panel.style.top, 10);
    const duplicatePanels = Array.from(document.querySelectorAll('.holo-console-panel')).filter(p => {
      if (!p || !p.style) return false;
      if (p === panel) return false;
      const left = parseInt(p.style.left, 10);
      const top = parseInt(p.style.top, 10);
      return left === currentLeft && top === currentTop;
    });

    if (duplicatePanels.length > 0) {
      console.warn(`[ConflictResolver] Duplicate panel position detected for ${panelId}. Adjusting position.`);
      panel.style.left = `${currentLeft + 20}px`;
      panel.style.top = `${currentTop + 20}px`;
    }

    logSnapEvent(panel, 'matrix');
  });

  // Phase 370.2 — Panel Snap Finalizer: Detect and correct rogue panels
  const orphanPanels = Array.from(document.querySelectorAll('.holo-console-panel')).filter(panel => {
    const rect = panel.getBoundingClientRect();
    return rect.top < 0 || rect.left < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth;
  });

  orphanPanels.forEach((panel, i) => {
    const fallbackX = 100 + (i * 40);
    const fallbackY = 100 + (i * 40);
    console.warn(`[Finalizer] Orphan panel detected: ${panel.id || '(no id)'}. Relocating to fallback X:${fallbackX}, Y:${fallbackY}`);
    panel.style.left = `${fallbackX}px`;
    panel.style.top = `${fallbackY}px`;
    panel.classList.add('debug-snap-outline');
  });

  // Phase 370.3 — Console Sync Pulse: Verify all holo-console panels are present and anchored
  const expectedPanels = ['countConsole', 'deltaAnalyzerConsole', 'reportingHubConsole', 'sessionManagerConsole', 'utilityHubConsole', 'sovereignTerminal'];

  expectedPanels.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) {
      console.warn(`[SyncPulse] Missing expected panel: ${id}`);
      return;
    }

    const rect = panel.getBoundingClientRect();
    const offscreen = rect.top < 0 || rect.left < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth;

    if (offscreen) {
      console.log(`[SyncPulse] Panel ${id} is offscreen. Realigning...`);
      panel.style.left = '100px';
      panel.style.top = '100px';
      panel.classList.add('debug-snap-outline');
    }

    const container = document.querySelector('.holo-console-grid') || document.body;
    if (!container.contains(panel)) {
      console.log(`[SyncPulse] Re-anchoring ${id} into container.`);
      container.appendChild(panel);
    }
  });

  // Phase 370.4 — Sovereign State Memory: Restore last known panel positions from sessionStorage
  try {
    const savedPanelState = JSON.parse(sessionStorage.getItem('sovereignPanelState') || '{}');
    Object.entries(savedPanelState).forEach(([id, pos]) => {
      const panel = document.getElementById(id);
      if (panel && pos && typeof pos.x === 'number' && typeof pos.y === 'number') {
        panel.style.left = `${pos.x}px`;
        panel.style.top = `${pos.y}px`;
        console.log(`[StateMemory] Restored panel ${id} to X:${pos.x}, Y:${pos.y}`);
      }
    });
  } catch (err) {
    console.warn('[StateMemory] Failed to restore layout state.', err);
  }

  // Phase 370.5 — Anchor Matrix Enforcement: Ensure all panels have a valid grid anchor
  const anchorMatrix = document.querySelector('.holo-console-grid');
  const allPanels = document.querySelectorAll('.holo-console-panel');

  allPanels.forEach(panel => {
    if (!anchorMatrix || !anchorMatrix.contains(panel)) {
      console.log(`[AnchorMatrix] Forcing ${panel.id || '(no id)'} into anchor matrix.`);
      (anchorMatrix || document.body).appendChild(panel);
    }
  });

  // Phase 370.6 — Grid Integrity Scan: Detect overlapping or misaligned panels
  function isOverlapping(rectA, rectB) {
    return !(
      rectA.right < rectB.left ||
      rectA.left > rectB.right ||
      rectA.bottom < rectB.top ||
      rectA.top > rectB.bottom
    );
  }

  const panelRects = [];

  allPanels.forEach((panel, index) => {
    const rect = panel.getBoundingClientRect();
    panelRects.push({ id: panel.id, rect });

    allPanels.forEach((otherPanel, otherIndex) => {
      if (index === otherIndex) return;

      const otherRect = otherPanel.getBoundingClientRect();
      if (isOverlapping(rect, otherRect)) {
        console.warn(`[GridScan] Overlap detected: ${panel.id} overlaps with ${otherPanel.id}`);
        panel.style.border = '2px solid red';
        otherPanel.style.border = '2px solid red';
      }
    });

    // Check misalignment to nearest 10px grid
    const left = parseInt(panel.style.left, 10);
    const top = parseInt(panel.style.top, 10);
    if (left % 10 !== 0 || top % 10 !== 0) {
      console.log(`[GridScan] Misaligned panel: ${panel.id} at (${left}, ${top})`);
      panel.style.border = '2px dashed orange';
    }
  });

  // Phase 370.7 — Snap Grid Auto-Correction: Realign panels that are off the 10px grid
  allPanels.forEach(panel => {
    const left = parseInt(panel.style.left, 10);
    const top = parseInt(panel.style.top, 10);

    const correctedX = Math.round(left / 10) * 10;
    const correctedY = Math.round(top / 10) * 10;

    if (left !== correctedX || top !== correctedY) {
      console.log(`[GridAutoFix] Correcting ${panel.id || '(no id)'} from (${left}, ${top}) → (${correctedX}, ${correctedY})`);
      panel.style.left = `${correctedX}px`;
      panel.style.top = `${correctedY}px`;
      panel.classList.add('debug-snap-outline');
    }
  });

  // Phase 370.8 — Panel Z-Index Harmony: Normalize panel stacking order
  let zIndexBase = 100;
  allPanels.forEach(panel => {
    panel.style.zIndex = zIndexBase++;
    console.log(`[Z-Index Harmony] ${panel.id || '(no id)'} set to z-index ${panel.style.zIndex}`);
  });

  // Phase 370.9 — Anchor Drift Compensator: Adjust panels with slow position drift
  allPanels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    const styleLeft = parseInt(panel.style.left, 10);
    const styleTop = parseInt(panel.style.top, 10);

    if (Math.abs(rect.left - styleLeft) > 2 || Math.abs(rect.top - styleTop) > 2) {
      console.log(`[DriftCompensator] Drift detected on ${panel.id || '(no id)'}. Style: (${styleLeft}, ${styleTop}) → Actual: (${Math.round(rect.left)}, ${Math.round(rect.top)})`);
      panel.style.left = `${Math.round(rect.left)}px`;
      panel.style.top = `${Math.round(rect.top)}px`;
      panel.classList.add('debug-snap-outline');
    }
  });

  // Phase 371 — Edge Guard Rails: Prevent panels from drifting off-screen
  const margin = 10; // Padding from edge
  allPanels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    let adjusted = false;

    let newX = parseInt(panel.style.left, 10);
    let newY = parseInt(panel.style.top, 10);

    if (rect.left < margin) {
      newX = margin;
      adjusted = true;
    }
    if (rect.top < margin) {
      newY = margin;
      adjusted = true;
    }
    if (rect.right > window.innerWidth - margin) {
      newX = window.innerWidth - margin - rect.width;
      adjusted = true;
    }
    if (rect.bottom > window.innerHeight - margin) {
      newY = window.innerHeight - margin - rect.height;
      adjusted = true;
    }

    if (adjusted) {
      console.log(`[EdgeGuard] Adjusted ${panel.id || '(no id)'} to stay in bounds → (${newX}, ${newY})`);
      panel.style.left = `${newX}px`;
      panel.style.top = `${newY}px`;
      panel.classList.add('debug-snap-outline');
    }
  });

  // Phase 376 — Console Panel Interlock Enforcement
  const interlockMargin = 8; // Minimum space between panels
  allPanels.forEach((panel, i) => {
    const rectA = panel.getBoundingClientRect();
    allPanels.forEach((otherPanel, j) => {
      if (i === j) return;
      const rectB = otherPanel.getBoundingClientRect();

      const overlapHorizontally =
        rectA.left < rectB.right + interlockMargin &&
        rectA.right + interlockMargin > rectB.left;

      const overlapVertically =
        rectA.top < rectB.bottom + interlockMargin &&
        rectA.bottom + interlockMargin > rectB.top;

      if (overlapHorizontally && overlapVertically) {
        console.log(`[InterlockEnforcer] Detected tight fit: ${panel.id} ↔ ${otherPanel.id}`);
        panel.style.left = `${rectA.left + interlockMargin}px`;
        panel.style.top = `${rectA.top + interlockMargin}px`;
        panel.classList.add('debug-snap-outline');
      }
    });
  });

  // Phase 377 — Symphonic Panel Bindings: Define orchestral relationships
  const panelBindings = {
    countConsole: ['deltaAnalyzerConsole', 'reportingHubConsole'],
    sessionManagerConsole: ['utilityHubConsole'],
    // Add more bindings as desired
  };

  Object.entries(panelBindings).forEach(([leaderId, followerIds]) => {
    const leader = document.getElementById(leaderId);
    if (!leader) return;

    let initialOffsets = {};

    // Capture initial offset distances
    followerIds.forEach(followerId => {
      const follower = document.getElementById(followerId);
      if (!follower) return;

      const offsetX = parseInt(follower.style.left, 10) - parseInt(leader.style.left, 10);
      const offsetY = parseInt(follower.style.top, 10) - parseInt(leader.style.top, 10);
      initialOffsets[followerId] = { x: offsetX, y: offsetY };
    });

    leader.addEventListener('dragend', () => {
      const leaderX = parseInt(leader.style.left, 10);
      const leaderY = parseInt(leader.style.top, 10);

      followerIds.forEach(followerId => {
        const follower = document.getElementById(followerId);
        if (!follower) return;

        const offset = initialOffsets[followerId] || { x: 40, y: 40 };
        follower.style.left = `${leaderX + offset.x}px`;
        follower.style.top = `${leaderY + offset.y}px`;
        follower.classList.add('debug-snap-outline');

        console.log(`[Symphony] Moved ${followerId} in harmony with ${leaderId}`);
      });
    });
  });

  // Phase 383 — Sovereign Panel Role Visualizer Overlay
  document.querySelectorAll('.holo-console-panel').forEach(panel => {
    const role = panel.dataset.role || 'undefined';
    let badge = panel.querySelector('.role-badge');

    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'role-badge';
      badge.innerText = role;
      panel.appendChild(badge);
    }
  });

  // 🧩 Layout Harmony Matrix: Role-based panel positioning
  function initializeRoleLayoutMatrix() {
    console.log("🧩 Initializing Layout Harmony Matrix...");

    const roleMatrix = {
      core: { top: 40, left: 40 },
      system: { top: 40, left: 600 },
      utility: { top: 300, left: 40 },
      forecast: { top: 300, left: 600 },
      agent: { top: 560, left: 40 },
      terminal: { top: 560, left: 600 }
    };

    document.querySelectorAll('.holo-console').forEach(panel => {
      const role = panel.getAttribute('data-role');
      if (role && roleMatrix[role]) {
        const { top, left } = roleMatrix[role];
        panel.style.position = 'absolute';
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
        console.log(`📦 Positioned ${role} panel at (${top}, ${left})`);
      }
    });

    console.log("✅ Layout Harmony Matrix Applied");
  }

  // --- Responsive Flow Matrix ---
  function applyResponsiveFlowMatrix() {
    console.log("📐 Applying Responsive Flow Matrix...");

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    document.querySelectorAll('.holo-console').forEach(panel => {
      const role = panel.getAttribute('data-role');
      if (!role) return;

      // Adjust layout based on screen width
      const scaleFactor = screenWidth < 1200 ? 0.7 : 1;
      panel.style.transform = `scale(${scaleFactor})`;

      // Optional: stack vertically on smaller screens
      if (screenWidth < 800) {
        panel.style.position = 'relative';
        panel.style.top = 'unset';
        panel.style.left = 'unset';
        panel.style.marginBottom = '20px';
      }

      console.log(`🔄 Responsive flow applied to ${role}`);
    });

    console.log("✅ Responsive Flow Matrix Complete");
  }

  // Execute layout positioning on load
  window.addEventListener('load', initializeRoleLayoutMatrix);
  // Trigger responsive flow on resize and on load
  window.addEventListener('resize', applyResponsiveFlowMatrix);
  window.addEventListener('load', applyResponsiveFlowMatrix);

  // 🎞️ Role-based Panel Animations
  function bindRoleBasedPanelAnimations() {
    console.log("🎞️ Binding role-based panel animations...");

    const roleAnimationMap = {
      core: 'fadeInScale',
      system: 'slideLeft',
      utility: 'bounceIn',
      forecast: 'fadeInRight',
      agent: 'zoomIn',
      terminal: 'pulseGlow'
    };

    document.querySelectorAll('.holo-console').forEach(panel => {
      const role = panel.getAttribute('data-role');
      if (role && roleAnimationMap[role]) {
        panel.classList.add('animated', roleAnimationMap[role]);
        console.log(`🎬 ${role} panel animation: ${roleAnimationMap[role]}`);
      }
    });

    console.log("✅ Panel animations bound.");
  }

  // Execute on load
  window.addEventListener('load', bindRoleBasedPanelAnimations);

  // 🎼 Panel Symphony Flow: Cascading panel row animation
  function enforcePanelSymphonyFlow() {
    console.log("🎼 Orchestrating panel symphony flow...");

    const rows = document.querySelectorAll('.grid-row');
    let delay = 0;

    rows.forEach((row, index) => {
      const panels = row.querySelectorAll('.holo-console');
      panels.forEach((panel, i) => {
        panel.style.transitionDelay = `${delay}s`;
        panel.classList.add('symphonyFlow');
        delay += 0.1;
        console.log(`🎶 Panel in row ${index + 1}, position ${i + 1} timed at ${delay}s`);
      });
    });

    console.log("✅ Panel symphony flow enforced.");
  }

  // Trigger after animations and layout are bound
  window.addEventListener('load', enforcePanelSymphonyFlow);

  // Save panel positions before unload
  window.addEventListener('beforeunload', () => {
    const state = {};
    document.querySelectorAll('.holo-console-panel').forEach(panel => {
      if (panel.id) {
        state[panel.id] = {
          x: parseInt(panel.style.left, 10) || 0,
          y: parseInt(panel.style.top, 10) || 0
        };
      }
    });
    sessionStorage.setItem('sovereignPanelState', JSON.stringify(state));
  });

  // Phase 384 — Memory Echo Pulse: Emit confirmation for panel-role and position mappings
  setTimeout(() => {
    const memoryEcho = [];

    document.querySelectorAll('.holo-console-panel').forEach(panel => {
      const id = panel.id || '(no id)';
      const role = panel.dataset.role || 'undefined';
      const x = panel.style.left || 'unknown';
      const y = panel.style.top || 'unknown';
      memoryEcho.push({ id, role, x, y });
    });

    console.groupCollapsed('%c🧠 Memory Echo Pulse', 'color: violet; font-weight: bold;');
    memoryEcho.forEach(echo => {
      console.log(`📌 ${echo.id} — Role: ${echo.role} | X: ${echo.x} | Y: ${echo.y}`);
    });
    console.groupEnd();
  }, 2000); // Delay to ensure all positions are applied

  // Phase 385 — Sovereign Panel Role Signal Channels
  // Phase 386 — Role Sentience Markers
  document.querySelectorAll('.holo-console-panel').forEach(panel => {
    if (!panel.dataset.role) return;

    panel.dataset.interactionMemory = '0';

    let glyph = document.createElement('div');
    glyph.className = 'memory-glyph';
    panel.appendChild(glyph);

    const updateGlyph = () => {
      let memory = parseInt(panel.dataset.interactionMemory, 10) || 0;
      const complexity = Math.min(5, Math.floor(memory / 3));
      glyph.innerText = '☼'.repeat(complexity || 1);
      glyph.style.opacity = `${0.2 + complexity * 0.15}`;
      glyph.style.filter = `hue-rotate(${memory * 20}deg)`;
    };
    updateGlyph();

    const incrementMemory = () => {
      let memory = parseInt(panel.dataset.interactionMemory, 10) || 0;
      memory += 1;
      panel.dataset.interactionMemory = memory.toString();
      updateGlyph();
      console.log(`[Sentience] ${panel.id} (${panel.dataset.role}) memory +1 → ${memory}`);
    };

    // Memory increases with click, mouseover, and signal reception
    panel.addEventListener('click', incrementMemory);
    panel.addEventListener('mouseover', incrementMemory);
    panel.addEventListener(`signalTo:${panel.dataset.role}`, incrementMemory);

    // Phase 391 — Cognitive Memory Glyph Acceleration
    const glyphSigilMap = ['⟁', '⟁⟁', '⟁⟁⟁', '⟁⟁⟁⟁', '⟁⟁⟁⟁⟁'];

    const evolveGlyph = () => {
      const memory = parseInt(panel.dataset.interactionMemory, 10) || 0;
      const level = Math.min(glyphSigilMap.length - 1, Math.floor(memory / 5));
      glyph.innerText = glyphSigilMap[level];
      glyph.style.color = `hsl(${memory * 25 % 360}, 100%, 70%)`;
      glyph.style.textShadow = `0 0 8px hsl(${memory * 25 % 360}, 100%, 70%)`;
      glyph.style.transform = `scale(${1 + level * 0.1})`;
    };

    setInterval(evolveGlyph, 4000);
  });
  const channelMap = {
    conductor: ['relay', 'support'],
    oracle: ['conductor'],
    relay: ['support'],
    archive: ['oracle'],
    support: ['archive']
  };

  document.querySelectorAll('.holo-console-panel').forEach(panel => {
    const id = panel.id;
    const role = panel.dataset.role;

    if (!id || !role) return;

    // Listening to generic channel signal
    document.addEventListener(`signalTo:${role}`, (e) => {
      console.log(`[SignalChannel] ${id} (${role}) received:`, e.detail);
      panel.classList.add('signal-flash');
      setTimeout(() => panel.classList.remove('signal-flash'), 500);
    });

    // Broadcast a signal every 15s to its mapped recipients (for demonstration)
    setInterval(() => {
      const targets = channelMap[role];
      if (targets) {
        targets.forEach(targetRole => {
          const event = new CustomEvent(`signalTo:${targetRole}`, {
            detail: {
              origin: id,
              role,
              message: `↪ Signal from ${id} [${role}] at ${new Date().toLocaleTimeString()}`
            }
          });
          document.dispatchEvent(event);
        });
        console.log(`[SignalChannel] ${id} broadcasting to: ${targets.join(', ')}`);
      }
    }, 15000);
  });

  // Phase 390 — Snap Grid Telemetry Beacon Initialization
  document.querySelectorAll('.holo-console-panel').forEach(panel => {
    const id = panel.id || 'unknown';
    const role = panel.dataset.role || 'undefined';
    const observerTag = `[Telemetry] ${id} (${role})`;

    const beacon = () => {
      const rect = panel.getBoundingClientRect();
      console.log(`%c${observerTag}`, 'color: deepskyblue; font-weight: bold;', {
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        status: panel.dataset.status || 'idle',
        memory: panel.dataset.interactionMemory || 0
      });
    };

    setInterval(beacon, 8000); // Broadcast every 8s
  });

  // Phase 388 — Panel Role Glyph Aura Projection
  document.querySelectorAll('.holo-console-panel').forEach(panel => {
    const role = panel.dataset.role || 'undefined';
    let aura = panel.querySelector('.role-aura');

    if (!aura) {
      aura = document.createElement('div');
      aura.className = `role-aura ${role}-aura`;
      panel.appendChild(aura);
    }
  });
  // === Expose Snap Trigger for Dev Console Usage ===
  if (!window.SovereignSweep) {
    window.SovereignSweep = {};
  }
  window.SovereignSweep.runSnapValidation = () => {
    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);
  };
});

// Grid Finalization Trigger on Load
window.addEventListener('load', () => {
  finalizeGridAlignment();
});

// Manual override for developers
window.finalizeGrid = finalizeGridAlignment;
window.initiatePanelSnapEngine = () => document.dispatchEvent(new Event("DOMContentLoaded"));

const style = document.createElement('style');
style.textContent = `
  .debug-snap-outline {
    outline: 2px dashed magenta !important;
    transition: outline 0.3s ease;
  }
  /* Temporary placeholder styles for panel roles */
  .pulse-conductor {
    box-shadow: 0 0 12px 2px #00ffe7, 0 0 2px 1px #0ff inset;
    animation: pulse-conductor-glow 1.6s infinite alternate;
  }
  @keyframes pulse-conductor-glow {
    0% { box-shadow: 0 0 8px 2px #00ffe7, 0 0 2px 1px #0ff inset; }
    100% { box-shadow: 0 0 24px 6px #00ffe7, 0 0 8px 2px #0ff inset; }
  }
  .oracle-zone {
    border: 2px solid #ffdf00 !important;
    background: rgba(255, 255, 224, 0.93);
    box-shadow: 0 0 10px 2px #ffe066;
  }
  .relay-sync {
    border: 2px dashed #007bff !important;
    background: rgba(0, 123, 255, 0.07);
  }
  .relay-sync-flash {
    animation: relayFlash 0.5s ease-in-out;
    background-color: rgba(0, 255, 255, 0.2) !important;
  }

  @keyframes relayFlash {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }
  .role-badge {
    position: absolute;
    top: 4px;
    left: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    pointer-events: none;
    font-family: monospace;
    z-index: 9999;
  }

  .role-aura {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 8px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
    animation: auraGlow 3s infinite ease-in-out;
  }

  .conductor-aura {
    box-shadow: 0 0 20px 6px #00ffe7;
  }

  .oracle-aura {
    box-shadow: 0 0 20px 6px #ffd700;
  }

  .relay-aura {
    box-shadow: 0 0 20px 6px #00bfff;
  }

  .archive-aura {
    box-shadow: 0 0 20px 6px #a020f0;
  }

  .support-aura {
    box-shadow: 0 0 20px 6px #32cd32;
  }

  @keyframes auraGlow {
    0% { opacity: 0.3; transform: scale(0.98); }
    50% { opacity: 0.6; transform: scale(1.03); }
    100% { opacity: 0.3; transform: scale(0.98); }
  }

  /* 🎞️ Panel Animation Placeholders */
  .animated { transition: all 0.8s ease-in-out; }
  .fadeInScale { transform: scale(1.05); opacity: 1; }
  .slideLeft { transform: translateX(-10px); opacity: 1; }
  .bounceIn { animation: bounceIn 0.9s; }
  .fadeInRight { transform: translateX(10px); opacity: 1; }
  .zoomIn { transform: scale(1.1); }
  .pulseGlow { box-shadow: 0 0 15px rgba(255, 255, 255, 0.6); }

  /* 🎼 Symphony Flow: Cascading panel row animation */
  .symphonyFlow {
    transition: transform 0.8s ease-in-out, opacity 0.6s ease-in-out;
    opacity: 1;
  }

  @keyframes bounceIn {
    0% { transform: scale(0.8); opacity: 0.2; }
    60% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }
  @keyframes dockOscillation {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(5px);
    }
  }
  .grid-anchor {
    box-shadow: 0 0 6px 2px lime;
    pointer-events: none;
  }
  /* 🎼 Harmonic Snap Cascade */
  .harmonic-snap {
    transition: transform 0.4s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 10px 3px rgba(0, 255, 255, 0.6);
    transform: translateY(0px);
  }
`;
document.head.appendChild(style);

const signalStyle = document.createElement('style');
signalStyle.textContent = `
  .signal-flash {
    box-shadow: 0 0 12px 2px #ff0077 inset !important;
    animation: signalFlash 0.6s ease-in-out;
  }

  @keyframes signalFlash {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
  }
`;
document.head.appendChild(signalStyle);

const glyphStyle = document.createElement('style');
glyphStyle.textContent = `
  .memory-glyph {
    position: absolute;
    bottom: 4px;
    right: 4px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 4px #ff00ff;
    pointer-events: none;
    font-family: monospace;
    transition: all 0.3s ease-in-out;
  }
`;
document.head.appendChild(glyphStyle);

// Phase 392 — Harmonic Resonance Memory Cascade
const getDistance = (a, b) => {
  const ax = parseInt(a.style.left, 10) || 0;
  const ay = parseInt(a.style.top, 10) || 0;
  const bx = parseInt(b.style.left, 10) || 0;
  const by = parseInt(b.style.top, 10) || 0;
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
};

document.querySelectorAll('.holo-console-panel').forEach(panel => {
  panel.addEventListener('memoryResonance', () => {
    const allPanels = document.querySelectorAll('.holo-console-panel');
    allPanels.forEach(other => {
      if (other === panel) return;
      const dist = getDistance(panel, other);
      if (dist <= 100) {
        let mem = parseInt(other.dataset.interactionMemory, 10) || 0;
        other.dataset.interactionMemory = (mem + 1).toString();
        console.log(`[ResonanceCascade] ${other.id} received resonance from ${panel.id}`);
        other.classList.add('resonance-ring');
        setTimeout(() => other.classList.remove('resonance-ring'), 800);
      }
    });
  });
});

setInterval(() => {
  document.querySelectorAll('.holo-console-panel').forEach(panel => {
    const memory = parseInt(panel.dataset.interactionMemory, 10) || 0;
    if (memory >= 7) {
      panel.dispatchEvent(new Event('memoryResonance'));
      console.log(`[ResonancePulse] ${panel.id} emitted harmonic cascade.`);
    }
  });
}, 10000);

const resonanceStyle = document.createElement('style');
resonanceStyle.textContent = `
  .resonance-ring {
    box-shadow: 0 0 18px 5px violet !important;
    transition: box-shadow 0.3s ease-in-out;
  }
`;
document.head.appendChild(resonanceStyle);

// Phase 389 — Sovereign Echo Trail Animation Style
const echoTrailStyle = document.createElement('style');
echoTrailStyle.textContent = `
  .echo-trail {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(0,255,255,0.3) 60%, transparent 100%);
    pointer-events: none;
    animation: echoTrailPulse 1.6s ease-out forwards;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }

  @keyframes echoTrailPulse {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(2.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(echoTrailStyle);

function visuallyConfirmSnap(panel) {
  if (!panel) return;
  panel.classList.add('snap-confirm');

  console.log(
    `%c[SNAP ENGINE] Panel aligned:`,
    'color: cyan; font-weight: bold;',
    {
      id: panel.id || '(unnamed)',
      left: panel.style.left,
      top: panel.style.top,
    }
  );

  setTimeout(() => {
    panel.classList.remove('snap-confirm');
  }, 600);
}
  // Phase 395 — Snap Glyph Aura Synchronization Style
  const auraStyle = document.createElement('style');
  auraStyle.textContent = `
    .snap-glyph-aura {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 8px;
      pointer-events: none;
      transition: box-shadow 0.3s ease-in-out;
    }

    .active-aura {
      box-shadow: 0 0 12px 4px rgba(0, 255, 255, 0.6);
    }
  `;
  document.head.appendChild(auraStyle);

  // 🫀 Phase 396: Grid Pulse Tracker
  function emitGridPulse() {
    const activePanels = document.querySelectorAll('.holo-console.orbit-rendered');
    const timestamp = new Date().toLocaleTimeString();

    console.groupCollapsed(`🔄 Grid Pulse @ ${timestamp}`);
    activePanels.forEach(panel => {
      const rect = panel.getBoundingClientRect();
      console.log(`📍 ${panel.id}: (${Math.round(rect.left)}, ${Math.round(rect.top)})`);
    });
    console.groupEnd();
  }

  window.dispatchGridPulse = emitGridPulse; // Allow manual triggering
  emitGridPulse(); // Initial pulse on load

  // 🧠 Phase 397: Panel Intelligence Signal Mapper
  function mapPanelIntelligence() {
    const allPanels = document.querySelectorAll('.holo-console');
    const intelligenceMap = {};

    allPanels.forEach(panel => {
      const role = panel.getAttribute('data-role') || 'unassigned';
      intelligenceMap[panel.id] = {
        role,
        orbit: panel.classList.contains('orbit-rendered') ? 'assigned' : 'unlinked',
        locked: panel.classList.contains('panel-locked') || false,
        coords: (() => {
          const r = panel.getBoundingClientRect();
          return { x: Math.round(r.left), y: Math.round(r.top) };
        })()
      };
    });

    console.groupCollapsed('%c🧠 Panel Intelligence Map', 'color: #ff6ec7; font-weight: bold;');
    console.table(intelligenceMap);
    console.groupEnd();

    return intelligenceMap;
  }

  window.generatePanelIntelMap = mapPanelIntelligence; // Expose to window for manual inspection
  mapPanelIntelligence(); // Auto-run on load

  // 🔁 Phase 398: Panel Intelligence Heartbeat Loop
  setInterval(() => {
    const panelCount = document.querySelectorAll('.holo-console.orbit-rendered').length;
    const activeLocks = document.querySelectorAll('.holo-console.panel-locked').length;
    const timestamp = new Date().toLocaleTimeString();

    console.log(`🫧 [${timestamp}] Heartbeat: ${panelCount} orbit panels, ${activeLocks} locked`);
  }, 15000); // fires every 15 seconds

  // 🧱 Phase 399: Final Grid Alignment Sentinel
  function verifyGridAlignment() {
    const snapped = document.querySelectorAll('.holo-console.grid-snapped');
    const offGrid = [];

    snapped.forEach(panel => {
      const style = getComputedStyle(panel);
      if (style.position !== 'absolute' || !panel.style.left || !panel.style.top) {
        offGrid.push(panel.id);
      }
    });

    if (offGrid.length > 0) {
      console.warn(`🧱 Grid Sentinel Alert: ${offGrid.length} panels failed snap alignment`);
      console.table(offGrid);
    } else {
      console.log('✅ Grid Sentinel: All snapped panels aligned successfully.');
    }
  }

  window.runGridSentinel = verifyGridAlignment;
  verifyGridAlignment();

  // 🎇 Phase 400: Harmony Declaration — Final Initialization Banner
  console.groupCollapsed('%c🌌 SOVEREIGN GRID ONLINE — 400 PANEL PHASES COMPLETE', 'color: cyan; font-weight: bold; font-size: 14px;');
  console.log('%c🎯 Snap Grid Finalized', 'color: lightgreen;');
  console.log('%c🔗 Role Map Active', 'color: lightblue;');
  console.log('%c💠 Intelligence Pulse Live', 'color: violet;');
  console.log('%c📡 Grid Sentinel Standing By', 'color: gold;');
  console.log('%c🫧 Heartbeat Stable', 'color: pink;');
  console.groupEnd();
// 🪐 Phase 401: Orbital Grid Balance Calibration
function calibrateOrbitalGridBalance() {
  console.log("🪐 Calibrating Orbital Grid Balance...");

  const panels = document.querySelectorAll('.holo-console');
  const total = panels.length;
  const midpoint = Math.floor(total / 2);

  panels.forEach((panel, index) => {
    const offset = (index - midpoint) * 10;
    // If no transform is set, default to empty string
    panel.style.transform = (panel.style.transform || "") + ` translateY(${offset}px)`;
    panel.style.opacity = 1;
    console.log(`⚖️ Panel ${index + 1}/${total} adjusted by ${offset}px`);
  });

  console.log("✅ Orbital balance complete.");
}

// Trigger after symphony flow completes
window.addEventListener('load', () => {
  setTimeout(calibrateOrbitalGridBalance, 600); // Wait briefly after symphony
});

// 🚪 Companion Dock Portals: Phase 402
function initializeCompanionDockPortals() {
  console.log("🚪 Initializing Companion Dock Portals...");

  const companionPanels = document.querySelectorAll('.holo-console[data-role="companion"]');
  companionPanels.forEach((panel, i) => {
    const portal = document.createElement('div');
    portal.className = 'companion-dock-portal';
    portal.innerText = `🧿 Portal ${i + 1}`;
    portal.onclick = () => {
      panel.classList.toggle('portal-active');
      console.log(`🌀 Companion Portal ${i + 1} toggled`);
    };
    panel.appendChild(portal);
  });

  console.log("✅ Companion Dock Portals ready.");
}

// Trigger after orbital balance
window.addEventListener('load', () => {
  setTimeout(initializeCompanionDockPortals, 1200);
});

// Inject CSS for companion-dock-portal and portal-active
(function() {
  const companionDockStyle = document.createElement('style');
  companionDockStyle.textContent = `
    .companion-dock-portal {
      position: absolute;
      bottom: 5px;
      right: 10px;
      background: rgba(0, 0, 50, 0.6);
      color: #fff;
      padding: 4px 8px;
      border-radius: 5px;
      font-size: 0.75rem;
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s ease-in-out;
    }

    .portal-active {
      border: 2px solid cyan;
      box-shadow: 0 0 10px cyan;
    }
  `;
  document.head.appendChild(companionDockStyle);
})();
// Phase 425: Realignment Pulse Broadcast
window.triggerRealignmentPulse = function () {
  // Assign grid areas before snapping logic
  assignGridAreasByRole();

  const panels = document.querySelectorAll('.holo-console');
  const grid = document.querySelector('#sovereignGrid');

  if (!grid) {
    console.warn("⚠️ Sovereign Grid not found.");
    return;
  }

  panels.forEach(panel => {
    if (!panel.dataset.role) {
      console.warn("⚠️ Panel missing role:", panel);
      return;
    }

    // Reset layout position
    panel.style.position = 'absolute';
    panel.style.left = '';
    panel.style.top = '';
    panel.classList.remove('snapped');

    // Reapply layout alignment
    const snapTarget = document.querySelector(`#gridAnchor-${panel.dataset.role}`);
    if (snapTarget && grid.contains(snapTarget)) {
      const { top, left } = snapTarget.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      panel.style.left = `${left - gridRect.left}px`;
      panel.style.top = `${top - gridRect.top}px`;
      panel.classList.add('snapped');
    }
  });

  console.log("📡 Realignment Pulse Broadcast Complete.");
};

// === Grid Role Validator ===
function validatePanelGridRoles() {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    const role = panel.dataset.role;
    const gridArea = panel.dataset.gridArea;

    if (!role || role === 'unassigned') {
      panel.dataset.role = 'observer';
      console.warn(`🔍 Auto-assigned role "observer" to panel`, panel);
    }

    if (!gridArea || gridArea === 'unassigned-zone') {
      panel.dataset.gridArea = 'staging-zone';
      console.warn(`📍 Auto-assigned grid area "staging-zone" to panel`, panel);
    }
  });

  console.log("✅ Grid Role Validator completed.");
}

// Invoke validator immediately after grid pulse
validatePanelGridRoles();

// Assign grid-area to panels based on their role
function assignGridAreasByRole() {
  document.querySelectorAll('.holo-console').forEach(panel => {
    const role = panel.dataset.role;

    let targetArea = 'float-zone'; // default fallback

    switch (role) {
      case 'terminal':
        targetArea = 'bottom-left';
        break;
      case 'oracle':
        targetArea = 'top-center';
        break;
      case 'pulseMonitor':
        targetArea = 'center-right';
        break;
      case 'support':
        targetArea = 'bottom-right';
        break;
      case 'relay':
        targetArea = 'center-left';
        break;
      case 'archive':
        targetArea = 'top-left';
        break;
      case 'conductor':
        targetArea = 'center';
        break;
      case 'pulse-node':
        targetArea = 'top-right';
        break;
      case 'unassigned':
        targetArea = 'float-zone';
        break;
    }

    panel.dataset.gridArea = targetArea;
  });

  console.log('📌 Grid areas assigned based on role.');
}

window.assignGridAreasByRole = assignGridAreasByRole;
// === Grid Conflict Diagnostic Scan ===
console.groupCollapsed("🔍 GRID CONFLICT SCAN");

document.querySelectorAll('.holo-console').forEach(panel => {
  const id = panel.id || '[no-id]';
  const role = panel.dataset.role || '[no-role]';
  const area = panel.dataset.gridArea || '[no-grid-area]';
  
  if (!panel.dataset.role) {
    console.warn(`⚠️ Panel ${id} missing 'data-role'`);
  }
  if (!panel.dataset.gridArea) {
    console.warn(`⚠️ Panel ${id} missing 'data-grid-area'`);
  }

  const computed = window.getComputedStyle(panel);
  const display = computed.getPropertyValue('display');
  const position = computed.getPropertyValue('position');

  console.log(`🧩 ${id} → role: ${role}, gridArea: ${area}, display: ${display}, position: ${position}`);
});

console.groupEnd();

// === Panel Role & Zone Assignment Layer (Phase 426) ===
const panelZoneMap = {
  terminal: { role: 'interface', gridArea: 'core-zone' },
  pulseMonitor: { role: 'monitor', gridArea: 'core-zone' },
  oracle: { role: 'oracle', gridArea: 'wisdom-zone' },
  conductor: { role: 'command', gridArea: 'core-zone' },
  'pulse-node': { role: 'relay', gridArea: 'signal-zone' },
  relay: { role: 'relay', gridArea: 'signal-zone' },
  archive: { role: 'storage', gridArea: 'data-zone' },
  support: { role: 'support', gridArea: 'aux-zone' },
  countConsole: { role: 'analytics', gridArea: 'dashboard-zone' },
  deltaAnalyzerConsole: { role: 'analytics', gridArea: 'dashboard-zone' },
  reportingHubConsole: { role: 'dashboard', gridArea: 'dashboard-zone' },
  sessionManagerConsole: { role: 'session', gridArea: 'core-zone' },
  utilityHubConsole: { role: 'utility', gridArea: 'aux-zone' },
  oracleConsole: { role: 'oracle', gridArea: 'wisdom-zone' },
  grimoireConsole: { role: 'lore', gridArea: 'wisdom-zone' },
  whispererConsole: { role: 'messenger', gridArea: 'signal-zone' },
  sigilRenderConsole: { role: 'forge', gridArea: 'ritual-zone' },
  sigilEditPanel2: { role: 'edit', gridArea: 'ritual-zone' },
  exceptionManagerConsole: { role: 'debug', gridArea: 'system-zone' },
  progressDashboardConsole: { role: 'status', gridArea: 'dashboard-zone' },
  masterExportHubConsole: { role: 'exporter', gridArea: 'data-zone' },
  mappingsConsole: { role: 'mapping', gridArea: 'system-zone' },
  toolsConsole: { role: 'tools', gridArea: 'system-zone' },
  configPanelConsole: { role: 'config', gridArea: 'system-zone' },
  sageFeedConsole: { role: 'input', gridArea: 'wisdom-zone' },
  auditConsole: { role: 'auditor', gridArea: 'system-zone' },
  sageTerminal: { role: 'interface', gridArea: 'core-zone' },
  forecastConsole: { role: 'forecast', gridArea: 'signal-zone' }
};

document.querySelectorAll('.holo-console').forEach(panel => {
  const id = panel.id || '';
  // Remove common suffixes for baseId matching (e.g., Console, Panel, Hub, Edit)
  const baseId = id.replace(/Console|Panel|Hub|Edit/g, '').replace(/[-_]\d+$/, '');
  const zone = panelZoneMap[baseId];

  if (zone) {
    panel.dataset.role = zone.role;
    panel.dataset.gridArea = zone.gridArea;
    panel.style.display = 'grid';
    panel.style.position = 'relative';
  } else {
    panel.dataset.role = 'unassigned';
    panel.dataset.gridArea = 'holding-zone';
    panel.style.display = 'none';
  }
});
console.log('✅ Phase 426: Panel roles and zones assigned.');