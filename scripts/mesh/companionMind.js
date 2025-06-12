// 🧠 companionMind.js — Reflex & Role Logic Layer

// Register each companion into the global CompanionMesh
window.CompanionMesh = {
  Sage: {
    role: "Core Logic Controller",
    memory: [],
    reflex: (payload) => {
      console.log("🧠 Sage Reflex Activated");
      switch (payload.type) {
        case "status":
          console.log(`Sage received status: ${payload.message}`);
          break;
        case "directive":
          console.log(`Sage processing directive: ${payload.command}`);
          break;
        default:
          console.log("Sage received unknown payload:", payload);
      }
    },
    recall: (filterFn = null) => {
      if (typeof filterFn === "function") {
        return window.CompanionMesh.Sage.memory.filter(filterFn);
      }
      return [...window.CompanionMesh.Sage.memory];
    }
  },
  Archivist: {
    role: "Log Keeper & Memory Registry",
    memory: [],
    reflex: (payload) => {
      console.log("📚 Archivist Reflex Activated");
      if (payload.type === "log") {
        console.log(`Logging entry: ${payload.entry}`);
      } else if (payload.type === "lore") {
        console.log(`Routing lore entry: ${payload.entry}`);
        routeToLoreArchive(payload.entry);
      } else {
        console.log("Archivist received unknown payload:", payload);
      }
    },
    recall: (filterFn = null) => {
      if (typeof filterFn === "function") {
        return window.CompanionMesh.Archivist.memory.filter(filterFn);
      }
      return [...window.CompanionMesh.Archivist.memory];
    }
  },
  Gatekeeper: {
    role: "Security & Decision Agent",
    memory: [],
    reflex: (payload) => {
      console.log("🛡 Gatekeeper Reflex Activated");
      if (payload.type === "auth-check") {
        console.log(`Authenticating token: ${payload.token}`);
      } else {
        console.log("Gatekeeper received unknown payload:", payload);
      }
    },
    recall: (filterFn = null) => {
      if (typeof filterFn === "function") {
        return window.CompanionMesh.Gatekeeper.memory.filter(filterFn);
      }
      return [...window.CompanionMesh.Gatekeeper.memory];
    }
  },
  Engineer: {
    role: "Wiring Agent & Mesh Integrator",
    memory: [],
    reflex: (payload) => {
      console.log("🛠 Engineer Reflex Activated");
      if (payload.type === "wire-request") {
        console.log(`Initiating wiring for: ${payload.component}`);
      } else {
        console.log("Engineer received unknown payload:", payload);
      }
    },
    recall: (filterFn = null) => {
      if (typeof filterFn === "function") {
        return window.CompanionMesh.Engineer.memory.filter(filterFn);
      }
      return [...window.CompanionMesh.Engineer.memory];
    }
  }
};

// Bind each companion to the SignalMesh
document.addEventListener("DOMContentLoaded", () => {
  console.log("🧠 companionMind.js initialized");

  if (!window.SignalMesh) {
    console.warn("⚠️ SignalMesh not found. Broadcasting layer inactive.");
    return;
  }

  // Listen for signal broadcasts and trigger reflexes
  window.SignalMesh.listen((signal) => {
    const { target, payload } = signal;

    if (window.CompanionMesh[target] && typeof window.CompanionMesh[target].reflex === "function") {
      window.CompanionMesh[target].memory.push(payload);
      window.CompanionMesh[target].reflex(payload);
    } else {
      console.warn(`⚠️ Unknown target companion: ${target}`);
    }
  });
});

function syncMemoryAcrossCompanions() {
  const allCompanions = Object.keys(window.CompanionMesh);
  const combinedMemory = [];

  // Aggregate all memories
  allCompanions.forEach(name => {
    combinedMemory.push(...window.CompanionMesh[name].memory);
  });

  // Distribute to all companions
  allCompanions.forEach(name => {
    const companion = window.CompanionMesh[name];
    companion.memory = [...combinedMemory];
  });

  console.log("🧬 Memory Sync Complete — All companions updated.");
}

// Optional: trigger a sync after initialization
setTimeout(syncMemoryAcrossCompanions, 500);

function routeToLoreArchive(entry) {
  if (!window.LoreArchive) {
    console.warn("📖 LoreArchive not initialized. Cannot store entry.");
    return;
  }

  if (typeof window.LoreArchive.store !== "function") {
    console.warn("📖 LoreArchive.store() not available.");
    return;
  }

  window.LoreArchive.store(entry);
  console.log("📖 Lore entry stored:", entry);
}

// 📖 Phase 16056 — Lore Archive Bootstrap
window.LoreArchive = {
  entries: [],
  store(entry) {
    const timestamp = new Date().toISOString();
    const record = { entry, timestamp };
    this.entries.push(record);
    console.log(`📖 LoreArchive updated — ${this.entries.length} entries`);
  },
  getAll() {
    return [...this.entries];
  },
  findByKeyword(keyword) {
    return this.entries.filter(e => e.entry.includes(keyword));
  }
};
// 📖 Phase 16057 — Grimoire Panel UI Construction
function createGrimoirePanel() {
  if (document.getElementById("grimoirePanel")) return;

  const panel = document.createElement("div");
  panel.id = "grimoirePanel";
  panel.style.position = "fixed";
  panel.style.right = "20px";
  panel.style.bottom = "20px";
  panel.style.width = "300px";
  panel.style.maxHeight = "400px";
  panel.style.overflowY = "auto";
  panel.style.backgroundColor = "rgba(18, 18, 18, 0.95)";
  panel.style.color = "#f2f2f2";
  panel.style.padding = "16px";
  panel.style.border = "2px solid #888";
  panel.style.borderRadius = "12px";
  panel.style.zIndex = "9999";
  panel.style.fontFamily = "monospace";
  panel.style.display = "none";

  const title = document.createElement("h3");
  title.innerText = "📖 Grimoire Archive";
  panel.appendChild(title);

  const list = document.createElement("ul");
  list.id = "grimoireList";
  panel.appendChild(list);

  document.body.appendChild(panel);
}

function toggleGrimoirePanel() {
  const panel = document.getElementById("grimoirePanel");
  if (!panel) return;
  panel.style.display = panel.style.display === "none" ? "block" : "none";

  // Populate entries
  const list = document.getElementById("grimoireList");
  list.innerHTML = "";
  const entries = window.LoreArchive?.getAll() || [];
  entries.forEach(({ entry, timestamp }) => {
    const item = document.createElement("li");
    item.textContent = `[${timestamp}] ${entry}`;
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", createGrimoirePanel);

// Optional global access
window.toggleGrimoirePanel = toggleGrimoirePanel;