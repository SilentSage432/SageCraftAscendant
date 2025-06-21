// gridNodeRestorer.js
import { getAllGridNodes } from '../ascendancy/consoleGridBinder.js';

export function restoreGridNodes() {
  const savedGridData = JSON.parse(localStorage.getItem('savedGridNodes')) || [];

  savedGridData.forEach(savedNode => {
    const gridNodes = getAllGridNodes();
    const match = gridNodes.find(node => node.id === savedNode.id);
    if (match) {
      match.style.left = savedNode.left;
      match.style.top = savedNode.top;
      match.dataset.alignment = savedNode.alignment;
    }
  });

  console.log('[🧲 GridNodeRestorer] Grid nodes restored to saved positions.');
}

document.addEventListener('DOMContentLoaded', () => {
  restoreGridNodes();
});
