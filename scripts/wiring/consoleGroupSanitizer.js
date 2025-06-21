

// 🧠 Phase 342.0 — Console Group Synchronization Protocol

document.addEventListener("DOMContentLoaded", () => {
  const seenIds = new Map();
  const allElements = document.querySelectorAll('[id]');

  allElements.forEach(el => {
    const id = el.id;

    // Skip IDs not related to console panels
    if (!id.includes('Console') && !id.includes('Panel')) return;

    const contentLength = el.innerHTML.trim().length;

    if (!seenIds.has(id)) {
      seenIds.set(id, { el, contentLength });
    } else {
      const previous = seenIds.get(id);
      if (contentLength > previous.contentLength) {
        // Replace with the newer, richer content
        previous.el.remove();
        seenIds.set(id, { el, contentLength });
      } else {
        el.remove(); // Remove the duplicate with less or no content
      }
    }
  });

  // Rehome orphaned console panels
  seenIds.forEach(({ el }) => {
    if (!el.closest('#consolePanelGroup')) {
      const home = document.querySelector('#consolePanelGroup');
      if (home) home.appendChild(el);
    }
  });

  console.log("✅ Phase 342.0 — Console Group Synchronization Complete");
});