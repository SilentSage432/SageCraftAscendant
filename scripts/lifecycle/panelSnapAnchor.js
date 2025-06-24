

// panelSnapAnchor.js

const SnapAnchorRegistry = {
  anchors: new Map(),

  register(id, expectedTop, expectedLeft) {
    this.anchors.set(id, { top: expectedTop, left: expectedLeft });
    console.log(`📌 Registered SnapAnchor ➤ #${id}`, { top: expectedTop, left: expectedLeft });
  },

  verifyAll() {
    this.anchors.forEach((expected, id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const deltaTop = Math.abs(rect.top - expected.top);
      const deltaLeft = Math.abs(rect.left - expected.left);

      if (deltaTop > 10 || deltaLeft > 10) {
        console.warn(`⚠️ SnapAnchor drift ➤ #${id}`, {
          actual: { top: rect.top, left: rect.left },
          expected
        });
      } else {
        console.log(`✅ SnapAnchor intact ➤ #${id}`);
      }
    });
  }
};

// Global exposure for system access
window.SnapAnchorRegistry = SnapAnchorRegistry;

// Engage
console.log("📎 SnapAnchorRegistry initialized — anchoring layout integrity.");