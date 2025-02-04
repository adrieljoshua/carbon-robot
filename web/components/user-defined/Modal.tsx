const Modal = ({ title, children, onClose, className = "" }) => {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center
        bg-black bg-opacity-50 font-syne backdrop-blur-sm"
      >
        <div 
          className={`bg-white p-6 rounded-lg flex flex-col items-center 
          shadow-xl max-h-[70vh] overflow-auto relative z-60 ${className}`}
        >
          <h2 className="text-xl font-bold border-b pb-2 w-full text-center">{title}</h2>
          <div className="mt-4 w-full">{children}</div>
          <button
            onClick={onClose}
            className="mt-4 bg-black text-white px-4 py-2 rounded-md 
            hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

export default Modal;