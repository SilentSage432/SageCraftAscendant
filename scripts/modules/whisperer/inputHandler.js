import { logMessage } from './logger.js';
import { showErrorFeedback } from './errorFeedback.js';

/**
 * Handles user input submission from chat input field.
 * Grabs value, logs it, and clears input.
 */
export function handleInputSubmission() {
  const inputField = document.querySelector('#whispererConsole .chat-input');
  if (!inputField) return;

  const userInput = inputField.value.trim();
  if (!userInput) {
    showErrorFeedback("Input cannot be empty.");
    return;
  }

  logMessage(userInput, "user");

  // Placeholder for future LLM / socket logic
  setTimeout(() => {
    logMessage(`🧠 Echo: "${userInput}"`, "system");
  }, 400);

  inputField.value = '';
}
