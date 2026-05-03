import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/panel/panelProfesor.css";

// panel principal del profesor
function PanelProfesor() {
  // obtenemos usuario logueado
  const { user } = useAuth();

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        <h1>bienvenido profesor, {user?.email}</h1>

        <div className="panel-cards">
          <div className="panel-card">
            <h3>cursos</h3>
            <p>3 asignados</p>
          </div>

          <div className="panel-card">
            <h3>estudiantes</h3>
            <p>120</p>
          </div>

          <div className="panel-card">
            <h3>clases hoy</h3>
            <p>4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelProfesor;
