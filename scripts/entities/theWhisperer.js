// === Early whispererVitals hook to capture events before DOMContentLoaded ===

import { classifyLogEntry } from "../systems/logClassifier.js";

// === Sovereign Tier Override Infrastructure — Phase 16010.1 ===
const OPERATOR_TIERS = {
  INITIATE: 0,
  APPRENTICE: 1,
  ASCENDANT: 2,
  SOVEREIGN: 3
};

let currentOperatorTier = OPERATOR_TIERS.SOVEREIGN; // default for development
console.log("🔐 Sovereign Tier Override Infrastructure Initialized. Current Tier:", Object.keys(OPERATOR_TIERS)[currentOperatorTier]);

// SovereignAuth overlay login listener
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("sovereignAuthBtn");
  const input = document.getElementById("sovereignPass");

  if (loginBtn && input) {
    loginBtn.addEventListener("click", () => {
      const pass = input.value?.trim();
      if (window.SovereignAuth?.login) {
        window.SovereignAuth.login(pass);
      } else {
        console.warn("🚫 SovereignAuth not available.");
      }
    });
  }

  // === Sovereign Login Panel Activation Script — Phase 16011.7 ===
  const overlay = document.getElementById("sovereignLoginOverlay");
  const overlayBtn = document.getElementById("triggerLoginOverlay");

  if (overlay && overlayBtn) {
    overlayBtn.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
      }
    });
  }

  console.log("🧠 Sovereign Login Overlay UI injection completed.");
});

// Listen for SovereignAuth login success
window.addEventListener("sovereignAuthGranted", (e) => {
  const newTier = e?.detail?.tier;
  if (typeof newTier === "number") {
    currentOperatorTier = newTier;
    console.log(`✅ Operator tier elevated to: ${Object.keys(OPERATOR_TIERS)[newTier]}`);
  }
});
window.addEventListener("DOMContentLoaded", () => {
  // Ensure whispererVitals is captured even if SovereignBus fires early
  if (window.SovereignBus?.on) {
    window.SovereignBus.on("whispererVitals", (data) => {
      console.log("📡 [WhispererVitals - Early Hook] Live Data:", data);
      const liveOutput = document.getElementById("whispererConsoleOutput");
      if (liveOutput) {
        const div = document.createElement("div");
        const displayData = data
          ? typeof data === "object"
            ? JSON.stringify(data, null, 2)
            : data
          : "[null]";
        div.textContent = `[${new Date().toLocaleTimeString()}] Vitals (early): ${displayData}`;
        div.classList.add("log-entry", "vitals");
        liveOutput.appendChild(div);
      } else {
        console.warn("🚫 whispererConsoleOutput not found during early vitals.");
      }
    });
  }
});
// 🧠 Whisperer Memory Core Genesis — Phase XXV-A
console.log("👁️ theWhisperer.js module online — Echo functions standing by.");

// Access check helper for operator tiers
function hasAccess(requiredTier = OPERATOR_TIERS.INITIATE) {
  return currentOperatorTier >= requiredTier;
}

