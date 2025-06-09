

// 🧭 Sovereign Ascendant — sovereignRenderQueue.js
// Deferred Render Orchestration & Execution Queue

(function initializeSovereignRenderQueue() {
  console.log("🌀 Sovereign Render Queue System Activated.");

  window.SovereignAscendant = window.SovereignAscendant || {};
  window.SovereignAscendant.RenderQueue = [];

  const executeRenderQueue = () => {
    console.log("🎯 Executing Sovereign Render Queue...");
    while (window.SovereignAscendant.RenderQueue.length > 0) {
      const task = window.SovereignAscendant.RenderQueue.shift();
      try {
        task();
      } catch (err) {
        console.error("❌ Render Task Failed:", err);
      }
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(executeRenderQueue, 100); // Delay to ensure all modules are hydrated
  });

  // Public method for queueing render tasks
  window.SovereignAscendant.enqueueRenderTask = function (fn) {
    if (typeof fn !== "function") {
      console.warn("⚠ Attempted to enqueue a non-function render task.");
      return;
    }
    window.SovereignAscendant.RenderQueue.push(fn);
    console.log("📥 Render Task Queued.");
  };
})();