

// scripts/ascendancy/consoleAnomalyRebinder.js
export function rebindAnomalousConsoles() {
  const orphanedConsoles = document.querySelectorAll('.holo-console:not([data-console-id])');
  
  orphanedConsoles.forEach((console, index) => {
    const generatedId = `orphaned-console-${index + 1}`;
    console.setAttribute('data-console-id', generatedId);
    console.classList.add('rebinding-complete');

    console.dispatchEvent(new CustomEvent('consoleRebound', {
      detail: { consoleId: generatedId }
    }));
  });

  console.log(`[AnomalyRebinder] Rebound ${orphanedConsoles.length} orphaned console panels.`);
}