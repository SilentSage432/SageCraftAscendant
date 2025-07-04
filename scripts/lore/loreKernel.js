// 🧠 Lore Kernel Initialization
window.SovereignLore = {
  memoryCore: [],
  activeEntry: null,

  init() {
    console.log("📖 Lore Kernel Initialized");

    // Load memory from localStorage
    const stored = localStorage.getItem("sovereignLoreMemory");
    if (stored) {
      try {
        this.memoryCore = JSON.parse(stored);
        this.activeEntry = this.memoryCore[this.memoryCore.length - 1] || null;
        console.log("🔁 Restored lore memory from localStorage.");
      } catch (e) {
        console.warn("⚠️ Failed to restore lore memory:", e);
      }
    }
  },

  inject(entry) {
    if (typeof entry !== "string" || !entry.trim()) {
      console.warn("⚠️ Invalid lore entry.");
      return;
    }

    const record = {
      id: `lore-${Date.now()}`,
      content: entry.trim(),
      timestamp: new Date().toISOString(),
    };

    this.memoryCore.push(record);
    this.activeEntry = record;
    console.log("✨ Lore injected:", record);
  },

  getAll() {
    return this.memoryCore;
  },

  getLatest() {
    return this.activeEntry;
  },

  clear() {
    this.memoryCore = [];
    this.activeEntry = null;
    console.log("🧼 Lore Kernel memory cleared.");
  },

  add(entryType, content) {
    if (!content || typeof content !== "string") return;
    const type = entryType || "note";
    const record = {
      id: `lore-${Date.now()}`,
      type,
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    this.memoryCore.push(record);
    this.activeEntry = record;
    console.log(`📘 [${type.toUpperCase()}] Lore added:`, record);
  },

  filterByType(type) {
    return this.memoryCore.filter(entry => entry.type === type);
  },

  syncToLocal() {
    try {
      localStorage.setItem("sovereignLoreMemory", JSON.stringify(this.memoryCore));
      console.log("💾 Lore memory synced to localStorage.");
    } catch (e) {
      console.warn("⚠️ Lore sync failed:", e);
    }
  }
};

// Auto-init
window.SovereignLore.init();

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("loreEntriesContainer");
  if (!container || !window.SovereignLore) return;

  const entries = window.SovereignLore.getAll();
  entries.forEach(entry => {
    const div = document.createElement("div");
    div.className = "lore-entry";
    div.innerHTML = `
      <div class="lore-type">[${entry.type || "note"}]</div>
      <div class="lore-content">${entry.content}</div>
      <div class="lore-timestamp">${new Date(entry.timestamp).toLocaleString()}</div>
    `;
    container.appendChild(div);
  });
  container.scrollTop = container.scrollHeight;
});
// 🔗 Lore Command Routing (Phase 4.7)
if (!window.WhispererCommandRouter) window.WhispererCommandRouter = {
  commands: {},
  namespaces: {}
};

if (!window.WhispererCommandRouter.namespaces.lore) {
  window.WhispererCommandRouter.namespaces.lore = {
    add() {
      const input = prompt("Enter new lore entry:");
      if (input) {
        window.SovereignLore.add("note", input);
        window.SovereignLore.syncToLocal();
        return "📘 Lore entry added.";
      }
      return "⚠️ No lore entry provided.";
    },
    show() {
      const all = window.SovereignLore.getAll();
      if (!all.length) return "📭 No lore found.";
      return all.map(e => `🔹 ${e.content} (${new Date(e.timestamp).toLocaleString()})`).join("\n");
    },
    clear() {
      const confirmClear = confirm("Are you sure you want to clear all lore?");
      if (confirmClear) {
        window.SovereignLore.clear();
        window.SovereignLore.syncToLocal();
        return "🧼 Lore memory cleared.";
      }
      return "❎ Lore clear cancelled.";
    }
  };
}

window.WhispererCommandRouter.namespaces.output = {
  textonly() {
    document.body.classList.add("whisperer-textonly");
    return "📝 Output mode: Text-only activated.";
  },
  scrolloff() {
    const log = document.getElementById("whispererMessageLog");
    if (log) log.style.overflowY = "hidden";
    return "📜 Scrolling disabled.";
  },
  scrollon() {
    const log = document.getElementById("whispererMessageLog");
    if (log) log.style.overflowY = "auto";
    return "📜 Scrolling enabled.";
  },
  togglefx() {
    document.body.classList.toggle("typing-fx-disabled");
    const fxState = document.body.classList.contains("typing-fx-disabled") ? "off" : "on";
    return `✨ Typing effect ${fxState}.`;
  }
};