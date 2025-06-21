// interfaceLayoutMatrix.js
// 🧩 Interface Layout Matrix – Ensures synchronized spatial cohesion across dynamic UI layers.

export function synchronizeInterfaceLayout() {
  const panels = document.querySelectorAll('.console-panel');
  const grid = document.querySelector('.ui-grid');

  if (!panels.length || !grid) return;

  panels.forEach(panel => {
    const gridRect = grid.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    // Calculate offset for alignment
    const offsetX = Math.round((panelRect.left - gridRect.left) / 10) * 10;
    const offsetY = Math.round((panelRect.top - gridRect.top) / 10) * 10;

    panel.style.left = `${offsetX}px`;
    panel.style.top = `${offsetY}px`;
    panel.style.position = 'absolute';
  });

  console.log('🧭 Interface layout matrix synchronized.');
}
