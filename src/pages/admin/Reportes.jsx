import React from "react";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/admin/reportes.css";

// pagina de reportes del administrador
function Reportes() {
  // datos estaticos por ahora
  const resumenGeneral = [
    {
      id: 1,
      titulo: "total alumnos",
      valor: "452",
      descripcion: "alumnos registrados en el sistema",
      color: "verde",
    },
    {
      id: 2,
      titulo: "total profesores",
      valor: "34",
      descripcion: "profesores activos actualmente",
      color: "azul",
    },
    {
      id: 3,
      titulo: "asistencia general",
      valor: "91%",
      descripcion: "promedio de asistencia del mes",
      color: "amarillo",
    },
    {
      id: 4,
      titulo: "promedio general",
      valor: "6.1",
      descripcion: "promedio global de notas",
      color: "morado",
    },
    {
      id: 5,
      titulo: "cursos activos",
      valor: "16",
      descripcion: "cursos funcionando este semestre",
      color: "rojo",
    },
    {
      id: 6,
      titulo: "anotaciones positivas",
      valor: "128",
      descripcion: "registros positivos acumulados",
      color: "verde-claro",
    },
  ];

  return (
    <div className="panel-container">
      {/* sidebar del administrador */}
      <Sidebar rol="admin" />

      {/* contenido principal */}
      <div className="panel-contenido">
        <div className="reportes-encabezado">
          <h1 className="reportes-titulo">reportes generales</h1>
          <p className="reportes-subtitulo">
            resumen visual del estado actual del sistema
          </p>
        </div>

        {/* grilla de tarjetas */}
        <div className="reportes-grilla">
          {resumenGeneral.map((reporte) => (
            <div
              key={reporte.id}
              className={`reporte-tarjeta ${reporte.color}`}
            >
              <div className="reporte-superior">
                <span className="reporte-icono">{reporte.icono}</span>
                <span className="reporte-etiqueta">{reporte.titulo}</span>
              </div>

              <h2 className="reporte-valor">{reporte.valor}</h2>
              <p className="reporte-descripcion">{reporte.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reportes;
