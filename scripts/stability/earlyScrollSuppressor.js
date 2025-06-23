

// scripts/stability/earlyScrollSuppressor.js

// Lock scroll position at top immediately
const hardScrollLock = () => {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Disable scroll on load and layout shifts
document.addEventListener("DOMContentLoaded", hardScrollLock);
window.addEventListener("load", () => {
  hardScrollLock();
  setTimeout(hardScrollLock, 100);
  setTimeout(hardScrollLock, 500);
  setTimeout(hardScrollLock, 1000);
});

// Forcefully prevent scroll attempts during initialization
window.addEventListener("scroll", () => {
  if (window.scrollY !== 0) {
    hardScrollLock();
  }
});

console.log("🔒 earlyScrollSuppressor.js engaged — scroll locked pre-layout.");