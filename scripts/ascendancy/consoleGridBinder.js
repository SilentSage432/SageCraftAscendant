export function bindConsoleToGrid(consoleElement, gridRegionId) {
  const gridRegion = document.getElementById(gridRegionId);
  if (!gridRegion || !consoleElement) return;

  gridRegion.appendChild(consoleElement);
  consoleElement.setAttribute("data-grid-region", gridRegionId);
}

export function clearConsoleGridBindings() {
  const allConsoles = document.querySelectorAll("[data-grid-region]");
  allConsoles.forEach(consoleEl => {
    const parent = consoleEl.parentNode;
    if (parent) parent.removeChild(consoleEl);
    consoleEl.removeAttribute("data-grid-region");
  });
}

export function getActiveGridBindings() {
  return Array.from(document.querySelectorAll("[data-grid-region]")).map(el => ({
    id: el.id,
    region: el.getAttribute("data-grid-region"),
  }));
}

export function getAllGridNodes() {
  return Array.from(document.querySelectorAll("[data-grid-region]"));
}

export function refreshNodeSignal(nodeId) {
  const node = document.getElementById(nodeId);
  if (node) {
    const event = new CustomEvent('nodeRefreshed', { detail: { nodeId } });
    node.dispatchEvent(event);
    console.log(`[refreshNodeSignal] Node ${nodeId} refreshed.`);
  } else {
    console.warn(`[refreshNodeSignal] Node ${nodeId} not found.`);
  }
}

export function getGridBounds() {
  const grid = document.getElementById('sovereignOrbitDock');
  if (!grid) return null;
  return grid.getBoundingClientRect();
}

export function realignPanelsToGrid() {
  const panels = document.querySelectorAll('.holo-console-panel');
  const gridBounds = getGridBounds();
  if (!gridBounds) return;

  panels.forEach(panel => {
    const offsetX = panel.offsetLeft;
    const offsetY = panel.offsetTop;

    const snapLeft = Math.round(offsetX / 20) * 20;
    const snapTop = Math.round(offsetY / 20) * 20;

    panel.style.left = `${snapLeft}px`;
    panel.style.top = `${snapTop}px`;

    panel.setAttribute("data-snapped", "true");
  });

  console.log('🧲 Panels realigned to grid.');
}

export function adjustPanelToGrid(panel) {
  const gridBounds = getGridBounds();
  if (!gridBounds || !panel) return;

  const offsetX = panel.offsetLeft;
  const offsetY = panel.offsetTop;

  const snapLeft = Math.round(offsetX / 20) * 20;
  const snapTop = Math.round(offsetY / 20) * 20;

  panel.style.left = `${snapLeft}px`;
  panel.style.top = `${snapTop}px`;

  panel.setAttribute("data-snapped", "true");

  console.log(`[adjustPanelToGrid] Panel ${panel.id || '(unnamed)'} snapped to grid.`);
}

export function snapToNearestGrid(panel) {
  const gridBounds = getGridBounds();
  if (!gridBounds || !panel) return;

  const offsetX = panel.offsetLeft;
  const offsetY = panel.offsetTop;

  const snappedLeft = Math.round(offsetX / 20) * 20;
  const snappedTop = Math.round(offsetY / 20) * 20;

  panel.style.left = `${snappedLeft}px`;
  panel.style.top = `${snappedTop}px`;

  panel.setAttribute("data-snapped", "true");

  console.log(`[snapToNearestGrid] Panel ${panel.id || '(unnamed)'} snapped to nearest grid coordinates.`);
}