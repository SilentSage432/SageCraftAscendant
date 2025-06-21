

// inputFieldValidator.js
// 🛡️ Phase 352.0 — Input Field Validator Core

export function validateInputField(inputElement, validationRules = {}) {
  if (!inputElement) return false;

  const value = inputElement.value.trim();
  let isValid = true;

  if (validationRules.required && value === "") {
    isValid = false;
    inputElement.classList.add("input-error");
  } else {
    inputElement.classList.remove("input-error");
  }

  if (validationRules.pattern && !validationRules.pattern.test(value)) {
    isValid = false;
    inputElement.classList.add("input-error");
  }

  if (validationRules.custom && typeof validationRules.custom === "function") {
    if (!validationRules.custom(value)) {
      isValid = false;
      inputElement.classList.add("input-error");
    }
  }

  return isValid;
}