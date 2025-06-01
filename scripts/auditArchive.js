

// ================================
// Phase 63 — Audit History Archive Engine
// ================================

window.auditArchive = {
    ARCHIVE_KEY: "auditHistoryArchive",

    saveAudit: function(csvData) {
        const archive = this.getArchive();
        const timestamp = this.getTimestamp();
        archive[timestamp] = csvData;
        localStorage.setItem(this.ARCHIVE_KEY, JSON.stringify(archive));
        console.log(`📦 Audit archived at ${timestamp}`);
    },

    getArchive: function() {
        const stored = localStorage.getItem(this.ARCHIVE_KEY);
        return stored ? JSON.parse(stored) : {};
    },

    listAudits: function() {
        const archive = this.getArchive();
        return Object.keys(archive).sort().reverse();
    },

    loadAudit: function(timestamp) {
        const archive = this.getArchive();
        return archive[timestamp] || null;
    },

    deleteAudit: function(timestamp) {
        const archive = this.getArchive();
        delete archive[timestamp];
        localStorage.setItem(this.ARCHIVE_KEY, JSON.stringify(archive));
        console.log(`🗑️ Audit ${timestamp} deleted.`);
    },

    getTimestamp: function() {
        const now = new Date();
        return now.toISOString().replace(/[:.]/g, "-");
    }
};