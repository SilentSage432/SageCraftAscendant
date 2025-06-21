console.log("🌀 commandFeedback.js engaged");

export const FeedbackHub = {
  logSuccess: (message) => {
    console.log(`✅ SUCCESS: ${message}`);
  },

  logError: (message) => {
    console.error(`❌ ERROR: ${message}`);
  },

  logWarning: (message) => {
    console.warn(`⚠️ WARNING: ${message}`);
  },

  logInfo: (message) => {
    console.info(`ℹ️ INFO: ${message}`);
  },

  injectToPanel: (panelId, message, type = "info") => {
    const panel = document.getElementById(panelId);
    if (!panel) {
      console.warn(`⚠️ Panel "${panelId}" not found for feedback injection.`);
      return;
    }

    const msgElem = document.createElement("div");
    msgElem.className = `feedback-message ${type}`;
    msgElem.textContent = message;
    panel.appendChild(msgElem);
  }
};

export const logCommandFeedback = FeedbackHub.logInfo;
