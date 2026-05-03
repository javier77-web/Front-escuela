import React from "react";
import "../../styles/atoms/texto.css";

// texto reutilizable (parrafos, descripciones, labels simples)
const Texto = ({ children, size = "md", color = "default", className = "" }) => {
  return (
    <p className={`texto-atom ${size} ${color} ${className}`}>
      {children}
    </p>
  );
};

export default Texto;