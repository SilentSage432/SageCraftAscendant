function normalizeUPC(code) {
    code = code.replace(/\D/g, '');
    if (code.length === 13 && code.startsWith('0')) {
      return code.slice(1);
    }
    return code;
  }
  
  let autosaveTimer = null;
  
  const upcToItem = JSON.parse(localStorage.getItem('upcToItemMap')) || {};
  const locationMap = JSON.parse(localStorage.getItem('locationMap')) || {};
  const eslToUPC = JSON.parse(localStorage.getItem('eslToUPCMap')) || {};
  
  window.upcToItem = upcToItem;
  window.locationMap = locationMap;
  window.eslToUPC = eslToUPC;
  
  console.log('✅ UPC Map:', upcToItem);
  console.log('✅ ESL Map:', eslToUPC);
  console.log('✅ Location Map:', locationMap);
  console.log("🧾 Confirmed localStorage UPC Mappings:", window.upcToItem);
  
  function updateMapStatusDisplay() {
    const mapStatus = document.getElementById('mapStatusDisplay');
    if (!mapStatus) return;
  
    const upcCount = Object.keys(upcToItem || {}).length;
    const eslCount = Object.keys(eslToUPC || {}).length;
    const bayCount = Object.keys(locationMap || {}).length;
  
    mapStatus.textContent = `🧠 Map Status: UPC → ${upcCount} | ESL → ${eslCount} | Bay Codes → ${bayCount}`;
  }

  function saveUPCMap() {
    localStorage.setItem('upcToItemMap', JSON.stringify(upcToItem));
  }
  
  export {
    upcToItem,
    locationMap,
    eslToUPC,
    normalizeUPC,
    updateMapStatusDisplay,
    saveUPCMap
  };