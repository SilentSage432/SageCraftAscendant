

// ================================
// Phase 60 — Live Table Manager: ItemNumber Anchored Counting Engine
// ================================

window.liveTableManager = {
    table: [],

    addRow: function(entry) {
        const existing = this.table.find(row => row.itemNumber === entry.itemNumber);
        if (existing) {
            existing.count += entry.count;
            console.log(`🔄 Incremented count for Item ${entry.itemNumber}: New count ${existing.count}`);
        } else {
            this.table.push(entry);
            console.log(`➕ Added new Item ${entry.itemNumber} to live table.`);
        }
        this.renderTable();
    },

    renderTable: function() {
        const tableBody = document.getElementById('liveScanTableBody');
        if (!tableBody) {
            console.warn("⚠ Live table body element not found.");
            return;
        }

        tableBody.innerHTML = ''; // Clear existing rows

        this.table.sort((a, b) => a.itemNumber.localeCompare(b.itemNumber));

        this.table.forEach(row => {
            const tr = document.createElement('tr');
            const delta = this.calculateDelta(row.itemNumber, row.count);
            let deltaColor = '';
            if (delta === 0) {
                deltaColor = 'green';
            } else if (Math.abs(delta) <= 2) {
                deltaColor = 'orange';
            } else {
                deltaColor = 'red';
            }

            tr.innerHTML = `
                <td>${row.itemNumber}</td>
                <td>${row.upc}</td>
                <td>${row.count}</td>
                <td>${row.category || ''}</td>
                <td>${row.location || ''}</td>
                <td style="color:${deltaColor}">${delta}</td>
            `;
            tableBody.appendChild(tr);
        });

        this.updateCounter();
    },

    updateCounter: function() {
        const counterEl = document.getElementById('totalScannedCount');
        if (counterEl) {
            counterEl.textContent = this.table.reduce((sum, row) => sum + row.count, 0);
        }
    },

    // Phase 61 — Delta Comparison Engine

    onHandData: {},

    importOnHands: function(onHands) {
        // Expects object format: { itemNumber: count, ... }
        this.onHandData = onHands;
        console.log("📦 On-Hands data imported:", this.onHandData);
        this.renderTable();
    },

    calculateDelta: function(itemNumber, scannedCount) {
        const expected = this.onHandData[itemNumber] || 0;
        return scannedCount - expected;
    }
};