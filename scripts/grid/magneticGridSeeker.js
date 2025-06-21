// 🧲 magneticGridSeeker.js — scans DOM for magnet-ready sectors and prepares them for magnetic binding

export function scanForMagneticTargets() {
  const magneticSectors = document.querySelectorAll('[data-magnetic-anchor]');
  const targets = [];

  magneticSectors.forEach(sector => {
    const id = sector.getAttribute('id') || 'unknown-sector';
    const bounds = sector.getBoundingClientRect();
    targets.push({
      id,
      element: sector,
      bounds
    });
  });

  console.log('🧲 Magnetic Grid Seeker: Found', targets.length, 'magnetic sectors.');
  return targets;
}
