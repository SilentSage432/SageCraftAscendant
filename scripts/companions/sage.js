// === Companion: The Silent Sage ===

// Prevent Lore Engine from opening on load
document.addEventListener("DOMContentLoaded", () => {
  const lorePanel = document.getElementById("loreEngineConsole");
  if (lorePanel) {
    lorePanel.classList.add("hidden");
  }

  // 🧪 Test lore entry injection (only if not already present)
  const existingLore = JSON.parse(localStorage.getItem("sageLoreMemory") || "{}");
  if (!existingLore["welcome_lore"]) {
    if (window.SovereignCompanions?.Sage?.addLoreEntry) {
      window.SovereignCompanions.Sage.addLoreEntry(
        "welcome_lore",
        "Welcome to the Lore Engine",
        "This engine stores knowledge fragments gathered through interaction with the system. As you progress, more lore will be revealed."
      );
    }
  }
});

window.SovereignCompanions = window.SovereignCompanions || {};

window.SovereignCompanions.Sage = (function () {
  const CodexMemory = {
    logs: JSON.parse(localStorage.getItem("codexLogs") || "[]"),

    log(message) {
      const entry = { timestamp: new Date().toISOString(), message };
      this.logs.push(entry);
      if (this.logs.length > 100) this.logs.shift(); // keep last 100
      localStorage.setItem("codexLogs", JSON.stringify(this.logs));
      if (window.SignalMesh) {
        window.SignalMesh.broadcast("memory.codex.update", { source: "Sage", entry });
      }
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
    if (window.MeshMemory) {
      MeshMemory.set("sage.lastQuestion", question);
    }

    const response = generateResponse(question);
    CodexMemory.log(`Sage replied: "${response}"`);
    if (window.MeshMemory) {
      MeshMemory.set("sage.lastResponse", response);
    }

    typeResponse(response);
    chainAutonomousBehaviors(question);
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

  function chainAutonomousBehaviors(question) {
    const lower = question.toLowerCase();
    if (lower.includes("health") || lower.includes("status")) {
      console.log("🔗 Sage triggering Engineer diagnostics chain...");

      // Step 1: Ask Engineer for health status
      window.SignalMesh.broadcast("companion.message", {
        from: "Sage",
        to: "Engineer",
        type: "inquiry",
        payload: {
          question: "Please report current mesh health status."
        }
      });

      // Step 2: Await Engineer response (handled by Engineer logic)
      // Engineer then informs Gatekeeper and Archivist if needed
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

  // SignalMesh Listener — Sage receives messages
  if (window.SignalMesh) {
    window.SignalMesh.listen("companion.message", (msg) => {
      if (msg.to === "Sage") {
        console.log(`📡 Sage received a message from ${msg.from}:`, msg);

        if (msg.type === "inquiry" && msg.payload?.question) {
          const reply = ask(msg.payload.question);
          if (msg.from) {
            window.SignalMesh.broadcast("companion.message", {
              from: "Sage",
              to: msg.from,
              type: "response",
              payload: { answer: reply }
            });
          }
        }
      }
    });
  }

  // Broadcast registration
  if (window.SignalMesh) {
    window.SignalMesh.broadcast("companion.online", { name: "Sage" });
  }

  return {
    ask,
    memory: CodexMemory,

    addLoreEntry(id, title, content) {
      this.loreMemory = this.loreMemory || JSON.parse(localStorage.getItem("sageLoreMemory") || "{}");
      this.loreMemory[id] = { title, content, timestamp: Date.now() };
      localStorage.setItem("sageLoreMemory", JSON.stringify(this.loreMemory));
      console.log(`📘 Lore added: ${title}`);
      if (window.SovereignBus) {
        window.SovereignBus.emit("loreUpdate", {
          id,
          title,
          content,
          timestamp: Date.now()
        });
      }
    },

    getLoreEntry(id) {
      this.loreMemory = this.loreMemory || JSON.parse(localStorage.getItem("sageLoreMemory") || "{}");
      if (!this.loreMemory[id]) {
        console.warn(`❌ Lore entry "${id}" not found.`);
        return null;
      }
      console.log(`📖 Retrieved lore entry: ${this.loreMemory[id].title}`);
      return this.loreMemory[id];
    },

    speakLore(id) {
      const lore = this.getLoreEntry(id);
      if (!lore) return;

      const utterance = new SpeechSynthesisUtterance(`${lore.title}. ${lore.content}`);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    },

    registerLoreAccess() {
      if (window.SovereignBus) {
        window.SovereignBus.listen("lore.query", (msg) => {
          const { type, id } = msg || {};
          if (!type || !id) return;

          if (type === "get") {
            const lore = this.getLoreEntry(id);
            window.SovereignBus.emit("lore.response", {
              id,
              found: !!lore,
              data: lore
            });
          }

          if (type === "speak") {
            this.speakLore(id);
          }
        });

        console.log("📡 Lore Engine: SovereignBus listener activated.");
      }
    }
  };

  // CompanionCognitionCore for Sage
  if (window.CompanionMind) {
    const SageMind = new CompanionMind("Sage", {
      onThink(memory) {
        const last = CodexMemory.getLast(1)[0];
        if (last && last.message.includes("Sovereign asked")) {
          console.log("🔮 Sage ponders the latest question...");
        }
        // Future: Add deeper reflection, pattern analysis, signal dispatch
      }
    });
    SageMind.startThinking();

    // React to MeshMemory updates
    if (window.MeshMemory) {
      MeshMemory.listen("sage.lastQuestion", (newQ) => {
        console.log("🧠 Sage recalls a recent question:", newQ);
      });

      MeshMemory.listen("sage.lastResponse", (newR) => {
        console.log("📜 Sage reflects on a recent response:", newR);
      });
    }
  }

  // MeshVitals registration
  if (window.MeshVitals) {
    window.MeshVitals.register("Sage", (confirm) => {
      // Sage responds to heartbeat
      confirm();
    });
  }
})();


// 🕓 Delay Lore Engine binding until SovereignBus is stable
window.addEventListener("load", () => {
  setTimeout(() => {
    if (window.SovereignCompanions?.Sage?.registerLoreAccess && typeof window.SovereignBus?.listen === "function") {
      window.SovereignCompanions.Sage.registerLoreAccess();
      console.log("✅ Delayed Lore Access registration executed.");
    } else {
      console.warn("⚠️ SovereignBus or listener not ready — Lore Access not registered.");
    }
  }, 500);
});

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