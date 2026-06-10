import React from "react";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";
import Titulo from "../../atoms/Titulo";

//alumno
function AsistenciaResumenCard({
  asignatura,
  presentes,
  ausentes,
  porcentaje,
  getTipo,
}) {
  return (
    <div className="asistencia-card">
      <div className="asistencia-card-header">
        <Titulo level={3} className="asistencia-nombre">
          {asignatura}
        </Titulo>

        <div className="asistencia-detalle">
          {/* typo corregido: classNameO → className */}
          <Texto className="presentes">{presentes} presentes</Texto>
          <Texto className="ausentes">{ausentes} ausentes</Texto>
        </div>

        <div className="asistencia-badge">
          <Badge texto={`${porcentaje}%`} tipo={getTipo(porcentaje)} />
        </div>
      </div>

      <div className="barra-fondo">
        <div
          className={`barra-progreso asistencia-${getTipo(porcentaje)}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}

export default AsistenciaResumenCard;