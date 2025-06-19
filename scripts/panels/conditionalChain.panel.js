import { whenReady } from '../core/utils/readyTools.js';

function registerConditionalChainPanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderConditionalChainPanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'conditionalChain',
      label: 'Conditional Chain Editor',
      render: SageCraftAscendant.OperatorConsole.renderConditionalChainPanel
    });
  } else {
    console.warn("⚠️ Conditional Chain panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerConditionalChainPanel, 100);
  } else {
    registerConditionalChainPanel();
  }
});
