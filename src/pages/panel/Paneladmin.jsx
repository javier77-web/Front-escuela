import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/panel/panelAdmin.css";

// panel principal del administrador
function PanelAdmin() {
  const { user } = useAuth();

  return (
    <div className="panel-container">
      {/* ahora pasamos rol admin al sidebar */}
      <Sidebar rol="admin" />

      <div className="panel-contenido">
        {/* saludo admin */}
        <h1>panel de control: {user?.displayName || "administrador"}</h1>
        <p>gestión general del establecimiento</p>

        {/* cards resumen para el admin */}
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
