

// 🧠 Phase 360 — Snap Layout Presets: Sovereign Spatial Memory

const LAYOUT_KEY_PREFIX = 'sagecraft_layout_';

function saveLayoutPreset(name = 'default') {
  const panels = document.querySelectorAll('.holo-console-panel');
  const layout = [];

  panels.forEach(panel => {
    layout.push({
      id: panel.id,
      top: panel.style.top,
      left: panel.style.left,
      locked: panel.getAttribute('data-locked') === 'true'
    });
  });

  localStorage.setItem(LAYOUT_KEY_PREFIX + name, JSON.stringify(layout));
  console.log(`💾 Layout preset "${name}" saved.`);
}

function loadLayoutPreset(name = 'default') {
  const raw = localStorage.getItem(LAYOUT_KEY_PREFIX + name);
  if (!raw) {
    console.warn(`⚠️ No preset found for "${name}".`);
    return;
  }

  const layout = JSON.parse(raw);
  layout.forEach(entry => {
    const panel = document.getElementById(entry.id);
    if (!panel) return;

    panel.style.top = entry.top;
    panel.style.left = entry.left;
    panel.setAttribute('data-locked', entry.locked ? 'true' : 'false');
  });

  console.log(`📥 Layout preset "${name}" loaded.`);
}

function getAvailablePresets() {
  return Object.keys(localStorage)
    .filter(k => k.startsWith(LAYOUT_KEY_PREFIX))
    .map(k => k.replace(LAYOUT_KEY_PREFIX, ''));
}

function deleteLayoutPreset(name) {
  localStorage.removeItem(LAYOUT_KEY_PREFIX + name);
  console.log(`🗑️ Layout preset "${name}" deleted.`);
}

export {
  saveLayoutPreset,
  loadLayoutPreset,
  getAvailablePresets,
  deleteLayoutPreset
};