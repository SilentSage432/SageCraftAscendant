import { createToast, updateMapStatusDisplay, restoreFocusToEntry } from './ui.js';
import { initAudit } from './audit.js';
import { initDropbox } from './dropbox.js';
import { initScan } from './scan.js';
import { initESL } from './esl.js';
import { initSessionTools } from './session.js';
import { initEventListeners } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
  initAudit();
  initDropbox();
  initScan();
  initESL();
  initSessionTools();
  initEventListeners();

  window.liveCounts = window.liveCounts || {};
  window.updateLiveTable = window.updateLiveTable || function () {
    console.warn('⚠️ updateLiveTable function is not yet defined.');
  };
});