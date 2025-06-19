

import { whenReady } from '../core/utils/readyTools.js';

function registerForecastCortexPanel() {
  const registry = SageCraftAscendant?.OperatorConsoleRegistry;
  const renderer = SageCraftAscendant?.OperatorConsole?.renderForecastCortexPanel;

  if (registry && typeof registry.registerPanel === 'function' && typeof renderer === 'function') {
    registry.registerPanel({
      id: 'forecastCortex',
      label: 'Forecast Cortex',
      render: renderer
    });
    console.log("✅ Forecast Cortex Panel registered.");
  } else {
    console.warn("⏳ Waiting for OperatorConsoleRegistry or renderer...");
    setTimeout(registerForecastCortexPanel, 500);
  }
}

whenReady(registerForecastCortexPanel);