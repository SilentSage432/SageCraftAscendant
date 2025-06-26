

// 🧿 sovereignPanelDirective.js
// Master list controlling which panels are allowed to render on system startup.

export const SovereignPanelDirectives = {
  allow: [
    'sovereignTerminal',
    'neuralPulseConsole',
    'agentLifecycleConsole',
    'countConsole',
    'deltaAnalyzerConsole',
    'sessionManagerConsole'
  ],
  deny: [
    'exceptionManagerConsole',
    'progressDashboardConsole',
    'masterExportHubConsole',
    'mappingsConsole',
    'toolsConsole',
    'auditConsole',
    'configPanelConsole',
    'oracleConsole',
    'whispererConsole',
    'loreEngineConsole'
  ]
};

// Optional: Utility to check if a panel is allowed
export function isPanelAllowed(panelId) {
  return SovereignPanelDirectives.allow.includes(panelId);
}

export const startupPanelPermissions = SovereignPanelDirectives.allow;