// snapPinDefender.js
const panelsToProtect = [
  'forecastConsole',
  'pulseMonitorConsole',
  'exceptionManagerConsole',
  'oracle',
  'sageTerminal',
  'loreEngineConsole',
  'auditConsole',
  'sigilEditPanel-2',
  'sigilRenderConsole',
  'progressDashboardConsole',
  'masterExportHubConsole',
  'mappingsConsole',
  'toolsConsole',
  'configPanelConsole',
  'countConsole',
  'deltaAnalyzerConsole',
  'reportingHubConsole',
  'sessionManagerConsole',
  'utilityHubConsole',
  'oracleConsole',
  'whispererConsole',
  'sageFeedConsole',
  'grimoireConsole'
];

const defenderObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const el = mutation.target;
      const id = el.id;
      const classList = el.classList;

      if (panelsToProtect.includes(id)) {
        if (!classList.contains('snap-pinned')) {
          classList.add('snap-pinned');
          console.warn(`🛡️ snap-pinned restored ➤ #${id}`);
        }
      }
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  panelsToProtect.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      defenderObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
      if (!el.classList.contains('snap-pinned')) {
        el.classList.add('snap-pinned');
        console.log(`📌 snap-pinned ENFORCED on load ➤ #${id}`);
      }
    } else {
      console.warn(`⚠️ Missing panel ➤ #${id}`);
    }
  });

  console.log("🛡️ snapPinDefender.js active — monitoring and reinforcing snap-pinned");
});