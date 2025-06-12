document.addEventListener("DOMContentLoaded", () => {
  const orbits = document.querySelectorAll(".orbit-btn");
  const panels = document.querySelectorAll(".holo-console");

  orbits.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetPanel = document.getElementById(targetId);

      const isActive = btn.classList.contains("engaged");

      // Reset all panels and buttons
      panels.forEach(panel => {
        panel.style.display = "none";
        panel.classList.remove("engaged");
      });

      orbits.forEach(button => button.classList.remove("engaged"));

      if (!isActive) {
        btn.classList.add("engaged");
        if (targetPanel) {
          targetPanel.style.display = "block";
          targetPanel.classList.add("engaged");
        }
      }
    });
  });
});