// ✅ Canonical SovereignBus listener for Whisperer Vitals (now globally available)
function renderWhispererVitals(data) {
  data.type = classifyLogEntry(data); // Classify log type based on content
  // === Signal Class Inference Injection — Phase 31.6 ===
  if (typeof data?.signalStrength === "number") {
    if (data.signalStrength >= 90) {
      data.signalClass = "prime";
    } else if (data.signalStrength >= 70) {
      data.signalClass = "stable";
    } else {
      data.signalClass = "critical";
    }
  }
  // --- Classification logic and access gate ---
  const type = data?.type || "vitals";
  const tierRequired = data?.tierRequired || OPERATOR_TIERS.INITIATE;
  const urgency = data?.urgency || "normal";

  if (!hasAccess(tierRequired)) {
    console.warn(`🔒 Tier restriction: ${Object.keys(OPERATOR_TIERS).find(key => OPERATOR_TIERS[key] === tierRequired)} required.`);
    return;
  }

  const container = document.getElementById("whispererConsoleOutput");
  if (!container) {
    console.warn("🚫 whispererConsoleOutput not found.");
    return;
  }

  const div = document.createElement("div");
  div.className = `log-entry vitals log-${type}`;
  div.style.color = "#b9fbc0";
  div.style.fontFamily = "monospace";
  div.style.padding = "6px 10px";
  div.style.borderRadius = "6px";
  div.style.marginBottom = "4px";
  div.style.boxShadow = "0 0 4px rgba(0,255,204,0.2)";
  // Add data-log-type attribute
  div.setAttribute("data-log-type", type);

  const timestamp = new Date().toLocaleTimeString();
  const module = data?.module || "Unknown";
  const status = data?.status || "No status";

  // Tier-based enhancements
  switch (currentOperatorTier) {
    case OPERATOR_TIERS.SOVEREIGN:
      div.style.borderLeft = "4px solid #ffd700";
      div.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
      div.style.textShadow = "0 0 4px #ffd700";
      div.textContent = `👑 [${timestamp}] ${module}: ${status}`;
      break;
    case OPERATOR_TIERS.ASCENDANT:
      div.style.borderLeft = "4px solid #7fffd4";
      div.textContent = `🔮 [${timestamp}] ${module}: ${status}`;
      break;
    case OPERATOR_TIERS.APPRENTICE:
      div.style.borderLeft = "4px solid #00ffcc";
      div.textContent = `✨ [${timestamp}] ${module}: ${status}`;
      break;
    default:
      div.style.borderLeft = "4px solid gray";
      div.textContent = `[${timestamp}] ${module}: ${status}`;
  }

  // === Signal Profile Visualization Enhancer — Phase 16010.2 ===
  const strength = (typeof data?.signalStrength === "number") ? data.signalStrength : null;
  if (strength !== null) {
    const strengthBadge = document.createElement("span");
    strengthBadge.textContent = ` ${strength}% `;
    strengthBadge.style.marginLeft = "0.5em";
    strengthBadge.style.padding = "0 6px";
    strengthBadge.style.borderRadius = "4px";
    strengthBadge.style.fontWeight = "bold";
    strengthBadge.style.color = "#000";

    if (strength < 60) {
      strengthBadge.style.backgroundColor = "#ff4d4f"; // red
    } else if (strength < 85) {
      strengthBadge.style.backgroundColor = "#faad14"; // yellow
    } else {
      strengthBadge.style.backgroundColor = "#52c41a"; // green
    }

    // Attach the badge just after the main text content
    div.appendChild(strengthBadge);
  }

  // Add metadata log badge
  const metaSpan = document.createElement("span");
  metaSpan.textContent = ` ⏱ ${new Date().toLocaleTimeString()} `;
  metaSpan.style.fontSize = "0.75em";
  metaSpan.style.opacity = "0.6";
  metaSpan.style.marginLeft = "1em";
  div.appendChild(metaSpan);

  // Optional: show tier visually in log for quick audit
  const tierBadge = document.createElement("span");
  tierBadge.textContent = ` [Tier: ${Object.keys(OPERATOR_TIERS).find(key => OPERATOR_TIERS[key] === currentOperatorTier)}]`;
  tierBadge.style.fontSize = "0.75em";
  tierBadge.style.marginLeft = "1em";
  tierBadge.style.opacity = "0.5";
  div.appendChild(tierBadge);
  // === Signal Class Display Injection — Phase 31.6 ===
  if (data.signalClass) {
    const classSpan = document.createElement("span");
    classSpan.textContent = ` Signal: ${data.signalClass.toUpperCase()}`;
    classSpan.style.fontSize = "0.75em";
    classSpan.style.marginLeft = "1em";
    classSpan.style.opacity = "0.5";
    div.appendChild(classSpan);
  }

  // --- Urgency-based visual cue handling ---
  if (urgency === "high") {
    div.style.border = "2px solid #ff4d4f";
    div.classList.add("urgent");
  } else if (urgency === "low") {
    div.style.opacity = "0.6";
  }

  // div.textContent = `[${timestamp}] ${module}: ${status}`; // original line removed/commented out
  const maxLogs = 250;
  if (container.children.length > maxLogs) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
window.renderWhispererVitals = renderWhispererVitals;
// Register SovereignBus listener immediately after defining renderWhispererVitals
if (window.SovereignBus?.on) {
  window.SovereignBus.on("whispererVitals", window.renderWhispererVitals);
}
const WhispererMemory = {
  _log: [],

  record(entry) {
    // Optional filtering logic placeholder:
    if (entry?.tierRequired && currentOperatorTier < entry.tierRequired) return;
    // Timestamp normalization
    const now = new Date();
    const timestamp = entry?.timestamp
      ? new Date(entry.timestamp).toLocaleTimeString()
      : now.toLocaleTimeString();
    const isoTimestamp = now.toISOString();
    const memory = {
      entry,
      timestamp: isoTimestamp,
      displayTime: timestamp,
      type: entry?.type || "echo",
      tierRequired: entry?.tierRequired || 0
    };
    this._log.push(memory);
    if (this._log.length > 250) this._log.shift();
    console.log(`🪬 [Whisperer Log Entry] ${entry} @ ${isoTimestamp}`);
    const echoEvent = new CustomEvent("whispererEcho", { detail: memory });
    document.dispatchEvent(echoEvent);
    this.save();
  },

  save() {
    try {
      localStorage.setItem("whispererMemoryLog", JSON.stringify(this._log));
      console.log("💾 Whisperer memory saved.");
    } catch (e) {
      console.warn("⚠️ Whisperer failed to save memory:", e);
    }
  },

  load() {
    const stored = localStorage.getItem("whispererMemoryLog");
    if (stored) {
      this._log = JSON.parse(stored);
      console.log(`📥 Whisperer memory loaded with ${this._log.length} entries.`);
    }
  },

  getAll() {
    return this._log;
  }
};

WhispererMemory.load(); // Initialize memory on load


// 🌫️ theWhisperer.js — Phase XXIV: Whisperer Genesis Protocol

document.addEventListener("DOMContentLoaded", () => {
  let uptimeSeconds = 0;
  let anomalies = 0;
  let orbitCount = 0;

  const updateVitals = () => {
    if (signalStrength) signalStrength.textContent = `${Math.floor(Math.random() * 10) + 90}%`;
    if (anomalyCount) anomalyCount.textContent = anomalies;
    if (orbitThroughput) orbitThroughput.textContent = orbitCount;
    if (meshUptime) {
      meshUptime.textContent = `${Math.floor(uptimeSeconds / 60)}m ${uptimeSeconds % 60}s`;
    }
    if (threadCount) threadCount.textContent = `${Math.floor(Math.random() * 12) + 4} threads`;
    if (networkSync) networkSync.textContent = `${(Math.random() * 100).toFixed(2)}%`;
    if (meshIntegrity) meshIntegrity.textContent = `${(Math.random() * 5 + 95).toFixed(1)}%`;
    if (kernelDrift) kernelDrift.textContent = `${(Math.random() * 2).toFixed(3)} Δ`;
    if (sovereignStatus) sovereignStatus.textContent = "🧠 Connected to Sovereign Bridge";
  };

  // === Neural Pulse Monitor ===
  const pulseStatus = document.getElementById("pulseStatus");
  const pulseVisual = document.querySelector(".pulse-visual");

  let pulseState = true;

  setInterval(() => {
    if (!pulseStatus || !pulseVisual) return;

    pulseVisual.style.backgroundColor = pulseState ? "#42f57b" : "#0f0f0f";
    pulseVisual.style.boxShadow = pulseState ? "0 0 12px #42f57b" : "none";
    pulseStatus.textContent = pulseState ? "💓 Pulse Detected" : "🔍 Awaiting Next Pulse";
    pulseState = !pulseState;
  }, 1000);
  const summonBtn = document.getElementById("whispererSummonBtn");
  if (!summonBtn) console.warn("🔕 summonBtn not found");
  const output = document.getElementById("whispererOutput");
  if (!output) console.warn("🔕 whispererOutput not found");

  const logList = document.getElementById("echoLogEntries");
  if (!logList) console.warn("🔕 echoLogEntries not found");
  const recoveredEntries = WhispererMemory.getAll();

  if (logList && recoveredEntries.length > 0) {
    logList.innerHTML = ""; // Clear old logs
    recoveredEntries.slice(-100).reverse().forEach(({ entry, displayTime, type, tierRequired }) => {
      if (!entry && !entry?.status) return;

      const li = document.createElement("li");
      li.classList.add("whisperer-log-entry");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.justifyContent = "space-between";
      li.style.fontFamily = "monospace";
      li.style.padding = "4px 0";
      li.style.borderBottom = "1px solid #333";

      const leftGroup = document.createElement("div");
      leftGroup.style.display = "flex";
      leftGroup.style.alignItems = "center";

      const time = document.createElement("span");
      time.textContent = `[${displayTime || "Echo"}]`;
      time.style.color = "#aaa";
      time.style.marginRight = "0.75em";
      time.style.fontSize = "0.85em";

      const icon = document.createElement("span");
      icon.textContent =
        entry?.type === "warning" ? "⚠️" :
        entry?.type === "vitals" ? "🩺" :
        entry?.type === "diagnostic" ? "🧪" :
        "🌀";
      icon.style.marginRight = "0.5em";

      const msg = document.createElement("span");
      msg.textContent = typeof entry === "string" ? entry : entry.status || JSON.stringify(entry);
      msg.style.color = (entry?.type === "warning") ? "#ffcc00" : "#cccccc";

      leftGroup.appendChild(time);
      leftGroup.appendChild(icon);
      leftGroup.appendChild(msg);

      const rightGroup = document.createElement("div");
      rightGroup.style.marginLeft = "auto";
      rightGroup.style.fontSize = "0.75em";
      rightGroup.style.opacity = "0.5";

      if (tierRequired !== undefined) {
        const tier = document.createElement("span");
        tier.textContent = ` [Tier: ${Object.keys(OPERATOR_TIERS).find(k => OPERATOR_TIERS[k] === tierRequired)}]`;
        rightGroup.appendChild(tier);
      }

      li.appendChild(leftGroup);
      li.appendChild(rightGroup);
      logList.appendChild(li);
    });
    console.log(`🔁 Restored ${Math.min(100, recoveredEntries.length)} entries to Echo Archive`);
  }

  // Additional elements for panel updates
  const whispererPanel = document.getElementById("whisperer");
  if (!whispererPanel) console.warn("🔕 whisperer panel not found");
  if (whispererPanel) whispererPanel.style.display = "block";

  // Ensure whispererConsoleOutput is present
  let whispererConsoleOutput = document.getElementById("whispererConsoleOutput");
  if (!whispererConsoleOutput && whispererPanel) {
    whispererConsoleOutput = document.createElement("div");
    whispererConsoleOutput.id = "whispererConsoleOutput";
    whispererConsoleOutput.style.padding = "1rem";
    whispererConsoleOutput.style.fontFamily = "monospace";
    whispererConsoleOutput.style.color = "#b9fbc0";
    whispererConsoleOutput.style.backgroundColor = "rgba(10, 10, 10, 0.85)";
    whispererConsoleOutput.style.overflowY = "auto";
    whispererConsoleOutput.style.maxHeight = "200px";
    whispererConsoleOutput.style.scrollBehavior = "smooth";
    whispererConsoleOutput.style.border = "1px solid #333";
    whispererConsoleOutput.style.borderRadius = "6px";
    whispererConsoleOutput.style.boxShadow = "inset 0 0 6px rgba(0,255,204,0.2)";
    whispererPanel.appendChild(whispererConsoleOutput);
    console.log("✅ whispererConsoleOutput dynamically injected into DOM.");
  }

  const signalStrength = document.getElementById("signalStrength");
  const anomalyCount = document.getElementById("anomalyCount");
  const orbitThroughput = document.getElementById("orbitThroughput");
  const meshUptime = document.getElementById("meshUptime");
  const threadCount = document.getElementById("threadCount");
  const networkSync = document.getElementById("networkSync");
  const meshIntegrity = document.getElementById("meshIntegrity");
  const kernelDrift = document.getElementById("kernelDrift");
  const sovereignStatus = document.getElementById("sovereignStatus");
  const sovereignLog = document.getElementById("sovereignLog");
  if (!sovereignLog) {
    console.log("🔕 sovereignLog not found. Injecting placeholder.");
    const log = document.createElement("ul");
    log.id = "sovereignLog";
    log.classList.add("log-console", "sovereign");
    document.body.appendChild(log);
    log.style.maxHeight = "200px";
    log.style.overflowY = "auto";
    log.style.padding = "0.5rem";
    log.style.margin = "1rem";
    log.style.border = "1px solid #444";
    log.style.backgroundColor = "rgba(0,0,0,0.5)";
    log.style.fontFamily = "monospace";
    log.style.fontSize = "0.85rem";
  }
  const sentinelLog = document.getElementById("sentinelLog");
  if (!sentinelLog) {
    console.warn("🔕 sentinelLog not found. Injecting placeholder.");
    const log = document.createElement("ul");
    log.id = "sentinelLog";
    log.classList.add("log-console", "sentinel");
    document.body.appendChild(log);
  }
  log.style.maxHeight = "200px";
  log.style.overflowY = "auto";
  log.style.padding = "0.5rem";
  log.style.margin = "1rem";
  log.style.border = "1px solid #444";
  log.style.backgroundColor = "rgba(0,0,0,0.5)";
  log.style.fontFamily = "monospace";
  log.style.fontSize = "0.85rem";

  updateVitals();

  const whispers = [
    "The wind carries truths unspoken.",
    "Even shadows have memories.",
    "Echoes remember what minds forget.",
    "The truth hides in silence.",
    "What is forgotten is not gone.",
    "There are stories etched in dust."
  ];

  summonBtn.addEventListener("click", () => {
    const randomWhisper = whispers[Math.floor(Math.random() * whispers.length)];
    if (output) output.textContent = randomWhisper;

    const logList = document.getElementById("echoLogEntries");
    if (logList) {
      const li = document.createElement("li");
      li.textContent = `${randomWhisper}`;
      li.classList.add("whisperer-log-entry");
      logList.prepend(li);
    }

    WhispererMemory.record(randomWhisper);
  });

  // === Sovereign Event Bus Listener ===
  if (window.SovereignBus) {
    window.SovereignBus.listen("*", (channel, payload) => {
      const echo = `🔊 [${channel}] ${typeof payload === "object" ? JSON.stringify(payload) : payload}`;
      WhispererMemory.record(echo);
      if (sovereignLog) {
        const li = document.createElement("li");
        li.textContent = `[${new Date().toLocaleTimeString()}] ${echo}`;
        if (sovereignLog.children.length > 250) {
          sovereignLog.removeChild(sovereignLog.lastChild);
        }
        sovereignLog.prepend(li);
      }
    });
    // Diagnostic block: check for whispererConsoleOutput presence
    setTimeout(() => {
      const liveOutput = document.getElementById("whispererConsoleOutput");
      if (!liveOutput) {
        console.warn("🚫 whispererConsoleOutput NOT FOUND in DOM.");
      } else {
        console.log("✅ whispererConsoleOutput FOUND and ready.");
      }
    }, 1000);
    // (Removed redundant SovereignBus.listen("whispererVitals", ...) block)
  }

  // Echo listening hook for sovereign echo bridge
  document.addEventListener("whispererEcho", (e) => {
    console.log("📡 Whisperer Echo Dispatched:", e.detail);
  });

  // === Orbit Activity Feed Listener ===

  setInterval(() => {
    uptimeSeconds++;
    updateVitals();
  }, 1500);

  const orbitLogList = document.getElementById("orbitLogs");

  document.addEventListener("orbitActivated", (e) => {
    const { id, timestamp } = e.detail;
    const li = document.createElement("li");
    const time = new Date(timestamp).toLocaleTimeString();
    li.textContent = `[${time}] Orbit Activated → ${id}`;
    if (orbitLogList) {
      orbitLogList.prepend(li);
    }

    // Optional: echo to memory
    WhispererMemory.record(`Orbit Activated: ${id} @ ${time}`);
  });

  document.addEventListener("orbitActivated", () => {
    orbitCount++;
  });

  // Show Whisperer panel when its orbit activates
  document.querySelectorAll('[data-target="whisperer"]').forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".holo-console.panel").forEach(p => p.style.display = "none");
      const panel = document.getElementById("whisperer");
      if (panel) panel.style.display = "block";
    });
  });

  // === Vital Scan Simulation Layer ===

  /*
  // Removed to avoid duplication:
  setInterval(() => {
    if (signalStrength) signalStrength.textContent = `${Math.floor(Math.random() * 10) + 90}%`;
    if (anomalyCount) anomalyCount.textContent = anomalies;
    if (orbitThroughput) orbitThroughput.textContent = orbitCount;
    if (meshUptime) {
      uptimeSeconds++;
      meshUptime.textContent = `${Math.floor(uptimeSeconds / 60)}m ${uptimeSeconds % 60}s`;
    }
    if (threadCount) threadCount.textContent = `${Math.floor(Math.random() * 12) + 4} threads`;
    if (networkSync) networkSync.textContent = `${(Math.random() * 100).toFixed(2)}%`;
    if (meshIntegrity) meshIntegrity.textContent = `${(Math.random() * 5 + 95).toFixed(1)}%`;
    if (kernelDrift) kernelDrift.textContent = `${(Math.random() * 2).toFixed(3)} Δ`;
    if (sovereignStatus) sovereignStatus.textContent = "🧠 Connected to Sovereign Bridge";
  }, 1500);
  */

  // === Sentinel Cortex Monitor ===

  function checkMeshHealth() {
    const integrityValue = parseFloat(meshIntegrity?.textContent) || 0;
    const driftValue = parseFloat(kernelDrift?.textContent) || 0;

    if (integrityValue < 96) {
      const warning = `⚠️ Mesh Integrity dropped to ${integrityValue.toFixed(1)}%`;
      if (sentinelLog) {
        const li = document.createElement("li");
        li.textContent = `[${new Date().toLocaleTimeString()}] ${warning}`;
        li.classList.add("sentinel-warning");
        sentinelLog.prepend(li);
      }
      const warningObject = {
        module: "Sentinel",
        status: warning,
        type: "warning",
        urgency: "high",
        signalStrength: integrityValue,
        tierRequired: OPERATOR_TIERS.APPRENTICE,
        timestamp: new Date().toISOString()
      };
      WhispererMemory.record(warningObject);
    }

    if (driftValue > 1.2) {
      const warning = `⚠️ Kernel Drift spiked to ${driftValue.toFixed(3)} Δ`;
      if (sentinelLog) {
        const li = document.createElement("li");
        li.textContent = `[${new Date().toLocaleTimeString()}] ${warning}`;
        li.classList.add("sentinel-warning");
        sentinelLog.prepend(li);
      }
      const warningObject = {
        module: "Sentinel",
        status: warning,
        type: "warning",
        urgency: "high",
        signalStrength: driftValue,
        tierRequired: OPERATOR_TIERS.APPRENTICE,
        timestamp: new Date().toISOString()
      };
      WhispererMemory.record(warningObject);
    }
  }

  setInterval(checkMeshHealth, 3000);

  setInterval(() => {
    if (threadCount) threadCount.textContent = `${Math.floor(Math.random() * 12) + 4} threads`;
    if (networkSync) networkSync.textContent = `${(Math.random() * 100).toFixed(2)}%`;
    if (meshIntegrity) meshIntegrity.textContent = `${(Math.random() * 5 + 95).toFixed(1)}%`;
    if (kernelDrift) kernelDrift.textContent = `${(Math.random() * 2).toFixed(3)} Δ`;
  }, 1750);

  document.addEventListener("sovereignPulse", (e) => {
    console.log("🛰️ sovereignPulse event received:", e.detail);
    const { channel, detail, timestamp = Date.now() } = e.detail || {};

    const formatted = `[${new Date(timestamp).toLocaleTimeString()}] ${channel.toUpperCase()}: ${detail}`;
    if (sovereignLog && channel && detail) {
      const li = document.createElement("li");
      li.textContent = formatted;
      sovereignLog.prepend(li);
    }

    // Additional UI target: whispererConsoleOutput (if present)
    const liveOutput = document.getElementById("whispererConsoleOutput");
    if (liveOutput && channel && detail) {
      if (liveOutput.children.length > 250) {
        liveOutput.removeChild(liveOutput.firstChild);
      }
      const div = document.createElement("div");
      div.textContent = formatted;
      liveOutput.appendChild(div);
      liveOutput.scrollTop = liveOutput.scrollHeight;
    }

    // Log to memory
    if (channel && detail) {
      WhispererMemory.record(`Sovereign Pulse → ${channel}: ${detail}`);
    }
  });

  // === Diagnostic Signal Feed ===
  window.SovereignBus?.on?.("diagnosticSignalTest", (data) => {
    console.log("🔍 [diagnosticSignalTest] Signal received:", data);
    const liveOutput = document.getElementById("whispererConsoleOutput");
    if (liveOutput) {
      if (liveOutput.children.length > 250) {
        liveOutput.removeChild(liveOutput.firstChild);
      }
      const div = document.createElement("div");
      div.textContent = `[${new Date().toLocaleTimeString()}] [DIAGNOSTIC] ${JSON.stringify(data)}`;
      div.classList.add("log-entry", "diagnostic");
      liveOutput.appendChild(div);
      liveOutput.scrollTop = liveOutput.scrollHeight;
    }
    WhispererMemory.record(`Diagnostic Signal → ${JSON.stringify(data)}`);
  });

  // === Failsafe Injection for whispererConsoleOutput ===
  // (Removed duplicate fallback block)

// === Failsafe SovereignBus whispererVitals Listener ===
// (Removed: canonical listener will be registered at the end)
});
// 🧪 Manual Diagnostic Emitter for Whisperer — Global Scope Fix
window.triggerWhispererDiagnostic = function () {
  if (!window.SovereignBus || !window.SovereignBus.emit) {
    console.warn("🚫 SovereignBus not available.");
    return;
  }

  const diagnosticPayload = {
    module: "Diagnostic",
    status: "✅ Triggered from triggerWhispererDiagnostic (global scope)",
    timestamp: new Date().toISOString()
  };

  console.log("🧪 Emitting Diagnostic Signal:", diagnosticPayload);
  window.SovereignBus.emit("whispererVitals", diagnosticPayload);
};
// (Removed redundant whispererVitals output handler)
// (Removed redundant whispererVitals output handler)


// document.addEventListener("DOMContentLoaded", () => {
//   window.SovereignBus?.on?.("whispererVitals", renderWhispererVitals);
// });