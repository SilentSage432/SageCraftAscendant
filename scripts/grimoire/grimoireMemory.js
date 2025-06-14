export const GrimoireMemory = {
  entries: [],

  recordEntry({ title, content, origin = "Unknown", tags = [], locked = false, unlockCondition = null, category = "Uncategorized" }) {
    const entry = {
      id: `entry_${Date.now()}`,
      title,
      content,
      origin,
      tags,
      locked,
      unlockCondition,
      category,
      timestamp: new Date().toISOString()
    };
    this.entries.push(entry);
    console.log(`📖 [Grimoire Entry Recorded] "${title}" by ${origin}${locked ? " [LOCKED]" : ""}`);
  },

  evaluateUnlocks(companions = {}) {
    this.entries.forEach(entry => {
      if (!entry.locked || !entry.unlockCondition) return;

      const { type, companion, state } = entry.unlockCondition;

      if (type === "companionState") {
        const target = companions[companion];
        if (target && target.state === state) {
          entry.locked = false;
          console.log(`🔓 [Grimoire Entry Unlocked] "${entry.title}" via ${companion} reaching state "${state}"`);
        }
      }
      else if (type === "loreChain") {
        const prerequisite = this.entries.find(e => e.title === entry.unlockCondition.dependsOn);
        if (prerequisite && !prerequisite.locked) {
          entry.locked = false;
          console.log(`🔗 [Grimoire Entry Unlocked] "${entry.title}" via lore chain dependency "${prerequisite.title}"`);
        }
      }

      // Future unlockCondition types can be handled here (e.g., tagTrigger, manual)
    });
  },

  getAllEntries() {
    return this.entries;
  },

  findEntriesByTag(tag) {
    return this.entries.filter(entry => entry.tags.includes(tag));
  },

  getEntryById(id) {
    return this.entries.find(entry => entry.id === id);
  },

  editEntry(id, newContent) {
    const entry = this.getEntryById(id);
    if (entry) {
      entry.content = newContent;
      entry.timestamp = new Date().toISOString();
      console.log(`✏️ [Grimoire Entry Edited] "${entry.title}"`);
      this.saveToLocalStorage();
    }
  },

  archiveEntry(id) {
    const entry = this.getEntryById(id);
    if (entry) {
      entry.archived = true;
      console.log(`📦 [Grimoire Entry Archived] "${entry.title}"`);
      this.saveToLocalStorage();
    }
  },

  renderTo(containerId = "grimoirePanelContent") {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Grimoire container "${containerId}" not found.`);
      return;
    }

    container.innerHTML = "";

    // --- Dynamic Tag Filter UI ---
    const allTags = [...new Set(this.entries.flatMap(entry => entry.tags))].sort();
    if (allTags.length > 0) {
      const filterWrapper = document.createElement("div");
      filterWrapper.className = "grimoire-filter-wrapper";

      const filterLabel = document.createElement("label");
      filterLabel.textContent = "Filter by Tag: ";
      filterLabel.setAttribute("for", "grimoireTagFilter");
      filterWrapper.appendChild(filterLabel);

      const tagSelect = document.createElement("select");
      tagSelect.id = "grimoireTagFilter";
      tagSelect.innerHTML = `<option value="">-- All Tags --</option>` + allTags.map(tag => `<option value="${tag}">${tag}</option>`).join("");

      tagSelect.addEventListener("change", () => {
        const selectedTag = tagSelect.value;
        const filtered = selectedTag ? this.applyFilter({ tag: selectedTag }) : this.entries;
        this.renderTableTo(containerId, filtered);
      });

      filterWrapper.appendChild(tagSelect);
      container.appendChild(filterWrapper);
    }

    this.entries.forEach(entry => {
      if (entry.archived) return;

      const entryEl = document.createElement("div");
      entryEl.className = "grimoire-entry" + (entry.locked ? " locked" : "");

      const titleEl = document.createElement("h3");
      titleEl.textContent = entry.title + (entry.locked ? " 🔒" : "");
      entryEl.appendChild(titleEl);

      const metaEl = document.createElement("p");
      metaEl.className = "grimoire-meta";
      metaEl.textContent = `From: ${entry.origin} • ${new Date(entry.timestamp).toLocaleString()}`;
      entryEl.appendChild(metaEl);

      const contentEl = document.createElement("p");
      contentEl.className = "grimoire-content";
      contentEl.textContent = entry.locked ? "This memory is currently locked." : entry.content;
      entryEl.appendChild(contentEl);

      // --- Edit Button ---
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Edit";
      editBtn.onclick = (e) => {
        e.stopPropagation();
        populateEditorModal(entry);
      };
      entryEl.appendChild(editBtn);

      // --- Archive Button ---
      const archiveBtn = document.createElement("button");
      archiveBtn.textContent = "📦 Archive";
      archiveBtn.onclick = () => {
        if (confirm(`Are you sure you want to archive "${entry.title}"?`)) {
          this.archiveEntry(entry.id);
          this.renderTo(containerId);
        }
      };
      entryEl.appendChild(archiveBtn);

      // --- Modal Detail View on Entry Click ---
      entryEl.addEventListener("click", () => {
        const modal = document.getElementById("grimoireDetailModal");
        document.getElementById("modalEntryTitle").textContent = entry.title + (entry.locked ? " 🔒" : "");
        document.getElementById("modalEntryMeta").textContent = `From: ${entry.origin} • ${new Date(entry.timestamp).toLocaleString()}`;
        document.getElementById("modalEntryContent").textContent = entry.content;
        document.getElementById("modalEntryTags").textContent = "Tags: " + (entry.tags.length ? entry.tags.join(", ") : "None");
        document.getElementById("modalEntryUnlock").textContent = entry.locked
          ? `Unlock Condition: ${entry.unlockCondition ? JSON.stringify(entry.unlockCondition) : "Unknown"}`
          : "";
        modal.classList.remove("hidden");
      });

      container.appendChild(entryEl);
    });

    // --- Modal Template Injection ---
    if (!document.getElementById("grimoireDetailModal")) {
      const modal = document.createElement("div");
      modal.id = "grimoireDetailModal";
      modal.className = "grimoire-modal hidden";
      modal.innerHTML = `
        <div class="grimoire-modal-content">
          <span class="grimoire-close-button" id="closeGrimoireModal">&times;</span>
          <h2 id="modalEntryTitle"></h2>
          <p id="modalEntryMeta"></p>
          <p id="modalEntryContent"></p>
          <p id="modalEntryTags"></p>
          <p id="modalEntryUnlock"></p>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById("closeGrimoireModal").onclick = () => {
        modal.classList.add("hidden");
      };
    }

    // --- Lore Entry Editor Modal ---
    if (!document.getElementById("grimoireEditorModal")) {
      const editorModal = document.createElement("div");
      editorModal.id = "grimoireEditorModal";
      editorModal.className = "grimoire-modal hidden";
      editorModal.innerHTML = `
        <div class="grimoire-modal-content">
          <span class="grimoire-close-button" id="closeEditorModal">&times;</span>
          <h2>Edit Grimoire Entry</h2>
          <label for="editorTitle">Title:</label>
          <input type="text" id="editorTitle" />

          <label for="editorContent">Content:</label>
          <textarea id="editorContent" rows="5"></textarea>

          <label for="editorTags">Tags (comma separated):</label>
          <input type="text" id="editorTags" />

          <button id="saveEditorBtn">💾 Save</button>
        </div>
      `;
      document.body.appendChild(editorModal);

      document.getElementById("closeEditorModal").onclick = () => {
        editorModal.classList.add("hidden");
      };
    }

    // --- Populate Editor Modal Function ---
    function populateEditorModal(entry) {
      document.getElementById("editorTitle").value = entry.title;
      document.getElementById("editorContent").value = entry.content;
      document.getElementById("editorTags").value = entry.tags.join(", ");

      document.getElementById("saveEditorBtn").onclick = () => {
        entry.title = document.getElementById("editorTitle").value;
        entry.content = document.getElementById("editorContent").value;
        entry.tags = document.getElementById("editorTags").value.split(",").map(t => t.trim());
        entry.timestamp = new Date().toISOString();

        GrimoireMemory.saveToLocalStorage();
        GrimoireMemory.renderTo();
        document.getElementById("grimoireEditorModal").classList.add("hidden");
      };

      document.getElementById("grimoireEditorModal").classList.remove("hidden");
    }
  },

  initializeFromKernel(kernelEntries = []) {
    kernelEntries.forEach(entry => {
      const exists = this.entries.some(e => e.title === entry.title && e.origin === entry.origin);
      if (!exists) {
        this.entries.push(entry);
      }
    });
    this.evaluateUnlocks();
    this.saveToLocalStorage();
    console.log(`🧠 Grimoire synchronized from Lore Kernel with ${kernelEntries.length} entries.`);
  },

  saveToLocalStorage() {
    try {
      const data = JSON.stringify(this.entries);
      localStorage.setItem("grimoireEntries", data);
      console.log("💾 Grimoire entries saved to localStorage.");
    } catch (err) {
      console.error("Failed to save Grimoire entries:", err);
    }
  },

  loadFromLocalStorage(companions = {}) {
    try {
      const data = localStorage.getItem("grimoireEntries");
      if (!data) return;
      const parsed = JSON.parse(data);
      this.entries = parsed;
      this.evaluateUnlocks(companions);
      console.log("📥 Grimoire entries loaded from localStorage.");
    } catch (err) {
      console.error("Failed to load Grimoire entries:", err);
    }
  },

  syncFromSageFeed(feedData = []) {
    feedData.forEach(item => {
      const exists = this.entries.some(e => e.title === item.title && e.origin === item.origin);
      if (!exists) {
        this.recordEntry(item);
      }
    });
    this.saveToLocalStorage();
    console.log(`🔁 Synced ${feedData.length} entries from Sage Feed.`);
  },
  // --- Render a sortable table of all entries ---
  renderTableTo(containerId = "grimoireTablePanel", entries = null) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Grimoire table container "${containerId}" not found.`);
      return;
    }

    container.innerHTML = "";

    const table = document.createElement("table");
    table.className = "grimoire-table";

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Origin</th>
        <th>Tags</th>
        <th>Category</th>
        <th>Status</th>
        <th>Timestamp</th>
        <th>Actions</th>
      </tr>
    `;
    // --- Add column sorting behavior ---
    const headers = thead.querySelectorAll("th");
    let currentSortColumn = null;
    let ascending = true;

    headers.forEach((header, index) => {
      header.style.cursor = "pointer";
      header.addEventListener("click", () => {
        const keyMap = ["title", "origin", "tags", "category", "status", "timestamp"];
        const key = keyMap[index];

        if (!key) return;

        ascending = currentSortColumn === key ? !ascending : true;
        currentSortColumn = key;

        const sortedEntries = [...(entries || this.entries)].sort((a, b) => {
          let aVal = a[key] || "";
          let bVal = b[key] || "";

          if (key === "tags") {
            aVal = aVal.join(", ");
            bVal = bVal.join(", ");
          } else if (key === "status") {
            aVal = a.archived ? "Archived" : a.locked ? "Locked" : "Unlocked";
            bVal = b.archived ? "Archived" : b.locked ? "Locked" : "Unlocked";
          } else if (key === "timestamp") {
            aVal = new Date(a.timestamp).getTime();
            bVal = new Date(b.timestamp).getTime();
            // For timestamps, sort numerically
            return ascending ? aVal - bVal : bVal - aVal;
          }

          return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });

        this.renderTableTo(containerId, sortedEntries);
      });
    });
    // --- End sorting behavior ---
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    (entries || this.entries).forEach(entry => {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = entry.title;
      row.appendChild(titleCell);

      const originCell = document.createElement("td");
      originCell.textContent = entry.origin;
      row.appendChild(originCell);

      const tagsCell = document.createElement("td");
      tagsCell.textContent = entry.tags.join(", ");
      row.appendChild(tagsCell);

      const categoryCell = document.createElement("td");
      categoryCell.textContent = entry.category;
      row.appendChild(categoryCell);

      const statusCell = document.createElement("td");
      statusCell.textContent = entry.archived ? "Archived" : entry.locked ? "Locked" : "Unlocked";
      row.appendChild(statusCell);

      const timeCell = document.createElement("td");
      timeCell.textContent = new Date(entry.timestamp).toLocaleString();
      row.appendChild(timeCell);

      const actionsCell = document.createElement("td");

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.onclick = () => {
        const newContent = prompt("Edit memory content:", entry.content);
        if (newContent !== null) {
          this.editEntry(entry.id, newContent);
          this.renderTableTo(containerId);
        }
      };
      actionsCell.appendChild(editBtn);

      const archiveBtn = document.createElement("button");
      archiveBtn.textContent = "📦";
      archiveBtn.onclick = () => {
        if (confirm(`Archive "${entry.title}"?`)) {
          this.archiveEntry(entry.id);
          this.renderTableTo(containerId);
        }
      };
      actionsCell.appendChild(archiveBtn);

      row.appendChild(actionsCell);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  },

  applyFilter(criteria = {}) {
    let filtered = this.entries;

    if (criteria.tag) {
      filtered = filtered.filter(entry => entry.tags.includes(criteria.tag));
    }

    if (criteria.origin) {
      filtered = filtered.filter(entry => entry.origin === criteria.origin);
    }

    if (typeof criteria.locked === "boolean") {
      filtered = filtered.filter(entry => entry.locked === criteria.locked);
    }

    if (typeof criteria.archived === "boolean") {
      filtered = filtered.filter(entry => entry.archived === criteria.archived);
    }

    if (criteria.category) {
      filtered = filtered.filter(entry => entry.category === criteria.category);
    }

    return filtered;
  },
};

