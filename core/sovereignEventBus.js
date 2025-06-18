// 🧠 Sovereign Neural Event Bus
// This core module routes all sovereign system events to a central pulse stream.

window.SovereignBus = {
  _listeners: {},

  emit(channel, detail) {
    const event = new CustomEvent(channel, {
      detail: {
        channel,
        detail,
        timestamp: Date.now()
      }
    });
    if (window.MeshSignalProcessor) {
      window.MeshSignalProcessor.process(channel, detail);
    }
    if (this._feedbackHandlers[channel]) {
      this.respond(channel, { type: 'echo', payload: detail });
    }
    document.dispatchEvent(event);
    console.log(`📡 SovereignBus emitted → ${channel}`, detail);
  },

  on(channel, callback) {
    if (!this._listeners[channel]) this._listeners[channel] = [];

    const handler = (e) => {
      callback(e.detail, e);
    };

    document.addEventListener(channel, handler);
    this._listeners[channel].push(handler);

    console.log(`🔊 SovereignBus listener added for → ${channel}`);
  },

  _feedbackHandlers: {},

  registerFeedback(channel, handler) {
    if (!this._feedbackHandlers[channel]) {
      this._feedbackHandlers[channel] = [];
    }
    this._feedbackHandlers[channel].push(handler);
    console.log(`🌀 Feedback handler registered for → ${channel}`);
  },

  respond(channel, data) {
    if (this._feedbackHandlers[channel]) {
      this._feedbackHandlers[channel].forEach(fn => fn(data));
      console.log(`🔁 SovereignBus response sent → ${channel}`, data);
    }
  },
};

window.SovereignBus.emit = window.SovereignBus.emit.bind(window.SovereignBus);

console.log("🧠 SovereignBus initialized: Listening for system-wide pulse events.");

// Delayed SovereignBus Bootstrap to ensure agents are fully registered
setTimeout(() => {
  if (!window.SovereignAgents) {
    console.warn("⚠ SovereignAgents registry not initialized.");
    return;
  }

  const directiveHandler = (event) => {
    const directive = event?.detail;
    if (!directive) {
      console.warn("⚠ Received empty directive payload.");
      return;
    }

    const target = directive.target;
    const agent = window.SovereignAgents?.[target];

    if (agent && typeof agent.receiveDirective === 'function') {
      logDirectiveAudit(directive);
      console.log(`📥 Directive dispatched to agent '${target}':`, directive);
      agent.receiveDirective(directive);
      trackDirectiveEcho({ target, payload: directive });
    } else {
      console.warn(`❌ Agent '${target}' is not defined or not yet loaded.`);
    }
  };

  SovereignBus.on('agentDirective', directiveHandler);
  console.log("🤖 SovereignBus (Delayed): Ready to relay directives to SovereignAgents.");
}, 500);

// === Phase 17000 — Sovereign Agent Listener Integration ===
// === Phase 17002 — Sovereign Agent Directive Listener ===
SovereignBus.on('agentDirective', (event) => {
  const directive = event?.detail;
  if (!directive) {
    console.warn("⚠ Received empty directive payload.");
    return;
  }

  const agent = window.SovereignAgent;
  const handler = agent?.receiveDirective;

  if (typeof handler === 'function') {
    logDirectiveAudit(directive);
    console.log("📥 Sovereign Directive dispatched to Agent:", directive);
    handler.call(agent, directive);
  } else {
    console.warn('⚠ SovereignAgent or receiveDirective method not found.');
    console.debug('🛠 Available SovereignAgent:', agent);
  }
});

console.log("🤖 SovereignBus: Ready to relay directives to SovereignAgent.");

// === Phase 17004 — Agent Diagnostic Response Channel ===
SovereignBus.on('agentResponse', (event) => {
  const response = event?.detail;
  if (!response) {
    console.warn("⚠ Received empty agent response payload.");
    return;
  }

  const { target, status, message, payload } = response;

  console.groupCollapsed(`📨 Agent Response Received → ${target}`);
  console.log("✅ Status:", status);
  console.log("🧠 Message:", message);
  console.log("📦 Payload:", payload);
  console.groupEnd();

  updateAgentResponseDOM(target, { status, message, payload });
});

function updateAgentResponseDOM(agent, data) {
  const panel = document.getElementById("lifecycleList");
  if (!panel) return;
  const agentEntries = panel.querySelectorAll("li");

  agentEntries.forEach(entry => {
    if (entry.textContent.includes(agent)) {
      let details = entry.querySelector("details.agent-response");
      if (!details) {
        details = document.createElement("details");
        details.className = "agent-response";
        const summary = document.createElement("summary");
        summary.textContent = "📨 Agent Responses";
        details.appendChild(summary);
        entry.appendChild(details);
      }

      const item = document.createElement("div");
      item.textContent = `[${new Date().toLocaleTimeString()}] ${data.status} — ${data.message}`;
      details.appendChild(item);
    }
  });
}

const directiveHistory = {
  dropAgent: [],
  taskAgent: [],
  wardenAgent: []
};

