import { learnMapping } from './scanHandlers.js';
import { classifyScan } from './scanHandlers.js';

function handleEditItem() {
    const inputField = document.getElementById("scanInput");
    const value = inputField.value.trim();

    if (!/^\d+$/.test(value)) {
        showToast("Please enter a valid item number.", "error");
        return;
    }

    console.log("Edit initiated for:", value);
    inputField.value = "";
}

function handleConfirmEdit() {
    const inputField = document.getElementById("scanInput");
    const value = inputField.value.trim();

    if (!/^\d+$/.test(value)) {
        showToast("Please enter a valid item number.", "error");
        return;
    }

    console.log("Confirmed edit finalized:", value);
    // Field Logging Injection: Edit Confirm
    window.logFieldEvent("EditConfirm", { rawValue: value });
    
    const scanType = classifyScan(value);
    const itemName = prompt(`Enter item name for ${scanType} learning:`);
    if (itemName) {
        learnMapping(scanType, value, itemName);
        window.logFieldEvent("LearnMapping", { scanType, code: value, itemName });
    }
    inputField.value = "";
}

function handleCancelEdit() {
    const inputField = document.getElementById("scanInput");
    inputField.value = "";
    console.log("Edit canceled — input cleared.");
}

function handleCloseSummary() {
    document.getElementById("summaryModal").classList.add("hidden");
    console.log("Summary modal closed.");
}

function handleToggleDevDashboard() {
    const devTools = document.getElementById("devTools");
    devTools.classList.toggle("hidden");
    console.log("Developer dashboard toggled.");
}

export { 
    handleEditItem, 
    handleConfirmEdit, 
    handleCancelEdit, 
    handleCloseSummary, 
    handleToggleDevDashboard 
};