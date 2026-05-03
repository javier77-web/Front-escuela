import React from "react";
import "../../styles/atoms/input.css";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-atom ${error ? "input-error-border" : ""} ${disabled ? "input-disabled" : ""}`}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
