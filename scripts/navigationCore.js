"use strict";

// Neural NavigationCore.js — Fully Modularized Navigation Controller

const NavigationCore = (function() {

  const targetMap = {
    count: "countContainer",
    deltaAnalyzer: "deltaAnalyzerSection",
    reportingHub: "reportingHubSection",
    utilityHub: "utilityHubSection",
    tools: "toolsPanel",
    masterExportHub: "masterExportSection",
    sessionManager: "sessionManagerSection",
    mappings: "mappingManagerSection",
    advancedTools: "advancedToolsSection",
    audit: "auditSection",
    configPanel: "configPanelSection",
    operatorConsolePanel: "operatorConsole",
    diagnosticsModal: "diagnosticsModal",
    dropboxModal: "dropboxModal"
  };

  function activateTab(targetId) {
    console.log(`🚀 NavigationCore activating: ${targetId}`);
    const domId = targetMap[targetId];
    if (!domId) {
      console.warn(`⚠ Unknown navigation target: ${targetId}`);
      return;
    }
    const targetElement = document.getElementById(domId);
    if (!targetElement) {
      console.warn(`⚠ DOM element for ${targetId} not found.`);
      return;
    }
    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function attachOrbitalWiring() {
    console.log("🔌 Neural Orbital Routing Mesh Activated...");

    const navButtons = document.querySelectorAll('.orbital-btn');
    navButtons.forEach(btn => {
      const targetId = btn.dataset.target;
      if (!targetId) return;

      btn.addEventListener("click", () => {
        console.log(`🛰 Orbital HUD Activating → Dispatch NeuralOrbitalActivate(${targetId})`);
        const event = new CustomEvent("NeuralOrbitalActivate", { detail: { target: targetId } });
        window.dispatchEvent(event);
      });
    });

    // Attach central Neural Event Bridge listener
    window.addEventListener("NeuralOrbitalActivate", (e) => {
      const eventTarget = e.detail?.target;
      if (!eventTarget) {
        console.warn("⚠ No target received from NeuralOrbitalActivate event.");
        return;
      }
      console.log(`🧭 Neural Orbital Routing Mesh processing target: ${eventTarget}`);
      activateTab(eventTarget);
    });

    console.log("✅ Neural Orbital Routing Mesh fully operational.");
  }

  return { activateTab, attachOrbitalWiring };
})();