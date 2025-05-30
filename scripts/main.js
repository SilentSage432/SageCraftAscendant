  // --- Clean Empty Sessions Button ---
  const cleanStaleSessionsBtn = document.getElementById('cleanStaleSessions');
  if (cleanStaleSessionsBtn) {
    cleanStaleSessionsBtn.addEventListener('click', () => {
      let deletedCount = 0;
      for (let key in localStorage) {
        if (key.startsWith('inventorySession_')) {
          try {
            const session = JSON.parse(localStorage.getItem(key));
            const isEmpty =
              session &&
              typeof session === 'object' &&
              Object.keys(session.liveCounts || {}).length === 0 &&
              (!session.onHandText || session.onHandText.trim() === "");

            if (isEmpty) {
              localStorage.removeItem(key);
              deletedCount++;
            }
          } catch (e) {
            console.warn(`⚠️ Skipped corrupt session: ${key}`);
          }
        }
      }
      alert(`🧼 Removed ${deletedCount} empty session(s) from local storage.`);
    });
  }


// --- Chart.js (Trends) integration: ensure Chart.js is available ---
// If Chart.js is not included via HTML, add it here for completeness (for developer reference):
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// If this is not in your HTML, add it to your HTML <head> or before your script.js is loaded.
// Or, if you want to dynamically inject it, you could do:

let liveCounts = window.liveCounts || {};

  // --- Sync/Restore ESL Map to Dropbox Buttons ---
  // Ensure settingsTarget is defined and present
  let settingsTarget = document.querySelector('#tools .settings-group');
  if (!settingsTarget) {
    settingsTarget = document.createElement('div');
    settingsTarget.className = 'settings-group';
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.appendChild(settingsTarget);
    } else {
      console.warn("⚠️ #tools section not found in DOM. Cannot append settings group.");
    }
  }

  // --- FOLDER SELECT DROPDOWN FOR DROPBOX MAP RESTORE ---
  // Insert above Dropbox restore buttons
  const folderSelect = document.createElement('select');
  folderSelect.id = 'dropboxFolderSelect';
  folderSelect.style.marginTop = '10px';
  folderSelect.style.padding = '6px';
  folderSelect.style.fontSize = '14px';
  ['/beta-test-1', '/beta-archive-legacy'].forEach(folder => {
    const option = document.createElement('option');
    option.value = folder;
    option.textContent = folder;
    folderSelect.appendChild(option);
  });
  // Insert before Dropbox restore buttons if possible, else at end of settingsTarget
  // Try to insert before restoreBothBtn if it exists later, else just append now
  settingsTarget.appendChild(folderSelect);

  // Add Sync ESL Map to Dropbox button
  const syncESLBtn = document.createElement('button');
  syncESLBtn.className = 'settings-button';
  syncESLBtn.textContent = '🔄 Sync ESL Map to Dropbox';
  syncESLBtn.style.marginTop = '8px';
  syncESLBtn.onclick = async () => {
    const blob = new Blob([JSON.stringify(eslToUPC, null, 2)], { type: 'application/json' });
    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: '/beta-test-1/esl_map_backup.json',
          mode: 'overwrite',
          autorename: false,
          mute: true
        })
      },
      body: blob
    });
    if (response.ok) {
      alert('✅ ESL map synced to Dropbox!');
    } else {
      const err = await response.text();
      alert(`❌ Failed to sync ESL map: ${err}`);
    }
  };
  settingsTarget.appendChild(syncESLBtn);

  // --- Mapping Stats Display ---
  const mappingStats = document.createElement('div');
  mappingStats.id = 'mappingStatsDisplay';
  mappingStats.style.marginTop = '10px';
  mappingStats.style.fontSize = '13px';
  mappingStats.style.color = '#aaa';
  mappingStats.innerHTML = `
    <strong>Mapping Overview:</strong><br>
    UPC → Item #: ${Object.keys(upcToItem).length}<br>
    ESL → UPC: ${Object.keys(eslToUPC).length}<br>
    Location Codes: ${Object.keys(locationMap).length}
  `;
  settingsTarget.appendChild(mappingStats);
  // --- Insert Map Status Display ---
  const mapStatusDisplay = document.createElement('div');
  mapStatusDisplay.id = 'mapStatusDisplay';
  mapStatusDisplay.style.marginTop = '8px';
  mapStatusDisplay.style.fontSize = '13px';
  mapStatusDisplay.style.color = '#aaf';
  mapStatusDisplay.textContent = '🧠 Map Status: Loading...';
  settingsTarget?.appendChild(mapStatusDisplay);
  updateMapStatusDisplay();

  // Add Restore ESL Map from Dropbox button
  const restoreESLBtn = document.createElement('button');
  restoreESLBtn.className = 'settings-button';
  restoreESLBtn.textContent = '📥 Restore ESL Map from Dropbox';
  restoreESLBtn.style.marginTop = '8px';
  restoreESLBtn.onclick = async () => {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Dropbox-API-Arg': JSON.stringify({ path: '/esl_map_backup.json' })
      }
    });

    if (!response.ok) {
      const err = await response.text();
      alert(`❌ Failed to restore ESL map: ${err}`);
      return;
    }

    const map = await response.json();
    if (!map || typeof map !== 'object') {
      alert('❌ Invalid ESL map format.');
      return;
    }

    Object.assign(eslToUPC, map);
    saveESLMap();
    alert('✅ ESL map restored from Dropbox!');
  };
  settingsTarget.appendChild(restoreESLBtn);
let lastScannedLocationCode = '';
import {
    upcToItem,
    locationMap,
    eslToUPC,
    normalizeUPC,
    updateMapStatusDisplay
} from './scripts/maps.js';

import { saveUPCMap, saveESLMap, saveLocationMap } from './scripts/session.js';

  import {
    refreshAccessToken,
    getDropboxAccessToken,
    saveSessionToDropbox,
    loadSessionFromDropbox,
    beginDropboxLogin,
    handleDropboxCallback
  } from './scripts/dropbox.js';

  import { setupESLHandlers, setCurrentESLItem } from './scripts/esl.js';

import { resolveScanCode } from './scripts/scan.js';

  import { generateCodeVerifier, generateCodeChallenge } from './pkce.js';


// --- updateRotationDate helper ---
function updateRotationDate(category) {
  const now = new Date();
  const rotationData = JSON.parse(localStorage.getItem('auditRotation')) || {};

  const extendedCategories = ['Fridges & Freezers', 'Wall Ovens', 'Cooktops'];
  const intervalDays = extendedCategories.includes(category) ? 30 : 14;

  rotationData[category] = {
    date: now.toISOString(),
    interval: intervalDays
  };

  localStorage.setItem('auditRotation', JSON.stringify(rotationData));
  console.log(`🔁 Updated rotation date for "${category}" (Interval: ${intervalDays} days)`);
}

