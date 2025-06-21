

// consoleGroupMapper.js
// Phase 355.0 — Console Group Mapping Harmony Sync

import { consoleGroups } from './consoleAtlas.js';

export function mapConsolesToGroups() {
  document.querySelectorAll('.holo-console').forEach(consoleEl => {
    const consoleId = consoleEl.id;

    if (consoleGroups[consoleId]) {
      consoleEl.setAttribute('data-console-group', consoleGroups[consoleId]);
      console.log(`[Console Mapper] ${consoleId} assigned to group ${consoleGroups[consoleId]}`);
    } else {
      console.warn(`[Console Mapper] ${consoleId} not found in consoleGroups atlas.`);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  mapConsolesToGroups();
});