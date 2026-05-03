import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/panel/panelProfesor.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";

// panel principal del profesor
function PanelProfesor() {
  // obtenemos usuario logueado
  const { user } = useAuth();

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        {/* saludo */}
        <Titulo level={1} className="saludo">bienvenido profesor, {user?.email}</Titulo>

        {/* cards */}
        <div className="panel-cards">
          <div className="panel-card">
            <Titulo level={3}>cursos</Titulo>
            <Texto>3 asignados</Texto>
          </div>

          <div className="panel-card">
            <Titulo level={3}>estudiantes</Titulo>
            <Texto>120</Texto>
          </div>

          <div className="panel-card">
            <Titulo level={3}>clases hoy</Titulo>
            <Texto>4</Texto>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelProfesor;
