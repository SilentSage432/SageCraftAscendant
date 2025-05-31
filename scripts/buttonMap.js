import { handleScanInput } from './scanHandlers.js';
import { handleAddItem, handleConfirmAddItem } from './addHandlers.js';
import { handleEditItem, handleConfirmEditItem } from './editHandlers.js';

export const globalButtonMap = {
    scanSubmitBtn: handleScanInput,
    addLiveItem: handleAddItem,
    confirmAddItemBtn: handleConfirmAddItem,
    editLiveItem: handleEditItem,
    confirmEditBtn: handleConfirmEditItem
};