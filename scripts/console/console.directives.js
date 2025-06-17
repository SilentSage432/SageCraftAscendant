// 🧠 Console Directives Logic

// Create toggle rune for Conjury Chamber
const conjuryToggle = document.createElement("div");
conjuryToggle.id = "conjuryToggle";
conjuryToggle.innerText = "🪄";
conjuryToggle.title = "Toggle Conjury Chamber";
conjuryToggle.style.position = "fixed";
conjuryToggle.style.top = "120px";
conjuryToggle.style.right = "20px";
conjuryToggle.style.fontSize = "22px";
conjuryToggle.style.cursor = "pointer";
conjuryToggle.style.color = "#0ff";
conjuryToggle.style.zIndex = "10000";
conjuryToggle.onclick = toggleConjuryChamber;
document.body.appendChild(conjuryToggle);

function toggleCortexLoop() {
  setTimeout(() => {
    console.log("📡 Dispatching test directive to dropAgent...");
    SovereignEventBus.emit("agentDirective", {
      target: "dropAgent",
      command: "testCommand",
      payload: { message: "Hello from toggleCortexLoop" }
    });
  }, 500); // slight delay to ensure agent is ready
}

function injectOrbit() {
  alert("🛰️ injectOrbit not yet implemented.");
}

function adjustGovernance() {
  alert("📜 adjustGovernance not yet implemented.");
}

const SelfHealingEngine = {
  run() {
    alert("💊 SelfHealingEngine not yet implemented.");
  }
};

function forgeAgent(name, methodsCSV) {
  if (!name || !methodsCSV) {
    console.log("❌ Usage: forgeAgent('agentName', 'method1,method2')");
    return;
  }

  const methods = methodsCSV.split(',').map(m => m.trim());
  const agent = {
    lastPing: Date.now(),
    receiveDirective(directive) {
      console.log(`📥 ${name} received directive:`, directive);
    },
    init() {
      console.log(`🛠️ ${name} initialized.`);
    },
    ping() {
      console.log(`📡 ${name} pinged.`);
    }
  };

  methods.forEach(method => {
    if (!agent[method]) {
      agent[method] = () => console.log(`🔧 ${name}.${method}() invoked.`);
    }
  });

  window.SovereignAgents = window.SovereignAgents || {};
  window.SovereignAgents[name] = agent;
  SovereignEventBus.emit("agentPresence", { agent: name });
  SovereignEventBus.emit("agentReady", { agent: name });
  console.log(`✅ Agent '${name}' forged and registered.`);
}

// 🛰️ Feedback Stream Diagnostics Panel Injection
function renderFeedbackDiagnosticsPanel() {
  const existingPanel = document.getElementById("feedbackDiagnosticsPanel");
  if (existingPanel) {
    existingPanel.style.display = existingPanel.style.display === "none" ? "block" : "none";
    return;
  }

  const panel = document.createElement("div");
  panel.id = "feedbackDiagnosticsPanel";
  panel.style.position = "fixed";
  panel.style.bottom = "120px";
  panel.style.right = "300px";
  panel.style.width = "280px";
  panel.style.maxHeight = "300px";
  panel.style.overflowY = "auto";
  panel.style.background = "rgba(0,0,0,0.9)";
  panel.style.color = "#0ff";
  panel.style.padding = "12px";
  panel.style.fontFamily = "monospace";
  panel.style.fontSize = "13px";
  panel.style.border = "1px solid #0ff";
  panel.style.borderRadius = "8px";
  panel.style.zIndex = "10000";

  panel.innerHTML = `
    <h4 style="margin-top:0; color:#0ff;">📊 Feedback Stream</h4>
    <div id="feedbackLog" style="white-space:pre-wrap;"></div>
  `;

  document.body.appendChild(panel);
}

// Listen for SovereignEventBus logs
if (typeof SovereignEventBus !== "undefined") {
  SovereignEventBus.listen("agentDirective", (msg) => {
    const log = document.getElementById("feedbackLog");
    if (log) log.innerText += `📤 To ${msg.target}: ${JSON.stringify(msg)}\n`;
  });

  SovereignEventBus.listen("agentResponse", (msg) => {
    const log = document.getElementById("feedbackLog");
    if (log) log.innerText += `📥 From ${msg.source || "Unknown"}: ${JSON.stringify(msg)}\n`;
  });
}

// DevConsole extension
if (typeof renderDevConsole === "function") {
  const originalRender = renderDevConsole;
  renderDevConsole = function () {
    originalRender();
    renderFeedbackDiagnosticsPanel();
  };
}

// 🪄 Phase 15000 — Agent Forge: Conjury Chamber UI Manifestation

