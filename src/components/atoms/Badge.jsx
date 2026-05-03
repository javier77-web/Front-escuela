import React from "react";
import "../../styles/atoms/badge.css";

// muestra un estado visual con color segun el tipo
const Badge = ({ texto, tipo = "default" }) => {
  return <span className={`badge-atom ${tipo}`}>{texto}</span>;
};

export default Badge;