// 🧭 panelInteractionLinker.js
// Handles click, hover, and drag events for dynamic panel interaction
// Part of the Grid Finalization Phase

import { togglePanelLock } from '../lifecycle/panelDockLock.js';

export function initializePanelInteractionLinker() {
  const panels = document.querySelectorAll('.holo-console-panel');

  panels.forEach(panel => {
    // Highlight on hover
    panel.addEventListener('mouseenter', () => {
      panel.classList.add('panel-hovered');
    });

    panel.addEventListener('mouseleave', () => {
      panel.classList.remove('panel-hovered');
    });

    // Click interaction
    panel.addEventListener('click', () => {
      panel.classList.toggle('panel-selected');
    });

    // Optional: simple drag behavior placeholder
    panel.setAttribute('draggable', true);
    panel.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', panel.id);
    });

    // Add lock toggle button
    const lockBtn = document.createElement('button');
    lockBtn.textContent = '🔒';
    lockBtn.className = 'lock-toggle-btn';
    lockBtn.style.position = 'absolute';
    lockBtn.style.top = '4px';
    lockBtn.style.right = '4px';
    lockBtn.style.zIndex = '10001';
    lockBtn.style.background = 'transparent';
    lockBtn.style.border = 'none';
    lockBtn.style.cursor = 'pointer';
    lockBtn.style.color = '#0ff';
    lockBtn.style.fontSize = '14px';
    lockBtn.style.display = 'none';

    lockBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanelLock(panel);
      lockBtn.textContent = panel.getAttribute('data-locked') === 'true' ? '🔒' : '🔓';

      const currentLocks = [...document.querySelectorAll('.holo-console-panel')]
        .filter(p => p.getAttribute('data-locked') === 'true')
        .map(p => p.id);
      localStorage.setItem('lockedPanels', JSON.stringify(currentLocks));
    });

    const savedLocks = JSON.parse(localStorage.getItem('lockedPanels') || '[]');
    if (savedLocks.includes(panel.id)) {
      if (panel.hasAttribute('data-permalock')) {
        panel.setAttribute('data-locked', 'true');
        lockBtn.textContent = '🔒';
        lockBtn.style.display = 'none';
        return; // prevent accidental override
      }
      togglePanelLock(panel);
      lockBtn.textContent = panel.getAttribute('data-locked') === 'true' ? '🔒' : '🔓';
    }

    panel.style.position = 'relative';
    panel.appendChild(lockBtn);
  });
}

// 🧬 Phase 351.1 — Sovereign Command Mode Visibility

document.addEventListener('keydown', (e) => {
  if (e.altKey) {
    document.querySelectorAll('.lock-toggle-btn').forEach(btn => {
      btn.style.display = 'block';
    });
  }
});


document.addEventListener('keyup', (e) => {
  if (!e.altKey) {
    document.querySelectorAll('.lock-toggle-btn').forEach(btn => {
      btn.style.display = 'none';
    });
  }
});


// 🧬 Phase 351.4 — Dock Lock HUD Overlay

function createLockStatusHUD() {
  if (document.getElementById('lockStatusHUD')) return;

  const hud = document.createElement('div');
  hud.id = 'lockStatusHUD';
  hud.style.position = 'fixed';
  hud.style.bottom = '10px';
  hud.style.left = '10px';
  hud.style.background = 'rgba(0, 0, 0, 0.7)';
  hud.style.color = '#0ff';
  hud.style.fontFamily = 'monospace';
  hud.style.padding = '8px 12px';
  hud.style.border = '1px solid #0ff';
  hud.style.borderRadius = '6px';
  hud.style.fontSize = '12px';
  hud.style.zIndex = '9999';
  hud.textContent = '🔒 Locked Panels: 0';

  document.body.appendChild(hud);
}

function updateLockStatusHUD() {
  const hud = document.getElementById('lockStatusHUD');
  if (!hud) return;

  const lockedCount = document.querySelectorAll('.holo-console-panel[data-locked="true"]').length;
  hud.textContent = `🔒 Locked Panels: ${lockedCount}`;
}

// Create HUD on load
createLockStatusHUD();

// Update HUD on lock toggle
document.addEventListener('click', () => {
  setTimeout(updateLockStatusHUD, 50);
});
