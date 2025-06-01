

// ================================
// Phase 63 — Audit History Archive Engine
// ================================

window.auditArchive = {
    ARCHIVE_KEY: "auditHistoryArchive",

    saveAudit: function(csvData) {
        const archive = this.getArchive();
        const timestamp = this.getTimestamp();

        // Compress using base64 encoding
        const compressed = btoa(unescape(encodeURIComponent(csvData)));

        archive[timestamp] = compressed;
        localStorage.setItem(this.ARCHIVE_KEY, JSON.stringify(archive));
        console.log(`📦 Audit archived at ${timestamp} (compressed)`);
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
        const compressed = archive[timestamp];
        if (!compressed) return null;

        // Decompress using base64 decoding
        try {
            return decodeURIComponent(escape(atob(compressed)));
        } catch (err) {
            console.error("⚠ Failed to decompress audit data:", err);
            return null;
        }
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
    },

    normalizeLegacyArchives: function() {
        const archive = this.getArchive();
        let modified = false;

        Object.keys(archive).forEach(timestamp => {
            const value = archive[timestamp];

            // If value is already compressed, skip
            if (typeof value === 'string' && value.match(/^[A-Za-z0-9+/=]+$/)) {
                try {
                    // Try decoding — if valid, assume already compressed
                    atob(value);
                    return;
                } catch (err) {
                    // If decoding fails, treat as legacy
                }
            }

            // Legacy uncompressed entry detected
            const compressed = btoa(unescape(encodeURIComponent(value)));
            archive[timestamp] = compressed;
            console.log(`🔧 Normalized legacy audit: ${timestamp}`);
            modified = true;
        });

        if (modified) {
            localStorage.setItem(this.ARCHIVE_KEY, JSON.stringify(archive));
            console.log("✅ Legacy archive normalization complete.");
        } else {
            console.log("✅ All archives already normalized.");
        }
    },

    mergeAudits: function(timestamps) {
        const archive = this.getArchive();
        const merged = {};

        timestamps.forEach(timestamp => {
            const compressed = archive[timestamp];
            if (!compressed) return;

            let csv = null;
            try {
                csv = decodeURIComponent(escape(atob(compressed)));
            } catch (err) {
                console.error(`⚠ Failed to decompress archive ${timestamp}:`, err);
                return;
            }

            const lines = csv.split('\n').slice(1); // Skip header
            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length >= 3) {
                    const itemNumber = parts[0].trim();
                    const scannedCount = parseInt(parts[2].trim(), 10);
                    if (!isNaN(scannedCount)) {
                        if (!merged[itemNumber]) {
                            merged[itemNumber] = { count: 0 };
                        }
                        merged[itemNumber].count += scannedCount;
                    }
                }
            });
        });

        console.log("🧬 Merged audit result:", merged);
        return merged;
    },

    generateMergedCSV: function(mergedObject) {
        let csv = "ItemNumber,ScannedCount\n";
        Object.keys(mergedObject).forEach(itemNumber => {
            const count = mergedObject[itemNumber].count;
            csv += `${itemNumber},${count}\n`;
        });
        return csv;
    }
};