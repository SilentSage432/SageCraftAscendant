

// 🧠 Sovereign Warden Core Protocol

const Warden = {
  active: false,
  init() {
    this.active = true;
    console.log("🛡️ Warden initialized.");

    this.startSweep();
    setInterval(() => this.startSweep(), 15000); // Every 15 sec
  },

  startSweep() {
    if (!this.active) return;
    this.checkGhostAgents();
    this.detectUnstableAnomalies();
  },

  checkGhostAgents() {
    const now = Date.now();
    const ghosts = [];

    for (const [agent, lastPing] of Object.entries(agentStatusMap)) {
      if (now - lastPing > 30000) {
        ghosts.push(agent);
      }
    }

    if (ghosts.length > 0) {
      console.warn("👻 Ghost Agents Detected:", ghosts);
      this.log(`Ghosts: ${ghosts.join(", ")}`);
    }
  },

  detectUnstableAnomalies() {
    const cutoff = Date.now() - 60000;
    const unstable = anomalyLog.filter(a => a.timestamp < cutoff);

    if (unstable.length > 0) {
      console.warn("⚠️ Unstable anomalies detected.");
      this.log(`Unstable anomalies: ${unstable.length}`);
    }
  },

  log(msg) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[Warden ${timestamp}] ${msg}`);
    // Future: write to on-screen panel or lore archive
  }
};