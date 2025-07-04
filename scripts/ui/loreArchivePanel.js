

// === Lore Archive Panel UI Wiring ===

const lorePanel = document.getElementById("loreArchivePanel");
const loreCloseBtn = document.getElementById("closeLorePanel");

function openLorePanel() {
  if (lorePanel) {
    lorePanel.style.display = "block";
    populateLorePanel();
  }
}

function closeLorePanel() {
  if (lorePanel) {
    lorePanel.style.display = "none";
  }
}

function populateLorePanel() {
  const loreContent = document.getElementById("loreEntries");
  if (!loreContent) return;

  const storedLore = JSON.parse(localStorage.getItem("whispererLore") || "[]");
  loreContent.innerHTML = "";

  if (storedLore.length === 0) {
    loreContent.innerHTML = "<p class='empty-lore'>No lore entries yet.</p>";
    return;
  }

  storedLore.forEach((entry, index) => {
    const item = document.createElement("div");
    item.className = "lore-entry";
    item.innerHTML = `
      <div class="lore-entry-header">#${index + 1}</div>
      <div class="lore-entry-body">${entry}</div>
    `;
    loreContent.appendChild(item);
  });
}

loreCloseBtn?.addEventListener("click", closeLorePanel);

// Optional: Expose open function globally if triggered by command
window.openLorePanel = openLorePanel;