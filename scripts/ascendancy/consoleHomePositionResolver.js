

// 🏠 Console Home Position Resolver
// Phase 353.0 — Responsible for determining and restoring original console layout positions on load

export function resolveConsoleHomePositions() {
  const consoles = document.querySelectorAll('.holo-console');
  
  consoles.forEach(console => {
    const homeX = console.getAttribute('data-home-x');
    const homeY = console.getAttribute('data-home-y');
    
    if (homeX && homeY) {
      console.style.left = `${homeX}px`;
      console.style.top = `${homeY}px`;
      console.classList.add('position-resolved');
    }
  });
}

// Optionally auto-resolve on DOM load (can be disabled if needed)
document.addEventListener("DOMContentLoaded", () => {
  resolveConsoleHomePositions();
});