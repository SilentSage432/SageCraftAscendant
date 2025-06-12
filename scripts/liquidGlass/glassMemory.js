

// 🧠 Phase 18000.4 — Memory Tracking Engine

window.GlassMemory = {
  usageMap: {},

  track(id) {
    if (!this.usageMap[id]) {
      this.usageMap[id] = 1;
    } else {
      this.usageMap[id]++;
    }

    // Apply halo class if used enough
    if (this.usageMap[id] >= 3) {
      const el = document.querySelector(id);
      if (el) el.classList.add("halo");
    }

    // Trigger memory bloom at 5+ uses
    if (this.usageMap[id] === 5) {
      const el = document.querySelector(id);
      if (el && !el.querySelector(".memory-bloom")) {
        const bloom = document.createElement("div");
        bloom.className = "memory-bloom";
        el.appendChild(bloom);
      }
    }
  },

  getUsage(id) {
    return this.usageMap[id] || 0;
  }
};

// Example: Attach tracking to orbit buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".orbit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-panel");
      if (id) window.GlassMemory.track(id);
    });
  });
});

// 🌈 Phase 18000.5 — MoodShift Theme Engine

window.MoodShift = {
  currentTheme: "default",

  themes: {
    default: {
      "--glow-color": "rgba(0, 255, 255, 0.4)",
      "--bg-color": "rgba(15, 15, 20, 0.75)"
    },
    twilight: {
      "--glow-color": "rgba(255, 150, 255, 0.4)",
      "--bg-color": "rgba(25, 10, 35, 0.75)"
    },
    dawn: {
      "--glow-color": "rgba(255, 220, 100, 0.4)",
      "--bg-color": "rgba(30, 25, 10, 0.75)"
    },
    deepsea: {
      "--glow-color": "rgba(0, 100, 255, 0.4)",
      "--bg-color": "rgba(5, 10, 35, 0.8)"
    }
  },

  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;

    this.currentTheme = themeName;
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  },

  autoAdjust() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) {
      this.applyTheme("dawn");
    } else if (hour >= 10 && hour < 18) {
      this.applyTheme("default");
    } else if (hour >= 18 && hour < 22) {
      this.applyTheme("twilight");
    } else {
      this.applyTheme("deepsea");
    }
  }
};

// Auto-apply MoodShift theme on load
document.addEventListener("DOMContentLoaded", () => {
  window.MoodShift.autoAdjust();
});

// 🌀 Phase 18000.6 — Contextual Pane Morphing Engine

window.PaneMorpher = {
  morphRules: {
    "#countConsole": { scale: 1.05, blur: 1 },
    "#deltaAnalyzerConsole": { scale: 1.1, blur: 2 },
    "#reportingHubConsole": { scale: 1.08, blur: 1.5 }
    // Add more rules as needed
  },

  applyMorph(panelId) {
    const rule = this.morphRules[panelId];
    const el = document.querySelector(panelId);
    if (el && rule) {
      el.style.transform = `scale(${rule.scale})`;
      el.style.backdropFilter = `blur(${rule.blur}px)`;
      el.style.transition = "transform 0.5s ease, backdrop-filter 0.5s ease";
    }
  },

  resetMorph(panelId) {
    const el = document.querySelector(panelId);
    if (el) {
      el.style.transform = "";
      el.style.backdropFilter = "";
    }
  },

  attachListeners() {
    document.querySelectorAll(".holo-console").forEach(panel => {
      const id = "#" + panel.id;

      panel.addEventListener("mouseenter", () => {
        this.applyMorph(id);
      });

      panel.addEventListener("mouseleave", () => {
        this.resetMorph(id);
      });
    });
  }
};

// Activate contextual morphing when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.PaneMorpher.attachListeners();
});

// 🌊 Phase 18000.7 — Ripple Persistence Trails

window.RippleTrails = {
  createRipple(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-trail";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1200);
  },

  attachListeners() {
    document.addEventListener("click", (e) => {
      this.createRipple(e.clientX, e.clientY);
    });
  }
};

// Initialize ripple persistence trail system
document.addEventListener("DOMContentLoaded", () => {
  window.RippleTrails.attachListeners();
});

// 🧩 Phase 18000.8 — Self-Healing Layout Logic

window.SelfHealingLayout = {
  recoverablePanels: [".holo-console", ".orbit-btn"],

  isGlitched(el) {
    const rect = el.getBoundingClientRect();
    return rect.width === 0 || rect.height === 0 || isNaN(rect.top);
  },

  attemptRecovery(el) {
    el.classList.add("flicker-warning");
    setTimeout(() => {
      el.style.display = "none";
      el.offsetHeight; // trigger reflow
      el.style.display = "";
      el.classList.remove("flicker-warning");
    }, 500);
  },

  scanAndRepair() {
    this.recoverablePanels.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (this.isGlitched(el)) {
          this.attemptRecovery(el);
        }
      });
    });
  },

  initialize() {
    setInterval(() => this.scanAndRepair(), 5000);
  }
};

// Activate self-healing layout monitoring
document.addEventListener("DOMContentLoaded", () => {
  window.SelfHealingLayout.initialize();
});


// ⌛ Phase 18000.9 — Chrono-Flow Interaction Traces

window.ChronoFlow = {
  maxTraces: 30,
  traces: [],

  createTrace(x, y) {
    const trace = document.createElement("div");
    trace.className = "chrono-trace";
    trace.style.left = `${x}px`;
    trace.style.top = `${y}px`;
    document.body.appendChild(trace);
    this.traces.push(trace);

    if (this.traces.length > this.maxTraces) {
      const oldest = this.traces.shift();
      oldest.remove();
    }

    setTimeout(() => {
      trace.style.opacity = "0";
    }, 1000);

    setTimeout(() => {
      trace.remove();
    }, 2000);
  },

  attachListeners() {
    document.addEventListener("mousemove", (e) => {
      this.createTrace(e.clientX, e.clientY);
    });
  }
};

// Initialize chrono-flow trace system
document.addEventListener("DOMContentLoaded", () => {
  window.ChronoFlow.attachListeners();
});

// 🌌 Phase 18001 — Orbital Button Liquid Core Evolution

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".orbit-btn").forEach(btn => {
    btn.classList.add("liquid-core");

    // Pulse shimmer effect on hover
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("active-core");
    });

    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("active-core");
    });

    // Bloom effect from usage frequency
    const id = btn.getAttribute("data-panel");
    if (id && window.GlassMemory.getUsage(id) >= 5) {
      btn.classList.add("core-bloom");
    }
  });
});