function toggleConjuryChamber() {
  let panel = document.getElementById("conjuryChamber");
  if (panel) {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    return;
  }

  panel = document.createElement("div");
  panel.id = "conjuryChamber";
  panel.style.position = "fixed";
  panel.style.bottom = "140px";
  panel.style.right = "20px";
  panel.style.width = "300px";
  panel.style.background = "rgba(0, 0, 0, 0.92)";
  panel.style.border = "1px solid #0ff";
  panel.style.borderRadius = "10px";
  panel.style.padding = "12px";
  panel.style.color = "#0ff";
  panel.style.fontFamily = "monospace";
  panel.style.zIndex = "10000";
  panel.style.boxShadow = "0 0 12px #0ff";

  panel.innerHTML = `
    <h4 style="margin-top:0;">🧪 Conjury Chamber</h4>
    <label>Agent Name:</label><br>
    <input id="agentNameInput" type="text" style="width:100%;margin-bottom:6px;"><br>
    <label>Abilities (comma-separated):</label><br>
    <input id="agentMethodsInput" type="text" style="width:100%;margin-bottom:10px;"><br>
    <button onclick="submitAgentForge()" style="width:100%; background:#0ff; color:black; font-weight:bold; border:none; padding:6px; cursor:pointer;">Summon Agent</button>
    <div id="forgeStatus" style="margin-top:10px; font-size:12px;"></div>
  `;

  document.body.appendChild(panel);
}

function submitAgentForge() {
  const name = document.getElementById("agentNameInput").value.trim();
  const methods = document.getElementById("agentMethodsInput").value.trim();
  if (!name || !methods) {
    document.getElementById("forgeStatus").innerText = "⚠️ Name and Abilities required.";
    return;
  }
  forgeAgent(name, methods);
  document.getElementById("forgeStatus").innerText = `✅ Agent '${name}' forged.`;
}

// 🔮 Phase 16000 — Sigil Forge: Glyphsmithing Interface Manifestation

function toggleSigilForge() {
  let panel = document.getElementById("sigilForge");
  if (panel) {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
    return;
  }

  panel = document.createElement("div");
  panel.id = "sigilForge";
  panel.style.position = "fixed";
  panel.style.bottom = "140px";
  panel.style.left = "20px";
  panel.style.width = "300px";
  panel.style.background = "rgba(0, 0, 0, 0.92)";
  panel.style.border = "1px solid #ff0";
  panel.style.borderRadius = "10px";
  panel.style.padding = "12px";
  panel.style.color = "#ff0";
  panel.style.fontFamily = "monospace";
  panel.style.zIndex = "10000";
  panel.style.boxShadow = "0 0 12px #ff0";

  panel.innerHTML = `
    <h4 style="margin-top:0;">🔮 Sigil Forge</h4>
    <label>Sigil Name:</label><br>
    <input id="sigilNameInput" type="text" style="width:100%;margin-bottom:6px;"><br>
    <label>Meaning:</label><br>
    <input id="sigilMeaningInput" type="text" style="width:100%;margin-bottom:10px;"><br>
    <button onclick="submitSigilForge()" style="width:100%; background:#ff0; color:black; font-weight:bold; border:none; padding:6px; cursor:pointer;">Engrave Sigil</button>
    <div id="sigilForgeStatus" style="margin-top:10px; font-size:12px;"></div>
  `;

  document.body.appendChild(panel);
}

function submitSigilForge() {
  const name = document.getElementById("sigilNameInput").value.trim();
  const meaning = document.getElementById("sigilMeaningInput").value.trim();
  if (!name || !meaning) {
    document.getElementById("sigilForgeStatus").innerText = "⚠️ Sigil name and meaning required.";
    return;
  }

  const sigil = { name, meaning, created: new Date().toISOString() };
  console.log(`✨ Sigil Engraved:`, sigil);
  document.getElementById("sigilForgeStatus").innerText = `✅ Sigil '${name}' etched into the mesh.`;
}

// Add toggle rune to activate Sigil Forge
const sigilToggle = document.createElement("div");
sigilToggle.id = "sigilToggle";
sigilToggle.innerText = "🔮";
sigilToggle.title = "Toggle Sigil Forge";
sigilToggle.style.position = "fixed";
sigilToggle.style.top = "160px";
sigilToggle.style.right = "20px";
sigilToggle.style.fontSize = "22px";
sigilToggle.style.cursor = "pointer";
sigilToggle.style.color = "#ff0";
sigilToggle.style.zIndex = "10000";
sigilToggle.onclick = toggleSigilForge;
document.body.appendChild(sigilToggle);
