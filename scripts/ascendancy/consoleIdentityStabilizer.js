// consoleIdentityStabilizer.js
// Phase 351.0 — Console Identity Stabilizer Initialization

export function stabilizeConsoleIdentities() {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    const id = panel.id;

    // Enforce a naming convention or apply fallbacks
    if (!id || id.trim() === '') {
      console.warn('Unnamed console panel detected. Assigning fallback ID.');
      const fallbackId = `console_${Math.random().toString(36).substr(2, 9)}`;
      panel.id = fallbackId;
    }

    // Normalize class names and custom data attributes
    panel.classList.add('stabilized-console');
    panel.setAttribute('data-stabilized', 'true');
  });

  console.log(`✅ Console Identity Stabilizer: ${panels.length} panels processed.`);
}
