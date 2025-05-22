function saveUPCMap() {
  localStorage.setItem('upcToItemMap', JSON.stringify(upcToItem));
}

function saveLocationMap() {
  localStorage.setItem('locationMap', JSON.stringify(locationMap));
}
// --- Ensure all critical global variables are declared ONCE at the top ---
let liveCounts = window.liveCounts || {};
let autosaveTimer = null;
const upcToItem = JSON.parse(localStorage.getItem('upcToItemMap')) || {};
const locationMap = JSON.parse(localStorage.getItem('locationMap')) || {};

import { generateCodeVerifier, generateCodeChallenge } from './pkce.js';

// --- Dropbox Access Token Refresh/Getter ---
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    alert("❌ No refresh token available. Please reconnect Dropbox.");
    return null;
  }

  const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: '0s592qf9o6g9cwx'
    })
  });

  const data = await res.json();
  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
    return data.access_token;
  } else {
    console.warn("❌ Failed to refresh Dropbox token:", data);
    return null;
  }
}

async function getDropboxAccessToken() {
  let token = localStorage.getItem('access_token');
  if (!token) {
    token = await refreshAccessToken();
  }
  return token;
}

// --- updateRotationDate helper ---
function updateRotationDate(category) {
  const now = new Date().toISOString();
  const rotationData = JSON.parse(localStorage.getItem('auditRotation')) || {};
  rotationData[category] = now;
  localStorage.setItem('auditRotation', JSON.stringify(rotationData));
  console.log(`🔁 Updated rotation date for "${category}"`);
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Dropbox OAuth2 PKCE Integration ---
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    handleDropboxCallback(); // Handle redirect after Dropbox login
  }

  async function beginDropboxLogin() {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem('pkce_verifier', verifier);

    const clientId = '0s592qf9o6g9cwx';
    const redirectUri = 'https://silentsage432.github.io/inventory-tool/';

    const authUrl = `https://www.dropbox.com/oauth2/authorize?response_type=code&token_access_type=offline&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${challenge}`;
    window.location.href = authUrl;
  }

  async function handleDropboxCallback() {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log("Code from URL:", code);
    const verifier = localStorage.getItem('pkce_verifier');
    console.log("Verifier from localStorage:", verifier);
    const redirectUri = 'https://silentsage432.github.io/inventory-tool/';
    const clientId = '0s592qf9o6g9cwx';

    try {
      const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          grant_type: 'authorization_code',
          client_id: clientId,
          code_verifier: verifier,
          redirect_uri: redirectUri
        })
      });

      const text = await res.text();
      console.log("🔁 Dropbox Token HTTP Status:", res.status);
      console.log("📦 Raw response:", text);

      const data = JSON.parse(text);
      if (data.access_token) {
        console.log("✅ Dropbox token received:", data.access_token);
        localStorage.setItem('access_token', data.access_token);

        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
          console.log("✅ refresh_token saved:", data.refresh_token);
        } else if (!localStorage.getItem('refresh_token')) {
          console.warn("⚠️ No refresh token returned.");
        }

        alert("✅ Dropbox connected! Redirecting...");
        setTimeout(() => {
          window.location.href = redirectUri;
        }, 1000);
        return;
      }

      console.warn("❌ Dropbox returned error:", data);
      console.warn("Full Dropbox callback response:", text);
      alert("❌ Dropbox login failed.");
    } catch (err) {
      console.error("❌ Dropbox callback error:", err);
      alert("❌ Dropbox login failed due to network or parsing error.");
    }
  }
  console.log("✅ DOMContentLoaded fired and script.js is active");
  // --- Ensure all critical button variables are defined after DOMContentLoaded begins ---
  const addLiveItemBtn = document.getElementById('addLiveItem');
  // Add event listener for Add Live Item button with updated logic (delayed prompt)
  if (addLiveItemBtn) {
    addLiveItemBtn.addEventListener('click', async () => {
      console.log("📦 Add Item button clicked (manual)");
      const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
      if (!val) return;

      // If known code, proceed as normal
      if (upcToItem[val] || locationMap[val]) {
        processScan(val);
        return;
      }

      // For manually entered unknown codes, delay prompt until user confirms
      console.warn("⚠️ Manual entry of unrecognized code:", val);
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
        const inferredCategory = inferUserCategoryPattern(val) || suggestCategoryFromUPC(val);
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

          upcToItem[val] = item;
          saveUPCMap();
          // Remove the raw UPC from liveCounts if present
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
    });
  }
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
  let settingsTarget = document.querySelector('#tools .settings-group');
  if (!settingsTarget) {
    settingsTarget = document.createElement('div');
    settingsTarget.className = 'settings-group';
    document.getElementById('tools')?.appendChild(settingsTarget);
  }
  if (settingsTarget) {
    settingsTarget.appendChild(backupBtn);
  }
  // --- Dropbox Integration for Save/Load Session ---

  async function saveSessionToDropbox() {
    const session = {
      liveCounts,
      onHandText: document.getElementById('onHandInput').value
    };
    const blob = new Blob([JSON.stringify(session)], { type: 'application/json' });

    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: '/active_session.json',
          mode: 'overwrite',
          autorename: false,
          mute: true
        })
      },
      body: blob
    });

    if (response.ok) {
      alert('✅ Session saved to Dropbox!');
    } else if (response.status === 401) {
      alert('❌ Dropbox token expired or unauthorized. Please refresh your access token.');
    } else {
      const err = await response.text();
      alert(`❌ Failed to save: ${err}`);
    }
  }

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
            path: `/auto_backup_session_${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
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

  async function loadSessionFromDropbox() {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Dropbox-API-Arg': JSON.stringify({ path: '/active_session.json' })
      }
    });

    if (!response.ok) {
      const err = await response.text();
      alert(`❌ Failed to load: ${err}`);
      return;
    }

    const session = await response.json();
    if (!session.liveCounts) return alert('❌ Invalid session format.');
    Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
    Object.entries(session.liveCounts).forEach(([k, v]) => {
      liveCounts[k] = { count: v.count, category: v.category, location: v.location };
    });
    document.getElementById('onHandInput').value = session.onHandText || '';
    updateLiveTable();
    alert('📥 Session loaded from Dropbox!');
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
  const browseBackupsBtn = document.createElement('button');
  browseBackupsBtn.textContent = '📁 Browse Dropbox Backups';
  browseBackupsBtn.style.marginTop = '8px';
  browseBackupsBtn.onclick = async () => {
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
      .filter(f => f.name.endsWith('.json'))
      .sort((a, b) => new Date(b.client_modified) - new Date(a.client_modified));

    if (backups.length === 0) {
      alert('❌ No backup files found.');
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
    title.textContent = '📁 Select a Backup File';
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

        const session = await dlResponse.json();
        if (!session.liveCounts) return alert('❌ Invalid backup format.');
        Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
        Object.entries(session.liveCounts).forEach(([k, v]) => {
          liveCounts[k] = { count: v.count, category: v.category, location: v.location };
        });
        document.getElementById('onHandInput').value = session.onHandText || '';
        updateLiveTable();
        document.body.removeChild(modal);
        alert(`📥 Backup "${file.name}" loaded!`);
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

  // --- Dropbox OAuth2 PKCE Login Button ---
  const loginBtn = document.createElement('button');
  loginBtn.textContent = '🔐 Connect Dropbox';
  loginBtn.onclick = beginDropboxLogin;
  settingsTarget?.appendChild(loginBtn);

  // --- Reset Dropbox Connection Button ---
  const resetDropboxBtn = document.createElement('button');
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
  restoreUPCBtn.textContent = '🔄 Restore UPC Map from Dropbox';
  restoreUPCBtn.style.marginTop = '8px';
  restoreUPCBtn.onclick = async () => {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Dropbox-API-Arg': JSON.stringify({ path: '/upc_map_backup.json' })
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

  // --- Scan Logic Setup ---
  const liveEntryInput = document.getElementById('liveEntry');
  // Add Enter key handler for liveEntryInput
  if (liveEntryInput) {
    liveEntryInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault(); // prevent accidental form submits or focus shifts
        const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
        const isScannerInput = val.length >= 10 && !isNaN(val);
        if (val && isScannerInput) {
          processScan(val);
        }
      }
    });
    // Add input event handler for mobile/soft-keyboard scanners (barcode-only detection)
    liveEntryInput.addEventListener('input', () => {
      const val = liveEntryInput.value.replace(/[\n\r]+/g, '').trim();
      if (val.length >= 5) {
        // Only auto-scan if input is coming from a scanner (e.g., input event is too fast for typing)
        const isScannerInput = val.length >= 10 && !isNaN(val);
        if (isScannerInput) {
          processScan(val);
        }
      }
    });
  }
  // (Redundant Add Live Item button click listener removed above to avoid duplicate event handlers.)
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
    // Ensure headers are in correct order and match the specified columns
    const headerRow = document.querySelector('#liveCountTable thead tr');
    if (headerRow) {
      // Clear all existing headers
      while (headerRow.firstChild) headerRow.removeChild(headerRow.firstChild);
      [
        'Item #',
        'Expected',
        'Found',
        'Difference',
        'Prev Week',
        'Δ vs Last Week',
        'Category',
        'Location',
        'Edit'
      ].forEach((label, idx) => {
        const th = document.createElement('th');
        th.textContent = label;
        // Optionally add classes for easy lookup
        if (label === 'Category') th.className = 'category-header';
        if (label === 'Location') th.className = 'location-header';
        if (label === 'Edit') th.className = 'edit-header';
        headerRow.appendChild(th);
      });
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

    Object.entries(liveCounts).forEach(([rawItem, obj]) => {
      const item = (rawItem || '').trim();
      if (!item) return;
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
      // --- Add diff color logic ---
      let diffColor = 'black';
      if (diff > 0) diffColor = 'green';
      else if (diff < 0) diffColor = 'red';
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

      // --- Create row with editable cells and Edit button in correct column order ---
      const tr = document.createElement('tr');
      tr.className = diff < 0 ? 'under' : diff > 0 ? 'over' : 'match';
      // Set background color by category if defined
      if (categoryColors[obj.category]) {
        tr.style.backgroundColor = categoryColors[obj.category];
      }
      // Build table row using explicit cell creation for safety and alignment
      const cells = [];

      const itemCell = document.createElement('td');
      itemCell.innerHTML = `${item} ${icon} ${category ? `<span class="category-badge">${category}</span>` : ''}`;
      cells.push(itemCell);

      const expectedCell = document.createElement('td');
      expectedCell.textContent = expected;
      cells.push(expectedCell);

      const countCell = document.createElement('td');
      countCell.className = 'editable';
      countCell.dataset.field = 'count';
      countCell.dataset.id = item;
      countCell.innerHTML = `<span contenteditable="true" spellcheck="false">${count}</span><button class="saveEdit" title="Save" style="margin-left:2px;">✅</button>`;
      cells.push(countCell);

      const diffCell = document.createElement('td');
      diffCell.textContent = diff > 0 ? `+${diff}` : `${diff}`;
      diffCell.style.color = diffColor;
      cells.push(diffCell);

      const prevCell = document.createElement('td');
      prevCell.textContent = previous !== '' ? previous : '-';
      cells.push(prevCell);

      const weekDiffCell = document.createElement('td');
      weekDiffCell.textContent = weekDiff !== '' ? (weekDiff > 0 ? `+${weekDiff}` : `${weekDiff}`) : '-';
      cells.push(weekDiffCell);

      const categoryCell = document.createElement('td');
      categoryCell.className = 'editable';
      categoryCell.dataset.field = 'category';
      categoryCell.dataset.id = item;
      categoryCell.innerHTML = `<span contenteditable="true" spellcheck="false">${category}</span><button class="saveEdit" title="Save" style="margin-left:2px;">✅</button>`;
      cells.push(categoryCell);

      const locationCell = document.createElement('td');
      locationCell.className = 'editable';
      locationCell.dataset.field = 'location';
      locationCell.dataset.id = item;
      locationCell.innerHTML = `<span contenteditable="true" spellcheck="false">${location}</span><button class="saveEdit" title="Save" style="margin-left:2px;">✅</button>`;
      cells.push(locationCell);

      const editCell = document.createElement('td');
      editCell.innerHTML = `<button class="editRow" data-id="${item}">✏️</button>`;
      cells.push(editCell);

      cells.forEach(cell => tr.appendChild(cell));
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
    if (upcToItem[item]) {
      item = upcToItem[item];
    }
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

  // Suggest category helper based on UPC prefix
  function suggestCategoryFromUPC(upc) {
    for (const knownUPC in upcToItem) {
      if (knownUPC.slice(0, 5) === upc.slice(0, 5)) {
        const item = upcToItem[knownUPC];
        const category = liveCounts[item]?.category;
        if (category) return category;
      }
    }
    return null;
  }

  // Infer user category pattern from recent entries
  function inferUserCategoryPattern(upc) {
    const prefix = upc.slice(0, 5);
    const recentCategories = Object.values(liveCounts)
      .slice(-10)
      .map(entry => entry.category)
      .filter(Boolean);
    if (!recentCategories.length) return null;
    const freq = {};
    recentCategories.forEach(cat => freq[cat] = (freq[cat] || 0) + 1);
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : null;
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
      const inferredCategory = inferUserCategoryPattern(item) || suggestCategoryFromUPC(item);
      const userDefined = prompt(
        `UPC ${item} is not linked to a Lowe's item #.\nEnter the item # (suggested category: "${inferredCategory || 'Unknown'}")`
      );
      if (userDefined) {
        const trimmedItem = userDefined.trim();
        if (!trimmedItem) {
          alert("❌ Invalid item number.");
          resetScanInput();
          return;
        }

        upcToItem[item] = trimmedItem;
        saveUPCMap();
        if (item !== trimmedItem) delete liveCounts[item];
        delete liveCounts[trimmedItem];
        liveCounts[trimmedItem] = {
          count: 1,
          category: inferredCategory || categoryInput.value || '',
          location: currentLocation
        };

        console.log("✅ Stored item:", trimmedItem, "for UPC:", item);
        console.log("📦 liveCounts entry:", liveCounts[trimmedItem]);

        updateRotationDate(liveCounts[trimmedItem].category);
        updateLiveTable();
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

  // Start Dropbox auto-backup every 15 minutes (customizable)
  setupDropboxAutoBackup(15);

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

  // (No auto Drive sync; Dropbox only supports manual save/load in this integration.)

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
    // --- Conditional formatting: color-code "Difference" column (D) ---
    // Apply conditional styling to "Difference" column (D)
    for (let i = 1; i < ws_data.length; i++) {
      const diff = ws_data[i][3]; // Column D: Difference
      const cellRef = `D${i + 1}`;
      if (!ws[cellRef]) continue;
      if (diff > 0) {
        ws[cellRef].s = { font: { color: { rgb: "008000" } } }; // green
      } else if (diff < 0) {
        ws[cellRef].s = { font: { color: { rgb: "FF0000" } } }; // red
      } else {
        ws[cellRef].s = { font: { color: { rgb: "000000" } } }; // black
      }
    }
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

          // --- Validation logic for required columns ---
          console.log('🧭 Excel Header Map:', {
            upcIndex,
            itemIndex,
            countIndex,
            categoryIndex,
            locationIndex
          });

          const requiredFields = [
            { name: 'Item', index: itemIndex },
            { name: 'Count (Found)', index: countIndex },
            { name: 'Category', index: categoryIndex },
            { name: 'Location', index: locationIndex }
          ];
          const missing = requiredFields.filter(f => f.index === -1).map(f => f.name);
          if (missing.length > 0) {
            alert(`❌ Missing required column(s): ${missing.join(', ')}\nPlease check your Excel file and try again.`);
            return;
          }

          Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const upc = upcIndex !== -1 ? row[upcIndex] : null;
            const item = (row[itemIndex] || '').toString().trim();
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
  // (Google API script loading removed; no longer required.)
});