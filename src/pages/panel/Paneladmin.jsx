import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/panel/panelAdmin.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";

// panel principal del administrador
function PanelAdmin() {
  const { user } = useAuth();

  return (
    <div className="panel-container">
      {/* ahora pasamos rol admin al sidebar */}
      <Sidebar rol="admin" />

      <div className="panel-contenido">
        <Titulo>panel de control: {user?.displayName || "administrador"}</Titulo>

        <Texto>gestión general del establecimiento</Texto>

        <div className="panel-cards">
          <div className="panel-card admin">
            <h3>total alumnos</h3>
            <p>450 registrados</p>
          </div>

          <div className="panel-card admin">
            <h3>profesores</h3>
            <p>32 activos</p>
          </div>

          <div className="panel-card admin">
            <h3>cursos</h3>
            <p>15 secciones</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAdmin;
