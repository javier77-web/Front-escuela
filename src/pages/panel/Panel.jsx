import React, { useEffect, useState } from "react";
import Sidebar from "../../components/organisms/Sidebar";
import PanelCard from "../../components/molecules/PanelCard";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import { useAuth } from "../../hooks/useAuth";
import { getAsignaturasProfesor } from "../../api/gestionAcademica/asignaturaService";

import "../../styles/pages/panel/panel.css";

// Datos temporales para alumno y admin
const mockPorRol = {
  alumno: [
    { titulo: "cursos", valor: "5 inscritos" },
    { titulo: "promedio", valor: "6.2" },
    { titulo: "asistencia", valor: "89%" },
  ],
  admin: [
    { titulo: "total alumnos", valor: "450 registrados" },
    { titulo: "profesores", valor: "32 activos" },
    { titulo: "cursos", valor: "15 secciones" },
  ],
};

const mensaje = {
  alumno: (nombre) => `bienvenido, ${nombre}`,
  admin: (nombre) => `panel de control: ${nombre}`,
  profesor: (nombre) => `bienvenido profesor, ${nombre}`,
};

function Panel() {
  const { user, perfil } = useAuth();

  const rol = perfil?.rol?.nombre?.trim().toLowerCase();

  const [misAsignaturas, setMisAsignaturas] = useState([]);

  useEffect(() => {
    const cargarAsignaturas = async () => {
      try {
        if (perfil?.firebaseuid && rol === "profesor") {
          const { data } = await getAsignaturasProfesor(perfil.firebaseuid);

          console.log("ASIGNATURAS:", data);
          setMisAsignaturas(data);
        }
      } catch (error) {
        console.error("Error obteniendo asignaturas:", error);
      }
    };

    cargarAsignaturas();
  }, [perfil, rol]);

  // Datos reales del profesor
  const totalAsignaturas = misAsignaturas.length;

  const totalCursos = new Set(
    misAsignaturas.flatMap((a) => (a.cursos || []).map((c) => c.id_curso)),
  ).size;

  const cardsProfesor = [
    {
      titulo: "Asignaturas",
      valor: totalAsignaturas,
    },
    {
      titulo: "Cursos",
      valor: totalCursos,
    },
    {
      titulo: "Clases Hoy",
      valor: totalAsignaturas,
    },
  ];

  const cards = rol === "profesor" ? cardsProfesor : (mockPorRol[rol] ?? []);

  const nombre = perfil?.nombre || user?.displayName || user?.email || rol;

  const saludo = mensaje[rol]?.(nombre) ?? `Bienvenido ${nombre}`;

  const clasePanel = rol === "admin" ? "panel-card admin" : "panel-card";

  console.log("PERFIL:", perfil);

  return (
    <div className="panel-container">
      <Sidebar rol={rol} />

      <div className="panel-content">
        <Titulo level={1}>{saludo}</Titulo>

        {rol === "admin" && <Texto>Gestión general del establecimiento</Texto>}

        <div className="panel-cards">
          {cards.map((card) => (
            <PanelCard
              key={card.titulo}
              titulo={card.titulo}
              valor={card.valor}
              className={clasePanel}
            />
          ))}
        </div>

        {rol === "profesor" && (
          <div className="mis-asignaturas">
            <Titulo level={2}>Mis Asignaturas</Titulo>

            {misAsignaturas.length === 0 ? (
              <Texto>No tienes asignaturas asignadas.</Texto>
            ) : (
              <table className="tabla-profesor">
                <thead>
                  <tr>
                    <th>Asignatura</th>
                    <th>Cursos</th>
                    <th>Total Cursos</th>
                  </tr>
                </thead>

                <tbody>
                  {misAsignaturas.map((asignatura) => (
                    <tr key={asignatura.id_asignatura}>
                      <td>{asignatura.nombre}</td>

                      <td>
                        {(asignatura.cursos || [])
                          .map((curso) => curso.nombre)
                          .join(", ")}
                      </td>

                      <td>{asignatura.cursos?.length || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Panel;
