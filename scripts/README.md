Welcome to the Inventory Auditor, a web-based tool designed to streamline inventory tracking, barcode scanning, and audit efficiency — tailored specifically for high-volume environments like showrooms and warehouse departments.

🚀 Features
	•	📷 Live Scan Logging: Scan barcodes and log items directly into a live entry table.
	•	🧠 Intelligent Prompt System: Unrecognized barcodes trigger a modal prompt to categorize and map the item (Product, ESL, or Bay Tag).
	• 📂 Mapping & Categorization:
	  - ESL Tags → Location Mapping  
	  - Product Tags → UPC & Item Mapping  
	  - Bay Tags → Audit Location Tracking  
	•	🔒 Persistent Category Selection: Selected product category stays locked during scanning sessions until changed.
	•	📊 Real-time Map Status Tracker: Displays count of UPCs, ESLs, and Bay Tags mapped.
	•	🛠 Manual Entry & Editing Tools: Edit quantity, item numbers, or categories with custom modals.
	•	💾 Autosave & Dropbox Sync:
	•	Autosaves locally and to Dropbox every 10 minutes.
	•	Merge Master Report feature combines all saved Excel logs.
	•	📅 Audit Timer:
	•	Starts automatically when a bay is scanned.
	•	Stops when bay is closed.
	•	Logged in audit history.
	•	🔧 Developer Debug Mode: dev-debug.js provides real-time console hooks for testing core functions and reviewing data structures.

⸻

🛠 Tech Stack
	•	HTML5 + CSS3 (Responsive & Styled UI)
	•	JavaScript (Vanilla ES6 Modules)
	•	FileSaver.js for Excel export
	•	Dropbox SDK for cloud storage
	•	Toast & Modal UI Patterns
	•	Git + GitHub for version control


📁 Project Structure
├── index.html
├── scripts/
│   ├── index.js
│   ├── scan.js
│   ├── ui.js
│   ├── events.js
│   └── dev-debug.js
├── styles/
│   └── main.css
├── data/
│   └── sample-scan.xlsx


🔧 Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/inventory-auditor.git
   cd inventory-auditor
   ```

2. Open `index.html` in your browser or use a local server (e.g. Live Server in VS Code).

3. Make sure your Dropbox token is configured (if syncing is enabled).

💡 Coming Soon
	•	Voice-assisted scanning prompts
	•	Tag printing feature
	•	Advanced analytics + charts
	•	Role-based user profiles

  👨‍💻 Maintainer

Built with passion and patience by Tyson Zaugg
🔗 sagecraftalchemy.com
📫 DM me on GitHub or Instagram @SilentSage432  
# Inventory Auditor — Modular Web Inventory Platform

A fully modularized inventory auditing platform for high-volume scanning, warehouse management, showroom auditing, and inventory tracking.  
Now fully stabilized with clean modular JavaScript architecture and fully wired event management.

---

## 🚀 Core Features

- 📷 **Live Scan Logging**  
  Scan barcodes directly into a live real-time entry table.
  
- 🧠 **Intelligent Prompt System**  
  Unrecognized scans trigger a modal prompt allowing mapping as Product, ESL, or Bay tags.

- 📂 **Mapping & Categorization**
  - ESL Tags → Location Mapping  
  - Product Tags → UPC & Item Mapping  
  - Bay Tags → Audit Location Tracking

- 🔒 **Persistent Category Selection**  
  Product categories stay locked during active scanning sessions.

- 📊 **Real-time Mapping Status**  
  Track count of UPCs, ESLs, and Bay tags mapped.

- 🛠 **Manual Entry & Editing Tools**  
  Edit item quantities, categories, or product assignments.

- 💾 **Autosave & Dropbox Sync**  
  - Local autosave every few seconds.  
  - Dropbox cloud sync + versioned backups.

- 📅 **Audit Timer & History**  
  Bay scanning automatically starts timers and logs sessions.

- 🔧 **Developer Debug Console & Diagnostics**  
  - Full system audit functions  
  - Master wiring diagnostics  
  - Button listener audits  
  - Wiring auto-healing layers  
  - Modular diagnostics tools for full integrity checks.

---

## 🧰 Modular File Structure (Fully Refactored)

```
├── index.html              → Main UI shell
├── styles/
│   └── style.css           → App styling & responsive UI
├── scripts/
│   ├── init.js             → Bootloader: DOMContentLoaded wiring
│   ├── globals.js          → Master state objects & global variables
│   ├── utilities.js        → Shared utility/helper functions
│   ├── scanHandlers.js     → Main scanning engine logic
│   ├── addHandlers.js      → Logic for adding new items manually
│   ├── editHandlers.js     → Logic for editing existing mapped items
│   ├── dropbox.js          → Dropbox OAuth, file sync, and backup logic
│   ├── sessions.js         → Session save/load manager (localStorage)
│   ├── wiring.js           → Global master wiring for all buttons & listeners
│   ├── wiringObserver.js   → Auto-healing button observer system
│   ├── audit.js            → Full system integrity audits
│   ├── version.js          → Live runtime version manager
│   └── version-bump.js     → Build-time version bump tool
```

---

## 🛠 Tech Stack

- HTML5 + CSS3 (Responsive UI)
- Vanilla JavaScript (ES6 Modules)
- FileSaver.js (Excel Export)
- Dropbox SDK (Cloud Sync)
- Modular Debugging Console
- Git + GitHub for Version Control

---

## 🔧 Setup

1️⃣ Clone Repository:

```bash
git clone https://github.com/YOUR_USERNAME/inventory-auditor.git
cd inventory-auditor
```

2️⃣ Open `index.html` directly or use VS Code Live Server.

3️⃣ Ensure Dropbox OAuth token is configured for cloud sync.

---

## 📅 Future Roadmap

- Voice-Activated Scan Prompts  
- Role-Based User Profiles  
- Enhanced Charting & Analytics  
- Auto-Audit Health Monitoring  
- Full Deployment Package Generator

---

👨‍💻 **Maintainer:**  
Built by Tyson Zaugg — [sagecraftalchemy.com](https://sagecraftalchemy.com)  
DM @SilentSage432

---