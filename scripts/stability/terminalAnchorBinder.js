

// 🧲 terminalAnchorBinder.js
// Anchors terminal panels to fixed zones within the console UI grid

export function bindTerminalAnchors() {
  const terminals = document.querySelectorAll('.console-terminal');

  terminals.forEach(terminal => {
    const anchorPoint = terminal.getAttribute('data-anchor');
    if (!anchorPoint) return;

    const anchorTarget = document.querySelector(`#${anchorPoint}`);
    if (anchorTarget) {
      anchorTarget.appendChild(terminal);
      terminal.classList.add('anchored-terminal');
    }
  });
}