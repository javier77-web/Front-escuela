import React from "react";
import Sidebar from "../../components/organisms/Sidebar";
import "../../styles/pages/admin/reportes.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";

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
          <Titulo level={1}>reportes generales</Titulo>

          <Texto color="muted">
            resumen visual del estado actual del sistema
          </Texto>
        </div>

        {/* GRILLA */}
        <div className="reportes-grilla">
          {resumenGeneral.map((reporte) => (
            <div
              key={reporte.id}
              className={`reporte-tarjeta ${reporte.color}`}
            >
              <div className="reporte-superior">
                <Badge texto={reporte.titulo} tipo={reporte.color} />
              </div>

              <Titulo level={2} className="reporte-valor">
                {reporte.valor}
              </Titulo>

              <Texto size="sm" color="muted">
                {reporte.descripcion}
              </Texto>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reportes;
