// ===============================
// App Bootloader — init.js
// Inventory Auditor — Modular Refactor v1
// ===============================

import './globals.js';
import { formatDate, generateUUID, delay } from './utilities.js';
import { handleScanInput } from './scanHandlers.js';
import { handleAddItem, handleConfirmAddItem } from './addHandlers.js';
import { handleEditItem, handleConfirmEdit, handleCancelEdit, handleCloseSummary, handleToggleDevDashboard } from './editHandlers.js';
import { globalButtonMap } from './buttonMap.js';
import { 
  syncAllMapsToDropbox,
  restoreAllMapsFromDropbox,
  refreshAccessToken,
  saveSessionToDropbox,
  loadSessionFromDropbox
} from './dropbox.js';
import { displayAppVersion } from './version.js';

// Unified Global Export Bridge
window.InventoryApp = {
  // Utilities
  formatDate,
  generateUUID,
  delay,

  // Handlers
  handleScanInput,
  handleAddItem,
  handleEditItem,
  handleConfirmEdit,
  handleCancelEdit,
  handleCloseSummary,
  handleToggleDevDashboard
};

// ✅ ✅ ✅ Here is where Phase 16000 kicks in ✅ ✅ ✅

window.addEventListener('NeuralRegistryReady', () => {
    console.log("✅ Neural Registry Ready — Initializing Wiring...");

    if (!window.__buttonsWired__) {
        window.wireAllButtons();
        displayAppVersion();
        window.__buttonsWired__ = true;
    }

    // Phase 102.1 — Session Recovery Healer
    try {
        const testSessions = JSON.parse(localStorage.getItem("savedSessions") || "{}");
        if (typeof testSessions !== 'object' || Array.isArray(testSessions)) {
          console.warn("⚠️ Detected corrupted savedSessions data — auto-resetting.");
          localStorage.removeItem("savedSessions");
        }
    } catch (err) {
        console.warn("⚠️ Session data parse failure — purging invalid sessions.");
        localStorage.removeItem("savedSessions");
    }

    // Phase 102.2 — Mapping Recovery Healer
    try {
        const testMap = JSON.parse(localStorage.getItem("upcToItemMap") || "{}");
        if (typeof testMap !== 'object' || Array.isArray(testMap)) {
          console.warn("⚠️ Detected corrupted upcToItemMap data — auto-resetting.");
          localStorage.removeItem("upcToItemMap");
        }
    } catch (err) {
        console.warn("⚠️ Mapping data parse failure — purging invalid mappings.");
        localStorage.removeItem("upcToItemMap");
    }

    // Phase 102.3 — Memory Vault Auto-Healer
    try {
        const testMemory = JSON.parse(localStorage.getItem("longTermHeuristicMemory") || "{}");
        if (typeof testMemory !== 'object' || Array.isArray(testMemory)) {
          console.warn("⚠️ Detected corrupted longTermHeuristicMemory — auto-resetting.");
          localStorage.removeItem("longTermHeuristicMemory");
        }
    } catch (err) {
        console.warn("⚠️ Long-term memory parse failure — purging invalid longTermHeuristicMemory.");
        localStorage.removeItem("longTermHeuristicMemory");
    }

    console.log("✅ Master wiring executed post-boot");

    // Phase 106.1 — Production Global Failsafe Logger
    window.addEventListener('error', (event) => {
        console.error("🔥 Global Error Captured:", event.message, "at", event.filename, ":", event.lineno);
        showToast("⚠️ System Error Captured — Check Console Log");
    });

    // Phase 106.2 — Storage Integrity Validator
    function validateStorageIntegrity() {
        const keys = ["savedSessions", "upcToItemMap", "longTermHeuristicMemory"];
        let corruptionDetected = false;

        keys.forEach(key => {
            try {
                const test = JSON.parse(localStorage.getItem(key) || "{}");
                if (typeof test !== 'object' || Array.isArray(test)) {
                  console.warn(`⚠️ Corruption detected in ${key} — structure invalid.`);
                  corruptionDetected = true;
                }
            } catch {
                console.warn(`⚠️ Corruption detected in ${key} — parse failure.`);
                corruptionDetected = true;
            }
        });

        if (corruptionDetected) {
            showToast("⚠️ Storage Integrity Warning — Review Console Logs");
        } else {
            console.log("✅ Storage Integrity Check Passed");
        }
    }
    validateStorageIntegrity();

    // Phase 14007 — Orbital Dock Live Boot Trigger
    try {
        if (window.NeuralOrbitalDockMesh?.renderOrbitalDock) {
            NeuralOrbitalDockMesh.renderOrbitalDock();
            console.log("✅ Orbital Dock Rendered via Neural Registry");
        } else {
            console.error("❌ NeuralOrbitalDockMesh.renderOrbitalDock() unavailable.");
        }
    } catch (err) {
        console.error("❌ Orbital Dock Live Boot Failure:", err);
    }
});