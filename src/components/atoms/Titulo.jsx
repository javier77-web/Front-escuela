import React from "react";
import "../../styles/atoms/titulo.css";

// titulo reutilizable, level controla si es h1, h2, h3...
const Titulo = ({ children, level = 1, className = "" }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`titulo-atom level-${level} ${className}`}>
      {children}
    </Tag>
  );
};

export default Titulo;