// Wrap all logic in DOMContentLoaded, and move everything inside
document.addEventListener('DOMContentLoaded', () => {
  // --- Ensure global variables are declared at the top ---
  // (Other globals already declared inside block, e.g. weeklyCounts, upcToItem, locationMap)
  // --- New item sound and glow trigger ---
  const newItemSound = new Audio('sounds/mystic-ping.mp3');
  function playNewItemSound() {
    newItemSound.currentTime = 0;
    newItemSound.play().catch(err => {
      console.warn("Sound error:", err);
    });
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
      console.log('✅ Google API initialized');
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
  const saveToDriveBtn = document.getElementById('saveToDrive');
  if (saveToDriveBtn) {
    saveToDriveBtn.addEventListener('click', saveSessionToDrive);
  }
  const loadFromDriveBtn = document.getElementById('loadFromDrive');
  if (loadFromDriveBtn) {
    loadFromDriveBtn.addEventListener('click', loadSessionFromDrive);
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
      };

      document.getElementById('modalBtnLocation').onclick = () => cleanup('location');
      document.getElementById('modalBtnProduct').onclick = () => cleanup('product');
      document.getElementById('modalBtnCancel').onclick = () => cleanup(null);
    });
  }
  let currentLocation = '';
  const upcToItem = JSON.parse(localStorage.getItem('upcToItemMap')) || {};
  const locationMap = JSON.parse(localStorage.getItem('locationMap')) || {};

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
  const liveEntryInput = document.getElementById('liveEntry');
  function restoreFocusToEntry() {
    setTimeout(() => {
      liveEntryInput.focus();
    }, 50);
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
  updateSuggestions();

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
  const liveQtyInput = document.getElementById('liveQty');
  const categoryInput = document.getElementById('liveCategory');

  // --- Location status visual indicator ---
  const locationStatus = document.createElement('div');
  locationStatus.id = 'locationStatus';
  locationStatus.style.marginTop = '10px';
  locationStatus.style.fontWeight = 'bold';
  locationStatus.textContent = '📍 No Active Bay';
  locationStatus.style.color = 'red';
  categoryInput.insertAdjacentElement('afterend', locationStatus);


  // --- Export locationMap as JSON ---
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

  // --- Import locationMap from file ---
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

  // --- Export UPC Mappings as JSON ---
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

  // --- Import UPC Mappings from file ---
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


  function updateLocationStatus() {
    if (currentLocation) {
      locationStatus.textContent = `📍 Active Bay: ${currentLocation}`;
      locationStatus.style.color = 'limegreen';
    } else {
      locationStatus.textContent = '📍 No Active Bay';
      locationStatus.style.color = 'red';
    }
  }
  const liveTableBody = document.querySelector('#liveCountTable tbody');
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
  document.getElementById('settings').appendChild(batchSection);

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


  // --- Scanning input logic: seamless, robust version ---
  // Debounce timeout for scan input
  let scanTimeout = null;

  // Helper to clear and refocus the scan input
  function resetScanInput() {
    liveEntryInput.value = '';
    liveEntryInput.focus();
    liveQtyInput.value = '1';
  }

  // Debounced input event: triggers scan if manual toggle is on
  liveEntryInput.addEventListener('input', () => {
    if (scanTimeout) clearTimeout(scanTimeout);
    scanTimeout = setTimeout(() => {
      const manualToggle = document.getElementById('manualToggle');
      if (manualToggle && manualToggle.checked) {
        autoTriggerScan();
      }
    }, 200);
  });

  // Enter key: triggers scan immediately
  liveEntryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      autoTriggerScan();
    }
  });

  // Main scan handler: triggered by input or enter
  function autoTriggerScan() {
    const item = liveEntryInput.value.trim();
    if (!item) return;
    handleScannedInput(item);
  }

  // Async scan processing logic
  async function handleScannedInput(item) {
    if (!item) return;

    // If unknown code, prompt user to identify
    if (!upcToItem[item] && !locationMap[item]) {
      try {
        const response = await showCustomPrompt(item);
        if (response === 'location') {
          const name = prompt(`🗂 Please enter a name for location "${item}":`);
          if (name) {
            locationMap[item] = name;
            saveLocationMap();
            currentLocation = name;
            updateLocationStatus();
            alert(`📍 Current location set to: ${name}`);
          }
        } else if (response === 'product') {
          processProduct(item);
        }
      } catch (e) {
        console.error('Error handling custom prompt:', e);
      }
      resetScanInput();
      return;
    }

    // Handle location tag scans
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

    // Process known product scans
    processProduct(item);
    resetScanInput();
  }

  // Process scanned product item
  function processProduct(item) {
    let mappedItem = upcToItem[item] || item;

    if (!upcToItem[item]) {
      const userDefined = prompt(`UPC ${item} is not linked to a Lowe's item #. Please enter it now:`);
      if (userDefined) {
        upcToItem[item] = userDefined;
        saveUPCMap();
        mappedItem = userDefined;
      }
    }

    if (!liveCounts[mappedItem]) {
      liveCounts[mappedItem] = { count: 0, category: categoryInput.value };
      playNewItemSound();
      setTimeout(() => {
        const tableRows = document.querySelectorAll("#liveCountTable tbody tr");
        const lastRow = tableRows[tableRows.length - 1];
        if (lastRow) {
          lastRow.classList.add("new-item-flash");
          setTimeout(() => lastRow.classList.remove("new-item-flash"), 1200);
        }
      }, 150);
    }

    if (!upcToItem[item]) {
      liveEntryInput.classList.add("scan-error");
      setTimeout(() => {
        liveEntryInput.classList.remove("scan-error");
      }, 400);
    }

    const qty = parseInt(liveQtyInput.value) || 1;
    liveCounts[mappedItem].count += qty;
    liveCounts[mappedItem].location = currentLocation;

    updateLiveTable();
    updateSuggestions();
    showScanMappingLog(item, mappedItem);
  }

  function updateLiveTable() {
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
    liveTableBody.innerHTML = '';
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

  function saveUPCMap() {
    localStorage.setItem('upcToItemMap', JSON.stringify(upcToItem));
  }

  function saveLocationMap() {
    localStorage.setItem('locationMap', JSON.stringify(locationMap));
  }

  // --- Ensure critical buttons are assigned after DOMContentLoaded ---
  // Manual toggle, import/export, and mapping buttons are now static in HTML. Only add event listeners.
  // Clear live table button
  const clearBtn = document.getElementById('clearLiveTable');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      Object.keys(liveCounts).forEach(key => delete liveCounts[key]);
      liveEntryInput.value = '';
      liveQtyInput.value = '1';
      updateLiveTable();
      updateSuggestions();
      summaryBar.innerHTML = '';
    });
  }

  // Clear history button
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all historical weekly data? This will not affect your current session or saved Excel reports.')) {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`archivedWeeklyCounts_${today}`, JSON.stringify(weeklyCounts));
        localStorage.removeItem('weeklyCounts');
        alert('Weekly history cleared! A snapshot has been saved.');
        updateLiveTable();
        updateSuggestions();
        summaryBar.innerHTML = '';
      }
    });
  }
  // Add event listener for Add Item button
  const addLiveItemBtn = document.getElementById('addLiveItem');
  if (addLiveItemBtn) {
    addLiveItemBtn.addEventListener('click', () => {
      console.log('Add Item button clicked');
      const item = liveEntryInput.value.trim();
      if (!item) {
        alert('Please enter or scan an item before adding.');
        return;
      }
      handleScannedInput(item);
    });
  }
  // Save/Load Session buttons
  const saveSessionBtn = document.getElementById('saveSession');
  if (saveSessionBtn) {
    saveSessionBtn.addEventListener('click', () => {
      const session = {
        liveCounts: JSON.parse(JSON.stringify(liveCounts)),
        onHandText: document.getElementById('onHandInput').value
      };
      localStorage.setItem('inventorySession', JSON.stringify(session));
      alert('Session saved!');
    });
  }
  const loadSessionBtn = document.getElementById('loadSession');
  if (loadSessionBtn) {
    loadSessionBtn.addEventListener('click', () => {
      const session = JSON.parse(localStorage.getItem('inventorySession'));
      if (session) {
        Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
        Object.entries(session.liveCounts || {}).forEach(([k, v]) => {
          liveCounts[k] = { count: v.count, category: v.category, location: v.location };
        });
        document.getElementById('onHandInput').value = session.onHandText;
        updateLiveTable();
        alert('Session loaded!');
      } else {
        alert('No saved session found.');
      }
    });
  }
  const excelBtn = document.getElementById('downloadExcel');
  if (excelBtn) {
    excelBtn.addEventListener('click', () => {
      // Ensure header includes 'Location'
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
        // Ensure location is included as a dedicated column
        ws_data.push([item, expected, count, diff, previous, weekDiff, obj.category || '', obj.location || '']);
      });
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let row = 1; row <= range.e.r; row++) {
        const diffCellRef = XLSX.utils.encode_cell({ c: 3, r: row });
        const diffValue = ws[diffCellRef].v;
        let fillColor = null;
        if (diffValue > 0) fillColor = 'C6EFCE';
        else if (diffValue < 0) fillColor = 'FFC7CE';
        if (fillColor) {
          ws[diffCellRef].s = {
            fill: {
              patternType: 'solid',
              fgColor: { rgb: fillColor }
            }
          };
        }
      }
      wb.Sheets['Inventory'] = ws;
      XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
      // --- Google Drive upload ---
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      uploadExcelToDrive(blob);
      XLSX.writeFile(wb, 'inventory_report.xlsx');
    });
    // --- Attach event listener to "Merge Master Report" button in HTML ---
  // --- Google Drive Auth Button Listener ---
  const authBtn = document.getElementById('authGoogleDrive');
  if (authBtn) {
    authBtn.addEventListener('click', () => {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.oauth2) {
        const tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              gapi.client.setToken({ access_token: tokenResponse.access_token });
              alert('🔓 Authenticated with Google Drive');
            } else {
              alert('❌ Token generation failed');
            }
          }
        });
        tokenClient.requestAccessToken();
      } else {
        alert('Google Identity Services not available.');
      }
    });
  }
    const mergeReportBtn = document.getElementById('mergeReport');
    if (mergeReportBtn) {
      mergeReportBtn.addEventListener('click', () => {
        const savedKeys = Object.keys(localStorage).filter(k => k.startsWith('inventorySession_'));
        if (savedKeys.length === 0) {
          alert('No saved sessions found to merge.');
          return;
        }
        const wb = XLSX.utils.book_new();
        savedKeys.forEach(key => {
          const session = JSON.parse(localStorage.getItem(key));
          if (!session || !session.liveCounts) return;
          const ws_data = [['Item #', 'Found', 'Category', 'Location']];
          Object.entries(session.liveCounts).forEach(([item, obj]) => {
            ws_data.push([item, obj.count, obj.category || '', obj.location || '']);
          });
          const sheetName = key.replace('inventorySession_', '');
          const ws = XLSX.utils.aoa_to_sheet(ws_data);
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });
        XLSX.writeFile(wb, 'merged_inventory_report.xlsx');
      });
    }
  }

  // --- Auto-save session at configured interval (default 30 seconds) ---
  function getAutosaveIntervalMs() {
    const intervalElem = document.getElementById('autosaveIntervalSelect');
    let mins = 0.5;
    if (intervalElem) {
      const val = parseFloat(intervalElem.value);
      if (!isNaN(val)) mins = val;
    }
    return mins * 60 * 1000;
  }

  let autosaveTimer = null;
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
          const itemIndex = header.findIndex(h => /item/i.test(h));
          const countIndex = header.findIndex(h => /found/i.test(h));
          const categoryIndex = header.findIndex(h => /category/i.test(h));
          const locationIndex = header.findIndex(h => /location/i.test(h));

          Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const item = row[itemIndex];
            if (!item) continue;
            liveCounts[item] = {
              count: parseInt(row[countIndex]) || 0,
              category: row[categoryIndex] || '',
              location: row[locationIndex] || ''
            };
          }
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

  // --- Tab Switching Logic ---
  const tabLinks = document.querySelectorAll('.tablink');
  const tabSections = document.querySelectorAll('.tab-section');

  tabLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabSections.forEach(tab => tab.classList.remove('active'));
      tabLinks.forEach(t => t.classList.remove('active'));
      const newTab = document.getElementById(targetTab);
      const newTabBtn = document.querySelector(`.tablink[data-tab="${targetTab}"]`);
      if (newTab) newTab.classList.add('active');
      if (newTabBtn) newTabBtn.classList.add('active');
    });
  });

  // --- Floating Nav Tab Switching ---
  const floatingNavButtons = document.querySelectorAll('.floating-nav .nav-icon');
  floatingNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabSections.forEach(section => section.classList.remove('active'));
      tabLinks.forEach(link => link.classList.remove('active'));
      const newTab = document.getElementById(targetTab);
      const correspondingBtn = document.querySelector(`.tablink[data-tab="${targetTab}"]`);
      if (newTab) newTab.classList.add('active');
      if (correspondingBtn) correspondingBtn.classList.add('active');
    });
  });
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
  document.querySelector('.tablink[data-tab="count"]').classList.add('active');
  document.getElementById('count').classList.add('active');
  // Focus the liveEntry input on load
  restoreFocusToEntry();
  // Dynamically load the Google API script
  const gapiScript = document.createElement('script');
  gapiScript.src = 'https://apis.google.com/js/api.js';
  gapiScript.onload = () => {
    console.log("📦 Google API script loaded");
  };
  document.head.appendChild(gapiScript);

  // Dynamically inject Google Identity Services script
  const gisScript = document.createElement('script');
  gisScript.src = 'https://accounts.google.com/gsi/client';
  gisScript.onload = () => {
    console.log('🔐 Google Identity Services loaded');
  };
  document.head.appendChild(gisScript);

  // --- Audit Rotation Table Logic ---
  const rotationData = JSON.parse(localStorage.getItem('auditRotation')) || {
    'Laundry': '',
    'Fridges & Freezers': '',
    'Ranges': '',
    'Dishwashers': '',
    'Wall Ovens': '',
    'Cooktops': '',
    'OTR Microwaves': '',
    'Microwaves (Countertop)': '',
    'Vent Hoods': '',
    'Beverage & Wine Coolers': '',
    'Cabinets': '',
    'Countertops': '',
    'Interior Doors': '',
    'Exterior Doors': '',
    'Storm Doors': '',
    'Windows': '',
    'Commodity Moulding': '',
    'Other / Misc': ''
  };

  function renderRotationTable() {
    const rotationDiv = document.getElementById('rotationTable');
    if (!rotationDiv) return;

    let tableHTML = '<table><thead><tr><th>Category</th><th>Last Audited</th><th>Due Again</th></tr></thead><tbody>';
    Object.entries(rotationData).forEach(([cat, lastDate]) => {
      const dueDate = lastDate ? new Date(new Date(lastDate).getTime() + 7 * 24 * 60 * 60 * 1000) : '';
      const dueText = dueDate ? dueDate.toISOString().split('T')[0] : '';
      tableHTML += `<tr><td>${cat}</td><td>${lastDate || '-'}</td><td>${dueText || '-'}</td></tr>`;
    });
    tableHTML += '</tbody></table>';
    rotationDiv.innerHTML = tableHTML;
  }

  function updateRotationDate(category) {
    const today = new Date().toISOString().split('T')[0];
    rotationData[category] = today;
    localStorage.setItem('auditRotation', JSON.stringify(rotationData));
    renderRotationTable();
  }

  renderRotationTable();
});

  // --- Attach live search event ---
  const searchBox = document.getElementById('liveSearchInput');
  if (searchBox) {
    searchBox.addEventListener('input', updateLiveTable);
  }
  // Update location status on load
  // (Moved inside DOMContentLoaded, so this will already be called)
  // On window load, attempt to load session from Drive if enabled and not already loaded
  window.addEventListener('load', () => {
    if (localStorage.getItem('driveSyncEnabled') === 'true') {
      // attempt to load from Drive if not already loaded
      if (Object.keys(liveCounts).length === 0) {
        if (typeof loadSessionFromDrive === 'function') {
          loadSessionFromDrive();
        }
      }
    }
  });
});