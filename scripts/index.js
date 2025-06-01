import { createToast, updateMapStatusDisplay, restoreFocusToEntry, setupMoreOptionsToggle, updateLiveTable } from './ui.js';
import { initAudit } from './audit.js';
import './scan.js';
import { initESL } from './esl.js';
import { initSessionTools } from './session.js';
import './events.js';
import { renderTrendChart, setupTrendModalToggle } from './charts.js';
import { setupReportButton, setupTemplateExportButton } from './report.js';

console.log("✅ index.js is running");

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM fully loaded, initializing modules...');


  initAudit();
  initScan();
  initESL();
  initSessionTools();

  setupTrendModalToggle();
  renderTrendChart(window.weeklyCounts || {});
  setupReportButton();
  setupMoreOptionsToggle();
  setupTemplateExportButton();
});