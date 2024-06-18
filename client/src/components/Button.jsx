import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const colorVariants = {
  red: "bg-red-700 hover:bg-red-800 focus:ring-red-900 disabled:bg-red-700",
  primary:
    "bg-primary-700 hover:bg-primary-800 focus:ring-primary-900 disabled:bg-primary-700",
};

function Button({
  children,
  type = "button",
  disabled = false,
  isLoading,
  color = "primary",
  classes = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      {...props}
      className={`text-base px-4 py-2 rounded-lg focus:ring-2 ${colorVariants[color]} ${classes}`}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}

export default Button;
