// 🛰️ panelDriftSignal.js
// Emits warning signals when panel drift is detected beyond safe thresholds

function correctPanelDrift(panelId, driftVector) {
  const panel = window.SovereignPanels?.[panelId]?.element;
  if (!panel) return;

  const anchorZone = panel.dataset.zone || 'staging-zone';
  const anchor = document.querySelector(`[data-grid-zone="${anchorZone}"]`);

  if (anchor && anchor !== panel.parentElement) {
    anchor.appendChild(panel);
    console.info(`🔄 Realigned drifting panel [${panelId}] to zone ${anchorZone}`);
  }

  // Optional snapback positioning reset
  panel.style.top = '0px';
  panel.style.left = '0px';
}

export function emitDriftWarning(panelId, driftVector) {
  console.warn(`⚠️ Panel [${panelId}] is drifting with vector:`, driftVector);
  const event = new CustomEvent("panelDriftDetected", {
    detail: {
      panelId,
      driftVector
    }
  });
  window.dispatchEvent(event);
  correctPanelDrift(panelId, driftVector);
}

export function registerDriftSignalHandler(handler) {
  window.addEventListener("panelDriftDetected", (e) => {
    handler(e.detail);
  });
}

if (!window.SovereignPanels) {
  window.SovereignPanels = {};
}

export function registerPanels() {
  const panels = document.querySelectorAll('.holo-console-panel');

  panels.forEach(panel => {
    const id = panel.id || `panel-${Math.random().toString(36).slice(2, 7)}`;
    const role = panel.dataset.role || 'unknown';
    const zone = panel.dataset.gridArea || 'staging-zone';
    const hydrated = panel.dataset.hydrated === 'true';

    const panelMeta = {
      id,
      role,
      zone,
      hydrated,
      element: panel,
      state: hydrated ? 'active' : 'awaiting',
    };

    window.SovereignPanels[id] = panelMeta;

    panel.setAttribute('data-role', role);
    panel.setAttribute('data-zone', zone);
    panel.setAttribute('data-state', panelMeta.state);
    panel.setAttribute('data-registered', 'true');

    const bounds = panel.getBoundingClientRect();
    const gridBounds = panel.offsetParent?.getBoundingClientRect?.();

    if (gridBounds) {
      const drift = {
        x: bounds.left - gridBounds.left,
        y: bounds.top - gridBounds.top
      };

      const driftThreshold = 500;
      const distance = Math.sqrt(drift.x ** 2 + drift.y ** 2);

      if (distance > driftThreshold) {
        emitDriftWarning(id, drift);
      }
    }

    console.log(`📡 Registered panel "${id}" [${role}] in ${zone}`);
  });

  console.log(`🔗 Sovereign Panel Registry populated with ${Object.keys(window.SovereignPanels).length} panels.`);
}

document.addEventListener("DOMContentLoaded", registerPanels);
