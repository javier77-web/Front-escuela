import React from "react";
import "../../styles/molecules/alumno/anotacionCard.css";
import Texto from "../atoms/Texto";
import Badge from "../atoms/Badge";

//Antes habían diferentes elementos para las anotacion, se unificaron en este

function AnotacionCard({
  vista = "alumno",
  tipo,
  asignatura,
  descripcion,
  fecha,
  profesor,
  alumno,
  getTipoBadge,
}) {
  return (
    <div className={`anotacion-card ${tipo} anotacion-card--${vista}`}>
      <div className="anotacion-info">
        <div className="anotacion-top">
          <Badge texto={tipo} tipo={getTipoBadge(tipo)} />

          {vista === "alumno" && (
            <>
              <Texto>{asignatura}</Texto>
              <Texto size="sm" color="muted">
                - {profesor}
              </Texto>
            </>
          )}

          {vista === "profesor" && (
            <Texto className="alumno-nombre">{alumno}</Texto>
          )}
        </div>

        <Texto>{descripcion}</Texto>
      </div>

      <Texto size="sm" color="muted" className="anotacion-fecha">
        {fecha}
      </Texto>
    </div>
  );
}

export default AnotacionCard;
