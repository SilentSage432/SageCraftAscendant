// driftCompensator.js
// Phase 356.0 — Sovereign Drift Compensation System

export function compensateDrift() {
  const consoles = document.querySelectorAll(".holo-console");

  consoles.forEach(console => {
    const rect = console.getBoundingClientRect();
    if (rect.left < 0 || rect.top < 0) {
      console.style.transform = "translate(0, 0)";
      console.dataset.driftCorrected = "true";
      console.style.opacity = 1;
    }
  });

  console.log("[🧭 DriftCompensator] Drift compensation sweep complete.");
}

document.addEventListener("DOMContentLoaded", () => {
  compensateDrift();
  window.addEventListener("resize", compensateDrift);
});
