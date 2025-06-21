

// === Phase 334.8 — UI Command Sanitization ===
console.log("🧼 Phase 334.8 — UI Command Sanitization Initialized");

function sanitizeUICommands() {
  const allButtons = document.querySelectorAll("button");
  const allInputs = document.querySelectorAll("input, textarea, form");

  allButtons.forEach((btn) => {
    if (btn.hasAttribute("onclick")) {
      console.warn(`⚠️ Removing inline onclick from button: #${btn.id}`);
      btn.removeAttribute("onclick");
    }
    btn.onclick = null;
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent rogue bubbling
    }, { capture: true });
  });

  allInputs.forEach((el) => {
    if (el.hasAttribute("onsubmit")) {
      console.warn(`⚠️ Removing inline onsubmit from: #${el.id}`);
      el.removeAttribute("onsubmit");
    }
    el.onsubmit = null;
    el.addEventListener("submit", (e) => {
      e.stopPropagation();
    }, { capture: true });
  });

  console.log(`✅ Sanitized ${allButtons.length} buttons and ${allInputs.length} input/form elements.`);
}

document.addEventListener("DOMContentLoaded", sanitizeUICommands);