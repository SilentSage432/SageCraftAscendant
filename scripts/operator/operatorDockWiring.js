// === Sovereign Dock Panel Map for Alias Resolution ===
const SovereignDockPanelMap = {
  count: "#countConsole",
  deltaAnalyzer: "#deltaAnalyzerConsole",
  reportingHub: "#reportingHubConsole",
  sessionManager: "#sessionManagerConsole",
  utilityHub: "#utilityHubConsole",
  oracle: "#oracleConsole"
};

// Dock wiring object for future dynamic dock control
var OperatorDockWiring = {
    // === Phase 1000.0: Sovereign Dock Population Matrix Injection ===
    populateDockMatrix: function () {
        console.log("🚀 Sovereign Dock Population Matrix Injection Activated");

        const dockDefinitions = [
            { id: "count", label: "📊 Live Counts", description: "Live inventory counting subsystem online." },
            { id: "deltaAnalyzer", label: "Δ Delta Analyzer", description: "Delta analytics subsystem loaded." },
            { id: "exceptionManager", label: "⚠ Exception Manager", description: "Monitoring anomaly exceptions." },
            { id: "progressDashboard", label: "🚦 Progress Dashboard", description: "System progress indicators operational." },
            { id: "reportingHub", label: "📄 Reporting Hub", description: "Report generation subsystem ready." },
            { id: "masterExportHub", label: "📤 Master Export Hub", description: "Bulk export interfaces deployed." },
            { id: "utilityHub", label: "🛠 Utility Hub", description: "Utility tools accessible here." },
            { id: "sessionManager", label: "📂 Session Manager", description: "Session archival and recovery available." },
            { id: "mappings", label: "🗺 Mappings Interface", description: "Mapping configuration subsystem loaded." },
            { id: "tools", label: "🔧 Tools Panel", description: "Developer and diagnostic tools online." },
            { id: "audit", label: "📋 Audit Manager", description: "System audit controls engaged." },
            { id: "configPanel", label: "⚙ Configuration Panel", description: "Codex configuration settings loaded." }
        ];

        const dockGrid = document.getElementById("operatorDockGrid");
        if (!dockGrid) {
            console.warn("❌ Dock Grid container not found.");
            return;
        }

        dockDefinitions.forEach(def => {
            let panel = document.getElementById(def.id);
            if (!panel) {
                panel = document.createElement("div");
                panel.id = def.id;
                panel.classList.add("tab-section", "dock-panel");
                dockGrid.appendChild(panel);
                console.log(`✅ Sovereign Dock Panel Created: ${def.id}`);
            }
            panel.innerHTML = `<h2>${def.label}</h2><p>${def.description}</p>`;
        });

        console.log("✅ Sovereign Dock Population Matrix Injection Complete.");
    },
    dockSchemaVersion: 1,
    eventHooks: {},
// (rest of object unchanged)

    on: function(eventName, callback) {
        if (!this.eventHooks[eventName]) {
            this.eventHooks[eventName] = [];
        }
        this.eventHooks[eventName].push(callback);
        console.log(`🔔 Event hook registered for '${eventName}'`);
    },

    triggerEvent: function(eventName, payload) {
        if (!this.eventHooks[eventName]) return;
        this.eventHooks[eventName].forEach(callback => {
            try {
                callback(payload);
            } catch (err) {
                console.error(`❌ Error in event hook for '${eventName}':`, err);
            }
        });
        this.broadcastLiveState(eventName, payload);
    },

    initializeDockPanels: function() {
        console.log("🔧 Initializing dock panels...");
        // Example wiring logic (stub for now — future expansion ready)
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            panel.addEventListener("click", () => {
                console.log(`Dock panel ${panel.id} activated.`);
            });
        });
    },

    restoreDockState: function() {
        console.log("🔄 Restoring dock state...");
        const stateJSON = localStorage.getItem("dockState");
        if (!stateJSON) {
            console.warn("⚠ No saved dock state found.");
            return;
        }
        const state = JSON.parse(stateJSON);
        if (!state.version) {
            console.warn("⚠ Legacy dock state detected — initiating migration.");
            const migratedState = this.migrateLegacyDockState(state);
            localStorage.setItem("dockState", JSON.stringify(migratedState));
            state.version = migratedState.version;
            state.panels = migratedState.panels;
        }
        if (!state.version || state.version > this.dockSchemaVersion) {
            console.warn("⚠ Incompatible or newer dock state version detected.");
            return;
        }
        if (!this.validateDockState(state)) {
            console.warn("❌ Invalid dock state detected. Aborting restore.");
            return;
        }
        const panels = state.panels || {};
        Object.keys(panels).forEach(id => {
            const selector = SovereignDockPanelMap[id] || `#${id}`;
            const panel = document.querySelector(selector);
            if (!panel) return;
            const dockInfo = panels[id];

            // Apply visibility
            if (dockInfo.visible) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }

            // Apply position
            if (dockInfo.position) {
                if (dockInfo.position.top) panel.style.top = dockInfo.position.top;
                if (dockInfo.position.left) panel.style.left = dockInfo.position.left;
            }
        });
        console.log("✅ Dock state restored.");
        this.triggerEvent("restore", state);
    },

    registerDynamicDock: function(dockId, onClickHandler) {
        console.log(`🚀 Dynamically registering dock panel: ${dockId}`);
        const panel = document.getElementById(dockId);
        if (!panel) {
            console.warn(`❌ Dock panel '${dockId}' not found.`);
            return;
        }

        // Attach provided click handler or default
        const handler = onClickHandler || (() => {
            console.log(`Dock panel ${dockId} activated.`);
        });

        panel.addEventListener("click", handler);
        console.log(`✅ Dock panel '${dockId}' successfully wired.`);

        // Optionally ensure dock panel state saved immediately after registration
        this.saveDockState();
    },

    enableAutoSync: function() {
        console.log("🔄 Enabling Auto-Sync Dock Persistence...");

        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            // Observe class changes for visibility changes
            const observer = new MutationObserver(() => {
                this.saveDockState();
            });

            observer.observe(panel, { attributes: true, attributeFilter: ['class'] });

            // Optional: listen to position changes if you implement draggable docks
            panel.addEventListener("mouseup", () => {
                this.saveDockState();
            });
        });

        console.log("✅ Auto-Sync now actively monitoring dock changes.");
    },

    resetDockState: function() {
        console.log("🧹 Resetting dock state...");
        localStorage.removeItem("dockState");
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            panel.classList.remove("hidden");
            panel.style.top = "";
            panel.style.left = "";
        });
        console.log("✅ Dock state reset to default.");
        this.triggerEvent("reset");
    },

    registerSubsystemDock: function(subsystemConfig) {
        console.log("🔌 Subsystem Dock Registration Initiated...");

        if (!subsystemConfig || !subsystemConfig.dockId) {
            console.warn("❌ Invalid subsystem configuration object.");
            return;
        }

        const dockId = subsystemConfig.dockId;
        const onClick = subsystemConfig.onClick || (() => {
            console.log(`Subsystem Dock ${dockId} clicked.`);
        });

        const panel = document.getElementById(dockId);
        if (!panel) {
            console.warn(`❌ Dock panel '${dockId}' not found in DOM.`);
            return;
        }

        panel.addEventListener("click", onClick);
        console.log(`✅ Subsystem Dock '${dockId}' successfully registered.`);

        // Set initial visibility if specified
        if (typeof subsystemConfig.visible === "boolean") {
            if (subsystemConfig.visible) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }
        }

        // Save immediately after registration
        this.saveDockState();
    },

    exportDockSnapshot: function() {
        console.log("📤 Exporting dock snapshot...");
        const state = {
            version: this.dockSchemaVersion,
            panels: {}
        };
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            state.panels[panel.id] = {
                visible: !panel.classList.contains("hidden"),
                position: {
                    top: panel.style.top || null,
                    left: panel.style.left || null
                }
            };
        });
        console.log("✅ Dock snapshot export complete.");
        return state;
    },

    importDockSnapshot: function(snapshot) {
        console.log("📥 Importing dock snapshot...");
        if (!snapshot || typeof snapshot !== "object") {
            console.warn("❌ Invalid snapshot provided.");
            return;
        }
        if (!snapshot.version) {
            console.warn("⚠ Legacy snapshot detected — initiating migration.");
            snapshot = this.migrateLegacyDockState(snapshot);
        }
        if (snapshot.version > this.dockSchemaVersion) {
            console.warn("⚠ Incompatible snapshot version.");
            return;
        }
        if (!this.validateDockState(snapshot)) {
            console.warn("❌ Invalid snapshot detected. Aborting import.");
            return;
        }
        const panels = snapshot.panels || {};
        Object.keys(panels).forEach(id => {
            const selector = SovereignDockPanelMap[id] || `#${id}`;
            const panel = document.querySelector(selector);
            if (!panel) return;
            const dockInfo = panels[id];

            // Apply visibility
            if (dockInfo.visible) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }

            // Apply position
            if (dockInfo.position) {
                if (dockInfo.position.top) panel.style.top = dockInfo.position.top;
                if (dockInfo.position.left) panel.style.left = dockInfo.position.left;
            }
        });

        // Save the imported state into localStorage
        localStorage.setItem("dockState", JSON.stringify(snapshot));

        console.log("✅ Dock snapshot import complete.");
        this.triggerEvent("import", snapshot);
    },

    registerNewDock: function(dockId) {
        console.log(`➕ Registering new dynamic dock panel: ${dockId}`);
        // Logic to register dynamically added dock panels
        const newPanel = document.getElementById(dockId);
        if (newPanel) {
            newPanel.addEventListener("click", () => {
                console.log(`Dynamic dock panel ${dockId} activated.`);
            });
        } else {
            console.warn(`Dock panel ${dockId} not found.`);
        }
    },

    saveDockState: function() {
        console.log("💾 Saving dock state...");
        const state = {
            version: this.dockSchemaVersion,
            panels: {}
        };
        const dockPanels = document.querySelectorAll(".dock-panel");
        dockPanels.forEach(panel => {
            state.panels[panel.id] = {
                visible: !panel.classList.contains("hidden"),
                position: {
                    top: panel.style.top || null,
                    left: panel.style.left || null
                }
            };
        });
        localStorage.setItem("dockState", JSON.stringify(state));
        this.triggerEvent("save", state);
        console.log("✅ Dock state saved.");
    },

    migrateLegacyDockState: function(legacyState) {
        console.log("🛠 Migrating legacy dock state...");

        const migrated = {
            version: this.dockSchemaVersion,
            panels: {}
        };

        Object.keys(legacyState).forEach(id => {
            const legacyPanel = legacyState[id];
            migrated.panels[id] = {
                visible: typeof legacyPanel.visible === "boolean" ? legacyPanel.visible : true,
                position: legacyPanel.position || { top: null, left: null }
            };
        });

        console.log("✅ Legacy dock state migration complete.");
        return migrated;
    },

    validateDockState: function(state) {
        console.log("🔍 Validating dock state integrity...");

        if (!state || typeof state !== "object") {
            console.error("❌ State is not an object.");
            return false;
        }

        if (!state.version || typeof state.version !== "number") {
            console.error("❌ Missing or invalid schema version.");
            return false;
        }

        if (!state.panels || typeof state.panels !== "object") {
            console.error("❌ Missing panels object.");
            return false;
        }

        let allValid = true;

        Object.keys(state.panels).forEach(id => {
            const panel = state.panels[id];
            if (typeof panel.visible !== "boolean") {
                console.warn(`⚠ Panel '${id}' has invalid 'visible' property.`);
                allValid = false;
            }
            if (!panel.position || typeof panel.position !== "object") {
                console.warn(`⚠ Panel '${id}' has missing or invalid position object.`);
                allValid = false;
            }
        });

        if (allValid) {
            console.log("✅ Dock state integrity confirmed.");
            this.triggerEvent("validate", state);
        } else {
            console.warn("⚠ Dock state contains inconsistencies.");
        }

        return allValid;
    },

    logDockState: function() {
        console.log("🧪 Dock State Diagnostics:");
        const dockPanels = document.querySelectorAll(".dock-panel");
        const snapshot = {
            version: this.dockSchemaVersion,
            panels: {}
        };
        dockPanels.forEach(panel => {
            snapshot.panels[panel.id] = {
                visible: !panel.classList.contains("hidden"),
                position: {
                    top: panel.style.top || null,
                    left: panel.style.left || null
                }
            };
        });
        console.table(snapshot.panels);
        console.log("🧪 Schema Version:", snapshot.version);
    },

    saveProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        const snapshot = this.exportDockSnapshot();
        localStorage.setItem(`dockProfile_${profileName}`, JSON.stringify(snapshot));
        console.log(`✅ Dock profile '${profileName}' saved.`);
        this.triggerEvent("profileSave", { profileName, snapshot });
    },

    loadProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
        if (!profileJSON) {
            console.warn(`⚠ Dock profile '${profileName}' not found.`);
            return;
        }
        const snapshot = JSON.parse(profileJSON);
        this.importDockSnapshot(snapshot);
        console.log(`✅ Dock profile '${profileName}' loaded.`);
        this.triggerEvent("profileLoad", { profileName, snapshot });
    },

    deleteProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        localStorage.removeItem(`dockProfile_${profileName}`);
        console.log(`🗑 Dock profile '${profileName}' deleted.`);
        this.triggerEvent("profileDelete", { profileName });
    },

    listProfiles: function() {
        console.log("📂 Available Dock Profiles:");
        const keys = Object.keys(localStorage).filter(key => key.startsWith("dockProfile_"));
        const profiles = keys.map(key => key.replace("dockProfile_", ""));
        console.table(profiles);
        return profiles;
    },

    // Export the specified profile as a downloadable JSON file
    exportProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
        if (!profileJSON) {
            console.warn(`⚠ Dock profile '${profileName}' not found.`);
            return;
        }
        const blob = new Blob([profileJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${profileName}_dockProfile.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log(`📤 Profile '${profileName}' exported as file.`);
        this.triggerEvent("profileExport", { profileName });
    },

    // Import a profile from raw JSON data (string), saving under the given profile name
    importProfileFromJSON: function(profileName, jsonData) {
        if (!profileName || !jsonData) {
            console.warn("❌ Profile name and valid JSON data required.");
            return;
        }
        let parsed;
        try {
            parsed = JSON.parse(jsonData);
        } catch (err) {
            console.error("❌ Failed to parse JSON data.", err);
            return;
        }
        if (!parsed.version) {
            console.warn("⚠ Legacy profile data detected — initiating migration.");
            parsed = this.migrateLegacyDockState(parsed);
        }
        if (!this.validateDockState(parsed)) {
            console.warn("❌ Invalid profile data detected. Import aborted.");
            return;
        }
        localStorage.setItem(`dockProfile_${profileName}`, JSON.stringify(parsed));
        console.log(`📥 Profile '${profileName}' successfully imported from JSON.`);
        this.triggerEvent("profileImport", { profileName, snapshot: parsed });
    },

    // Default profile management
    setDefaultProfile: function(profileName) {
        if (!profileName) {
            console.warn("❌ Profile name required.");
            return;
        }
        localStorage.setItem("defaultDockProfile", profileName);
        console.log(`✅ Default dock profile set to '${profileName}'.`);
        this.triggerEvent("defaultProfileSet", { profileName });
    },

    getDefaultProfile: function() {
        return localStorage.getItem("defaultDockProfile") || null;
    },

    loadDefaultProfile: function() {
        const profileName = this.getDefaultProfile();
        if (!profileName) {
            console.log("⚠ No default dock profile set.");
            return;
        }
        console.log(`🔄 Attempting to load default dock profile '${profileName}'...`);
        this.loadProfile(profileName);
    },

    // Profile Sync Core
    syncProfile: function(profileName, syncHandler) {
        if (!profileName || typeof syncHandler !== "function") {
            console.warn("❌ Profile name and valid sync handler function required.");
            return;
        }
        const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
        if (!profileJSON) {
            console.warn(`⚠ Dock profile '${profileName}' not found.`);
            return;
        }
        let parsed;
        try {
            parsed = JSON.parse(profileJSON);
        } catch (err) {
            console.error("❌ Failed to parse profile JSON for sync.", err);
            return;
        }
        if (!parsed.version) {
            console.warn("⚠ Legacy profile data detected — initiating migration before sync.");
            parsed = this.migrateLegacyDockState(parsed);
        }
        if (!this.validateDockState(parsed)) {
            console.warn("❌ Invalid profile data detected. Sync aborted.");
            return;
        }
        try {
            syncHandler(profileName, parsed);
            console.log(`📡 Profile '${profileName}' passed to external sync handler.`);
            this.triggerEvent("profileSync", { profileName, snapshot: parsed });
        } catch (err) {
            console.error("❌ Error occurred while executing sync handler:", err);
        }
    },

    syncAllProfiles: function(syncHandler) {
        if (typeof syncHandler !== "function") {
            console.warn("❌ Valid sync handler function required.");
            return;
        }
        const keys = Object.keys(localStorage).filter(key => key.startsWith("dockProfile_"));
        keys.forEach(key => {
            const profileName = key.replace("dockProfile_", "");
            this.syncProfile(profileName, syncHandler);
        });
        console.log("✅ All profiles passed to sync handler.");
    },

    // Profile Merge Engine with conflict strategies
    mergeProfiles: function(primaryProfileName, secondaryProfileName, mergedProfileName, strategy = "preferPrimary") {
        if (!primaryProfileName || !secondaryProfileName || !mergedProfileName) {
            console.warn("❌ All three profile names are required for merge.");
            return;
        }

        const loadProfile = (profileName) => {
            const profileJSON = localStorage.getItem(`dockProfile_${profileName}`);
            if (!profileJSON) {
                console.warn(`⚠ Dock profile '${profileName}' not found.`);
                return null;
            }
            let parsed;
            try {
                parsed = JSON.parse(profileJSON);
            } catch (err) {
                console.error(`❌ Failed to parse profile '${profileName}'.`, err);
                return null;
            }
            if (!parsed.version) {
                console.warn(`⚠ Legacy profile '${profileName}' detected — migrating.`);
                parsed = this.migrateLegacyDockState(parsed);
            }
            if (!this.validateDockState(parsed)) {
                console.warn(`❌ Invalid profile '${profileName}'. Merge aborted.`);
                return null;
            }
            return parsed;
        };

        const primary = loadProfile(primaryProfileName);
        const secondary = loadProfile(secondaryProfileName);

        if (!primary || !secondary) {
            console.warn("❌ Merge aborted due to profile load failure.");
            return;
        }

        const merged = {
            version: this.dockSchemaVersion,
            panels: { ...primary.panels }
        };

        Object.keys(secondary.panels).forEach(id => {
            const secondaryPanel = secondary.panels[id];
            if (!merged.panels[id]) {
                merged.panels[id] = secondaryPanel;
            } else {
                const primaryPanel = merged.panels[id];

                switch (strategy) {
                    case "preferSecondary":
                        merged.panels[id] = secondaryPanel;
                        break;
                    case "mergeVisibility":
                        merged.panels[id].visible = primaryPanel.visible || secondaryPanel.visible;
                        merged.panels[id].position = primaryPanel.position || secondaryPanel.position || { top: null, left: null };
                        break;
                    case "preferPrimary":
                    default:
                        // Default: preserve primary, only fill missing position from secondary
                        if (!primaryPanel.position && secondaryPanel.position) {
                            merged.panels[id].position = secondaryPanel.position;
                        }
                        break;
                }
            }
        });

        localStorage.setItem(`dockProfile_${mergedProfileName}`, JSON.stringify(merged));
        console.log(`🔗 Profiles '${primaryProfileName}' + '${secondaryProfileName}' merged into '${mergedProfileName}' using strategy '${strategy}'.`);
        this.triggerEvent("profileMerge", { mergedProfileName, strategy, merged });
    },

    // Role-Based Profile Assignment Methods
    assignProfileToRole: function(roleName, profileName) {
        if (!roleName || !profileName) {
            console.warn("❌ Role name and profile name are required.");
            return;
        }
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        const roleMap = roleMapJSON ? JSON.parse(roleMapJSON) : {};
        roleMap[roleName] = profileName;
        localStorage.setItem("dockRoleMap", JSON.stringify(roleMap));
        console.log(`🎯 Role '${roleName}' assigned to profile '${profileName}'.`);
        this.triggerEvent("roleAssigned", { roleName, profileName });
    },

    getProfileForRole: function(roleName) {
        if (!roleName) {
            console.warn("❌ Role name required.");
            return null;
        }
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        if (!roleMapJSON) return null;
        const roleMap = JSON.parse(roleMapJSON);
        return roleMap[roleName] || null;
    },

    activateRole: function(roleName) {
        if (!roleName) {
            console.warn("❌ Role name required.");
            return;
        }
        const profileName = this.getProfileForRole(roleName);
        if (!profileName) {
            console.warn(`⚠ No profile assigned for role '${roleName}'.`);
            return;
        }
        console.log(`🚀 Activating role '${roleName}' with profile '${profileName}'.`);
        this.loadProfile(profileName);
        this.triggerEvent("roleActivated", { roleName, profileName });
    },

    // Role Cascade System: Activate multiple roles with merge strategies
    activateRoles: function(roleNamesArray, mergeStrategy = "preferPrimary") {
        if (!Array.isArray(roleNamesArray) || roleNamesArray.length === 0) {
            console.warn("❌ Valid array of roles required.");
            return;
        }

        const roleMapJSON = localStorage.getItem("dockRoleMap");
        if (!roleMapJSON) {
            console.warn("⚠ No role mappings found.");
            return;
        }
        const roleMap = JSON.parse(roleMapJSON);

        // Sort the incoming roles by priority before merging
        const sortedRoles = [...roleNamesArray].sort((a, b) => {
            return this.getRolePriority(b) - this.getRolePriority(a);
        });

        const profileNames = sortedRoles.map(roleName => {
            const profileName = roleMap[roleName];
            if (!profileName) {
                console.warn(`⚠ No profile assigned to role '${roleName}'.`);
            }
            return profileName;
        }).filter(p => !!p);

        if (profileNames.length === 0) {
            console.warn("⚠ No valid profiles found for provided roles.");
            return;
        }

        // If only one valid profile, load directly
        if (profileNames.length === 1) {
            console.log(`🚀 Activating single role '${sortedRoles[0]}' with profile '${profileNames[0]}'.`);
            this.loadProfile(profileNames[0]);
            return;
        }

        // Merge profiles sequentially
        const tempMergedProfile = `__tempMerged_${Date.now()}`;
        const primaryProfile = profileNames[0];

        for (let i = 1; i < profileNames.length; i++) {
            const secondaryProfile = profileNames[i];
            const mergeTarget = (i === 1) ? primaryProfile : tempMergedProfile;
            const mergeDestination = (i === profileNames.length - 1) ? tempMergedProfile : tempMergedProfile;

            this.mergeProfiles(mergeTarget, secondaryProfile, mergeDestination, mergeStrategy);
        }

        // Load the final merged profile
        this.loadProfile(tempMergedProfile);
        console.log(`🔗 Composite roles [${sortedRoles.join(", ")}] merged and activated.`);
        this.triggerEvent("roleCascadeActivated", { roles: sortedRoles, strategy: mergeStrategy });
    },

    // Role Priority Engine methods
    setRolePriority: function(roleName, priorityScore) {
        if (!roleName || typeof priorityScore !== "number") {
            console.warn("❌ Role name and numeric priority required.");
            return;
        }
        const priorityMapJSON = localStorage.getItem("dockRolePriority");
        const priorityMap = priorityMapJSON ? JSON.parse(priorityMapJSON) : {};
        priorityMap[roleName] = priorityScore;
        localStorage.setItem("dockRolePriority", JSON.stringify(priorityMap));
        console.log(`🎯 Role '${roleName}' priority set to '${priorityScore}'.`);
        this.triggerEvent("rolePrioritySet", { roleName, priorityScore });
    },

    getRolePriority: function(roleName) {
        const priorityMapJSON = localStorage.getItem("dockRolePriority");
        if (!priorityMapJSON) return 0;
        const priorityMap = JSON.parse(priorityMapJSON);
        return priorityMap[roleName] || 0;
    },

    // Role Cluster Profile System
    defineRoleCluster: function(clusterName, roleArray) {
        if (!clusterName || !Array.isArray(roleArray)) {
            console.warn("❌ Cluster name and valid role array required.");
            return;
        }
        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        const clusterMap = clusterMapJSON ? JSON.parse(clusterMapJSON) : {};
        clusterMap[clusterName] = roleArray;
        localStorage.setItem("dockRoleClusters", JSON.stringify(clusterMap));
        console.log(`🗂 Role cluster '${clusterName}' defined with roles: [${roleArray.join(", ")}].`);
        this.triggerEvent("roleClusterDefined", { clusterName, roleArray });
    },

    getRoleCluster: function(clusterName) {
        if (!clusterName) {
            console.warn("❌ Cluster name required.");
            return null;
        }
        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        if (!clusterMapJSON) return null;
        const clusterMap = JSON.parse(clusterMapJSON);
        return clusterMap[clusterName] || null;
    },

    activateRoleCluster: function(clusterName, mergeStrategy = "preferPrimary") {
        const roles = this.getRoleCluster(clusterName);
        if (!roles) {
            console.warn(`⚠ Role cluster '${clusterName}' not found.`);
            return;
        }
        console.log(`🚀 Activating role cluster '${clusterName}'...`);
        this.activateRoles(roles, mergeStrategy);
    },

    // === Cluster Priority Arbitration System ===

    setClusterPriority: function(clusterName, priorityScore) {
        if (!clusterName || typeof priorityScore !== "number") {
            console.warn("❌ Cluster name and numeric priority required.");
            return;
        }
        const priorityMapJSON = localStorage.getItem("dockClusterPriority");
        const priorityMap = priorityMapJSON ? JSON.parse(priorityMapJSON) : {};
        priorityMap[clusterName] = priorityScore;
        localStorage.setItem("dockClusterPriority", JSON.stringify(priorityMap));
        console.log(`🎯 Cluster '${clusterName}' priority set to '${priorityScore}'.`);
        this.triggerEvent("clusterPrioritySet", { clusterName, priorityScore });
    },

    getClusterPriority: function(clusterName) {
        const priorityMapJSON = localStorage.getItem("dockClusterPriority");
        if (!priorityMapJSON) return 0;
        const priorityMap = JSON.parse(priorityMapJSON);
        return priorityMap[clusterName] || 0;
    },

    activateRoleClusters: function(clusterNamesArray, mergeStrategy = "preferPrimary") {
        if (!Array.isArray(clusterNamesArray) || clusterNamesArray.length === 0) {
            console.warn("❌ Valid array of cluster names required.");
            return;
        }

        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        if (!clusterMapJSON) {
            console.warn("⚠ No role clusters found.");
            return;
        }
        const clusterMap = JSON.parse(clusterMapJSON);

        // Sort clusters by their priority
        const sortedClusters = [...clusterNamesArray].sort((a, b) => {
            return this.getClusterPriority(b) - this.getClusterPriority(a);
        });

        // Gather all roles from the sorted clusters
        const combinedRoles = [];
        sortedClusters.forEach(clusterName => {
            const roles = clusterMap[clusterName];
            if (roles && Array.isArray(roles)) {
                combinedRoles.push(...roles);
            } else {
                console.warn(`⚠ Cluster '${clusterName}' not found or invalid.`);
            }
        });

        // Activate combined roles with standard activateRoles system
        console.log(`🚀 Activating role clusters [${sortedClusters.join(", ")}] with combined roles...`);
        this.activateRoles(combinedRoles, mergeStrategy);
        this.triggerEvent("roleClustersActivated", { clusters: sortedClusters, strategy: mergeStrategy });
    },

    // === Snapshot Sandbox System ===
    loadSnapshotToSandbox: function(snapshot) {
        console.log("🧪 Loading snapshot into sandbox...");
        if (!snapshot || typeof snapshot !== "object") {
            console.warn("❌ Invalid snapshot provided.");
            return;
        }
        if (!snapshot.version) {
            console.warn("⚠ Legacy snapshot detected — initiating migration.");
            snapshot = this.migrateLegacyDockState(snapshot);
        }
        if (snapshot.version > this.dockSchemaVersion) {
            console.warn("⚠ Incompatible snapshot version.");
            return;
        }
        if (!this.validateDockState(snapshot)) {
            console.warn("❌ Invalid snapshot detected. Aborting sandbox load.");
            return;
        }
        this._sandboxSnapshot = snapshot;
        console.log("✅ Snapshot loaded into sandbox.");
        this.triggerEvent("sandboxLoaded", snapshot);
    },

    applySandbox: function() {
        if (!this._sandboxSnapshot) {
            console.warn("⚠ No sandbox snapshot loaded.");
            return;
        }
        console.log("🧪 Applying sandbox snapshot to live state...");
        this.importDockSnapshot(this._sandboxSnapshot);
        delete this._sandboxSnapshot;
        console.log("✅ Sandbox applied.");
        this.triggerEvent("sandboxApplied");
    },

    discardSandbox: function() {
        if (!this._sandboxSnapshot) {
            console.warn("⚠ No sandbox snapshot to discard.");
            return;
        }
        delete this._sandboxSnapshot;
        console.log("🗑 Sandbox snapshot discarded.");
        this.triggerEvent("sandboxDiscarded");
    },

    // === Dock State Delta Engine ===
    compareDockStates: function(snapshotA, snapshotB) {
        console.log("🧮 Calculating dock state delta...");

        if (!snapshotA || !snapshotB) {
            console.warn("❌ Both snapshots required for comparison.");
            return null;
        }

        const delta = {
            addedPanels: [],
            removedPanels: [],
            modifiedPanels: []
        };

        const panelsA = snapshotA.panels || {};
        const panelsB = snapshotB.panels || {};

        const allPanelIds = new Set([
            ...Object.keys(panelsA),
            ...Object.keys(panelsB)
        ]);

        allPanelIds.forEach(id => {
            const panelA = panelsA[id];
            const panelB = panelsB[id];

            if (panelA && !panelB) {
                delta.removedPanels.push(id);
            } else if (!panelA && panelB) {
                delta.addedPanels.push(id);
            } else if (panelA && panelB) {
                const changes = {};

                if (panelA.visible !== panelB.visible) {
                    changes.visibilityChanged = { from: panelA.visible, to: panelB.visible };
                }

                if (JSON.stringify(panelA.position) !== JSON.stringify(panelB.position)) {
                    changes.positionChanged = { from: panelA.position, to: panelB.position };
                }

                if (Object.keys(changes).length > 0) {
                    delta.modifiedPanels.push({ id, changes });
                }
            }
        });

        console.log("✅ Dock state delta calculated:", delta);
        this.triggerEvent("dockDeltaCalculated", delta);
        return delta;
    },

    // === Dock Delta Application Engine ===
    applyDockDelta: function(targetSnapshot, delta) {
        console.log("🔧 Applying dock state delta...");

        if (!targetSnapshot || !delta) {
            console.warn("❌ Target snapshot and delta are required.");
            return null;
        }

        const updatedSnapshot = JSON.parse(JSON.stringify(targetSnapshot)); // Deep clone

        // Apply added panels
        delta.addedPanels.forEach(panelId => {
            if (!updatedSnapshot.panels[panelId]) {
                updatedSnapshot.panels[panelId] = {
                    visible: true,
                    position: { top: null, left: null }
                };
            }
        });

        // Apply removed panels
        delta.removedPanels.forEach(panelId => {
            delete updatedSnapshot.panels[panelId];
        });

        // Apply modified panels
        delta.modifiedPanels.forEach(({ id, changes }) => {
            if (!updatedSnapshot.panels[id]) return;
            const panel = updatedSnapshot.panels[id];

            if (changes.visibilityChanged) {
                panel.visible = changes.visibilityChanged.to;
            }

            if (changes.positionChanged) {
                panel.position = changes.positionChanged.to;
            }
        });

        console.log("✅ Dock state delta applied.");
        this.triggerEvent("dockDeltaApplied", updatedSnapshot);
        return updatedSnapshot;
    },

    // === Delta Chain Processor ===
    applyDeltaChain: function(targetSnapshot, deltaChainArray) {
        console.log("🔗 Applying delta chain...");

        if (!targetSnapshot || !Array.isArray(deltaChainArray)) {
            console.warn("❌ Target snapshot and valid delta chain array required.");
            return null;
        }

        let workingSnapshot = JSON.parse(JSON.stringify(targetSnapshot)); // Deep clone

        deltaChainArray.forEach((delta, index) => {
            console.log(`⚙ Applying delta ${index + 1} of ${deltaChainArray.length}...`);
            workingSnapshot = this.applyDockDelta(workingSnapshot, delta);
        });

        console.log("✅ Delta chain fully applied.");
        this.triggerEvent("deltaChainApplied", workingSnapshot);
        return workingSnapshot;
    },

    // === Delta Conflict Scanner ===
    scanDeltaConflicts: function(deltaChainArray) {
        console.log("🩺 Scanning delta chain for conflicts...");

        if (!Array.isArray(deltaChainArray) || deltaChainArray.length === 0) {
            console.warn("❌ Valid delta chain array required.");
            return null;
        }

        const conflictMap = {};

        deltaChainArray.forEach((delta, deltaIndex) => {
            // Handle added panels
            delta.addedPanels.forEach(panelId => {
                if (!conflictMap[panelId]) {
                    conflictMap[panelId] = { added: [], removed: [], modified: [] };
                }
                conflictMap[panelId].added.push(deltaIndex);
            });

            // Handle removed panels
            delta.removedPanels.forEach(panelId => {
                if (!conflictMap[panelId]) {
                    conflictMap[panelId] = { added: [], removed: [], modified: [] };
                }
                conflictMap[panelId].removed.push(deltaIndex);
            });

            // Handle modified panels
            delta.modifiedPanels.forEach(({ id, changes }) => {
                if (!conflictMap[id]) {
                    conflictMap[id] = { added: [], removed: [], modified: [] };
                }
                conflictMap[id].modified.push({ deltaIndex, changes });
            });
        });

        const conflicts = {};

        Object.keys(conflictMap).forEach(panelId => {
            const entry = conflictMap[panelId];

            // Conflict detection logic
            if (entry.added.length > 1) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].multipleAdditions = entry.added;
            }
            if (entry.removed.length > 1) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].multipleRemovals = entry.removed;
            }
            if (entry.added.length > 0 && entry.removed.length > 0) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].addRemoveCollision = { added: entry.added, removed: entry.removed };
            }
            if (entry.modified.length > 1) {
                conflicts[panelId] = conflicts[panelId] || {};
                conflicts[panelId].multipleModifications = entry.modified;
            }
        });

        console.log("🩺 Delta conflict scan complete:", conflicts);
        this.triggerEvent("deltaConflictsDetected", conflicts);
        return conflicts;
    },

    // === Predictive Merge Simulator ===
    simulateMerge: function(targetSnapshot, deltaChainArray) {
        console.log("🧪 Simulating predictive merge...");

        if (!targetSnapshot || !Array.isArray(deltaChainArray)) {
            console.warn("❌ Target snapshot and valid delta chain array required.");
            return null;
        }

        let workingSnapshot = JSON.parse(JSON.stringify(targetSnapshot)); // Deep clone

        deltaChainArray.forEach((delta, index) => {
            console.log(`🔮 Simulating delta ${index + 1} of ${deltaChainArray.length}...`);
            workingSnapshot = this.applyDockDelta(workingSnapshot, delta);
        });

        console.log("✅ Predictive merge simulation complete.");
        this.triggerEvent("predictiveMergeSimulated", workingSnapshot);
        return workingSnapshot;
    },

    // === Neural Arbitration Engine ===
    arbitrateMergeConflicts: function(deltaChainArray, strategyProfile = "strictPreferPrimary") {
        console.log("⚖️ Running merge arbitration...");

        if (!Array.isArray(deltaChainArray) || deltaChainArray.length === 0) {
            console.warn("❌ Valid delta chain array required.");
            return null;
        }

        const arbitrationDelta = {
            addedPanels: [],
            removedPanels: [],
            modifiedPanels: []
        };

        const mutationMap = {};

        deltaChainArray.forEach((delta, deltaIndex) => {
            delta.addedPanels.forEach(panelId => {
                if (!mutationMap[panelId]) mutationMap[panelId] = { added: [], removed: [], modified: [] };
                mutationMap[panelId].added.push({ deltaIndex });
            });
            delta.removedPanels.forEach(panelId => {
                if (!mutationMap[panelId]) mutationMap[panelId] = { added: [], removed: [], modified: [] };
                mutationMap[panelId].removed.push({ deltaIndex });
            });
            delta.modifiedPanels.forEach(({ id, changes }) => {
                if (!mutationMap[id]) mutationMap[id] = { added: [], removed: [], modified: [] };
                mutationMap[id].modified.push({ deltaIndex, changes });
            });
        });

        Object.keys(mutationMap).forEach(panelId => {
            const entry = mutationMap[panelId];

            // === Addition / Removal Arbitration ===
            if (entry.added.length > 0 && entry.removed.length === 0) {
                arbitrationDelta.addedPanels.push(panelId);
            }
            if (entry.removed.length > 0 && entry.added.length === 0) {
                arbitrationDelta.removedPanels.push(panelId);
            }
            if (entry.added.length > 0 && entry.removed.length > 0) {
                if (strategyProfile === "strictPreferPrimary") {
                    arbitrationDelta.addedPanels.push(panelId);
                } else if (strategyProfile === "strictPreferSecondary") {
                    arbitrationDelta.removedPanels.push(panelId);
                }
            }

            // === Modification Arbitration ===
            if (entry.modified.length > 0) {
                const lastChange = entry.modified[entry.modified.length - 1]; // Default: favor most recent change
                const resolvedChanges = {};

                if (strategyProfile === "visibilityFavorActive") {
                    const visibilityHistory = entry.modified.map(m => m.changes.visibilityChanged?.to).filter(v => v !== undefined);
                    if (visibilityHistory.includes(true)) {
                        resolvedChanges.visibilityChanged = { to: true };
                    } else if (visibilityHistory.includes(false)) {
                        resolvedChanges.visibilityChanged = { to: false };
                    }
                } else {
                    // Default: take most recent change for visibility
                    if (lastChange.changes.visibilityChanged) {
                        resolvedChanges.visibilityChanged = lastChange.changes.visibilityChanged;
                    }
                }

                if (strategyProfile === "positionFavorRecent") {
                    if (lastChange.changes.positionChanged) {
                        resolvedChanges.positionChanged = lastChange.changes.positionChanged;
                    }
                } else {
                    if (lastChange.changes.positionChanged) {
                        resolvedChanges.positionChanged = lastChange.changes.positionChanged;
                    }
                }

                arbitrationDelta.modifiedPanels.push({
                    id: panelId,
                    changes: resolvedChanges
                });
            }
        });

        console.log("✅ Arbitration complete:", arbitrationDelta);
        this.triggerEvent("mergeArbitrationCompleted", arbitrationDelta);
        return arbitrationDelta;
    },

    // === Anomaly Recovery Engine ===
    recoverDockState: function(snapshot) {
        console.log("🩺 Initiating anomaly recovery on dock state...");

        if (!snapshot || typeof snapshot !== "object") {
            console.warn("❌ Invalid snapshot provided.");
            return null;
        }

        const recovered = {
            version: this.dockSchemaVersion,
            panels: {}
        };

        const panels = snapshot.panels || {};

        Object.keys(panels).forEach(id => {
            const panel = panels[id];
            const recoveredPanel = {};

            // Recover visibility
            if (typeof panel.visible !== "boolean") {
                console.warn(`⚠ Panel '${id}' had invalid visibility — defaulting to 'true'.`);
                recoveredPanel.visible = true;
            } else {
                recoveredPanel.visible = panel.visible;
            }

            // Recover position
            if (!panel.position || typeof panel.position !== "object") {
                console.warn(`⚠ Panel '${id}' had invalid position — resetting.`);
                recoveredPanel.position = { top: null, left: null };
            } else {
                recoveredPanel.position = {
                    top: typeof panel.position.top === "string" ? panel.position.top : null,
                    left: typeof panel.position.left === "string" ? panel.position.left : null
                };
            }

            recovered.panels[id] = recoveredPanel;
        });

        console.log("✅ Dock state anomaly recovery complete.");
        this.triggerEvent("dockStateRecovered", recovered);
        return recovered;
    },

    // === Live State Observer Methods ===
    subscribeLiveState: function(callback) {
        if (typeof callback !== "function") {
            console.warn("❌ Valid callback function required to subscribe.");
            return;
        }
        if (!this._liveStateSubscribers) {
            this._liveStateSubscribers = new Set();
        }
        this._liveStateSubscribers.add(callback);
        console.log("🛰 Live state subscriber added.");
    },

    unsubscribeLiveState: function(callback) {
        if (!this._liveStateSubscribers || typeof callback !== "function") {
            console.warn("❌ Valid callback function required to unsubscribe.");
            return;
        }
        this._liveStateSubscribers.delete(callback);
        console.log("🛰 Live state subscriber removed.");
    },

    broadcastLiveState: function(eventType, payload) {
        if (!this._liveStateSubscribers) return;
        this._liveStateSubscribers.forEach(callback => {
            try {
                callback({ eventType, payload });
            } catch (err) {
                console.error("❌ Error in live state subscriber callback:", err);
            }
        });
    },

    // === Cross-System Bridge API Interface ===
    getDockAPI: function() {
        console.log("🌉 Exposing Cross-System Dock API...");

        return {
            exportDockSnapshot: this.exportDockSnapshot.bind(this),
            importDockSnapshot: this.importDockSnapshot.bind(this),
            saveDockState: this.saveDockState.bind(this),
            restoreDockState: this.restoreDockState.bind(this),
            resetDockState: this.resetDockState.bind(this),
            loadSnapshotToSandbox: this.loadSnapshotToSandbox.bind(this),
            applySandbox: this.applySandbox.bind(this),
            discardSandbox: this.discardSandbox.bind(this),
            compareDockStates: this.compareDockStates.bind(this),
            applyDockDelta: this.applyDockDelta.bind(this),
            applyDeltaChain: this.applyDeltaChain.bind(this),
            scanDeltaConflicts: this.scanDeltaConflicts.bind(this),
            simulateMerge: this.simulateMerge.bind(this),
            arbitrateMergeConflicts: this.arbitrateMergeConflicts.bind(this),
            recoverDockState: this.recoverDockState.bind(this),
            subscribeLiveState: this.subscribeLiveState.bind(this),
            unsubscribeLiveState: this.unsubscribeLiveState.bind(this),
            saveProfile: this.saveProfile.bind(this),
            loadProfile: this.loadProfile.bind(this),
            deleteProfile: this.deleteProfile.bind(this),
            listProfiles: this.listProfiles.bind(this),
            importProfileFromJSON: this.importProfileFromJSON.bind(this),
            exportProfile: this.exportProfile.bind(this),
            setDefaultProfile: this.setDefaultProfile.bind(this),
            getDefaultProfile: this.getDefaultProfile.bind(this),
            loadDefaultProfile: this.loadDefaultProfile.bind(this),
            mergeProfiles: this.mergeProfiles.bind(this),
            assignProfileToRole: this.assignProfileToRole.bind(this),
            getProfileForRole: this.getProfileForRole.bind(this),
            activateRole: this.activateRole.bind(this),
            activateRoles: this.activateRoles.bind(this),
            setRolePriority: this.setRolePriority.bind(this),
            getRolePriority: this.getRolePriority.bind(this),
            defineRoleCluster: this.defineRoleCluster.bind(this),
            getRoleCluster: this.getRoleCluster.bind(this),
            activateRoleCluster: this.activateRoleCluster.bind(this),
            setClusterPriority: this.setClusterPriority.bind(this),
            getClusterPriority: this.getClusterPriority.bind(this),
            activateRoleClusters: this.activateRoleClusters.bind(this),

            // Sovereign Panel Scaffold API (Phase 500.5)
            getCountDockContent: () => "<h2>📊 Live Counts</h2><p>Placeholder content for Live Counts panel.</p>",
            getDeltaAnalyzerContent: () => "<h2>Δ Delta Analyzer</h2><p>Placeholder content for Delta Analyzer.</p>",
            getExceptionManagerContent: () => "<h2>⚠ Exception Manager</h2><p>Placeholder content for Exception Manager.</p>",
            getProgressDashboardContent: () => "<h2>🚦 Progress Dashboard</h2><p>Placeholder content for Progress Dashboard.</p>",
            getReportingHubContent: () => "<h2>📄 Reporting Hub</h2><p>Placeholder content for Reporting Hub.</p>",
            getMasterExportHubContent: () => "<h2>📤 Master Export Hub</h2><p>Placeholder content for Master Export Hub.</p>",
            getUtilityHubContent: () => "<h2>🛠 Utility Hub</h2><p>Placeholder content for Utility Hub.</p>",
            getSessionManagerContent: () => "<h2>📂 Session Manager</h2><p>Placeholder content for Session Manager.</p>",
            getMappingsContent: () => "<h2>🗺 Mappings Interface</h2><p>Placeholder content for Mappings Interface.</p>",
            getToolsContent: () => "<h2>🔧 Tools Panel</h2><p>Placeholder content for Tools Panel.</p>",
            getAuditContent: () => "<h2>📋 Audit Manager</h2><p>Placeholder content for Audit Manager.</p>",
            getConfigPanelContent: () => "<h2>⚙ Configuration Panel</h2><p>Placeholder content for Configuration Panel.</p>"
        };
    },

    // === Sovereign Integrity Auditor ===
    runIntegrityAudit: function() {
        console.log("🩺 Running full Sovereign Mesh Integrity Audit...");

        const report = {
            profiles: [],
            roles: [],
            clusters: [],
            orphanedProfiles: [],
            orphanedRoles: [],
            orphanedClusters: [],
            invalidProfiles: [],
            invalidSnapshots: []
        };

        // Scan Profiles
        const keys = Object.keys(localStorage).filter(key => key.startsWith("dockProfile_"));
        keys.forEach(key => {
            const profileName = key.replace("dockProfile_", "");
            const profileJSON = localStorage.getItem(key);
            try {
                const parsed = JSON.parse(profileJSON);
                if (!this.validateDockState(parsed)) {
                    report.invalidProfiles.push(profileName);
                }
                report.profiles.push(profileName);
            } catch {
                report.invalidProfiles.push(profileName);
            }
        });

        // Scan Role Map
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        if (roleMapJSON) {
            const roleMap = JSON.parse(roleMapJSON);
            Object.entries(roleMap).forEach(([role, profile]) => {
                report.roles.push(role);
                if (!report.profiles.includes(profile)) {
                    report.orphanedProfiles.push(profile);
                    report.orphanedRoles.push(role);
                }
            });
        }

        // Scan Role Clusters
        const clusterMapJSON = localStorage.getItem("dockRoleClusters");
        if (clusterMapJSON) {
            const clusterMap = JSON.parse(clusterMapJSON);
            Object.entries(clusterMap).forEach(([cluster, roles]) => {
                report.clusters.push(cluster);
                if (!Array.isArray(roles)) {
                    report.orphanedClusters.push(cluster);
                }
            });
        }

        console.log("🩺 Integrity Audit Complete:", report);
        this.triggerEvent("integrityAuditCompleted", report);
        return report;
    }
};

