import React from "react";

import "../../../styles/molecules/alumno/cursoCard.css";

import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";

function CursoCard({ nombre, profesor, horario }) {
  return (
    <div className="curso-card">
      {/* HEADER */}
      <div className="curso-card-header">
        <Titulo level={3}>{nombre}</Titulo>
      </div>

      {/* INFO */}
      <div className="curso-info">
        <Texto>{profesor}</Texto>

        <Texto size="sm" color="muted">
          {horario}
        </Texto>
      </div>
    </div>
  );
}

export default CursoCard;
