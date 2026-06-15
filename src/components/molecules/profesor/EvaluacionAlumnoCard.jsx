import React from "react";
import "../../../styles/molecules/profesor/evaluacionCard.css";

import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";

function EvaluacionAlumnoCard({ evaluacion_id, firebaseuid, nota }) {
    return (
        <div className="evaluacion-card">
            {/* Header con título y badge */}
            <div className="evaluacion-card-header">
                <Titulo level={3}>Evaluación #{evaluacion_id}</Titulo>
            </div>

            {/* Alumno */}
            <Texto size="sm" color="muted">
                Alumno: {firebaseuid}
            </Texto>

            {/* Nota */}
            <Texto size="sm" color={nota < 4 ? "danger" : "success"}>
                Nota: {nota ?? "Pendiente"}
            </Texto>
        </div>
    );
}

export default EvaluacionAlumnoCard;
