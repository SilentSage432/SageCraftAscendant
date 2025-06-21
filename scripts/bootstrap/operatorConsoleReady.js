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

      SageCraftAscendant.OperatorConsole.revealDockPanel = function (panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.remove('hidden');
          panel.style.display = 'block';
          panel.style.opacity = 1;
          panel.style.visibility = 'visible';
          panel.style.zIndex = 500;
          console.log(`✅ revealDockPanel: ${panelId} made visible.`);
        } else {
          console.warn(`⚠️ revealDockPanel: ${panelId} not found.`);
        }
      };

      console.log("✅ OperatorConsoleReady bootstrap complete.");
      if (typeof SageCraftAscendant.OperatorConsole.revealDockPanel === 'function') {
        SageCraftAscendant.OperatorConsole.revealDockPanel("countConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("deltaAnalyzerConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("reportingHubConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("sessionManagerConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("utilityHubConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("loreEngineConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("whispererConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("sageFeedConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("oracleConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("forecastConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("commandBridgeConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("sovereignHubConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("artifactVaultConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("memoryKernelConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("neuralMatrixConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("systemPulseConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("sovereignTerminal");
        SageCraftAscendant.OperatorConsole.revealDockPanel("eventPulseConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("observerRelayConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("etherealLensConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("navigationArrayConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("quantumBeaconConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("protocolBufferConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("temporalAnchorConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("consciousnessStreamConsole");
        SageCraftAscendant.OperatorConsole.revealDockPanel("dimensionalTetherConsole");
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
});
