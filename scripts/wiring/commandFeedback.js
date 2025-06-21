// === Phase 337.1 — Command Response Rendering & Feedback Loop ===
console.log("🔁 Phase 337.1 — Command Feedback Loop Online");

const responseTarget = document.getElementById("commandResponse");

if (!responseTarget) {
  console.warn("⚠️ No #commandResponse panel found. Feedback loop cannot bind.");
} else {
  document.addEventListener("sovereign:injectPayload", (e) => {
    const value = e.detail?.value || "(no payload)";
    const timestamp = new Date().toLocaleTimeString();
    responseTarget.innerHTML += `<div class="feedback-entry">📥 <b>[${timestamp}]</b> Injected: <code>${value}</code></div>`;
    responseTarget.scrollTop = responseTarget.scrollHeight;
  });

  document.addEventListener("sovereign:clearConsole", () => {
    responseTarget.innerHTML = `<div class="feedback-entry">🧼 Console Cleared @ ${new Date().toLocaleTimeString()}</div>`;
  });

  document.addEventListener("sovereign:saveSnapshot", () => {
    responseTarget.innerHTML += `<div class="feedback-entry">💾 Snapshot saved @ ${new Date().toLocaleTimeString()}</div>`;
    responseTarget.scrollTop = responseTarget.scrollHeight;
  });

  console.log("✅ Command response listener bound to #commandResponse");
}
