async function restoreAllMapsFromDropbox() {
  const mapFiles = [
    { key: 'upcToItemMap', file: 'upcToItemMap.json' },
    { key: 'locationMap', file: 'locationMap.json' },
    { key: 'eslToUPCMap', file: 'eslToUPCMap.json' },
    { key: 'eslToItemMap', file: 'eslToItemMap.json' },
    { key: 'bayToItemMap', file: 'bayToItemMap.json' },
    { key: 'itemLinkMemory', file: 'itemLinkMemory.json' }
  ];

  for (const { key, file } of mapFiles) {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getDropboxAccessToken()}`,
        'Dropbox-API-Arg': JSON.stringify({ path: `/beta-test-1/${file}` })
      }
    });

    if (!response.ok) {
      const err = await response.text();
      console.warn(`⚠️ Could not restore ${file}: ${err}`);
      continue;
    }

    const text = await response.text();
    try {
      const parsed = JSON.parse(text);
      localStorage.setItem(key, JSON.stringify(parsed));
      window[key] = parsed;
    } catch (e) {
      console.error(`❌ Failed to parse ${file}:`, e);
    }
    if (key === 'itemLinkMemory') {
      try {
        window.itemLinkStorage.importMappings(parsed);
        console.log('🧬 Adaptive ItemLink mappings successfully imported.');
      } catch (e) {
        console.error('❌ Failed to import ItemLinkMemory into adaptive system:', e);
      }
    }
  }

  updateMapStatusDisplay(window.upcToItem, window.eslToUPC, window.locationMap);
  alert('📂 Maps restored from Dropbox!');
  window.logFieldEvent("DropboxRestoreMaps", { restored: true });
}