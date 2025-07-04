// --- Sovereign Command Layer: whispererCommandRouter.js ---

export const WhispererCommandRouter = {
  commands: {
    help() {
      const baseCommands = Object.keys(WhispererCommandRouter.commands)
        .map(cmd => `/${cmd}`)
        .join("\n");

      const namespaceCommands = Object.entries(WhispererCommandRouter.namespaces)
        .map(([ns, cmds]) => {
          const subcommands = Object.keys(cmds)
            .map(sub => `/${ns}.${sub}`)
            .join("\n");
          return subcommands;
        })
        .join("\n");

      return `🧭 Available commands:\n${baseCommands}\n${namespaceCommands}`;
    },
    clear() {
      const log = document.getElementById("whispererMessageLog");
      if (log) log.innerHTML = "";
      return "🧼 Console cleared.";
    },
    ping() {
      return "📡 Sovereign systems online and responsive.";
    },
  },

  namespaces: {},

  registerNamespace(namespace, commandSet) {
    this.namespaces[namespace.toLowerCase()] = commandSet;
  },

  validateCommandSyntax(input) {
    const trimmed = input.trim();
    if (!trimmed.startsWith("/")) {
      return "⚠️ Commands must start with a forward slash (/). Try `/help`.";
    }

    const fullCommand = trimmed.slice(1);
    const [root, sub] = fullCommand.split(".");

    const isBase = WhispererCommandRouter.commands[root];
    const isNamespace = WhispererCommandRouter.namespaces[root]?.[sub];

    if (!isBase && !isNamespace) {
      const suggestions = getAllCommandSuggestions()
        .filter(cmd => cmd.includes(root) || cmd.includes(sub || ""))
        .slice(0, 3)
        .join(", ");
      return `❓ Unknown command: /${fullCommand}${
        suggestions ? `\n🔍 Did you mean: ${suggestions}` : ""
      }`;
    }

    return null; // valid syntax
  },

  execute(commandText) {
    const syntaxError = this.validateCommandSyntax(commandText);
    if (syntaxError) return syntaxError;

    const trimmed = commandText.trim();
    const isCommand = trimmed.startsWith("/");

    if (!isCommand) return "❓ Not a recognized command format.";

    const fullCommand = trimmed.slice(1);
    const [root, sub] = fullCommand.split(".");

    if (this.commands[root]) {
      return this.commands[root]();
    } else if (this.namespaces[root] && typeof this.namespaces[root][sub] === "function") {
      return this.namespaces[root][sub]();
    } else {
      return `❓ Unknown command: /${fullCommand}`;
    }
  },

  handleInput(input) {
    const output = this.execute(input);
    const whispererLog = document.getElementById("whispererMessageLog");

    if (whispererLog) {
      const userEntry = document.createElement("div");
      userEntry.className = "whisperer-message user";
      userEntry.innerText = input;
      whispererLog.appendChild(userEntry);

      const systemResponse = document.createElement("div");
      systemResponse.className = "whisperer-message whisperer";
      systemResponse.innerText = output;
      whispererLog.appendChild(systemResponse);

      whispererLog.scrollTop = whispererLog.scrollHeight;
    }
  },
};

// Phase 3.4: Namespace Expansion Framework
export function defineNamespace(namespace, commandSet) {
  WhispererCommandRouter.registerNamespace(namespace, commandSet);
}

// Example namespace for diagnostics
const diagnosticsCommands = {
  status() {
    return "🩺 Diagnostic scan complete. All systems nominal.";
  },
  uptime() {
    return `⏱ Uptime: ${Math.floor(performance.now() / 1000)} seconds`;
  },
};

defineNamespace("diagnostics", diagnosticsCommands);

