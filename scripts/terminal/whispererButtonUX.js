

// 🌡️ Vitals Toggle Logic
const vitalsPanel = document.getElementById("whispererVitals");
const vitalsToggleButton = document.getElementById("toggleVitalsPanel");

if (vitalsToggleButton && vitalsPanel) {
  vitalsToggleButton.addEventListener("click", () => {
    const isVisible = vitalsPanel.style.display !== "none";
    vitalsPanel.style.display = isVisible ? "none" : "block";
    vitalsToggleButton.textContent = isVisible ? "🧬 Show Vitals" : "❌ Hide Vitals";
  });
}


// 🌟 whispererButtonUX.js — Phase 8: Button Behaviors & Feedback States

document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendWhispererMessage");
  const inputField = document.getElementById("whispererInput");

  if (sendButton && inputField) {
    // Hover effects
    sendButton.addEventListener("mouseenter", () => {
      sendButton.style.backgroundColor = "#00ffff";
      sendButton.style.color = "#000";
    });

    sendButton.addEventListener("mouseleave", () => {
      sendButton.style.backgroundColor = "#111";
      sendButton.style.color = "#a6d4ff";
    });

    // Click feedback
    sendButton.addEventListener("mousedown", () => {
      sendButton.style.transform = "scale(0.95)";
    });

    sendButton.addEventListener("mouseup", () => {
      sendButton.style.transform = "scale(1)";
    });

    // Disabled state logic
    inputField.addEventListener("input", () => {
      sendButton.disabled = inputField.value.trim() === "";
      sendButton.style.opacity = sendButton.disabled ? "0.5" : "1";
      sendButton.style.cursor = sendButton.disabled ? "not-allowed" : "pointer";
    });

    // Initialize state
    inputField.dispatchEvent(new Event("input"));
  }
});