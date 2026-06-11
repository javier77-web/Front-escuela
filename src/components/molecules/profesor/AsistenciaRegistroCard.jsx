import React from "react";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";
import Boton from "../../atoms/Boton";
import "../../../styles/molecules/profesor/alumnoAsistenciaCard.css";

function AsistenciaRegistroCard({ alumno, cambiarEstado, getTipo, soloLectura = false }) {
  return (
    <div className={`alumno-asistencia-card ${soloLectura ? "solo-lectura" : ""}`}>
      <div className="alumno-info">
        <Texto className="alumno-nombre">{alumno.nombre}</Texto>
        <Badge texto={alumno.estado} tipo={getTipo(alumno.estado)} />
      </div>

      {!soloLectura && (
        <div className="alumno-acciones">
          <Boton
            variant={alumno.estado === "presente" ? "primary" : "secondary"}
            onClick={() => cambiarEstado(alumno.id, "presente")}
          >
            Presente
          </Boton>
          <Boton
            variant={alumno.estado === "ausente" ? "danger" : "secondary"}
            onClick={() => cambiarEstado(alumno.id, "ausente")}
          >
            Ausente
          </Boton>
        </div>
      )}
    </div>
  );
}

export default AsistenciaRegistroCard;
