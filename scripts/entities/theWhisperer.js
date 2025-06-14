

// 🌫️ theWhisperer.js — Phase XXIV: Whisperer Genesis Protocol

document.addEventListener("DOMContentLoaded", () => {
  const summonBtn = document.getElementById("whispererSummonBtn");
  const output = document.getElementById("whispererOutput");

  if (!summonBtn || !output) {
    console.warn("🔕 Whisperer DOM elements not found.");
    return;
  }

  const whispers = [
    "The wind carries truths unspoken.",
    "Even shadows have memories.",
    "Echoes remember what minds forget.",
    "The truth hides in silence.",
    "What is forgotten is not gone.",
    "There are stories etched in dust."
  ];

  summonBtn.addEventListener("click", () => {
    const randomWhisper = whispers[Math.floor(Math.random() * whispers.length)];
    output.textContent = randomWhisper;
  });
});