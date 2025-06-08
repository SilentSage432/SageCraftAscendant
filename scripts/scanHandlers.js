// Smart Mapping Engine v1
const upcToItemMap = loadMappings();

function loadMappings() {
    const stored = localStorage.getItem("upcToItemMap");
    return stored ? JSON.parse(stored) : {
        "123456789012": "Sample Item A",
        "987654321098": "Sample Item B",
        "555555555555": "Sample Item C"
    };
}

function saveMappings() {
    localStorage.setItem("upcToItemMap", JSON.stringify(upcToItemMap));
}

const eslToItemMap = loadESLMappings();
const bayToItemMap = loadBayMappings();

function loadESLMappings() {
    const stored = localStorage.getItem("eslToItemMap");
    return stored ? JSON.parse(stored) : {};
}

function saveESLMappings() {
    localStorage.setItem("eslToItemMap", JSON.stringify(eslToItemMap));
}

function loadBayMappings() {
    const stored = localStorage.getItem("bayToItemMap");
    return stored ? JSON.parse(stored) : {};
}

function saveBayMappings() {
    localStorage.setItem("bayToItemMap", JSON.stringify(bayToItemMap));
}

export function handleScanInput(event) {
    event.preventDefault();
    const inputField = document.getElementById('scanInput');
    const value = inputField.value.trim();

    if (!value || isNaN(value)) {
        showToast("Please enter valid item number.", "error");
        return;
    }

    console.log("Scanned value:", value);

    // Field Logging Injection: Scan Event
    logFieldEvent("ScanInput", { rawValue: value });

    // UPC Normalization Logic
    function normalizeUPC(value) {
        return (value.length === 13 && value.startsWith("0")) ? value.slice(1) : value;
    }
    const normalizedValue = normalizeUPC(value);

    const scanType = window.classifyScan(value);
    console.log("Classified as:", scanType);

    // Smart Auto-Save Logic
    if (scanType === "UPC Code" && upcToItemMap[normalizedValue]) {
        showToast(`Auto-saved: ${upcToItemMap[normalizedValue]}`, "success");
        console.log(`Auto-saved UPC ${normalizedValue} as ${upcToItemMap[normalizedValue]}`);
        logFieldEvent("AutoSave", { scanType, normalizedValue, item: upcToItemMap[normalizedValue] });
        inputField.value = "";
        return; // Skip routing/modal entirely
    }

    switch (scanType) {
        case "ESL Tag":
            showToast("ESL Tag detected", "info");
            break;
        case "UPC Code":
            showToast("UPC Code detected", "info");
            break;
        case "Item ID":
            showToast("Item ID detected", "info");
            break;
        default:
            showToast("Unknown scan type", "warning");
            break;
    }
    // Routing Layer v1
    switch (scanType) {
        case "ESL Tag":
            document.getElementById('eslInput').value = value;
            openEditModal("ESL");
            logFieldEvent("ModalRoute", { scanType: "ESL Tag", value });
            break;
        case "UPC Code":
            document.getElementById('productInput').value = value;
            openEditModal("Product");
            logFieldEvent("ModalRoute", { scanType: "UPC Code", value });
            break;
        case "Item ID":
            document.getElementById('bayInput').value = value;
            openEditModal("Bay");
            logFieldEvent("ModalRoute", { scanType: "Item ID", value });
            break;
        default:
            console.warn("No modal routing for unknown scan type.");
            logFieldEvent("ModalRoute", { scanType: "Unknown", value });
            break;
    }
    inputField.value = "";
}

// Classification Module
function classifyScan(value) {
    if (/^\d{4,6}$/.test(value)) return "ESL Tag";
    if (/^\d{12,13}$/.test(value)) return "UPC Code";
    if (/^\d{7,8}$/.test(value)) return "Item ID";
    return "Unknown";
}
window.classifyScan = classifyScan;

// Multi-Map Learning Module
export function learnMapping(scanType, code, itemName) {
    if (!code || !itemName) return;

    if (scanType === "UPC Code") {
        upcToItemMap[code] = itemName;
        saveMappings();
    }
    else if (scanType === "ESL Tag") {
        eslToItemMap[code] = itemName;
        saveESLMappings();
    }
    else if (scanType === "Item ID") {
        bayToItemMap[code] = itemName;
        saveBayMappings();
    }

    console.log(`Learned [${scanType}] mapping: ${code} ➔ ${itemName}`);
    showToast(`Learned: ${itemName} mapped to ${code}`, "success");
}