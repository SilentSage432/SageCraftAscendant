import { updateMapStatusDisplay } from './ui.js';

async function syncAllMapsToDropbox() {
  const upcToItem = window.upcToItem || {};
  const locationMap = window.locationMap || {};
  const eslToUPC = window.eslToUPC || {};

  const files = [
    { name: 'upcToItemMap.json', data: upcToItem },
    { name: 'locationMap.json', data: locationMap },
    { name: 'eslToUPCMap.json', data: eslToUPC },
    { name: 'eslToItemMap.json', data: window.eslToItemMap || {} },
    { name: 'bayToItemMap.json', data: window.bayToItemMap || {} }
  ];

  for (const file of files) {
    const blob = new Blob([JSON.stringify(file.data)], { type: 'application/json' });

    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: `/beta-test-1/${file.name}`,
          mode: 'overwrite',
          autorename: false,
          mute: true
        })
      },
      body: blob
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`❌ Failed to upload ${file.name}:`, err);
      alert(`❌ Failed to upload ${file.name}`);
      return;
    }
  }

  alert('✅ All maps synced to Dropbox!');
  window.logFieldEvent("DropboxSyncMaps", { files });
}

async function restoreAllMapsFromDropbox() {
  const mapFiles = [
    { key: 'upcToItemMap', file: 'upcToItemMap.json' },
    { key: 'locationMap', file: 'locationMap.json' },
    { key: 'eslToUPCMap', file: 'eslToUPCMap.json' },
    { key: 'eslToItemMap', file: 'eslToItemMap.json' },
    { key: 'bayToItemMap', file: 'bayToItemMap.json' }
  ];

  for (const { key, file } of mapFiles) {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Dropbox-API-Arg': JSON.stringify({ path: `/beta-test-1/${file}` })
      }
    });

    if (!response.ok) {
      const err = await response.text();
      console.warn(`⚠️ Could not restore ${file}: ${err}`);
      continue;
    }

    const text = await response.text();
    try {
      const parsed = JSON.parse(text);
      localStorage.setItem(key, JSON.stringify(parsed));
      window[key] = parsed;
    } catch (e) {
      console.error(`❌ Failed to parse ${file}:`, e);
    }
  }

  updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
  alert('📂 Maps restored from Dropbox!');
  window.logFieldEvent("DropboxRestoreMaps", { restored: true });
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64Digest;
}

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
  console.log("🔐 Access token being used:", token);
  return token;
}

async function saveSessionToDropbox(liveCounts, onHandText) {
  const session = { liveCounts, onHandText };
  const blob = new Blob([JSON.stringify(session)], { type: 'application/json' });

  const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await getDropboxAccessToken()}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path: '/beta-test-1/active_session.json',
        mode: 'overwrite',
        autorename: false,
        mute: true
      })
    },
    body: blob
  });

  if (!response.ok) {
    const err = await response.text();
    alert(`❌ Failed to save: ${err}`);
  } else {
    alert('✅ Session saved to Dropbox!');
    window.logFieldEvent("DropboxSaveSession", { session });
  }
}

