import React from "react";

import "../../../styles/molecules/admin/reporteCard.css";

import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";

function ReporteCard({ titulo, valor, descripcion, color }) {
  return (
    <div className={`reporte-card ${color}`}>
      {/* TOP */}
      <div className="reporte-card-top">
        <Badge texto={titulo} tipo="secondary" />
      </div>

      {/* VALOR */}
      <Titulo level={2} className="reporte-card-valor">
        {valor}
      </Titulo>

      {/* DESCRIPCIÓN */}
      <Texto size="sm" color="muted">
        {descripcion}
      </Texto>
    </div>
  );
}

export default ReporteCard;
