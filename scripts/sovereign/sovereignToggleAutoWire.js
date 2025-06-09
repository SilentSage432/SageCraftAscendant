// === Phase 1000.1: Sovereign Toggle Auto-Wiring System ===

const SovereignToggleAutoWire = (function () {
    function autoWireDockToggles() {
        console.log("🚀 Sovereign Toggle Auto-Wiring System Engaged");

        const dockGrid = document.getElementById("operatorDockGrid");
        if (!dockGrid) {
            console.warn("❌ Dock Grid not found.");
            return;
        }

        const dockPanels = dockGrid.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            const dockId = panel.id;
            const button = document.querySelector(`.dock-toggle-button[data-target='${dockId}']`);

            if (!button) {
                console.warn(`⚠ No toggle button found for dockId '${dockId}'`);
                return;
            }

            // Clear any existing listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener("click", () => {
                panel.classList.toggle("hidden");
                console.log(`🔀 Sovereign Auto-Wired toggle for dock '${dockId}'`);
            });

            console.log(`✅ Auto-Wired toggle for '${dockId}'`);
        });

        console.log("✅ Sovereign Auto-Wiring Complete.");
    }

    // Expose public method
    return {
        autoWireDockToggles
    };
})();

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    SovereignToggleAutoWire.autoWireDockToggles();
});
