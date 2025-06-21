


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