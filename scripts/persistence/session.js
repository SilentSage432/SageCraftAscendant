// session.js

import { updateMapStatusDisplay } from './ui.js';

export function initSessionTools() {
  console.log('📦 Session module initialized');

  // Clean up stale sessions on load
  cleanEmptySessions();

  // Auto-restore last saved session if it exists
  const savedSession = localStorage.getItem('savedSession');
  if (savedSession) {
    try {
      window.sessionMap = JSON.parse(savedSession);
      const event = new CustomEvent('session-loaded');
      window.dispatchEvent(event);
      console.log('🔄 Auto-restored previous session from localStorage.');
    } catch (err) {
      console.error('❌ Failed to auto-restore session:', err);
    }
  }

  // Optional: log how many session entries are stored
  const keys = Object.keys(localStorage).filter(k => k.startsWith('inventorySession_'));
  console.log(`🗂️ Found ${keys.length} stored session${keys.length !== 1 ? 's' : ''}`);

  updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
}

export function saveESLMap() {
  localStorage.setItem('eslToUPCMap', JSON.stringify(window.eslToUPC));
  updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
}

export function cleanEmptySessions() {
  const keys = Object.keys(localStorage);
  let deletedCount = 0;

  keys.forEach(key => {
    if (key.startsWith('inventorySession_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        const isEmpty =
          !data ||
          (data.liveCounts && Object.keys(data.liveCounts).length === 0) &&
          (data.onHandText === '');

        if (isEmpty) {
          localStorage.removeItem(key);
          deletedCount++;
        }
      } catch (err) {
        console.warn(`⚠️ Could not parse or remove ${key}`, err);
      }
    }
  });

  if (deletedCount > 0) {
    console.log(`🧹 Removed ${deletedCount} empty session${deletedCount !== 1 ? 's' : ''}`);
  }
}
