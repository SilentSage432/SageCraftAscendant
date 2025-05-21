function saveUPCMap() {
  localStorage.setItem('upcToItemMap', JSON.stringify(upcToItem));
}

function saveLocationMap() {
  localStorage.setItem('locationMap', JSON.stringify(locationMap));
}
// --- Ensure all critical global variables are declared ONCE at the top ---
let liveCounts = window.liveCounts || {};
let autosaveTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOMContentLoaded fired and script.js is active");
  // --- Ensure all critical button variables are defined after DOMContentLoaded begins ---
  const addLiveItemBtn = document.getElementById('addLiveItem');
  const saveToDriveBtn = document.getElementById('saveToDrive');
  const loadFromDriveBtn = document.getElementById('loadFromDrive');


  // Clear Live Table button
  const clearLiveTableBtn = document.getElementById('clearLiveTable');
  if (clearLiveTableBtn) {
    clearLiveTableBtn.addEventListener('click', () => {
      console.log("🧹 Clear Live Table button clicked");
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
    'saveSession',
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
  // 7. saveSession
  const saveSessionBtnCheck = document.getElementById('saveSession');
  if (saveSessionBtnCheck && !saveSessionBtnCheck.onclick && saveSessionBtnCheck.getAttribute('listener-attached') !== 'true') {
    saveSessionBtnCheck.addEventListener('click', () => {
      console.log('saveSession clicked!');
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
  // 11. mergeReport
  const mergeReportBtnCheck = document.getElementById('mergeReport');
  if (mergeReportBtnCheck && !mergeReportBtnCheck.onclick && mergeReportBtnCheck.getAttribute('listener-attached') !== 'true') {
    mergeReportBtnCheck.addEventListener('click', () => {
      console.log('mergeReport clicked!');
    });
    mergeReportBtnCheck.setAttribute('listener-attached', 'true');
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
  const settingsTarget = document.querySelector('#tools .settings-group');
  if (settingsTarget) {
    settingsTarget.appendChild(backupBtn);
  }
  // --- Google Drive Integration ---
  const CLIENT_ID = '1009062770217-i80a4rigia3vbsvmqbnngli08ojanhmd.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/drive.file';

  function gapiInit() {
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
      });
      // console.log('✅ Google API initialized');
    });
  }

  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      alert('🔓 Authenticated with Google Drive');
    });
  }

  function uploadExcelToDrive(fileBlob) {
    const metadata = {
      name: 'inventory_report.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };

    const accessToken = gapi.auth.getToken().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', fileBlob);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
      body: form
    }).then(res => res.json())
      .then(val => alert('✅ Uploaded to Google Drive!'))
      .catch(err => alert('❌ Upload failed: ' + err.message));
  }

  // --- Google Drive: Save/Load Session as JSON file ---
  function saveSessionToDrive() {
    const session = {
      liveCounts: JSON.parse(JSON.stringify(liveCounts)),
      onHandText: document.getElementById('onHandInput').value
    };
    const blob = new Blob([JSON.stringify(session)], { type: 'application/json' });
    const metadata = {
      name: 'active_session.json',
      mimeType: 'application/json'
    };

    const accessToken = gapi.auth.getToken().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', blob);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
      body: form
    }).then(res => res.json())
      .then(val => alert('✅ Session saved to Google Drive!'))
      .catch(err => alert('❌ Save failed: ' + err.message));
  }

  function loadSessionFromDrive() {
    const accessToken = gapi.auth.getToken().access_token;
    fetch("https://www.googleapis.com/drive/v3/files?q=name='active_session.json' and trashed=false", {
      headers: new Headers({ Authorization: 'Bearer ' + accessToken })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.files || data.files.length === 0) {
          alert('❌ No session file found in Drive.');
          return;
        }
        const fileId = data.files[0].id;
        return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
          headers: new Headers({ Authorization: 'Bearer ' + accessToken })
        });
      })
      .then(res => res && res.json ? res.json() : Promise.reject(new Error('No file response')))
      .then(session => {
        if (!session || !session.liveCounts) {
          alert('❌ Invalid session format.');
          return;
        }
        Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
        Object.entries(session.liveCounts).forEach(([k, v]) => {
          liveCounts[k] = { count: v.count, category: v.category, location: v.location };
        });
        document.getElementById('onHandInput').value = session.onHandText || '';
        updateLiveTable();
        alert('📥 Session loaded from Drive!');
      })
      .catch(err => alert('❌ Load failed: ' + err.message));
  }
  // --- Google Drive Save/Load Session Button Listeners ---
  if (saveToDriveBtn) {
    saveToDriveBtn.addEventListener('click', async () => {
      if (!gapi.auth || !gapi.auth.getToken || !gapi.auth.getToken()) {
        const authBtn = document.getElementById('authGoogleDrive');
        if (authBtn) authBtn.click(); // Try to trigger auth automatically
        alert('🔒 You must authenticate with Google first. Trying now...');
        return;
      }
      saveSessionToDrive();
    });
  }

  if (loadFromDriveBtn) {
    loadFromDriveBtn.addEventListener('click', async () => {
      if (!gapi.auth || !gapi.auth.getToken || !gapi.auth.getToken()) {
        const authBtn = document.getElementById('authGoogleDrive');
        if (authBtn) authBtn.click(); // Try to trigger auth automatically
        alert('🔒 You must authenticate with Google first. Trying now...');
        return;
      }
      loadSessionFromDrive();
    });
  }
  // --- Custom modal prompt for unrecognized code type with smart guess ---
  function guessCodeType(code) {
    if (/^\d{15}$/.test(code)) {
      const prefix = code.slice(0, 3);
      if (prefix === '000' || prefix === '900' || prefix === '100') {
        return 'location';
      }
    }
    if (/^\d{12}$/.test(code)) {
      return 'product';
    }
    return null;
  }

  function showCustomPrompt(item) {
    return new Promise(resolve => {
      const guess = guessCodeType(item);
      const overlay = document.getElementById('customModal');

      let message = `Unrecognized code: "${item}" — what type of tag is this?`;
      if (guess === 'location') {
        message = `This looks like a Location Tag (15-digit starting with ${item.slice(0, 3)}). Confirm?`;
      } else if (guess === 'product') {
        message = `This looks like a Product UPC (12-digit code). Confirm?`;
      }

      document.getElementById('modalPromptText').textContent = message;
      overlay.style.display = 'flex';

      const cleanup = (result) => {
        overlay.style.display = 'none';
        resolve(result);
        // --- Toast logic to confirm selection ---
        const toast = document.createElement('div');
        toast.textContent = result === 'location' ? '📍 Bay Location tag confirmed' :
                            result === 'product' ? '📦 Product UPC confirmed' :
                            '❌ Scan canceled';
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
      };

      document.getElementById('modalBtnLocation').onclick = () => cleanup('location');
      document.getElementById('modalBtnProduct').onclick = () => cleanup('product');
      document.getElementById('modalBtnCancel').onclick = () => cleanup(null);
    });
  }
  let currentLocation = '';
  const upcToItem = JSON.parse(localStorage.getItem('upcToItemMap')) || {};
  const locationMap = JSON.parse(localStorage.getItem('locationMap')) || {};

  // --- Scan Logic Setup ---
  const liveEntryInput = document.getElementById('liveEntry');
  // Add Enter key handler for liveEntryInput
  if (liveEntryInput) {
    liveEntryInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault(); // prevent accidental form submits or focus shifts
        const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
        if (val) processScan(val);
      }
    });
    // Add input event handler for mobile/soft-keyboard scanners
    liveEntryInput.addEventListener('input', () => {
      const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
      if (val.length >= 5) { // Adjust length threshold if needed
        processScan(val);
      }
    });
  }
  if (addLiveItemBtn) {
    addLiveItemBtn.addEventListener('click', () => {
      console.log("📦 Add Item button clicked");
      const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
      if (val) processScan(val);
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

    // --- Upload On-Hand File (.txt or .csv) ---
    const uploadOnHandFileBtn = document.getElementById('uploadOnHandFile');
    if (uploadOnHandFileBtn) {
      console.log("Upload button found:", uploadOnHandFileBtn);
      uploadOnHandFileBtn.addEventListener('click', () => {
        console.log("Upload button clicked");
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.csv';
        input.style.display = 'none';
        document.body.appendChild(input);
        input.addEventListener('change', (e) => {
          console.log("File input triggered", e.target.files);
          const file = e.target.files[0];
          if (!file) {
            alert('❌ No file selected.');
            return;
          }
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            console.log("File read complete", reader.result.slice(0, 100));
            const content = reader.result.trim();
            const onHandInput = document.getElementById('onHandInput');
            if (onHandInput) {
              onHandInput.value = content;
              localStorage.setItem('onHandBackup', content);
              const now = new Date();
              const formatted = now.toLocaleTimeString();
              const statusDiv = document.getElementById('onHandLastSaved');
              if (statusDiv) {
                statusDiv.textContent = `📥 Loaded: ${formatted}`;
              }
            }
          };
          reader.readAsText(file);
        });
        input.click();
      });
      // --- Add upload logic for on-hand data (after file parsing logic) ---
      uploadOnHandFileBtn.addEventListener('click', () => {
        const onHandText = document.getElementById('onHandInput').value;
        if (!onHandText.trim()) {
          alert('No on-hand data found to upload.');
          return;
        }
        localStorage.setItem('onHandBackup', onHandText);
        alert('✅ On-hand counts uploaded and saved to local backup!');
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

    // Restore from backup if available
    const savedBackup = localStorage.getItem('onHandBackup');
    if (savedBackup && !onHandInput.value.trim()) {
      onHandInput.value = savedBackup;
      lastSavedDiv.textContent = '📥 Restored from backup';
    }

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

  // --- Drive Sync Toggle ---
  const driveSyncToggle = document.getElementById('driveSyncToggle');
  if (driveSyncToggle) driveSyncToggle.checked = localStorage.getItem('driveSyncEnabled') === 'true';
  if (driveSyncToggle) {
    driveSyncToggle.addEventListener('change', (e) => {
      localStorage.setItem('driveSyncEnabled', e.target.checked);
      if (e.target.checked) startAutoDriveSync();
      else stopAutoDriveSync();
    });
  }
  // --- Auto Drive Sync Logic ---
  let driveSyncTimer = null;

  function startAutoDriveSync() {
    if (driveSyncTimer) clearInterval(driveSyncTimer);
    const enabled = document.getElementById('driveSyncToggle')?.checked;
    if (!enabled) return;

    driveSyncTimer = setInterval(() => {
      const session = {
        liveCounts: JSON.parse(JSON.stringify(liveCounts)),
        onHandText: document.getElementById('onHandInput').value
      };
      const blob = new Blob([JSON.stringify(session)], { type: 'application/json' });
      const metadata = {
        name: 'active_session.json',
        mimeType: 'application/json'
      };
      const accessToken = gapi.auth.getToken().access_token;
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', blob);

      fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
        body: form
      })
        .then(res => res.json())
        .then(val => console.log('🔄 Auto-synced session to Drive'))
        .catch(err => console.log('❌ Drive sync failed: ' + err.message));
    }, 5 * 60 * 1000); // every 5 minutes
  }

  function stopAutoDriveSync() {
    if (driveSyncTimer) clearInterval(driveSyncTimer);
    driveSyncTimer = null;
  }

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
      lines.forEach(item => {
        const trimmed = item.trim();
        if (!trimmed) return;
        // Unified location/product detection and handling
        if (!upcToItem[trimmed] && !locationMap[trimmed]) {
          showCustomPrompt(trimmed).then(response => {
            if (response === 'location') {
              const name = prompt(`🗂 Please enter a name for location "${trimmed}":`);
              if (name) {
                locationMap[trimmed] = name;
                saveLocationMap();
                currentLocation = name;
                updateLocationStatus();
                alert(`📍 Current location set to: ${name}`);
                liveEntryInput.value = '';
                restoreFocusToEntry();
                return;
              }
            } else if (response === 'product') {
              processProduct(trimmed);
              restoreFocusToEntry();
            } else {
              liveEntryInput.value = '';
              restoreFocusToEntry();
            }
          });
          return;
        }
        if (locationMap[trimmed]) {
          if (currentLocation === locationMap[trimmed]) {
            const close = confirm(`You scanned the current location tag (${trimmed}) again.\nWould you like to CLOSE this bay?`);
            if (close) {
              currentLocation = '';
              updateLocationStatus();
              alert('📦 Current location cleared.');
            }
            liveEntryInput.value = '';
            restoreFocusToEntry();
            return;
          } else {
            currentLocation = locationMap[trimmed];
            updateLocationStatus();
            alert(`📍 Current location set to: ${currentLocation}`);
            liveEntryInput.value = '';
            restoreFocusToEntry();
            return;
          }
        }
        let mappedItem = upcToItem[trimmed] || trimmed;
        if (!upcToItem[trimmed]) {
          const userDefined = prompt(`UPC ${trimmed} is not linked to a Lowe's item #. Please enter it now:`);
          if (userDefined) {
            upcToItem[trimmed] = userDefined;
            saveUPCMap();
            mappedItem = userDefined;
          }
        }
        if (!liveCounts[mappedItem]) {
          liveCounts[mappedItem] = { count: 0, category: categoryInput.value };
        }
        liveCounts[mappedItem].count += 1;
        liveCounts[mappedItem].location = currentLocation;
      });
      batchInput.value = '';
      updateLiveTable();
      const today = new Date().toISOString().split('T')[0];
      weeklyCounts[today] = {};
      Object.entries(liveCounts).forEach(([k, v]) => {
        weeklyCounts[today][k] = v.count;
      });
      localStorage.setItem('weeklyCounts', JSON.stringify(weeklyCounts));
      restoreFocusToEntry();
    });
  }

  const clearBatchBtn = document.getElementById('clearBatch');
  if (clearBatchBtn) {
    clearBatchBtn.addEventListener('click', () => {
      batchInput.value = '';
      restoreFocusToEntry();
    });
  }

  // Live preview for batch input
  if (batchInput) {
    batchInput.addEventListener('input', () => {
      const lines = batchInput.value.trim().split(/\r?\n/);
      const counts = {};
      lines.forEach(line => {
        const item = line.trim();
        if (!item) return;
        counts[item] = (counts[item] || 0) + 1;
      });

      const previewDiv = document.getElementById('batchPreview');
      if (Object.keys(counts).length === 0) {
        previewDiv.innerHTML = '';
        return;
      }

      let previewHTML = '<h3>Preview</h3><table style="width:100%; border-collapse: collapse;"><thead><tr><th>Item #</th><th>Qty</th></tr></thead><tbody>';
      Object.entries(counts).forEach(([item, qty]) => {
        previewHTML += `<tr><td>${item}</td><td>${qty}</td></tr>`;
      });
      previewHTML += '</tbody></table>';
      previewDiv.innerHTML = previewHTML;
    });
  }


  // --- Restored clean scanning logic ---
  // const liveEntry = document.getElementById('liveEntry');
  const liveQty = document.getElementById('liveQty');
  // const liveCounts = window.liveCounts || {}; // fallback if not global
  updateSuggestions();

  function updateLiveTable() {
    if (!liveTableBody) return;
    liveTableBody.innerHTML = '';
    // --- Category color map ---
    const categoryColors = {
      'Laundry': '#8ecae6',
      'Fridges & Freezers': '#219ebc',
      'Ranges': '#ffb703',
      'Dishwashers': '#fb8500',
      'Wall Ovens': '#ff6b6b',
      'Cooktops': '#ffd166',
      'OTR Microwaves': '#9b5de5',
      'Microwaves (Countertop)': '#3a86ff',
      'Vent Hoods': '#8338ec',
      'Beverage & Wine Coolers': '#ff006e',
      'Cabinets': '#8d99ae',
      'Countertops': '#b5ead7',
      'Interior Doors': '#ffdac1',
      'Exterior Doors': '#e0aaff',
      'Storm Doors': '#bc6c25',
      'Windows': '#588157',
      'Commodity Moulding': '#adb5bd',
      'Other / Misc': '#f4a261'
    };
    const searchTerm = document.getElementById('liveSearchInput')?.value.toLowerCase().trim() || '';
    const headerRow = document.querySelector('#liveCountTable thead tr');
    if (!headerRow.querySelector('.category-header')) {
      const catTh = document.createElement('th');
      catTh.textContent = 'Category';
      catTh.className = 'category-header';
      headerRow.appendChild(catTh);
    }
    if (!headerRow.querySelector('.location-header')) {
      const locTh = document.createElement('th');
      locTh.textContent = 'Location';
      locTh.className = 'location-header';
      headerRow.appendChild(locTh);
    }
    if (!headerRow.querySelector('.previous-header')) {
      ['Previous', 'Δ from Last Week'].forEach(label => {
        const th = document.createElement('th');
        th.textContent = label;
        headerRow.appendChild(th);
      });
    }
    // Add Edit column header if not present
    if (!headerRow.querySelector('.edit-header')) {
      const editTh = document.createElement('th');
      editTh.textContent = 'Edit';
      editTh.className = 'edit-header';
      headerRow.appendChild(editTh);
    }
    const onHandText = document.getElementById('onHandInput').value;
    const onHandLines = onHandText.trim().split(/\n+/);
    const onHandMap = {};
    onHandLines.forEach(line => {
      const [item, count] = line.split(':');
      if (item && count) onHandMap[item.trim()] = parseInt(count.trim());
    });

    const previousDates = Object.keys(weeklyCounts).sort().reverse();
    // Get selected week from dropdown, or fallback to most recent previous week
    const selectedWeek = document.getElementById('compareWeek')?.value;
    const lastWeek = selectedWeek ? weeklyCounts[selectedWeek] : (previousDates.length > 1 ? weeklyCounts[previousDates[1]] : null);

    Object.entries(liveCounts).forEach(([item, obj]) => {
      // --- Live search filter ---
      if (searchTerm &&
          !item.toLowerCase().includes(searchTerm) &&
          !(obj.category || '').toLowerCase().includes(searchTerm) &&
          !(obj.location || '').toLowerCase().includes(searchTerm)) {
        return;
      }
      const count = obj.count;
      const expected = onHandMap[item] || 0;
      const diff = count - expected;
      const previous = lastWeek ? lastWeek[item] || 0 : '';
      const weekDiff = lastWeek ? count - previous : '';
      const category = obj.category || '';
      const location = obj.location || '';

      // --- Smart discrepancy/trend icons ---
      let icon = '';
      // Down arrow if counts are decreasing for 2+ weeks
      if (previous !== '' && weekDiff < 0) {
        // Check for 2+ week decreasing trend
        let decreasing = false;
        if (previousDates.length >= 3) {
          // Get counts for this item for last 3 weeks (including this)
          const idx = previousDates.indexOf(selectedWeek || previousDates[0]);
          const w0 = liveCounts[item]?.count || 0;
          const w1 = weeklyCounts[previousDates[idx + 1]] ? (weeklyCounts[previousDates[idx + 1]][item] || 0) : null;
          const w2 = weeklyCounts[previousDates[idx + 2]] ? (weeklyCounts[previousDates[idx + 2]][item] || 0) : null;
          if (w1 !== null && w2 !== null && w0 < w1 && w1 < w2) {
            decreasing = true;
          }
        }
        if (decreasing || previousDates.length < 3) icon = '📉';
      }
      // Up arrow for sharp increase from last week
      else if (previous !== '' && weekDiff > 5) {
        icon = '📈';
      }
      // Red flag if no expected on-hand count
      if (!onHandMap[item]) icon += ' ❌';

      // --- Create row with editable cells and Edit button ---
      const tr = document.createElement('tr');
      tr.className = diff < 0 ? 'under' : diff > 0 ? 'over' : 'match';
      // Set background color by category if defined
      if (categoryColors[obj.category]) {
        tr.style.backgroundColor = categoryColors[obj.category];
      }
      tr.innerHTML = `
        <td>
          ${item} ${icon}
          ${category ? `<span class="category-badge">${category}</span>` : ''}
        </td>
        <td>${expected}</td>
        <td class="editable" data-field="count" data-id="${item}">
          <span contenteditable="true" spellcheck="false">${count}</span>
          <button class="saveEdit" title="Save" style="margin-left:2px;">✅</button>
        </td>
        <td>${diff > 0 ? '+' + diff : diff}</td>
        <td>${previous !== '' ? previous : '-'}</td>
        <td>${weekDiff !== '' ? (weekDiff > 0 ? '+' + weekDiff : weekDiff) : '-'}</td>
        <td class="editable" data-field="category" data-id="${item}">
          <span contenteditable="true" spellcheck="false">${category}</span>
          <button class="saveEdit" title="Save" style="margin-left:2px;">✅</button>
        </td>
        <td class="editable" data-field="location" data-id="${item}">
          <span contenteditable="true" spellcheck="false">${location}</span>
          <button class="saveEdit" title="Save" style="margin-left:2px;">✅</button>
        </td>
        <td><button class="editRow" data-id="${item}">✏️</button></td>
      `;
      liveTableBody.appendChild(tr);
    });

    // Add edit/delete row logic with custom modal prompt
    document.querySelectorAll('.editRow').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.id;
        // Custom modal-style prompt for Edit/Delete
        const overlay = document.createElement('div');
        overlay.id = 'editDeletePrompt';
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
        overlay.innerHTML = `
          <div style="background:#fff; padding:20px; border-radius:8px; max-width:300px; text-align:center;">
            <p>What would you like to do with "<strong>${item}</strong>"?</p>
            <button id="editBtn">✏️ Edit</button>
            <button id="deleteBtn">🗑️ Delete</button>
            <button id="cancelBtn">❌ Cancel</button>
          </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('editBtn').onclick = () => {
          document.body.removeChild(overlay);
          const current = liveCounts[item];
          const newItem = prompt('Edit Item #:', item);
          if (!newItem) return;
          const newCount = parseInt(prompt('Edit Count:', current.count)) || 0;
          const newCategory = prompt('Edit Category:', current.category || '') || '';
          const newLocation = prompt('Edit Location:', current.location || '') || '';
          delete liveCounts[item];
          liveCounts[newItem] = {
            count: newCount,
            category: newCategory,
            location: newLocation
          };
          updateLiveTable();
        };

        document.getElementById('deleteBtn').onclick = () => {
          if (confirm(`Are you sure you want to delete "${item}"?`)) {
            delete liveCounts[item];
            updateLiveTable();
          }
          document.body.removeChild(overlay);
        };

        document.getElementById('cancelBtn').onclick = () => {
          document.body.removeChild(overlay);
        };
      });
    });

    // Add inline editable logic for Found, Category, and Location cells
    document.querySelectorAll('.editable').forEach(cell => {
      // Only allow one edit at a time per cell
      const span = cell.querySelector('span[contenteditable]');
      const saveBtn = cell.querySelector('button.saveEdit');
      let originalValue = span ? span.textContent : '';
      // Save on button click
      if (saveBtn && span) {
        saveBtn.onclick = (e) => {
          e.stopPropagation();
          const field = cell.dataset.field;
          const id = cell.dataset.id;
          const newValue = span.textContent.trim();
          if (field === 'count') {
            liveCounts[id].count = parseInt(newValue) || 0;
          } else {
            liveCounts[id][field] = newValue;
          }
          updateLiveTable();
        };
      }
      // Save on Enter, cancel on Esc
      if (span) {
        span.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (saveBtn) saveBtn.click();
          } else if (e.key === 'Escape') {
            span.textContent = originalValue;
            span.blur();
          }
        });
        span.addEventListener('focus', () => {
          originalValue = span.textContent;
        });
        span.addEventListener('blur', () => {
          // When losing focus, don't auto-save (require save button or Enter)
        });
      }
    });
    // (END updateLiveTable)

    // Update the summary bar
    let totalItems = 0;
    let totalUnits = 0;
    let matches = 0;
    let overs = 0;
    let unders = 0;

    Object.entries(liveCounts).forEach(([item, obj]) => {
      totalItems += 1;
      totalUnits += obj.count;
      const expected = onHandMap[item] || 0;
      const diff = obj.count - expected;
      if (diff === 0) matches++;
      else if (diff > 0) overs++;
      else unders++;
    });

    summaryBar.innerHTML = `🧾 Total Unique Items: ${totalItems} &nbsp;&nbsp; 📦 Total Units Counted: ${totalUnits} &nbsp;&nbsp; ✅ Matches: ${matches} &nbsp;&nbsp; 🟢 Overs: ${overs} &nbsp;&nbsp; 🔴 Unders: ${unders}`;
  }

  function resetScanInput() {
    if (liveEntryInput) {
      liveEntryInput.value = '';
      requestAnimationFrame(() => liveEntryInput.focus());
    }
  }

  function proceedWithKnownScan(item) {
    if (locationMap[item]) {
      if (currentLocation === locationMap[item]) {
        const close = confirm(`You scanned the current location tag (${item}) again.\nWould you like to CLOSE this bay?`);
        if (close) {
          currentLocation = '';
          updateLocationStatus();
          alert('📦 Current location cleared.');
        }
      } else {
        currentLocation = locationMap[item];
        updateLocationStatus();
        alert(`📍 Current location set to: ${currentLocation}`);
      }
      resetScanInput();
      return;
    }

    if (!liveCounts[item]) {
      liveCounts[item] = {
        count: 0,
        category: categoryInput.value,
        location: currentLocation
      };
      playNewItemSound();
    }

    liveCounts[item].count += 1;
    liveCounts[item].category = liveCounts[item].category || categoryInput.value;
    liveCounts[item].location = currentLocation;

    updateRotationDate(liveCounts[item].category);
    updateLiveTable();
    resetScanInput();
  }

  async function processScan(item) {
    console.log("🔍 processScan triggered with:", item);
    if (!item) return;

    // Handle known codes
    if (upcToItem[item] || locationMap[item]) {
      proceedWithKnownScan(item);
      return;
    }

    // Unknown code, prompt user
    console.warn("⚠️ Unrecognized code — should trigger prompt:", item);
    const response = await showCustomPrompt(item);
    updateSuggestions();
    updateLiveTable();

    if (response === 'location') {
      const name = prompt(`🗂 Please enter a name for location "${item}":`);
      if (name) {
        locationMap[item] = name;
        saveLocationMap();
        currentLocation = name;
        updateLocationStatus();
        alert(`📍 Current location set to: ${name}`);
      }
      resetScanInput();
      return;
    } else if (response === 'product') {
      const userDefined = prompt(`UPC ${item} is not linked to a Lowe's item #. Please enter it now:`);
      if (userDefined) {
        upcToItem[item] = userDefined;
        saveUPCMap();
        item = userDefined;
      } else {
        resetScanInput();
        return;
      }
      resetScanInput();
      return;
    } else {
      resetScanInput();
      return;
    }
  }



  // --- Ensure critical buttons are assigned after DOMContentLoaded ---
  // (No duplicate clearLiveTable logic outside DOMContentLoaded; only the main one above with console.log.)

  // --- Auto-save session at configured interval (default 30 seconds) ---
  function getAutosaveIntervalMs() {
    const autosaveIntervalSelect = document.getElementById('autosaveIntervalSelect');
    const val = autosaveIntervalSelect ? parseInt(autosaveIntervalSelect.value) : 3;
    return Math.max(5, val) * 1000;
  }
  function setupAutosaveLoop() {
    if (autosaveTimer) clearInterval(autosaveTimer);
    // Only run autosave if enabled
    const enabled = document.getElementById('autosaveToggle')?.checked !== false;
    if (!enabled) return;
    const interval = getAutosaveIntervalMs();
    autosaveTimer = setInterval(() => {
      const session = {
        liveCounts: JSON.parse(JSON.stringify(liveCounts)),
        onHandText: document.getElementById('onHandInput').value
      };
      localStorage.setItem('inventorySession', JSON.stringify(session));
      // Also store versioned session for merge report
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      localStorage.setItem(`inventorySession_${timestamp}`, JSON.stringify(session));
      console.log('Auto-saved session');
    }, interval);
  }
  // Start autosave on load if enabled
  setupAutosaveLoop();

  // Auto-restore session on load if available
  const existingSession = localStorage.getItem('inventorySession');
  if (existingSession) {
    try {
      const parsed = JSON.parse(existingSession);
      const hasValidData = parsed && parsed.liveCounts && Object.keys(parsed.liveCounts).length > 0;
      if (hasValidData) {
        const confirmRestore = confirm("🧭 A previous session was found. Would you like to restore it?");
        if (confirmRestore) {
          Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
          Object.entries(parsed.liveCounts).forEach(([k, v]) => {
            liveCounts[k] = { count: v.count, category: v.category, location: v.location };
          });
          document.getElementById('onHandInput').value = parsed.onHandText || '';
          updateLiveTable();
          alert("✅ Previous session restored.");
        }
      }
    } catch (e) {
      console.warn("Invalid saved session:", e);
    }
  }
  // Re-setup autosave on interval or enabled/disabled change
  if (autosaveIntervalSelect) {
    autosaveIntervalSelect.addEventListener('change', setupAutosaveLoop);
  }
  if (autosaveToggle) {
    autosaveToggle.addEventListener('change', setupAutosaveLoop);
  }

  // At end of DOMContentLoaded, start auto Drive sync if enabled
  if (localStorage.getItem('driveSyncEnabled') === 'true') {
    startAutoDriveSync();
  }

  // --- Auto-generate Excel file every 10 minutes ---
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  function downloadAutoExcelBackup() {
    if (Object.keys(liveCounts).length === 0) {
      console.log("⏭️ Skipping Excel backup — no data to export.");
      return;
    }
    const wb = XLSX.utils.book_new();
    const ws_data = [['Item #', 'Expected', 'Found', 'Difference', 'Prev Week', 'Δ vs Last Week', 'Category', 'Location']];

    const onHandText = document.getElementById('onHandInput').value;
    const onHandLines = onHandText.trim().split(/\n+/);
    const onHandMap = {};
    onHandLines.forEach(line => {
      const [item, count] = line.split(':');
      if (item && count) onHandMap[item.trim()] = parseInt(count.trim());
    });

    const previousDates = Object.keys(weeklyCounts).sort().reverse();
    const lastWeek = previousDates.length > 1 ? weeklyCounts[previousDates[1]] : null;

    Object.entries(liveCounts).forEach(([item, obj]) => {
      const count = obj.count;
      const expected = onHandMap[item] || 0;
      const diff = count - expected;
      const previous = lastWeek ? lastWeek[item] || 0 : '';
      const weekDiff = lastWeek ? count - previous : '';
      ws_data.push([item, expected, count, diff, previous, weekDiff, obj.category || '', obj.location || '']);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets['Inventory'] = ws;
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`;
    XLSX.writeFile(wb, `inventory-backup-${timestamp}.xlsx`);
  }

  // Auto-generate Excel file every 10 minutes
  setInterval(() => {
    if (Object.keys(liveCounts).length > 0) {
      downloadAutoExcelBackup();
      console.log('🔄 Auto-downloaded Excel backup');
    }
  }, 10 * 60 * 1000);

  // Register service worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registered ✅', reg))
      .catch(err => console.error('Service Worker registration failed ❌', err));
  }

  // --- Session Manager Logic ---
  // --- Import Excel Session File ---
  const importExcelSessionBtn = document.getElementById('importExcelSession');
  const triggerImportExcelSessionBtn = document.getElementById('triggerImportExcelSession');

  if (triggerImportExcelSessionBtn && importExcelSessionBtn) {
    triggerImportExcelSessionBtn.addEventListener('click', () => {
      importExcelSessionBtn.click();
    });

    importExcelSessionBtn.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.name.endsWith('.xlsx')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

          const header = rows[0];
          const upcIndex = header.findIndex(h => /upc/i.test(h));
          const itemIndex = header.findIndex(h => /item/i.test(h));
          const countIndex = header.findIndex(h => /found/i.test(h));
          const categoryIndex = header.findIndex(h => /category/i.test(h));
          const locationIndex = header.findIndex(h => /location/i.test(h));

          Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const upc = upcIndex !== -1 ? row[upcIndex] : null;
            const item = row[itemIndex];
            if (!item) continue;

            const key = upc || item;

            liveCounts[item] = {
              count: parseInt(row[countIndex]) || 0,
              category: row[categoryIndex] || '',
              location: row[locationIndex] || ''
            };

            if (upc) {
              upcToItem[upc] = item;
            } else {
              upcToItem[item] = item;
            }

            const loc = row[locationIndex];
            if (loc && !Object.values(locationMap).includes(loc)) {
              locationMap[item] = loc;
            }
          }
          saveUPCMap();
          saveLocationMap();
          updateLiveTable();
          alert('📥 Excel session imported!');
        };
        reader.readAsArrayBuffer(file);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const imported = JSON.parse(reader.result);
            if (imported && imported.liveCounts) {
              Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
              Object.entries(imported.liveCounts).forEach(([k, v]) => {
                liveCounts[k] = { count: v.count, category: v.category, location: v.location };
              });
              document.getElementById('onHandInput').value = imported.onHandText || '';
              updateLiveTable();
              alert('📥 Excel session imported successfully!');
            } else {
              alert('❌ Invalid session file.');
            }
          } catch (err) {
            alert('❌ Failed to parse session file.');
          }
        };
        reader.readAsText(file);
      }
    });
  }
  const savedSessionsList = document.getElementById('savedSessionsList');
  const viewSavedSessionsBtn = document.getElementById('viewSavedSessions');
  const clearAllSessionsBtn = document.getElementById('clearAllSessions');

  function renderSavedSessions() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('inventorySession_'));
    if (keys.length === 0) {
      if (savedSessionsList) savedSessionsList.innerHTML = '<p>No saved sessions found.</p>';
      return;
    }

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = 0;

    keys.sort().reverse().forEach(key => {
      const li = document.createElement('li');
      li.style.marginBottom = '6px';
      const dateLabel = key.replace('inventorySession_', '');
      const loadBtn = document.createElement('button');
      loadBtn.textContent = `📥 Load ${dateLabel}`;
      loadBtn.style.marginRight = '6px';
      loadBtn.onclick = () => {
        const session = JSON.parse(localStorage.getItem(key));
        if (!session || !session.liveCounts) return alert('Invalid session data.');
        Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
        Object.entries(session.liveCounts).forEach(([k, v]) => {
          liveCounts[k] = { count: v.count, category: v.category, location: v.location };
        });
        document.getElementById('onHandInput').value = session.onHandText || '';
        updateLiveTable();
        alert(`Session from ${dateLabel} loaded.`);
      };

      const exportBtn = document.createElement('button');
      exportBtn.textContent = '📤 Export';
      exportBtn.style.marginRight = '6px';
      exportBtn.onclick = () => {
        const session = localStorage.getItem(key);
        const blob = new Blob([session], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${key}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️ Delete';
      deleteBtn.onclick = () => {
        if (confirm(`Delete session ${dateLabel}?`)) {
          localStorage.removeItem(key);
          renderSavedSessions();
        }
      };

      li.appendChild(loadBtn);
      li.appendChild(exportBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });

    if (savedSessionsList) {
      savedSessionsList.innerHTML = '';
      savedSessionsList.appendChild(list);
    }
  }

  if (viewSavedSessionsBtn) {
    viewSavedSessionsBtn.addEventListener('click', () => {
      renderSavedSessions();
    });
  }

  if (clearAllSessionsBtn) {
    clearAllSessionsBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all saved sessions? This cannot be undone.')) {
        Object.keys(localStorage)
          .filter(k => k.startsWith('inventorySession_'))
          .forEach(k => localStorage.removeItem(k));
        renderSavedSessions();
        alert('All saved sessions cleared.');
      }
    });
  }

  // --- Floating Nav Tab Switching (cleaned up) ---
  const tabSections = document.querySelectorAll('.tab-section');
  const floatingNavButtons = document.querySelectorAll('.floating-nav .nav-icon');

  floatingNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabSections.forEach(section => section.classList.remove('active'));
      floatingNavButtons.forEach(b => b.classList.remove('active'));
      const newTab = document.getElementById(targetTab);
      if (newTab) newTab.classList.add('active');
      btn.classList.add('active');
    });
  });

  // Set default tab to 'count' on load
  document.getElementById('count').classList.add('active');
  document.querySelector('.floating-nav .nav-icon[data-tab="count"]').classList.add('active');
  // --- Floating Nav Toggle Logic ---
  const toggleFloatingNav = document.getElementById('toggleFloatingNav');
  const floatingNav = document.querySelector('.floating-nav');

  if (toggleFloatingNav && floatingNav) {
    toggleFloatingNav.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling
      floatingNav.classList.toggle('nav-collapsed');
    });
  }

  // Activate the default tab on load
  document.getElementById('count').classList.add('active');
  document.querySelector('.floating-nav .nav-icon[data-tab="count"]').classList.add('active');
  // Focus the liveEntry input on load
  restoreFocusToEntry();
  // Dynamically load the Google API script
  const gapiScript = document.createElement('script');
  gapiScript.src = 'https://apis.google.com/js/api.js';
  gapiScript.onload = () => {
    gapiInit();
  };
  document.body.appendChild(gapiScript);
});