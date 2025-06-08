import * as XLSX from 'https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs';

export function setupReportButton() {
  const mergeReportBtn = document.getElementById('mergeReport');
  if (!mergeReportBtn) return;

  mergeReportBtn.addEventListener('click', () => {
    if (!window.liveCounts || Object.keys(window.liveCounts).length === 0) {
      alert("⚠️ No scan data found to export.");
      return;
    }

    const data = Object.entries(window.liveCounts).map(([item, count]) => ({
      Item: item,
      Count: count
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory Report');

    XLSX.writeFile(workbook, 'Merged_Report.xlsx');
    alert("🧩 Master Excel Report successfully generated and downloaded.");
  });
}

export function setupTemplateExportButton() {
  const exportTemplateBtn = document.getElementById('exportTemplateBtn');
  if (!exportTemplateBtn) return;

  exportTemplateBtn.addEventListener('click', () => {
    const headers = [{ Item: '', Count: '' }];
    const ws = XLSX.utils.json_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'Template.xlsx');
  });
}