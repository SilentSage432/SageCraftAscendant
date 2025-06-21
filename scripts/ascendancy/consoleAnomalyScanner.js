

// 🧪 consoleAnomalyScanner.js
// Scans DOM for unresolved or duplicated panel anomalies

console.log("🔍 Anomaly Scanner online.");

document.addEventListener("DOMContentLoaded", () => {
  const allElements = document.querySelectorAll("[id]");
  const idMap = new Map();

  allElements.forEach(el => {
    const id = el.id;
    if (idMap.has(id)) {
      console.warn(`⚠️ Duplicate ID detected: '${id}'`, el);
    } else {
      idMap.set(id, el);
    }
  });

  console.log(`✅ Anomaly scan complete. Total unique IDs: ${idMap.size}`);
});