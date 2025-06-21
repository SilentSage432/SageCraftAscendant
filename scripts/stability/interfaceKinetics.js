// interfaceKinetics.js
// Handles smooth UI transitions, kinetic drag, and interface momentum behaviors

export function applyKineticDrag(element, options = {}) {
  const friction = options.friction || 0.9;
  const threshold = options.threshold || 0.5;

  let velocity = { x: 0, y: 0 };
  let animationFrameId = null;

  function update() {
    element.scrollLeft += velocity.x;
    element.scrollTop += velocity.y;

    velocity.x *= friction;
    velocity.y *= friction;

    if (Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold) {
      animationFrameId = requestAnimationFrame(update);
    }
  }

  return {
    applyImpulse: (dx, dy) => {
      velocity.x += dx;
      velocity.y += dy;

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(update);
      }
    },
    stop: () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };
}
