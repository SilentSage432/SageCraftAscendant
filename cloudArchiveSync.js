

// ================================
// Phase 65 — Cloud Archive Sync Engine
// ================================

window.cloudArchiveSync = {
    DROPBOX_ARCHIVE_KEY: "/auditArchive.json",

    uploadArchive: async function() {
        if (!window.auditArchive || !window.dropbox) {
            console.warn("⚠ Archive or Dropbox module missing.");
            return;
        }

        const archive = window.auditArchive.getArchive();
        const data = JSON.stringify(archive, null, 2);
        const blob = new Blob([data], { type: "application/json" });

        try {
            await window.dropbox.uploadFile(this.DROPBOX_ARCHIVE_KEY, blob);
            alert("✅ Audit archive successfully uploaded to Dropbox.");
        } catch (err) {
            console.error("Upload failed:", err);
            alert("❌ Upload failed. See console for details.");
        }
    },

    downloadArchive: async function() {
        if (!window.auditArchive || !window.dropbox) {
            console.warn("⚠ Archive or Dropbox module missing.");
            return;
        }

        try {
            const fileContent = await window.dropbox.downloadFile(this.DROPBOX_ARCHIVE_KEY);
            const parsed = JSON.parse(fileContent);
            localStorage.setItem(window.auditArchive.ARCHIVE_KEY, JSON.stringify(parsed));
            alert("✅ Audit archive successfully restored from Dropbox.");
            document.getElementById('viewAuditHistoryBtn').click();
        } catch (err) {
            console.error("Download failed:", err);
            alert("❌ Download failed. See console for details.");
        }
    }
};