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
  const liveTableBody = document.querySelector('#liveCountTable tbody');

  liveEntryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = liveEntryInput.value.trim();
      if (item) {
        if (!liveCounts[item]) {
          liveCounts[item] = { count: 0 };
        }
        const qty = parseInt(liveQtyInput.value) || 1;
        liveCounts[item].count += qty;
        updateLiveTable();
        liveEntryInput.value = '';
        liveQtyInput.value = '1';
      }
    }
  });

  function updateLiveTable() {
    liveTableBody.innerHTML = '';
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
      const row = `<tr class="${diff < 0 ? 'under' : diff > 0 ? 'over' : 'match'}">
        <td>${item}</td>
        <td>${expected}</td>
        <td>${count}</td>
        <td>${diff > 0 ? '+' + diff : diff}</td>
      </tr>`;
      liveTableBody.innerHTML += row;
    });
  }

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Live Table';
  clearBtn.addEventListener('click', () => {
    Object.keys(liveCounts).forEach(key => delete liveCounts[key]);
    updateLiveTable();
    liveEntryInput.value = '';
  });
  document.querySelector('.container').appendChild(clearBtn);

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
          liveCounts[item] = { count: 0 };
        }
        const qty = parseInt(liveQtyInput.value) || 1;
        liveCounts[item].count += qty;
        updateLiveTable();
        liveEntryInput.value = '';
        liveQtyInput.value = '1';
      }
    };

    addLiveItemBtn.addEventListener('click', handleAddItem);
    addLiveItemBtn.addEventListener('touchend', handleAddItem);
  }
  // Save/Load Session buttons
  const saveSessionBtn = document.createElement('button');
  saveSessionBtn.textContent = 'Save Session';
  saveSessionBtn.addEventListener('click', () => {
    const session = {
      liveCounts: JSON.parse(JSON.stringify(liveCounts)),
      onHandText: document.getElementById('onHandInput').value
    };
    localStorage.setItem('inventorySession', JSON.stringify(session));
    alert('Session saved!');
  });

  const loadSessionBtn = document.createElement('button');
  loadSessionBtn.textContent = 'Load Session';
  loadSessionBtn.addEventListener('click', () => {
    const session = JSON.parse(localStorage.getItem('inventorySession'));
    if (session) {
      Object.keys(liveCounts).forEach(k => delete liveCounts[k]);
      // Deep assign for count structure
      Object.entries(session.liveCounts || {}).forEach(([k, v]) => {
        liveCounts[k] = { count: v.count };
      });
      document.getElementById('onHandInput').value = session.onHandText;
      updateLiveTable();
      alert('Session loaded!');
    } else {
      alert('No saved session found.');
    }
  });

  document.querySelector('.container').appendChild(saveSessionBtn);
  document.querySelector('.container').appendChild(loadSessionBtn);
});