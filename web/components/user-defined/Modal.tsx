import { X, XCircleIcon } from "lucide-react";

const Modal = ({ title, children, onClose, className = "" }) => {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-syne backdrop-blur-sm">
        <div 
          className={`bg-white p-6 rounded-lg flex flex-col items-center shadow-xl max-h-[70vh] overflow-auto relative z-60 ${className}`}>
          <div className="w-full flex justify-end items-center">
          <h2 className="text-xl font-bold border-b pb-2 w-full text-center">{title}</h2>
          <button onClick={onClose} className="mt-4 text-black px-4 py-2  font-bold hover:text-gray-800 transition"> <XCircleIcon size={30}/> </button>
          </div>
          <div className="mt-4 w-full">{children}</div>
          
        </div>
      </div>
    );
  };

export default Modal;