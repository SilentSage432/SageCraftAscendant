

// 🧬 Agent Forger | Dynamic Agent Creation Module

console.log("🛠️ Agent Forger Initialized: Ready to craft new agents.");

// Main AgentForger namespace
window.AgentForger = {
  forgeAgent(config = {}) {
    const {
      name = `agent_${Date.now()}`,
      methods = {},
      autoRegister = true,
    } = config;

    const agent = {
      ...methods,
      init: () => console.log(`⚙️ ${name} initialized.`),
      ping: () => console.log(`📡 ${name} pinged.`),
      lastPing: Date.now(),
    };

    if (autoRegister && window.SovereignAgents) {
      window.SovereignAgents[name] = agent;
      console.log(`✅ Agent '${name}' forged and registered.`);
      if (window.SovereignEventBus) {
        window.SovereignEventBus.emit("agentPresence", {
          name,
          status: "FORGED",
          timestamp: Date.now(),
        });
      }
    }

    return agent;
  }
};