document.addEventListener('DOMContentLoaded', () => {

  // --- Render Audit Rotation Table ---
  function renderAuditRotationTable() {
    const table = document.querySelector('#audit table');
    if (!table) return;
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const rotationData = JSON.parse(localStorage.getItem('auditRotation')) || {};
    const now = new Date();

   Object.entries(rotationData).forEach(([category, info]) => {
      const row = document.createElement('tr');
      const interval = info.interval || 30;
      // --- Updated date/next due logic ---
      const lastDate = new Date(info.date);
      const isValid = !isNaN(lastDate.getTime());
      const lastAuditedText = isValid ? lastDate.toLocaleDateString() : 'Not Set';
      const nextDue = isValid ? new Date(lastDate.getTime() + interval * 86400000) : null;
      const nextDueText = nextDue ? nextDue.toLocaleDateString() : 'N/A';

      // --- Insert badge based on audit status ---
      let badge = '';
      if (!isValid) {
        badge = '❓';
      } else {
        const daysAgo = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
        if (daysAgo >= interval) badge = '🔴';
        else if (daysAgo >= interval * 0.75) badge = '🟡';
        else badge = '🟢';
      }

      let status = '🟢 Good';
      if (isValid) {
        const daysAgo = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
        if (daysAgo >= interval) status = '🔴 Overdue';
        else if (daysAgo >= interval * 0.75) status = '🟡 Soon';
      } else {
        status = '❓ Unknown';
      }

      // --- Updated row cell logic with badge in Last Audited column ---
      [category, `${lastAuditedText} ${badge}`, nextDueText, status].forEach(val => {
        const td = document.createElement('td');
        td.textContent = val;
        row.appendChild(td);
      });

      tbody.appendChild(row);
    });
  }
  // --- Attach event listeners for Local Session Tools, Mapping Management, and Advanced Tools buttons ---
  const localSessionTools = [
    { id: 'saveSessionVault', action: () => console.log('💾 Save Session button clicked') },
    { id: 'loadSession', action: () => console.log('📥 Load Session button clicked') }
  ];

  const mappingManagementTools = [
    { id: 'exportUPCBtn', action: () => console.log('📤 Export UPC Mappings button clicked') },
    { id: 'importUPCBtn', action: () => console.log('📥 Import UPC Mappings button clicked') },
    { id: 'exportBtn', action: () => console.log('📤 Export Bay Locations button clicked') },
    { id: 'importBtn', action: () => console.log('📥 Import Bay Locations button clicked') }
  ];

  const advancedTools = [
    { id: 'mergeReport', action: () => console.log('🧩 Merge Master Report button clicked') }
  ];

  [...localSessionTools, ...mappingManagementTools, ...advancedTools].forEach(({ id, action }) => {
    const btn = document.getElementById(id);
    if (btn && !btn.onclick && btn.getAttribute('listener-attached') !== 'true') {
      btn.addEventListener('click', action);
      btn.setAttribute('listener-attached', 'true');
    }
  });
  // --- Collapsible dropdown logic ---

  // --- Trends Modal Button Logic ---
  const viewTrendsBtn = document.getElementById('viewTrends');
  if (viewTrendsBtn) {
    viewTrendsBtn.addEventListener('click', () => {
      console.log("📈 View Trends button clicked");
      const modal = document.getElementById('trendsModal');
      if (modal) {
        modal.classList.remove('hidden');

        const container = document.getElementById('trendChartContainer');
        if (container) {
          container.innerHTML = '<canvas id="trendChart"></canvas>';
          renderTrendChart();
        }
      } else {
        console.warn("❌ trendsModal not found in DOM");
      }
    });
  }
  document.querySelectorAll('.collapsible-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      if (content && content.classList.contains('collapsible-content')) {
        const isHidden = content.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(!isHidden));
        content.setAttribute('aria-hidden', String(isHidden));
      }
    });
  });
  // --- Dropbox OAuth2 PKCE Integration ---
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    handleDropboxCallback(); // Handle redirect after Dropbox login
  }

  console.log("✅ DOMContentLoaded fired and script.js is active");
  renderAuditRotationTable();

  // --- Audit Reminder Toast on App Load (once per session) ---
  const rotationDataToasted = sessionStorage.getItem('rotationReminderShown');
  if (!rotationDataToasted) {
    const rotationData = JSON.parse(localStorage.getItem('auditRotation')) || {};
    const now = new Date();
    const dueSoon = [];

    Object.entries(rotationData).forEach(([category, info]) => {
      const lastDate = new Date(info.date);
      const interval = info.interval || 30;
      const daysAgo = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

      if (daysAgo >= interval) {
        dueSoon.push(`🔴 ${category} is overdue`);
      } else if (daysAgo >= interval * 0.75) {
        dueSoon.push(`🟡 ${category} due soon`);
      }
    });

    if (dueSoon.length > 0) {
      const toast = document.createElement('div');
      toast.innerHTML = dueSoon.join('<br>') + `<br><em>Click for details</em>`;
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.backgroundColor = '#222';
      toast.style.color = '#fff';
      toast.style.padding = '10px 18px';
      toast.style.borderRadius = '8px';
      toast.style.fontSize = '14px';
      toast.style.zIndex = '9999';
      toast.style.textAlign = 'center';
      toast.style.cursor = 'pointer';
      document.body.appendChild(toast);

      toast.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style = `
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0,0,0,0.7); display: flex;
          justify-content: center; align-items: center; z-index: 10000;
        `;
        modal.innerHTML = `
          <div style="background: #fff; padding: 20px; border-radius: 10px; max-width: 400px; text-align: center;">
            <h3>📋 Audit Due</h3>
            <p>${dueSoon.join('<br>')}</p>
            <button id="goAuditBtn">🔍 Go to Audit</button>
          </div>
        `;
        modal.onclick = e => {
          if (e.target === modal) document.body.removeChild(modal);
        };
        document.body.appendChild(modal);
        document.getElementById('goAuditBtn').onclick = () => {
          document.body.removeChild(modal);
          window.location.hash = '#audit';
          renderAuditRotationTable();
        };
      });

      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 8000);
    }

    sessionStorage.setItem('rotationReminderShown', 'true');
  }

  // --- Refresh Audit Log Button ---
  const refreshAuditLogBtn = document.getElementById('refreshAuditLog');
  if (refreshAuditLogBtn) {
    refreshAuditLogBtn.addEventListener('click', () => {
      renderAuditRotationTable();

      const toast = document.createElement('div');
      toast.textContent = '✅ Audit Log Refreshed';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.backgroundColor = '#222';
      toast.style.color = '#fff';
      toast.style.padding = '10px 18px';
      toast.style.borderRadius = '8px';
      toast.style.fontSize = '14px';
      toast.style.zIndex = '9999';
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    });
  }
  // --- Update Audit Rotation Table on tab navigation ---
  document.querySelectorAll('.nav-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      if (targetId === 'audit') {
        renderAuditRotationTable();
      }
    });
  });
  // --- Ensure all critical button variables are defined after DOMContentLoaded begins ---
  const addLiveItemBtn = document.getElementById('addLiveItem');
  // Remove legacy Add Live Item button handler in favor of unified scan engine.
  const saveToDriveBtn = document.getElementById('saveToDrive');
  const loadFromDriveBtn = document.getElementById('loadFromDrive');


  // Clear Live Table button (Safe Clear logic)
  const clearLiveTableBtn = document.getElementById('clearLiveTable');
  if (clearLiveTableBtn) {
    clearLiveTableBtn.addEventListener('click', () => {
      const upcCount = Object.keys(upcToItem).length;
      const locCount = Object.keys(locationMap).length;

      if (upcCount === 0 || locCount === 0) {
        const proceed = confirm("⚠️ It looks like one or more maps haven't been restored from Dropbox.\nAre you sure you want to clear the current session?");
        if (!proceed) return;
      }

      console.log("🧹 Safe Clear: Live Table button clicked");
      Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
      liveEntryInput.value = '';
      updateLiveTable();
      updateSuggestions();
      summaryBar.innerHTML = '';
    });
  }

  // More Options (Advanced Controls) toggle
  const toggleAdvancedControls = document.getElementById('toggleAdvancedControls');
  const advancedControls = document.getElementById('advancedControls');
  if (toggleAdvancedControls && advancedControls) {
    toggleAdvancedControls.addEventListener('click', () => {
      console.log("⚙️ More Options button clicked");
      const isExpanded = toggleAdvancedControls.getAttribute('aria-expanded') === 'true';
      toggleAdvancedControls.setAttribute('aria-expanded', !isExpanded);
      advancedControls.classList.toggle('hidden');
      advancedControls.setAttribute('aria-hidden', isExpanded);
    });
  }
  // --- Audit critical buttons presence and listener hookup ---
  const criticalButtonIds = [
    'addLiveItem',
    'clearLiveTable',
    'uploadOnHandFile',
    'saveToDrive',
    'loadFromDrive',
    'clearHistoryBtn',
    'saveSessionVault',
    'loadSession',
    'downloadExcel',
    'authGoogleDrive',
    'mergeReport'
  ];
  criticalButtonIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      console.log(`✅ Button "${id}" found and ready`);
    } else {
      console.warn(`❌ Button "${id}" not found in DOM`);
    }
  });
  // --- Ensure all critical button listeners are present ---
  // Add missing event listeners for critical buttons if not already defined above
  // 1. addLiveItem
  if (!addLiveItemBtn) {
    const addLiveItemBtn2 = document.getElementById('addLiveItem');
    if (addLiveItemBtn2) {
      addLiveItemBtn2.addEventListener('click', () => {
        console.log('addLiveItem clicked!');
      });
    }
  }
  // 2. clearLiveTable (already handled above)
  // 3. uploadOnHandFile (handled above)
  // 4. saveToDrive
  if (!saveToDriveBtn) {
    const saveToDriveBtn2 = document.getElementById('saveToDrive');
    if (saveToDriveBtn2) {
      saveToDriveBtn2.addEventListener('click', () => {
        console.log('saveToDrive clicked!');
      });
    }
  }
  // 5. loadFromDrive
  if (!loadFromDriveBtn) {
    const loadFromDriveBtn2 = document.getElementById('loadFromDrive');
    if (loadFromDriveBtn2) {
      loadFromDriveBtn2.addEventListener('click', () => {
        console.log('loadFromDrive clicked!');
      });
    }
  }
  // 6. clearHistoryBtn (already handled above)
  // 7. saveSessionVault
  const saveSessionBtnCheck = document.getElementById('saveSessionVault');
  if (saveSessionBtnCheck && !saveSessionBtnCheck.onclick && saveSessionBtnCheck.getAttribute('listener-attached') !== 'true') {
    saveSessionBtnCheck.addEventListener('click', () => {
      console.log('saveSessionVault clicked!');
    });
    saveSessionBtnCheck.setAttribute('listener-attached', 'true');
  }
  // 8. loadSession
  const loadSessionBtnCheck = document.getElementById('loadSession');
  if (loadSessionBtnCheck && !loadSessionBtnCheck.onclick && loadSessionBtnCheck.getAttribute('listener-attached') !== 'true') {
    loadSessionBtnCheck.addEventListener('click', () => {
      console.log('loadSession clicked!');
    });
    loadSessionBtnCheck.setAttribute('listener-attached', 'true');
  }
  // 9. downloadExcel
  const downloadExcelBtn = document.getElementById('downloadExcel');
  if (downloadExcelBtn && !downloadExcelBtn.onclick && downloadExcelBtn.getAttribute('listener-attached') !== 'true') {
    downloadExcelBtn.addEventListener('click', () => {
      console.log('downloadExcel clicked!');
    });
    downloadExcelBtn.setAttribute('listener-attached', 'true');
  }
  // 10. authGoogleDrive
  const authGoogleDriveBtn = document.getElementById('authGoogleDrive');
  if (authGoogleDriveBtn && !authGoogleDriveBtn.onclick && authGoogleDriveBtn.getAttribute('listener-attached') !== 'true') {
    authGoogleDriveBtn.addEventListener('click', () => {
      console.log('authGoogleDrive clicked!');
    });
    authGoogleDriveBtn.setAttribute('listener-attached', 'true');
  }
  // --- Ensure global variables are declared at the top ---
  // (Other globals already declared inside block, e.g. weeklyCounts, upcToItem, locationMap)
  // --- New item sound and glow trigger ---
  const newItemSound = new Audio('sounds/mystic-ping.mp3');
  // Sound enabled flag from localStorage (default true)
  const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  function playNewItemSound() {
    if (!soundEnabled) return;
    newItemSound.currentTime = 0;
    newItemSound.play().catch(err => {
      console.warn("Sound error:", err);
    });
  }
  // --- Sound toggle in settings panel ---
  // Insert sound toggle checkbox into the first settings-group under #tools
  const soundToggleLabel = document.createElement('label');
  soundToggleLabel.innerHTML = `<input type="checkbox" id="soundToggle" /> Enable Scan Sound`;

  // Try to insert it into the first settings-group block under #tools
  const soundSettingsTarget = document.querySelector('#tools .settings-group');
  if (soundSettingsTarget) {
    soundSettingsTarget.appendChild(soundToggleLabel);
    const soundToggle = document.getElementById('soundToggle');
    soundToggle.checked = soundEnabled;
    soundToggle.addEventListener('change', (e) => {
      localStorage.setItem('soundEnabled', e.target.checked);
    });
  }

  // --- Backup All Data Button ---
  // Add a button to export all localStorage session and mapping data
  const backupBtn = document.createElement('button');
  backupBtn.className = 'settings-button';
  backupBtn.textContent = '📦 Backup All Data';
  backupBtn.style.marginTop = '15px';
  backupBtn.onclick = () => {
    const backup = {
      liveCounts,
      upcToItem,
      locationMap,
      weeklyCounts: JSON.parse(localStorage.getItem('weeklyCounts')) || {},
      rotationData: JSON.parse(localStorage.getItem('auditRotation')) || {},
      sessions: Object.fromEntries(
        Object.entries(localStorage).filter(([k]) => k.startsWith('inventorySession_'))
      )
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // Add it to the first settings group
  let settingsTarget = document.querySelector('#tools .settings-group');
  if (!settingsTarget) {
    settingsTarget = document.createElement('div');
    settingsTarget.className = 'settings-group';
    document.getElementById('tools')?.appendChild(settingsTarget);
  }
  if (settingsTarget) {
    settingsTarget.appendChild(backupBtn);
  }
  // --- Display Audit Rotation Table on #audit page/tab or on audit page load ---
  // Check for audit section: show table if #audit hash, or if pathname contains 'audit'
  if (
    (window.location.hash === '#audit' && settingsTarget) ||
    (window.location.pathname.includes('audit') && settingsTarget)
  ) {
    // If settingsTarget is not in the audit page, ensure one exists at the top of #audit section
    let auditSettingsTarget = settingsTarget;
    // Try to find #audit section
    let auditSection = document.getElementById('audit');
    if (window.location.pathname.includes('audit')) {
      // If not already under #audit, ensure settings group is present
      if (auditSection) {
        auditSettingsTarget = auditSection.querySelector('.settings-group');
        if (!auditSettingsTarget) {
          auditSettingsTarget = document.createElement('div');
          auditSettingsTarget.className = 'settings-group';
          // Insert at top of #audit section
          auditSection.insertBefore(auditSettingsTarget, auditSection.firstChild);
        }
      }
    }
    // Fallback to global settingsTarget if audit page not found
    if (!auditSettingsTarget) auditSettingsTarget = settingsTarget;

    const rotationTableTitle = document.createElement('h3');
    rotationTableTitle.textContent = '📅 Audit Rotation Log';
    rotationTableTitle.style.marginTop = '20px';

    const rotationTable = document.createElement('table');
    rotationTable.style.borderCollapse = 'collapse';
    rotationTable.style.width = '100%';
    rotationTable.style.marginTop = '8px';
    rotationTable.style.fontSize = '14px';

    const thead = rotationTable.createTHead();
    const headerRow = thead.insertRow();
    ['Category', 'Last Audited', 'Days Ago', 'Next Due'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      th.style.border = '1px solid #ccc';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f0f0f0';
      headerRow.appendChild(th);
    });

    const tbody = rotationTable.createTBody();
    const rotationData = JSON.parse(localStorage.getItem('auditRotation')) || {};

    Object.entries(rotationData).forEach(([category, info]) => {
      const lastDate = new Date(info.date);
      const interval = info.interval || 30;
      const now = new Date();
      const daysAgo = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

      // Add icon based on status
      let statusIcon = '';
      if (daysAgo >= interval) statusIcon = '🔴';
      else if (daysAgo >= interval * 0.75) statusIcon = '🟡';
      else statusIcon = '🟢';

      const row = tbody.insertRow();
      [category, lastDate.toLocaleString(), daysAgo + ' days ago'].forEach((text, i) => {
        const td = row.insertCell();
        td.textContent = `${text} ${i === 2 ? statusIcon : ''}`;
        td.style.border = '1px solid #ccc';
        td.style.padding = '6px';
        td.style.color = (i === 2 && daysAgo >= interval) ? 'red' : '';
      });
      // Add Next Due cell (4th column)
      const dueCell = row.insertCell();
      const nextDue = new Date(lastDate.getTime() + interval * 86400000);
      dueCell.textContent = nextDue.toLocaleDateString();
      dueCell.style.border = '1px solid #ccc';
      dueCell.style.padding = '6px';

      // Optional: Add a red background to overdue rows
      if (daysAgo >= interval) {
        row.style.backgroundColor = '#ffe6e6'; // light red
        row.style.fontWeight = 'bold';
      }
    });

    auditSettingsTarget.appendChild(rotationTableTitle);
    auditSettingsTarget.appendChild(rotationTable);
  }
  // --- Dropbox Integration for Save/Load Session ---


  // --- Auto-backup to Dropbox every X minutes ---
  function setupDropboxAutoBackup(intervalMinutes = 10) {
    if (!intervalMinutes || isNaN(intervalMinutes) || intervalMinutes < 1) intervalMinutes = 10;
    setInterval(async () => {
      const session = {
        liveCounts: JSON.parse(JSON.stringify(liveCounts)),
        upcToItem: JSON.parse(JSON.stringify(upcToItem)),
        onHandText: document.getElementById('onHandInput').value
      };
      const blob = new Blob([JSON.stringify(session)], { type: 'application/json' });

      fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getDropboxAccessToken()}`,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': JSON.stringify({
            path: `/beta-test-1/auto_backup_session_${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
            mode: 'add',
            autorename: true,
            mute: true
          })
        },
        body: blob
      }).then(response => {
        if (response.ok) {
          console.log(`📦 Auto-backup to Dropbox completed`);
        } else {
          response.text().then(err => {
            console.warn('❌ Auto-backup failed:', err);
          });
        }
      });
    }, intervalMinutes * 60 * 1000);
  }


  if (saveToDriveBtn) {
    saveToDriveBtn.addEventListener('click', saveSessionToDropbox);
  }
  if (loadFromDriveBtn) {
    loadFromDriveBtn.addEventListener('click', loadSessionFromDropbox);
  }

  // Add Dropbox Load Options Selector
  const loadOptionsBtn = document.createElement('button');
  loadOptionsBtn.textContent = '📂 Load Dropbox Session...';
  loadOptionsBtn.style.marginTop = '8px';
  loadOptionsBtn.onclick = async () => {
    const choice = prompt("Choose load option:\n1 - Load active_session.json\n2 - Load most recent auto-backup");
    if (choice === '2') {
      const listResponse = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getDropboxAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: '' })
      });

      const listData = await listResponse.json();
      const backups = listData.entries
        .filter(f => f.name.startsWith('auto_backup_session_') && f.name.endsWith('.json'))
        .sort((a, b) => new Date(b.client_modified) - new Date(a.client_modified));

      if (backups.length === 0) {
        alert('❌ No auto-backup files found.');
        return;
      }

      const newestFile = backups[0].path_lower;

      const dlResponse = await fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getDropboxAccessToken()}`,
          'Dropbox-API-Arg': JSON.stringify({ path: newestFile })
        }
      });

      if (!dlResponse.ok) {
        const err = await dlResponse.text();
        alert(`❌ Failed to load auto-backup: ${err}`);
        return;
      }

      const session = await dlResponse.json();
      if (!session.liveCounts) return alert('❌ Invalid backup format.');
      Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
      Object.entries(session.liveCounts).forEach(([k, v]) => {
        liveCounts[k] = { count: v.count, category: v.category, location: v.location };
      });
      document.getElementById('onHandInput').value = session.onHandText || '';
      updateLiveTable();
      alert('📥 Auto-backup session loaded!');
    } else {
      loadSessionFromDropbox();
    }
  };

  // --- Dropbox Backup Browser Modal Button ---
  // (injected after restoreUPCBtn below)

  // --- Dropbox OAuth2 PKCE Login Button ---
  const loginBtn = document.createElement('button');
  loginBtn.className = 'settings-button';
  loginBtn.textContent = '🔐 Connect Dropbox';
  loginBtn.onclick = beginDropboxLogin;
  settingsTarget?.appendChild(loginBtn);

  // --- Reset Dropbox Connection Button ---
  const resetDropboxBtn = document.createElement('button');
  resetDropboxBtn.className = 'settings-button';
  resetDropboxBtn.textContent = '🧹 Reset Dropbox Connection';
  resetDropboxBtn.style.marginTop = '8px';
  resetDropboxBtn.onclick = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('pkce_verifier');
    alert('🧹 Dropbox tokens cleared. Please reconnect.');
  };
  settingsTarget?.appendChild(resetDropboxBtn);

  // --- Restore UPC Map from Dropbox Button ---
  const restoreUPCBtn = document.createElement('button');
  restoreUPCBtn.className = 'settings-button';
  restoreUPCBtn.textContent = '🔄 Restore UPC Map from Dropbox';
  restoreUPCBtn.style.marginTop = '8px';
  restoreUPCBtn.onclick = async () => {
    const folder = document.getElementById('dropboxFolderSelect')?.value || '';
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Dropbox-API-Arg': JSON.stringify({ path: `${folder}/upc_map_backup.json` })
      }
    });

    if (!response.ok) {
      const err = await response.text();
      alert(`❌ Failed to restore UPC map: ${err}`);
      return;
    }

    const map = await response.json();
    if (!map || typeof map !== 'object') {
      alert('❌ Invalid UPC map format.');
      return;
    }

    Object.assign(upcToItem, map);
    saveUPCMap();
    alert('✅ UPC mappings restored from Dropbox!');
  };

  if (settingsTarget) settingsTarget.appendChild(restoreUPCBtn);

  // --- Dropbox Backup Browser Modal Button ---
  const browseBackupsBtn = document.createElement('button');
  browseBackupsBtn.className = 'settings-button';
  browseBackupsBtn.textContent = '📁 Browse Dropbox Backups';
  browseBackupsBtn.style.marginTop = '8px';
  browseBackupsBtn.onclick = async () => {
    const folder = document.getElementById('dropboxFolderSelect')?.value || '';
    const listResponse = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: folder })
    });

    const listData = await listResponse.json();
    const backups = listData.entries
      .filter(f => f.name.endsWith('.json'))
      .sort((a, b) => new Date(b.client_modified) - new Date(a.client_modified));

    if (backups.length === 0) {
      alert('❌ No backup files found in selected folder.');
      return;
    }

    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 9999;

    const content = document.createElement('div');
    content.style.background = '#fff';
    content.style.padding = '20px';
    content.style.borderRadius = '8px';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';

    const title = document.createElement('h3');
    title.textContent = `📁 Select a Backup File from ${folder}`;
    content.appendChild(title);

    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = 0;

    backups.forEach(file => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = `${file.name}`;
      btn.style.display = 'block';
      btn.style.margin = '4px 0';
      btn.onclick = async () => {
        const dlResponse = await fetch('https://content.dropboxapi.com/2/files/download', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${await getDropboxAccessToken()}`,
            'Dropbox-API-Arg': JSON.stringify({ path: file.path_lower })
          }
        });

        if (!dlResponse.ok) {
          const err = await dlResponse.text();
          alert(`❌ Failed to load backup: ${err}`);
          return;
        }

        const data = await dlResponse.json();

        if (file.name.includes('session') && data.liveCounts) {
          Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
          Object.entries(data.liveCounts).forEach(([k, v]) => {
            liveCounts[k] = { count: v.count, category: v.category, location: v.location };
          });
          document.getElementById('onHandInput').value = data.onHandText || '';
          updateLiveTable();
          alert(`📥 Session "${file.name}" loaded successfully!`);
        } else if (file.name.includes('upc_map') && typeof data === 'object') {
          Object.assign(upcToItem, data);
          saveUPCMap();
          alert(`📥 Restored UPC Map (${Object.keys(data).length} entries)`);
        } else if (file.name.includes('bay_location') && typeof data === 'object') {
          Object.assign(locationMap, data);
          saveLocationMap();
          alert(`📥 Restored Bay Location Map (${Object.keys(data).length} entries)`);
        } else if (file.name.includes('esl_map') && typeof data === 'object') {
          Object.assign(eslToUPC, data);
          saveESLMap();
          alert(`📥 Restored ESL Map (${Object.keys(data).length} entries)`);
        } else {
          alert(`❌ File "${file.name}" is not a recognized backup format.`);
          return;
        }

        document.body.removeChild(modal);
      };
      li.appendChild(btn);
      ul.appendChild(li);
    });

    content.appendChild(ul);
    modal.appendChild(content);
    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };

    document.body.appendChild(modal);
  };

  if (settingsTarget) settingsTarget.appendChild(browseBackupsBtn);

  // --- Sync & Backup Clean UPC Map to Dropbox Button ---
  const syncCleanUPCBtn = document.createElement('button');
  syncCleanUPCBtn.className = 'settings-button';
  syncCleanUPCBtn.textContent = '🧼 Sync & Backup Clean UPC Map to Dropbox';
  syncCleanUPCBtn.style.marginTop = '8px';
  syncCleanUPCBtn.onclick = async () => {
    const cleaned = {};
    for (const key in upcToItem) {
      const cleanedKey = key.trim();
      const value = upcToItem[key].trim();
      if (cleanedKey && value) {
        cleaned[cleanedKey] = value;
      }
    }
    const blob = new Blob([JSON.stringify(cleaned, null, 2)], { type: 'application/json' });

    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: '/beta-test-1/upc_map_backup.json',
          mode: 'overwrite',
          autorename: false,
          mute: true
        })
      },
      body: blob
    });

    if (response.ok) {
      alert('✅ Clean UPC map saved to Dropbox!');
    } else {
      const err = await response.text();
      alert(`❌ Failed to save clean UPC map: ${err}`);
    }
  };

