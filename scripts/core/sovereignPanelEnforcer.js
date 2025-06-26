

import { startupPanelPermissions } from './sovereignPanelDirective.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.holo-console').forEach(panel => {
    const id = panel.id;
    if (!startupPanelPermissions.includes(id)) {
      panel.style.display = 'none';
      panel.style.visibility = 'hidden';
      panel.style.opacity = '0';
    } else {
      panel.style.display = 'grid';
      panel.style.visibility = 'visible';
      panel.style.opacity = '1';
    }
  });

  console.log("🛡️ SovereignPanelEnforcer activated. Panel visibility enforced based on startup permissions.");
});