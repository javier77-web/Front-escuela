import React from "react";

import "../../../styles/molecules/profesor/cursoProfesorCard.css";
import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";
import Boton from "../../atoms/Boton";

function CursoProfesorCard({ nombre, curso, horario, onGestionar }) {
  return (
    <div className="curso-profesor-card">
      <Titulo level={3}>{nombre}</Titulo>

      <Texto>{curso}</Texto>

      <Texto size="sm" color="muted">
        {horario}
      </Texto>

      <Boton onClick={onGestionar}>Gestionar</Boton>
    </div>
  );
}

export default CursoProfesorCard;
