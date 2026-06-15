import React from "react";
import "../../styles/pages/alumno/anotaciones.css";
import PanelLayout from "../../layouts/PanelLayout";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import AnotacionCard from "../../components/molecules/AnotacionCard";
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

  if (loading) {
    return (
      <PanelLayout rol="alumno">
        <div className="anotaciones-loading">
          <Texto>Cargando Anotaciones...</Texto>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout rol="alumno">
      <div className="anotaciones-container">
        {/* HEADER */}
        <div className="anotaciones-header">
          <div>
            <Titulo level={1}>Anotaciones</Titulo>
            <Texto color="muted">Historial del semestre</Texto>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="anotaciones-resumen">
          <div className="resumen-card positiva">
            <Titulo level={2}>{positivas}</Titulo>

            <Texto size="sm">Positivas</Texto>
          </div>

          <div className="resumen-card negativa">
            <Titulo level={2}>{negativas}</Titulo>

            <Texto size="sm">Negativas</Texto>
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
            <AnotacionCard
              key={a.id}
              vista="alumno"
              tipo={a.tipo}
              asignatura={a.asignatura}
              descripcion={a.descripcion}
              fecha={a.fecha}
              profesor={a.profesor}
              getTipoBadge={getTipoBadge}
            />
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}

export default Anotaciones;
