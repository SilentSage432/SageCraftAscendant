window.PanelResurrectionGrid = {
  revealAll: function () {
    if (window.__resurrecting) return;
    window.__resurrecting = true;

    let anchor = document.getElementById("consoleDeck");
    if (!anchor) {
      anchor = document.createElement("div");
      anchor.id = "consoleDeck";
      document.body.prepend(anchor);
    } else {
      while (anchor.firstChild) {
        anchor.removeChild(anchor.firstChild);
      }
    }

    anchor.style.position = "relative";
    anchor.style.top = "0";
    anchor.style.left = "0";
    anchor.style.zIndex = "9999";
    anchor.style.width = "100%";
    anchor.style.minHeight = "100vh";
    anchor.style.display = "block";
    anchor.style.overflowY = "auto";
    anchor.style.padding = "40px 20px";
    anchor.style.boxSizing = "border-box";
    anchor.style.background = "rgba(0,0,0,0.6)";
    anchor.style.outline = "2px dashed magenta";

    const panels = document.querySelectorAll('.holo-console');
    panels.forEach((panel, index) => {
      if (!anchor.contains(panel)) anchor.appendChild(panel);

      panel.style.display = 'block';
      panel.style.visibility = 'visible';
      panel.style.opacity = '1';
      panel.style.width = '100%';
      panel.style.margin = '20px 0';
      panel.style.position = 'relative';
      panel.style.height = 'auto';
      panel.style.minHeight = '200px';
      panel.style.maxHeight = 'none';
      panel.style.overflow = 'auto';
      panel.style.transform = 'none';
      panel.style.transition = 'none';
      panel.style.zIndex = `${1000 + index}`;
      panel.setAttribute('data-resurrected', 'true');
    });

    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    console.log('🧬 [Panel Resurrection Grid] Clean vertical layout applied.');
    this.lockResurrectionWatch();

    setTimeout(() => {
      window.__resurrecting = false;
    }, 300);
  },

  lockResurrectionWatch: function () {
    console.log("🛡️ Resurrection Watchdog suspended (clean slate mode).");
  }
};