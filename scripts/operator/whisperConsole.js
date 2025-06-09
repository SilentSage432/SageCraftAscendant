

// SageCraft Ascendant — Phase 1305 Sovereign Whisper Console Module

console.log("🌀 Whisper Console Sovereign Module Initialized");

document.addEventListener("DOMContentLoaded", () => {
    const dockGrid = document.getElementById("sovereignDockGrid");
    if (!dockGrid) {
        console.warn("⚠ SovereignDockGrid not found. Cannot inject Whisper Console.");
        return;
    }

    const whisperPanel = document.createElement("div");
    whisperPanel.id = "whisperConsoleSection";
    whisperPanel.classList.add("sovereign-panel");
    whisperPanel.style.display = "none";
    whisperPanel.innerHTML = `
        <h3>🌀 Whisper Console</h3>
        <textarea id="whisperInput" placeholder="Speak your whisper..." rows="4" style="width: 100%;"></textarea>
        <button id="whisperSendBtn" style="margin-top: 10px;">Transmit Whisper</button>
        <div id="whisperLog" style="margin-top: 20px; background: #111; padding: 10px; border: 1px solid #333;"></div>
    `;

    dockGrid.appendChild(whisperPanel);

    const whisperBtn = document.getElementById("whisperSendBtn");
    const whisperInput = document.getElementById("whisperInput");
    const whisperLog = document.getElementById("whisperLog");

    whisperBtn.addEventListener("click", () => {
        const message = whisperInput.value.trim();
        if (message) {
            const entry = document.createElement("div");
            entry.textContent = `🗣 ${message}`;
            whisperLog.prepend(entry);
            whisperInput.value = "";
        }
    });

    console.log("✅ Whisper Console Sovereign Panel Injected.");
});