// Phase 3.3: Default Startup Commands
document.addEventListener("DOMContentLoaded", () => {
  const log = document.getElementById("whispererMessageLog");
  if (log) {
    const welcome = document.createElement("div");
    welcome.className = "whisperer-message whisperer";
    welcome.innerText = "✨ Welcome to the Sovereign Terminal. Type /help to begin.";
    log.appendChild(welcome);
  }
});
// Example usage:
// WhispererCommandRouter.registerNamespace("agent", agentCommandSet);

// Phase 3.5: Agent Management Namespace
const agentCommands = {
  list() {
    return "📋 Agents: sentinel.js, observer.js, synth.js";
  },
  status() {
    return "🧠 Agent Status: All agents operational and standing by.";
  },
  spawn() {
    return "✨ New agent initialized. Awaiting parameters...";
  },
  open() {
    return "🔓 Opening Agent Management Console...";
  },
};

defineNamespace("agent", agentCommands);

// Phase 3.6: Neural Health Console Placeholder
// Neural namespace registration (inserted only once)
if (typeof WhispererCommandRouter === "undefined" || !WhispererCommandRouter.namespaces?.neural) {
  const neuralCommands = {
    status() {
      const panel = document.getElementById("neuralPulsePanel");
      if (panel) {
        panel.classList.remove("hidden");
        return "🧬 Neural Console activated. Status: stable.";
      }
      return "⚠️ Neural Console not found.";
    },
    pulse() {
      return "🔄 Neural pulse steady at 60Hz.";
    },
    scan() {
      return "🧠 Scanning... No threats found.";
    },
  };
  defineNamespace("neural", neuralCommands);
}
// Phase 3.65: Lore Injection Namespace
const loreCommands = {
  inject() {
    if (window?.SovereignLore?.inject) {
      window.SovereignLore.inject();
      return "📜 Lore Kernel injection initiated.";
    }
    return "⚠️ Lore system not available.";
  },
};

defineNamespace("lore", loreCommands);

// Phase 6.2: Sovereign Console Visibility & Docking Logic
const consoleCommands = {
  showEcho() {
    const panel = document.getElementById("echoArchiveConsoleMount");
    if (panel) {
      panel.classList.remove("hidden");
      return "📡 Echo Archive Console now visible.";
    }
    return "❌ Echo Console not found.";
  },
  hideEcho() {
    const panel = document.getElementById("echoArchiveConsoleMount");
    if (panel) {
      panel.classList.add("hidden");
      return "🕳️ Echo Archive Console hidden.";
    }
    return "❌ Echo Console not found.";
  },
  showCore() {
    const panel = document.getElementById("coreCommandConsoleMount");
    if (panel) {
      panel.classList.remove("hidden");
      return "🧩 Core Command Console now visible.";
    }
    return "❌ Core Command Console not found.";
  },
  hideCore() {
    const panel = document.getElementById("coreCommandConsoleMount");
    if (panel) {
      panel.classList.add("hidden");
      return "🧩 Core Command Console hidden.";
    }
    return "❌ Core Command Console not found.";
  },
  showForecast() {
    const panel = document.getElementById("signalForecastConsoleMount");
    if (panel) {
      panel.classList.remove("hidden");
      return "📊 Signal Forecast Console now visible.";
    }
    return "❌ Forecast Console not found.";
  },
  hideForecast() {
    const panel = document.getElementById("signalForecastConsoleMount");
    if (panel) {
      panel.classList.add("hidden");
      return "📊 Signal Forecast Console hidden.";
    }
    return "❌ Forecast Console not found.";
  }
};

defineNamespace("console", consoleCommands);

// Phase 3.7: Autocomplete Placeholder
export function getAllCommandSuggestions() {
  const baseCommands = Object.keys(WhispererCommandRouter.commands).map(cmd => `/${cmd}`);
  const namespacedCommands = Object.entries(WhispererCommandRouter.namespaces)
    .flatMap(([ns, cmds]) => Object.keys(cmds).map(sub => `/${ns}.${sub}`));
  return [...baseCommands, ...namespacedCommands];
}
