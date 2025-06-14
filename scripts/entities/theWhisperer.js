// 🧠 Whisperer Memory Core Genesis — Phase XXV-A
const WhispererMemory = {
  _log: [],

  record(entry) {
    const timestamp = new Date().toISOString();
    const memory = { entry, timestamp };
    this._log.push(memory);
    console.log(`🪬 [Whisperer Log Entry] ${entry} @ ${timestamp}`);
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

  renderEchoTable();
});