// Ensure DOMContentLoaded event is safely bound
document.addEventListener("DOMContentLoaded", () => {
    if (typeof OperatorDockWiring.populateDockMatrix === "function") {
        OperatorDockWiring.populateDockMatrix();
    } else {
        console.warn("⚠️ OperatorDockWiring.populateDockMatrix not found.");
    }
});

// === HoloConsole Collapsible Toggle Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".holo-toggle");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const consolePanel = document.getElementById(targetId);
      if (consolePanel) {
        consolePanel.classList.toggle("open");
      }
    });
  });
});

// Expose globally if needed for cross-module usage
window.OperatorDockWiring = OperatorDockWiring;

// Operator Dock Admin Console Interface
const OperatorDockConsole = {
    save: () => OperatorDockWiring.saveDockState(),
    restore: () => OperatorDockWiring.restoreDockState(),
    reset: () => OperatorDockWiring.resetDockState(),
    export: () => OperatorDockWiring.exportDockSnapshot(),
    import: (snapshot) => OperatorDockWiring.importDockSnapshot(snapshot),
    log: () => OperatorDockWiring.logDockState(),
    validate: () => {
        const stateJSON = localStorage.getItem("dockState");
        if (!stateJSON) {
            console.warn("⚠ No saved dock state to validate.");
            return;
        }
        const state = JSON.parse(stateJSON);
        return OperatorDockWiring.validateDockState(state);
    },
    migrateLegacy: (legacyState) => OperatorDockWiring.migrateLegacyDockState(legacyState)
};

