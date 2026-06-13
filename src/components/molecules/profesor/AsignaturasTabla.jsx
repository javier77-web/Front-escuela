import React from "react";
import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";

function AsignaturasTabla({ asignaturas }) {
    if (asignaturas.length === 0) {
        return (
        <div className="mis-asignaturas">
            <Titulo level={2}>Mis Asignaturas</Titulo>
            <Texto>No tienes asignaturas asignadas.</Texto>
        </div>
        );
    }

    return (
        <div className="mis-asignaturas">
        <Titulo level={2}>Mis Asignaturas</Titulo>
        <table className="tabla-profesor">
            <thead>
            <tr>
                <th>Asignatura</th>
                <th>Cursos</th>
                <th>Total Cursos</th>
            </tr>
            </thead>
            <tbody>
            {asignaturas.map((asignatura) => (
                <tr key={asignatura.id_asignatura}>
                <td>{asignatura.nombre}</td>
                <td>{(asignatura.cursos || []).map((c) => c.nombre).join(", ")}</td>
                <td>{asignatura.cursos?.length || 0}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default AsignaturasTabla;