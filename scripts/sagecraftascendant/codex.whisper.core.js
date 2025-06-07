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
    renderConsole();
    saveMemoryChain();
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

  return {
    initializeWhisper,
    userMessage,
    auditMemoryChain
  };

})();