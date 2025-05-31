export function handleScanInput(event) {
    event.preventDefault();
    const inputField = document.getElementById('scanInput');
    const value = inputField.value.trim();

    if (!value || isNaN(value)) {
        showToast("Please enter valid item number.", "error");
        return;
    }

    console.log("Scanned value:", value);
    inputField.value = "";
}