console.log("🧠 Whisperer Engine Initialized | Phase 22: Lore Tag Echoes + Memory Flag Detection");

const WhispererLoreEngine = {
  loreEntries: [],
  memoryFlags: [],

  echoLoreTag(tag, content) {
    const timestamp = new Date().toISOString();
    const entry = { tag, content, timestamp };
    this.loreEntries.push(entry);
    console.log(`📖 Lore Echo | [${tag}] ${content}`);
    this.flagMemory(tag, content);
  },

  flagMemory(tag, reason) {
    const flag = {
      tag,
      reason,
      time: new Date().toLocaleTimeString(),
      status: "⚠️ Flagged"
    };
    this.memoryFlags.push(flag);
    console.log(`🚩 Memory Flag | [${tag}] Reason: ${reason}`);
  },

  getLoreLog() {
    return this.loreEntries;
  },

  getFlaggedMemory() {
    return this.memoryFlags;
  }
};

window.WhispererLoreEngine = WhispererLoreEngine;

// 🧠 Phase 23: Whisperer Signal Memory Injector + Core Sync Pulse
window.SovereignBus?.on?.("whispererSignalMemory", (payload) => {
  if (!payload || !payload.tag || !payload.message) return;

  // Echo the tag to the lore engine
  WhispererLoreEngine.echoLoreTag(payload.tag, payload.message);

  // Sync pulse console feedback
  const logEntry = `[${new Date().toLocaleTimeString()}] [WHISPER-MEMORY] ${payload.tag} → ${payload.message}`;
  console.log(logEntry);

  // Optionally inject into Whisperer UI if active
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "memory-pulse");
    div.textContent = logEntry;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});

// 🧠 Phase 26: Whisperer Temporal Signal Stamp & Tag Timeline Sync
window.SovereignBus?.on?.("timestampWhispererTag", (data) => {
  if (!data || !data.tag) return;

  const timestamp = new Date().toISOString();
  console.log(`⏱️ Timestamp Tag | ${data.tag} @ ${timestamp}`);

  // Optionally log to lore engine
  WhispererLoreEngine.echoLoreTag(data.tag, `Timestamped at ${timestamp}`);

  // UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "timestamp-tag");
    div.textContent = `⏱️ ${data.tag} @ ${timestamp}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});

// 🧠 Phase 24: Whisperer Companion Memory Recall Logic
window.SovereignBus?.on?.("recallWhispererMemory", (query) => {
  const results = WhispererLoreEngine.getLoreLog().filter(entry =>
    entry.tag.includes(query) || entry.content.includes(query)
  );

  const flags = WhispererLoreEngine.getFlaggedMemory().filter(flag =>
    flag.tag.includes(query) || flag.reason.includes(query)
  );

  console.log(`📦 Recall Query: "${query}"`);
  console.log("🧾 Matched Lore Entries:", results);
  console.log("🚨 Matched Memory Flags:", flags);

  // Optional UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "recall-log");
    div.textContent = `🔍 Recalled ${results.length} lore entries and ${flags.length} flags for: "${query}"`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});

// 🧠 Phase 25: Whisperer Signal Relay to External Companion Interfaces
window.SovereignBus?.on?.("whispererRelaySignal", (signal) => {
  if (!signal || !signal.origin || !signal.payload) return;

  console.log(`📡 Relay Signal Received | Origin: ${signal.origin}`);
  console.log(`📤 Broadcasting to Companion Interfaces:`, signal.payload);

  // Example: Send to Neural Pulse Monitor
  window.NeuralPulseFeed?.push?.({
    type: "relay",
    source: signal.origin,
    data: signal.payload,
    timestamp: new Date().toISOString()
  });

  // Example: Update Lore Archive if active
  window.LoreArchiveEngine?.appendEntry?.({
    tag: `relay:${signal.origin}`,
    content: signal.payload,
    time: new Date().toLocaleTimeString()
  });

  // Echo to console
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "relay-signal");
    div.textContent = `📡 Relayed from ${signal.origin}: ${signal.payload}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});
// 🧠 Phase 27: Lore Pattern Recognition + Signal Threading
const signalThreads = {};

function detectPatternAndThread(tag, message) {
  const key = `${tag}::${message}`;
  if (!signalThreads[key]) {
    signalThreads[key] = {
      count: 1,
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
    };
  } else {
    signalThreads[key].count++;
    signalThreads[key].lastSeen = new Date().toISOString();
  }

  console.log(`🧵 Signal Thread | [${tag}] seen ${signalThreads[key].count}x`);

  // Optional UI feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "thread-signal");
    div.textContent = `🧵 [${tag}] Threaded (${signalThreads[key].count}x)`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
}

