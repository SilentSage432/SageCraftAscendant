// === Sovereign Agent Core Interface ===

const SovereignAgent = (function () {
  let agentId = "SAGE-001";
  let memoryLog = [];

  function initializeAgent() {
    console.log("🧠 Sovereign Agent Initialized:", agentId);
    // Initial memory state or instructions can be loaded here
    memoryLog.push({ type: "init", timestamp: Date.now(), message: "Agent boot sequence complete." });
  }

  function receiveDirective(directive) {
    console.log("📡 Directive received:", directive);
    memoryLog.push({ type: "directive", timestamp: Date.now(), directive });

    // 🧠 Phase 17003: Directive Routing Logic
    if (directive && typeof directive === 'object' && directive.target && directive.action) {
      console.log(`🧭 SovereignAgent Routing — Target: ${directive.target}, Action: ${directive.action}`);

      // 🔁 Dynamic Routing Check — Generic Method Fallback
      const agent = window[directive.target];
      if (agent && typeof agent[directive.action] === "function") {
        agent[directive.action](directive.payload);
        SovereignBus?.emit?.('agentResponse', { status: 'success', directive });
        return;
      }

      try {
        switch (directive.target) {
          case 'dockManager':
            if (window.DockManager && typeof window.DockManager[directive.action] === 'function') {
              window.DockManager[directive.action](directive.payload);
              SovereignBus?.emit?.('agentResponse', { status: 'success', directive });
            } else {
              console.warn(`⚠️ Unknown action '${directive.action}' on DockManager.`);
            }
            break;

          case 'meshVitals':
            if (window.MeshVitals && typeof window.MeshVitals[directive.action] === 'function') {
              window.MeshVitals[directive.action](directive.payload);
              SovereignBus?.emit?.('agentResponse', { status: 'success', directive });
            } else {
              console.warn(`⚠️ Unknown action '${directive.action}' on MeshVitals.`);
            }
            break;

          default:
            // Attempt dynamic routing to DropAgent, TaskAgent, or WardenAgent
            const targetAgentMap = {
              dropAgent: window.DropAgent,
              taskAgent: window.TaskAgent,
              wardenAgent: window.WardenAgent
            };

            const targetAgent = targetAgentMap[directive.target];
            if (!targetAgent) {
              console.warn(`❌ Agent '${directive.target}' is not defined or not yet loaded.`);
              SovereignBus?.emit?.('agentResponse', { status: 'unhandled', directive, error: "Agent not found" });
              return;
            }

            if (typeof targetAgent[directive.action] !== 'function') {
              console.warn(`⚠️ Agent '${directive.target}' does not implement action '${directive.action}'.`);
              SovereignBus?.emit?.('agentResponse', { status: 'unhandled', directive, error: "Action not implemented" });
              return;
            }

            targetAgent[directive.action](directive.payload);
            SovereignBus?.emit?.('agentResponse', { status: 'success', directive });
            break;
        }
        return; // Exit early after routing logic
      } catch (err) {
        console.error("💥 Error during routing:", err);
        SovereignBus?.emit?.('agentResponse', { status: 'error', error: err.message, directive });
        return;
      }
    }

    // Handle different directive types
    switch (directive.type) {
      case 'diagnostic':
        runDiagnostics(directive.payload);
        break;
      case 'log':
        logMemory(directive.payload);
        break;
      case 'action':
        executeAction(directive.payload);
        break;
      default:
        console.warn("❓ Unknown directive type:", directive.type);
    }
  }

  function runDiagnostics(payload) {
    console.log("🔎 Running diagnostics with payload:", payload);
    const report = {
      timestamp: Date.now(),
      status: 'Nominal',
      payload,
    };
    if (window?.SovereignBus?.emit) {
      SovereignBus.emit('agentDiagnosticReport', report);
    }
  }

  function logMemory(entry) {
    const key = `entry_${Date.now()}`;
    memoryLog.push({ type: "memory", timestamp: Date.now(), key, entry });
    console.log("🧠 Memory logged under:", key, entry);
  }

  function executeAction(payload) {
    console.log("⚙️ Executing action:", payload);

    switch (payload.command) {
      case 'runAudit':
        window?.NeuralAuditSentinel?.auditWiring?.();
        break;
      case 'toggleHUD':
        SovereignBus?.emit?.('toggleHUD', { source: agentId });
        break;
      case 'synthesizePanels':
        window?.NeuralPanelSynthesis?.synthesizePanels?.();
        break;
      case 'rebootDock':
        SovereignBus?.emit?.('rebuildDockMesh', { source: agentId });
        break;
      default:
        console.warn("❓ Unknown agent action command:", payload.command);
    }

    memoryLog.push({ type: "action", timestamp: Date.now(), command: payload.command });
  }

  function reportStatus() {
    return {
      agentId,
      memoryDepth: memoryLog.length,
      lastEvent: memoryLog[memoryLog.length - 1] || null
    };
  }

  function resetMemory() {
    memoryLog = [];
    console.warn("🧼 Sovereign Agent memory has been reset.");
  }

  return {
    initializeAgent,
    receiveDirective,
    reportStatus,
    resetMemory
  };
})();

function registerAgent(name, config) {
  window.SovereignAgents = window.SovereignAgents || {};
  window.SovereignAgents[name] = {
    ...config,
    lastPing: Date.now()
  };
  console.log(`✅ Agent registered: ${name}`);
  console.log(`🛰️ Agent '${name}' fully registered and ready for directives.`);
  SovereignBus?.emit?.('agentReady', { agent: name });
}

// Optional: Auto-initialize agent on script load
SovereignAgent.initializeAgent();

window.SovereignAgent = SovereignAgent;
window.receiveDirective = SovereignAgent.receiveDirective;
window.registerAgent = registerAgent;