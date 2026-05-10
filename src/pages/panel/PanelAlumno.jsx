import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/panel/panelAlumno.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";

// panel principal del alumno, muestra resumen general
function PanelAlumno() {
  // obtenemos el usuario autenticado desde firebase
  const { user } = useAuth();

  return (
    <div className="panel-container">
      {/* sidebar con rol alumno */}
      <Sidebar rol="alumno" />

      {/* contenido principal del panel */}
      <div className="panel-contenido">
        {/* atoms */}
        <Titulo level={1}>
          bienvenido, {user?.displayName || user?.email}
        </Titulo>

        {/* cards */}
        <div className="panel-cards">
          <div className="panel-card">
            <Titulo level={3}>cursos</Titulo>
            <Texto>5 inscritos</Texto>
          </div>

          <div className="panel-card">
            <Titulo level={3}>promedio</Titulo>
            <Texto>6.2</Texto>
          </div>

          <div className="panel-card">
            <Titulo level={3}>asistencia</Titulo>
            <Texto>89%</Texto>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAlumno;