window.OperatorDockConsole = OperatorDockConsole;
console.log("🧭 Operator Dock Admin Console Ready — Type 'OperatorDockConsole' to begin diagnostics.");


// === Phase 300.7: Subsystem Dock Content Injection ===

setTimeout(() => {
    console.log("🚀 Executing Phase 300.7 Dock Content Injection...");

    const dockContents = {
        count: `<h2>📊 Live Counts</h2><p>Live inventory counting subsystem online.</p>`,
        deltaAnalyzer: `<h2>Δ Delta Analyzer</h2><p>Delta analytics subsystem loaded.</p>`,
        exceptionManager: `<h2>⚠ Exception Manager</h2><p>Monitoring anomaly exceptions.</p>`,
        progressDashboard: `<h2>🚦 Progress Dashboard</h2><p>System progress indicators operational.</p>`,
        reportingHub: `<h2>📄 Reporting Hub</h2><p>Report generation subsystem ready.</p>`,
        masterExportHub: `<h2>📤 Master Export Hub</h2><p>Bulk export interfaces deployed.</p>`,
        utilityHub: `<h2>🛠 Utility Hub</h2><p>Utility tools accessible here.</p>`,
        sessionManager: `<h2>📂 Session Manager</h2><p>Session archival and recovery available.</p>`,
        mappings: `<h2>🗺 Mappings Interface</h2><p>Mapping configuration subsystem loaded.</p>`,
        tools: `<h2>🔧 Tools Panel</h2><p>Developer and diagnostic tools online.</p>`,
        audit: `<h2>📋 Audit Manager</h2><p>System audit controls engaged.</p>`,
        configPanel: `<h2>⚙ Configuration Panel</h2><p>Codex configuration settings loaded.</p>`
    };

    Object.entries(dockContents).forEach(([dockId, content]) => {
        const panel = document.getElementById(dockId);
        if (panel) {
            panel.innerHTML = content;
            console.log(`✅ Content injected into ${dockId}`);
        } else {
            console.warn(`⚠ Dock panel ${dockId} not found.`);
        }
    });

}, 600);

