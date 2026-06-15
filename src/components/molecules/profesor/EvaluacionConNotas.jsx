import React from "react";
import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";
import Boton from "../../atoms/Boton";
import Spinner from "../../atoms/Spinner";
import useNotasEvaluacion from "../../../hooks/profesor/useNotasEvaluacion";

function EvaluacionConNotas({ evaluacion, alumnos, getTipo }) {
    const idEvaluacion = evaluacion.id_evaluacion ?? evaluacion.id;

    const { filas, loading, error, guardarNota } = useNotasEvaluacion(
        idEvaluacion,
        alumnos,
    );

    const handleBlur = (firebaseuid, valorActual, e) => {
        const nuevo = parseFloat(e.target.value);
        if (isNaN(nuevo) || nuevo === valorActual) return;
        guardarNota(firebaseuid, nuevo).catch(() => {
        alert("No se pudo guardar la nota. Intenta nuevamente.");
        });
    };

    return (
        <div className="evaluacion-notas-card">
        <div className="evaluacion-notas-header">
            <div>
            <Titulo level={3}>{evaluacion.titulo}</Titulo>
            <Texto size="sm" color="muted">
                {evaluacion.tipo} · {evaluacion.fecha}
            </Texto>
            </div>
        </div>
        <div className="evaluacion-notas-alumnos">
            {loading ? (
                <Spinner texto="cargando alumnos..." />
            ) : error ? (
                <Texto color="danger">{error}</Texto>
            ) : filas.length === 0 ? (
                <Texto color="muted">no hay alumnos en este curso</Texto>
            ) : (
                <table className="tabla-notas-alumnos">
                <thead>
                    <tr>
                    <th>alumno</th>
                    <th>nota</th>
                    </tr>
                </thead>
                <tbody>
                    {filas.map((fila) => (
                    <tr key={fila.firebaseuid}>
                        <td>
                        <Texto>{fila.nombre}</Texto>
                        </td>
                        <td>
                        <div className="nota-input-wrapper">
                            <input
                            type="number"
                            min="1"
                            max="7"
                            step="0.1"
                            defaultValue={fila.nota != null ? fila.nota.toFixed(1) : ""}
                            placeholder="-"
                            className="input-atom"
                            onBlur={(e) => handleBlur(fila.firebaseuid, fila.nota, e)}
                            />
                            {fila.nota != null && (
                            <Badge texto={fila.nota.toFixed(1)} tipo={getTipo(fila.nota)} />
                            )}
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>
        </div>
    );
}

export default EvaluacionConNotas;