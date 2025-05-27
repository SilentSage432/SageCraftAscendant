

export function createToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#222',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    zIndex: '9999',
    textAlign: 'center'
  });
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), duration);
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