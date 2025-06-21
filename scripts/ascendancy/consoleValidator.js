// consoleValidator.js
// Validates presence and integrity of all registered console panels

export function validateConsolePanels(expectedIds = []) {
  const missingPanels = [];
  const duplicatePanels = new Set();
  const seen = new Set();

  expectedIds.forEach(id => {
    const elements = document.querySelectorAll(`#${id}`);
    if (elements.length === 0) {
      missingPanels.push(id);
    } else if (elements.length > 1) {
      duplicatePanels.add(id);
    } else {
      seen.add(id);
    }
  });

  return {
    missing: missingPanels,
    duplicates: Array.from(duplicatePanels),
    found: Array.from(seen),
  };
}

// Example usage (to be moved or imported elsewhere)
// const expected = ['oracleConsole', 'sageFeedConsole', ...];
// const results = validateConsolePanels(expected);
// console.log("Validation Results:", results);
