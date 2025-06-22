


export function hydrateEmptyPanels() {
  const panels = document.querySelectorAll('.holo-console-panel');

  panels.forEach(panel => {
    const id = panel.id || 'unnamed';
    const isEmpty = !panel.innerHTML.trim();

    if (isEmpty) {
      panel.innerHTML = `
        <div class="panel-placeholder">
          <h3>🌀 Loading: ${id}</h3>
          <p>This panel is awaiting data or template binding.</p>
        </div>
      `;
      panel.setAttribute('data-hydrated', 'true');
      console.log(`💧 Hydrated empty panel: ${id}`);
    }
  });

  console.log("✨ Hydration complete — All empty panels filled with placeholders.");
}

document.addEventListener("DOMContentLoaded", hydrateEmptyPanels);

export function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) {
    console.warn(`⚠️ Panel with ID "${panelId}" not found.`);
    return;
  }
  panel.classList.toggle('active');
  console.log(`🔁 Toggled panel: ${panelId} → ${panel.classList.contains('active') ? 'Visible' : 'Hidden'}`);
}

// Expose to window for inline button onclick access
window.togglePanel = togglePanel;