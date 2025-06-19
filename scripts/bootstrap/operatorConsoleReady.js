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
        // TODO: Implement orbit injection logic here
      };

      SageCraftAscendant.OperatorConsole.registerOrbitRemovalControls = function () {
        console.log("🧼 Orbit Removal Controls Registered.");
        // TODO: Implement orbit removal logic here
      };

      console.log("✅ OperatorConsoleReady bootstrap complete.");
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
