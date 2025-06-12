


document.addEventListener("DOMContentLoaded", () => {
  const orbits = document.querySelectorAll(".orbit-btn");
  const panels = document.querySelectorAll(".holo-console");

  orbits.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");

      panels.forEach((panel) => {
        if (panel.id === target) {
          panel.style.display = "block";
        } else {
          panel.style.display = "none";
        }
      });

      orbits.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});