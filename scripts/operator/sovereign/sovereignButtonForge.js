// 🧭 Sovereign Ascendant — sovereignButtonForge.js
// Dynamically forges and injects subsystem buttons into the Sovereign Toolbar

(function initializeSovereignButtonForge() {
  console.log("🛠 Sovereign Button Forge Activated.");

  window.SovereignAscendant = window.SovereignAscendant || {};

  // Ensure the render queue is available
  if (typeof window.SovereignAscendant.enqueueRenderTask !== "function") {
    console.warn("⚠ Render queue not initialized — deferring button forge.");
    return;
  }

  // Register the toolbar render task
  window.SovereignAscendant.enqueueRenderTask(function renderToolbarButtons() {
    const toolbar = document.getElementById("sovereignToolbar");
    if (!toolbar) {
      console.warn("⚠ Sovereign Toolbar DOM element not found. Retrying in 250ms...");
      setTimeout(() => window.SovereignAscendant.enqueueRenderTask(renderToolbarButtons), 250);
      return;
    }

    const buttons = [
      {
        id: "btnForecast",
        label: "📊 Forecast",
        onClick: () => console.log("🔮 Forecast subsystem engaged.")
      },
      {
        id: "btnDiagnostics",
        label: "🧪 Diagnostics",
        onClick: () => console.log("🧠 Diagnostic scan initialized.")
      },
      {
        id: "btnOracle",
        label: "🔔 Whisper Oracle",
        onClick: () => console.log("📡 Oracle summoned.")
      }
    ];

    buttons.forEach(({ id, label, onClick }) => {
      if (document.getElementById(id)) return;

      const btn = document.createElement("button");
      btn.id = id;
      btn.textContent = label;
      btn.classList.add("sovereign-btn");
      btn.addEventListener("click", onClick);
      toolbar.appendChild(btn);
    });

    console.log("✅ Sovereign Buttons Rendered.");
  });
})();
