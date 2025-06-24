function applyInitialPins(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('snap-pinned');
      console.log(`📌 Pre-applied snap-pinned ➤ #${id}`);
    }
  });
}

// snapPinLock.js — Locks snap-pinned status on key panels

const SnapPinLock = (() => {
  const lockedPanels = new Set();

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const el = mutation.target;
        const id = el.id;
        const classList = el.classList;

        // If a panel previously had snap-pinned and it got removed, reapply it
        if (lockedPanels.has(id) && !classList.contains('snap-pinned')) {
          console.warn(`🔒 Restoring .snap-pinned ➤ #${id}`);
          el.classList.add('snap-pinned');
        }

        // Track panels that had snap-pinned initially
        if (classList.contains('snap-pinned') && !lockedPanels.has(id)) {
          lockedPanels.add(id);
          console.log(`📌 Locked snap-pinned ➤ #${id}`);
        }
      }
    }
  });

  function init() {
    const targets = [
      'whispererConsole',
      'reportingHubConsole',
      'utilityHubConsole',
      'sessionManagerConsole',
      'auditConsole'
    ];

    applyInitialPins(targets);

    const allWithId = document.querySelectorAll('[id]');
    allWithId.forEach(el => {
      observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    });

    console.log("🧷 SnapPinLock engaged — monitoring snap-pinned consistency.");
  }

  return { init };
})();

window.SnapPinLock = SnapPinLock;
window.addEventListener("DOMContentLoaded", () => {
  window.SnapPinLock.init();
});