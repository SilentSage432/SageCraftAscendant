

console.log("🛠️ UI Render Compensator Engaged");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".holo-console").forEach(panel => {
      const visibility = getComputedStyle(panel).visibility;
      const opacity = getComputedStyle(panel).opacity;
      if (visibility === "hidden" || opacity === "0") {
        panel.style.display = "none";
        panel.style.visibility = "hidden";
        panel.style.opacity = "0";
      }
    });
  }, 500); // delay to allow other scripts to complete
});