function trackDirectiveEcho({ target, payload }) {
  if (!directiveHistory[target]) return;
  directiveHistory[target].unshift({
    time: new Date().toLocaleTimeString(),
    summary: JSON.stringify(payload).slice(0, 60)
  });
  logFeedbackTrace({
    agent: target,
    time: new Date().toISOString(),
    action: payload?.action || 'unknown',
    echo: payload
  });
  if (directiveHistory[target].length > 5) directiveHistory[target].pop();
  updateDirectiveEchoDOM(target);
}

function logDirectiveAudit(directive) {
  const log = {
    time: new Date().toISOString(),
    target: directive?.target || 'UNKNOWN',
    action: directive?.action || 'N/A',
    payload: directive
  };

  console.groupCollapsed(`📚 Directive Audit Log → ${log.target}`);
  console.log("🕒 Time:", log.time);
  console.log("🎯 Target:", log.target);
  console.log("🧭 Action:", log.action);
  console.log("📦 Payload:", log.payload);
  console.groupEnd();
}

function updateDirectiveEchoDOM(agent) {
  const panel = document.getElementById("lifecycleList");
  if (!panel) return;
  const agentEntries = panel.querySelectorAll("li");

  agentEntries.forEach(entry => {
    if (entry.textContent.includes(agent)) {
      let details = entry.querySelector("details");
      if (!details) {
        details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = "🧾 Directive Echo";
        details.appendChild(summary);
        entry.appendChild(details);
      }

      // Clear and re-add
      details.innerHTML = "<summary>🧾 Directive Echo</summary>";
      directiveHistory[agent].forEach((d, index) => {
        const item = document.createElement("div");
        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.alignItems = "center";
        item.style.marginBottom = "4px";

        const text = document.createElement("span");
        text.textContent = `[${d.time}] ${d.summary}`;
        item.appendChild(text);

        const button = document.createElement("button");
        button.textContent = "↪ Replay";
        button.style.marginLeft = "8px";
        button.style.fontSize = "0.8em";
        button.style.padding = "2px 6px";
        button.onclick = () => {
          try {
            const parsed = JSON.parse(d.summary + '}'); // quick patch if summary was truncated
            SovereignBus.emit('agentDirective', parsed);
            console.log("🧬 Replayed directive:", parsed);
          } catch (err) {
            console.warn("⚠ Failed to parse directive for replay:", err);
          }
        };

        item.appendChild(button);
        details.appendChild(item);
      });

      // Append new details section for replay last directive
      const replayDetails = document.createElement("details");
      const replaySummary = document.createElement("summary");
      replaySummary.textContent = "📤 Replay Last Directive";
      replayDetails.appendChild(replaySummary);

      directiveHistory[agent].forEach((d) => {
        const replayItem = document.createElement("div");
        replayItem.style.display = "flex";
        replayItem.style.justifyContent = "space-between";
        replayItem.style.alignItems = "center";
        replayItem.style.marginBottom = "4px";

        const replayText = document.createElement("span");
        replayText.textContent = `[${d.time}] ${d.summary}`;
        replayItem.appendChild(replayText);

        const replayButton = document.createElement("button");
        replayButton.textContent = "↪ Replay";
        replayButton.style.marginLeft = "8px";
        replayButton.style.fontSize = "0.8em";
        replayButton.style.padding = "2px 6px";
        replayButton.onclick = () => {
          try {
            const parsed = JSON.parse(d.summary + '}'); // quick patch if summary was truncated
            SovereignBus.emit('agentDirective', parsed);
            console.log("🧬 Replayed directive:", parsed);
          } catch (err) {
            console.warn("⚠ Failed to parse directive for replay:", err);
          }
        };

        replayItem.appendChild(replayButton);
        replayDetails.appendChild(replayItem);
      });

      entry.appendChild(replayDetails);
    }
  });
}

function logFeedbackTrace(data) {
  const consolePanel = document.getElementById("devConsolePanel");
  if (!consolePanel) return;

  let container = document.getElementById("feedbackRelayLogs");
  if (!container) {
    container = document.createElement("div");
    container.id = "feedbackRelayLogs";
    container.innerHTML = "<h4>🛰️ Feedback Relay</h4>";
    consolePanel.appendChild(container);
  }

  const line = document.createElement("div");
  line.style.fontSize = "0.85em";
  line.style.marginBottom = "6px";
  line.textContent = `[${new Date(data.time).toLocaleTimeString()}] → ${data.agent} (${data.action})`;

  container.appendChild(line);
}

// === Phase 300.21 — Companion Protocol Initialization ===
SovereignBus.on('companionDirective', (event) => {
  const directive = event?.detail;
  if (!directive) {
    console.warn("⚠ Received empty companion directive.");
    return;
  }

  const { target, action, payload } = directive;
  const companion = window.CompanionRegistry?.[target];

  if (companion && typeof companion.receiveDirective === 'function') {
    console.log(`🤝 Companion '${target}' received directive:`, directive);
    companion.receiveDirective({ action, payload });
  } else {
    console.warn(`❌ Companion '${target}' not found or does not support receiveDirective.`);
  }
});

console.log("🤝 SovereignBus: Companion Protocol Initialized.");

// Make SovereignBus globally accessible as SovereignEventBus
window.SovereignEventBus = window.SovereignBus;