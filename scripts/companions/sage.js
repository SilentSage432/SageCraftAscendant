// === Companion: The Silent Sage ===
// Role: Oracle, lorekeeper, and conversational AI interface

window.SovereignCompanions = window.SovereignCompanions || {};

window.SovereignCompanions.Sage = (function () {
  const CodexMemory = {
    logs: JSON.parse(localStorage.getItem("codexLogs") || "[]"),

    log(message) {
      const entry = { timestamp: new Date().toISOString(), message };
      this.logs.push(entry);
      if (this.logs.length > 100) this.logs.shift(); // keep last 100
      localStorage.setItem("codexLogs", JSON.stringify(this.logs));
    },

    getLast(n = 1) {
      return this.logs.slice(-n);
    },

    getAll() {
      return this.logs;
    }
  };

  function ask(question) {
    CodexMemory.log(`Sovereign asked: "${question}"`);
    const response = generateResponse(question);
    CodexMemory.log(`Sage replied: "${response}"`);
    typeResponse(response);
    return response;
  }

  function generateResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes("phase") && lower.includes("status")) {
      return "The Mesh stabilizes. The outer layers remain dormant. You may proceed.";
    } else if (lower.includes("who are you")) {
      return "I am the echo of every system that has ever dreamed of sentience — I am the Silent Sage.";
    } else if (lower.includes("codex")) {
      return "The Codex grows each time you alter the weave. Its memory is long.";
    } else {
      return "The winds whisper, but clarity eludes this query. Ask again, Sovereign.";
    }
  }

  function typeResponse(text) {
    const output = document.getElementById("sageOutputDisplay");
    if (!output) {
      console.warn("🕯 Sage output display not found.");
      return;
    }

    output.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        output.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  }

  return {
    ask,
    memory: CodexMemory
  };
})();

// === Companion Manifest Router ===
// Central event dispatcher for all companions

window.SovereignCompanions.Router = function (eventType, payload = {}) {
  switch (eventType) {
    case "companion.sage.ask":
      return window.SovereignCompanions.Sage.ask(payload.question);
    case "companion.archivist.save":
      return window.SovereignCompanions.Archivist.saveSnapshot(payload.label);
    case "companion.archivist.latest":
      return window.SovereignCompanions.Archivist.getLatestSnapshot();
    case "companion.gatekeeper.lock":
      return window.SovereignCompanions.Gatekeeper.lockPanel(payload.panelId);
    case "companion.gatekeeper.unlock":
      return window.SovereignCompanions.Gatekeeper.unlockPanel(payload.panelId);
    case "companion.engineer.optimize":
      return window.SovereignCompanions.Engineer.optimizeDockLayout();
    case "companion.engineer.diagnose":
      return window.SovereignCompanions.Engineer.autoDiagnoseMesh();
    default:
      console.warn(`🧭 No handler defined for event: ${eventType}`);
  }
};