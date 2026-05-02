import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/panel/panelAlumno.css";

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
        {/* saludo con nombre del alumno */}
        <h1>bienvenido, {user?.displayName || user?.email} 👋</h1>

        {/* cards de resumen — datos estaticos por ahora, despues se conectan a la api */}
        <div className="panel-cards">
          {/* total de cursos inscritos */}
          <div className="panel-card">
            <h3>cursos</h3>
            <p>5 inscritos</p>
          </div>

          {/* promedio general del alumno */}
          <div className="panel-card">
            <h3>promedio</h3>
            <p>6.2</p>
          </div>

          {/* porcentaje de asistencia */}
          <div className="panel-card">
            <h3>asistencia</h3>
            <p>89%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAlumno;
