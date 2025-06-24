window.addEventListener("DOMContentLoaded", () => {
  const memory = window?.SovereignMemory?.snapMemoryStore;
  if (memory && typeof memory === 'object' && Object.keys(memory).length > 0) {
    console.log("🧠 Auto-recalling Snap Memory...");

    Object.entries(memory).forEach(([id, style]) => {
      const panel = document.getElementById(id);
      if (panel) {
        Object.assign(panel.style, {
          top: style.top || '',
          left: style.left || '',
          transform: style.transform || '',
          position: style.position || 'absolute',
        });
        panel.classList.add('snap-pinned');
        console.log(`📍 Restored ➤ #${id}`);
      }
    });

    console.log("✅ Snap Memory Recall Complete.");
  } else {
    console.log("🧠 No Snap Memory Found to Auto-Recall.");
  }
});
