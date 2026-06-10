import React from "react";
import Texto from "../../atoms/Texto";
import Boton from "../../atoms/Boton";
import "../../../styles/molecules/profesor/alumnoAsistenciaCard.css";

//Las asistencias antigua tenian muchos datos mock
//refactoricé y aislé la logica en lista de asistencia y registro (profesor)

function AsistenciaRegistroCard({ alumno, cambiarEstado }) {
    return (
        <div className="alumno-asistencia-card">
        <div className="alumno-info">
            <Texto className="alumno-nombre">{alumno.nombre}</Texto>
        </div>

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
        </div>
    );
}

export default AsistenciaRegistroCard;