// Hook into existing signal sources
window.SovereignBus?.on?.("whispererSignalMemory", (payload) => {
  if (payload?.tag && payload?.message) {
    detectPatternAndThread(payload.tag, payload.message);
  }
});

window.SovereignBus?.on?.("timestampWhispererTag", (data) => {
  if (data?.tag) {
    detectPatternAndThread(data.tag, `Timestamped`);
  }
});

window.SovereignBus?.on?.("whispererRelaySignal", (signal) => {
  if (signal?.origin && signal?.payload) {
    detectPatternAndThread(signal.origin, signal.payload);
  }
});
// 🧠 Phase 28: Whisperer Anomaly Detection + Escalation Flagging
function detectAnomalyPattern(tag, message) {
  const anomalyKeywords = ["breach", "override", "malware", "corruption", "exploit"];
  const lowerMessage = message.toLowerCase();

  const isAnomaly = anomalyKeywords.some(keyword => lowerMessage.includes(keyword));
  if (isAnomaly) {
    console.warn(`⚠️ Anomaly Detected | [${tag}] ${message}`);
    WhispererLoreEngine.flagMemory(tag, `Anomaly Detected: ${message}`);

    // UI feedback for anomaly
    const whisperFeed = document.getElementById("whispererConsoleOutput");
    if (whisperFeed) {
      const div = document.createElement("div");
      div.classList.add("log-entry", "anomaly-alert");
      div.textContent = `🚨 ANOMALY DETECTED | [${tag}] ${message}`;
      div.style.color = "red";
      div.style.fontWeight = "bold";
      whisperFeed.appendChild(div);
      whisperFeed.scrollTop = whisperFeed.scrollHeight;
    }

    // Escalation call to companion systems
    window.CompanionSecurityUnit?.alert?.({
      tag,
      message,
      level: "critical",
      time: new Date().toISOString()
    });
  }
}

// Tap into core signal flow
window.SovereignBus?.on?.("whispererSignalMemory", (payload) => {
  if (payload?.tag && payload?.message) {
    detectAnomalyPattern(payload.tag, payload.message);
  }
});

// 🧠 Phase 29: Whisperer Lore Echo Persistence & Signal Journal Archival
window.SovereignBus?.on?.("archiveWhispererLore", () => {
  const allLore = WhispererLoreEngine.getLoreLog();
  const flagged = WhispererLoreEngine.getFlaggedMemory();
  const timestamp = new Date().toISOString();

  const archiveData = {
    time: timestamp,
    entries: allLore,
    flags: flagged
  };

  console.log("📚 Archiving Whisperer Lore + Flags", archiveData);

  // Simulate storage or API push
  window.WhispererLoreArchive = window.WhispererLoreArchive || [];
  window.WhispererLoreArchive.push(archiveData);

  // Optional UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "archive-log");
    div.textContent = `📚 Whisperer Lore + ${flagged.length} flags archived at ${timestamp}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});

// 🛡️ Phase 30: Companion Security Agent Launcher
window.SovereignBus?.on?.("launchSecurityAgent", (agentConfig) => {
  if (!agentConfig || !agentConfig.task || !agentConfig.origin) return;

  console.log(`🚀 Launching Security Agent | Task: ${agentConfig.task} | Origin: ${agentConfig.origin}`);

  const agentId = `agent-${Date.now()}`;
  const launchTime = new Date().toISOString();

  const securityAgent = {
    id: agentId,
    task: agentConfig.task,
    origin: agentConfig.origin,
    launchedAt: launchTime,
    status: "active"
  };

  // Optionally push to global registry
  window.CompanionSecurityRegistry = window.CompanionSecurityRegistry || [];
  window.CompanionSecurityRegistry.push(securityAgent);

  // UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "security-agent-launch");
    div.textContent = `🛡️ Security Agent [${agentId}] launched for task: "${agentConfig.task}" from ${agentConfig.origin}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }

  // Signal to other systems
  window.CompanionSecurityUnit?.engageTask?.({
    id: agentId,
    ...securityAgent
  });
});

