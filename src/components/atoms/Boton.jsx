import React from "react";
import "../../styles/atoms/boton.css";

const Boton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-atom ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Boton;
