import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import AsistenciaRegistroCard from "../../components/molecules/profesor/AsistenciaRegistroCard";
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
    loading,
  } = useAsistencia(id);

  const getTipo = (estado) => (estado === "presente" ? "success" : "danger");

  return (
    <PanelLayout rol="profesor">
      <div className="asistencia-profesor-container">
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>asistencia asignatura {id}</Titulo>
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

        {loading ? (
          <Texto>cargando...</Texto>
        ) : lista.length === 0 ? (
          <Texto color="muted">
            no hay asistencia registrada para esta fecha
          </Texto>
        ) : (
          <div className="asistencia-lista">
            {lista.map((alumno) => (
              <AsistenciaRegistroCard
                key={alumno.id}
                alumno={alumno}
                cambiarEstado={cambiarEstado}
                getTipo={getTipo}
              />
            ))}
          </div>
        )}

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