// gridResyncEmitter.js
// Emits sync events to realign panels to their expected grid positions

export function emitGridResync() {
  const event = new CustomEvent('gridResync', {
    detail: {
      timestamp: Date.now(),
      source: 'gridResyncEmitter',
    }
  });

  document.dispatchEvent(event);
  console.log('[🔄] Grid Resync Event emitted.');
}
