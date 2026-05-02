import React from "react";
import "../../styles/pages/alumno/asistencia.css";
import Sidebar from "../../components/organisms/Sidebar";

// pagina de asistencia del alumno — muestra porcentaje por asignatura
function Asistencia() {
  // datos estaticos — despues se conectan con el microservicio de asistencia
  const asistencia = [
    { asignatura: "Matemáticas", presentes: 18, ausentes: 2, porcentaje: 90 },
    { asignatura: "Lenguaje", presentes: 20, ausentes: 0, porcentaje: 100 },
    { asignatura: "Historia", presentes: 15, ausentes: 5, porcentaje: 75 },
    { asignatura: "Ciencias", presentes: 19, ausentes: 1, porcentaje: 95 },
    { asignatura: "Inglés", presentes: 17, ausentes: 3, porcentaje: 85 },
  ];

  // retorna clase css segun el porcentaje
  const getClase = (p) => {
    if (p >= 90) return "asistencia-alta";
    if (p >= 75) return "asistencia-media";
    return "asistencia-baja";
  };

  // promedio global de asistencia
  const promedioGlobal = Math.round(
    asistencia.reduce((acc, a) => acc + a.porcentaje, 0) / asistencia.length,
  );

  return (
    <div className="panel-container">
      {/* sidebar con navegacion */}
      <Sidebar rol="alumno" />
      <div className="panel-contenido">
        <div className="asistencia-container">
          {/* encabezado */}
          <div className="asistencia-header">
            <div>
              <h1 className="asistencia-titulo">asistencia</h1>
              <p className="asistencia-subtitulo">
                registro de asistencia por asignatura
              </p>
            </div>

            {/* card porcentaje global */}
            <div className="asistencia-global">
              <p className="global-label">asistencia global</p>
              <p className="global-valor">{promedioGlobal}%</p>
            </div>
          </div>

          {/* lista de asignaturas con barra de progreso */}
          <div className="asistencia-lista">
            {asistencia.map((a, i) => (
              <div
                key={i}
                className={`asistencia-card ${getClase(a.porcentaje)}`}
              >
                {/* info superior */}
                <div className="asistencia-card-header">
                  <h3 className="asistencia-nombre">{a.asignatura}</h3>
                  <div className="asistencia-detalle">
                    <span className="presentes"> {a.presentes} presentes</span>
                    <span className="ausentes"> {a.ausentes} ausentes</span>
                    <span
                      className={`asistencia-badge ${getClase(a.porcentaje)}`}
                    >
                      {a.porcentaje}%
                    </span>
                  </div>
                </div>

                {/* barra de progreso */}
                <div className="barra-fondo">
                  <div
                    className={`barra-progreso ${getClase(a.porcentaje)}`}
                    style={{ width: `${a.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Asistencia;
