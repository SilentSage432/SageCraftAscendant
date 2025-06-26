

console.log("🧩 uiRogueScanner initialized.");

const rogueElements = [...document.body.querySelectorAll("*")]
  .filter(el => {
    const tag = el.tagName.toLowerCase();
    return (
      !el.closest('.holo-console') &&
      !el.closest('#sovereignGrid') &&
      !el.closest('#sigil-forge') &&
      tag !== "script" &&
      tag !== "style" &&
      tag !== "link" &&
      tag !== "meta"
    );
  });

if (rogueElements.length > 0) {
  console.warn(`⚠️ Detected ${rogueElements.length} rogue UI element(s):`, rogueElements);
} else {
  console.log("✅ No rogue UI elements found.");
}