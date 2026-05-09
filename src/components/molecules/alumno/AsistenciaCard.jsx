import React from "react";
import "../../../styles/molecules/alumno/asistenciaCard.css";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";
import Titulo from "../../atoms/Titulo";

function AsistenciaCard({
  asignatura,
  presentes,
  ausentes,
  porcentaje,
  getTipo,
}) {
  return (
    <div className="asistencia-card">
      {/* HEADER */}
      <div className="asistencia-card-header">
        {/* IZQUIERDA */}
        <Titulo level={3} className="asistencia-nombre">
          {asignatura}
        </Titulo>

        {/* CENTRO */}
        <div className="asistencia-detalle">
          <Texto className="presentes">{presentes} presentes</Texto>

          <Texto className="ausentes">{ausentes} ausentes</Texto>
        </div>

        {/* DERECHA */}
        <div className="asistencia-badge">
          <Badge texto={`${porcentaje}%`} tipo={getTipo(porcentaje)} />
        </div>
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
