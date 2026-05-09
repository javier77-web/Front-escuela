import React from "react";
import "../../../styles/molecules/alumno/anotacionCard.css";

import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";

function AnotacionCard({
  tipo,
  asignatura,
  descripcion,
  fecha,
  profesor,
  getTipoBadge,
}) {
  return (
    <div className={`anotacion-card ${tipo}`}>
      {/* IZQUIERDA */}
      <div className="anotacion-info">
        {/* TOP */}
        <div className="anotacion-top">
          <Badge texto={tipo} tipo={getTipoBadge(tipo)} />

          <Texto>{asignatura}</Texto>

          <Texto size="sm" color="muted">
            • {profesor}
          </Texto>
        </div>

        {/* DESCRIPCIÓN */}
        <Texto>{descripcion}</Texto>
      </div>

      {/* FECHA */}
      <Texto size="sm" color="muted" className="anotacion-fecha">
        {fecha}
      </Texto>
    </div>
  );
}

export default AnotacionCard;
