window.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("whispererConsole");
  const input = document.getElementById("whispererInput");
  const sendButton = document.getElementById("sendWhispererMessage");
  const messageLog = document.getElementById("whispererMessageLog");

  if (!terminal || !input || !sendButton || !messageLog) {
    console.warn("Whisperer Terminal: Missing required DOM elements.");
    return;
  }

  const appendToLog = (message, from = "User") => {
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.innerHTML = `<strong>${from}:</strong> ${message}`;
    messageLog.appendChild(entry);
    messageLog.scrollTop = messageLog.scrollHeight;
  };

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;
    appendToLog(text, "You");
    input.value = "";

    if (text.trim() === "/lore.show") {
      toggleLorePanel();
      return;
    }

    if (text.startsWith("/lore.add")) {
      const loreText = text.replace("/lore.add", "").trim();
      if (loreText.length === 0) {
        appendToLog("⚠️ Please provide lore content after the command.", "System");
      } else if (window?.LoreKernel?.addEntry) {
        window.LoreKernel.addEntry(loreText);
        appendToLog("✅ Lore entry added successfully.", "System");
      } else {
        appendToLog("❌ LoreKernel unavailable. Could not save entry.", "System");
      }
      return;
    }

    // Simulated Whisperer response
    setTimeout(() => {
      appendToLog(`Echo: ${text}`, "Whisperer");
    }, 500);
  };

  const toggleLorePanel = () => {
    const lorePanel = document.getElementById("loreArchivePanel");
    if (lorePanel) {
      lorePanel.classList.toggle("visible");
      if (lorePanel.classList.contains("visible") && window?.LoreKernel?.displayLore) {
        window.LoreKernel.displayLore();
      }
    }
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });

  sendButton.addEventListener("click", handleSend);

  input.addEventListener("input", () => {
    const currentText = input.value.trim().replace("/", "");
    const suggestionBox = document.getElementById("whispererSuggestionBox");

    if (!suggestionBox) return;

    if (currentText.length === 0) {
      suggestionBox.innerText = "";
      return;
    }

    if (window.WhispererCommandRouter?.getAllCommandSuggestions) {
      const allCommands = window.WhispererCommandRouter.getAllCommandSuggestions();
      const matches = allCommands.filter(cmd => cmd.includes(currentText)).slice(0, 3);
      suggestionBox.innerText = matches.length > 0
        ? `Suggestions: ${matches.join(", ")}`
        : "No suggestions.";
    }
  });

  // 🧠 Initialize Legacy Panel Containment on Load
  if (window.archiveLegacyPanels) {
    window.archiveLegacyPanels();
  }
  // 🧠 Suppressed auto-rehome logic completely — respecting manual DOM placement.
  setTimeout(() => {
    const whisperer = document.getElementById('whispererConsole');

    if (!whisperer) {
      console.warn("❌ whispererConsole not found.");
      return;
    }

    // Prevent rehoming logic entirely; rely on static index.html structure
    if (
      whisperer.classList.contains("anchored-terminal") ||
      whisperer.classList.contains("no-auto-rehome")
    ) {
      console.log("✅ Whisperer console already anchored — rehome bypass respected.");
    } else {
      console.log("🛑 Rehoming logic bypassed — no automatic DOM reassignment permitted.");
    }
  }, 200);
});