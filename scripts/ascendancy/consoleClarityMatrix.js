

/**
 * 🧼 Console Clarity Matrix
 * Phase 351.3 — Panel Visual Cleanup
 * Removes artifacts, adjusts z-index, and sharpens UI boundaries
 */

export function enhanceConsoleClarity() {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    panel.style.backdropFilter = 'blur(3px) contrast(1.1)';
    panel.style.zIndex = '10';
    panel.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
    panel.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  });

  console.log('🧼 Console Clarity Matrix: Panels enhanced for visual clarity');
}