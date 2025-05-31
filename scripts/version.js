

// version.js — Runtime App Version Module

const appVersion = "1.0.0";

// Simple function to inject version into UI
export function displayAppVersion() {
  const versionTag = document.getElementById('versionTag');
  if (versionTag) {
    versionTag.innerText = `Inventory Auditor — v${appVersion}`;
  }
}

export { appVersion };