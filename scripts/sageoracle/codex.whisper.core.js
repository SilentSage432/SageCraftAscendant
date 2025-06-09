// Phase 8.0 — Codex Whisper Initialization Protocol

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.CodexWhisper = (function () {

  let conversationHistory = [];

  const STORAGE_KEY = "SCAN::CodexWhisper::MemoryChain";

  function saveMemoryChain() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
  }

  function loadMemoryChain() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      conversationHistory = JSON.parse(stored);
    }
  }

  function initializeWhisper() {
    loadMemoryChain();
    console.log("🧠 Codex Whisper Subsystem Initialized.");
    logSystemMessage("Codex Whisper Online. Standing by...");
  }

  function logSystemMessage(message) {
    const entry = { sender: "system", message: message, timestamp: new Date().toISOString() };
    conversationHistory.push(entry);
    renderConsole();
    saveMemoryChain();
  }

  function userMessage(input) {
    const entry = { sender: "user", message: input, timestamp: new Date().toISOString() };
    conversationHistory.push(entry);
    processInput(input);
  }

  function processInput(input) {
    let reply = expandThought(input);
    const response = { sender: "codex", message: reply, timestamp: new Date().toISOString() };
    conversationHistory.push(response);
    dispatchOracleResponse(reply);
    renderConsole();
    saveMemoryChain();
  }

  function dispatchOracleResponse(output) {
    const dialogueWindow = document.getElementById("oracleDialogueWindow");
    if (!dialogueWindow) {
      console.warn("🧭 Oracle Dialogue Window not found.");
      return;
    }
    const p = document.createElement("p");
    p.textContent = `🧙 Oracle: ${output}`;
    dialogueWindow.appendChild(p);
  }

  function expandThought(input) {
    // Thought Expansion Logic (early version)
    if (input.toLowerCase().includes("system")) {
      return "The SageCraft Ascendant neural mesh maintains full modular cohesion.";
    }
    if (input.toLowerCase().includes("health")) {
      return "All core integrity modules report optimal operational status.";
    }
    if (input.toLowerCase().includes("modules")) {
      return "Current modules active: Forecast Cortex, Recovery Engine, Governance Core, Anomaly Matrix.";
    }
    return "Directive acknowledged. Processing queue updated.";
  }

  function renderConsole() {
    const container = document.getElementById("codexConsoleOutput");
    if (!container) return;

    container.innerHTML = "";
    conversationHistory.forEach(entry => {
      const div = document.createElement("div");
      div.className = entry.sender === "user" ? "user-entry" : "system-entry";
      div.textContent = `[${entry.sender}] ${entry.message}`;
      container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
  }

  function auditMemoryChain() {
    const total = conversationHistory.length;
    const userCount = conversationHistory.filter(e => e.sender === "user").length;
    const systemCount = conversationHistory.filter(e => e.sender === "system").length;
    const codexCount = conversationHistory.filter(e => e.sender === "codex").length;

    console.group("🧠 SCAN Codex Whisper Memory Audit");
    console.log(`Total Entries: ${total}`);
    console.log(`User Messages: ${userCount}`);
    console.log(`System Messages: ${systemCount}`);
    console.log(`Codex Responses: ${codexCount}`);
    console.groupEnd();

    alert(`Memory Audit Complete:\nTotal: ${total}\nUser: ${userCount}\nSystem: ${systemCount}\nCodex: ${codexCount}`);
  }

  function purgeAllMemory() {
    conversationHistory.length = 0;
    localStorage.removeItem(STORAGE_KEY);
    console.log("⚠️ Full Codex Whisper memory purged.");
    alert("✅ Full Codex Whisper memory purged.");
    renderConsole();
  }

  function purgeSystemOnly() {
    const filtered = conversationHistory.filter(entry => entry.sender === "user");
    conversationHistory.length = 0;
    conversationHistory.push(...filtered);
    saveMemoryChain();
    console.log("⚠️ System & Codex responses purged; user memory retained.");
    alert("✅ System messages purged; user input retained.");
    renderConsole();
  }

  // === Phase 8.6 — Knowledge Chain Analyzer ===
  function analyzeKnowledgeChain() {
    if (conversationHistory.length === 0) {
      console.warn("⚠️ No Codex memory chain present to analyze.");
      alert("Codex Whisper memory chain is empty.");
      return;
    }

    let total = conversationHistory.length;
    let uniqueMessages = new Set(conversationHistory.map(e => e.message.trim().toLowerCase())).size;
    let duplicateCount = total - uniqueMessages;
    let userMessages = conversationHistory.filter(e => e.sender === "user").length;
    let codexReplies = conversationHistory.filter(e => e.sender === "codex").length;
    let systemEvents = conversationHistory.filter(e => e.sender === "system").length;

    let diversityIndex = ((uniqueMessages / total) * 100).toFixed(1);

    console.group("🔎 Knowledge Chain Analysis");
    console.log(`Total Entries: ${total}`);
    console.log(`Unique Messages: ${uniqueMessages}`);
    console.log(`Duplicates: ${duplicateCount}`);
    console.log(`User Inputs: ${userMessages}`);
    console.log(`Codex Replies: ${codexReplies}`);
    console.log(`System Messages: ${systemEvents}`);
    console.log(`Diversity Index: ${diversityIndex}%`);
    console.groupEnd();

    alert(`📊 Knowledge Chain Audit:\n\nTotal: ${total}\nUnique: ${uniqueMessages}\nDuplicates: ${duplicateCount}\nDiversity: ${diversityIndex}%`);
  }

  // === Phase 8.7 — Codex Chain Visualization Engine ===

  window.SageCraftAscendant.CodexWhisperChainVisualizer = (function () {

    function visualizeKnowledgeChain() {
      const cortex = conversationHistory;
      if (!cortex || cortex.length === 0) {
        alert("⚠ No knowledge chain available.");
        return;
      }

      const canvas = document.getElementById("knowledgeChainCanvas");
      if (!canvas) {
        alert("Visualization canvas not found.");
        return;
      }

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cortex.forEach((record, index) => {
        const y = 50 + index * 40;
        ctx.fillStyle = "#33ff99";
        ctx.beginPath();
        ctx.arc(100, y, 15, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "12px monospace";
        ctx.fillText(record.message.substring(0, 40), 130, y + 5);
      });

      console.log("📊 Knowledge Chain rendered.");
    }

    return {
      visualizeKnowledgeChain
    };

  })();

  // Phase 8.8 — Neural Codex Chain Integrity Validator
  SageCraftAscendant.CodexWhisperChainIntegrity = (function() {

    function validateKnowledgeChain() {
      const chain = conversationHistory;
      const total = chain.length;

      if (total === 0) {
        console.warn("⚠️ Knowledge Chain is empty.");
        return;
      }

      let validCount = 0;
      let invalidCount = 0;

      chain.forEach((entry, idx) => {
        if (entry && typeof entry.message === 'string' && typeof entry.sender === 'string') {
          validCount++;
        } else {
          console.warn(`⚠ Invalid entry at index ${idx}:`, entry);
          invalidCount++;
        }
      });

      console.log(`✅ Knowledge Chain Integrity: ${validCount}/${total} valid entries.`);
      if (invalidCount > 0) {
        console.warn(`❌ ${invalidCount} corrupted or incomplete entries detected.`);
      } else {
        console.log("🧠 Chain integrity fully stable.");
      }
    }

    return {
      validateKnowledgeChain
    };

  })();

  // === Phase 1100.1: SovereignMesh Oracle Interface Hook ===
  function injectExternalMessage(input) {
    userMessage(input);
  }

  function exportMemoryChain() {
    return conversationHistory;
  }

  return {
    initializeWhisper,
    userMessage,
    auditMemoryChain,
    purgeAllMemory,
    purgeSystemOnly,
    analyzeKnowledgeChain,
    injectExternalMessage,
    exportMemoryChain,
    dispatchOracleResponse
  };

})();