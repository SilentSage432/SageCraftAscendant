export function handleAddItem() {
    const inputField = document.getElementById("itemInput");
    const value = inputField.value.trim();
    if (!/^\d+$/.test(value)) {
        showToast("Please enter a valid item number.", "error");
        return;
    }
    console.log("Item added:", value);
    inputField.value = "";
}

export function handleConfirmAddItem() {
    const inputField = document.getElementById("itemInput");
    const value = inputField.value.trim();
    if (!/^\d+$/.test(value)) {
        showToast("Please enter a valid item number.", "error");
        return;
    }
    console.log("Confirmed item added:", value);
    inputField.value = "";
}