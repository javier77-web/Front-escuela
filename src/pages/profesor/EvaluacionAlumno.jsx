import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/evaluaciones.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Spinner from "../../components/atoms/Spinner";
import EvaluacionAlumnoCard from "../../components/molecules/profesor/EvaluacionAlumnoCard";
import useEvaluacionAlumnos from "../../hooks/profesor/useEvaluacionAlumnos";

function EvaluacionAlumno() {
    const { id } = useParams(); // id de la evaluación

    const { alumnos, loading, error } = useEvaluacionAlumnos(id);

    return (
        <PanelLayout rol="profesor">
            <div className="evaluacion-alumno-container">
                {/* HEADER */}
                <div className="evaluacion-alumno-header">
                    <Titulo level={1}>Evaluación #{id}</Titulo>
                    <Texto color="muted">Notas de los alumnos en la evaluación</Texto>
                </div>

                {/* LISTA */}
                {loading ? (
                    <Spinner texto="cargando alumnos..." />
                ) : error ? (
                    <Texto color="danger">{error}</Texto>
                ) : alumnos.length === 0 ? (
                    <Texto color="muted">No hay alumnos registrados aún</Texto>
                ) : (
                    <div className="lista-alumnos">
                        {alumnos.map((a) => (
                            <EvaluacionAlumnoCard
                                key={a.id}
                                evaluacion_id={a.evaluacion_id}
                                firebaseuid={a.firebaseuid}
                                nota={a.nota}
                            />
                        ))}
                    </div>
                )}
            </div>
        </PanelLayout>
    );
}

export default EvaluacionAlumno;
