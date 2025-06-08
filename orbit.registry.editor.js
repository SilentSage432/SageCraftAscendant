// File: scripts/sagecraftascendant/orbit.registry.editor.js

// Namespace Safety Check
window.SageCraftAscendant = window.SageCraftAscendant || {};
SageCraftAscendant.OrbitRegistryEditor = (() => {
  
  const ORBIT_REGISTRY_KEY = 'SageCraftAscendant_OrbitRegistry';

  function getRegistry() {
    const stored = localStorage.getItem(ORBIT_REGISTRY_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  function saveRegistry(registry) {
    localStorage.setItem(ORBIT_REGISTRY_KEY, JSON.stringify(registry));
  }

  function listOrbits() {
    const registry = getRegistry();
    console.log('🪐 Current Orbit Registry:', registry);
    return registry;
  }

  function clearRegistry() {
    localStorage.removeItem(ORBIT_REGISTRY_KEY);
    console.log('🗑 Orbit Registry cleared.');
  }

  function addOrbit(orbitKey, orbitLabel, orbitIcon) {
    const registry = getRegistry();
    registry.push({
      key: orbitKey,
      label: orbitLabel,
      icon: orbitIcon || 'default.png',
    });
    saveRegistry(registry);
    console.log('✅ Orbit added:', { orbitKey, orbitLabel, orbitIcon });
  }

  function removeOrbit(orbitKey) {
    let registry = getRegistry();
    registry = registry.filter(o => o.key !== orbitKey);
    saveRegistry(registry);
    console.log(`🗑 Orbit "${orbitKey}" removed.`);
  }

  function rebuildDock() {
    const registry = getRegistry();
    const dock = document.getElementById('orbitalDockContainer');
    if (!dock) {
      console.warn('⚠ Dock container not found.');
      return;
    }
    dock.innerHTML = '';

    registry.forEach(orbit => {
      const btn = document.createElement('button');
      btn.textContent = orbit.label;
      btn.style.margin = '10px';
      btn.style.padding = '10px 20px';
      btn.style.fontFamily = 'monospace';
      btn.style.border = '2px solid #9933ff';
      btn.style.background = '#220033';
      btn.style.color = '#fff';
      btn.style.borderRadius = '8px';
      btn.addEventListener('click', () => {
        alert(`🪐 Orbit "${orbit.label}" (${orbit.key}) engaged!`);
      });
      dock.appendChild(btn);
    });

    console.log('🚀 Orbital Dock rebuilt with current registry.');
  }

  function registerOrbitInjectionControls() {
    document.getElementById('addOrbitFromUI')?.addEventListener('click', () => {
      const orbitKey = document.getElementById('orbitKeyInput').value.trim();
      const orbitLabel = document.getElementById('orbitLabelInput').value.trim();
      const orbitIcon = document.getElementById('orbitIconInput').value.trim();

      if (!orbitKey || !orbitLabel) {
        alert('Please provide both Key and Label.');
        return;
      }

      addOrbit(orbitKey, orbitLabel, orbitIcon);
      rebuildDock();
    });

    document.getElementById('removeOrbitFromUI')?.addEventListener('click', () => {
      const orbitKey = document.getElementById('orbitKeyInput').value.trim();
      if (!orbitKey) {
        alert('Enter Key of Orbit to remove.');
        return;
      }
      removeOrbit(orbitKey);
      rebuildDock();
    });

    console.log("✅ Orbit Injection Controls fully bound.");
  }

  // Return public interface
  return {
    listOrbits,
    clearRegistry,
    addOrbit,
    removeOrbit,
    rebuildDock,
    registerOrbitInjectionControls
  };

})();