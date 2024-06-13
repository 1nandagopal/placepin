import React from "react";

const className = {
  text: "mt-0.5 text-base block w-full p-2 font-normal bg-gray-700 rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600",
  file: "mt-0.5 text-base text-gray-400 block w-full font-normal bg-gray-700 rounded-lg border border-gray-600 cursor-pointer file:me-4 file:border-0 file:bg-gray-600 file:p-2 file:text-white file:cursor-pointer",
};

function Input(props) {
  function renderInput({ type = "text", placeholder }) {
    switch (type) {
      case "text":
      case "password":
        return (
          <input
            type={type}
            placeholder={placeholder}
            className={className.text}
          />
        );
      case "textarea":
        return (
          <textarea
            rows="4"
            placeholder={placeholder}
            className={className.text}
          />
        );
      case "file":
        return (
          <input
            type={type}
            accept=".png,.jpg,.jpeg"
            className={className.file}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <label className="text-sm">
        {props.label}
        {renderInput(props)}
      </label>
    </div>
  );
}

export default Input;
