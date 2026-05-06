import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/pages/profesor/asignaturaDetalle.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Boton from "../../components/atoms/Boton";

function AsignaturaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const asignatura = location.state;

  return (
    <PanelLayout rol="profesor">
      <div className="asignatura-detalle-container">
        <Titulo level={1}>
          {asignatura
            ? `${asignatura.nombre} - ${asignatura.curso}`
            : `asignatura ${id}`}
        </Titulo>

        <div className="acciones-curso">
          <Boton onClick={() => navigate(`/profesor/${id}/asistencia`)}>
            asistencia
          </Boton>

          <Boton onClick={() => navigate(`/profesor/${id}/notas`)}>notas</Boton>

          <Boton onClick={() => navigate(`/profesor/${id}/anotaciones`)}>
            anotaciones
          </Boton>

          <Boton onClick={() => navigate(`/profesor/${id}/evaluaciones`)}>
            evaluaciones
          </Boton>
        </div>
      </div>
    </PanelLayout>
  );
}

export default AsignaturaDetalle;
