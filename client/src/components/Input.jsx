import React from "react";

function Input(props) {
  function renderInput({ type = "text", placeholder }) {
    switch (type) {
      case "text":
      case "password":
        return <input type={type} placeholder={placeholder} />;
      case "textarea":
        return <textarea rows="4" placeholder={placeholder} />;
      case "file":
        return <input type={type} accept=".png,.jpg,.jpeg" />;
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
