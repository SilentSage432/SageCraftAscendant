

// 🎮 Phase 348.2 — Panel Drag + Magnet Integration

import { magnetizePanel } from './panelMagnetizer.js';

document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll('.holo-console-panel');
  let activePanel = null;
  let offsetX = 0;
  let offsetY = 0;

  panels.forEach(panel => {
    panel.style.position = 'absolute';

    panel.addEventListener('mousedown', (e) => {
      activePanel = panel;
      offsetX = e.clientX - panel.offsetLeft;
      offsetY = e.clientY - panel.offsetTop;
      panel.style.zIndex = 10000;
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!activePanel) return;
    activePanel.style.left = `${e.clientX - offsetX}px`;
    activePanel.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    if (!activePanel) return;
    magnetizePanel(activePanel);
    activePanel.style.zIndex = '';
    activePanel = null;
  });
});