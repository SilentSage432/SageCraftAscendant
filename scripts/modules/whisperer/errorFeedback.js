

/**
 * Displays an error message inside the Whisperer console UI.
 * This can be styled via CSS under `.whisperer-error-message`.
 */
export function showErrorFeedback(message = "An unknown error occurred.") {
  const logContainer = document.querySelector('#whispererConsole .message-log');
  if (!logContainer) return;

  const errorMsg = document.createElement('div');
  errorMsg.classList.add('whisperer-error-message');
  errorMsg.textContent = `⚠️ ${message}`;

  logContainer.appendChild(errorMsg);
  logContainer.scrollTop = logContainer.scrollHeight;
}