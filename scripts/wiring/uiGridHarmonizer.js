

// === Phase 345.0 — Sovereign Layout Grid Harmonization ===
console.log("🧱 Phase 345.0 — Sovereign Layout Grid Harmonization Activated");

const consolePanelGroup = document.getElementById("consolePanelGroup");

if (!consolePanelGroup) {
  console.warn("❌ consolePanelGroup not found — layout harmonization skipped.");
} else {
  const panels = consolePanelGroup.querySelectorAll("section, div");

  panels.forEach(panel => {
    panel.style.margin = "1rem auto";
    panel.style.padding = "1rem";
    panel.style.boxSizing = "border-box";
    panel.style.maxWidth = "95%";
    panel.style.borderRadius = "8px";
    panel.style.border = "1px solid rgba(255,255,255,0.1)";
    panel.style.background = "rgba(255,255,255,0.02)";
  });

  console.log(`✅ Harmonized ${panels.length} panels inside consolePanelGroup`);
}