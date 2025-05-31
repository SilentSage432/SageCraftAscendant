import { handleScanInput } from './scanHandlers.js';
import { handleAddItem, handleConfirmAddItem } from './addHandlers.js';
import { handleEditItem, handleConfirmEdit } from './editHandlers.js';

const globalButtonMap = {
  scanSubmitBtn: handleScanInput,
  addSubmitBtn: handleAddItem,
  confirmAddBtn: handleConfirmAddItem,
  editSubmitBtn: handleEditItem,
  confirmEditBtn: handleConfirmEdit
};

export { globalButtonMap };