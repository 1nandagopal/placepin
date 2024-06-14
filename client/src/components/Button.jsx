import React from "react";

function Button({
  children,
  type = "button",
  disabled = false,
  isLoading,
  onClick,
}) {
  return (
    <button type={type} disabled={disabled || isLoading} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
