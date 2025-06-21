// terminalVisibilityController.js

let terminalVisible = false;

export function toggleTerminalVisibility() {
  const terminal = document.querySelector('#sovereignTerminal');
  if (!terminal) return;

  terminalVisible = !terminalVisible;
  terminal.style.display = terminalVisible ? 'block' : 'none';
}

export function hideTerminal() {
  const terminal = document.querySelector('#sovereignTerminal');
  if (terminal) {
    terminal.style.display = 'none';
    terminalVisible = false;
  }
}

export function showTerminal() {
  const terminal = document.querySelector('#sovereignTerminal');
  if (terminal) {
    terminal.style.display = 'block';
    terminalVisible = true;
  }
}

export function isTerminalVisible() {
  return terminalVisible;
}

document.addEventListener('DOMContentLoaded', () => {
  // Prevent terminal from showing on load
  hideTerminal();

  // Hook up toggle button if exists
  const toggleBtn = document.querySelector('#terminalToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTerminalVisibility);
  }
});
