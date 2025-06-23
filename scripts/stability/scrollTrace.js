// scrollTrace.js
console.log("🌀 scrollTrace.js engaged — tracking scroll activity");

// Capture and log all scroll events with context
window.addEventListener("scroll", (e) => {
  console.log("🔍 Scroll event detected at", new Date().toISOString());
  console.log("  → scrollY:", window.scrollY);
  console.log("  → scrollTop (body):", document.body.scrollTop);
  console.log("  → scrollTop (documentElement):", document.documentElement.scrollTop);
  console.trace("📍 Scroll triggered by:");
});

// Optionally track scrollIntoView if we want to double check smooth vs non-smooth usage
const originalScrollIntoView = Element.prototype.scrollIntoView;
Element.prototype.scrollIntoView = function (options) {
  console.warn("🧲 scrollIntoView invoked on:", this);
  console.log("  → Options:", options);
  console.trace("📍 scrollIntoView source:");
  originalScrollIntoView.call(this, options);
};
