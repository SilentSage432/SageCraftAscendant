// esl.js

import {
    eslToUPC,
    upcToItem,
    normalizeUPC,
    saveUPCMap
} from './maps.js';

import { saveESLMap } from './session.js';
  
const processScan = window.processScan;
  
  export function isESL(code) {
    return typeof code === 'string' && code.length === 13 && code.startsWith('0');
  }

  export function setupESLHandlers() {
    const modalBtnESL = document.getElementById('modalBtnESL');
    const modalBtnESLTag = document.getElementById('modalBtnESLTag');
    const liveEntryInput = document.getElementById('liveEntry');
    let currentESLItem = null;
  
    window.setCurrentESLItem = (item) => {
      currentESLItem = item;
    };
  
    if (modalBtnESL) {
      modalBtnESL.onclick = () => {
        const item = normalizeUPC(currentESLItem);
        const itemNum = prompt(`Enter the Lowe’s item number for ESL: ${item}`);
        if (item && itemNum?.trim()) {
          const trimmed = itemNum.trim();
          if (eslToUPC[item] && eslToUPC[item] !== trimmed) {
            const confirmOverwrite = confirm(`⚠️ ESL ${item} is already mapped to Lowe’s #${eslToUPC[item]}. Overwrite with #${trimmed}?`);
            if (!confirmOverwrite) {
              const overlay = document.getElementById('customModal');
              if (overlay) overlay.style.display = 'none';
              return;
            }
          }
          eslToUPC[item] = trimmed;
          localStorage.setItem('eslToUPCMap', JSON.stringify(eslToUPC));
  
          const toast = document.createElement('div');
          toast.textContent = '🏷️ ESL Tag mapped successfully';
          Object.assign(toast.style, {
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: '#222', color: '#fff', padding: '10px 18px', borderRadius: '8px',
            fontSize: '14px', zIndex: '9999', textAlign: 'center'
          });
          document.body.appendChild(toast);
          setTimeout(() => document.body.removeChild(toast), 3000);
  
          if (liveEntryInput) liveEntryInput.value = '';
        }
        const overlay = document.getElementById('customModal');
        if (overlay) overlay.style.display = 'none';
      };
    }
  
    if (modalBtnESLTag) {
      modalBtnESLTag.onclick = () => {
        const normalized = normalizeUPC(currentESLItem);
        const itemNum = prompt(`Enter the Lowe’s item number for ESL tag: ${normalized}`);
        if (itemNum?.trim()) {
          const trimmed = itemNum.trim();
          if (eslToUPC[normalized] && eslToUPC[normalized] !== trimmed) {
            const confirmOverwrite = confirm(`⚠️ ESL ${normalized} is already mapped to Lowe’s #${eslToUPC[normalized]}. Overwrite with #${trimmed}?`);
            if (!confirmOverwrite) {
              const overlay = document.getElementById('customModal');
              if (overlay) overlay.style.display = 'none';
              return;
            }
          }
          eslToUPC[normalized] = trimmed;
          upcToItem[normalized] = trimmed;
          saveUPCMap();
          saveESLMap();
          console.log(`📎 ESL ${normalized} → Lowe’s #${trimmed}`);
          processScan(trimmed);
          if (liveEntryInput) liveEntryInput.value = '';
        }
        const overlay = document.getElementById('customModal');
        if (overlay) overlay.style.display = 'none';
      };
    }

    const overlay = document.querySelector('.mystic-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('mystic-modal-overlay')) {
          overlay.style.display = 'none';
        }
      });
    }
  }

  export function initESL() {
    console.log("🏷️ ESL module initialized");
  }