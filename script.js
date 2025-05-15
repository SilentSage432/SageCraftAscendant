document.addEventListener('DOMContentLoaded', () => {
  const liveCounts = {};
  const liveEntryInput = document.getElementById('liveEntry');
  const liveTableBody = document.querySelector('#liveCountTable tbody');

  // Batch tag selector
  const batchTags = ["Backstock", "Aisle 1", "Aisle 2", "Display", "Scratch & Dent"];
  const tagSelector = document.createElement('select');
  tagSelector.id = 'tagSelector';
  batchTags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    tagSelector.appendChild(option);
  });
  // Insert tagSelector just below the liveEntry input and above the Add Item button
  const liveEntrySection = liveEntryInput.closest('section');
  liveEntrySection.insertBefore(tagSelector, liveEntryInput.nextSibling);

  liveEntryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = liveEntryInput.value.trim();
      if (item) {
        if (!liveCounts[item]) {
          liveCounts[item] = { count: 0, tag: tagSelector.value };
        }
        liveCounts[item].count += 1;
        updateLiveTable();
        liveEntryInput.value = '';
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
    // Table header: Add "Tag"
    const table = liveTableBody.parentElement;
    const headerRow = table.parentElement.querySelector('thead tr');
    if (headerRow && !headerRow.querySelector('.tag-header')) {
      const tagTh = document.createElement('th');
      tagTh.textContent = 'Tag';
      tagTh.className = 'tag-header';
      headerRow.appendChild(tagTh);
    }

    Object.entries(liveCounts).forEach(([item, obj]) => {
      const count = obj.count;
      const tag = obj.tag || '';
      const expected = onHandMap[item] || 0;
      const diff = count - expected;
      const row = `<tr class="${diff < 0 ? 'under' : diff > 0 ? 'over' : 'match'}">
        <td>${item}</td>
        <td>${expected}</td>
        <td>${count}</td>
        <td>${diff > 0 ? '+' + diff : diff}</td>
        <td>${tag}</td>
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
          liveCounts[item] = { count: 0, tag: tagSelector.value };
        }
        liveCounts[item].count += 1;
        updateLiveTable();
        liveEntryInput.value = '';
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
      // Deep assign for tag/count structure
      Object.entries(session.liveCounts || {}).forEach(([k, v]) => {
        liveCounts[k] = { count: v.count, tag: v.tag };
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