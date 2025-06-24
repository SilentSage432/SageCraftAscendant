window.SnapGridFinalizer = {
  finalize() {
    const zone = document.getElementById('sovereignGridSystem');
    if (!zone) {
      console.warn('🟥 sovereignGridSystem not found. Aborting finalization.');
      return;
    }

    document.querySelectorAll('.holo-console').forEach(panel => {
      if (!zone.contains(panel)) {
        zone.appendChild(panel);
        console.log(`✅ Finalized ➤ #${panel.id} into ➤ #${zone.id}`);
      } else {
        console.log(`🟢 Already contained ➤ #${panel.id}`);
      }

      if (!panel.classList.contains('snap-pinned')) {
        panel.classList.add('snap-pinned');
        console.log(`📌 Reapplied snap-pinned ➤ #${panel.id}`);
      }

      const rect = panel.getBoundingClientRect();
      const style = getComputedStyle(panel);
      console.log(`📦 #${panel.id}`, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: style.position,
        transform: style.transform
      });
    });

    console.log('📦 SnapGridFinalizer: All panels reviewed and finalized.');
  }
};

// Auto-run once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.SnapGridFinalizer.finalize();
});