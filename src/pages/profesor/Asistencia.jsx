import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/asistencia.css";
import Sidebar from "../../components/organisms/Sidebar";

// pagina de asistencia del profesor — puede marcar asistencia
function AsistenciaProfesor() {
  const { id } = useParams();

  // simulacion de alumnos por curso
  const data = {
    1: [
      { id: 1, nombre: "juan perez", estado: "presente" },
      { id: 2, nombre: "maria lopez", estado: "ausente" },
    ],
    2: [
      { id: 3, nombre: "pedro gomez", estado: "presente" },
      { id: 4, nombre: "ana torres", estado: "presente" },
    ],
  };

  const [lista, setLista] = useState(data[id] || []);
  const [guardado, setGuardado] = useState(false);

  // cambiar estado (mejor usando id)
  const cambiarEstado = (alumnoId, nuevoEstado) => {
    const nuevaLista = lista.map((a) =>
      a.id === alumnoId ? { ...a, estado: nuevoEstado } : a,
    );
    setLista(nuevaLista);
    setGuardado(false); // cambia algo → ya no está guardado
  };

  // calcular porcentaje
  const porcentaje =
    Math.round(
      (lista.filter((a) => a.estado === "presente").length / lista.length) *
        100,
    ) || 0;

  // simular guardado
  const guardarAsistencia = () => {
    console.log("guardando asistencia:", lista);
    setGuardado(true);
  };

  return (
    <div className="panel-container">
      <Sidebar rol="profesor" />

      <div className="panel-contenido">
        {/* 👇 CONTENEDOR PROPIO */}
        <div className="asistencia-profesor-container">
          {/* HEADER */}
          <div className="asistencia-header">
            <h1>asistencia curso {id}</h1>

            <div className="asistencia-global">
              <p>asistencia</p>
              <h2>{porcentaje}%</h2>
            </div>
          </div>

          {/* LISTA */}
          <div className="asistencia-lista">
            {lista.map((alumno) => (
              <div className="asistencia-card" key={alumno.id}>
                <span className="nombre">{alumno.nombre}</span>

                <div className="acciones">
                  <button
                    className={alumno.estado === "presente" ? "activo" : ""}
                    onClick={() => cambiarEstado(alumno.id, "presente")}
                  >
                    presente
                  </button>

                  <button
                    className={alumno.estado === "ausente" ? "activo" : ""}
                    onClick={() => cambiarEstado(alumno.id, "ausente")}
                  >
                    ausente
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="asistencia-footer">
            <button className="btn-guardar" onClick={guardarAsistencia}>
              guardar asistencia
            </button>

            {guardado && (
              <span className="mensaje-ok">✔ asistencia guardada</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsistenciaProfesor;
