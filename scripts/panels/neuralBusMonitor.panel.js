import { whenReady } from '../core/utils/readyTools.js';

function registerNeuralBusMonitorPanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderNeuralBusMonitorPanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'neuralBusMonitor',
      label: 'NeuralBus Channel Monitor',
      render: SageCraftAscendant.OperatorConsole.renderNeuralBusMonitorPanel
    });
  } else {
    console.warn("⚠️ NeuralBus Channel Monitor panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerNeuralBusMonitorPanel, 100);
  } else {
    registerNeuralBusMonitorPanel();
  }
});
