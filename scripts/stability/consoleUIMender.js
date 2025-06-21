// 🛠️ consoleUIMender.js — Restores broken UI components, styles, and layout anomalies

export function mendUIAnomalies() {
  const damagedPanels = document.querySelectorAll('.console-panel.damaged');

  damagedPanels.forEach(panel => {
    panel.classList.remove('damaged');
    panel.classList.add('restored');

    // Reset visibility and layout if missing
    panel.style.display = 'block';
    panel.style.opacity = '1';
    panel.style.transform = 'none';

    // Restore essential subcomponents
    const header = panel.querySelector('.panel-header');
    if (!header) {
      const newHeader = document.createElement('div');
      newHeader.className = 'panel-header';
      newHeader.textContent = 'Recovered Panel';
      panel.prepend(newHeader);
    }

    const content = panel.querySelector('.panel-content');
    if (!content) {
      const newContent = document.createElement('div');
      newContent.className = 'panel-content';
      newContent.textContent = 'Content reloaded.';
      panel.appendChild(newContent);
    }
  });

  console.log('🧩 consoleUIMender: UI anomalies restored.');
}

export function stabilizePanelPosition(panel) {
  if (!panel) return;

  // Ensure the panel is visible and aligned
  panel.style.display = 'block';
  panel.style.opacity = '1';
  panel.style.transform = 'none';

  // Add any stabilizing class or data attribute if needed
  panel.classList.add('stabilized');

  console.log('🧲 Panel stabilized:', panel.id || panel.className);
}


export function isPanelSnapped(panel) {
  if (!panel) return false;

  // Logic to determine if the panel is aligned to the grid
  return panel.classList.contains('snapped') || panel.dataset.snapped === 'true';
}