syncBothBtn = document.createElement('button');
syncBothBtn.className = 'settings-button';
syncBothBtn.textContent = '🔄 Sync All Maps to Dropbox';
syncBothBtn.style.marginTop = '8px';
syncBothBtn.addEventListener('click', () => {
  console.log('🔄 Sync All Maps button clicked');
  syncAllMapsToDropbox(false);
});

  // --- Restore Both Maps from Dropbox Button ---
  const restoreBothBtn = document.createElement('button');
  restoreBothBtn.className = 'settings-button';
  restoreBothBtn.textContent = '📥 Restore All Maps from Dropbox';
  restoreBothBtn.style.marginTop = '8px';
  restoreBothBtn.onclick = async () => {
    console.log('📥 Restore All Maps button clicked');
    console.log('🧪 Checking syncAllMapsToDropbox reference:', typeof syncAllMapsToDropbox);

    // Show toast indicator for start of restore
    const toast = document.createElement('div');
    toast.textContent = '⏳ Restoring maps from Dropbox...';
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#444',
      color: '#fff',
      padding: '10px 18px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: '9999',
      textAlign: 'center'
    });
    document.body.appendChild(toast);

    // Helper for fetching and parsing JSON from Dropbox
    const restore = async (path) => {
      const response = await fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getDropboxAccessToken()}`,
          'Dropbox-API-Arg': JSON.stringify({ path })
        }
      });
      if (!response.ok) {
        console.warn(`❌ Failed to fetch ${path}:`, response.status);
        return null;
      }
      try {
        return await response.json();
      } catch (err) {
        console.warn(`❌ Failed to parse JSON from ${path}:`, err);
        return null;
      }
    };

    // Use selected folder from dropdown
    const folder = document.getElementById('dropboxFolderSelect')?.value || '';

    // Fetch all three maps
    const restoredUPC = await restore(`${folder}/upc_map_backup.json`);
    const restoredLoc = await restore(`${folder}/bay_location_backup.json`);
    const restoredESL = await restore(`${folder}/esl_map_backup.json`);

    // Correctly assign and save each map if valid
    let upcOK = false, locOK = false, eslOK = false;
    if (restoredUPC && typeof restoredUPC === 'object') {
      Object.assign(upcToItem, restoredUPC);
      saveUPCMap();
      upcOK = true;
    }

    if (restoredLoc && typeof restoredLoc === 'object') {
      Object.assign(locationMap, restoredLoc);
      saveLocationMap();
      locOK = true;
    }

    if (restoredESL && typeof restoredESL === 'object') {
      Object.assign(eslToUPC, restoredESL);
      saveESLMap();
      eslOK = true;
    }

    // Debug log after restore attempts
    console.log('✅ Restore attempt complete:', { upcOK, locOK, eslOK });

    // Remove loading toast and show result
    setTimeout(() => {
      if (document.body.contains(toast)) document.body.removeChild(toast);
      const finalToast = document.createElement('div');
      finalToast.textContent = (upcOK && locOK && eslOK)
        ? '✅ All maps restored from Dropbox!'
        : '❌ Failed to restore one or more maps.';
      Object.assign(finalToast.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: (upcOK && locOK && eslOK) ? 'green' : 'darkred',
        color: '#fff',
        padding: '10px 18px',
        borderRadius: '8px',
        fontSize: '14px',
        zIndex: '9999',
        textAlign: 'center'
      });
      document.body.appendChild(finalToast);
      setTimeout(() => document.body.removeChild(finalToast), 4000);
    }, 1000);
  };

  if (settingsTarget) {
    settingsTarget.appendChild(syncCleanUPCBtn);
    settingsTarget.appendChild(syncBothBtn);
    settingsTarget.appendChild(restoreBothBtn);

    // --- 🔒 Save Locked Bay Location Map Button ---
    // 🔒 Save Locked Bay Location Map
    const lockBayMapBtn = document.createElement('button');
    lockBayMapBtn.className = 'settings-button';
    lockBayMapBtn.textContent = '🔒 Save Locked Bay Location Map';
    lockBayMapBtn.style.marginTop = '8px';
    lockBayMapBtn.onclick = async () => {
      const blob = new Blob([JSON.stringify(locationMap, null, 2)], { type: 'application/json' });
      const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getDropboxAccessToken()}`,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': JSON.stringify({
            path: '/protected/bay_location_locked.json',
            mode: 'overwrite',
            autorename: false,
            mute: true
          })
        },
        body: blob
      });

      if (response.ok) {
        alert('✅ Locked bay location map saved to Dropbox!');
      } else {
        const err = await response.text();
        alert(`❌ Failed to save locked map: ${err}`);
      }
    };
    settingsTarget.appendChild(lockBayMapBtn);

    // --- 📥 Restore Locked Bay Location Map Button ---
    // 📥 Restore Locked Bay Location Map
    const restoreLockedBayBtn = document.createElement('button');
    restoreLockedBayBtn.className = 'settings-button';
    restoreLockedBayBtn.textContent = '📥 Restore Locked Bay Location Map';
    restoreLockedBayBtn.style.marginTop = '8px';
    restoreLockedBayBtn.onclick = async () => {
      const response = await fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getDropboxAccessToken()}`,
          'Dropbox-API-Arg': JSON.stringify({ path: '/protected/bay_location_locked.json' })
        }
      });

      if (!response.ok) {
        const err = await response.text();
        alert(`❌ Failed to restore locked map: ${err}`);
        return;
      }

      const map = await response.json();
      if (!map || typeof map !== 'object') {
        alert('❌ Invalid bay map format.');
        return;
      }

      Object.assign(locationMap, map);
      saveLocationMap();
      alert('📥 Locked bay location map restored successfully!');
    };
    settingsTarget.appendChild(restoreLockedBayBtn);

    // --- RESET ALL MAPS BUTTON ---
    const resetMapsBtn = document.createElement('button');
    resetMapsBtn.className = 'settings-button';
    resetMapsBtn.textContent = '🧹 Reset All Maps (Fresh Start)';
    resetMapsBtn.style.marginTop = '8px';
    resetMapsBtn.onclick = async () => {
      const confirmReset = confirm("This will back up your current maps and then clear everything. Continue?");
      if (!confirmReset) return;

      await syncAllMapsToDropbox(true); // silent backup first
      localStorage.removeItem('upcToItemMap');
      localStorage.removeItem('locationMap');
      localStorage.removeItem('eslToUPCMap');
      Object.keys(upcToItem).forEach(k => delete upcToItem[k]);
      Object.keys(locationMap).forEach(k => delete locationMap[k]);
      Object.keys(eslToUPC).forEach(k => delete eslToUPC[k]);
      alert('🧹 All maps reset. You are now starting fresh.');
      saveUPCMap();
      saveLocationMap();
      saveESLMap();
    };
    // Always append resetMapsBtn after restoreBothBtn, or fallback to appending at end
    if (restoreBothBtn && restoreBothBtn.parentNode === settingsTarget) {
      settingsTarget.insertBefore(resetMapsBtn, restoreBothBtn.nextSibling);
    } else {
      settingsTarget.appendChild(resetMapsBtn);
    }
  }
  // --- Custom modal prompt for unrecognized code type with smart guess ---
  function guessCodeType(code) {
    if (/^\d{15}$/.test(code)) {
      const prefix = code.slice(0, 3);
      if (prefix === '000' || prefix === '900' || prefix === '100') {
        return 'location';
      }
    }
    if (/^0\d{12}$/.test(code)) {
      return 'esl';
    }
    if (/^\d{12}$/.test(code)) {
      return 'product';
    }
    return null;
  }

  // showCustomPrompt and ESL modal handlers are now implemented in esl.js
  // Setup ESL modal handlers after DOM is loaded
  setupESLHandlers();
  let currentLocation = '';

  // --- Unified Scan Engine ---
  let scanLock = false;
  const liveEntryInput = document.getElementById('liveEntry');
  // Insert Live Mapping Overview just after scan input
  if (liveEntryInput) {
    const liveMappingOverview = document.createElement('div');
    liveMappingOverview.id = 'liveMappingOverview';
    liveMappingOverview.style.marginTop = '8px';
    liveMappingOverview.style.fontSize = '13px';
    liveMappingOverview.style.color = '#aaa';
    liveMappingOverview.textContent = `📊 Mappings:
