import { whenReady } from '../core/utils/readyTools.js';

whenReady(() => {
  function waitForOperatorConsole(retryAttempts = 0) {
    const maxRetries = 20;
    const retryInterval = 500;

    if (
      typeof SageCraftAscendant !== 'undefined' &&
      typeof SageCraftAscendant.OperatorConsole !== 'undefined'
    ) {
      SageCraftAscendant.OperatorConsole.registerOrbitInjectionControls = function () {
        console.log("🧬 Orbit Injection Controls Registered.");
        const orbitButtons = document.querySelectorAll('[data-orbit]');
        orbitButtons.forEach(button => {
          button.addEventListener('click', () => {
            const targetPanelId = button.getAttribute('data-orbit');
            if (targetPanelId && typeof SageCraftAscendant.OperatorConsole.revealDockPanel === 'function') {
              SageCraftAscendant.OperatorConsole.revealDockPanel(targetPanelId);
            } else {
              console.warn(`⚠️ Orbit button missing or revealDockPanel not defined: ${targetPanelId}`);
            }
          });
        });
      };

      SageCraftAscendant.OperatorConsole.registerOrbitRemovalControls = function () {
        console.log("🧼 Orbit Removal Controls Registered.");
        const removeButtons = document.querySelectorAll('[data-orbit-remove]');
        removeButtons.forEach(button => {
          button.addEventListener('click', () => {
            const targetPanelId = button.getAttribute('data-orbit-remove');
            const panel = document.getElementById(targetPanelId);
            if (panel) {
              panel.style.display = 'none';
              panel.classList.add('hidden');
              panel.style.opacity = 0;
              panel.style.visibility = 'hidden';
              panel.style.zIndex = 0;
              console.log(`🧼 Panel ${targetPanelId} hidden successfully.`);
            } else {
              console.warn(`⚠️ Attempted to remove nonexistent panel: ${targetPanelId}`);
            }
          });
        });
      };

      SageCraftAscendant.OperatorConsole.registerForecastModalControls = function () {
        const modal = document.getElementById("forecastDriftModal");
        const closeBtn = document.getElementById("closeDriftChartBtn");

        if (!modal) return;

        // Start hidden
        modal.style.display = "none";
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";

        // Toggle function
        window.toggleForecastModal = function () {
          const isVisible = modal.style.display === "block";
          modal.style.display = isVisible ? "none" : "block";
          modal.style.visibility = isVisible ? "hidden" : "visible";
          modal.style.opacity = isVisible ? "0" : "1";
        };

        // Close button
        closeBtn?.addEventListener("click", () => {
          modal.style.display = "none";
          modal.style.visibility = "hidden";
          modal.style.opacity = "0";
        });

        console.log("🧿 Forecast modal toggle initialized.");
      };

      SageCraftAscendant.OperatorConsole.revealDockPanel = function (panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.remove('hidden');
          panel.style.display = 'block';
          panel.style.opacity = 1;
          panel.style.visibility = 'visible';
          panel.style.zIndex = 500;
          panel.style.top = "60px";
          panel.style.left = "60px";
          panel.style.position = "absolute";
          console.log(`📌 Position reset inside revealDockPanel: ${panelId}`);
          console.log(`✅ revealDockPanel: ${panelId} made visible.`);
        } else {
          console.warn(`⚠️ revealDockPanel: ${panelId} not found.`);
        }
      };

      console.log("✅ OperatorConsoleReady bootstrap complete.");
      SageCraftAscendant.OperatorConsole.registerForecastModalControls();
      if (typeof SageCraftAscendant.OperatorConsole.revealDockPanel === 'function') {
        SageCraftAscendant.OperatorConsole.revealDockPanel("coreCommandInput");
        SageCraftAscendant.OperatorConsole.revealDockPanel("neuralPulsePanel");
        SageCraftAscendant.OperatorConsole.revealDockPanel("sessionManagerConsole");

        // 🧼 Hide all other panels by default
        document.querySelectorAll('.holo-console').forEach(panel => {
          if (!["coreCommandInput", "neuralPulsePanel", "sessionManagerConsole"].includes(panel.id)) {
            panel.style.display = "none";
            panel.classList.add("hidden");
            panel.style.opacity = 0;
            panel.style.visibility = "hidden";
            panel.style.zIndex = 0;
          }
        });
        // 📌 Force all holo-console panels back to viewport
        document.querySelectorAll('.holo-console').forEach(panel => {
          if (panel.style.display !== 'none') {
            panel.style.top = "60px";
            panel.style.left = "60px";
            panel.style.position = "absolute";
            panel.style.zIndex = 500;
            console.log(`📌 Resurrection position correction applied: ${panel.id}`);
          }
        });
      } else {
        console.warn("⚠️ revealDockPanel method not available on OperatorConsole.");
      }
    } else {
      retryAttempts++;
      if (retryAttempts >= maxRetries) {
        console.error("❌ OperatorConsole still unavailable after max retries.");
        return;
      }
      console.warn(`⚠️ OperatorConsole not yet available. Retrying... (${retryAttempts}/${maxRetries})`);
      setTimeout(() => waitForOperatorConsole(retryAttempts), retryInterval);
    }
  }

  waitForOperatorConsole();

  window.addEventListener("load", () => {
    document.querySelectorAll('.holo-console').forEach(panel => {
      const style = getComputedStyle(panel);
      if (style.display !== "none") {
        panel.style.top = "60px";
        panel.style.left = "60px";
        panel.style.position = "absolute";
        console.log(`📌 Reset position: ${panel.id}`);
      }
    });
  });
});
