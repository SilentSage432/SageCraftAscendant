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