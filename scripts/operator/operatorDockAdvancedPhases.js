

// SageCraft Ascendant — Phase 600.2 Advanced Sovereign Dock Injection Layer

console.log("🚀 Sovereign Advanced Dock Module Initialized");

// Wire the advanced toggle logic into Sovereign Mesh
setTimeout(() => {
    console.log("🚦 Executing Phase 600.2 Sovereign Dock Toggle Binding...");

    const dockButtons = document.querySelectorAll(".dock-toggle");
    const dockPanels = document.querySelectorAll(".tab-section");

    function showPanel(panelId) {
        dockPanels.forEach(panel => {
            panel.style.display = (panel.id === panelId) ? 'block' : 'none';
        });
        console.log(`✅ Sovereign Display Panel: ${panelId}`);
    }

    dockButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetPanel = button.getAttribute("data-panel");
            if (targetPanel) {
                showPanel(targetPanel);
            }
        });
    });

    showPanel("count");

}, 200);