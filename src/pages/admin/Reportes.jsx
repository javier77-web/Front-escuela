import React from "react";
import PanelLayout from "../../layouts/PanelLayout";
import "../../styles/pages/admin/reportes.css";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import ReporteCard from "../../components/molecules/admin/ReporteCard";
import useReportes from "../../hooks/admin/useReportes";

function Reportes() {
  const { totalAlumnos, totalProfesores, isLoading, isError } = useReportes();

  if (isLoading) return <p>Cargando Reportes...</p>;
  if (isError) return <p>Error al cargar reportes</p>;

  return (
    <PanelLayout rol="admin">
      <div className="reportes-container">
        <div className="reportes-encabezado">
          <Titulo level={1}>Reportes Generales</Titulo>
          <Texto color="muted">
            Resumen visual del estado actual del sistema
          </Texto>
        </div>
        <div className="reportes-grilla">
          <ReporteCard
            titulo="total alumnos"
            valor={String(totalAlumnos)}
            descripcion="Alumnos registrados en el sistema actualmente"
            color="verde"
          />
          <ReporteCard
            titulo="total profesores"
            valor={String(totalProfesores)}
            descripcion="Nuestros profesores activos actualmente"
            color="azul"
          />
        </div>
      </div>
    </PanelLayout>
  );
}

export default Reportes;
