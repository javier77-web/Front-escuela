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
    { label: "Panel",       ruta: "/panel/alumno" },
    { label: "Mis cursos",  ruta: "/alumno/cursos" },
    { label: "Notas",       ruta: "/alumno/notas" },
    { label: "Asistencia",  ruta: "/alumno/asistencia" },
    { label: "Anotaciones", ruta: "/alumno/anotaciones" },
  ],
  admin: [
    { label: "Panel",      ruta: "/panel/admin" },
    { label: "Alumnos",    ruta: "/admin/alumnos" },
    { label: "Profesores", ruta: "/admin/profesores" },
    { label: "Reportes",   ruta: "/admin/reportes" },
  ],
  profesor: [
    { label: "Panel",  ruta: "/panel/profesor" },
    { label: "Cursos", ruta: "/profesor/cursos" },
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
          Inicio
        </NavLink>

        {/* links exclusivos del alumno */}
        {links.map(({ label, ruta }) =>(
          <NavLink key={ruta} to={ruta}>
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        Cerrar Sesion
      </button>
    </div>
  );
}

export default Sidebar;
