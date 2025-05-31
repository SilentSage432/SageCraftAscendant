// editHandlers.js

function handleEditItem() {
    const inputField = document.getElementById("editInputField");
    const value = inputField.value.trim();

    if (!/^\d+$/.test(value)) {
        showToast("Please enter a valid item number.", "error");
        return;
    }

    console.log("Confirmed item edited:", value);
    inputField.value = "";
}

function handleConfirmEditItem() {
    const inputField = document.getElementById("editConfirmInputField");
    const value = inputField.value.trim();

    if (!/^\d+$/.test(value)) {
        showToast("Please enter a valid item number.", "error");
        return;
    }

    console.log("Confirmed edit finalized:", value);
    inputField.value = "";
}

export { handleEditItem, handleConfirmEditItem };