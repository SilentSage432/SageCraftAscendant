

// 🧬 Phase 346.8 — Resurrection Queue Handler Initialization

const ResurrectionQueue = (function () {
  let queue = [];

  function enqueue(panelId) {
    if (!queue.includes(panelId)) {
      queue.push(panelId);
      console.log(`🧪 ResurrectionQueue: Enqueued "${panelId}"`);
    }
  }

  function dequeue() {
    const panelId = queue.shift();
    if (panelId) {
      console.log(`🔁 ResurrectionQueue: Dequeued "${panelId}" for processing`);
    }
    return panelId;
  }

  function processNext() {
    const panelId = dequeue();
    if (panelId) {
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add("resurrected");
        console.log(`✨ ResurrectionQueue: Panel "${panelId}" resurrected`);
      } else {
        console.warn(`⚠️ ResurrectionQueue: Panel "${panelId}" not found`);
      }
    }
  }

  function reset() {
    queue = [];
    console.log("♻️ ResurrectionQueue: Reset complete");
  }

  function syncFromDOM() {
    const candidates = document.querySelectorAll('[data-resurrect-ready="true"]');
    candidates.forEach((el) => {
      if (el.id) {
        enqueue(el.id);
      } else {
        console.warn("⚠️ ResurrectionQueue: Element missing ID, cannot enqueue", el);
      }
    });
    console.log(`🔍 ResurrectionQueue: Synced ${candidates.length} panels from DOM`);
  }

  return {
    enqueue,
    dequeue,
    processNext,
    reset,
    syncFromDOM,
  };
})();

// Optional: Hook into global namespace if needed
window.ResurrectionQueue = ResurrectionQueue;