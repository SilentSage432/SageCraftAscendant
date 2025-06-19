import { whenReady } from '../core/utils/readyTools.js';

function registerForecastPerformancePanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderForecastPerformancePanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'forecastPerformance',
      label: 'Forecast Performance',
      render: SageCraftAscendant.OperatorConsole.renderForecastPerformancePanel
    });
  } else {
    console.warn("⚠️ Forecast Performance panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerForecastPerformancePanel, 100);
  } else {
    registerForecastPerformancePanel();
  }
});
