import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/profesor/cursos.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";

function CursosProfesor() {
  const navigate = useNavigate();

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
    <PanelLayout rol="profesor">
      <div className="cursos-profesor-container">
        {/* HEADER */}
        <div className="cursos-header">
          <Titulo level={1}>mis clases</Titulo>

          <Texto color="muted">selecciona un curso para gestionarlo</Texto>
        </div>

        {/* GRID */}
        <div className="cursos-grid">
          {asignaturas.map((a) => (
            <div key={a.id} className="curso-card">
              <Titulo level={3}>{a.nombre}</Titulo>

              <Texto>{a.curso}</Texto>

              <Texto size="sm" color="muted">
                {a.horario}
              </Texto>

              <Boton onClick={() => irDetalle(a)}>gestionar</Boton>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default CursosProfesor;
