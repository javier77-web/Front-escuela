import React, { useState } from "react";
import "../../styles/pages/alumno/anotaciones.css";
// layout
import PanelLayout from "../../layouts/PanelLayout";
// atoms
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Badge from "../../components/atoms/Badge";
import Boton from "../../components/atoms/Boton";
import useAnotacionesAlumno from "../../hooks/alumno/useAnotacionesAlumno";

// pagina de anotaciones del alumno — muestra historial con filtros
function Anotaciones() {
  const {
    filtro,
    setFiltro,
    filtradas,
    positivas,
    negativas,
    getTipoBadge,
    loading,
  } = useAnotacionesAlumno();

  return (
    <PanelLayout rol="alumno">
      <div className="anotaciones-container">
        {/* HEADER */}
        <div className="anotaciones-header">
          <Titulo level={1}>Anotaciones</Titulo>
          <Texto color="muted">historial del semestre</Texto>
        </div>

        {/* RESUMEN */}
        <div className="anotaciones-resumen">
          <div className="resumen-card positiva">
            <Titulo level={2}>{positivas}</Titulo>
            <Texto size="sm">positivas</Texto>
          </div>

          <div className="resumen-card negativa">
            <Titulo level={2}>{negativas}</Titulo>
            <Texto size="sm">negativas</Texto>
          </div>
        </div>

        {/* FILTROS */}
        <div className="anotaciones-filtros">
          {["todas", "positiva", "negativa"].map((f) => (
            <Boton
              key={f}
              onClick={() => setFiltro(f)}
              variant={filtro === f ? "primary" : "secondary"}
            >
              {f}
            </Boton>
          ))}
        </div>

        {/* LISTA */}
        <div className="anotaciones-lista">
          {filtradas.map((a) => (
            <div key={a.id} className={`anotacion-card ${a.tipo}`}>
              <div>
                <div className="anotacion-top">
                  <Badge texto={a.tipo} tipo={getTipoBadge(a.tipo)} />
                  <Texto>{a.asignatura}</Texto>
                  <Texto size="sm" color="muted">
                    • {a.profesor}
                  </Texto>
                </div>

                <Texto>{a.descripcion}</Texto>
              </div>

              <Texto size="sm" color="muted" className="anotacion-fecha">
                {a.fecha}
              </Texto>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Anotaciones;
