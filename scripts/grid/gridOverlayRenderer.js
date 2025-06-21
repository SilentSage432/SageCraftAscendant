

// 🧱 Phase 350 — Grid Overlay System

function createSnapGridOverlay() {
  if (document.getElementById('snapGridOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'snapGridOverlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '0';
  overlay.style.backgroundImage = `
    linear-gradient(to right, rgba(0,255,255,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,255,255,0.05) 1px, transparent 1px)
  `;
  overlay.style.backgroundSize = '300px 300px';
  document.body.appendChild(overlay);
}

export { createSnapGridOverlay };