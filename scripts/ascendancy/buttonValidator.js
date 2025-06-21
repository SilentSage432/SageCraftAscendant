// buttonValidator.js

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-target]");
  const missingTargets = [];

  buttons.forEach(button => {
    const targetId = button.getAttribute("data-target");
    const targetPanel = document.getElementById(targetId);

    if (!targetPanel) {
      console.warn(`⚠️ Button with label "${button.innerText}" targets missing panel: #${targetId}`);
      missingTargets.push({ button, targetId });

      // Optionally disable the button or flag it
      button.classList.add("invalid-target");
      button.setAttribute("disabled", true);
    }
  });

  if (missingTargets.length > 0) {
    console.log(`🔍 Button Validator Report: ${missingTargets.length} invalid target(s) found.`);
  } else {
    console.log("✅ All button targets are valid.");
  }
});
