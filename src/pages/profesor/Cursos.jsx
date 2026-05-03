import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/organisms/Sidebar";

function CursosProfesor() {
  const navigate = useNavigate();

  // esto viene del backend después
  const asignaturas = [
    {
      id: 1,
      nombre: "matemáticas",
      curso: "4to medio a",
      horario: "lun/mie 08:00",
    },
    {
      id: 2,
      nombre: "matemáticas",
      curso: "4to medio b",
      horario: "mar/jue 10:00",
    },
  ];

  const irDetalle = (asignatura) => {
    navigate(`/profesor/asignatura/${asignatura.id}`, {
      state: asignatura,
    });
  };

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        {/* contenedor propio */}
        <div className="cursos-profesor-container">
          <h1>mis clases</h1>

          <div className="cursos-grid">
            {asignaturas.map((a) => (
              <div key={a.id} className="curso-card">
                <h3>{a.nombre}</h3>
                <p>{a.curso}</p>
                <p>{a.horario}</p>

                <button onClick={() => irDetalle(a)}>gestionar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CursosProfesor;
