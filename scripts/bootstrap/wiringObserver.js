// ===============================
// Live DOM Wiring Observer — wiringObserver.js (v2.0)
// Fully connected to globalButtonMap
// ===============================

import { globalButtonMap } from './handlers.js';

// Actual wiring logic (safe attach helper)
function attachButtonWiring(button) {
  const id = button.id;
  if (!id || !globalButtonMap[id]) {
    console.warn(`⚠️ Unmapped button detected: ${id}`);
    return;
  }
  if (button.hasAttribute('listener-attached')) return;
  button.addEventListener('click', globalButtonMap[id]);
  button.setAttribute('listener-attached', 'true');
  console.log(`✅ Wired: ${id}`);
}

/*
 // Mutation Observer watches for any DOM mutations (new buttons)
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        if (node.tagName === "BUTTON") {
          attachButtonWiring(node);
        }
        // Also scan descendants if new container inserted
        node.querySelectorAll?.("button").forEach(childBtn => attachButtonWiring(childBtn));
      }
    });
  });
});

// Activate observer after full DOM load
document.addEventListener("DOMContentLoaded", () => {
  const targetNode = document.body;
  observer.observe(targetNode, { childList: true, subtree: true });
  console.log("✅ Live DOM Wiring Observer (v2.0) activated.");
});
*/