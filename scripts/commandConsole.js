

// ================================
// Phase 40 — Operational Command Console
// ================================

window.commandConsole = {
    statusReport: function() {
        console.log("🧬 === INVENTORY AUDITOR SYSTEM STATUS ===");

        console.log("📊 Adaptive Scan Log Size:", (window.adaptiveScanLog || []).length);
        console.log("🧪 Classifier Count:", (window.resolverClassifierLoader?.classifiers || []).length);
        console.log("🧠 Mutation Stats:", window.classifierEvolution?.mutations || {});

        const itemMap = JSON.parse(localStorage.getItem("itemLinkMap") || "{}");
        console.log("📦 Item Mappings:", Object.keys(itemMap).length, "mappings");

        console.log("☁ Dropbox Auto Refresh:", window.dropboxAutoRefresh?.timer ? "Active" : "Inactive");
        console.log("☁ Unified Cloud Sync:", window.unifiedCrossSyncEngine ? "Online" : "Offline");

        console.log("🧬 ========================================");
    },

    forceFullSync: async function() {
        console.log("🧬 Manual Unified Cloud Sync Starting...");
        await window.unifiedCrossSyncEngine.fullSave();
        console.log("🧬 Manual Unified Cloud Sync Complete.");
    },

    forceRefreshDropbox: async function() {
        if (!window.dropboxSyncEngine) {
            console.warn("⚠ Dropbox Sync Engine not initialized.");
            return;
        }
        await dropboxSyncEngine.refreshAccessToken();
    },

    runFullAuditExport: function() {
        return window.fieldAuditEngine.exportSnapshot();
    },

    runConflictCheck: function() {
        window.adaptiveConsensusEngine.resolveConflicts();
    },

    runClassifierRefinement: function() {
        window.classifierRefinementEngine.refine();
    },

    runMutationScoring: function() {
        window.mutationScorer.scorePrefixes();
    }
};

console.log("🧬 Operational Command Console Loaded.");