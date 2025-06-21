

// consoleBehaviorMatrix.js
// Governs dynamic layout rules based on screen size and contextual state

export function applyConsoleBehaviorMatrix() {
  const consoles = document.querySelectorAll('.holo-console');

  consoles.forEach(console => {
    const bounds = console.getBoundingClientRect();

    if (window.innerWidth < 800) {
      console.style.width = '100%';
      console.style.position = 'relative';
    } else {
      console.style.width = 'auto';
      console.style.position = 'absolute';
    }
  });
}

// Optional: Reapply on window resize
window.addEventListener('resize', () => {
  applyConsoleBehaviorMatrix();
});

// Initial trigger
document.addEventListener('DOMContentLoaded', () => {
  applyConsoleBehaviorMatrix();
});