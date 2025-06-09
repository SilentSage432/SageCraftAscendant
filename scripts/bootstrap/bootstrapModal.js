// 🧭 Sovereign Ascendant — bootstrapModal.js
// Handles Modal Binding, Logic, and Orchestration Control

(function initializeBootstrapModal() {
  console.log("🪟 Sovereign Modal Controller Activated.");

  const modal = document.getElementById("sovereignModal");
  const modalContent = document.getElementById("sovereignModalContent");
  const closeButton = document.getElementById("closeModalButton");

  if (!modal || !modalContent || !closeButton) {
    console.error("❌ Modal elements missing.");
    return;
  }

  window.SovereignAscendant = window.SovereignAscendant || {};
  window.SovereignAscendant.ModalController = {
    openModal: function (content) {
      modalContent.innerHTML = content;
      modal.style.display = "block";
    },
    closeModal: function () {
      modal.style.display = "none";
    }
  };

  closeButton.addEventListener("click", () => {
    window.SovereignAscendant.ModalController.closeModal();
  });

  console.log("✅ Modal Controller Ready.");
})();
