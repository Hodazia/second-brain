import React from "react";

interface LogoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Logout: React.FC<LogoutPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center 
    justify-center  bg-opacity-60 z-50">
      {/* Changed modal background to white */}
      <div className="bg-gradient-to-b from-white to-orange-50  rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Log Out</h2>
        <p className="mt-2 text-gray-700">Do you want to log out?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-600 text-white rounded 
            hover:bg-white hover:text-orange-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-orange-600 text-white rounded 
            hover:bg-white hover:text-orange-600 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;