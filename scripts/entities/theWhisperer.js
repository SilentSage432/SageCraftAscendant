// === Early whispererVitals hook to capture events before DOMContentLoaded ===
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

// ✅ Canonical SovereignBus listener for Whisperer Vitals (now globally available)
function renderWhispererVitals(data) {
  const container = document.getElementById("whispererConsoleOutput");
  if (!container) {
    console.warn("🚫 whispererConsoleOutput not found.");
    return;
  }

  const div = document.createElement("div");
  div.className = "log-entry vitals";
  div.style.color = "#00ffcc";
  div.style.fontFamily = "monospace";
  div.style.padding = "4px";

  const timestamp = new Date().toLocaleTimeString();
  const module = data?.module || "Unknown";
  const status = data?.status || "No status";

  div.textContent = `[${timestamp}] ${module}: ${status}`;
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
    const timestamp = new Date().toISOString();
    const memory = { entry, timestamp };
    this._log.push(memory);
    console.log(`🪬 [Whisperer Log Entry] ${entry} @ ${timestamp}`);
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
  const output = document.getElementById("whispererOutput");

  if (!summonBtn || !output) {
    console.warn("🔕 Whisperer DOM elements not found.");
    return;
  }

  const logList = document.getElementById("echoLogEntries"); // corrected ID
  const recoveredEntries = WhispererMemory.getAll();

  if (logList && recoveredEntries.length > 0) {
    recoveredEntries.slice().reverse().forEach(({ entry }) => {
      const li = document.createElement("li");
      li.textContent = entry;
      li.classList.add("whisperer-log-entry");
      logList.appendChild(li);
    });
    console.log(`🔁 Restored ${recoveredEntries.length} entries to Echo Archive`);
  }

  // Additional elements for panel updates
  const whispererPanel = document.getElementById("whisperer");
  if (whispererPanel) whispererPanel.style.display = "block";

  // Ensure whispererConsoleOutput is present
  let whispererConsoleOutput = document.getElementById("whispererConsoleOutput");
  if (!whispererConsoleOutput && whispererPanel) {
    whispererConsoleOutput = document.createElement("div");
    whispererConsoleOutput.id = "whispererConsoleOutput";
    whispererConsoleOutput.style.padding = "1rem";
    whispererConsoleOutput.style.fontFamily = "monospace";
    whispererConsoleOutput.style.color = "#00ffcc";
    whispererConsoleOutput.style.backgroundColor = "rgba(0,0,0,0.75)";
    whispererConsoleOutput.style.overflowY = "auto";
    whispererConsoleOutput.style.maxHeight = "200px";
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
  const sentinelLog = document.getElementById("sentinelLog");

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
    window.SovereignBus.listen("whispererVitals", (data) => {
      console.log("📡 [whispererVitals - SovereignBus.listen()] Received:", data);
      const liveOutput = document.getElementById("whispererConsoleOutput");
      if (liveOutput) {
        const pre = document.createElement("pre");
        pre.textContent = `[${new Date().toLocaleTimeString()}] Vitals:\n${JSON.stringify(data, null, 2)}`;
        pre.classList.add("log-entry", "vitals");
        liveOutput.appendChild(pre);
        liveOutput.scrollTop = liveOutput.scrollHeight;
      } else {
        console.warn("🚫 whispererConsoleOutput not found.");
      }
    });
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
      WhispererMemory.record(warning);
    }

    if (driftValue > 1.2) {
      const warning = `⚠️ Kernel Drift spiked to ${driftValue.toFixed(3)} Δ`;
      if (sentinelLog) {
        const li = document.createElement("li");
        li.textContent = `[${new Date().toLocaleTimeString()}] ${warning}`;
        li.classList.add("sentinel-warning");
        sentinelLog.prepend(li);
      }
      WhispererMemory.record(warning);
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
      const div = document.createElement("div");
      div.textContent = `[${new Date().toLocaleTimeString()}] [DIAGNOSTIC] ${JSON.stringify(data)}`;
      div.classList.add("log-entry", "diagnostic");
      liveOutput.appendChild(div);
      liveOutput.scrollTop = liveOutput.scrollHeight;
    }
    WhispererMemory.record(`Diagnostic Signal → ${JSON.stringify(data)}`);
  });

  // === Failsafe Injection for whispererConsoleOutput ===
  setTimeout(() => {
    const liveOutput = document.getElementById("whispererConsoleOutput");
    if (!liveOutput) {
      console.warn("🚫 whispererConsoleOutput still not found — forcing injection.");
      const whispererPanel = document.getElementById("whisperer");
      if (whispererPanel) {
        const fallback = document.createElement("div");
        fallback.id = "whispererConsoleOutput";
        fallback.style.padding = "1rem";
        fallback.style.fontFamily = "monospace";
        fallback.style.color = "#00ffcc";
        fallback.style.backgroundColor = "rgba(0,0,0,0.75)";
        fallback.style.overflowY = "auto";
        fallback.style.maxHeight = "200px";
        whispererPanel.appendChild(fallback);
        console.log("✅ whispererConsoleOutput Fallback Injected.");
      }
    } else {
      console.log("✅ whispererConsoleOutput already present.");
    }
  }, 2000);

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