import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/notas.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import Input from "../../components/atoms/Input";
import NotaEditableRow from "../../components/molecules/profesor/NotaEditableRow";
import useNotasProfesor from "../../hooks/profesor/useNotas";

function NotasProfesor() {
  const { id } = useParams();

  const { alumnos, actualizarNota, calcularPromedio, getTipo } =
    useNotasProfesor();

  return (
    <PanelLayout rol="profesor">
      <div className="notas-profesor-container">
        {/* HEADER */}
        <div className="notas-header">
          <Titulo level={1}>notas curso {id}</Titulo>

          <Texto color="muted">edita las calificaciones de los alumnos</Texto>
        </div>

        {/* TABLA */}
        <div className="tabla-wrapper">
          <table className="tabla-notas">
            <thead>
              <tr>
                <th>alumno</th>
                <th>nota 1</th>
                <th>nota 2</th>
                <th>nota 3</th>
                <th>promedio</th>
              </tr>
            </thead>

            <tbody>
              {alumnos.map((alumno, i) => (
                <NotaEditableRow
                  key={i}
                  alumno={alumno}
                  i={i}
                  actualizarNota={actualizarNota}
                  calcularPromedio={calcularPromedio}
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
