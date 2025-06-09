

// 🧭 Sovereign Ascendant — sovereignRuntime.js
// Post-Bootstrap Execution Coordinator & Render Stabilizer

(function initializeSovereignRuntime() {
  console.log("🧠 Sovereign Runtime Core Activated.");

  window.SovereignAscendant = window.SovereignAscendant || {};

  // Enqueue Sovereign Toolbar rendering
  window.SovereignAscendant.enqueueRenderTask(() => {
    const toolbar = window.SovereignAscendant?.Toolbar;
    if (toolbar && typeof toolbar.renderToolbar === "function") {
      toolbar.renderToolbar();
      console.log("✅ Sovereign Toolbar Rendered via RenderQueue.");
    } else {
      console.warn("⚠ Sovereign Toolbar not available during render queue execution.");
    }
  });

  // Enqueue Sovereign Dock readiness confirmation
  window.SovereignAscendant.enqueueRenderTask(() => {
    if (window.SovereignAscendant?.Subsystems) {
      console.log("🔄 Sovereign Dock Subsystem Hooks Live via RenderQueue.");
      // Future hook: trigger full dock rebuild if needed
    } else {
      console.warn("⚠ Sovereign Subsystems unavailable during render queue execution.");
    }
  });
})();