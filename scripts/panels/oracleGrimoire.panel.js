import { whenReady } from '../core/utils/readyTools.js';

function registerOracleGrimoirePanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderOracleGrimoirePanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'oracleGrimoire',
      label: 'Oracle Grimoire',
      render: SageCraftAscendant.OperatorConsole.renderOracleGrimoirePanel
    });
  } else {
    console.warn("⚠️ Oracle Grimoire panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerOracleGrimoirePanel, 100);
  } else {
    registerOracleGrimoirePanel();
  }
});