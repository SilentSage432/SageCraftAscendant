// Phase 351.4 — Panel Dock Binder
// Rebinds each console panel to its appropriate dock node on resurrection.

export function bindPanelsToDock() {
  console.groupCollapsed('%c📎 Panel Dock Binding Activated', 'color: lime; font-weight: bold;');
  
  const panelMap = {
    'countConsole': 'dockGrid',
    'deltaAnalyzerConsole': 'dockGrid',
    'reportingHubConsole': 'dockGrid',
    'sessionManagerConsole': 'dockGrid',
    'utilityHubConsole': 'dockGrid',
    'oracleConsole': 'dockGrid',
    'whispererConsole': 'dockGrid',
    'sageFeedConsole': 'dockGrid',
    'grimoireConsole': 'dockGrid'
  };

  Object.entries(panelMap).forEach(([panelId, dockId]) => {
    const panel = document.getElementById(panelId);
    const dock = document.getElementById(dockId);
    if (panel && dock) {
      dock.appendChild(panel);
      console.log(`✔️ Bound ${panelId} to ${dockId}`);
    } else {
      console.warn(`⚠️ Missing panel or dock: ${panelId}, ${dockId}`);
    }
  });

  console.groupEnd();
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  bindPanelsToDock();
});

export { bindPanelsToDock as rebindConsoleToGroup };
