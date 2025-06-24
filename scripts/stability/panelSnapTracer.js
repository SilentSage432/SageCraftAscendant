

// panelSnapTracer.js

// Observe all panels for snap-pinned class toggles and layout shifts
const snapTracerObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const el = mutation.target;
      const classList = el.className;
      if (classList.includes("snap-pinned")) {
        console.log(`📌 snap-pinned ➤ #${el.id}: ${classList}`);
      } else {
        console.warn(`⚠️ snap-pinned removed ➤ #${el.id}: ${classList}`);
      }
    }
  });
});

// Apply observer to all panel elements
document.querySelectorAll(".holo-console").forEach((el) => {
  snapTracerObserver.observe(el, {
    attributes: true,
    attributeFilter: ["class"]
  });
});

console.log("🧪 panelSnapTracer.js engaged — watching for snap-pinned transitions.");