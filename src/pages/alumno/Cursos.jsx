import React from "react";
import "../../styles/pages/alumno/cursos.css";
import Sidebar from "../../components/organisms/Sidebar";

// pagina de cursos del alumno — muestra los cursos inscritos del semestre
function Cursos() {
  // datos estaticos — despues se reemplazan con la api
  const cursos = [
    {
      id: 1,
      nombre: "Matemáticas",
      profesor: "Prof. García",
      horario: "Lun/Mié 08:00",
      creditos: 4,
    },
    {
      id: 2,
      nombre: "Lenguaje",
      profesor: "Prof. Martínez",
      horario: "Mar/Jue 10:00",
      creditos: 3,
    },
    {
      id: 3,
      nombre: "Historia",
      profesor: "Prof. López",
      horario: "Vie 09:00",
      creditos: 3,
    },
    {
      id: 4,
      nombre: "Ciencias",
      profesor: "Prof. Rodríguez",
      horario: "Lun/Mié 14:00",
      creditos: 4,
    },
    {
      id: 5,
      nombre: "Inglés",
      profesor: "Prof. Smith",
      horario: "Mar/Jue 08:00",
      creditos: 3,
    },
  ];

  return (
    <div className="panel-container">
      {/* sidebar con navegacion */}
      <Sidebar rol="alumno" />
      <div className="panel-contenido">
        <div className="cursos-container">
          {/* encabezado de la pagina */}
          <div className="cursos-header">
            <h1 className="cursos-titulo">mis cursos</h1>
            <p className="cursos-subtitulo">
              tienes {cursos.length} ramos este semestre
            </p>
          </div>

          {/* grilla de cards de cursos */}
          <div className="cursos-grid">
            {cursos.map((curso) => (
              <div key={curso.id} className="curso-card">
                {/* nombre y creditos */}
                <div className="curso-card-header">
                  <h3 className="curso-nombre">{curso.nombre}</h3>
                </div>

                {/* info del curso */}
                <p className="curso-profesor"> {curso.profesor}</p>
                <p className="curso-horario">{curso.horario}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