// --- GrimoireMemory: Inject Entries with Locked Unlock Condition ---
GrimoireMemory.loadFromLocalStorage({
  silentSage: { state: "awakened" }
});

GrimoireMemory.recordEntry({
  title: "The Lost Rune",
  content: "Etched in forgotten dialect, this rune holds secrets known only to the awakened Silent Sage.",
  origin: "The Gatekeeper",
  tags: ["rune", "forgotten", "sage"],
  locked: true,
  unlockCondition: {
    type: "companionState",
    companion: "silentSage",
    state: "awakened"
  }
});

GrimoireMemory.recordEntry({
  title: "The First Echo",
  content: "In the silence before the stars aligned, a single whisper awakened the forge of thought.",
  origin: "The Archivist",
  tags: ["origin", "lore", "echo"],
  locked: false
});

GrimoireMemory.recordEntry({
  title: "The Rune’s Echo",
  content: "The echo of the lost rune resonates only after its inscription is deciphered.",
  origin: "The Engineer",
  tags: ["rune", "echo", "follow-up"],
  locked: true,
  unlockCondition: {
    type: "loreChain",
    dependsOn: "The Lost Rune"
  }
});

GrimoireMemory.saveToLocalStorage();

// --- Phase XXXI: Kernel Bootstrap Integration ---
import { LoreKernel } from "./loreKernel.js";
GrimoireMemory.initializeFromKernel(LoreKernel.entries);