// === Phase 300.9: Dock Grid Unification Protocol ===

setTimeout(() => {
    console.log("🚀 Executing Phase 300.9 Dock Grid Unification...");

    const dockMap = {
        count: "countContainer",
        deltaAnalyzer: "deltaAnalyzerSection",
        exceptionManager: "exceptionManagerSection",
        progressDashboard: "progressDashboardSection",
        reportingHub: "reportingHubSection",
        masterExportHub: "masterExportSection",
        utilityHub: "utilityHubSection",
        sessionManager: "sessionManagerSection",
        mappings: "mappingManagerSection",
        tools: "toolsPanel",
        audit: "auditSection",
        configPanel: "configPanelSection"
    };

    Object.entries(dockMap).forEach(([dockId, legacyId]) => {
        const legacyContainer = document.getElementById(legacyId);
        const newDockPanel = document.getElementById(dockId);

        if (legacyContainer && newDockPanel) {
            newDockPanel.innerHTML = legacyContainer.innerHTML;
            legacyContainer.remove();
            console.log(`✅ Migrated '${legacyId}' ➔ '${dockId}'`);
        } else {
            console.warn(`⚠ Skipped migration for '${dockId}'`);
        }
    });

    console.log("✅ Phase 300.9 Dock Grid Unification complete.");

}, 800);


