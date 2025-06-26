document.addEventListener("DOMContentLoaded", () => {
  const gridSystem = document.getElementById("sovereignGridSystem");

  if (!gridSystem) {
    console.warn("⚠️ Sovereign Grid System not found.");
    return;
  }

  let terminal = document.getElementById("commandBridgeTerminal");

  if (!terminal) {
    terminal = document.createElement("div");
    terminal.id = "commandBridgeTerminal";
    terminal.classList.add("center-terminal");
    terminal.innerHTML = `<div class="terminal-display">Awaiting Command...</div>`;
    gridSystem.appendChild(terminal);
  }

  terminal.style.position = "absolute";
  terminal.style.top = "50%";
  terminal.style.left = "50%";
  terminal.style.transform = "translate(-50%, -50%)";
  terminal.style.zIndex = "1000";
  terminal.style.minWidth = "600px";
  terminal.style.minHeight = "200px";
  terminal.style.background = "rgba(10, 10, 15, 0.9)";
  terminal.style.border = "2px solid #9c27b0";
  terminal.style.borderRadius = "8px";
  terminal.style.padding = "20px";
  terminal.style.color = "#ffffff";
  terminal.style.fontFamily = "monospace";
  terminal.style.boxShadow = "0 0 12px #9c27b0";
});
