// ================================
// Phase 30.0.5 — Dropbox Sync Engine Stabilization Module
// ================================

window.dropboxSyncEngine = {
    accessToken: null,
    refreshToken: null,
    clientId: null,
    redirectUri: null,

    init: function(config) {
        this.clientId = config.clientId;
        this.redirectUri = config.redirectUri;
        this.refreshToken = config.refreshToken || null;
        console.log("🔑 Dropbox Sync Engine initialized.");
    },

    authorize: function() {
        const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${this.clientId}&response_type=code&token_access_type=offline&redirect_uri=${this.redirectUri}`;
        window.open(authUrl, "_blank");
    },

    exchangeCodeForToken: async function(code) {
        const url = 'https://api.dropboxapi.com/oauth2/token';
        const params = new URLSearchParams();
        params.append('code', code);
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.clientId);
        params.append('redirect_uri', this.redirectUri);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        const data = await response.json();
        if (data.access_token) {
            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;
            console.log("✅ Dropbox token exchange complete.");
        } else {
            console.error("❌ Token exchange failed:", data);
        }
    },

    refreshAccessToken: async function() {
        const url = 'https://api.dropboxapi.com/oauth2/token';
        const params = new URLSearchParams();
        params.append('refresh_token', this.refreshToken);
        params.append('grant_type', 'refresh_token');
        params.append('client_id', this.clientId);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        const data = await response.json();
        if (data.access_token) {
            this.accessToken = data.access_token;
            console.log("🔄 Dropbox access token refreshed.");
        } else {
            console.error("❌ Failed to refresh token:", data);
        }
    },

    upload: async function(path, content) {
        if (!this.accessToken) {
            console.error("❌ No access token available.");
            return;
        }

        const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Dropbox-API-Arg': JSON.stringify({
                    path: path,
                    mode: 'overwrite',
                    autorename: false,
                    mute: false
                }),
                'Content-Type': 'application/octet-stream'
            },
            body: content
        });

        if (response.ok) {
            console.log("✅ File uploaded to Dropbox.");
        } else {
            console.error("❌ Upload failed:", await response.text());
        }
    },

    download: async function(path) {
        if (!this.accessToken) {
            console.error("❌ No access token available.");
            return null;
        }

        const response = await fetch('https://content.dropboxapi.com/2/files/download', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Dropbox-API-Arg': JSON.stringify({ path: path })
            }
        });

        if (response.ok) {
            const data = await response.text();
            console.log("✅ File downloaded from Dropbox.");
            return data;
        } else {
            console.error("❌ Download failed:", await response.text());
            return null;
        }
    }
};

// ================================
// Phase 30 — Persistent Cloud Memory Core
// ================================

window.adaptiveCloudMemory = {
    filePath: "/adaptive/auditor_brain.json",

    async save() {
        if (!window.adaptiveSyncEngine || !window.dropboxSyncEngine) {
            console.error("❌ Cloud memory core not initialized.");
            return;
        }
        const exportData = adaptiveSyncEngine.export();
        await dropboxSyncEngine.upload(this.filePath, exportData);
        console.log("🧠 Adaptive brain state saved to cloud.");
    },

    async load() {
        if (!window.adaptiveSyncEngine || !window.dropboxSyncEngine) {
            console.error("❌ Cloud memory core not initialized.");
            return;
        }
        const data = await dropboxSyncEngine.download(this.filePath);
        if (data) {
            adaptiveSyncEngine.import(data);
            console.log("🧠 Adaptive brain state loaded from cloud.");
        }
    }
};

// ================================
// Phase 31 — Full Autonomous Cloud Sync Loop
// ================================

window.adaptiveCloudMemoryAutoSync = {
    intervalMs: 60000, // Auto-sync every 60 seconds
    timer: null,

    start() {
        console.log("🧬 Autonomous Cloud Sync Loop Online");
        this.timer = setInterval(() => {
            adaptiveCloudMemory.save();
        }, this.intervalMs);
    },

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            console.log("🧬 Cloud Sync Loop Paused");
        }
    },

    async manualSync() {
        console.log("🧬 Manual Cloud Sync Triggered");
        await adaptiveCloudMemory.save();
    }
};

// Auto-start cloud sync on app load
window.adaptiveCloudMemoryAutoSync.start();

// ================================
// Phase 39.5 — Dropbox Auto Refresh Loop
// ================================

window.dropboxAutoRefresh = {
    intervalMs: 3 * 60 * 60 * 1000, // Every 3 hours
    timer: null,

    start() {
        if (!window.dropboxSyncEngine || !dropboxSyncEngine.refreshAccessToken) {
            console.error("❌ Dropbox Sync Engine not fully initialized.");
            return;
        }

        console.log("🧬 Dropbox Auto Refresh Loop Online");
        this.timer = setInterval(async () => {
            await dropboxSyncEngine.refreshAccessToken();
        }, this.intervalMs);
    },

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            console.log("🧬 Dropbox Auto Refresh Loop Paused");
        }
    }
};

// Auto-start token refresh loop on app load
window.dropboxAutoRefresh.start();
