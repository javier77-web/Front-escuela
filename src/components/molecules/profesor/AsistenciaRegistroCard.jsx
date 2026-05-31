import React from "react";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";
import Boton from "../../atoms/Boton";

//Las asistencias antigua tenian muchos datos mock
//refactoricé y aislé la logica en lista de asistencia y registro (profesor)

function AsistenciaRegistroCard ({ alumno, cambiarEstado, getTipo})
{
    return(
        <div className="alumno-asistencia-card">
            <div className="alumno-info">
                <Text className="alumno-nombre">
                    {alumno.nombre}
                </Text>
                <Badge texto={alumno.estado} tipo={getTipo(alumno.estado)}/>
            </div>

            <div className="alumno-acciones">
                <Boton 
                    variant = {alumno.estado === "presente" ? "primary" : "secondary"}
                    onClick={() => cambiarEstado(alumno.id, "presente")}
                >Presente</Boton>
                <Boton 
                    variant = {alumno.estado === "ausente" ? "danger" : "secondary"}
                    onClick={() => cambiarEstado(alumno.id, "ausente")}
                >Ausente</Boton>
            </div>
        </div>
    );
}

export default AsistenciaRegistroCard;