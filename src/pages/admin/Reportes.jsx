import React from "react";
import PanelLayout from "../../layouts/PanelLayout";
import "../../styles/pages/admin/reportes.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import ReporteCard from "../../components/molecules/admin/ReporteCard";
import useReportes from "../../hooks/admin/useReportes";

function Reportes() {
  const { totalAlumnos, totalProfesores, isLoading, isError } = useReportes();

  if (isLoading) return <p>cargando reportes...</p>;
  if (isError) return <p>error al cargar reportes</p>;

  return (
    <PanelLayout rol="admin">
      <div className="reportes-container">
        <div className="reportes-encabezado">
          <Titulo level={1}>reportes generales</Titulo>
          <Texto color="muted">
            resumen visual del estado actual del sistema
          </Texto>
        </div>
        <div className="reportes-grilla">
          <ReporteCard
            titulo="total alumnos"
            valor={String(totalAlumnos)}
            descripcion="alumnos registrados en el sistema"
            color="verde"
          />
          <ReporteCard
            titulo="total profesores"
            valor={String(totalProfesores)}
            descripcion="profesores activos actualmente"
            color="azul"
          />
        </div>
      </div>
    </PanelLayout>
  );
}

export default Reportes;
