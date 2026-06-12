import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../styles/pages/profesor/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import AsistenciaRegistroCard from "../../components/molecules/profesor/AsistenciaRegistroCard";
import useAsistencia from "../../hooks/profesor/useAsistencia";

function AsistenciaProfesor() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const nombreAsignatura = location.state?.nombre ?? `Asignatura ${id}`;

  const {
    lista,
    fecha,
    setFecha,
    cambiarEstado,
    porcentaje,
    guardar,
    guardado,
    loading,
    yaFuePasada,
  } = useAsistencia(id);

  const hoy = new Date().toISOString().split("T")[0];
  const getTipo = (estado) => (estado === "presente" ? "success" : "danger");

  return (
    <PanelLayout rol="profesor">
      <div className="asistencia-profesor-container">
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>asistencia asignatura {nombreAsignatura}</Titulo>
            <Texto color="muted">selecciona fecha y marca asistencia</Texto>
            <input
              type="date"
              value={fecha}
              max={hoy}
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
            no hay alumnos registrados para este curso
          </Texto>
        ) : (
          <>
            {yaFuePasada && (
              <div className="asistencia-aviso">
                <Texto size="sm" color="muted">
                  lista ya registrada para esta fecha — solo lectura
                </Texto>
              </div>
            )}
            <div className="asistencia-lista">
              {lista.map((alumno, index) => (
                <AsistenciaRegistroCard
                  key={alumno.id ?? index}
                  alumno={alumno}
                  cambiarEstado={cambiarEstado}
                  getTipo={getTipo}
                  soloLectura={yaFuePasada}
                />
              ))}
            </div>
          </>
        )}

        {lista.length > 0 && !yaFuePasada && (
          <div className="asistencia-footer">
            <Boton onClick={guardar}>guardar asistencia</Boton>
            {guardado && (
              <Texto color="success">asistencia guardada para {fecha}</Texto>
            )}
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

export default AsistenciaProfesor;
