

// === SageCraft Ascendant: Phase 11.0 — Neural Event Logger & Temporal Recorder ===

window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.NeuralEventLogger = (function () {

  const _eventLog = [];

  function logEvent(type, detail, metadata = {}) {
    const timestamp = new Date().toISOString();
    const entry = {
      timestamp,
      type,
      detail,
      metadata
    };
    _eventLog.push(entry);
    console.log(`📝 Event Logged: [${type}] ${detail}`, entry);
  }

  function getLog() {
    return [..._eventLog];
  }

  function clearLog() {
    _eventLog.length = 0;
    console.warn("⚠ Neural Event Log cleared.");
  }

  function exportLog() {
    return JSON.stringify(_eventLog, null, 2);
  }

  return {
    logEvent,
    getLog,
    clearLog,
    exportLog
  };

})();