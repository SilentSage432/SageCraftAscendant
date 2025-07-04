

// 🧼 Phase 0: System Interference Sweep

console.log("🔍 Running Terminal Interference Sweep...");

// Define the scanning point near the bottom center of the screen (terminal input zone)
const scanPointX = window.innerWidth / 2;
const scanPointY = window.innerHeight - 40;

// Collect all DOM elements at the scan point
const elementsAtInput = [...document.elementsFromPoint(scanPointX, scanPointY)];

console.group("🛑 Potential Blockers Over Terminal Input:");
elementsAtInput.forEach(el => {
  const styles = getComputedStyle(el);
  const summary = {
    tag: el.tagName,
    id: el.id,
    class: el.className,
    zIndex: styles.zIndex,
    pointerEvents: styles.pointerEvents,
    opacity: styles.opacity,
    display: styles.display,
    visibility: styles.visibility
  };
  console.log(summary);
});
console.groupEnd();

// Optional: Flag any element that appears to be a blocker (invisible but intercepting)
const likelyBlockers = elementsAtInput.filter(el => {
  const styles = getComputedStyle(el);
  return (
    styles.pointerEvents !== 'none' &&
    styles.opacity !== '0' &&
    styles.display !== 'none' &&
    styles.visibility !== 'hidden' &&
    (styles.zIndex !== 'auto' && parseInt(styles.zIndex) >= 0)
  );
});

console.group("⚠️ Likely Active UI Blockers:");
likelyBlockers.forEach(el => {
  console.warn(`⚠️ Possible blocker: #${el.id} .${el.className}`);
});
console.groupEnd();