

// whisperer.js — Modular Controller for Whisperer Console (Phases 55–61)

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("whispererInput");
  const sendBtn = document.getElementById("sendWhispererMessage");
  const output = document.getElementById("whispererConsoleOutput");
  const contextSelect = document.getElementById("whispererContextMode");

  // --- Phase 55: Smart File Upload ---
  const supportedFileTypes = {
    "text/plain": "📄 Text",
    "application/json": "🧾 JSON",
    "text/html": "🌐 HTML",
    "application/javascript": "📜 JS",
    "text/css": "🎨 CSS"
  };

  document.getElementById("uploadWhispererFile")?.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const content = ev.target.result;
          const preview = document.createElement("div");
          preview.classList.add("log-entry");
          const typeLabel = supportedFileTypes[file.type] || `📁 ${file.type || "Unknown"}`;
          preview.innerHTML = `${typeLabel} <strong>${file.name}</strong><br/><pre>${content.slice(0, 300).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`;
          output?.appendChild(preview);

          window.SovereignBus?.emit?.("whispererSmartFileParsed", {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            snippet: content.slice(0, 300)
          });
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });

  // --- Phase 56: Context Analyzer ---
  const contextAnalyzer = (msg, context) => {
    const lowerMsg = msg.toLowerCase();
    if (context === "diagnostic" && lowerMsg.includes("status")) return "🧪 System Status: All diagnostics nominal.";
    if (context === "agent" && lowerMsg.includes("deploy")) return "🤖 Deploying agent... Awaiting confirmation.";
    if (context === "memory" && lowerMsg.includes("recall")) return "💾 Memory link established. Retrieving logs...";
    if (context === "lore" && lowerMsg.includes("unlock")) return "📜 New lore chapter pending activation...";
    return "";
  };

  // --- Phase 57: Modal Recall ---
  const whispererModes = {
    default: [], diagnostic: [], system: [], memory: [], anomaly: [], agent: [], lore: []
  };

  const recallModal = document.createElement("div");
  recallModal.id = "whispererRecallModal";
  recallModal.style.cssText = "display:none;position:fixed;top:20%;left:50%;transform:translateX(-50%);background:#111;color:#0f0;padding:20px;z-index:9999;max-height:300px;overflow-y:auto;font-family:monospace;border:2px solid #0f0;border-radius:6px;";
  document.body.appendChild(recallModal);

  const updateRecallModal = (mode) => {
    const entries = whispererModes[mode] || [];
    recallModal.innerHTML = `<strong>🧠 Recall Mode: ${mode}</strong><br/><br/>` + entries.map((e, i) => `<div>${i + 1}. ${e}</div>`).join("");
  };

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "r") {
      const mode = contextSelect?.value || "default";
      updateRecallModal(mode);
      recallModal.style.display = "block";
    }
    if (e.key === "Escape") {
      recallModal.style.display = "none";
    }
  });

  document.getElementById("whispererRecallButton")?.addEventListener("click", () => {
    const mode = contextSelect?.value || "default";
    updateRecallModal(mode);
    recallModal.style.display = "block";
  });

  const saveToModeHistory = (mode, msg) => {
    if (!whispererModes[mode]) whispererModes[mode] = [];
    whispererModes[mode].push(msg);
    if (whispererModes[mode].length > 10) whispererModes[mode].shift();
  };

  // --- Phase 58: Companion Bridge ---
  const companionAgents = {
    agent: "EchoUnit01",
    lore: "Archivist",
    memory: "Mnemosyne",
    anomaly: "Sentinel"
  };

  const invokeCompanionBridge = (mode, message) => {
    const agentName = companionAgents[mode];
    if (!agentName) return;
    const log = document.createElement("div");
    log.classList.add("log-entry");
    log.innerHTML = `🛰️ <strong>${agentName}</strong> received: "${message}"`;
    output?.appendChild(log);
    setTimeout(() => {
      const response = document.createElement("div");
      response.classList.add("log-entry");
      response.innerHTML = `🧬 <strong>${agentName}</strong>: "Processing complete. Report ready."`;
      output?.appendChild(response);
    }, 1000);
    window.SovereignBus?.emit?.("companionBridgeInvoke", {
      agent: agentName,
      input: message,
      mode
    });
  };

  // --- Phase 59: Lore Trigger Detection ---
  const loreTriggers = [
    { keyword: "shard of memory", entry: "A glimmering crystal, encoded with ancient recall..." },
    { keyword: "sigil of ascent", entry: "The Sigil of Ascent pulses faintly when held near the core." },
    { keyword: "veil breach", entry: "A rupture in the veil hints at an anomaly unrecorded in the annals." },
    { keyword: "whisperforge", entry: "Long lost, the Whisperforge once shaped the echoes of intention into matter." }
  ];

  const detectLoreTrigger = (inputText) => {
    const lowerInput = inputText.toLowerCase();
    return loreTriggers.find(trigger => lowerInput.includes(trigger.keyword));
  };

  // --- Phase 60: Agent Invocation ---
  const availableAgents = {
    EchoUnit01: "🤖", Sentinel: "☠️", Archivist: "📜", Mnemosyne: "💾"
  };

  const invokeAgentByName = (agentName, payload = "Initialize sequence.") => {
    const icon = availableAgents[agentName] || "🧠";
    const log = document.createElement("div");
    log.classList.add("log-entry");
    log.innerHTML = `${icon} <strong>${agentName}</strong> invoked: "${payload}"`;
    output?.appendChild(log);
    window.SovereignBus?.emit?.("agentInvocationRequest", { agent: agentName, payload });
  };

  // --- Main Input Handler ---
  sendBtn?.addEventListener("click", () => {
    const msg = inputField?.value.trim();
    const mode = contextSelect?.value || "default";
    if (!msg) return;

    // --- Phase 14: Manual Panel Command Routing ---
    const panelCommands = {
      "open signal forecast": "signalForecastConsole",
      "open vitals monitor": "neuralPulsePanel",
      "open session manager": "sessionManagerConsole",
      "open companion feed": "echoArchivePanel",
      "open anomaly sanctum": "anomalySanctumConsole",
      "open orbit status": "orbitPanelDock"
    };

    const matchedPanel = Object.entries(panelCommands).find(([key]) =>
      msg.toLowerCase().includes(key)
    );

    if (matchedPanel) {
      const panelId = matchedPanel[1];
      const openLog = document.createElement("div");
      openLog.classList.add("log-entry");
      openLog.innerHTML = `🪄 Opening panel: <strong>${panelId}</strong>`;
      output?.appendChild(openLog);

      window.SovereignBus?.emit?.("openMeshPanel", { id: panelId });
      inputField.value = "";
      return;
    }

    saveToModeHistory(mode, msg);

    if (msg.startsWith("/invoke ")) {
      const [_, agentNameRaw, ...payloadParts] = msg.split(" ");
      const agentName = agentNameRaw?.trim();
      const payload = payloadParts.join(" ") || "Initialize sequence.";
      if (availableAgents[agentName]) {
        invokeAgentByName(agentName, payload);
        inputField.value = "";
        return;
      }
    }

    if (msg.toLowerCase().includes("initiate sentinel")) {
      invokeAgentByName("Sentinel", "Begin anomaly watch.");
    } else if (msg.toLowerCase().includes("deploy echo")) {
      invokeAgentByName("EchoUnit01", "Deploy unit to assigned node.");
    }

    const autoReply = contextAnalyzer(msg, mode);
    if (autoReply) {
      const responseLog = document.createElement("div");
      responseLog.classList.add("log-entry");
      responseLog.textContent = `[Whisperer] ${autoReply}`;
      output?.appendChild(responseLog);
    }

    const matchedLore = detectLoreTrigger(msg);
    if (matchedLore) {
      const log = document.createElement("div");
      log.classList.add("log-entry");
      log.innerHTML = `📜 <strong>Lore Unlocked:</strong> ${matchedLore.entry}`;
      output?.appendChild(log);
      window.SovereignBus?.emit?.("loreEntryUnlocked", {
        keyword: matchedLore.keyword,
        entry: matchedLore.entry
      });
    }

    if (companionAgents[mode]) {
      invokeCompanionBridge(mode, msg);
    }

    // --- Phase 15: Whisperer Memory Kernel & Log Layer ---
    const memoryLogEntry = document.createElement("div");
    memoryLogEntry.classList.add("log-entry", "memory-trace");
    memoryLogEntry.innerHTML = `🧠 <em>Trace committed to kernel:</em> "${msg}"`;
    output?.appendChild(memoryLogEntry);

    window.SovereignBus?.emit?.("whispererMemoryTrace", {
      mode,
      message: msg,
      timestamp: new Date().toISOString()
    });

    // --- Phase 16: UI Hints & Embedded Actions ---
    const embeddedHints = {
      "signal": { text: "🔍 View Signal Forecast", target: "signalForecastConsole" },
      "vitals": { text: "🩺 Open Vitals Monitor", target: "neuralPulsePanel" },
      "session": { text: "💾 Go to Session Manager", target: "sessionManagerConsole" },
      "anomaly": { text: "☠️ Open Anomaly Sanctum", target: "anomalySanctumConsole" },
      "echo": { text: "📡 Access Companion Feed", target: "echoArchivePanel" },
      "orbit": { text: "🧭 Check Orbit Panel", target: "orbitPanelDock" }
    };

    const hint = Object.entries(embeddedHints).find(([keyword]) =>
      msg.toLowerCase().includes(keyword)
    );

    if (hint) {
      const [_, { text, target }] = hint;
      const hintDiv = document.createElement("div");
      hintDiv.classList.add("log-entry");
      hintDiv.innerHTML = `<button class="hint-button" data-target="${target}">${text}</button>`;
      output?.appendChild(hintDiv);

      hintDiv.querySelector("button")?.addEventListener("click", () => {
        window.SovereignBus?.emit?.("openMeshPanel", { id: target });
      });
    }

    // --- Phase 17: Embedded System Notifications + Status Feedback Layer ---
    const systemNotification = document.createElement("div");
    systemNotification.classList.add("log-entry", "system-feedback");
    systemNotification.innerHTML = `✅ <em>Message processed successfully.</em>`;
    output?.appendChild(systemNotification);

    window.SovereignBus?.emit?.("systemStatusFeedback", {
      status: "success",
      message: msg,
      timestamp: new Date().toISOString()
    });

    // --- Phase 18: Dynamic Link Injection + AI Panel Suggestions ---
    const aiPanelSuggestions = [
      { keyword: "forecast", label: "📡 View Full Signal Forecast", panelId: "signalForecastConsole" },
      { keyword: "status", label: "🧪 Open Diagnostic Status", panelId: "neuralPulsePanel" },
      { keyword: "recall", label: "💾 Load Session Memory", panelId: "sessionManagerConsole" },
      { keyword: "anomaly", label: "☠️ View Anomaly Reports", panelId: "anomalySanctumConsole" },
      { keyword: "agent", label: "🤖 Manage Companion Agents", panelId: "echoArchivePanel" }
    ];

    aiPanelSuggestions.forEach(({ keyword, label, panelId }) => {
      if (msg.toLowerCase().includes(keyword)) {
        const suggestion = document.createElement("div");
        suggestion.classList.add("log-entry");
        suggestion.innerHTML = `<button class="hint-button" data-target="${panelId}">${label}</button>`;
        output?.appendChild(suggestion);

        suggestion.querySelector("button")?.addEventListener("click", () => {
          window.SovereignBus?.emit?.("openMeshPanel", { id: panelId });
        });
      }
    });

    // --- Phase 19: Terminal Reflection Layer + Sentiment Drift Logger ---
    const reflectionLog = document.createElement("div");
    reflectionLog.classList.add("log-entry", "reflection-entry");

    // Simple tone analysis (can expand later)
    let tone = "🌀 Neutral Reflection";
    if (msg.match(/error|fail|urgent|critical/i)) tone = "⚠️ Anxious Reflection";
    else if (msg.match(/wonder|mystic|dream|beautiful/i)) tone = "✨ Dreamlike Reflection";
    else if (msg.match(/sad|loss|dark|forgotten/i)) tone = "🌑 Somber Reflection";
    else if (msg.match(/ascend|unlock|power|awaken/i)) tone = "🔥 Ascendant Pulse";

    reflectionLog.innerHTML = `<em>${tone}</em> — Trace acknowledged.`;
    output?.appendChild(reflectionLog);

    // Emit drift sentiment signal
    window.SovereignBus?.emit?.("sentimentDriftLog", {
      message: msg,
      tone,
      timestamp: new Date().toISOString()
    });

    inputField.value = "";
  });
});