// === Phase 300.13: Dynamic Dock Panel Population Injection ===

setTimeout(() => {
    console.log("🚀 Executing Phase 300.13: Dynamic Dock Panel Population...");

    const dockGrid = document.getElementById("operatorDockGrid");
    if (!dockGrid) {
        console.warn("❌ Dock Grid not found.");
        return;
    }

    const dockDefinitions = [
        { id: "count", label: "📊 Live Counts", description: "Live inventory counting subsystem online." },
        { id: "deltaAnalyzer", label: "Δ Delta Analyzer", description: "Delta analytics subsystem loaded." },
        { id: "exceptionManager", label: "⚠ Exception Manager", description: "Monitoring anomaly exceptions." },
        { id: "progressDashboard", label: "🚦 Progress Dashboard", description: "System progress indicators operational." },
        { id: "reportingHub", label: "📄 Reporting Hub", description: "Report generation subsystem ready." },
        { id: "masterExportHub", label: "📤 Master Export Hub", description: "Bulk export interfaces deployed." },
        { id: "utilityHub", label: "🛠 Utility Hub", description: "Utility tools accessible here." },
        { id: "sessionManager", label: "📂 Session Manager", description: "Session archival and recovery available." },
        { id: "mappings", label: "🗺 Mappings Interface", description: "Mapping configuration subsystem loaded." },
        { id: "tools", label: "🔧 Tools Panel", description: "Developer and diagnostic tools online." },
        { id: "audit", label: "📋 Audit Manager", description: "System audit controls engaged." },
        { id: "configPanel", label: "⚙ Configuration Panel", description: "Codex configuration settings loaded." }
    ];

    dockDefinitions.forEach(def => {
        let panel = document.getElementById(def.id);
        if (!panel) {
            panel = document.createElement("div");
            panel.id = def.id;
            panel.classList.add("tab-section");
            dockGrid.appendChild(panel);
            console.log(`✅ Created Dock Panel: ${def.id}`);
        }
        panel.innerHTML = `<h2>${def.label}</h2><p>${def.description}</p>`;
    });

    // === Phase 400.1: Sovereign Toolbar DOM Injection ===
    console.log("🚀 Executing Phase 400.1 — Sovereign Toolbar DOM Injection...");
    if (typeof SovereignToolbarRenderer?.renderToolbar === "function") {
        SovereignToolbarRenderer.renderToolbar();
        console.log("✅ Sovereign Toolbar successfully rendered.");
    } else {
        console.warn("⚠ SovereignToolbarRenderer.renderToolbar not available.");
    }

}, 1000);


