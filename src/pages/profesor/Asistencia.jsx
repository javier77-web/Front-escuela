import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";

// pagina de asistencia del profesor — puede marcar asistencia
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import AlumnoAsistenciaCard from "../../components/molecules/profesor/AlumnoAsistenciaCard";
import useAsistencia from "../../hooks/profesor/useAsistencia";

function AsistenciaProfesor() {
  const { id } = useParams();

  const {
    lista,
    fecha,
    setFecha,
    cambiarEstado,
    porcentaje,
    guardar,
    guardado,
  } = useAsistencia(id);

  const getTipo = (estado) => (estado === "presente" ? "success" : "danger");

  return (
    <PanelLayout rol="profesor">
      <div className="asistencia-profesor-container">
        {/* HEADER */}
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>asistencia curso {id}</Titulo>

            <Texto color="muted">selecciona fecha y marca asistencia</Texto>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="input-fecha"
            />
          </div>

          <div className="asistencia-global">
            <Texto size="sm">asistencia</Texto>

            <Titulo level={2}>{porcentaje}%</Titulo>
          </div>
        </div>

        {/* LISTA */}
        <div className="asistencia-lista">
          {lista.map((alumno) => (
            <AlumnoAsistenciaCard
              key={alumno.id}
              alumno={alumno}
              cambiarEstado={cambiarEstado}
              getTipo={getTipo}
            />
          ))}
        </div>

        {/* FOOTER */}
        <div className="asistencia-footer">
          <Boton onClick={guardar}>guardar asistencia</Boton>

          {guardado && (
            <Texto color="success">asistencia guardada para {fecha}</Texto>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}

export default AsistenciaProfesor;
