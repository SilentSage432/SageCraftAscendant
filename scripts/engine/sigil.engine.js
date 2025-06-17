// 🪄 sigil.engine.js
console.log("🔮 Sigil Engine initialized.");

// Sigil Engine Namespace
const SigilEngine = {
  sigils: {},

  createSigil(name, properties = {}) {
    const sigil = {
      id: `sigil-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      type: properties.type || "generic",
      element: properties.element || "ether",
      glyphCode: properties.glyphCode || null,
      visual: properties.visual || null,
      createdAt: new Date().toISOString(),
      ...properties
    };

    this.sigils[name] = sigil;
    console.log(`✨ Sigil '${name}' has been forged.`, sigil);
    return sigil;
  },

  getSigil(name) {
    return this.sigils[name] || null;
  },

  describeSigil(name) {
    const sigil = this.getSigil(name);
    if (!sigil) return null;

    return {
      id: sigil.id,
      name: sigil.name,
      type: sigil.type,
      element: sigil.element,
      glyphCode: sigil.glyphCode,
      visual: sigil.visual,
      createdAt: sigil.createdAt,
      summary: `The sigil '${sigil.name}' is of type '${sigil.type}', aligned with the element '${sigil.element}'.`
    };
  },

  listSigils() {
    return Object.keys(this.sigils);
  },

  listDetailedSigils() {
    return Object.values(this.sigils);
  },

  deleteSigil(name) {
    if (this.sigils[name]) {
      delete this.sigils[name];
      console.log(`🗑️ Sigil '${name}' has been dismissed.`);
      return true;
    }
    return false;
  },

  pulse(name, payload = {}) {
    if (!this.sigils[name]) {
      console.warn(`⚠️ No sigil named '${name}' found to pulse.`);
      return;
    }

    const pulseEvent = new CustomEvent("sigilPulse", {
      detail: {
        sigil: this.sigils[name],
        payload,
        timestamp: Date.now()
      }
    });

    window.dispatchEvent(pulseEvent);
    renderGlyphEcho(this.sigils[name]);
    console.log(`📡 Sigil '${name}' pulsed into the mesh.`, pulseEvent.detail);
  },

  renderSigilSummary(name) {
    const sigil = this.getSigil(name);
    if (!sigil) return `<div class="sigil-summary">⚠️ Unknown sigil: ${name}</div>`;

    return `
      <div class="sigil-summary" style="border: 1px solid #0ff; padding: 10px; margin: 5px; border-radius: 6px;">
        <strong>${sigil.name}</strong> (${sigil.type} • ${sigil.element})<br/>
        ${sigil.visual ? `<img src="${sigil.visual}" alt="${sigil.name}" style="max-width: 100px;">` : ""}
        <small>ID: ${sigil.id}</small><br/>
        <em>Forged on: ${new Date(sigil.createdAt).toLocaleString()}</em>
      </div>
    `;
  },

  saveSigilsToStorage() {
    try {
      const json = JSON.stringify(this.sigils);
      localStorage.setItem("SAGE_SIGILS", json);
      console.log("💾 Sigils saved to localStorage.");
    } catch (e) {
      console.error("❌ Failed to save sigils:", e);
    }
  },

  loadSigilsFromStorage() {
    try {
      const json = localStorage.getItem("SAGE_SIGILS");
      if (json) {
        this.sigils = JSON.parse(json);
        console.log("📂 Sigils loaded from localStorage.");
      }
    } catch (e) {
      console.error("❌ Failed to load sigils:", e);
    }
  },
};

SigilEngine.loadSigilsFromStorage();
updateSigilArchive();

// 🌈 Phase 18.4 — Sigil Selection + Reactive Highlighting
function highlightSelectedSigil(name) {
  const archiveTarget = document.getElementById("sigilArchiveScroll");
  if (!archiveTarget) return;

  // Remove highlight from all
  Array.from(archiveTarget.children).forEach(child => {
    child.style.backgroundColor = "";
    child.style.boxShadow = "";
  });

  // Highlight the selected sigil
  const summaries = archiveTarget.querySelectorAll(".sigil-summary");
  summaries.forEach(summary => {
    if (summary.innerHTML.includes(name)) {
      summary.style.backgroundColor = "rgba(0, 255, 255, 0.1)";
      summary.style.boxShadow = "0 0 10px #0ff";
    }
  });

  console.log(`🌟 Sigil '${name}' highlighted in archive.`);
}

// Optional: Global hook
window.highlightSelectedSigil = highlightSelectedSigil;

// 🌟 Temporary Forge Hook for UI Button
function forgeSigil() {
  const defaultName = `UnnamedSigil_${Date.now()}`;
  const newSigil = SigilEngine.createSigil(defaultName, {
    type: "prototype",
    element: "ether",
    glyphCode: "∇⟁⌖",
    visual: "https://via.placeholder.com/100x100.png?text=Sigil"
  });

  SigilEngine.saveSigilsToStorage();

  // Optional: Render a quick summary into an element on the page
  const target = document.getElementById("sigilForgeDisplay");
  if (target) {
    target.innerHTML = SigilEngine.renderSigilSummary(newSigil.name);
  }

  // Update the full archive display
  updateSigilArchive();
  const archive = document.getElementById("sigilArchiveScroll");
  if (archive) {
    archive.style.opacity = "0";
    archive.style.transform = "translateY(10px)";
    setTimeout(() => {
      archive.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      archive.style.opacity = "1";
      archive.style.transform = "translateY(0)";
    }, 50);
  }

  console.log(`🔧 Sigil '${newSigil.name}' forged via UI button.`);

  highlightSelectedSigil(newSigil.name);

  animateSigilArchivePulse(newSigil.name);
}

// 🌌 Phase 18.5 — Sigil Archive Animation Pulse
function animateSigilArchivePulse(name) {
  const archiveTarget = document.getElementById("sigilArchiveScroll");
  if (!archiveTarget) return;

  const summaries = archiveTarget.querySelectorAll(".sigil-summary");
  summaries.forEach(summary => {
    if (summary.innerHTML.includes(name)) {
      summary.style.transition = "transform 0.2s ease-in-out";
      summary.style.transform = "scale(1.05)";
      setTimeout(() => {
        summary.style.transform = "scale(1)";
      }, 200);
    }
  });

  console.log(`💫 Sigil '${name}' pulsed with animation.`);
}
window.animateSigilArchivePulse = animateSigilArchivePulse;

// 🌠 Phase 18.6 — Sigil Type Filter in Archive
function filterSigilsByType(type) {
  const archiveTarget = document.getElementById("sigilArchiveScroll");
  if (!archiveTarget) return;

  const allSigils = SigilEngine.listDetailedSigils().reverse();
  const filtered = type === "all"
    ? allSigils
    : allSigils.filter(s => s.type.toLowerCase() === type.toLowerCase());

  archiveTarget.innerHTML = filtered
    .map(sigil => SigilEngine.renderSigilSummary(sigil.name))
    .join("");

  console.log(`🧪 Filtered sigils by type: ${type}`);
}

window.filterSigilsByType = filterSigilsByType;

// 🌌 Phase 18.7 — Sigil Archive Sort Mechanism
function sortSigils(criteria = "createdAt") {
  const archiveTarget = document.getElementById("sigilArchiveScroll");
  if (!archiveTarget) return;

  const allSigils = SigilEngine.listDetailedSigils();

  const sorted = [...allSigils].sort((a, b) => {
    if (criteria === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    } else {
      return (a[criteria] || "").toString().localeCompare((b[criteria] || "").toString());
    }
  });

  archiveTarget.innerHTML = sorted
    .map(sigil => SigilEngine.renderSigilSummary(sigil.name))
    .join("");

  console.log(`🔃 Sigils sorted by ${criteria}`);
}

window.sortSigils = sortSigils;

// 🌌 Phase 18.8 — Sigil Archive Interactivity Enhancements
function enableSigilArchiveInteractivity() {
  const archiveTarget = document.getElementById("sigilArchiveScroll");
  if (!archiveTarget) return;

  archiveTarget.addEventListener("click", (e) => {
    const summary = e.target.closest(".sigil-summary");
    if (!summary) return;

    const nameMatch = summary.innerHTML.match(/<strong>([^<]+)<\/strong>/);
    const sigilName = nameMatch?.[1];

    if (sigilName && SigilEngine.getSigil(sigilName)) {
      highlightSelectedSigil(sigilName);
      SigilEngine.pulse(sigilName);
      console.log(`🎯 Sigil '${sigilName}' selected from archive.`);
    }
  });
}


// 🌟 Phase 18.9 — Glyph Echo Rendering
function renderGlyphEcho(sigil) {
  const echo = document.createElement("div");
  echo.classList.add("glyph-echo");
  echo.innerText = sigil.glyphCode || "∇⌖";
  echo.style.position = "fixed";
  echo.style.left = `${Math.random() * 80 + 10}%`;
  echo.style.top = `${Math.random() * 80 + 10}%`;
  echo.style.color = "#0ff";
  echo.style.fontSize = "2rem";
  echo.style.opacity = "1";
  echo.style.zIndex = 9999;
  echo.style.pointerEvents = "none";
  echo.style.transition = "all 1.2s ease-out";

  document.body.appendChild(echo);

  requestAnimationFrame(() => {
    echo.style.transform = "translateY(-40px) scale(1.2)";
    echo.style.opacity = "0";
  });

  setTimeout(() => {
    echo.remove();
  }, 1200);
}

window.addEventListener("DOMContentLoaded", enableSigilArchiveInteractivity);


// 🌌 Phase 19.0 — Sigil Preservation Protocols
function exportSigilsToJSON() {
  const data = JSON.stringify(SigilEngine.listDetailedSigils(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sigil_archive.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  console.log("📤 Sigils exported to JSON.");
}

function importSigilsFromJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedSigils = JSON.parse(e.target.result);
      importedSigils.forEach(sigil => {
        if (sigil.name && !SigilEngine.getSigil(sigil.name)) {
          SigilEngine.sigils[sigil.name] = sigil;
        }
      });
      SigilEngine.saveSigilsToStorage();
      updateSigilArchive();
      const archive = document.getElementById("sigilArchiveScroll");
      if (archive) {
        archive.style.opacity = "0";
        archive.style.transform = "translateY(10px)";
        setTimeout(() => {
          archive.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          archive.style.opacity = "1";
          archive.style.transform = "translateY(0)";
        }, 50);
      }
      console.log("📥 Sigils imported and saved.");
    } catch (err) {
      console.error("❌ Failed to import sigils:", err);
    }
  };
  reader.readAsText(file);
}

window.exportSigilsToJSON = exportSigilsToJSON;
window.importSigilsFromJSON = importSigilsFromJSON;


// 🧹 Phase 19.1 — Sigil Archive Reset
function resetSigilArchive(confirmReset = true) {
  if (confirmReset && !confirm("Are you sure you want to delete all sigils? This cannot be undone.")) {
    return;
  }

  SigilEngine.sigils = {};
  localStorage.removeItem("SAGE_SIGILS");
  updateSigilArchive();
  const archive = document.getElementById("sigilArchiveScroll");
  if (archive) {
    archive.style.opacity = "0";
    archive.style.transform = "translateY(10px)";
    setTimeout(() => {
      archive.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      archive.style.opacity = "1";
      archive.style.transform = "translateY(0)";
    }, 50);
  }
  console.log("🧼 Sigil archive has been reset.");
}

window.resetSigilArchive = resetSigilArchive;
