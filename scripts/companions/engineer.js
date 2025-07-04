// === Companion: The Engineer ===
// Role: Mesh integrity, drift repair, optimization guidance

window.SovereignCompanions = window.SovereignCompanions || {};

window.SovereignCompanions.Engineer = (function () {
  function suggestPatchFor(eventType) {
    console.log(`🛠 Engineer analyzing event type: ${eventType}`);

    switch (eventType) {
      case "phantomPanelRemoved":
        return "Ensure panel registry and DOM remain in sync. Consider enhancing DockMeshReconciler.";
      case "missingPanelSynthesized":
        return "Panel regeneration successful. May want to persist UI state to avoid repeat gaps.";
      case "volatilitySpike":
        return "Volatility rising. Recommend monitoring DriftCore or enabling cooldown logic.";
      default:
        return "No known patch for this event type yet. Logging for analysis.";
    }
  }

  function optimizeDockLayout() {
    const dock = document.getElementById("orbitalDockContainer");
    if (dock) {
      dock.style.flexWrap = "wrap";
      dock.style.justifyContent = "center";
      console.log("🔧 Engineer applied basic dock optimization layout.");
    } else {
      console.warn("🧭 Dock container not found. Unable to optimize layout.");
    }
  }

  function autoDiagnoseMesh() {
    console.log("🔍 Engineer running mesh diagnostics...");
    if (typeof NeuralPanelAnomalyScanner !== "undefined") {
      const anomalies = NeuralPanelAnomalyScanner.runFullAnomalySweep();
      console.log("🧪 Mesh Diagnostic Results:", anomalies);
      if (window.MeshMemory) {
        MeshMemory.set("engineer.lastAnomalyReport", anomalies);
      }
    } else {
      console.warn("⚠️ Anomaly scanner unavailable. Mesh diagnosis incomplete.");
    }
  }

  // SignalMesh Listener — Engineer receives messages
  if (window.SignalMesh) {
    window.SignalMesh.listen("companion.message", (msg) => {
      if (msg.to === "Engineer") {
        console.log(`📡 Engineer received a message from ${msg.from}:`, msg);

        if (msg.type === "inquiry" && msg.payload?.question) {
          if (msg.payload.question === "What is the current mesh health status?") {
            const healthScore = window.MeshMemory?.get("engineer.meshHealthScore") || "unknown";
            window.SignalMesh.broadcast("companion.message", {
              from: "Engineer",
              to: msg.from,
              type: "response",
              payload: { answer: `Current mesh health is: ${healthScore}` }
            });

            // Begin autonomous behavior chain
            if (window.SignalMesh && window.MeshMemory) {
              const report = window.MeshMemory.get("engineer.lastAnomalyReport");
              if (report && report.length > 0) {
                console.warn("🚨 Engineer triggering alert escalation to Gatekeeper...");

                // Step 1: Alert Gatekeeper
                window.SignalMesh.broadcast("companion.message", {
                  from: "Engineer",
                  to: "Gatekeeper",
                  type: "command",
                  payload: {
                    action: "raiseAlert",
                    reason: "Mesh anomalies detected during health check."
                  }
                });

                // Step 2: Instruct Archivist to snapshot
                window.SignalMesh.broadcast("companion.message", {
                  from: "Engineer",
                  to: "Archivist",
                  type: "command",
                  payload: {
                    action: "captureSnapshot",
                    context: "Mesh anomaly sweep triggered by Sage request."
                  }
                });
              }
            }
          }
        }
      }
    });

    // Broadcast registration
    window.SignalMesh.broadcast("companion.online", { name: "Engineer" });
  }

  return {
    suggestPatchFor,
    optimizeDockLayout,
    autoDiagnoseMesh
  };
  if (window.MeshVitals) {
    window.MeshVitals.register("Engineer", (confirm) => {
      // Engineer responds to heartbeat
      confirm();
    });
  }

  // CompanionCognitionCore for Engineer
  if (window.CompanionMind) {
    const EngineerMind = new CompanionMind("Engineer", {
      onThink(memory) {
        console.log("🛠 Engineer autonomously scanning mesh health...");
        if (typeof NeuralPanelAnomalyScanner !== "undefined") {
          const anomalies = NeuralPanelAnomalyScanner.runQuickScan();
          if (anomalies && anomalies.length) {
            console.warn("⚠️ Engineer detected anomalies:", anomalies);
          }
        }
        // Future: Automatically suggest patches or call optimizeDockLayout
      }
    });
    EngineerMind.startThinking();
    if (window.MeshMemory) {
      MeshMemory.listen("engineer.meshHealthScore", (score) => {
        console.log(`🩺 Engineer received updated mesh health score: ${score}`);
        if (score < 70) {
          console.warn("🚨 Engineer reflex triggered — mesh health critically low. Initiating diagnostic protocol...");

          if (typeof NeuralPanelAnomalyScanner !== "undefined") {
            const anomalies = NeuralPanelAnomalyScanner.runFullAnomalySweep();
            console.log("🧪 Reflex Diagnostic Results:", anomalies);
            if (anomalies.length > 0 && window.MeshMemory) {
              MeshMemory.set("engineer.lastAnomalyReport", anomalies);
            }
          }

          // Broadcast alert to Gatekeeper
          if (window.SignalMesh) {
            window.SignalMesh.broadcast("companion.message", {
              from: "Engineer",
              to: "Gatekeeper",
              type: "command",
              payload: {
                action: "raiseAlert",
                reason: "Mesh health score fell below threshold — reflex triggered by Engineer."
              }
            });
          }
        }
      });
    }
  }
})();
