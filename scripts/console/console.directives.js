// 🧠 Console Directives Logic

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
