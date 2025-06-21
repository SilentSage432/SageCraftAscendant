// spectralOverlayEngine.js
document.addEventListener("DOMContentLoaded", () => {
  const spectralElements = document.querySelectorAll("[data-spectral-scan]");

  spectralElements.forEach((el) => {
    const type = el.getAttribute("data-spectral-scan");
    el.classList.add("spectral-scan-overlay");

    switch (type) {
      case "forecast":
        el.style.outline = "2px dashed rgba(0, 255, 255, 0.6)";
        break;
      case "memory":
        el.style.outline = "2px dashed rgba(255, 0, 255, 0.6)";
        break;
      case "signal":
        el.style.outline = "2px dashed rgba(255, 255, 0, 0.6)";
        break;
      default:
        el.style.outline = "2px dashed rgba(255, 255, 255, 0.3)";
    }

    el.title = `Spectral Scan: ${type}`;
  });
});
