import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../styles/pages/profesor/notas.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import Spinner from "../../components/atoms/Spinner";
import useNotasProfesor from "../../hooks/profesor/useNotas";

function NotasProfesor() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const nombreAsignatura = location.state?.nombre ?? `Asignatura ${id}`;
  const { evaluaciones, actualizarNota, getTipo, loading, error } = useNotasProfesor(id);

  if (loading) {
    return (
      <PanelLayout rol="profesor">
        <div className="notas-profesor-container">
          <Spinner texto="cargando notas..." />
        </div>
      </PanelLayout>
    );
  }

  if (error) {
    return (
      <PanelLayout rol="profesor">
        <div className="notas-profesor-container">
          <Texto color="danger">{error}</Texto>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="profesor">
      <div className="notas-profesor-container">
        <div className="notas-header">
          <Titulo level={1}>notas asignatura {nombreAsignatura}</Titulo>
          <Texto color="muted">edita las calificaciones de las evaluaciones</Texto>
        </div>

        {evaluaciones.length === 0 ? (
          <Texto color="muted">no hay evaluaciones con notas registradas</Texto>
        ) : (
          <div className="tabla-wrapper">
            <table className="tabla-notas">
              <thead>
                <tr>
                  <th>evaluación</th>
                  <th>tipo</th>
                  <th>fecha</th>
                  <th>nota</th>
                </tr>
              </thead>
              <tbody>
                {evaluaciones.map((e) => {
                  const idEval = e.id_evaluacion ?? e.id;
                  const nota = parseFloat(e.nota) || 0;
                  return (
                    <tr key={idEval} className="nota-row nota-row--editable">
                      <td><Texto>{e.titulo}</Texto></td>
                      <td><Texto>{e.tipo}</Texto></td>
                      <td><Texto>{e.fecha}</Texto></td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="7"
                          step="0.1"
                          defaultValue={nota.toFixed(1)}
                          className="input-atom"
                          onBlur={(ev) => {
                            const nuevo = parseFloat(ev.target.value);
                            if (!isNaN(nuevo)) actualizarNota(idEval, nuevo);
                          }}
                        />
                        <Badge texto={nota.toFixed(1)} tipo={getTipo(nota)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* BOTÓN VOLVER */}
        <button onClick={() => navigate(-1)} className="btn-volver">
           volver
        </button>
      </div>
    </PanelLayout>
  );
}

export default NotasProfesor;