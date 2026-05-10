import React from "react";
import "../../../styles/molecules/profesor/evaluacionCard.css";

import Titulo from "../../atoms/Titulo";
import Texto from "../../atoms/Texto";
import Badge from "../../atoms/Badge";

function EvaluacionCard({ titulo, tipo, fecha, getTipoBadge }) {
  return (
    <div className="evaluacion-card">
      {/* TOP */}
      <div className="evaluacion-card-header">
        <Titulo level={3}>{titulo}</Titulo>

        <Badge texto={tipo} tipo={getTipoBadge(tipo)} />
      </div>

      {/* FECHA */}
      <Texto size="sm" color="muted">
        fecha: {fecha}
      </Texto>
    </div>
  );
}

export default EvaluacionCard;
