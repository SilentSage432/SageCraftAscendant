// 🧠 Whisperer Memory Core Genesis — Phase XXV-A
console.log("👁️ theWhisperer.js module online — Echo functions standing by.");
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

function renderEchoTable() {
  const echoTable = document.getElementById("echoTableBody");
  if (!echoTable) {
    console.warn("📭 Echo Table body not found.");
    return;
  }

  const echoes = WhispererMemory.getAll().slice().reverse();

  for (const { entry, timestamp } of echoes) {
    const tr = document.createElement("tr");

    const timeCell = document.createElement("td");
    timeCell.textContent = new Date(timestamp).toLocaleString();

    const originCell = document.createElement("td");
    originCell.textContent = "The Whisperer";

    const msgCell = document.createElement("td");
    msgCell.textContent = entry;

    tr.appendChild(timeCell);
    tr.appendChild(originCell);
    tr.appendChild(msgCell);
    echoTable.appendChild(tr);
  }

  console.log(`📡 Rendered ${echoes.length} echoes into the Echo Table.`);
}

// 🌫️ theWhisperer.js — Phase XXIV: Whisperer Genesis Protocol

document.addEventListener("DOMContentLoaded", () => {
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

  const logList = document.getElementById("whispererLogEntries");
  const recoveredEntries = WhispererMemory.getAll();

  if (logList && recoveredEntries.length > 0) {
    recoveredEntries.slice().reverse().forEach(({ entry }) => {
      const li = document.createElement("li");
      li.textContent = entry;
      li.classList.add("whisperer-log-entry");
      logList.appendChild(li);
    });
    console.log(`🔁 Restored ${recoveredEntries.length} entries to Whisperer Log`);
  }

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
    output.textContent = randomWhisper;

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
      const echo = `🔊 [${channel}] ${payload}`;
      WhispererMemory.record(echo);
      const sovereignLog = document.getElementById("sovereignLog");
      if (sovereignLog) {
        const li = document.createElement("li");
        li.textContent = `[${new Date().toLocaleTimeString()}] ${echo}`;
        sovereignLog.prepend(li);
      }
    });
  }
  renderEchoTable();

  // Echo listening hook for sovereign echo bridge
  document.addEventListener("whispererEcho", (e) => {
    console.log("📡 Whisperer Echo Dispatched:", e.detail);
  });

  // === Orbit Activity Feed Listener ===
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

  // === Vital Scan Simulation Layer ===
  const signalStrength = document.getElementById("signalStrength");
  const anomalyCount = document.getElementById("anomalyCount");
  const orbitThroughput = document.getElementById("orbitThroughput");
  const meshUptime = document.getElementById("meshUptime");

  let uptimeSeconds = 0;
  let anomalies = 0;
  let orbitCount = 0;

  document.addEventListener("orbitActivated", () => {
    orbitCount++;
  });

  setInterval(() => {
    if (signalStrength) signalStrength.textContent = `${Math.floor(Math.random() * 10) + 90}%`;
    if (anomalyCount) anomalyCount.textContent = anomalies;
    if (orbitThroughput) orbitThroughput.textContent = orbitCount;
    if (meshUptime) {
      uptimeSeconds++;
      meshUptime.textContent = `${Math.floor(uptimeSeconds / 60)}m ${uptimeSeconds % 60}s`;
    }
  }, 1500);

  // === Sovereign Operator Bridge Injection ===
  const sovereignStatus = document.getElementById("sovereignStatus");
  const sovereignLog = document.getElementById("sovereignLog");

  if (sovereignStatus) sovereignStatus.textContent = "🧠 Connected to Sovereign Bridge";

  // === Sovereign Vitals Update Layer ===
  const threadCount = document.getElementById("threadCount");
  const networkSync = document.getElementById("networkSync");
  const meshIntegrity = document.getElementById("meshIntegrity");
  const kernelDrift = document.getElementById("kernelDrift");

  // === Sentinel Cortex Monitor ===
  const sentinelLog = document.getElementById("sentinelLog");

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
    const { channel, detail } = e.detail || {};
    if (sovereignLog && channel && detail) {
      const li = document.createElement("li");
      li.textContent = `[${new Date().toLocaleTimeString()}] ${channel.toUpperCase()}: ${detail}`;
      sovereignLog.prepend(li);
    }

    // Log pulse activity in whisperer memory
    if (channel && detail) {
      WhispererMemory.record(`Sovereign Pulse → ${channel}: ${detail}`);
    }
  });
});