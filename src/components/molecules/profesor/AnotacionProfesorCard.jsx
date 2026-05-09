import React from "react";
import "../../../styles/molecules/profesor/anotacionProfesorCard.css";

import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";

function AnotacionProfesorCard({ alumno, tipo, descripcion, fecha }) {
  return (
    <div className={`anotacion-profesor-card ${tipo}`}>
      {/* TOP */}
      <div className="anotacion-profesor-top">
        <Badge texto={tipo} tipo={tipo === "positiva" ? "success" : "danger"} />

        <Texto className="alumno-nombre">{alumno}</Texto>
      </div>

      {/* DESCRIPCIÓN */}
      <Texto>{descripcion}</Texto>

      {/* FECHA */}
      <Texto size="sm" color="muted" className="fecha">
        {fecha}
      </Texto>
    </div>
  );
}

export default AnotacionProfesorCard;
