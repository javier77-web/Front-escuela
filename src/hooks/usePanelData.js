import usePanelAlumno from "./alumno/usePanelAlumno";
import usePanelAdmin from "./admin/usePanelAdmin";
import usePanelProfesor from "./profesor/usePanelProfesor";

// Despacha al hook correcto según el rol.
// pero solo el habilitado para el rol actual hace fetch real.
function usePanelData(rol, perfil, nombre) {
    const datosAlumno = usePanelAlumno(rol === "alumno", nombre);
    const datosAdmin = usePanelAdmin(rol === "admin", nombre);
    const datosProfesor = usePanelProfesor(rol === "profesor", perfil?.firebaseuid, nombre);

    const porRol = {
        alumno: datosAlumno,
        admin: datosAdmin,
        profesor: datosProfesor,
    };

    return porRol[rol] ?? { saludo: `Bienvenido ${nombre}`, cards: [], extra: null };
}

export default usePanelData;