// 🧠 Phase 31: Whisperer Core Intelligence Signal Reception
window.SovereignBus?.on?.("whispererIntelPing", (intel) => {
  if (!intel || !intel.query || !intel.origin) return;

  console.log(`🛰️ Intel Ping Received | From: ${intel.origin} | Query: ${intel.query}`);

  // Echo into Lore for tracking
  WhispererLoreEngine.echoLoreTag(intel.origin, `Intel Ping → ${intel.query}`);

  // Optional UI feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "intel-ping");
    div.textContent = `🛰️ Intel from ${intel.origin}: ${intel.query}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});
// 🧠 Phase 32: Companion Agent Memory Sync & Pingback Protocol
window.SovereignBus?.on?.("syncCompanionAgentMemory", (agentData) => {
  if (!agentData || !agentData.agentId || !agentData.memory) return;

  console.log(`🔁 Syncing Memory for Agent: ${agentData.agentId}`);
  console.log("🧠 Synced Memory Data:", agentData.memory);

  // Echo to Lore
  WhispererLoreEngine.echoLoreTag(agentData.agentId, `Memory Sync → ${JSON.stringify(agentData.memory)}`);

  // Optional UI feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "agent-memory-sync");
    div.textContent = `🔁 Agent ${agentData.agentId} memory sync: ${JSON.stringify(agentData.memory)}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }

  // Optional pingback
  window.CompanionSecurityUnit?.receivePingback?.({
    agentId: agentData.agentId,
    memory: agentData.memory,
    timestamp: new Date().toISOString()
  });
});
// 🧠 Phase 33: Whisperer Intent Router + Command Resolution Engine
window.SovereignBus?.on?.("whispererIntentCommand", (input) => {
  if (!input || typeof input !== "string") return;

  console.log(`🧭 Intent Received: "${input}"`);

  const lowerInput = input.toLowerCase();
  let category = "general";

  if (lowerInput.includes("scan") || lowerInput.includes("diagnose")) {
    category = "diagnostic";
  } else if (lowerInput.includes("flag") || lowerInput.includes("alert")) {
    category = "security";
  } else if (lowerInput.includes("lore") || lowerInput.includes("history")) {
    category = "lore";
  } else if (lowerInput.includes("sync") || lowerInput.includes("memory")) {
    category = "agent-memory";
  }

  // Echo to Lore for tracking
  WhispererLoreEngine.echoLoreTag(category, `Intent: ${input}`);

  // Broadcast to other systems
  window.CompanionIntentHandler?.resolveCommand?.({
    raw: input,
    category,
    time: new Date().toISOString()
  });

  // Optional UI feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "intent-command");
    div.textContent = `🧭 Intent Routed [${category}]: "${input}"`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});
