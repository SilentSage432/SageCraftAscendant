import { whenReady } from '../core/utils/readyTools.js';

function registerRecoveryCodexPanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderRecoveryCodexPanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'recoveryCodex',
      label: 'Neural Recovery Codex',
      render: SageCraftAscendant.OperatorConsole.renderRecoveryCodexPanel
    });
  } else {
    console.warn("⚠️ Recovery Codex panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerRecoveryCodexPanel, 100);
  } else {
    registerRecoveryCodexPanel();
  }
});
