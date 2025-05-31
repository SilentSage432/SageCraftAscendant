

// ===============================
// Global Constants & Shared State
// Inventory Auditor — Modular Refactor v1
// ===============================

// App Version
const APP_VERSION = "2.0.0";

// Global Maps
let upcToItem = {};
let eslMap = {};
let locationMap = {};
let sessionMap = {};
let activeSession = null;

// Dropbox Integration State
let dropboxAccessToken = null;
let dropboxRefreshToken = null;

// DOM Element Cache (can be wired later as part of auto-wiring)
const DOMCache = {
    buttons: {},
    modals: {},
    panels: {}
};

// Global Flags
let debugMode = true;
let safeMode = false;
let maintenanceMode = false;

// App Configurations
const AppConfig = {
    debounceDelay: 250,
    modalAnimationSpeed: 300,
    maxRetryAttempts: 3,
    dropboxSyncInterval: 300000, // 5 min
};

// Global Utility Namespace (can be extended in utilities.js later)
const GlobalUtils = {
    log: (msg, data) => {
        if (debugMode) {
            console.log(`[DEBUG] ${msg}`, data || '');
        }
    },
    warn: (msg, data) => {
        console.warn(`[WARNING] ${msg}`, data || '');
    },
    error: (msg, data) => {
        console.error(`[ERROR] ${msg}`, data || '');
    }
};

// Expose globalButtonMap placeholder (to be populated during wiring phase)
window.globalButtonMap = {};