export function resolveConsoleLayouts() {
  const allPanels = document.querySelectorAll('.holo-console');
  const occupiedZones = new Set();

  allPanels.forEach(panel => {
    const panelId = panel.id || '(unnamed)';
    const positionKey = `${panel.style.left}_${panel.style.top}`;
    
    if (occupiedZones.has(positionKey)) {
      // Resolve overlap by nudging panel downward
      let top = parseInt(panel.style.top || '0');
      top += 40;
      panel.style.top = `${top}px`;
    }

    occupiedZones.add(`${panel.style.left}_${panel.style.top}`);
  });

  console.log(`✅ Console layout resolved for ${allPanels.length} panels.`);
}
