// ================================
// Phase 43 — Linker Memory Core Expansion
// ================================

window.itemLinkStorage = {
    version: 1,

    loadMemory: function() {
        const raw = localStorage.getItem("itemLinkMemory");
        if (!raw) return { version: this.version, mappings: {} };
        try {
            return JSON.parse(raw);
        } catch {
            return { version: this.version, mappings: {} };
        }
    },

    saveMemory: function(memory) {
        localStorage.setItem("itemLinkMemory", JSON.stringify(memory));
    },

    saveMapping: function(upc, itemNumber, category) {
        const memory = this.loadMemory();
        memory.mappings[upc] = { 
            item: itemNumber, 
            category: category,
            linked: new Date().toISOString() 
        };
        this.saveMemory(memory);
        console.log(`🧬 Item mapping saved: UPC ${upc} → Lowe's Item ${itemNumber} [${category}]`);
        if (window.liveTableManager && typeof window.liveTableManager.addRow === 'function') {
            window.liveTableManager.addRow({
                itemNumber: itemNumber,
                upc: upc,
                count: 1,
                category: category || 'Unassigned',
                location: '',
                previous: '',
                delta: ''
            });
            console.log("📊 Live table row inserted automatically (from core saveMapping hook).");
            window.liveTableManager.renderTable();
        }
    },

    getMapping: function(upc) {
        const memory = this.loadMemory();
        return memory.mappings[upc] ? memory.mappings[upc] : null;
    },

    exportMappings: function() {
        const memory = this.loadMemory();
        return memory.mappings;
    },

    importMappings: function(importedMap) {
        const memory = this.loadMemory();
        for (const [upc, data] of Object.entries(importedMap)) {
            memory.mappings[upc] = data;
        }
        this.saveMemory(memory);
    },

    getExportPayload: function() {
        const memory = this.loadMemory();
        return JSON.stringify(memory);
    }
};

// ================================
// Phase 42.5 — Modal Manager Link Loader Injection
// ================================

// ================================
// Phase 43 — Item Link Modal Core Rendering Engine
// ================================

window.itemLinkModalManager = {
    currentUPC: null,

    promptForLink: function(upc) {
        this.currentUPC = upc;

        // Pre-fill modal fields
        document.getElementById("itemLinkUpc").value = upc;
        document.getElementById("itemLinkItemNumber").value = "";

        // Show the modal
        document.getElementById("itemLinkModalContainer").style.display = "flex";
    },

    saveLink: function() {
        const itemNumber = document.getElementById("itemLinkItemNumber").value.trim();
        const category = document.getElementById("itemLinkCategory").value.trim() || 'Unassigned';
        if (!itemNumber) {
            alert("Please enter a valid Lowe's Item Number.");
            return;
        }

        window.itemLinkStorage.saveMapping(this.currentUPC, itemNumber, category);
        if (window.liveTableManager && typeof window.liveTableManager.addRow === 'function') {
            window.liveTableManager.addRow({
                itemNumber: itemNumber,
                upc: this.currentUPC,
                count: 1,
                category: category,
                location: '',
                previous: '',
                delta: ''
            });
            console.log("📊 Live table row inserted automatically.");
            window.liveTableManager.renderTable();
        }
        this.closeModal();
    },

    closeModal: function() {
        document.getElementById("itemLinkModalContainer").style.display = "none";
    },

    wireModal: function() {
        document.getElementById("saveItemLinkBtn").onclick = () => this.saveLink();
        document.getElementById("cancelItemLinkBtn").onclick = () => this.closeModal();

        const categorySelect = document.getElementById("itemLinkCategory");
        const categories = [
            "Laundry",
            "Fridges & Freezers",
            "Ranges",
            "Dishwashers",
            "Wall Ovens",
            "Cooktops",
            "OTR Microwaves",
            "Microwaves (Countertop)",
            "Vent Hoods",
            "Beverage & Wine Coolers",
            "Cabinets",
            "Countertops",
            "Interior Doors",
            "Exterior Doors",
            "Storm Doors",
            "Windows",
            "Commodity Moulding",
            "Other / Misc"
        ];

        categorySelect.innerHTML = "";
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    },

    promptForOverride: function(upc, mapping, confidence) {
        this.currentUPC = upc;

        const message = `Predictive Mapping Suggestion:\n\nUPC: ${upc}\nMapped Lowe's Item: ${mapping.item}\nCategory: ${mapping.category}\nConfidence: ${(confidence * 100).toFixed(1)}%\n\nAccept this mapping?`;

        if (confirm(message)) {
            window.itemLinkStorage.saveMapping(upc, mapping.item, mapping.category);
            if (window.liveTableManager && typeof window.liveTableManager.addRow === 'function') {
                window.liveTableManager.addRow({
                    itemNumber: mapping.item,
                    upc: upc,
                    count: 1,
                    category: mapping.category || 'Unassigned',
                    location: '',
                    previous: '',
                    delta: ''
                });
                console.log("📊 Predictive mapping manually approved and inserted.");
                window.liveTableManager.renderTable();
            }
        } else {
            console.log("⚠ Predictive mapping manually rejected by user.");
        }
    }
};

// Auto-wire on DOM load
window.addEventListener("DOMContentLoaded", () => {
    if (window.itemLinkModalManager) {
        window.itemLinkModalManager.wireModal();
        console.log("🧬 Item Link Modal Manager fully wired.");
    }
});

// Phase 44 — Item Link Modal Global Bootstrap
window.itemLinkModalManager = window.itemLinkModalManager;
console.log("✅ Item Link Modal Manager wired globally.");