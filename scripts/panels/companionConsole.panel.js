

(function () {
  const panelId = "companionConsole";
  const panelName = "Companion Console";

  function createCompanionPanel() {
    const section = document.createElement("div");
    section.classList.add("console-section");

    const header = document.createElement("h3");
    header.textContent = "🤖 Companion Console";
    section.appendChild(header);

    const companionList = document.createElement("div");
    companionList.id = "companionList";
    companionList.textContent = "Loading companions...";
    section.appendChild(companionList);

    // Optional: Hook into SovereignBus for companion updates
    if (window.SovereignBus) {
      window.SovereignBus.addEventListener("companionUpdate", (e) => {
        companionList.textContent = JSON.stringify(e.detail, null, 2);
      });
    }

    return section;
  }

  if (window.SageCraftAscendant?.OperatorConsole) {
    window.SageCraftAscendant.OperatorConsole.registerPanel({
      id: panelId,
      name: panelName,
      render: createCompanionPanel
    });
  } else {
    console.warn("⚠️ OperatorConsole not ready — cannot register Companion Console panel.");
  }
})();