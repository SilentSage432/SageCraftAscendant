

// panelZoneAnchor.js

// Ensure all .snap-pinned panels retain their assigned zones after layout shifts

document.addEventListener("DOMContentLoaded", () => {
  const pinned = document.querySelectorAll(".snap-pinned");

  pinned.forEach(panel => {
    const zone = panel.closest("[data-zone-id]")?.getAttribute("data-zone-id") || "unknown-zone";
    panel.dataset.assignedZone = zone;
    console.log(`📍 Anchored zone ➤ #${panel.id} to zone: ${zone}`);
  });
});

console.log("📍 panelZoneAnchor.js engaged — anchoring panel zones...");