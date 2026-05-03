import React from "react";
import "../../styles/atoms/spinner.css";

// indicador de carga — usar cuando haya llamadas al api
const Spinner = ({ texto = "cargando..." }) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-circulo"></div>
      {texto && <p className="spinner-texto">{texto}</p>}
    </div>
  );
};

export default Spinner;
