

// === Phase 1000.3: Sovereign Diagnostics Injection ===

const SovereignDiagnostics = (function () {
    function runDiagnostics() {
        console.log("🩺 Sovereign Diagnostics Activated");

        const dockGrid = document.getElementById("operatorDockGrid");
        const totalPanels = dockGrid ? dockGrid.querySelectorAll(".dock-panel").length : 0;
        console.log(`📊 Detected ${totalPanels} sovereign dock panels.`);

        const toggleButtons = document.querySelectorAll(".dock-toggle-button");
        console.log(`📊 Detected ${toggleButtons.length} dock toggle buttons.`);

        // Verify panel and toggle alignment
        toggleButtons.forEach(button => {
            const target = button.getAttribute("data-target");
            const panel = document.getElementById(target);
            if (!panel) {
                console.warn(`⚠ No panel found for toggle '${target}'`);
            } else {
                console.log(`✅ Toggle '${target}' properly wired.`);
            }
        });

        console.log("✅ Sovereign Diagnostics Completed.");
    }

    return {
        runDiagnostics
    };
})();

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    SovereignDiagnostics.runDiagnostics();
});