// === Whisperer Suggestion Engine ===
const whispererSuggestionBox = document.getElementById("whispererSuggestionBox");

function updateSuggestions(inputText) {
  if (!inputText.startsWith("/")) {
    whispererSuggestionBox.style.display = "none";
    return;
  }

  const keyword = inputText.slice(1).toLowerCase();
  const allCommands = getAllCommandSuggestions();
  const matches = allCommands.filter(cmd => cmd.toLowerCase().includes(keyword)).slice(0, 5);

  whispererSuggestionBox.innerHTML = matches.map(cmd => `<div class="suggestion-item">${cmd}</div>`).join("");
  whispererSuggestionBox.style.display = matches.length ? "block" : "none";
}

function getAllCommandSuggestions() {
  const flat = Object.keys(WhispererCommandRouter.commands);
  const nested = Object.entries(WhispererCommandRouter.namespaces).flatMap(
    ([ns, cmds]) => Object.keys(cmds).map(sub => `${ns}.${sub}`)
  );
  return [...flat, ...nested];
}

function handleSuggestionNavigation(e) {
  const items = whispererSuggestionBox.querySelectorAll(".suggestion-item");
  if (!items.length) return;

  let index = [...items].findIndex(el => el.classList.contains("active"));

  if (e.key === "ArrowDown") {
    e.preventDefault();
    index = (index + 1) % items.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    index = (index - 1 + items.length) % items.length;
  } else if (e.key === "Enter" && index !== -1) {
    e.preventDefault();
    const selected = items[index].innerText;
    whispererInput.value = `/${selected}`;
    whispererSuggestionBox.style.display = "none";
    whispererInput.focus();
    displayCommandFeedback(selected);
    return;
  }

  items.forEach((el, i) => el.classList.toggle("active", i === index));
}

whispererInput?.addEventListener("input", () => updateSuggestions(whispererInput.value));
whispererInput?.addEventListener("keydown", handleSuggestionNavigation);

// Enable clicking suggestions with the mouse
whispererSuggestionBox?.addEventListener("click", (e) => {
  if (e.target.classList.contains("suggestion-item")) {
    whispererInput.value = `/${e.target.innerText}`;
    whispererSuggestionBox.style.display = "none";
    whispererInput.focus();
  }
});


function displayCommandFeedback(commandText) {
  const response = WhispererCommandRouter.execute(commandText);

  const systemEntry = document.createElement("div");
  systemEntry.className = "whisperer-message whisperer-response";

  if (typeof response === "string") {
    systemEntry.innerText = response;
  } else if (typeof response === "object") {
    systemEntry.innerText = JSON.stringify(response, null, 2);
  } else {
    systemEntry.innerText = "✅ Command executed.";
  }

  whispererLog.appendChild(systemEntry);
  whispererLog.scrollTop = whispererLog.scrollHeight;
}


// === Whisperer Command Memory Recall ===
const commandHistory = [];
let historyIndex = -1;

whispererInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = whispererInput.value.trim();
    if (input) {
      commandHistory.unshift(input);
      historyIndex = -1;
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (commandHistory.length > 0) {
      historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      whispererInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (commandHistory.length > 0) {
      historyIndex = Math.max(historyIndex - 1, -1);
      whispererInput.value = historyIndex === -1 ? "" : commandHistory[historyIndex];
    }
  }
});