// 🌐 SageCraft Sovereign Profile Fabrication Module

console.log("🧬 Sovereign Profile Fabrication Module Initialized");

const ProfileFabrication = {
    saveProfile: function(profileName, visiblePanels) {
        if (!profileName || !Array.isArray(visiblePanels)) {
            console.warn("❌ Invalid profile save parameters.");
            return;
        }
        const profilesJSON = localStorage.getItem("dockProfiles");
        const profiles = profilesJSON ? JSON.parse(profilesJSON) : {};
        profiles[profileName] = visiblePanels;
        localStorage.setItem("dockProfiles", JSON.stringify(profiles));
        console.log(`💾 Profile '${profileName}' saved.`);
    },

    loadProfile: function(profileName) {
        const profilesJSON = localStorage.getItem("dockProfiles");
        if (!profilesJSON) {
            console.warn("❌ No profiles found.");
            return null;
        }
        const profiles = JSON.parse(profilesJSON);
        return profiles[profileName] || null;
    },

    listProfiles: function() {
        const profilesJSON = localStorage.getItem("dockProfiles");
        if (!profilesJSON) return [];
        const profiles = JSON.parse(profilesJSON);
        return Object.keys(profiles);
    },

    deleteProfile: function(profileName) {
        const profilesJSON = localStorage.getItem("dockProfiles");
        if (!profilesJSON) return;
        const profiles = JSON.parse(profilesJSON);
        delete profiles[profileName];
        localStorage.setItem("dockProfiles", JSON.stringify(profiles));
        console.log(`🗑 Profile '${profileName}' deleted.`);
    }
};
