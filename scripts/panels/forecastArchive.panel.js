import { whenReady } from '../core/utils/readyTools.js';

function registerForecastArchivePanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderForecastArchivePanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'forecastArchive',
      label: 'Forecast Data Archive',
      render: SageCraftAscendant.OperatorConsole.renderForecastArchivePanel
    });
  } else {
    console.warn("⚠️ Forecast Archive panel not registered: missing registry or render function.");
  }
}

whenReady(() => {
  if (typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel !== 'function') {
    setTimeout(registerForecastArchivePanel, 100);
  } else {
    registerForecastArchivePanel();
  }
});