// === Phase 700.3-B: Sovereign Dock Toggle Core Rebuild Injection ===

OperatorDockWiring.initializeToggleSystem = function() {
    console.log("🚀 Sovereign Dock Toggle System Initialized");

    const dockButtons = document.querySelectorAll(".dock-toggle-button");

    dockButtons.forEach(button => {
        const targetId = button.getAttribute("data-target");
        if (!targetId) {
            console.warn("⚠ Dock toggle button missing data-target attribute.");
            return;
        }

        button.addEventListener("click", () => {
            const panel = document.getElementById(targetId);
            if (!panel) {
                console.warn(`❌ Dock panel '${targetId}' not found.`);
                return;
            }
            panel.classList.toggle("hidden");
            console.log(`🔀 Toggled visibility for dock panel '${targetId}'`);
            OperatorDockWiring.saveDockState();
        });
    });
};

// === Register Subsystem Docks ===
// (Add new subsystem dock registrations below this line)

OperatorDockWiring.registerSubsystemDock({
    dockId: "exceptionManager",
    onClick: () => {
        console.log("⚠ Sovereign Exception Manager Activated");
        alert("🚨 Exception Manager Panel Loaded — Sovereign Mesh Stabilization Online");
    }
});

// Forecast Console Subsystem Dock Registration
OperatorDockWiring.registerSubsystemDock({
    dockId: "forecastConsole",
    onClick: () => {
        console.log("📊 Forecast Console Activated");
        alert("📊 Forecast Console Panel Loaded — Forecasting Subsystem Online");
    }
});

