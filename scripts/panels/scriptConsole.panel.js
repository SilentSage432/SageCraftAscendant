import { whenReady } from '../core/utils/readyTools.js';

function registerScriptConsolePanel() {
  if (
    typeof SageCraftAscendant !== 'undefined' &&
    SageCraftAscendant.OperatorConsoleRegistry &&
    typeof SageCraftAscendant.OperatorConsoleRegistry.registerPanel === 'function' &&
    SageCraftAscendant.OperatorConsole &&
    typeof SageCraftAscendant.OperatorConsole.renderScriptConsolePanel === 'function'
  ) {
    SageCraftAscendant.OperatorConsoleRegistry.registerPanel({
      id: 'scriptConsole',
      label: 'Operator Script Console',
      render: SageCraftAscendant.OperatorConsole.renderScriptConsolePanel
    });
    console.log("✅ Script Console panel registered successfully.");

    // Patch runScript button to detect #emit: lines and relay messages to SovereignBus
    setTimeout(() => {
      const runBtn = document.querySelector('#runScript');
      const input = document.querySelector('#scriptInput');

      if (input && input.parentElement) {
        const output = document.createElement('div');
        output.id = 'scriptOutput';
        output.className = 'outputMirror';
        output.style.cssText = 'margin-top: 12px; background: #111; color: #0f0; padding: 8px; height: 150px; overflow-y: auto; font-family: monospace; font-size: 12px;';
        input.parentElement.appendChild(output);

        const originalLog = console.log;
        console.log = function (...args) {
          const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
          const line = document.createElement('div');
          line.textContent = '🟢 ' + msg;
          output.appendChild(line);
          output.scrollTop = output.scrollHeight;
          originalLog.apply(console, args);
        };

        const originalError = console.error;
        console.error = function (...args) {
          const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
          const line = document.createElement('div');
          line.textContent = '🔴 ' + msg;
          output.appendChild(line);
          output.scrollTop = output.scrollHeight;
          originalError.apply(console, args);
        };

        if (runBtn && input) {
          runBtn.onclick = () => {
            const script = input.value.trim();

            if (script.startsWith('#emit:')) {
              const [_, channelLine, ...rest] = script.split('\n');
              const channel = script.match(/#emit:(\w+)/)?.[1];
              try {
                const payload = JSON.parse(rest.join('\n'));
                if (window.SovereignBus && typeof SovereignBus.emit === 'function') {
                  SovereignBus.emit(channel, payload);
                  console.log(`📡 Emitted via SovereignBus → ${channel}`, payload);
                } else {
                  console.warn("⚠️ SovereignBus not available.");
                }
              } catch (e) {
                console.error("❌ Failed to parse payload:", e);
              }
            } else {
              try {
                eval(script);
              } catch (err) {
                console.error("❌ Script error:", err);
              }
            }
          };
        }
      } else {
        console.warn("⚠️ scriptInput or its parent element not found. Output mirror not attached.");
        return;
      }
    }, 500);
  } else {
    console.warn("⚠️ Script Console panel not registered: missing registry or render function.");
  }
}

function waitForRegisterScriptConsolePanel() {
  if (
    typeof SageCraftAscendant?.OperatorConsoleRegistry?.registerPanel === 'function' &&
    typeof SageCraftAscendant?.OperatorConsole?.renderScriptConsolePanel === 'function'
  ) {
    registerScriptConsolePanel();
  } else {
    setTimeout(waitForRegisterScriptConsolePanel, 100);
  }
}

whenReady(() => {
  waitForRegisterScriptConsolePanel();
});
