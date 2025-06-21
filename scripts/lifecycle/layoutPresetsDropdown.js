// 🧠 Phase 360.1A — Layout Preset Dropdown UI
console.log('👁️ layoutPresetsDropdown.js has loaded.');
import {
  saveLayoutPreset,
  loadLayoutPreset,
  getAvailablePresets,
  deleteLayoutPreset
} from './layoutPresets.js';

// Make updateDropdown accessible globally within the module
let dropdown;

const updateDropdown = () => {
  if (!dropdown) return;
  dropdown.innerHTML = '';
  const options = getAvailablePresets();
  options.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    dropdown.appendChild(opt);
  });
};

function registerPresetConsole() {
  if (document.getElementById('presetDropdownConsole')) {
    console.log('⚠️ Preset Dropdown Console already exists. Skipping registration.');
    return;
  }

  try {
    console.log('🧪 Initializing Preset Dropdown Console...');
    
    // Define and configure container FIRST so toggleBtn.onclick can see it
    const container = document.createElement('div');
    container.id = 'presetDropdownConsole';
    container.style.position = 'fixed';
    container.style.top = '80px';
    container.style.right = '40px';
    container.style.zIndex = '9999';
    // container.style.pointerEvents = 'none';
    // container.style.opacity = 0;
    // container.style.visibility = 'hidden';
    container.style.background = 'rgba(0,0,0,0.8)';
    container.style.border = '1px solid #0ff';
    container.style.color = '#0ff';
    container.style.fontFamily = 'monospace';
    container.style.fontSize = '12px';
    container.style.padding = '10px';
    container.style.borderRadius = '6px';
    // container.style.display = 'none';

    dropdown = document.createElement('select');
    dropdown.style.marginBottom = '8px';
    dropdown.style.width = '100%';

    const loadBtn = document.createElement('button');
    loadBtn.textContent = 'Load';
    loadBtn.onclick = () => loadLayoutPreset(dropdown.value);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save As';
    saveBtn.onclick = () => {
      let name = prompt('Enter a name for this layout preset:');
      if (name) {
        const existing = getAvailablePresets();
        if (existing.includes(name)) {
          const confirmVersion = confirm(`Preset "${name}" already exists. Save as "${name}_v2"?`);
          if (confirmVersion) {
            name = `${name}_v2`;
          } else {
            return;
          }
        }
        saveLayoutPreset(name);
        updateDropdown();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      if (dropdown.value && confirm(`Delete preset "${dropdown.value}"?`)) {
        deleteLayoutPreset(dropdown.value);
        updateDropdown();
      }
    };

    // 🔁 Attach listeners after button creation
    loadBtn.addEventListener("click", () => {
      console.log("📦 Load Preset clicked!");
      loadLayoutPreset(dropdown.value);
    });

    saveBtn.addEventListener("click", () => {
      console.log("💾 Save Preset clicked!");
      let name = prompt('Enter a name for this layout preset:');
      if (name) {
        const existing = getAvailablePresets();
        if (existing.includes(name)) {
          const confirmVersion = confirm(`Preset "${name}" already exists. Save as "${name}_v2"?`);
          if (confirmVersion) {
            name = `${name}_v2`;
          } else {
            return;
          }
        }
        saveLayoutPreset(name);
        updateDropdown();
      }
    });

    deleteBtn.addEventListener("click", () => {
      console.log("🗑️ Delete Preset clicked!");
      if (dropdown.value && confirm(`Delete preset "${dropdown.value}"?`)) {
        deleteLayoutPreset(dropdown.value);
        updateDropdown();
      }
    });

    [loadBtn, saveBtn, deleteBtn].forEach(btn => {
      btn.style.marginRight = '5px';
      btn.style.fontSize = '12px';
      btn.style.padding = '4px 8px';
      btn.style.cursor = 'pointer';
      btn.style.background = 'black';
      btn.style.border = '1px solid #0ff';
      btn.style.color = '#0ff';
      btn.style.borderRadius = '4px';
    });

    container.appendChild(dropdown);
    container.appendChild(loadBtn);
    container.appendChild(saveBtn);
    container.appendChild(deleteBtn);

    // Ensure the dropdown HUD is anchored directly to the holo-console-grid or fallback to body
    const parentContainer = document.querySelector('.holo-console-grid') || document.body;
    parentContainer.appendChild(container);

    // --- Post-DOM-injection button rebinding for async/robustness ---
    setTimeout(() => {
      const loadBtn = document.getElementById("loadPresetBtn") || container.querySelector("button:nth-of-type(1)");
      const saveBtn = document.getElementById("savePresetBtn") || container.querySelector("button:nth-of-type(2)");
      const deleteBtn = document.getElementById("deletePresetBtn") || container.querySelector("button:nth-of-type(3)");

      if (!loadBtn || !saveBtn || !deleteBtn) {
        console.warn("⚠️ Buttons not found in DOM for post-injection binding.");
        return;
      }

      loadBtn.addEventListener("click", () => {
        console.log("📦 Load Preset clicked!");
        loadLayoutPreset(dropdown.value);
      });

      saveBtn.addEventListener("click", () => {
        console.log("💾 Save Preset clicked!");
        let name = prompt('Enter a name for this layout preset:');
        if (name) {
          const existing = getAvailablePresets();
          if (existing.includes(name)) {
            const confirmVersion = confirm(`Preset "${name}" already exists. Save as "${name}_v2"?`);
            if (confirmVersion) {
              name = `${name}_v2`;
            } else {
              return;
            }
          }
          saveLayoutPreset(name);
          updateDropdown();
        }
      });

      deleteBtn.addEventListener("click", () => {
        console.log("🗑️ Delete Preset clicked!");
        if (dropdown.value && confirm(`Delete preset "${dropdown.value}"?`)) {
          deleteLayoutPreset(dropdown.value);
          updateDropdown();
        }
      });

      console.log("✅ Listeners attached after DOM injection.");
    }, 0);

    container.style.display = 'block';
    container.style.position = 'fixed';
    container.style.top = '100px';
    container.style.right = '40px';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'auto';
    container.style.opacity = 1;
    container.style.visibility = 'visible';

    updateDropdown();

    console.log('✅ Preset Dropdown Console initialized successfully.');
  } catch (err) {
    console.error('❌ Error during Preset Dropdown Console initialization:', err);
  }
}

function createPresetDropdownUI() {
  if (document.getElementById('presetDropdownConsole')) {
    console.log('⚠️ Preset Dropdown Console already exists. Skipping duplicate creation.');
    return;
  }
  registerPresetConsole();

  // After registration, ensure container is correctly styled and appended
  const container = document.getElementById('presetDropdownConsole');
  if (container) {
    const parentContainer = document.querySelector('.holo-console-grid') || document.body;
    parentContainer.appendChild(container);
    container.style.position = 'fixed';
    container.style.top = '80px';
    container.style.right = '40px';
    container.style.zIndex = '9999';
    container.style.pointerEvents = 'auto';
    container.style.opacity = 1;
    container.style.visibility = 'visible';
    container.style.display = 'block';
  }

  // Phase 397 — Dropdown Visibility Binding Refresh
  const layoutToggle = document.getElementById('layoutToggleBtn');
  const dropdown = document.getElementById('presetDropdownConsole');
  if (layoutToggle && dropdown) {
    layoutToggle.addEventListener('click', () => {
      const isHidden = dropdown.style.display === 'none' || dropdown.style.display === '';
      dropdown.style.display = isHidden ? 'block' : 'none';
      console.log(`🎛️ Layout dropdown now ${isHidden ? 'visible' : 'hidden'}`);
    });
  }
}


// 🧠 Phase 360.2 — Hotkey Layout Recall System
const layoutHotkeyMap = {
  1: 'SovereignAlpha',
  2: 'GridChaos',
  3: 'DebugView',
  4: 'SilentOps'
  // You can expand this as needed
};

document.addEventListener('keydown', e => {
  if (e.metaKey && !isNaN(e.key)) {
    const presetName = layoutHotkeyMap[parseInt(e.key)];
    if (presetName) {
      loadLayoutPreset(presetName);
      console.log(`🎯 Hotkey Layout "${presetName}" activated via ⌘ + ${e.key}`);
    }
  }
});


// 🧠 Phase 360.3 — Preset Auto-Restore on Boot
const lastPreset = localStorage.getItem('lastUsedLayoutPreset');
if (lastPreset) {
  loadLayoutPreset(lastPreset);
  console.log(`🔁 Auto-restored preset: "${lastPreset}"`);
}

// 🛡️ SovereignPresets Safety Declaration
if (!window.SovereignPresets) window.SovereignPresets = {};
// Monitor preset loads to track last used
const originalLoad = SovereignPresets?.load;
if (originalLoad) {
  SovereignPresets.load = function(name) {
    originalLoad(name);
    localStorage.setItem('lastUsedLayoutPreset', name);
  };
}

// Removed always-on Layout Toggle Button creation and binding

// Ensure the dropdown UI is initialized after DOM is fully loaded
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', () => {
//     createPresetDropdownUI();
//   });
// } else {
//   createPresetDropdownUI();
// }

// window.addEventListener("load", () => {
//   setTimeout(() => {
//     if (window.meshSystemInitialized) {
//       console.log("🎼 Mesh system initialized. Orchestrating HUD...");
//       createPresetDropdownUI();
//       const hud = document.getElementById("presetDropdownConsole");
//       if (hud) {
//         hud.style.display = "block";
//         hud.style.opacity = 1;
//         hud.style.visibility = "visible";
//         hud.style.pointerEvents = "auto";
//         hud.style.position = "fixed";
//         hud.style.top = "80px";
//         hud.style.right = "40px";
//         hud.style.zIndex = "99999";
//       }
//     } else {
//       console.warn("⚠️ Mesh system not initialized. HUD orchestration delayed.");
//     }
//   }, 500);
// });


// 🧠 Phase 361.1 — Universal HUD Binder Injection
function bindUniversalHUDListeners() {
  const hud = document.getElementById("presetDropdownConsole");
  if (!hud) return console.warn("⚠️ No Console found for universal binding.");

  const loadBtn = hud.querySelector("button:nth-of-type(1)");
  const saveBtn = hud.querySelector("button:nth-of-type(2)");
  const deleteBtn = hud.querySelector("button:nth-of-type(3)");

  if (!loadBtn || !saveBtn || !deleteBtn) {
    console.warn("⚠️ Console buttons not found for universal bind.");
    return;
  }

  loadBtn.addEventListener("click", () => {
    console.log("📦 [UNIVERSAL] Load Preset clicked.");
    loadLayoutPreset(dropdown.value);
  });

  saveBtn.addEventListener("click", () => {
    console.log("💾 [UNIVERSAL] Save Preset clicked.");
    let name = prompt("Enter a name for this layout preset:");
    if (name) {
      const existing = getAvailablePresets();
      if (existing.includes(name)) {
        const confirmVersion = confirm(`Preset "${name}" already exists. Save as "${name}_v2"?`);
        if (confirmVersion) {
          name = `${name}_v2`;
        } else {
          return;
        }
      }
      saveLayoutPreset(name);
      updateDropdown();
    }
  });

  deleteBtn.addEventListener("click", () => {
    console.log("🗑️ [UNIVERSAL] Delete Preset clicked.");
    if (dropdown.value && confirm(`Delete preset "${dropdown.value}"?`)) {
      deleteLayoutPreset(dropdown.value);
      updateDropdown();
    }
  });

  console.log("✅ [UNIVERSAL] Console listeners attached successfully.");
}

// Auto-invoke the universal binder once DOM is ready
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', bindUniversalHUDListeners);
// } else {
//   bindUniversalHUDListeners();
// }

export { createPresetDropdownUI };

// 🧠 Final HUD teleport and fix after all layout logic is complete
// window.addEventListener("load", () => {
//   if (!document.getElementById('presetDropdownConsole')) {
//     console.warn('☠️ Console was missing during resurrection. Reinforcing...');
//     createPresetDropdownUI();
//   }
//   const hud = document.getElementById('presetDropdownConsole');
//   if (hud) {
//     console.log('📦 Finalizing Console teleport...');
//     hud.style.position = 'fixed';
//     hud.style.top = '80px';
//     hud.style.right = '40px';
//     hud.style.zIndex = '9999';
//     hud.style.pointerEvents = 'auto';
//     hud.style.opacity = 1;
//     hud.style.visibility = 'visible';
//     const container = document.querySelector('.holo-console-grid') || document.body;
//     container.appendChild(hud);
//   } else {
//     console.warn('⚠️ Console missing on final load.');
//   }
// });

// 🧠 SovereignPresets — Global Terminal Control Layer
window.SovereignPresets = {
  save(name) {
    if (!name) return console.warn('⚠️ No preset name provided.');
    const existing = getAvailablePresets();
    if (existing.includes(name)) {
      const versioned = `${name}_v2`;
      console.warn(`⚠️ Preset "${name}" already exists. Saving as "${versioned}".`);
      name = versioned;
    }
    saveLayoutPreset(name);
    // updateDropdown(); // Disabled UI update
    console.log(`✅ Preset "${name}" saved.`);
  },
  load(name) {
    if (!name) return console.warn('⚠️ No preset name provided.');
    loadLayoutPreset(name);
    console.log(`✅ Preset "${name}" loaded.`);
  },
  delete(name) {
    if (!name) return console.warn('⚠️ No preset name provided.');
    deleteLayoutPreset(name);
    // updateDropdown(); // Disabled UI update
    console.log(`🗑️ Preset "${name}" deleted.`);
  },
  list() {
    const list = getAvailablePresets();
    console.log('📁 Available Presets:', list);
    return list;
  }
};

// 🧠 Phase 361.4 — HUD Refresh Command
// window.refreshPresetHUD = function() {
//   let hud = document.getElementById('presetDropdownConsole');
//   if (!hud) {
//     console.warn('⚠️ Preset Dropdown Console not found. Reinitializing...');
//     createPresetDropdownUI();
//     hud = document.getElementById('presetDropdownConsole');
//     if (!hud) {
//       console.error('❌ Failed to reinitialize presetDropdownConsole during refresh.');
//       return;
//     }
//   }

//   // Re-append to ensure it's in correct position
//   const container = document.querySelector('.holo-console-grid') || document.body;
//   container.appendChild(hud);

//   hud.style.display = 'block';
//   hud.style.pointerEvents = 'auto';
//   hud.style.opacity = 1;
//   hud.style.visibility = 'visible';
//   hud.style.position = 'fixed';
//   hud.style.top = '80px';
//   hud.style.right = '40px';
//   hud.style.zIndex = '99999';

//   console.log('🔁 HUD refresh complete. Console reinitialized and visible.');
// };