UPC → ${Object.keys(upcToItem).length}
ESL → ${Object.keys(eslToUPC).length}
Bay Codes → ${Object.keys(locationMap).length}`;
    liveEntryInput.insertAdjacentElement('afterend', liveMappingOverview);
  }

  /**
   * Centralized unified scan handler for all scan input events.
   * Handles ESL, UPC, location, modal mapping flow, and all scan race conditions.
   * @param {string} rawVal
   * @param {object} [opts] - Optional: {source: 'enter'|'debounced'|'button'}
   */
  async function handleUnifiedScan(rawVal, opts = {}) {
    if (scanLock) {
      console.warn('🔒 Scan engine is busy, ignoring scan:', rawVal);
      return;
    }
    scanLock = true;
    try {
      let val = (rawVal || '').replace(/[\n\r]+/g, '').trim();
      if (!val) {
        return;
      }
      // Remove spaces for scanner input
      val = val.replace(/\s+/g, '');
      const normalizedVal = normalizeUPC(val);
      // --- Check for location code
      if (locationMap[normalizedVal]) {
        if (currentLocation === locationMap[normalizedVal]) {
          const close = confirm(`You scanned the current location tag (${normalizedVal}) again.\nWould you like to CLOSE this bay?`);
          if (close) {
            currentLocation = '';
            updateLocationStatus();
            alert('📦 Current location cleared.');
          }
          resetScanInput();
          return;
        } else {
          currentLocation = locationMap[normalizedVal];
          updateLocationStatus();
          alert(`📍 Current location set to: ${currentLocation}`);
          resetScanInput();
          return;
        }
      }
      // --- Hardened ESL mapping logic ---
      // Normalize ESL code for lookup, and verify mapping
      let eslKey = null;
      if (eslToUPC.hasOwnProperty(val)) eslKey = val;
      else if (eslToUPC.hasOwnProperty(normalizedVal)) eslKey = normalizedVal;
      if (eslKey) {
        const item = eslToUPC[eslKey];
        showScanMappingLog(val, item);
        playNewItemSound();
        if (liveCounts[item]) {
          liveCounts[item].count = (parseInt(liveCounts[item].count) || 0) + 1;
        } else {
          liveCounts[item] = {
            count: parseInt(liveQtyInput?.value?.trim()) || 1,
            location: currentLocation,
            category: categoryInput?.value?.trim() || ''
          };
        }
        updateRotationDate(liveCounts[item].category);
        updateLiveTable();
        updateSuggestions();
        resetScanInput();
        return;
      }
      // --- Check for mapped UPC
      if (upcToItem.hasOwnProperty(normalizedVal)) {
        const item = upcToItem[normalizedVal];
        showScanMappingLog(val, item);
        playNewItemSound();
        if (liveCounts[item]) {
          liveCounts[item].count = (parseInt(liveCounts[item].count) || 0) + 1;
        } else {
          liveCounts[item] = {
            count: parseInt(liveQtyInput?.value?.trim()) || 1,
            location: currentLocation,
            category: categoryInput?.value?.trim() || ''
          };
        }
        updateRotationDate(liveCounts[item].category);
        updateLiveTable();
        updateSuggestions();
        resetScanInput();
        return;
      }
      // --- Modal-driven mapping flow for unknown codes (trigger modal ONLY here) ---
      const response = await showCustomPrompt(val);
      updateSuggestions();
      updateLiveTable();
      if (response === 'location') {
        const name = prompt(`🗂 Please enter a name for location "${val}":`);
        if (name) {
          locationMap[val] = name;
          saveLocationMap();
          currentLocation = name;
          updateLocationStatus();
          alert(`📍 Current location set to: ${name}`);
        }
        resetScanInput();
      } else if (response === 'product') {
        const inferredCategory = inferUserCategoryPattern?.(val) || suggestCategoryFromUPC?.(val);
        const userDefined = prompt(
          `UPC ${val} is not linked to a Lowe's item #.\nEnter the item # (suggested category: "${inferredCategory || 'Unknown'}")`
        );
        if (userDefined) {
          const item = userDefined.trim();
          if (!item) {
            alert("❌ Invalid item number.");
            resetScanInput();
            return;
          }
          const originalCode = val;
          if (/^\d{6}$/.test(originalCode)) {
            eslToUPC[originalCode] = item;
            saveESLMap();
            console.log(`📎 ESL ${originalCode} now maps to Lowe’s #${item}`);
          } else {
            upcToItem[originalCode] = item;
            saveUPCMap();
          }
          if (liveCounts[val]) delete liveCounts[val];
          liveCounts[item] = {
            count: parseInt(liveQtyInput?.value?.trim()) || 1,
            location: currentLocation,
            category: categoryInput?.value?.trim() || inferredCategory || ''
          };
          updateRotationDate(liveCounts[item].category);
          updateLiveTable();
        }
        resetScanInput();
      } else {
        resetScanInput();
      }
    } catch (err) {
      console.error('Error in unified scan:', err);
    } finally {
      scanLock = false;
    }
  }

  // --- Wire up unified scan engine to all entry points, ensure no duplicate listeners ---
  if (liveEntryInput) {
    // Remove any existing unified scan event listeners (idempotent, as addEventListener is used only once here)
    liveEntryInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
        if (val) handleUnifiedScan(val, { source: 'enter' });
      }
    });
    let scanDebounceTimer = null;
    liveEntryInput.addEventListener('input', () => {
      liveEntryInput.value = liveEntryInput.value.replace(/\s+/g, '');
      const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
      if (val.length >= 10 && !isNaN(val)) {
        if (scanDebounceTimer) clearTimeout(scanDebounceTimer);
        scanDebounceTimer = setTimeout(() => {
          if (document.activeElement !== liveEntryInput && val) {
            handleUnifiedScan(val, { source: 'debounced' });
          }
        }, 200);
      }
    });
  }
  // Ensure Add Live Item button uses only the unified scan engine
  const addLiveItemBtnUni = document.getElementById('addLiveItem');
  if (addLiveItemBtnUni) {
    addLiveItemBtnUni.addEventListener('click', async () => {
      const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
      if (!val) return;
      await handleUnifiedScan(val, { source: 'button' });
    });
  }
  const liveQtyInput = document.getElementById('liveQty');
  const liveTableBody = document.querySelector('#liveCountTable tbody');
  const categoryInput = document.getElementById('liveCategory');
  // Only insert locationStatus if not already present
  let locationStatus = document.getElementById('locationStatus');
  if (!locationStatus) {
    locationStatus = document.createElement('div');
    locationStatus.id = 'locationStatus';
    locationStatus.style.marginTop = '10px';
    locationStatus.style.fontWeight = 'bold';
    locationStatus.textContent = '📍 No Active Bay';
    locationStatus.style.color = 'red';
    categoryInput.insertAdjacentElement('afterend', locationStatus);

    // --- Close Bay Button ---
    const closeBayBtn = document.createElement('button');
    closeBayBtn.id = 'closeBayBtn';
    closeBayBtn.textContent = '📦 Close Current Bay';
    closeBayBtn.style.marginTop = '8px';
    closeBayBtn.style.display = 'block';
    closeBayBtn.style.padding = '6px 12px';
    closeBayBtn.style.fontSize = '14px';
    closeBayBtn.style.borderRadius = '6px';
    closeBayBtn.style.border = '1px solid #ccc';
    closeBayBtn.onclick = () => {
      if (currentLocation) {
        currentLocation = '';
        updateLocationStatus();
        alert('📦 Current bay closed.');
      } else {
        alert('ℹ️ No active bay to close.');
      }
    };
    locationStatus.insertAdjacentElement('afterend', closeBayBtn);
  }

  // --- Visual scan mapping log for mapped codes ---
  function showScanMappingLog(scannedCode, mappedItem) {
    const log = document.createElement('div');
    log.textContent = `✅ Code ${scannedCode} recognized as Lowe’s #${mappedItem}`;
    log.style.position = 'fixed';
    log.style.bottom = '15px';
    log.style.left = '50%';
    log.style.transform = 'translateX(-50%)';
    log.style.backgroundColor = '#222';
    log.style.color = '#fff';
    log.style.padding = '8px 14px';
    log.style.borderRadius = '6px';
    log.style.fontSize = '14px';
    log.style.zIndex = '9999';
    document.body.appendChild(log);
    setTimeout(() => document.body.removeChild(log), 3000);
  }
  // const liveCounts = {}; // Remove duplicate declaration; already declared at the top
  const weeklyCounts = JSON.parse(localStorage.getItem('weeklyCounts')) || {};
  function restoreFocusToEntry() {
    // Disabled during scan reset troubleshooting
    // setTimeout(() => {
    //   liveEntryInput.focus();
    // }, 50);
  }

  // --- Auto-Sync Map to Dropbox Toggle ---
  const autoSyncToggle = document.createElement('label');
  autoSyncToggle.innerHTML = `<input type="checkbox" id="autosyncMapToggle" /> 🔄 Auto-Sync Map to Dropbox`;
  autoSyncToggle.style.display = 'block';
  autoSyncToggle.style.marginTop = '10px';
  autoSyncToggle.style.fontSize = '14px';
  settingsTarget?.appendChild(autoSyncToggle);

  const autosyncStored = localStorage.getItem('autosyncMapEnabled');
  document.getElementById('autosyncMapToggle').checked = autosyncStored !== 'false';

  document.getElementById('autosyncMapToggle').addEventListener('change', (e) => {
    localStorage.setItem('autosyncMapEnabled', e.target.checked);
  });
  // --- Datalist for liveEntryInput suggestions ---
  const datalist = document.createElement('datalist');
  datalist.id = 'itemSuggestions';
  document.body.appendChild(datalist);
  liveEntryInput.setAttribute('list', 'itemSuggestions');
  // --- Update item suggestions for datalist ---
  function updateSuggestions() {
    const items = new Set([
      ...Object.keys(upcToItem),
      ...Object.values(upcToItem),
      ...Object.keys(liveCounts)
    ]);
    datalist.innerHTML = '';
    items.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      datalist.appendChild(opt);
    });
  }

  // --- Voice-Friendly Helper and Parser for On-Hand Input ---
  const onHandInput = document.getElementById('onHandInput');
  if (onHandInput) {
    const voiceHint = document.createElement('div');
    voiceHint.id = 'voiceHint';
    voiceHint.textContent = '🎙️ Tip: Tap your keyboard mic to speak item and count (e.g. "670009 4")';
    voiceHint.style.fontSize = '0.9em';
    voiceHint.style.marginTop = '6px';
    voiceHint.style.color = 'gray';
    onHandInput.insertAdjacentElement('afterend', voiceHint);

    // --- Upload On-Hand File from Dropbox ---
    const uploadDropboxFileBtn = document.getElementById('uploadDropboxFile');
    if (uploadDropboxFileBtn) {
      uploadDropboxFileBtn.addEventListener('click', () => {
        if (!window.Dropbox) {
          return alert('Dropbox Chooser is not loaded.');
        }
        Dropbox.choose({
          success: function(files) {
            const file = files[0];
            fetch(file.link)
              .then(res => res.text())
              .then(content => {
                const onHandInput = document.getElementById('onHandInput');
                if (onHandInput) {
                  onHandInput.value = content;
                  localStorage.setItem('onHandBackup', content);
                  const now = new Date();
                  const formatted = now.toLocaleTimeString();
                  const statusDiv = document.getElementById('onHandLastSaved');
                  if (statusDiv) {
                    statusDiv.textContent = `📥 Loaded from Dropbox: ${formatted}`;
                  }
                }
              })
              .catch(err => alert(`Failed to load file: ${err.message}`));
          },
          linkType: 'direct',
          multiselect: false,
          extensions: ['.txt', '.csv']
        });
      });
    }

    // --- Auto-Save On Hand Input ---
    let lastOnHandSaveTime = '';
    const saveOnHandToLocal = () => {
      const currentText = onHandInput.value.trim();
      localStorage.setItem('onHandBackup', currentText);
      const now = new Date();
      lastOnHandSaveTime = now.toLocaleTimeString();
      document.getElementById('onHandLastSaved').textContent = `📥 Last Auto-Saved: ${lastOnHandSaveTime}`;
    };
    onHandInput.addEventListener('input', () => {
      saveOnHandToLocal();
    });

    // Add visual timestamp below input
    const lastSavedDiv = document.createElement('div');
    lastSavedDiv.id = 'onHandLastSaved';
    lastSavedDiv.style.fontSize = '0.85em';
    lastSavedDiv.style.marginTop = '4px';
    lastSavedDiv.style.color = 'lime';
    lastSavedDiv.textContent = '📥 Last Auto-Saved: Not yet';
    onHandInput.insertAdjacentElement('afterend', lastSavedDiv);

    // Restore from backup if available (sanitized)
    const savedBackup = localStorage.getItem('onHandBackup');
    if (savedBackup && !onHandInput.value.trim()) {
      // Sanitize restored backup content
      const sanitized = savedBackup
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => /^\d{5,6}(\s+\d+)?$/.test(line))
        .join('\n');

      onHandInput.value = sanitized;
      lastSavedDiv.textContent = '📥 Restored sanitized backup';

      // If nothing valid remains after sanitization, clear local backup
      if (!sanitized) {
        localStorage.removeItem('onHandBackup');
      }
    }

    // Prevent restored backup from being auto-processed on load
    onHandInput.dataset.restored = 'true';

    // Auto-format input when pasted or changed
    onHandInput.addEventListener('blur', () => {
      const lines = onHandInput.value.trim().split(/\r?\n/);
      const formatted = lines.map(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length === 2 && /^\d{5,6}$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
          return `${parts[0]}:${parts[1]}`;
        }
        return line;
      });
      onHandInput.value = formatted.join('\n');
    });
  }
  // Set inputmode and pattern for mobile number pad
  liveEntryInput.setAttribute('inputmode', 'numeric');
  liveEntryInput.setAttribute('pattern', '\\d*');
  // --- SETTINGS: Apply saved preferences on load ---
  // Dark mode
  if (localStorage.getItem('darkModeEnabled') === 'true') {
    document.body.classList.add('dark-mode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  // Font size
  const fontSizeSelect = document.getElementById('fontSizeSelect');
  if (fontSizeSelect) {
    fontSizeSelect.value = localStorage.getItem('fontSize') || 'medium';
    document.body.style.fontSize =
      fontSizeSelect.value === 'large' ? '18px' :
      fontSizeSelect.value === 'small' ? '12px' : '14px';
  }

  // Autosave enabled
  const autosaveToggle = document.getElementById('autosaveToggle');
  if (autosaveToggle) autosaveToggle.checked = localStorage.getItem('autosaveEnabled') !== 'false';

  // Autosave interval
  const autosaveIntervalSelect = document.getElementById('autosaveIntervalSelect');
  if (autosaveIntervalSelect) autosaveIntervalSelect.value = localStorage.getItem('autosaveInterval') || '3';

  // Batch scan mode
  const batchScanToggle = document.getElementById('batchScanToggle');
  if (batchScanToggle) batchScanToggle.checked = localStorage.getItem('batchScanMode') === 'true';

  // Numeric keypad
  const numericKeypadToggle = document.getElementById('numericKeypadToggle');
  if (numericKeypadToggle) numericKeypadToggle.checked = localStorage.getItem('numericKeypad') === 'true';
  if (numericKeypadToggle && liveEntryInput) {
    const mode = numericKeypadToggle.checked ? 'numeric' : 'text';
    liveEntryInput.setAttribute('inputmode', mode);
  }

  // Keep snapshots
  const keepSnapshotsToggle = document.getElementById('keepSnapshotsToggle');
  if (keepSnapshotsToggle) keepSnapshotsToggle.checked = localStorage.getItem('keepSnapshots') !== 'false';

  // --- Drive Sync Toggle (removed Google Drive sync logic) ---
  const driveSyncToggle = document.getElementById('driveSyncToggle');
  if (driveSyncToggle) driveSyncToggle.checked = localStorage.getItem('driveSyncEnabled') === 'true';
  // No longer supporting Google Drive auto sync; Dropbox integration only for manual save/load.

  // --- SETTINGS: Event listeners for preference changes ---
  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkModeEnabled', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkModeEnabled', 'false');
      }
    });
  }

  // Font size toggle
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', (e) => {
      const size = e.target.value;
      localStorage.setItem('fontSize', size);
      document.body.style.fontSize = size === 'large' ? '18px' : size === 'small' ? '12px' : '14px';
    });
  }

  // Autosave settings
  if (autosaveToggle) {
    autosaveToggle.addEventListener('change', (e) => {
      localStorage.setItem('autosaveEnabled', e.target.checked);
    });
  }
  if (autosaveIntervalSelect) {
    autosaveIntervalSelect.addEventListener('change', (e) => {
      localStorage.setItem('autosaveInterval', e.target.value);
    });
  }

  // Batch scan and numeric keypad
  if (batchScanToggle) {
    batchScanToggle.addEventListener('change', (e) => {
      localStorage.setItem('batchScanMode', e.target.checked);
    });
  }
  if (numericKeypadToggle) {
    numericKeypadToggle.addEventListener('change', (e) => {
      localStorage.setItem('numericKeypad', e.target.checked);
      const mode = e.target.checked ? 'numeric' : 'text';
      if (liveEntryInput) liveEntryInput.setAttribute('inputmode', mode);
    });
  }

  // Keep snapshot toggle
  if (keepSnapshotsToggle) {
    keepSnapshotsToggle.addEventListener('change', (e) => {
      localStorage.setItem('keepSnapshots', e.target.checked);
    });
  }
  // if (liveQtyInput) liveQtyInput.blur(); // Disabled to prevent focus conflict


  // --- Export locationMap as JSON ---
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(locationMap, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bay-locations-backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // --- Export Excel Template Button ---
  // Place near other export buttons
  const exportTemplateBtn = document.createElement('button');
  exportTemplateBtn.className = 'settings-button';
  exportTemplateBtn.textContent = '📤 Export Excel Template';
  exportTemplateBtn.style.marginTop = '8px';
  exportTemplateBtn.onclick = () => {
    const wb = XLSX.utils.book_new();
    const ws_data = [
      ['Item #', 'Found', 'Category', 'Location'],
      ['670009', 1, 'Laundry', 'Bay A12'],
      ['123456', 2, 'Ranges', 'Bay B04']
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Apply basic cell styling
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F81BD" } }
    };
    ['A1', 'B1', 'C1', 'D1'].forEach(cell => {
      if (ws[cell]) ws[cell].s = headerStyle;
    });

    // Apply color-coded category samples
    const categoryStyles = {
      'Laundry': { fill: { fgColor: { rgb: '8ECAE6' } } },
      'Ranges': { fill: { fgColor: { rgb: 'FFB703' } } }
    };
    ['C2', 'C3'].forEach((cell, i) => {
      const category = ws_data[i + 1][2];
      if (ws[cell] && categoryStyles[category]) {
        ws[cell].s = categoryStyles[category];
      }
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'inventory-import-template.xlsx');
  };
  if (settingsTarget) {
    settingsTarget.appendChild(exportTemplateBtn);
  }

  // --- Import locationMap from file ---
  const importBtn = document.getElementById('importBtn');
  if (importBtn) {
    importBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const imported = JSON.parse(reader.result);
            if (typeof imported === 'object' && imported !== null) {
              Object.assign(locationMap, imported);
              saveLocationMap();
              alert('Bay location map imported successfully!');
            } else {
              alert('Invalid format.');
            }
          } catch (err) {
            alert('Error reading file.');
          }
        };
        reader.readAsText(file);
      };
      input.click();
    });
  }

  // --- Export UPC Mappings as JSON ---
  const exportUPCBtn = document.getElementById('exportUPCBtn');
  if (exportUPCBtn) {
    exportUPCBtn.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(upcToItem, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'upc-mappings-backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // --- Import UPC Mappings from file ---
  // --- Close Trends Modal
  const closeTrendsBtn = document.getElementById('closeTrendsModal');
  if (closeTrendsBtn) {
    closeTrendsBtn.addEventListener('click', () => {
      document.getElementById('trendsModal').classList.add('hidden');
    });
  }

  function renderTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dates = Object.keys(weeklyCounts).sort();
    const labels = dates;
    const datasets = [];

    const items = new Set();
    dates.forEach(date => {
      Object.keys(weeklyCounts[date] || {}).forEach(item => items.add(item));
    });

    items.forEach((item, index) => {
      const data = dates.map(date => weeklyCounts[date]?.[item] || 0);
      const color = `hsl(${(index * 60) % 360}, 70%, 60%)`;

      datasets.push({
        label: item,
        data,
        fill: false,
        borderColor: color,
        tension: 0.1
      });
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  const importUPCBtn = document.getElementById('importUPCBtn');
  if (importUPCBtn) {
    importUPCBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const imported = JSON.parse(reader.result);
            if (typeof imported === 'object' && imported !== null) {
              Object.assign(upcToItem, imported);
              saveUPCMap();
              alert('UPC mappings imported successfully!');
            } else {
              alert('Invalid UPC mapping format.');
            }
          } catch (err) {
            alert('Error reading UPC file.');
          }
        };
        reader.readAsText(file);
      };
      input.click();
    });
  }


  function updateLocationStatus() {
    if (currentLocation) {
      locationStatus.textContent = `📍 Active Bay: ${currentLocation}`;
      locationStatus.style.color = 'limegreen';
    } else {
      locationStatus.textContent = '📍 No Active Bay';
      locationStatus.style.color = 'red';
    }
  }
  // --- Insert Live Search Bar (moved to after live count table exists) ---
  const liveTable = document.getElementById('liveCountTable');
  if (liveTable) {
    const searchWrapper = document.createElement('div');
    searchWrapper.id = 'searchWrapper';
    searchWrapper.style.margin = '10px 0';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search item, category, or location...';
    searchInput.id = 'liveSearchInput';
    searchInput.style.width = '100%';
    searchInput.style.padding = '6px';
    searchInput.style.borderRadius = '4px';
    searchInput.style.border = '1px solid #ccc';

    searchWrapper.appendChild(searchInput);

    // --- Add clear and reset filter buttons for live search ---
    const clearBtn = document.createElement('button');
    clearBtn.textContent = '❌';
    clearBtn.title = 'Clear search';
    clearBtn.style.marginLeft = '5px';
    clearBtn.style.padding = '6px';
    clearBtn.style.borderRadius = '4px';
    clearBtn.style.border = '1px solid #ccc';
    clearBtn.onclick = () => {
      searchInput.value = '';
      updateLiveTable();
    };

    const resetBtn = document.createElement('button');
    resetBtn.textContent = '🔁 Reset Filters';
    resetBtn.title = 'Show all items';
    resetBtn.style.marginLeft = '5px';
    resetBtn.style.padding = '6px';
    resetBtn.style.borderRadius = '4px';
    resetBtn.style.border = '1px solid #ccc';
    resetBtn.onclick = () => {
      searchInput.value = '';
      updateLiveTable();
    };

    searchWrapper.appendChild(clearBtn);
    searchWrapper.appendChild(resetBtn);

    // Insert searchWrapper before liveTable
    liveTable.insertAdjacentElement('beforebegin', searchWrapper);
  }

  // Insert summary bar below the live count table
  const summaryBar = document.createElement('div');
  summaryBar.id = 'summaryBar';
  summaryBar.style.marginTop = '20px';
  summaryBar.style.padding = '10px';
  summaryBar.style.border = '1px solid #ccc';
  summaryBar.style.borderRadius = '5px';
  summaryBar.style.fontWeight = 'bold';
  document.querySelector('#liveCountTable').insertAdjacentElement('afterend', summaryBar);

  // Insert compare week dropdown above the live table (after summaryBar)
  const compareSection = document.createElement('div');
  compareSection.id = 'compareSelector';
  compareSection.style.marginTop = '20px';
  compareSection.innerHTML = `
    <label for="compareWeek">Compare to:</label>
    <select id="compareWeek">
      <option value="">Most Recent</option>
    </select>
  `;
  summaryBar.insertAdjacentElement('afterend', compareSection);

  // Populate the dropdown with weekly counts dates
  const compareWeekSelect = document.getElementById('compareWeek');
  Object.keys(weeklyCounts).sort().reverse().forEach(date => {
    const opt = document.createElement('option');
    opt.value = date;
    opt.textContent = date;
    compareWeekSelect.appendChild(opt);
  });

  // Update table when dropdown selection changes
  compareWeekSelect.addEventListener('change', updateLiveTable);


  // --- Batch Paste Mode Section ---
  // Ensure #settings section exists in DOM for batch controls
  let settingsSection = document.getElementById('settings');
  if (!settingsSection) {
    // If not present, inject a hidden section at end of <main>
    const mainEl = document.querySelector('main');
    if (mainEl) {
      settingsSection = document.createElement('section');
      settingsSection.id = 'settings';
      settingsSection.className = 'tab-section panel-glow';
      settingsSection.style.display = 'none';
      mainEl.appendChild(settingsSection);
    }
  }
  const batchSection = document.createElement('section');
  batchSection.innerHTML = `
    <h2>Batch Paste Mode</h2>
    <textarea id="batchInput" placeholder="Paste barcode list here (one per line)"></textarea>
    <div style="margin-top: 10px;">
      <button id="processBatch">Process Batch</button>
      <button id="clearBatch">Clear Batch</button>
    </div>
    <div id="batchPreview" style="margin-top: 15px; border-top: 1px solid #444; padding-top: 10px;"></div>
  `;
  if (settingsSection) {
    settingsSection.appendChild(batchSection);
  } else {
    console.warn('⚠️ #settings container not found — batch section not inserted');
  }

  const processBatchBtn = document.getElementById('processBatch');
  const batchInput = document.getElementById('batchInput');

  if (processBatchBtn) {
    processBatchBtn.addEventListener('click', () => {
      const lines = batchInput.value.trim().split(/\r?\n/);
      processBatchLines(lines);
    });
  }

  async function processBatchLines(lines) {
    for (const item of lines) {
      const trimmed = item.trim();
      if (!trimmed) continue;
      await handleUnifiedScan(trimmed, { source: 'batch' });
    }
  }