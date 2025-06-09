// 🧭 Sovereign Ascendant — bootstrapToolbar.js
// Handles SovereignToolbarRenderer Dynamic Import & Runtime Binding

(function initializeBootstrapToolbar() {
  console.log("🧮 Sovereign Toolbar Renderer Loader Initiated.");

  import('./operator/sovereign/sovereignToolbarRenderer.js')
    .then((sovereignToolbarModule) => {
      window.SovereignAscendant = window.SovereignAscendant || {};
      window.SovereignAscendant.Toolbar = sovereignToolbarModule.default;
      console.log("✅ SovereignToolbarRenderer successfully loaded.");
    })
    .catch((err) => {
      console.error("❌ Failed to load SovereignToolbarRenderer:", err);
    });
})();
