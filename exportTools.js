

// ================================
// Phase 62 — Delta Audit Report Export Engine
// ================================

window.exportTools = {
    exportDeltaReport: function() {
        if (!window.liveTableManager) {
            console.warn("⚠ Live Table Manager not found.");
            return;
        }

        const rows = window.liveTableManager.table;
        const onHands = window.liveTableManager.onHandData || {};

        let csv = "ItemNumber,UPC,ScannedCount,ExpectedOnHand,Delta,VarianceLevel\n";

        rows.forEach(row => {
            const scannedCount = row.count;
            const expected = onHands[row.itemNumber] || 0;
            const delta = scannedCount - expected;

            let variance = 'Good';
            if (delta === 0) {
                variance = 'Good';
            } else if (Math.abs(delta) <= 2) {
                variance = 'Warning';
            } else {
                variance = 'Critical';
            }

            csv += `${row.itemNumber},${row.upc},${scannedCount},${expected},${delta},${variance}\n`;
        });

        // Archive the CSV before export
        if (window.auditArchive) {
            window.auditArchive.saveAudit(csv);
        }

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `DeltaAudit_${this.getTimestamp()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    getTimestamp: function() {
        const now = new Date();
        return now.toISOString().replace(/[:.]/g, "-");
    }
};