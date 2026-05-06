import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/profesor/asistencia.css";
import PanelLayout from "../../layouts/PanelLayout";

// pagina de asistencia del profesor — puede marcar asistencia
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import Boton from "../../components/atoms/Boton";
import Badge from "../../components/atoms/Badge";

function AsistenciaProfesor() {
  const { id } = useParams();

  // datos base (simulación backend)
  const data = {
    1: [
      { id: 1, nombre: "juan perez" },
      { id: 2, nombre: "maria lopez" },
    ],
    2: [
      { id: 3, nombre: "pedro gomez" },
      { id: 4, nombre: "ana torres" },
    ],
  };

  // estado por fecha (simula backend/cache)
  const [asistenciasPorFecha, setAsistenciasPorFecha] = useState({});

  // fecha seleccionable
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  // lista actual (depende de la fecha)
  const [lista, setLista] = useState([]);
  const [guardado, setGuardado] = useState(false);

  // cargar datos cuando cambia fecha
  useEffect(() => {
    if (asistenciasPorFecha[fecha]) {
      setLista(asistenciasPorFecha[fecha]);
    } else {
      // si no hay datos → crear lista inicial
      const base = (data[id] || []).map((a) => ({
        ...a,
        estado: "presente",
      }));
      setLista(base);
    }

    setGuardado(false);
  }, [fecha, id]);

  // cambiar estado
  const cambiarEstado = (alumnoId, nuevoEstado) => {
    const nuevaLista = lista.map((a) =>
      a.id === alumnoId ? { ...a, estado: nuevoEstado } : a,
    );
    setLista(nuevaLista);
    setGuardado(false);
  };

  // porcentaje
  const porcentaje =
    Math.round(
      (lista.filter((a) => a.estado === "presente").length / lista.length) *
        100,
    ) || 0;

  // guardar (simulación RTK futuro)
  const guardarAsistencia = () => {
    const payload = {
      cursoId: id,
      fecha,
      asistencia: lista,
    };

    // simulamos persistencia (como si fuera backend)
    setAsistenciasPorFecha((prev) => ({
      ...prev,
      [fecha]: lista,
    }));

    setGuardado(true);
  };

  const getTipo = (estado) => (estado === "presente" ? "success" : "danger");

  return (
    <PanelLayout rol="profesor">
      <div className="asistencia-profesor-container">
        {/* HEADER */}
        <div className="asistencia-header">
          <div>
            <Titulo level={1}>asistencia curso {id}</Titulo>
            <Texto color="muted">selecciona fecha y marca asistencia</Texto>

            {/* FECHA */}
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="input-fecha"
            />
          </div>

          <div className="asistencia-global">
            <Texto size="sm">asistencia</Texto>
            <Titulo level={2}>{porcentaje}%</Titulo>
          </div>
        </div>

        {/* LISTA */}
        <div className="asistencia-lista">
          {lista.map((alumno) => (
            <div className="asistencia-card" key={alumno.id}>
              <div className="info">
                <Texto>{alumno.nombre}</Texto>

                <Badge texto={alumno.estado} tipo={getTipo(alumno.estado)} />
              </div>

              <div className="acciones">
                <Boton
                  variant={
                    alumno.estado === "presente" ? "primary" : "secondary"
                  }
                  onClick={() => cambiarEstado(alumno.id, "presente")}
                >
                  presente
                </Boton>

                <Boton
                  variant={alumno.estado === "ausente" ? "danger" : "secondary"}
                  onClick={() => cambiarEstado(alumno.id, "ausente")}
                >
                  ausente
                </Boton>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="asistencia-footer">
          <Boton onClick={guardarAsistencia}>guardar asistencia</Boton>

          {guardado && (
            <Texto color="success">✔ asistencia guardada para {fecha}</Texto>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}

export default AsistenciaProfesor;
