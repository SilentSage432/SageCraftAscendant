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