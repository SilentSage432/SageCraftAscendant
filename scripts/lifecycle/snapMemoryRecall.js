window.SovereignMemory = window.SovereignMemory || {};

window.SovereignMemory.recordFinalSnapState = function () {
  const memory = {};
  [...document.querySelectorAll('.holo-console.snap-pinned')].forEach(p => {
    memory[p.id] = {
      top: p.style.top || getComputedStyle(p).top,
      left: p.style.left || getComputedStyle(p).left,
      transform: getComputedStyle(p).transform,
      position: getComputedStyle(p).position,
    };
  });

  window.SovereignMemory.snapMemoryStore = memory;
  localStorage.setItem('sovereignSnapMemory', JSON.stringify(memory));
  console.log("💾 Snap Memory saved to localStorage");
};

window.SovereignMemory.recallFinalSnapState = function () {
  const savedMemory = localStorage.getItem('sovereignSnapMemory');
  const memory = savedMemory ? JSON.parse(savedMemory) : {};
  window.SovereignMemory.snapMemoryStore = memory;

  if (!savedMemory) {
    console.warn("🧠 No stored snap memory found in localStorage.");
  } else {
    console.log("♻️ Snap Memory restored from localStorage");
  }

  const panels = Object.keys(memory);

  if (panels.length === 0) {
    console.log("🧠 No stored snap memory found.");
    return;
  }

  panels.forEach(panelId => {
    const panel = document.getElementById(panelId);
    if (panel && !panel.classList.contains('snap-pinned')) {
      panel.classList.add('snap-pinned');
      console.log(`🧠 Restored snap-pinned ➤ #${panelId}`);
    }
  });

  console.log("🔁 Snap memory recall complete.");
};

document.addEventListener("DOMContentLoaded", () => {
  window?.SovereignMemory?.recallFinalSnapState?.();
});