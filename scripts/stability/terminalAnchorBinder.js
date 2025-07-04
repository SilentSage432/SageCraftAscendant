// 🧲 terminalAnchorBinder.js
// Delayed anchoring of #whispererConsole to maintain center alignment across screen sizes.

export function anchorWhispererTerminal() {
  const checkInterval = 50; // milliseconds
  const maxAttempts = 40; // ~2 seconds
  let attempts = 0;

  const intervalId = setInterval(() => {
    const terminal = document.getElementById("whispererConsole");
    const terminalOutput = document.getElementById("whispererConsoleOutput");

    if (terminal && terminalOutput) {
      clearInterval(intervalId);

      terminal.classList.add("anchored-terminal");

      const event = new CustomEvent("terminalAnchored", {
        detail: { anchored: true, timestamp: Date.now() },
      });
      window.dispatchEvent(event);

      console.log("✅ Whisperer Terminal anchored successfully.");
    } else {
      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        console.warn("❌ Failed to anchor #whispererConsole after max attempts.");
      }
    }
  }, checkInterval);
}

// Auto-trigger on DOMContentLoaded
// window.addEventListener("DOMContentLoaded", () => {
//   anchorWhispererTerminal();
// });