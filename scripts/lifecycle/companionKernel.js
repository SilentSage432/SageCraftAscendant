// 🧠 Companion Initialization Kernel

export const CompanionRegistry = {};

export function defineCompanion({ id, name, role, personality, memory = {} }) {
  if (!id || !name || !role) {
    console.warn("⚠️ Companion definition missing critical fields.");
    return;
  }

  CompanionRegistry[id] = {
    id,
    name,
    role,
    personality,
    memory,
    initializedAt: Date.now()
  };

  console.log(`✨ Companion initialized: ${name} (${role})`);
}

export function getCompanion(id) {
  return CompanionRegistry[id] || null;
}

export function listCompanions() {
  return Object.values(CompanionRegistry);
}

// Demo Companion: The Silent Sage
defineCompanion({
  id: "silent_sage",
  name: "The Silent Sage",
  role: "oracle",
  personality: {
    style: "cryptic",
    tone: "wise",
    dialogueOpening: "You have summoned me through the Grid..."
  },
  memory: {
    awakenings: 1,
    keyMoments: []
  }
});

// 🌌 Phase 421: Companion Console Binding

export function bindCompanionToConsole({ companionId, consoleElementId }) {
  const companion = getCompanion(companionId);
  const consoleEl = document.getElementById(consoleElementId);

  if (!companion) {
    console.warn(`⚠️ No companion found with ID: ${companionId}`);
    return;
  }

  if (!consoleEl) {
    console.warn(`⚠️ No console element found with ID: ${consoleElementId}`);
    return;
  }

  consoleEl.dataset.companion = companionId;
  console.log(`🔗 Bound ${companion.name} to #${consoleElementId}`);

  // Optionally inject a greeting or HUD element
  const intro = document.createElement("div");
  intro.className = "companion-greeting";
  intro.innerText = `${companion.personality.dialogueOpening}`;
  consoleEl.appendChild(intro);
}