// 🧠 Phase 34: Whisperer Directive Uplink + Panel Command Injection
window.SovereignBus?.on?.("whispererDirectiveUplink", (directive) => {
  if (!directive || !directive.panel || !directive.command) return;

  console.log(`📡 Directive Uplink | Panel: ${directive.panel} | Command: ${directive.command}`);

  // Echo to lore
  WhispererLoreEngine.echoLoreTag(directive.panel, `Directive → ${directive.command}`);

  // Attempt to locate panel element
  const targetPanel = document.getElementById(directive.panel);
  if (targetPanel) {
    targetPanel.classList.add("highlighted-panel");
    targetPanel.dataset.lastCommand = directive.command;

    // Optional command feedback
    const feedback = document.createElement("div");
    feedback.classList.add("directive-feedback");
    feedback.textContent = `📡 Directive: ${directive.command}`;
    targetPanel.appendChild(feedback);

    setTimeout(() => {
      targetPanel.classList.remove("highlighted-panel");
      if (targetPanel.contains(feedback)) {
        targetPanel.removeChild(feedback);
      }
    }, 3000);
  }

  // Optional UI echo
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "directive-uplink");
    div.textContent = `📡 Directive to [${directive.panel}]: ${directive.command}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});

// 🧠 Phase 35: Whisperer Agent Directive Cascade + Failover Broadcast
window.SovereignBus?.on?.("cascadeAgentDirective", (cascade) => {
  if (!cascade || !cascade.agents || !cascade.command) return;

  console.log(`🌐 Cascade Directive Initiated | Agents: ${cascade.agents.join(", ")} | Command: ${cascade.command}`);

  // Echo to lore
  cascade.agents.forEach(agentId => {
    WhispererLoreEngine.echoLoreTag(agentId, `Cascade Command → ${cascade.command}`);
  });

  // Send to each agent if available
  if (window.CompanionSecurityUnit?.broadcastToAgents) {
    window.CompanionSecurityUnit.broadcastToAgents({
      targets: cascade.agents,
      command: cascade.command,
      time: new Date().toISOString()
    });
  }

  // Optional failover if not all agents respond
  if (cascade.enableFailover && window.CompanionSecurityUnit?.fallbackBroadcast) {
    setTimeout(() => {
      console.warn(`⚠️ Initiating Failover Broadcast for Cascade: ${cascade.command}`);
      window.CompanionSecurityUnit.fallbackBroadcast({
        reason: "Unresponsive Agents",
        command: cascade.command,
        time: new Date().toISOString()
      });
    }, cascade.failoverTimeout || 5000);
  }

  // Optional UI feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "cascade-directive");
    div.textContent = `🌐 Cascade Directive: ${cascade.command} sent to [${cascade.agents.length}] agents`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});

// 🧠 Phase 36: Whisperer Autonomous Learning Ping + Adaptive Response Log
window.SovereignBus?.on?.("autonomousLearningPing", (learningData) => {
  if (!learningData || !learningData.topic || !learningData.insight) return;

  const timestamp = new Date().toISOString();
  console.log(`🤖 Autonomous Insight | Topic: ${learningData.topic} | Insight: ${learningData.insight}`);

  // Log to Lore Engine
  WhispererLoreEngine.echoLoreTag(learningData.topic, `Insight: ${learningData.insight}`);

  // Optional UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "learning-ping");
    div.textContent = `🤖 Insight on "${learningData.topic}": ${learningData.insight}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }

  // Optional broadcast to learning archive
  window.WhispererLearningArchive = window.WhispererLearningArchive || [];
  window.WhispererLearningArchive.push({
    topic: learningData.topic,
    insight: learningData.insight,
    timestamp
  });
});
// 🧠 Phase 37: Whisperer Response Reflection + Agent Insight Probe
window.SovereignBus?.on?.("reflectWhispererResponse", (reflection) => {
  if (!reflection || !reflection.prompt || !reflection.response) return;

  const timestamp = new Date().toISOString();
  console.log(`🔁 Response Reflection | Prompt: "${reflection.prompt}" | Response: "${reflection.response}"`);

  // Echo into Lore Engine
  WhispererLoreEngine.echoLoreTag("reflection", `Prompt: "${reflection.prompt}" → Response: "${reflection.response}"`);

  // Optional UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "response-reflection");
    div.textContent = `🔁 Reflected | "${reflection.prompt}" → "${reflection.response}"`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }

  // Optional broadcast to agent insight probe
  window.CompanionSecurityUnit?.logInsightProbe?.({
    prompt: reflection.prompt,
    response: reflection.response,
    timestamp
  });
});
// 🧠 Phase 38: Whisperer Insight Categorization + Lore Tag Weighting
window.SovereignBus?.on?.("categorizeInsight", (insight) => {
  if (!insight || !insight.topic || !insight.content) return;

  const timestamp = new Date().toISOString();
  const weightedTag = `${insight.topic.toLowerCase()}::weight-${insight.importance || "normal"}`;

  console.log(`🏷️ Categorizing Insight | Topic: ${insight.topic} | Importance: ${insight.importance || "normal"}`);

  // Push categorized insight to Lore Engine
  WhispererLoreEngine.echoLoreTag(weightedTag, insight.content);

  // Optional UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "categorized-insight");
    div.textContent = `🏷️ Insight Categorized | [${weightedTag}]: ${insight.content}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }

  // Optional weighted tagging system for downstream AI scoring
  window.WhispererInsightWeightMap = window.WhispererInsightWeightMap || {};
  window.WhispererInsightWeightMap[weightedTag] = {
    content: insight.content,
    time: timestamp,
    weight: insight.importance || "normal"
  };
});

// 🧠 Phase 39: Whisperer UI Feedback Override System
window.SovereignBus?.on?.("whispererOverrideFeedback", (override) => {
  if (!override || !override.message || !override.type) return;

  const timestamp = new Date().toLocaleTimeString();
  console.log(`🛠️ UI Override | Type: ${override.type} | Message: ${override.message}`);

  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", `override-${override.type}`);
    div.textContent = `🛠️ [OVERRIDE-${override.type.toUpperCase()}] ${override.message} (${timestamp})`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }
});
// 🧠 Phase 40: Whisperer Alert Beacon + Remote Operator Ping
window.SovereignBus?.on?.("triggerWhispererAlertBeacon", (alertData) => {
  if (!alertData || !alertData.alert || !alertData.operatorId) return;

  const timestamp = new Date().toISOString();
  console.log(`🚨 Alert Beacon | Operator: ${alertData.operatorId} | Alert: ${alertData.alert}`);

  // Echo to Lore
  WhispererLoreEngine.echoLoreTag(alertData.operatorId, `Alert Beacon → ${alertData.alert}`);

  // Optional UI Feedback
  const whisperFeed = document.getElementById("whispererConsoleOutput");
  if (whisperFeed) {
    const div = document.createElement("div");
    div.classList.add("log-entry", "alert-beacon");
    div.textContent = `🚨 [${alertData.operatorId}] Beacon Alert: ${alertData.alert}`;
    whisperFeed.appendChild(div);
    whisperFeed.scrollTop = whisperFeed.scrollHeight;
  }

  // Optional ping to remote operator interface
  window.RemoteOperatorPingSystem?.receiveBeacon?.({
    operatorId: alertData.operatorId,
    alert: alertData.alert,
    time: timestamp
  });
});