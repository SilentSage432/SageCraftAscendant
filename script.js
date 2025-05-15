document.addEventListener('DOMContentLoaded', () => {
  const liveCounts = {};
  const liveEntryInput = document.getElementById('liveEntry');
  const liveQtyInput = document.createElement('input');
  liveQtyInput.type = 'number';
  liveQtyInput.min = '1';
  liveQtyInput.value = '1';
  liveQtyInput.id = 'liveQtyInput';
  liveQtyInput.placeholder = 'Qty';
  liveEntryInput.insertAdjacentElement('afterend', liveQtyInput);
  const categoryInput = document.createElement('select');
  categoryInput.id = 'categoryInput';
  ['Laundry', 'Fridges & Freezers', 'Ranges', 'Dishwashers', 'Wall Ovens', 'Cooktops', 'OTR Microwaves', 'Microwaves (Countertop)', 'Vent Hoods', 'Beverage & Wine Coolers', 'Other / Misc'].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryInput.appendChild(opt);
  });
  liveQtyInput.insertAdjacentElement('afterend', categoryInput);
  const liveTableBody = document.querySelector('#liveCountTable tbody');

  // Insert summary bar below the live count table
  const summaryBar = document.createElement('div');
  summaryBar.id = 'summaryBar';
  summaryBar.style.marginTop = '20px';
  summaryBar.style.padding = '10px';
  summaryBar.style.border = '1px solid #ccc';
  summaryBar.style.borderRadius = '5px';
  summaryBar.style.backgroundColor = '#f9f9f9';
  summaryBar.style.fontWeight = 'bold';
  document.querySelector('#liveCountTable').insertAdjacentElement('afterend', summaryBar);

  liveEntryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = liveEntryInput.value.trim();
      if (item) {
        if (!liveCounts[item]) {
          liveCounts[item] = { count: 0, category: categoryInput.value };
        }
        const qty = parseInt(liveQtyInput.value) || 1;
        liveCounts[item].count += qty;
        updateLiveTable();
        liveEntryInput.value = '';
        liveQtyInput.value = '1';
        liveEntryInput.focus();
      }
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
    const onHandText = document.getElementById('onHandInput').value;
    const onHandLines = onHandText.trim().split(/\n+/);
    const onHandMap = {};
    onHandLines.forEach(line => {
      const [item, count] = line.split(':');
      if (item && count) onHandMap[item.trim()] = parseInt(count.trim());
    });

    Object.entries(liveCounts).forEach(([item, obj]) => {
      const count = obj.count;
      const expected = onHandMap[item] || 0;
      const diff = count - expected;
      const category = obj.category || '';
      const row = `<tr class="${diff < 0 ? 'under' : diff > 0 ? 'over' : 'match'}">
        <td>${item}</td>
        <td>${expected}</td>
        <td>${count}</td>
        <td>${diff > 0 ? '+' + diff : diff}</td>
        <td>${category}</td>
      </tr>`;
      liveTableBody.innerHTML += row;
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

  const addLiveItemBtn = document.getElementById('addLiveItem');
  if (addLiveItemBtn) {
    let lastTriggerTime = 0;

    const handleAddItem = () => {
      const now = Date.now();
      if (now - lastTriggerTime < 300) return; // prevent double trigger
      lastTriggerTime = now;

      const item = liveEntryInput.value.trim();
      if (item) {
        if (!liveCounts[item]) {
          liveCounts[item] = { count: 0, category: categoryInput.value };
        }
        const qty = parseInt(liveQtyInput.value) || 1;
        liveCounts[item].count += qty;
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
          liveCounts[k] = { count: v.count, category: v.category };
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
      const wb = XLSX.utils.book_new();
      const ws_data = [['Item #', 'Expected', 'Found', 'Difference', 'Category']];

      const onHandText = document.getElementById('onHandInput').value;
      const onHandLines = onHandText.trim().split(/\n+/);
      const onHandMap = {};
      onHandLines.forEach(line => {
        const [item, count] = line.split(':');
        if (item && count) onHandMap[item.trim()] = parseInt(count.trim());
      });

      Object.entries(liveCounts).forEach(([item, obj]) => {
        const count = obj.count;
        const expected = onHandMap[item] || 0;
        const diff = count - expected;
        ws_data.push([item, expected, count, diff, obj.category || '']);
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
  }

  // Auto-save session every 30 seconds
  setInterval(() => {
    const session = {
      liveCounts: JSON.parse(JSON.stringify(liveCounts)),
      onHandText: document.getElementById('onHandInput').value
    };
    localStorage.setItem('inventorySession', JSON.stringify(session));
    console.log('Auto-saved session');
  }, 30000);

  // Register service worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registered ✅', reg))
      .catch(err => console.error('Service Worker registration failed ❌', err));
  }
});