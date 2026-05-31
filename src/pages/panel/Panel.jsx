import React from "react";
import Sidebar from "../../components/organisms/Sidebar";
import PanelCard from "../../components/molecules/PanelCard";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/pages/panel/panelAdmin.css";
import "../../styles/pages/panel/panelAlumno.css";
import "../../styles/pages/panel/panelProfesor.css";

//Antes existian 4 paneles diferentes
//Ahora que modificamos las card en molecules podemos hacer el panel dinamico

//Voy a dejar el "resumen", pero más adelante tendremos que hacer esas funciones en el backend
const mockPorRol = {
  alumno: [
    { titulo: "cursos",     valor: "5 inscritos" },
    { titulo: "promedio",   valor: "6.2" },
    { titulo: "asistencia", valor: "89%" },
  ],
  admin: [
    { titulo: "total alumnos", valor: "450 registrados" },
    { titulo: "profesores",    valor: "32 activos" },
    { titulo: "cursos",        valor: "15 secciones" },
  ],
  profesor: [
    { titulo: "cursos",      valor: "3 asignados" },
    { titulo: "estudiantes", valor: "120" },
    { titulo: "clases hoy",  valor: "4" },
  ],
};

const mensaje = {
  alumno:   (nombre) => `bienvenido, ${nombre}`,
  admin:    (nombre) => `panel de control: ${nombre}`,
  profesor: (nombre) => `bienvenido profesor, ${nombre}`,
};

function Panel() {
  const { user, perfil } = useAuth();
  const rol = perfil?.rol?.nombre?.trim().toLowerCase();

  const cards = mockPorRol[rol] ?? [];
  const nombre = perfil?.nombre || user?.displayName || user?.email || rol;
  const saludo = mensaje[rol]?.(nombre) ?? `Bienvenido ${nombre}`;

  //Arreglo del css propuesto por el asistente
  const clasePanel = rol === "admin" ? "panel-card admin" : "panel-card";

  return(
    <div className="panel-container">
      <Sidebar rol={rol}/>

      <div className="panel-content">
        <Titulo level={1}> {saludo} </Titulo>

        {rol ==="admin" && (
          <Texto>Gestion general del establecimiento</Texto>
        )}
        {/**Acá aplico el arreglo del css, el estilo depende del rol, si es optimizan los css o algo, quiza podria fallar acá */}
        <div className="panel-cards">
          {cards.map((card)=>(
            <PanelCard
              key={card.titulo}
              titulo={card.titulo}
              valor={card.valor}
              className={clasePanel}
            />
          ))}
        </div>
      </div>
    </div>
  )

}

export default Panel;