async function loadSessionFromDropbox(liveCounts, onHandInput, updateLiveTable) {
  const response = await fetch('https://content.dropboxapi.com/2/files/download', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await getDropboxAccessToken()}`,
      'Dropbox-API-Arg': JSON.stringify({ path: '/beta-test-1/active_session.json' })
    }
  });

  if (!response.ok) {
    const err = await response.text();
    alert(`❌ Failed to load: ${err}`);
    return;
  }

  const text = await response.text();
  const session = JSON.parse(text);
  if (!session.liveCounts) return alert('❌ Invalid session format.');
  Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
  Object.entries(session.liveCounts).forEach(([k, v]) => {
    liveCounts[k] = { count: v.count, category: v.category, location: v.location };
  });
  onHandInput.value = session.onHandText || '';
  updateLiveTable();
  alert('📥 Session loaded from Dropbox!');
  window.logFieldEvent("DropboxLoadSession", { session });
}

async function listDropboxSessions() {
  const response = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await getDropboxAccessToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: '/beta-test-1',
      recursive: false,
      include_media_info: false,
      include_deleted: false,
      include_has_explicit_shared_members: false
    })
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('❌ Failed to list Dropbox folder:', err);
    return [];
  }

  const data = await response.json();
  const sessionFiles = data.entries
    .filter(entry => entry.name.endsWith('.json') && entry.name.startsWith('session_'))
    .map(entry => entry.name);

  return sessionFiles;
}

async function loadSelectedDropboxSession(filename, liveCounts, onHandInput, updateLiveTable) {
  const response = await fetch('https://content.dropboxapi.com/2/files/download', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await getDropboxAccessToken()}`,
      'Dropbox-API-Arg': JSON.stringify({ path: `/beta-test-1/${filename}` })
    }
  });

  if (!response.ok) {
    const err = await response.text();
    alert(`❌ Failed to load ${filename}: ${err}`);
    return;
  }

  const text = await response.text();
  const session = JSON.parse(text);
  if (!session.liveCounts) return alert(`❌ Invalid session format in ${filename}`);
  Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
  Object.entries(session.liveCounts).forEach(([k, v]) => {
    liveCounts[k] = { count: v.count, category: v.category, location: v.location };
  });
  onHandInput.value = session.onHandText || '';
  updateLiveTable();
  alert(`📥 ${filename} loaded from Dropbox!`);
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
  const verifier = localStorage.getItem('pkce_verifier');
  const redirectUri = 'https://silentsage432.github.io/inventory-tool/';
  const clientId = '0s592qf9o6g9cwx';

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
  const data = JSON.parse(text);

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    alert("✅ Dropbox connected! Redirecting...");
    setTimeout(() => {
      window.location.href = redirectUri;
    }, 1000);
  } else {
    alert("❌ Dropbox login failed.");
  }
}

function initDropbox() {
  console.log("🚀 Dropbox module initialized");
}

window.addEventListener('load-dropbox-session', () => {
  const onHandInput = document.getElementById('onhandText');
  if (!onHandInput) {
    alert("❌ Cannot load session: 'onhandText' input not found.");
    return;
  }

  const liveCounts = window.liveCounts || {};
  const updateLiveTable = window.updateLiveTable || (() => {
    console.warn("⚠️ updateLiveTable not available.");
  });

  loadSessionFromDropbox(liveCounts, onHandInput, updateLiveTable);
});

window.addEventListener('connect-dropbox', () => {
  console.log('🔐 Initiating Dropbox connection...');
  beginDropboxLogin();
});

window.addEventListener('refresh-dropbox-token', async () => {
  const token = await refreshAccessToken();
  if (token) {
    alert('♻️ Dropbox token refreshed.');
  }
});

window.addEventListener('sync-all-maps', async () => {
  await syncAllMapsToDropbox();
});

window.addEventListener('restore-all-maps', async () => {
  await restoreAllMapsFromDropbox();
});


async function syncEverythingToDropbox(liveCounts, onHandText) {
  await syncAllMapsToDropbox();
  await saveSessionToDropbox(liveCounts, onHandText);
  alert("✅ Full backup completed to Dropbox!");
}

async function restoreEverythingFromDropbox(liveCounts, onHandInput, updateLiveTable) {
  await restoreAllMapsFromDropbox();
  await loadSessionFromDropbox(liveCounts, onHandInput, updateLiveTable);
  alert("📥 Full restore completed from Dropbox!");
}

export {
  generateCodeVerifier,
  generateCodeChallenge,
  syncAllMapsToDropbox,
  restoreAllMapsFromDropbox,
  refreshAccessToken,
  getDropboxAccessToken,
  saveSessionToDropbox,
  loadSessionFromDropbox,
  listDropboxSessions,
  loadSelectedDropboxSession,
  beginDropboxLogin,
  handleDropboxCallback,
  initDropbox,
  syncEverythingToDropbox,
  restoreEverythingFromDropbox
};