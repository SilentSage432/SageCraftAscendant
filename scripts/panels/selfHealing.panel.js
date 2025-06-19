

import { whenReady } from '../core/utils/readyTools.js';

function registerSelfHealingPanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderSelfHealingPanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'selfHealing',
      label: 'Operator Self-Healing Console',
      render: SageCraftAscendant.OperatorConsole.renderSelfHealingPanel
    });
  } else {
    console.warn("⚠️ Self-Healing panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerSelfHealingPanel, 100);
  } else {
    registerSelfHealingPanel();
  }
});