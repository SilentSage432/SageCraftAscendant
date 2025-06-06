// === Phase 16009 — Neural Operator Console Bootstrap ===

window.NeuralOperatorConsole = (function () {

  function renderOperatorConsole() {
    const panel = document.getElementById("operatorConsolePanel");
    if (!panel) {
      console.error("❌ Operator Console Panel not found.");
      return;
    }

    panel.innerHTML = `
      <h2>🧠 Neural Operator Console</h2>

      <div class="console-section">
        <h3>🪐 Orbit Manager</h3>
        <label>Orbit Key: <input type="text" id="orbitKeyInput"></label><br>
        <label>Orbit Label: <input type="text" id="orbitLabelInput"></label><br>
        <label>Orbit Icon: <input type="text" id="orbitIconInput" placeholder="icon-default.png"></label><br>
        <button onclick="addOrbitFromUI()">➕ Add Orbit</button>
        <button onclick="removeOrbitFromUI()">🗑 Remove Orbit</button>
      </div>
    `;
  }

  return {
    renderOperatorConsole
  };

})();

// === Phase 16009 — Orbit Manager UI Wiring ===

function addOrbitFromUI() {
  const key = document.getElementById("orbitKeyInput").value.trim();
  const label = document.getElementById("orbitLabelInput").value.trim();
  const icon = document.getElementById("orbitIconInput").value.trim() || "icon-default.png";

  if (!key || !label) {
    console.warn("⚠ Key and Label required to add orbit.");
    return;
  }

  NeuralRegistryEditorCore.addOrbit(key, label, [], icon);
}

function removeOrbitFromUI() {
  const key = document.getElementById("orbitKeyInput").value.trim();
  if (!key) {
    console.warn("⚠ Orbit Key required to remove.");
    return;
  }

  NeuralRegistryEditorCore.removeOrbit(key);
}

// === Phase 16010 — Operator Live Sync Activation ===

NeuralRegistryEditorCore.setLiveSyncCallback(() => {
  NeuralOperatorConsole.renderOperatorConsole();
});
