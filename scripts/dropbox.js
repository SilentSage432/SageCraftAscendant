// scripts/dropbox.js

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

export async function refreshAccessToken() {
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
  
  export async function getDropboxAccessToken() {
    let token = localStorage.getItem('access_token');
    if (!token) {
      token = await refreshAccessToken();
    }
    console.log("🔐 Access token being used:", token);
    return token;
  }
  
  export async function saveSessionToDropbox(liveCounts, onHandText) {
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
    }
  }
  
  export async function loadSessionFromDropbox(liveCounts, onHandInput, updateLiveTable) {
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
  }
  
  export async function beginDropboxLogin() {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
  
    localStorage.setItem('pkce_verifier', verifier);
  
    const clientId = '0s592qf9o6g9cwx';
    const redirectUri = 'https://silentsage432.github.io/inventory-tool/';
  
    const authUrl = `https://www.dropbox.com/oauth2/authorize?response_type=code&token_access_type=offline&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${challenge}`;
    window.location.href = authUrl;
  }
  
  export async function handleDropboxCallback() {
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

export function initDropbox() {
  console.log("🚀 Dropbox module initialized");
}

// Listen for 'load-dropbox-session' custom event to trigger session restoration
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

// Connect to Dropbox
window.addEventListener('connect-dropbox', () => {
  console.log('🔐 Initiating Dropbox connection...');
  beginDropboxLogin();
});

// Refresh Dropbox token
window.addEventListener('refresh-dropbox-token', async () => {
  const token = await refreshAccessToken();
  if (token) {
    alert('♻️ Dropbox token refreshed.');
  }
});

// Sync all maps to Dropbox
window.addEventListener('sync-all-maps', async () => {
  alert('🛠 Sync logic for maps not yet implemented.');
});

// Restore all maps from Dropbox
window.addEventListener('restore-all-maps', async () => {
  alert('🛠 Restore logic for maps not yet implemented.');
});

export { generateCodeVerifier, generateCodeChallenge };