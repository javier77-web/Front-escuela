import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/notas.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import NotaRow from "../../components/molecules/NotaRow";
import useNotasProfesor from "../../hooks/profesor/useNotas";

function NotasProfesor() {
  const { id } = useParams();
  const { alumnos, actualizarNota, getTipo } = useNotasProfesor();

  return (
    <PanelLayout rol="profesor">
      <div className="notas-profesor-container">
        <div className="notas-header">
          <Titulo level={1}>notas curso {id}</Titulo>
          <Texto color="muted">edita las calificaciones de los alumnos</Texto>
        </div>

        <div className="tabla-wrapper">
          <table className="tabla-notas">
            <thead>
              <tr>
                <th>alumno</th>
                {alumnos[0]?.notas.map((_, i) => (
                  <th key={i}>nota {i + 1}</th>
                ))}
                <th>promedio</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, i) => (
                <NotaRow
                  key={i}
                  alumno={alumno.nombre}
                  notas={alumno.notas}
                  editable
                  onCambiarNota={(j, valor) => actualizarNota(i, j, valor)}
                  getTipo={getTipo}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PanelLayout>
  );
}

export default NotasProfesor;