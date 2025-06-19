import { whenReady } from '../core/utils/readyTools.js';

function registerLiveTablePanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderLiveTablePanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'liveTable',
      label: 'Live Table',
      render: SageCraftAscendant.OperatorConsole.renderLiveTablePanel
    });
  } else {
    console.warn("⚠️ Live Table panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerLiveTablePanel, 100);
  } else {
    registerLiveTablePanel();
  }
});