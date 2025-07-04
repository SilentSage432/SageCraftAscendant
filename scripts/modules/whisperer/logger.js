

/**
 * Appends a message to the Whisperer message log.
 * @param {string} text - The message content to log.
 * @param {string} sender - Either "user" or "system" (default: "system")
 */
export function logMessage(text, sender = "system") {
  const logContainer = document.querySelector('#whispererConsole .message-log');
  if (!logContainer) return;

  const messageEl = document.createElement('div');
  messageEl.classList.add('message', sender);
  messageEl.textContent = text;

  logContainer.appendChild(messageEl);
  logContainer.scrollTop = logContainer.scrollHeight;
}