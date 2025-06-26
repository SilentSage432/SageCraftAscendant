


/**
 * 🛠️ Panel Role Fixer
 * Assigns proper roles to all .holo-console panels that are currently marked as undefined.
 * This should run once early in the UI boot process, before any snap logic.
 */

document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.holo-console, .holo-console-panel');

  panels.forEach(panel => {
    const id = panel.id || 'unknown';
    if (!panel.dataset.role || panel.dataset.role === 'undefined') {
      // Derive role from ID if possible
      const derivedRole = id
        .replace('Console', '')
        .replace('Panel', '')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .trim();

      panel.dataset.role = derivedRole || 'unassigned';
      console.log(`🔧 Assigned role "${panel.dataset.role}" to #${id}`);
    }
  });

  console.log('✅ core.panelRoleFixer.js initialized and completed.');
});