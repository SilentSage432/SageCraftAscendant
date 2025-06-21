console.log("🧲 panelMagneticFeedback.js engaged");

export function triggerMagneticFeedback(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  // Add magnetic feedback visual cue
  panel.classList.add("magnetic-glow");

  // Optional: Play sound effect
  const audio = new Audio("assets/sounds/magnetic_snap.mp3");
  audio.play().catch(e => console.warn("Sound playback failed:", e));

  // Remove the glow after a short duration
  setTimeout(() => {
    panel.classList.remove("magnetic-glow");
  }, 500);
}
