


export function playSuccessSound() {
  const audio = new Audio('./sounds/success.mp3');
  audio.play().catch(e => console.warn('🔇 Sound failed to play:', e));
}

export function playErrorSound() {
  const audio = new Audio('./sounds/error.mp3');
  audio.play().catch(e => console.warn('🔇 Sound failed to play:', e));
}