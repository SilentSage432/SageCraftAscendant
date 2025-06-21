

// 🛡️ adaptiveGridSentinel.js
// Monitors viewport changes and triggers grid snap recalibration.

import { realignPanelsToGrid } from '../grid/consoleGridMagnetizer.js';

const AdaptiveGridSentinel = (() => {
  let resizeTimeout = null;

  function handleResize() {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('🛡️ AdaptiveGridSentinel: Viewport changed, recalibrating grid...');
      realignPanelsToGrid();
    }, 200);
  }

  function engage() {
    window.addEventListener('resize', handleResize);
    console.log('🛡️ AdaptiveGridSentinel engaged');
  }

  return {
    engage
  };
})();

AdaptiveGridSentinel.engage();