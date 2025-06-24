// 🧠 Snap Memory Engine — Sovereign Layout Recall System

window.SnapMemoryEngine = {
  cache: {},

  saveSnapStates() {
    document.querySelectorAll('.holo-console.snap-pinned').forEach(panel => {
      this.cache[panel.id] = {
        top: panel.style.top,
        left: panel.style.left,
        position: getComputedStyle(panel).position,
        transform: panel.style.transform
      };
      console.log(`💾 Saved ➤ #${panel.id}`);
    });

    localStorage.setItem('snapMemoryCache', JSON.stringify(this.cache));
  },

  restoreSnapStates() {
    const memory = JSON.parse(localStorage.getItem('snapMemoryCache') || '{}');
    Object.entries(memory).forEach(([id, state]) => {
      const panel = document.getElementById(id);
      if (panel) {
        panel.style.top = state.top;
        panel.style.left = state.left;
        panel.style.position = state.position;
        panel.style.transform = state.transform;
        panel.classList.add('snap-pinned');
        console.log(`♻️ Restored ➤ #${id}`);
      }
    });
  },

  clearSnapStates() {
    localStorage.removeItem('snapMemoryCache');
    console.log('🧹 Snap memory cache cleared.');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  window.SnapMemoryEngine.restoreSnapStates();
});

// To save at any point: window.SnapMemoryEngine.saveSnapStates();
// To clear: window.SnapMemoryEngine.clearSnapStates();
