

// 🌌 Sovereign Panel Grid Classifier
// Phase 15: Dynamically classify panels into their intended grid zones based on attributes

export function classifyPanelsToGridZones() {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    const role = panel.dataset.role || 'undefined';
    const zone = panel.dataset.zone || 'unset';

    panel.classList.add(`role-${role}`);
    panel.classList.add(`zone-${zone}`);

    // Assign grid-area directly if supported by parent grid
    if (zone !== 'unset' && panel.style) {
      panel.style.gridArea = zone;
      console.log(`📌 ${panel.id} classified as role: ${role}, zone: ${zone}`);
    } else {
      console.warn(`⚠️ Panel ${panel.id || '[unknown]'} missing zone or role metadata.`);
    }
  });

  console.log("✅ Sovereign Panel Grid Classification complete.");
}

export function bindPanelMemoryAndGridAwareness() {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    const panelId = panel.id || 'unknown';

    // Grid metadata assignment
    const zone = panel.dataset.zone || 'unset';
    if (zone !== 'unset') {
      panel.style.gridArea = zone;
      console.log(`🧠 Grid Awareness: ${panelId} bound to zone '${zone}'`);
    }

    // Memory state (position/size tracking)
    const rect = panel.getBoundingClientRect();
    panel.dataset.lastKnownX = rect.x.toFixed(0);
    panel.dataset.lastKnownY = rect.y.toFixed(0);
    panel.dataset.lastKnownWidth = rect.width.toFixed(0);
    panel.dataset.lastKnownHeight = rect.height.toFixed(0);

    console.log(`💾 Memory Snapshot: ${panelId} → (${rect.width}x${rect.height}) @ (${rect.x},${rect.y})`);
  });

  console.log("✅ Dock Panel Memory + Grid Awareness Injection complete.");
}