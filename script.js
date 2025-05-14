document.getElementById('compareBtn').addEventListener('click', () => {
    const onHandText = document.getElementById('onHandInput').value;
    const foundText = document.getElementById('foundInput').value;
    const onHandLines = onHandText.trim().split(/\n+/);
    const foundItems = foundText.replace(/,/g, ' ').split(/\s+/).filter(x => x);
  
    const onHandMap = {};
    onHandLines.forEach(line => {
      const [item, count] = line.split(':');
      if (item && count) onHandMap[item.trim()] = parseInt(count.trim());
    });
  
    const foundCounts = {};
    foundItems.forEach(item => {
      foundCounts[item] = (foundCounts[item] || 0) + 1;
    });
  
    const allItems = new Set([...Object.keys(onHandMap), ...Object.keys(foundCounts)]);
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';
  
    allItems.forEach(item => {
      const expected = onHandMap[item] || 0;
      const found = foundCounts[item] || 0;
      const diff = found - expected;
      let row = `<tr class="${diff < 0 ? 'under' : diff > 0 ? 'over' : 'match'}">
        <td>${item}</td>
        <td>${expected}</td>
        <td>${found}</td>
        <td>${diff > 0 ? '+' + diff : diff}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  });

const liveCounts = {};
const liveEntryInput = document.getElementById('liveEntry');
const liveTableBody = document.querySelector('#liveCountTable tbody');

liveEntryInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const item = liveEntryInput.value.trim();
    if (item) {
      liveCounts[item] = (liveCounts[item] || 0) + 1;
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

  Object.entries(liveCounts).forEach(([item, count]) => {
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
addLiveItemBtn.addEventListener('click', () => {
  const item = liveEntryInput.value.trim();
  if (item) {
    liveCounts[item] = (liveCounts[item] || 0) + 1;
    updateLiveTable();
    liveEntryInput.value = '';
  }
});