// === Additional Subsystem Dock Registrations ===
OperatorDockWiring.registerSubsystemDock({
    dockId: "count",
    onClick: () => {
        console.log("📊 Sovereign Live Counts Panel Activated");
        alert("📊 Live Counts Panel Loaded — Inventory Counting System Online");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "deltaAnalyzer",
    onClick: () => {
        console.log("Δ Sovereign Delta Analyzer Panel Activated");
        alert("🔍 Delta Analyzer Panel Loaded — Drift Detection Online");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "reportingHub",
    onClick: () => {
        console.log("📄 Reporting Hub Activated");
        alert("📄 Reporting Hub Loaded — Report Generation Ready");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "sessionManager",
    onClick: () => {
        console.log("📂 Session Manager Activated");
        alert("📂 Session Manager Loaded — Archive and Recovery Online");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "utilityHub",
    onClick: () => {
        console.log("🛠 Utility Hub Activated");
        alert("🛠 Utility Hub Loaded — Diagnostic Tools Ready");
    }
});

// 🧠 Phase 400.9 — Delta Analyzer Console Initialization
const deltaAnalyzerConsole = document.createElement('div');
deltaAnalyzerConsole.classList.add('holo-console');
deltaAnalyzerConsole.id = 'deltaAnalyzerConsole';
deltaAnalyzerConsole.innerHTML = `
  <div class="console-header" onclick="this.parentElement.classList.toggle('collapsed')">
    🌀 Delta Analyzer Console
  </div>
  <div class="console-body">
    <p>Delta drift data, spike detection, and correction logs will render here.</p>
  </div>
`;
document.body.appendChild(deltaAnalyzerConsole);

// === HoloConsole Initialization for All Sovereign Panels ===
const dockConsoles = {
    countConsole: {
        title: "📊 Live Counts Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="live-status">🟢 Online</span></p>
        <p><strong>Last Sync:</strong> <span class="last-sync">Fetching...</span></p>
        <div class="count-log">
          <p>🗂 <em>Items Tracked:</em> <span class="count-items">0</span></p>
          <p>📦 <em>Active Categories:</em> <span class="count-categories">0</span></p>
          <p>📍 <em>Recent Additions:</em></p>
          <ul class="recent-items">
            <li class="faint">No data yet.</li>
          </ul>
        </div>
        <button class="refresh-counts">🔄 Refresh Data</button>
      </div>
    `
    },
    deltaAnalyzerConsole: {
        title: "🧮 Delta Analyzer Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="delta-status">🟢 Monitoring</span></p>
        <p><strong>Last Anomaly Scan:</strong> <span class="delta-scan-time">Fetching...</span></p>
        <div class="delta-log">
          <p>📈 <em>Drift Events Detected:</em> <span class="drift-events">0</span></p>
          <p>🚨 <em>Critical Spikes:</em> <span class="critical-spikes">0</span></p>
          <p>📋 <em>Log Entries:</em></p>
          <ul class="delta-log-entries">
            <li class="faint">Awaiting data...</li>
          </ul>
        </div>
        <button class="run-delta-scan">🔁 Run Anomaly Scan</button>
      </div>
    `
    },
    reportingHubConsole: {
        title: "📄 Reporting Hub Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="report-status">🟢 Ready</span></p>
        <p><strong>Last Report:</strong> <span class="last-report-time">None</span></p>
        <div class="report-log">
          <p>📝 <em>Recent Reports:</em></p>
          <ul class="report-entries">
            <li class="faint">No reports generated yet.</li>
          </ul>
        </div>
        <button class="generate-report">📤 Generate System Report</button>
      </div>
    `
    },
    sessionManagerConsole: {
        title: "📂 Session Manager Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="session-status">🟢 Monitoring</span></p>
        <p><strong>Last Backup:</strong> <span class="last-backup-time">N/A</span></p>
        <div class="session-log">
          <p>💾 <em>Stored Sessions:</em></p>
          <ul class="session-entries">
            <li class="faint">No archived sessions found.</li>
          </ul>
        </div>
        <button class="trigger-backup">💾 Archive Current Session</button>
        <button class="trigger-restore">♻️ Restore Last Session</button>
      </div>
    `
    },
    utilityHubConsole: {
        title: "🛠 Utility Hub Console",
        body: `
      <div class="console-section">
        <p><strong>Status:</strong> <span class="utility-status">🟢 Online</span></p>
        <p><strong>Command Queue:</strong> <span class="utility-queue">Idle</span></p>
        <div class="utility-log">
          <p>📚 <em>Utility Log:</em></p>
          <ul class="utility-entries">
            <li class="faint">Awaiting operations...</li>
          </ul>
        </div>
        <button class="run-diagnostics">🧪 Run Diagnostics</button>
        <button class="clear-log">🧹 Clear Log</button>
      </div>
    `
    }
};

Object.entries(dockConsoles).forEach(([id, content]) => {
    const consoleEl = document.createElement('div');
    consoleEl.classList.add('holo-console');
    consoleEl.id = id;
    consoleEl.innerHTML = `
      <div class="console-header" onclick="this.parentElement.classList.toggle('collapsed')">
        ${content.title}
      </div>
      <div class="console-body">
        ${content.body}
      </div>
    `;
    document.body.appendChild(consoleEl);
    console.log(`✅ ${id} initialized and wired to DOM`);
});

// === Live Counts Console Runtime Activation ===
setTimeout(() => {
    const countConsole = document.getElementById("countConsole");
    if (!countConsole) return;

    const lastSync = countConsole.querySelector(".last-sync");
    const itemSpan = countConsole.querySelector(".count-items");
    const categorySpan = countConsole.querySelector(".count-categories");
    const recentList = countConsole.querySelector(".recent-items");

    const fakeData = {
        lastSync: new Date().toLocaleString(),
        items: 127,
        categories: 9,
        recent: ["Dishwashers", "Tool Chests", "Air Conditioners"]
    };

    lastSync.textContent = fakeData.lastSync;
    itemSpan.textContent = fakeData.items;
    categorySpan.textContent = fakeData.categories;
    recentList.innerHTML = fakeData.recent.map(item => `<li>${item}</li>`).join("");

    countConsole.querySelector(".refresh-counts").addEventListener("click", () => {
        console.log("🔄 Manual data refresh triggered.");
        alert("Live Counts refreshed from Cortex.");
    });

    console.log("✅ Live Counts Console Bootstrapped.");
}, 1200);

// === Delta Analyzer Console Runtime Activation ===
setTimeout(() => {
    const deltaConsole = document.getElementById("deltaAnalyzerConsole");
    if (!deltaConsole) return;

    const scanTime = deltaConsole.querySelector(".delta-scan-time");
    const driftSpan = deltaConsole.querySelector(".drift-events");
    const spikeSpan = deltaConsole.querySelector(".critical-spikes");
    const logList = deltaConsole.querySelector(".delta-log-entries");

    const mockScan = () => {
        const now = new Date().toLocaleTimeString();
        const driftCount = Math.floor(Math.random() * 5);
        const spikeCount = Math.floor(Math.random() * 3);

        scanTime.textContent = now;
        driftSpan.textContent = driftCount;
        spikeSpan.textContent = spikeCount;

        const logs = [
            "Δ minor offset detected in HVAC",
            "Δ product sync drift in Bay 6",
            "⚠ unexpected delta in ESL map",
            "🚨 spike in UPC mapping",
            "✅ correction algorithm stabilized drift"
        ];

        logList.innerHTML = "";
        for (let i = 0; i < driftCount + spikeCount; i++) {
            const entry = logs[Math.floor(Math.random() * logs.length)];
            const li = document.createElement("li");
            li.textContent = `[${now}] ${entry}`;
            logList.appendChild(li);
        }

        console.log("📡 Delta Analyzer scan completed.");
    };

    deltaConsole.querySelector(".run-delta-scan").addEventListener("click", mockScan);

    mockScan();
}, 1300);

// === Reporting Hub Console Runtime Activation ===
setTimeout(() => {
    const reportConsole = document.getElementById("reportingHubConsole");
    if (!reportConsole) return;

    const reportTime = reportConsole.querySelector(".last-report-time");
    const reportList = reportConsole.querySelector(".report-entries");

    const generateReport = () => {
        const now = new Date().toLocaleTimeString();
        const reportEntry = `📁 System Export — ${now}`;

        reportTime.textContent = now;

        const li = document.createElement("li");
        li.textContent = reportEntry;
        reportList.prepend(li);

        console.log(`📄 Report generated at ${now}`);
    };

    reportConsole.querySelector(".generate-report").addEventListener("click", generateReport);

    console.log("✅ Reporting Hub Console Bootstrapped.");
}, 1400);

// === Session Manager Console Runtime Activation ===
setTimeout(() => {
    const sessionConsole = document.getElementById("sessionManagerConsole");
    if (!sessionConsole) return;

    const backupTime = sessionConsole.querySelector(".last-backup-time");
    const sessionList = sessionConsole.querySelector(".session-entries");

    const archiveSession = () => {
        const now = new Date().toLocaleTimeString();
        const sessionLabel = `🗃 Session_${now.replace(/:/g, '-')}`;

        backupTime.textContent = now;

        const li = document.createElement("li");
        li.textContent = sessionLabel;
        sessionList.prepend(li);

        console.log(`💾 Session archived as ${sessionLabel}`);
    };

    const restoreSession = () => {
        const first = sessionList.querySelector("li");
        if (first && !first.classList.contains("faint")) {
            console.log(`♻️ Restoring session: ${first.textContent}`);
            alert(`Session "${first.textContent}" has been restored.`);
        } else {
            alert("⚠️ No session available to restore.");
        }
    };

    sessionConsole.querySelector(".trigger-backup").addEventListener("click", archiveSession);
    sessionConsole.querySelector(".trigger-restore").addEventListener("click", restoreSession);

    console.log("✅ Session Manager Console Bootstrapped.");
}, 1500);

// === Utility Hub Console Runtime Activation ===
setTimeout(() => {
    const utilityConsole = document.getElementById("utilityHubConsole");
    if (!utilityConsole) return;

    const queueState = utilityConsole.querySelector(".utility-queue");
    const utilityLog = utilityConsole.querySelector(".utility-entries");

    const logEntry = (msg) => {
        const li = document.createElement("li");
        li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        utilityLog.appendChild(li);
    };

    utilityConsole.querySelector(".run-diagnostics").addEventListener("click", () => {
        queueState.textContent = "Running Diagnostics...";
        logEntry("Initiating diagnostic sequence...");

        setTimeout(() => {
            logEntry("✅ All systems nominal.");
            queueState.textContent = "Idle";
        }, 1200);
    });

    utilityConsole.querySelector(".clear-log").addEventListener("click", () => {
        utilityLog.innerHTML = `<li class="faint">Awaiting operations...</li>`;
        logEntry("🧹 Log cleared.");
    });

    console.log("✅ Utility Hub Console Bootstrapped.");
}, 1600);

// === Micro-Patch 700.8-A: Progress Dashboard Subsystem Wiring ===


OperatorDockWiring.registerSubsystemDock({
    dockId: "progressDashboard",
    onClick: () => {
        console.log("🚦 Progress Dashboard Activated");
        alert("📊 Progress Dashboard Loaded — Monitoring Live Metrics");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "masterExportHub",
    onClick: () => {
        console.log("📤 Master Export Hub Activated");
        alert("📤 Master Export Hub Loaded — Export Interfaces Ready");
    }
});


OperatorDockWiring.registerSubsystemDock({
    dockId: "mappings",
    onClick: () => {
        console.log("🗺 Mappings Interface Activated");
        alert("🗺 Mappings Interface Loaded — Map Configurations Online");
    }
});

OperatorDockWiring.registerSubsystemDock({
    dockId: "tools",
    onClick: () => {
        console.log("🔧 Tools Panel Activated");
        alert("🔧 Tools Panel Loaded — Developer & Diagnostics Online");
    }
});

// Register the forecastConsole dock with custom icon and color (for external registry systems)
if (typeof registerSubsystemDock === "function") {
    registerSubsystemDock('forecastConsole', 'dock-forecastConsole', '📊 Forecast Console', '#99ccff');
}

OperatorDockWiring.registerSubsystemDock({
    dockId: "audit",
    onClick: () => {
        console.log("📋 Audit Manager Activated");
        alert("📋 Audit Manager Loaded — System Audit Controls Online");
    }
});

// Register the 'oracle' subsystem dock using external registry if available
if (typeof registerSubsystemDock === "function") {
    registerSubsystemDock("oracle");
}

OperatorDockWiring.registerSubsystemDock({
    dockId: "oracle",
    onClick: () => {
        console.log("🔮 Oracle Subsystem Activated");
        alert("🧙‍♂️ Oracle Interface Loaded — Whispering into the Codex");
    }
});

// Automatically initialize toggle system after DOM content is fully loaded

// === Phase 700.4: Sovereign Dock Unified Auto-Binding Engine ===

OperatorDockWiring.autoBindDockToggles = function() {
    console.log("🚀 Sovereign Dock Unified Auto-Binding Initialized");

    const dockButtons = document.querySelectorAll(".dock-toggle-button");

    dockButtons.forEach(button => {
        const targetId = button.getAttribute("data-target");
        if (!targetId) {
            console.warn("⚠ Dock toggle button missing data-target attribute.");
            return;
        }

        button.addEventListener("click", () => {
            const panel = document.getElementById(targetId);
            if (!panel) {
                console.warn(`❌ Dock panel '${targetId}' not found.`);
                return;
            }
            panel.classList.toggle("hidden");
            console.log(`🔀 Auto-Bound toggle for '${targetId}'`);
            OperatorDockWiring.saveDockState();
        });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    OperatorDockWiring.initializeToggleSystem();
    OperatorDockWiring.autoBindDockToggles();

    // === Sovereign Dock Panel Dynamic Toggle Logic ===
    // Provides 'collapsed' toggle for dock panels, and binds buttons with [data-toggle-dock]
    function toggleDockPanel(panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.toggle('collapsed');
        } else {
            console.warn(`Dock panel '${panelId}' not found.`);
        }
    }

    // Attach toggle logic to any button with [data-toggle-dock] attribute
    document.querySelectorAll('[data-toggle-dock]').forEach(button => {
        const targetId = button.getAttribute('data-toggle-dock');
        button.addEventListener('click', () => toggleDockPanel(targetId));
    });

    // === SovereignAPI Dock Toggle Registration for HoloConsole Panels ===
    // Ensure SovereignAPI bridge is live before registering toggles
    if (window.SovereignAPI?.registerDockToggle) {
        // Register HoloConsole dock toggles for all relevant consoles
        window.SovereignAPI.registerDockToggle("exceptionManagerConsole", "#exceptionManagerConsole");
        window.SovereignAPI.registerDockToggle("progressDashboardConsole", "#progressDashboardConsole");
        window.SovereignAPI.registerDockToggle("masterExportHubConsole", "#masterExportHubConsole");
        window.SovereignAPI.registerDockToggle("mappingsConsole", "#mappingsConsole");
        window.SovereignAPI.registerDockToggle("toolsConsole", "#toolsConsole");
        window.SovereignAPI.registerDockToggle("auditConsole", "#auditConsole");
        window.SovereignAPI.registerDockToggle("configPanelConsole", "#configPanelConsole");
        // Register forecastConsole dock toggle
        window.SovereignAPI.registerDockToggle("forecastConsole", "#forecastConsole");

        // Register HoloConsole dock toggles (countConsole, deltaAnalyzerConsole, reportingHubConsole, sessionManagerConsole, utilityHubConsole)
        window.SovereignAPI.registerDockToggle("countConsole", "#countConsole");
        window.SovereignAPI.registerDockToggle("deltaAnalyzerConsole", "#deltaAnalyzerConsole");
        window.SovereignAPI.registerDockToggle("reportingHubConsole", "#reportingHubConsole");
        window.SovereignAPI.registerDockToggle("sessionManagerConsole", "#sessionManagerConsole");
        window.SovereignAPI.registerDockToggle("utilityHubConsole", "#utilityHubConsole");

        console.log("✅ SovereignAPI HoloConsole dock toggles registered.");
    } else {
        console.warn("⚠ SovereignAPI.registerDockToggle not available at DOMContentLoaded.");
    }

    // Create Dock Panel for forecastConsole
    if (typeof createDockPanel === "function") {
        createDockPanel('forecastConsole', 'Forecast Console Panel');
    }
});
