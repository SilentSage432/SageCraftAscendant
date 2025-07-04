/ * 📜 whispererResponses.js — Phase 9: Typing Effect & Lore Hook */

function appendToWhispererLog(sender, message, isSystem = false) {
  const log = document.getElementById("whispererMessageLog");
  const entry = document.createElement("div");
  entry.classList.add("log-entry");

  if (isSystem) {
    entry.classList.add("system-response");
  }

  entry.innerHTML = `<strong>${sender}:</strong> ${message}`;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

function simulateTypingEffect(message, callback) {
  const log = document.getElementById("whispererMessageLog");
  const typingEntry = document.createElement("div");
  typingEntry.classList.add("log-entry", "typing");
  log.appendChild(typingEntry);

  let index = 0;
  const interval = setInterval(() => {
    typingEntry.textContent = message.slice(0, index) + "|";
    index++;

    if (index > message.length) {
      clearInterval(interval);
      typingEntry.textContent = message;
      typingEntry.classList.remove("typing");

      if (callback) callback();
    }

    log.scrollTop = log.scrollHeight;
  }, 30);
}

// Placeholder: Lore-aware Whisperer Response Routing
function getWhispererResponse(inputText) {
  // Future: Lore kernel + memory influence logic
  const lowerInput = inputText.toLowerCase();

  if (lowerInput.includes("oracle") || lowerInput.includes("sage")) {
    return "The Oracle stirs... your path will soon be revealed.";
  }

  return "The Whisperer hums softly... your words are not lost.";
}

// --- Whisperer Message Routing logic ---
const whispererInput = document.getElementById('whispererInput');
const whispererSend = document.getElementById('sendWhispererMessage');
const whispererLog = document.getElementById('whispererMessageLog');

function appendToLog(role, message) {
  const entry = document.createElement('div');
  entry.className = `whisperer-message ${role}`;
  entry.innerText = message;
  whispererLog.appendChild(entry);
  whispererLog.scrollTop = whispererLog.scrollHeight;
}

function handleWhispererMessage() {
  const input = whispererInput.value.trim();
  if (!input) return;

  appendToLog('user', input);
  whispererInput.value = '';

  if (window?.WhispererCommandRouter?.handleInput) {
    WhispererCommandRouter.handleInput(input);
  } else {
    appendToLog('whisperer', "⚠️ Command router not initialized.");
  }
}

whispererSend?.addEventListener('click', handleWhispererMessage);
whispererInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleWhispererMessage();
});

if (!window?.WhispererCommandRouter) {
  console.warn("WhispererCommandRouter is not defined.");
}
