// 🧩 consolePanelFluxBinder.js — Stabilizes UI panel fluctuations

console.log("🧩 consolePanelFluxBinder.js engaged");

export function stabilizePanelFlux(panel) {
  if (!panel) return;

  panel.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  panel.style.transform = "translate3d(0, 0, 0)";
  panel.style.opacity = "1";

  // Reset any flux-related styles
  panel.classList.remove("flux-glitch");
}

export function applyFluxGlitch(panel) {
  if (!panel) return;

  panel.classList.add("flux-glitch");
}
