import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/organisms/sidebar.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

//Mi asistente me recomendó refactorizar la function sidebar
//me recomendó que instanciara una const con los rol y la ruta fuera de la función
//De esta manera podemos agregar rutas sin tener que tocar la estructura del sidebar,
//Sólo agregamos el label y la ruta respectiva según el rol correspondiente
const NavPorRol = {
  alumno: [
    { label: "panel",       ruta: "/panel/alumno" },
    { label: "mis cursos",  ruta: "/alumno/cursos" },
    { label: "notas",       ruta: "/alumno/notas" },
    { label: "asistencia",  ruta: "/alumno/asistencia" },
    { label: "anotaciones", ruta: "/alumno/anotaciones" },
  ],
  admin: [
    { label: "panel",      ruta: "/panel/admin" },
    { label: "alumnos",    ruta: "/admin/alumnos" },
    { label: "profesores", ruta: "/admin/profesores" },
    { label: "reportes",   ruta: "/admin/reportes" },
  ],
  profesor: [
    { label: "panel",  ruta: "/panel/profesor" },
    { label: "cursos", ruta: "/profesor/cursos" },
    { label: "evaluaciones", ruta: "/profesor/:id/evaluaciones" },
    { label: "evaluacion alumnos", ruta: "/profesor/:id/evaluaciones/alumnos" },
  ],
};

// sidebar principal del panel, cambia links segun el rol del usuario
function Sidebar({ rol }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // manejador del logout — cierra sesion y redirige al home
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const links = NavPorRol[rol] ?? [];
  return (
    <div className="sidebar">
      {/* titulo con el rol actual */}
      <h2>{rol}</h2>

      <nav>
        {/* inicio del panel */}
        <NavLink to="/" end>
          inicio
        </NavLink>

        {/* links exclusivos del alumno */}
        {links.map(({ label, ruta }) =>(
          <NavLink key={ruta} to={ruta}>
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        cerrar sesion
      </button>
    </div>
  );
}

export default Sidebar;
