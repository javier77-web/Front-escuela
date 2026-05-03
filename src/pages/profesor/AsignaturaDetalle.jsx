import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/profesor/asignaturaDetalle.css";

function AsignaturaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const asignatura = location.state;

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        {/* 👇 CONTENEDOR PROPIO DE ESTA PAGINA */}
        <div className="asignatura-detalle-container">
          <h1 className="titulo">
            {asignatura
              ? `${asignatura.nombre} - ${asignatura.curso}`
              : `asignatura ${id}`}
          </h1>

          <div className="acciones-curso">
            <button onClick={() => navigate(`/profesor/${id}/asistencia`)}>
              asistencia
            </button>

            <button onClick={() => navigate(`/profesor/${id}/notas`)}>
              notas
            </button>

            <button onClick={() => navigate(`/profesor/${id}/anotaciones`)}>
              anotaciones
            </button>

            <button onClick={() => navigate(`/profesor/${id}/evaluaciones`)}>
              evaluaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsignaturaDetalle;
