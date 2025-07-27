import React from "react";

interface MessageBoxProps {
  message: string | null;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, type, onClose }) => {
  if (!message) return null;

  let bgColor = "";
  let borderColor = "";
  let textColor = "";

  switch (type) {
    case "success":
      bgColor = "bg-green-100";
      borderColor = "border-green-400";
      textColor = "text-green-700";
      break;
    case "error":
      bgColor = "bg-red-100";
      borderColor = "border-red-400";
      textColor = "text-red-700";
      break;
    case "info":
      bgColor = "bg-blue-100";
      borderColor = "border-blue-400";
      textColor = "text-blue-700";
      break;
  }

  return (
    <div
      className={`fixed top-4 right-4 p-4 max-w-md rounded-lg shadow-lg border ${bgColor} ${borderColor} ${textColor} flex items-center justify-between z-50`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold hover:cursor-pointer"
      >
        &times;
      </button>
    </div>
  );
};

export default MessageBox;
