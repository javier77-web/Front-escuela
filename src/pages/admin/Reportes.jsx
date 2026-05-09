import React from "react";
// layout
import PanelLayout from "../../layouts/PanelLayout";
import "../../styles/pages/admin/reportes.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import ReporteCard from "../../components/molecules/admin/ReporteCard";
// pagina de reportes del administrador
function Reportes() {
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
    <PanelLayout rol="admin">
      <div className="reportes-container">
        {/* HEADER */}
        <div className="reportes-encabezado">
          <Titulo level={1}>reportes generales</Titulo>

          <Texto color="muted">
            resumen visual del estado actual del sistema
          </Texto>
        </div>

        {/* GRILLA */}
        <div className="reportes-grilla">
          {resumenGeneral.map((reporte) => (
            <ReporteCard
              key={reporte.id}
              titulo={reporte.titulo}
              valor={reporte.valor}
              descripcion={reporte.descripcion}
              color={reporte.color}
            />
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}
export default Reportes;
