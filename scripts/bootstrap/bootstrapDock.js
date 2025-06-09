

// 🧭 Sovereign Ascendant — bootstrapDock.js
// Handles Dock Resurrection, Fluidity, Elasticity & Visual Restoration

(function initializeBootstrapDock() {
  console.log("🚢 Sovereign Dock Resurrection System Engaged.");

  function initializeDockResurrection() {
    const dock = document.getElementById("sovereignDock");

    if (!dock) {
      console.error("❌ Sovereign Dock element not found.");
      return;
    }

    dock.style.transition = "all 0.3s ease";
    dock.style.opacity = "1";
    dock.style.transform = "translateY(0)";
    console.log("✅ Sovereign Dock successfully resurrected.");
  }

  function activateDockFluidity() {
    console.log("💧 Sovereign Dock Fluidity Activated.");
    const dock = document.getElementById("sovereignDock");

    if (!dock) return;

    dock.addEventListener("mouseover", () => {
      dock.style.transform = "scale(1.02)";
    });

    dock.addEventListener("mouseout", () => {
      dock.style.transform = "scale(1)";
    });

    console.log("✅ Dock Elasticity Layer Active.");
  }

  initializeDockResurrection();
  activateDockFluidity();
})();