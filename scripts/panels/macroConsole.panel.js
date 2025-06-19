import { whenReady } from '../core/utils/readyTools.js';

function registerMacroConsolePanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderMacroConsolePanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'macroConsole',
      label: 'Neural Macro Console',
      render: SageCraftAscendant.OperatorConsole.renderMacroConsolePanel
    });
  } else {
    console.warn("⚠️ Macro Console panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerMacroConsolePanel, 100);
  } else {
    registerMacroConsolePanel();
  }
});
