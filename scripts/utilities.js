// ===============================
// Utilities Module — utilities.js
// Inventory Auditor — Modular Refactor v1
// ===============================

/**
 * Sleep helper — async delay
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Pad number with leading zero
 */
function pad(n) {
  return n < 10 ? '0' + n : n;
}

/**
 * Generate timestamp string for backups
 */
function generateTimestamp() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

/**
 * Safe parse JSON with fallback
 */
function safeParse(json, fallback = {}) {
  try {
    return JSON.parse(json);
  } catch (err) {
    console.warn("Failed to parse JSON:", err);
    return fallback;
  }
}

/**
 * Toast helper for quick notifications
 */
function showToast(msg, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = msg;
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
    textAlign: 'center',
  });
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), duration);
}

/**
 * Format date object into YYYY-MM-DD string
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

export { formatDate, generateTimestamp as generateUUID, sleep as delay, safeParse, showToast };