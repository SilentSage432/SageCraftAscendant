// --- Whisperer Suggestions Logic ---

const whispererInputField = document.getElementById("whispererInput");
const suggestionBox = document.getElementById("whispererSuggestionBox");

function getAllCommandSuggestions() {
  const rootCommands = Object.keys(WhispererCommandRouter.commands || {});
  const namespaces = WhispererCommandRouter.namespaces || {};
  const namespaceCommands = Object.entries(namespaces).flatMap(([ns, cmds]) =>
    Object.keys(cmds).map(sub => `${ns}.${sub}`)
  );
  return [...rootCommands, ...namespaceCommands];
}

function filterSuggestions(inputText) {
  const trimmed = inputText.trim().slice(1); // Remove the slash
  if (!trimmed) return [];

  return getAllCommandSuggestions().filter(cmd => cmd.includes(trimmed));
}

function renderSuggestions(suggestions) {
  suggestionBox.innerHTML = "";
  if (suggestions.length === 0) {
    suggestionBox.style.display = "none";
    return;
  }

  suggestions.forEach(suggestion => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    item.innerText = suggestion;
    suggestionBox.appendChild(item);
  });

  suggestionBox.style.display = "block";
}

if (whispererInputField) {
  whispererInputField.addEventListener("input", () => {
    const val = whispererInputField.value.trim();
    if (val === "") {
      suggestionBox.style.display = "none";
      return;
    }
    if (!val.startsWith("/")) {
      suggestionBox.style.display = "none";
      return;
    }

    const matches = filterSuggestions(val);
    renderSuggestions(matches);
    // Optional: allow suggestion click-to-fill
    suggestionBox.querySelectorAll(".suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        whispererInputField.value = `/${item.innerText}`;
        suggestionBox.style.display = "none";
        whispererInputField.focus();
      });
    });
  });

  whispererInputField.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      suggestionBox.style.display = "none";
    }
  });
}