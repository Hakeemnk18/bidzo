
interface AlertModalProps {
    onClose: () => void;
    isOpen: boolean;
    message: string;
}

const AlertModal = ({ onClose, isOpen, message }: AlertModalProps) => {

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
        

      <div className=" relative bg-white rounded-xl shadow-lg p-6 w-full max-w-sm h-30">
        <div className="absolute top-4 right-4 cursor-pointer" >
            <button 
            onClick={onClose}
            className="text-black bg-red-500 py-1 px-2 rounded-md font-bold">X</button>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4"></h2>
        <div className="flex justify-center gap-3 font-bold">
          {message}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;