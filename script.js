document.addEventListener('DOMContentLoaded', () => {
  // --- Custom modal prompt for unrecognized code type ---
  function showCustomPrompt(item) {
    return new Promise(resolve => {
      const overlay = document.getElementById('customModal');
      document.getElementById('modalPromptText').textContent = `Unrecognized code: "${item}" — what type of tag is this?`;
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
  const liveCounts = {};
  const weeklyCounts = JSON.parse(localStorage.getItem('weeklyCounts')) || {};
  const liveEntryInput = document.getElementById('liveEntry');

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
  const liveQtyInput = document.createElement('input');
  liveQtyInput.type = 'number';
  liveQtyInput.min = '1';
  liveQtyInput.value = '1';
  liveQtyInput.id = 'liveQtyInput';
  liveQtyInput.placeholder = 'Qty';
  liveEntryInput.insertAdjacentElement('afterend', liveQtyInput);
  const categoryInput = document.createElement('select');
  categoryInput.id = 'categoryInput';
  [
    'Laundry',
    'Fridges & Freezers',
    'Ranges',
    'Dishwashers',
    'Wall Ovens',
    'Cooktops',
    'OTR Microwaves',
    'Microwaves (Countertop)',
    'Vent Hoods',
    'Beverage & Wine Coolers',
    'Cabinets',
    'Countertops',
    'Interior Doors',
    'Exterior Doors',
    'Storm Doors',
    'Windows',
    'Commodity Moulding',
    'Other / Misc'
  ].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryInput.appendChild(opt);
  });
  liveQtyInput.insertAdjacentElement('afterend', categoryInput);

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

  // ---- Add "View Trends" button below the comparison dropdown ----
  const trendBtn = document.createElement('button');
  trendBtn.textContent = '📈 View Trends';
  trendBtn.id = 'viewTrendsBtn';
  trendBtn.style.marginTop = '10px';
  compareSection.insertAdjacentElement('afterend', trendBtn);

  // ---- Event listener for "View Trends" ----
  trendBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.id = 'trendModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#1e1e1e';
    modal.style.color = '#fff';
    modal.style.padding = '20px';
    modal.style.border = '1px solid #ccc';
    modal.style.zIndex = '9999';
    modal.style.maxHeight = '80vh';
    modal.style.overflowY = 'auto';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.marginBottom = '10px';
    closeBtn.addEventListener('click', () => modal.remove());
    modal.appendChild(closeBtn);

    Object.keys(liveCounts).forEach(item => {
      const container = document.createElement('div');
      container.style.margin = '10px 0';
      const title = document.createElement('h3');
      title.textContent = `Item ${item}`;
      container.appendChild(title);

      // Compose trend data for this item
      const trendData = Object.entries(weeklyCounts)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, counts]) => ({ date, count: counts[item] || 0 }));

      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');

      // Draw line chart
      ctx.beginPath();
      // Find max count for scaling
      const maxCount = Math.max(1, ...trendData.map(p => p.count));
      trendData.forEach((point, i) => {
        const x = trendData.length === 1 ? canvas.width/2 : i * (canvas.width / (trendData.length - 1));
        const y = canvas.height - (point.count / maxCount * canvas.height);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#4bc0c0';
      ctx.lineWidth = 2;
      ctx.stroke();

      const label = document.createElement('p');
      label.textContent = trendData.map(d => `${d.date}: ${d.count}`).join(' | ');
      container.appendChild(canvas);
      container.appendChild(label);
      modal.appendChild(container);
    });

    document.body.appendChild(modal);
  });

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
            return;
          }
        } else if (response === 'product') {
          processProduct(trimmed);
        } else {
          liveEntryInput.value = '';
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
            return;
          } else {
            currentLocation = locationMap[trimmed];
            updateLocationStatus();
            alert(`📍 Current location set to: ${currentLocation}`);
            liveEntryInput.value = '';
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
      liveEntryInput.focus();
    });
  }

  const clearBatchBtn = document.getElementById('clearBatch');
  if (clearBatchBtn) {
    clearBatchBtn.addEventListener('click', () => {
      batchInput.value = '';
      liveEntryInput.focus();
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


  // --- Unified handler for scan input (manual or barcode scan) ---
  function handleScannedInput(item) {
    if (!item) return;

    if (!upcToItem[item] && !locationMap[item]) {
      showCustomPrompt(item).then(response => {
        if (response === 'location') {
          const name = prompt(`🗂 Please enter a name for location "${item}":`);
          if (name) {
            locationMap[item] = name;
            saveLocationMap();
            currentLocation = name;
            updateLocationStatus();
            alert(`📍 Current location set to: ${name}`);
            liveEntryInput.value = '';
            return;
          }
        } else if (response === 'product') {
          processProduct(item);
        } else {
          liveEntryInput.value = '';
        }
      });
      return;
    }

    if (locationMap[item]) {
      if (currentLocation === locationMap[item]) {
        const close = confirm(`You scanned the current location tag (${item}) again.\nWould you like to CLOSE this bay?`);
        if (close) {
          currentLocation = '';
          updateLocationStatus();
          alert('📦 Current location cleared.');
        }
        liveEntryInput.value = '';
        return;
      } else {
        currentLocation = locationMap[item];
        updateLocationStatus();
        alert(`📍 Current location set to: ${currentLocation}`);
        liveEntryInput.value = '';
        return;
      }
    }

    processProduct(item);
  }

  // --- Helper to process product scan ---
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
    }
    const qty = parseInt(liveQtyInput.value) || 1;
    liveCounts[mappedItem].count += qty;
    liveCounts[mappedItem].location = currentLocation;
    updateLiveTable();
    liveEntryInput.value = '';
    liveQtyInput.value = '1';
    liveEntryInput.focus();
  }

  // --- Barcode scanner/autoprocess input field logic ---
  let scanTimeout = null;

  function autoTriggerScan() {
    const item = liveEntryInput.value.trim();
    if (item) {
      handleScannedInput(item);
    }
  }

  liveEntryInput.addEventListener('input', () => {
    if (scanTimeout) clearTimeout(scanTimeout);
    scanTimeout = setTimeout(() => {
      const manualToggle = document.getElementById('manualToggle');
      if (manualToggle?.checked) autoTriggerScan();
    }, 150); // wait briefly after input settles
  });

  liveEntryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      autoTriggerScan();
    }
  });

  function updateLiveTable() {
    liveTableBody.innerHTML = '';
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

      // --- Create row with Edit button ---
      const tr = document.createElement('tr');
      tr.className = diff < 0 ? 'under' : diff > 0 ? 'over' : 'match';
      tr.innerHTML = `
        <td>${item} ${icon}</td>
        <td>${expected}</td>
        <td>${count}</td>
        <td>${diff > 0 ? '+' + diff : diff}</td>
        <td>${previous !== '' ? previous : '-'}</td>
        <td>${weekDiff !== '' ? (weekDiff > 0 ? '+' + weekDiff : weekDiff) : '-'}</td>
        <td>${category}</td>
        <td>${location}</td>
        <td><button class="editRow" data-id="${item}">✏️</button></td>
      `;
      liveTableBody.appendChild(tr);
    });

    // Add edit row logic
    document.querySelectorAll('.editRow').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.id;
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
      });
    });

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
  // --- Add "Clear History" button below summaryBar ---
  const clearHistoryBtn = document.createElement('button');
  clearHistoryBtn.textContent = '🧹 Clear History';
  clearHistoryBtn.id = 'clearHistory';
  clearHistoryBtn.style.marginTop = '20px';
  summaryBar.insertAdjacentElement('afterend', clearHistoryBtn);

  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all historical weekly data? This will not affect your current session or saved Excel reports.')) {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`archivedWeeklyCounts_${today}`, JSON.stringify(weeklyCounts));
      localStorage.removeItem('weeklyCounts');
      alert('Weekly history cleared! A snapshot has been saved.');
      location.reload();
    }
  });

  // --- Add "View Archive Snapshots" button below the clear history button ---
  const viewArchiveBtn = document.createElement('button');
  viewArchiveBtn.textContent = '🗂 View Archive Snapshots';
  viewArchiveBtn.style.marginTop = '10px';
  clearHistoryBtn.insertAdjacentElement('afterend', viewArchiveBtn);

  viewArchiveBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#1e1e1e';
    modal.style.color = '#fff';
    modal.style.padding = '20px';
    modal.style.border = '1px solid #ccc';
    modal.style.zIndex = '9999';
    modal.style.maxHeight = '80vh';
    modal.style.overflowY = 'auto';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.marginBottom = '10px';
    closeBtn.addEventListener('click', () => modal.remove());
    modal.appendChild(closeBtn);

    const archiveKeys = Object.keys(localStorage).filter(key => key.startsWith('archivedWeeklyCounts_')).sort().reverse();

    if (archiveKeys.length === 0) {
      modal.appendChild(document.createTextNode('No archived snapshots found.'));
    } else {
      archiveKeys.forEach(key => {
        const section = document.createElement('div');
        section.style.marginBottom = '15px';
        const label = document.createElement('h4');
        label.textContent = key;
        section.appendChild(label);

        const archive = JSON.parse(localStorage.getItem(key));
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.innerHTML = '<thead><tr><th>Item</th><th>Count</th></tr></thead><tbody>' +
          Object.entries(archive).map(([item, count]) => `<tr><td>${item}</td><td>${count}</td></tr>`).join('') +
          '</tbody>';
        section.appendChild(table);
        modal.appendChild(section);
      });
    }

    document.body.appendChild(modal);
  });

  // --- Add "Clear Snapshots" button ---
  const clearSnapshotsBtn = document.createElement('button');
  clearSnapshotsBtn.textContent = '🗑️ Clear Snapshots';
  clearSnapshotsBtn.style.marginTop = '10px';
  viewArchiveBtn.insertAdjacentElement('afterend', clearSnapshotsBtn);

  clearSnapshotsBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all archived snapshot data? This cannot be undone.')) {
      Object.keys(localStorage)
        .filter(key => key.startsWith('archivedWeeklyCounts_'))
        .forEach(key => localStorage.removeItem(key));
      alert('All archived snapshots have been cleared.');
    }
  });

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
      summaryBar.innerHTML = '';
    });
  }
  // Add item button
  const addLiveItemBtn = document.getElementById('addLiveItem');
  if (addLiveItemBtn) {
    let lastTriggerTime = 0;
    const handleAddItem = () => {
      const now = Date.now();
      if (now - lastTriggerTime < 300) return; // prevent double trigger
      lastTriggerTime = now;
      const item = liveEntryInput.value.trim();
      if (item) {
        // Unified location/product detection and handling
        if (!upcToItem[item] && !locationMap[item]) {
          showCustomPrompt(item).then(response => {
            if (response === 'location') {
              const name = prompt(`🗂 Please enter a name for location "${item}":`);
              if (name) {
                locationMap[item] = name;
                saveLocationMap();
                currentLocation = name;
                updateLocationStatus();
                alert(`📍 Current location set to: ${name}`);
                liveEntryInput.value = '';
                return;
              }
            } else if (response === 'product') {
              processProduct(item);
            } else {
              liveEntryInput.value = '';
            }
          });
          return;
        }
        if (locationMap[item]) {
          if (currentLocation === locationMap[item]) {
            const close = confirm(`You scanned the current location tag (${item}) again.\nWould you like to CLOSE this bay?`);
            if (close) {
              currentLocation = '';
              updateLocationStatus();
              alert('📦 Current location cleared.');
            }
            liveEntryInput.value = '';
            return;
          } else {
            currentLocation = locationMap[item];
            updateLocationStatus();
            alert(`📍 Current location set to: ${currentLocation}`);
            liveEntryInput.value = '';
            return;
          }
        }
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
        }
        const qty = parseInt(liveQtyInput.value) || 1;
        liveCounts[mappedItem].count += qty;
        liveCounts[mappedItem].location = currentLocation;
        updateLiveTable();
        liveEntryInput.value = '';
        liveQtyInput.value = '1';
        liveEntryInput.focus();
      }
    };
    addLiveItemBtn.addEventListener('click', handleAddItem);
    addLiveItemBtn.addEventListener('touchend', handleAddItem);
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
      XLSX.writeFile(wb, 'inventory_report.xlsx');
    });
    // --- Attach event listener to "Merge Master Report" button in HTML ---
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
  // Re-setup autosave on interval or enabled/disabled change
  if (autosaveIntervalSelect) {
    autosaveIntervalSelect.addEventListener('change', setupAutosaveLoop);
  }
  if (autosaveToggle) {
    autosaveToggle.addEventListener('change', setupAutosaveLoop);
  }

  // --- Auto-generate Excel file every 10 minutes ---
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  function downloadAutoExcelBackup() {
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
      const target = btn.getAttribute('data-tab');
      tabSections.forEach(section => {
        section.classList.remove('active');
      });
      tabLinks.forEach(b => b.classList.remove('active'));
      document.getElementById(target).classList.add('active');
      btn.classList.add('active');
    });
  });

  // Activate the default tab on load
  document.querySelector('.tablink[data-tab="entry"]').classList.add('active');
  document.getElementById('entry').classList.add('active');
});
  // Update location status on load
  // (Moved inside DOMContentLoaded, so this will already be called)