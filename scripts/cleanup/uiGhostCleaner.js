

document.addEventListener("DOMContentLoaded", () => {
  const ghostSelectors = [
    '.console-name',
    '.panel-label',
    '.console-preview',
    '.ghost-label',
    '.grid-slot span',
    '.grid-slot .desc'
  ];

  ghostSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = "none";
      el.style.visibility = "hidden";
      el.style.opacity = "0";
    });
  });
});