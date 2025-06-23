// stability/scrollIntercept.js

// Intercept unwanted scrollIntoView() calls across the system
const originalScrollIntoView = Element.prototype.scrollIntoView;

Element.prototype.scrollIntoView = function (options) {
  const isIntentional = options && options.behavior === "smooth";

  // Allow only intentional, smooth scrolls
  if (isIntentional) {
    originalScrollIntoView.call(this, options);
  } else {
    console.warn("🚫 Blocked unwanted scrollIntoView on:", this);
  }
};

console.log("🛡️ scrollIntercept.js engaged — rogue scrollIntoView calls filtered.");

window.ScrollIntercept = {
  originalScrollIntoView,
  restore: () => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    console.log("🔓 ScrollIntercept disabled — default scrollIntoView restored.");
  }
};