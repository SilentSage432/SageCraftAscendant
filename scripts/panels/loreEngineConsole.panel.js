// loreEngineConsole.panel.js

(function () {
  const panelId = "loreEngineConsole";
  const panelTitle = "Lore Engine";
  const panelIcon = "📜";

  function initializeLoreEngineConsole() {
    const container = document.createElement("div");
    container.classList.add("panel-content");
    container.innerHTML = `
      <h2>${panelIcon} ${panelTitle}</h2>
      <p>Welcome to the Lore Engine Console. This panel will eventually display unlocked lore entries, chapters, and hidden knowledge.</p>
      <div id="loreEntriesContainer">
        <!-- Dynamic lore entries will populate here -->
      </div>
    `;
    const loreBusDisplay = document.createElement("div");
    loreBusDisplay.id = "loreBusDisplay";
    loreBusDisplay.classList.add("lore-log");
    container.appendChild(loreBusDisplay);

    if (window.SovereignBus) {
      window.SovereignBus.addEventListener("loreUpdate", (e) => {
        const entry = e.detail;
        const p = document.createElement("p");
        p.innerHTML = `<strong>${entry.title}</strong>: ${entry.message}`;
        loreBusDisplay.appendChild(p);
      });
    }
    return container;
  }

  if (window.registerPanel) {
    window.registerPanel(panelId, initializeLoreEngineConsole);
  } else {
    console.warn(`[${panelId}] Panel registration deferred. Retrying later...`);
    document.addEventListener("DOMContentLoaded", () => {
      if (window.registerPanel) {
        window.registerPanel(panelId, initializeLoreEngineConsole);
      }
    });
  }
})();
