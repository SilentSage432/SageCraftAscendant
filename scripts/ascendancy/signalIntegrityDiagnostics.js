document.addEventListener("DOMContentLoaded", () => {
  console.log("🩺 Running Sovereign Signal Integrity Diagnostics...");

  const orphanedElements = [];
  const allButtons = document.querySelectorAll("button[id]");
  const allPanels = document.querySelectorAll("section.holo-console, div.holo-console");

  allPanels.forEach(panel => {
    const id = panel.id;
    if (!id) return;

    const correspondingButton = Array.from(allButtons).find(btn => {
      const target = btn.getAttribute("data-target");
      return target === id;
    });

    if (!correspondingButton) {
      orphanedElements.push(id);
    }
  });

  if (orphanedElements.length > 0) {
    console.warn("⚠️ Orphaned Panels Detected:", orphanedElements);
  } else {
    console.log("✅ All panels have corresponding signal hooks.");
  }

  // Optionally flag dangling listeners here (future phase)
});
