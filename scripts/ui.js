export function showScanMappingLog(scannedCode, mappedItem) {
  const log = document.createElement('div');
  log.textContent = `✅ Code ${scannedCode} recognized as Lowe’s #${mappedItem}`;
  Object.assign(log.style, {
    position: 'fixed',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#222',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    zIndex: '9999',
    textAlign: 'center'
  });
  document.body.appendChild(log);
  setTimeout(() => document.body.removeChild(log), 3000);
}

export function updateLocationStatus(currentLocation) {
  const locationStatus = document.getElementById('locationStatus');
  if (!locationStatus) return;
  if (currentLocation) {
    locationStatus.textContent = `📍 Active Bay: ${currentLocation}`;
    locationStatus.style.color = 'limegreen';
  } else {
    locationStatus.textContent = '📍 No Active Bay';
    locationStatus.style.color = 'red';
  }
}

export function createToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    backgroundColor: '#222',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    marginTop: '10px',
    opacity: '0.95',
    transition: 'opacity 0.5s ease-out'
  });
  toast.classList.add('toast-message');

  const container = document.getElementById('toastContainer');
  if (container) {
    container.appendChild(toast);
  } else {
    document.body.appendChild(toast);
  }

  setTimeout(() => {
    toast.classList.add('fade-out');
  
    // Fallback: remove the toast after 1s if transitionend never fires
    const fallback = setTimeout(() => toast.remove(), 1000);
  
    toast.addEventListener('transitionend', () => {
      clearTimeout(fallback);
      toast.remove();
    });
  }, duration);
}

export function updateMapStatusDisplay(upcToItem, eslToUPC, locationMap) {
  const mapStatus = document.getElementById('mapStatusDisplay');
  if (!mapStatus) return;

  const upcCount = Object.keys(upcToItem || {}).length;
  const eslCount = Object.keys(eslToUPC || {}).length;
  const bayCount = Object.keys(locationMap || {}).length;

  mapStatus.textContent = `🧠 Map Status: UPC → ${upcCount} | ESL → ${eslCount} | Bay Codes → ${bayCount}`;
}

export function restoreFocusToEntry() {
  const input = document.getElementById('liveEntry');
  if (input) input.focus();
}
export function setupMoreOptionsToggle() {
  const moreOptionsBtn = document.getElementById('moreOptionsBtn');
  const moreOptionsSection = document.getElementById('advancedControls');

  if (moreOptionsBtn && moreOptionsSection) {
    moreOptionsBtn.addEventListener('click', () => {
      moreOptionsSection.classList.toggle('expanded');
    });
  }
}