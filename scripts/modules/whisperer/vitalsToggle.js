


/**
 * Toggles the visibility of the Vitals panel inside the Whisperer console.
 * Assumes a toggle button with `.vitals-toggle` class is present.
 */
export function toggleVitalsPanel() {
  const vitalsPanel = document.querySelector('#whispererVitals');
  if (!vitalsPanel) return;

  vitalsPanel.classList.toggle('visible');
}

// Optional helper to wire up the button
export function bindVitalsToggle() {
  const toggleButton = document.querySelector('.vitals-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleVitalsPanel);
  }
}