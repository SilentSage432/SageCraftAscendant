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
if (addLiveItemBtn) {
  addLiveItemBtn.addEventListener('click', () => {
    const item = liveEntryInput.value.trim();
    if (item) {
      liveCounts[item] = (liveCounts[item] || 0) + 1;
      updateLiveTable();
      liveEntryInput.value = '';
    }
  });
}