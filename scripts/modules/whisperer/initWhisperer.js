

import { handleInputSubmission } from './inputHandler.js';
import { bindVitalsToggle } from './vitalsToggle.js';

/**
 * Initializes Whisperer console functionality on DOM load.
 */
export function initWhisperer() {
  const sendButton = document.querySelector('#whispererConsole .send-button');
  const inputField = document.querySelector('#whispererConsole .chat-input');

  if (sendButton) {
    sendButton.addEventListener('click', handleInputSubmission);
  }

  if (inputField) {
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleInputSubmission();
      }
    });
  }

  // Optional bind for vitals toggle
  bindVitalsToggle();

  console.log('🧠 Whisperer initialized');
}