import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/organisms/sidebar.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// sidebar principal del panel, cambia links segun el rol del usuario
function Sidebar({ rol }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // manejador del logout — cierra sesion y redirige al home
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
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
        {rol === "alumno" && (
          <>
            <NavLink to= "/panel/alumno">Panel</NavLink>
            <NavLink to="/alumno/cursos">mis cursos</NavLink>
            <NavLink to="/alumno/notas">notas</NavLink>
            <NavLink to="/alumno/asistencia">asistencia</NavLink>
            <NavLink to="/alumno/anotaciones">anotaciones</NavLink>
          </>
        )}

        {/* links exclusivos del admin */}
        {rol === "admin" && (
          <>
            <NavLink to= "/panel/admin">Panel</NavLink>
            <NavLink to="/admin/alumnos">alumnos</NavLink>
            <NavLink to="/admin/profesores">profesores</NavLink>
            <NavLink to="/admin/reportes">reportes</NavLink>
          </>
        )}

        {rol === "profesor" && (
          <>
            <NavLink to="/panel/profesor">Panel</NavLink>

            <NavLink to="/profesor/cursos">
              Cursos
            </NavLink>
          </>
        )}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        cerrar sesion
      </button>
    </div>
  );
}

export default Sidebar;
