

// 🌐 SageCraft Sovereign Role Assignment Module

console.log("🎯 Sovereign Role Assignment Module Initialized");

const RoleAssignment = {
    assignRole: function(roleName, profileName) {
        if (!roleName || !profileName) {
            console.warn("❌ Role and Profile names required.");
            return;
        }
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        const roleMap = roleMapJSON ? JSON.parse(roleMapJSON) : {};
        roleMap[roleName] = profileName;
        localStorage.setItem("dockRoleMap", JSON.stringify(roleMap));
        console.log(`🎯 Role '${roleName}' assigned to profile '${profileName}'.`);
    },

    getAssignedProfile: function(roleName) {
        if (!roleName) {
            console.warn("❌ Role name required.");
            return null;
        }
        const roleMapJSON = localStorage.getItem("dockRoleMap");
        if (!roleMapJSON) return null;
        const roleMap = JSON.parse(roleMapJSON);
        return roleMap[roleName] || null;
    },

    activateAssignedRole: function(roleName, loadProfileCallback) {
        if (!roleName) {
            console.warn("❌ Role name required.");
            return;
        }
        const profileName = this.getAssignedProfile(roleName);
        if (!profileName) {
            console.warn(`⚠ No profile assigned for role '${roleName}'.`);
            return;
        }
        console.log(`🚀 Activating role '${roleName}' with profile '${profileName}'.`);
        if (typeof loadProfileCallback === 'function') {
            loadProfileCallback(profileName);
        }
    }
};