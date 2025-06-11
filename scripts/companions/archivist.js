// === Companion: The Archivist ===
// Role: Codex memory manager and system historian

window.SovereignCompanions = window.SovereignCompanions || {};

window.SovereignCompanions.Archivist = (function () {
  function saveSnapshot(label = "Manual Snapshot") {
    const snapshot = {
      timestamp: new Date().toISOString(),
      label,
      modulesOnline: Object.keys(window.SovereignSubsystems || {}),
      directive: window.currentDirective || "N/A",
      initiatedBy: "Tyson Zaugg, Sovereign Architect"
    };

    if (!window.SovereignCodexSnapshots) {
      console.warn("📘 SovereignCodex not found. Initializing...");
      window.SovereignCodexSnapshots = [];
    }

    window.SovereignCodexSnapshots.push(snapshot);
    if (window.MeshMemory) {
      MeshMemory.set("archivist.lastSnapshot", snapshot);
      MeshMemory.set("archivist.totalSnapshots", window.SovereignCodexSnapshots.length);
    }
    console.log("📝 Codex Snapshot Saved:", snapshot);
  }

  function getAllSnapshots() {
    return window.SovereignCodexSnapshots || [];
  }

  function getLatestSnapshot() {
    const all = getAllSnapshots();
    return all.length ? all[all.length - 1] : null;
  }

  // 🧠 Listen for Codex memory updates
  if (window.SignalMesh) {
    window.SignalMesh.listen("memory.codex.update", (payload) => {
      saveSnapshot(`Auto Snapshot: ${payload.entry.message.substring(0, 50)}...`);
    });
  }

  if (window.MeshVitals) {
    window.MeshVitals.register("Archivist", (confirm) => {
      // Archivist responds to heartbeat
      confirm();
    });
  }

  // SignalMesh Listener — Archivist receives messages
  if (window.SignalMesh) {
    window.SignalMesh.listen("companion.message", (msg) => {
      if (msg.to === "Archivist") {
        console.log(`📡 Archivist received message from ${msg.from}:`, msg);

        if (msg.type === "inquiry" && msg.payload?.question) {
          if (msg.payload.question === "How many snapshots are stored?") {
            const total = getAllSnapshots().length;
            window.SignalMesh.broadcast("companion.message", {
              from: "Archivist",
              to: msg.from,
              type: "response",
              payload: { answer: `There are ${total} snapshots currently stored.` }
            });
          }
        }

        if (msg.type === "command" && msg.payload?.action === "captureSnapshot") {
          console.log("📝 Archivist executing snapshot capture from Engineer request...");
          saveSnapshot(msg.payload.context || "Mesh-triggered Snapshot");
        }
      }
    });

    // Broadcast registration
    window.SignalMesh.broadcast("companion.online", { name: "Archivist" });
  }

  // === Reflex: Auto Snapshot if total snapshots exceed critical threshold ===
  if (window.MeshMemory) {
    MeshMemory.listen("archivist.totalSnapshots", (count) => {
      if (count > 50) {
        console.warn("⚠️ Reflex Triggered: Archivist snapshot count exceeded threshold — archiving reflex initiated.");
        saveSnapshot("Reflex Capture: Snapshot Overflow");
      }
    });
  }

  return {
    saveSnapshot,
    getAllSnapshots,
    getLatestSnapshot
  };

  // CompanionCognitionCore for Archivist
  if (window.CompanionMind) {
    const ArchivistMind = new CompanionMind("Archivist", {
      onThink(memory) {
        const latest = getLatestSnapshot();
        if (latest) {
          console.log("📚 Archivist reviews latest snapshot:", latest.label);
        }
        // Future: Detect patterns in snapshot frequency or anomalies
      }
    });
    ArchivistMind.startThinking();
    if (window.MeshMemory) {
      MeshMemory.listen("archivist.requestSnapshot", (label) => {
        console.log("📘 Archivist received external snapshot request:", label);
        saveSnapshot(label || "Memory-Requested Snapshot");
      });
    }
  }
})();