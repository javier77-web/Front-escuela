import React from "react";
import "../../../styles/molecules/profesor/alumnoAsistenciaCard.css";

import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";
import Boton from "../../atoms/Boton";

function AlumnoAsistenciaCard({ alumno, cambiarEstado, getTipo }) {
  return (
    <div className="alumno-asistencia-card">
      {/* INFO */}
      <div className="alumno-info">
        <Texto className="alumno-nombre">{alumno.nombre}</Texto>

        <Badge texto={alumno.estado} tipo={getTipo(alumno.estado)} />
      </div>

      {/* ACCIONES */}
      <div className="alumno-acciones">
        <Boton
          variant={alumno.estado === "presente" ? "primary" : "secondary"}
          onClick={() => cambiarEstado(alumno.id, "presente")}
        >
          presente
        </Boton>

        <Boton
          variant={alumno.estado === "ausente" ? "danger" : "secondary"}
          onClick={() => cambiarEstado(alumno.id, "ausente")}
        >
          ausente
        </Boton>
      </div>
    </div>
  );
}

export default AlumnoAsistenciaCard;
