

// ================================
// Phase 37B — Item Link Modal UI Module Injection
// ================================

window.openItemLinkModal = function(upc) {
    let modal = document.getElementById("itemLinkModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "itemLinkModal";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.background = "#222";
        modal.style.color = "#fff";
        modal.style.padding = "20px";
        modal.style.border = "2px solid #888";
        modal.style.zIndex = "9999";
        modal.style.borderRadius = "8px";
        modal.style.boxShadow = "0 0 10px #000";

        modal.innerHTML = `
            <h3>Link Lowe's Item #</h3>
            <p>UPC: <b>${upc}</b></p>
            <input type="text" id="lowesItemInput" placeholder="Enter Lowe's Item #" style="padding:5px; width:200px;">
            <br><br>
            <button id="saveLinkBtn" style="padding:5px 10px; margin-right:10px;">Save</button>
            <button id="cancelLinkBtn" style="padding:5px 10px;">Cancel</button>
        `;
        document.body.appendChild(modal);
    } else {
        modal.querySelector("p").innerHTML = `UPC: <b>${upc}</b>`;
        modal.style.display = "block";
    }

    document.getElementById("saveLinkBtn").onclick = () => {
        const itemNumber = document.getElementById("lowesItemInput").value.trim();
        if (!itemNumber) {
            alert("Please enter a valid Lowe's Item #");
            return;
        }
        window.itemLinkStorage.saveMapping(upc, itemNumber);
        modal.style.display = "none";
    };

    document.getElementById("cancelLinkBtn").onclick = () => {
        modal.style.display = "none";
    };
};

window.itemLinkStorage = {
    saveMapping: function(upc, itemNumber) {
        const map = JSON.parse(localStorage.getItem("itemLinkMap") || "{}");
        map[upc] = itemNumber;
        localStorage.setItem("itemLinkMap", JSON.stringify(map));
        console.log(`🧬 Item mapping saved: UPC ${upc} → Lowe's Item ${itemNumber}`);
    },

    getMapping: function(upc) {
        const map = JSON.parse(localStorage.getItem("itemLinkMap") || "{}");
        return map[upc] || null;
    },

    exportMappings: function() {
        const map = JSON.parse(localStorage.getItem("itemLinkMap") || "{}");
        return map;
    }
};

// ================================
// Phase 37C — Cloud Mapping Sync Integration
// ================================

window.itemLinkCloudSync = {
    filePath: "/adaptive/item_mappings.json",

    async saveToCloud() {
        if (!window.dropboxSyncEngine) {
            console.error("❌ Dropbox Sync Engine not initialized.");
            return;
        }
        const exportData = JSON.stringify(window.itemLinkStorage.exportMappings(), null, 2);
        await dropboxSyncEngine.upload(this.filePath, exportData);
        console.log("🧬 Item mappings saved to cloud.");
    },

    async loadFromCloud() {
        if (!window.dropboxSyncEngine) {
            console.error("❌ Dropbox Sync Engine not initialized.");
            return;
        }
        const data = await dropboxSyncEngine.download(this.filePath);
        if (data) {
            const importedMap = JSON.parse(data);
            const localMap = JSON.parse(localStorage.getItem("itemLinkMap") || "{}");
            const mergedMap = { ...localMap, ...importedMap };
            localStorage.setItem("itemLinkMap", JSON.stringify(mergedMap));
            console.log("🧬 Item mappings loaded and merged from cloud.");
        }
    }
};
// ================================
// Phase 38 — Unified Cross-Sync Engine
// ================================

window.unifiedCrossSyncEngine = {
    async fullSave() {
        console.log("🧬 Starting Unified Cloud Save...");
        await adaptiveCloudMemory.save();
        await itemLinkCloudSync.saveToCloud();
        console.log("🧬 Unified Cloud Save Complete.");
    },

    async fullLoad() {
        console.log("🧬 Starting Unified Cloud Load...");
        await adaptiveCloudMemory.load();
        await itemLinkCloudSync.loadFromCloud();
        console.log("🧬 Unified Cloud Load Complete.");
    },

    startAutoSync(intervalMs = 60000) {
        console.log("🧬 Unified Auto Cloud Sync Online");
        setInterval(async () => {
            await this.fullSave();
        }, intervalMs);
    }
};

// Auto-start unified sync loop
window.unifiedCrossSyncEngine.startAutoSync();