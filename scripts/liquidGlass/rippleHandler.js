


// 🧬 Phase 18000.2 — Ripple Feedback Engine

document.addEventListener("DOMContentLoaded", () => {
  function createRippleEffect(x, y, target) {
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  function attachRipples(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener("click", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createRippleEffect(x, y, el);
      });
    });
  }

  attachRipples(".liquid-pane");
  attachRipples(".orbit-btn");
});