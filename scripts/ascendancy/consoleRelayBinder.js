// 🧭 Phase 347.0 — Console Reconciliation Relay
// Purpose: Scan all holo-console panels and register them into consoleAtlas for reconnection and tracking

import { consoleAtlas } from './consoleAtlas.js';

document.addEventListener('DOMContentLoaded', () => {
  const consolePanels = document.querySelectorAll('.holo-console');

  consolePanels.forEach((panel) => {
    const id = panel.id || 'unidentified-panel';
    const tag = panel.tagName;
    const classes = Array.from(panel.classList).join(', ');
    const parent = panel.parentElement ? panel.parentElement.id : '(no parent)';
    const contentLength = panel.innerHTML.trim().length;

    consoleAtlas.registerPanel({
      id,
      tag,
      classes,
      parent,
      contentLength,
    });

    // Phase 349.2 — Console Relay Activation Protocol
    const relayGroup = panel.dataset.relayGroup;
    if (relayGroup) {
      if (!consoleAtlas.relayGroups) {
        consoleAtlas.relayGroups = {};
      }
      if (!consoleAtlas.relayGroups[relayGroup]) {
        consoleAtlas.relayGroups[relayGroup] = [];
      }
      consoleAtlas.relayGroups[relayGroup].push(id);
      console.log(`📡 Panel "${id}" joined relay group "${relayGroup}"`);
    }
  });

  // 🧬 Phase 349.3 — Relay Signal Broadcast Sync
  if (consoleAtlas.relayGroups) {
    Object.entries(consoleAtlas.relayGroups).forEach(([groupName, idArray]) => {
      idArray.forEach(srcId => {
        const srcPanel = document.getElementById(srcId);
        if (!srcPanel) return;

        // Listen for relay events emitted by this panel
        srcPanel.addEventListener('sovereignRelay', (e) => {
          // Broadcast the event details to every other panel in the relay group
          idArray.forEach(targetId => {
            if (targetId === srcId) return; // skip self
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
              const relayEvent = new CustomEvent('sovereignRelay', { detail: e.detail });
              targetPanel.dispatchEvent(relayEvent);
            }
          });
        });
      });
      console.log(`🔗 Relay group "${groupName}" synchronized with ${idArray.length} panel(s).`);

      // 🧬 Phase 349.4 — Relay Event Listener Registry
      idArray.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (!panel) return;

        // Attach relay listener log (and placeholder for future hooks)
        if (!panel.relayListeners) {
          panel.relayListeners = [];
        }

        const relayLog = (e) => {
          console.log(`📥 [Relay Received] Panel "${panelId}" got:`, e.detail);
        };

        panel.addEventListener('sovereignRelay', relayLog);
        panel.relayListeners.push(relayLog);
      });

      // 🧬 Phase 349.5 — Console Signal Introspection Tools
      idArray.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (!panel) return;

        panel.signalIntrospection = {
          lastReceived: null,
          lastDispatched: null,
        };

        panel.addEventListener('sovereignRelay', (e) => {
          panel.signalIntrospection.lastReceived = {
            data: e.detail,
            time: new Date().toLocaleTimeString()
          };

          if (panel.dataset.debug === "true") {
            console.log(`🧠 [Introspect] ${panelId} received at ${panel.signalIntrospection.lastReceived.time}:`, e.detail);
          }
        });

        const originalDispatch = panel.dispatchEvent.bind(panel);
        panel.dispatchEvent = function(event) {
          if (event.type === 'sovereignRelay') {
            panel.signalIntrospection.lastDispatched = {
              data: event.detail,
              time: new Date().toLocaleTimeString()
            };

            if (panel.dataset.debug === "true") {
              console.log(`🚀 [Introspect] ${panelId} dispatched at ${panel.signalIntrospection.lastDispatched.time}:`, event.detail);
            }
          }
          return originalDispatch(event);
        };
      });
    });
  }
  console.log(`🔗 consoleRelayBinder.js: Registered ${consolePanels.length} panels with consoleAtlas.`);
});