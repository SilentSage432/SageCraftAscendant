


let trendChartInstance = null;

export function renderTrendChart(weeklyCounts) {
  const ctx = document.getElementById('trendChart')?.getContext('2d');
  if (!ctx) return;

  const labels = Object.keys(weeklyCounts);
  const values = Object.values(weeklyCounts);

  if (trendChartInstance) {
    trendChartInstance.destroy();
  }

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Items Scanned',
        data: values,
        fill: false,
        borderColor: 'lime',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

export function setupTrendModalToggle() {
  const viewTrendsBtn = document.getElementById('viewTrendsBtn');
  const trendsModal = document.getElementById('trendsModal');
  const closeTrends = document.getElementById('closeTrends');

  if (viewTrendsBtn && trendsModal) {
    viewTrendsBtn.addEventListener('click', () => {
      trendsModal.style.display = 'block';
    });
  }

  if (closeTrends && trendsModal) {
    closeTrends.addEventListener('click', () => {
      trendsModal.style.display = 'none';
    });
  }
}