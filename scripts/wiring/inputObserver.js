

// === Phase 336.0 — Input Field Observer Integration ===
console.log("🧠 Phase 336.0 — Input Field Observer Initialized");

const inputEvents = ["focus", "blur", "input", "keydown", "keyup"];
const inputActivityMap = new WeakMap();

function dispatchInputEvent(el, action) {
  const id = el.id || "(unnamed)";
  const eventName = `input:${id}:${action}`;
  console.log(`📝 Dispatching: ${eventName}`);
  document.dispatchEvent(new CustomEvent(eventName, { detail: { id, action } }));
}

function bindInputObserver(el) {
  if (inputActivityMap.has(el)) return;

  const state = { lastInput: 0, idleTimeout: null };
  inputActivityMap.set(el, state);

  el.addEventListener("focus", () => dispatchInputEvent(el, "inputBegan"));
  el.addEventListener("blur", () => dispatchInputEvent(el, "inputEnded"));
  el.addEventListener("input", () => {
    dispatchInputEvent(el, "inputChanged");
    state.lastInput = Date.now();

    if (state.idleTimeout) clearTimeout(state.idleTimeout);
    state.idleTimeout = setTimeout(() => {
      dispatchInputEvent(el, "inputIdle");
    }, 3000); // Idle if no input for 3 seconds
  });

  console.log(`🔍 Input observer bound to: ${el.id || el.tagName}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach(bindInputObserver);
});