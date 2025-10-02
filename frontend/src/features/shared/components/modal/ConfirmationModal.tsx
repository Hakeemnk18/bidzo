

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  cnfBtnMessage: string
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, cnfBtnMessage} : ConfirmModalProps) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{message}</h2>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            { cnfBtnMessage }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;