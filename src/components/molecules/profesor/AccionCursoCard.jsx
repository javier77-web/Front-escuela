import React from "react";

import "../../../styles/molecules/profesor/accionCursoCard.css";
import Boton from "../../atoms/Boton";

function AccionCursoCard({ texto, onClick }) {
  return (
    <div className="accion-curso-card">
      <Boton onClick={onClick}>{texto}</Boton>
    </div>
  );
}

export default AccionCursoCard;
