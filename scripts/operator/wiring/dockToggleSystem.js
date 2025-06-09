// 🌐 SageCraft Dock Toggle System Module

console.log("🔄 Sovereign Dock Toggle System Initialized");

const DockToggleSystem = {
    initializeToggleSystem: function() {
        console.log("🚀 Sovereign Dock Toggle Wiring Active");

        const dockButtons = document.querySelectorAll(".dock-toggle-button");

        dockButtons.forEach(button => {
            const targetId = button.getAttribute("data-target");
            if (!targetId) {
                console.warn("⚠ Dock toggle button missing data-target attribute.");
                return;
            }

            button.addEventListener("click", () => {
                const panel = document.getElementById(targetId);
                if (!panel) {
                    console.warn(`❌ Dock panel '${targetId}' not found.`);
                    return;
                }
                panel.classList.toggle("hidden");
                console.log(`🔀 Toggled dock panel '${targetId}'`);
                DockToggleSystem.saveDockState();
            });
        });

        DockToggleSystem.restoreDockState();
    },

    saveDockState: function() {
        const dockPanels = document.querySelectorAll(".tab-section");
        const state = {};
        dockPanels.forEach(panel => {
            state[panel.id] = !panel.classList.contains("hidden");
        });
        localStorage.setItem("dockState", JSON.stringify(state));
        console.log("💾 Dock state saved.");
    },

    restoreDockState: function() {
        const stateJSON = localStorage.getItem("dockState");
        if (!stateJSON) return;
        const state = JSON.parse(stateJSON);
        for (const panelId in state) {
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.classList.toggle("hidden", !state[panelId]);
            }
        }
        console.log("♻ Dock state restored.");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    DockToggleSystem.initializeToggleSystem();
});
