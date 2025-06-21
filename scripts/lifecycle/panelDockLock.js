

// 🔒 Phase 351 — Dock Lock / Unlock System

function lockPanel(panel) {
  panel.setAttribute('data-locked', 'true');
  panel.classList.add('locked');
  panel.style.pointerEvents = 'none';
  panel.style.opacity = '0.85'; // Optional: dim appearance
}

function unlockPanel(panel) {
  panel.setAttribute('data-locked', 'false');
  panel.classList.remove('locked');
  panel.style.pointerEvents = '';
  panel.style.opacity = ''; // Restore appearance
}

function togglePanelLock(panel) {
  const isLocked = panel.getAttribute('data-locked') === 'true';
  if (isLocked) {
    unlockPanel(panel);
    console.log(`🔓 Unlocked: ${panel.id}`);
  } else {
    lockPanel(panel);
    console.log(`🔒 Locked: ${panel.id}`);
  }
}

function isPanelLocked(panel) {
  return panel.getAttribute('data-locked') === 'true';
}


export { lockPanel, unlockPanel, togglePanelLock, isPanelLocked };

// Utility export for external enforcement
export function panelIsLocked(panel) {
  return panel?.getAttribute('data-locked') === 'true';
}