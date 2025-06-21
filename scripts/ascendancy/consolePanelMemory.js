// 🧠 Console Panel Memory Module
// Responsible for tracking visibility, content, and usage stats of each console panel

export const ConsolePanelMemory = (() => {
  const panelStates = {};

  const registerPanel = (id) => {
    if (!panelStates[id]) {
      panelStates[id] = {
        visible: false,
        contentHash: '',
        lastActive: null
      };
    }
  };

  const updatePanelState = (id, visible, content = '') => {
    if (!panelStates[id]) return;

    panelStates[id].visible = visible;
    panelStates[id].contentHash = hashContent(content);
    panelStates[id].lastActive = new Date().toISOString();
  };

  const hashContent = (content) => {
    let hash = 0, i, chr;
    if (content.length === 0) return hash;
    for (i = 0; i < content.length; i++) {
      chr   = content.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };

  const getPanelMemory = (id) => panelStates[id] || null;

  const dumpAllMemory = () => ({ ...panelStates });

  const getTerminalPanels = () => Object.keys(panelStates);

  const updatePanelPosition = (id, position) => {
    if (panelStates[id]) {
      panelStates[id].position = position;
      panelStates[id].lastUpdated = new Date().toISOString();
    }
  };

  return {
    registerPanel,
    updatePanelState,
    getPanelMemory,
    dumpAllMemory,
    getTerminalPanels,
    updatePanelPosition
  };
})();

export const knownConsoleIds = [
  'countConsole',
  'deltaAnalyzerConsole',
  'reportingHubConsole',
  'sessionManagerConsole',
  'utilityHubConsole',
  'oracleConsole',
  'whispererConsole',
  'sageFeedConsole',
  'grimoireConsole',
  'exceptionManagerConsole',
  'progressDashboardConsole',
  'masterExportHubConsole',
  'mappingsConsole',
  'toolsConsole',
  'auditConsole'
];

export const updatePanelPosition = ConsolePanelMemory.updatePanelPosition;