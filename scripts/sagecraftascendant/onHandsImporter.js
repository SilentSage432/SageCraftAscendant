

// ================================
// Phase 61.5 — On-Hands File Importer Core
// ================================

window.onHandsImporter = {

    parseFileContent: function(content) {
        const lines = content.split('\n');
        const onHands = {};

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;

            // Expecting format: ItemNumber:Count
            const parts = trimmed.split(':');
            if (parts.length === 2) {
                const itemNumber = parts[0].trim();
                const count = parseInt(parts[1].trim(), 10);
                if (!isNaN(count)) {
                    onHands[itemNumber] = count;
                }
            }
        });

        console.log("📄 Parsed On-Hands data:", onHands);
        return onHands;
    },

    handleFileSelect: function(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const parsed = this.parseFileContent(content);
            if (window.liveTableManager) {
                window.liveTableManager.importOnHands(parsed);
            }
        };
        reader.readAsText(file);
    },

    attachFileInputListener: function(inputElementId) {
        const fileInput = document.getElementById(inputElementId);
        if (!fileInput) {
            console.warn(`⚠ On-Hands Importer: File input #${inputElementId} not found.`);
            return;
        }

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileSelect(file);
            }
        });
    }
};