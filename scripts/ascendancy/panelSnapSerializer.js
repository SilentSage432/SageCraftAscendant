// 🧲 panelSnapSerializer.js
// Purpose: Saves snapped positions of each panel and restores them on load.

export function serializePanelPositions() {
    const panels = document.querySelectorAll('.holo-console');
    const positionMap = {};
  
    panels.forEach(panel => {
      const id = panel.id;
      const left = panel.style.left;
      const top = panel.style.top;
  
      if (id && left && top) {
        positionMap[id] = { left, top };
      }
    });
  
    localStorage.setItem('consoleSnapPositions', JSON.stringify(positionMap));
  }
  
  export function restorePanelPositions() {
    const stored = localStorage.getItem('consoleSnapPositions');
    if (!stored) return;
  
    const positionMap = JSON.parse(stored);
  
    Object.entries(positionMap).forEach(([id, pos]) => {
      const panel = document.getElementById(id);
      if (panel) {
        panel.style.position = 'absolute';
        panel.style.left = pos.left;
        panel.style.top = pos.top;
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    restorePanelPositions();
  
    const gridArea = document.getElementById('consoleGridArea');
    if (!gridArea) return;
  
    gridArea.addEventListener('drop', () => {
      setTimeout(serializePanelPositions, 50);
    });
  });