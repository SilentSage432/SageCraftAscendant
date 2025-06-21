// forecastMatrixSync.js
// Phase 350.4 — Neural Forecast Matrix Sync Check

const ForecastMatrixSync = (() => {
  const forecastIds = [
    'forecastConsole',
    'forecastConsole-duplicate-2',
    'forecastConsole-duplicate-3'
  ];

  const validateForecastPanels = () => {
    forecastIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        console.log(`[✅] Forecast Matrix Found: ${id}`);
        el.classList.remove('orphaned', 'ghost');
        el.classList.add('matrix-synced');
      } else {
        console.warn(`[⚠️] Forecast Matrix Missing: ${id}`);
      }
    });
  };

  const bindForecastDataBridge = () => {
    forecastIds.forEach(id => {
      const panel = document.getElementById(id);
      if (panel) {
        const dataSocket = panel.querySelector('.forecast-socket');
        if (dataSocket) {
          dataSocket.textContent = '🔗 Synced to Live Mesh Feed';
          dataSocket.classList.add('bridge-active');
          console.log(`[🔄] Data bridge active on: ${id}`);
        }
      }
    });
  };

  const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🔍 Forecast Matrix Sync Check Initialized');
      validateForecastPanels();
      bindForecastDataBridge();
    });
  };

  return {
    init
  };
})();

ForecastMatrixSync.init();

// Phase 351.0 — Console Reindex & Identity Mapping
const ConsoleReindexer = (() => {
  const reindexConsoles = () => {
    const allConsoles = document.querySelectorAll('.holo-console');
    let index = 1;

    allConsoles.forEach(consoleEl => {
      const newId = `console-unit-${index}`;
      consoleEl.setAttribute('data-console-id', newId);
      consoleEl.classList.add('indexed-console');
      console.log(`[🧬] Console Indexed: ${newId}`);
      index++;
    });
  };

  const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🔢 Console Reindexer Activated');
      reindexConsoles();
    });
  };

  return {
    init
  };
})();

ConsoleReindexer.init();

// Phase 351.1 — Console ID Diagnostic Overlay Injection
const ConsoleOverlayDiagnostics = (() => {
  const injectOverlays = () => {
    const consoles = document.querySelectorAll('.holo-console.indexed-console');

    consoles.forEach(consoleEl => {
      const id = consoleEl.getAttribute('data-console-id');
      if (!consoleEl.querySelector('.console-id-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'console-id-overlay';
        overlay.textContent = `🧭 ${id}`;
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.right = '0';
        overlay.style.background = 'rgba(0,0,0,0.7)';
        overlay.style.color = 'lime';
        overlay.style.fontSize = '10px';
        overlay.style.padding = '2px 4px';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none';
        consoleEl.appendChild(overlay);
        console.log(`[🔍] Overlay injected for: ${id}`);
      }
    });
  };

  const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('📊 Console Overlay Diagnostics Activated');
      injectOverlays();
    });
  };

  return {
    init
  };
})();

ConsoleOverlayDiagnostics.init();

// Phase 351.2 — Indexed Console Focus Highlighter
const ConsoleFocusHighlighter = (() => {
  const highlightOnHover = () => {
    const consoles = document.querySelectorAll('.holo-console.indexed-console');

    consoles.forEach(consoleEl => {
      consoleEl.addEventListener('mouseenter', () => {
        consoleEl.style.outline = '2px solid gold';
        consoleEl.style.boxShadow = '0 0 10px gold';
      });

      consoleEl.addEventListener('mouseleave', () => {
        consoleEl.style.outline = '';
        consoleEl.style.boxShadow = '';
      });
    });
  };

  const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('🌟 Console Focus Highlighter Enabled');
      highlightOnHover();
    });
  };

  return {
    init
  };
})();

ConsoleFocusHighlighter.init();

// Phase 351.3 — Console Activation Ping Pulse
const ConsolePingPulse = (() => {
  const pulseConsoles = () => {
    const consoles = document.querySelectorAll('.holo-console.indexed-console');
    
    consoles.forEach(consoleEl => {
      const pulse = document.createElement('div');
      pulse.className = 'console-ping';
      pulse.style.position = 'absolute';
      pulse.style.bottom = '4px';
      pulse.style.left = '4px';
      pulse.style.width = '6px';
      pulse.style.height = '6px';
      pulse.style.borderRadius = '50%';
      pulse.style.background = 'lime';
      pulse.style.boxShadow = '0 0 6px lime';
      pulse.style.animation = 'ping-fade 2s infinite ease-in-out';
      pulse.style.zIndex = '9998';
      pulse.style.pointerEvents = 'none';

      if (!consoleEl.querySelector('.console-ping')) {
        consoleEl.appendChild(pulse);
      }
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes ping-fade {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.6); }
        100% { opacity: 0; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  };

  const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('📡 Console Activation Ping Pulse Enabled');
      pulseConsoles();
    });
  };

  return {
    init
  };
})();

ConsolePingPulse.init();
