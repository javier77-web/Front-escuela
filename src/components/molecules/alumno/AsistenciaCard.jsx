import React from "react";
import "../../../styles/molecules/alumno/asistenciaCard.css";

import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";

function AsistenciaCard({
  asignatura,
  presentes,
  ausentes,
  porcentaje,
  getTipo,
}) {
  return (
    <div className="asistencia-card">
      {/* IZQUIERDA */}
      <div className="asistencia-left">
        <Texto className="asistencia-nombre">{asignatura}</Texto>
      </div>

      {/* CENTRO */}
      <div className="asistencia-center">
        <Texto className="presentes">{presentes} presentes</Texto>

        <Texto className="ausentes">{ausentes} ausentes</Texto>
      </div>

      {/* DERECHA */}
      <div className="asistencia-right">
        <Badge texto={`${porcentaje}%`} tipo={getTipo(porcentaje)} />
      </div>

      {/* BARRA */}
      <div className="barra-fondo">
        <div
          className={`barra-progreso asistencia-${getTipo(porcentaje)}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}

export default AsistenciaCard;
