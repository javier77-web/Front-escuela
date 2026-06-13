import { Routes, Route } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";

// Panel unificado
import Panel from "../pages/panel/Panel";

// Rutas alumnos
import Cursos from "../pages/alumno/Cursos";
import Notas from "../pages/alumno/Notas";
import Asistencia from "../pages/alumno/Asistencia";
import Anotaciones from "../pages/alumno/Anotaciones";

// Rutas Admin
import GestionUsuarios from "../pages/admin/GestionUsuarios";
import GestionCursos from "../pages/admin/GestionCursos";
import GestionAsignaturas from "../pages/admin/GestionAsignaturas";
import Reportes from "../pages/admin/Reportes";

// Rutas Profesor
import CursosProfesor from "../pages/profesor/Cursos";
import AsignaturaDetalle from "../pages/profesor/AsignaturaDetalle";
import AsistenciaProfesor from "../pages/profesor/Asistencia";
import NotasProfesor from "../pages/profesor/Notas";
import AnotacionesProfesor from "../pages/profesor/Anotaciones";
import EvaluacionesProfesor from "../pages/profesor/Evaluaciones";
import EvaluacionAlumno from "../pages/profesor/EvaluacionAlumno";

// Mensajes (compartida entre todos los roles)
import Mensajes from "../pages/Mensajes";

function RutasPrivadas() {
  return (
    <Routes>
      {/* Paneles */}
      <Route path="/panel/alumno"   element={<RutaProtegida rolRequerido="alumno"><Panel /></RutaProtegida>} />
      <Route path="/panel/admin"    element={<RutaProtegida rolRequerido="admin"><Panel /></RutaProtegida>} />
      <Route path="/panel/profesor" element={<RutaProtegida rolRequerido="profesor"><Panel /></RutaProtegida>} />

      {/* Alumno */}
      <Route path="/alumno/cursos"      element={<RutaProtegida rolRequerido="alumno"><Cursos /></RutaProtegida>} />
      <Route path="/alumno/notas"       element={<RutaProtegida rolRequerido="alumno"><Notas /></RutaProtegida>} />
      <Route path="/alumno/asistencia"  element={<RutaProtegida rolRequerido="alumno"><Asistencia /></RutaProtegida>} />
      <Route path="/alumno/anotaciones" element={<RutaProtegida rolRequerido="alumno"><Anotaciones /></RutaProtegida>} />

      {/* Admin */}
      <Route path="/admin/alumnos"      element={<RutaProtegida rolRequerido="admin"><GestionUsuarios tipoUsuario="alumno" /></RutaProtegida>} />
      <Route path="/admin/profesores"   element={<RutaProtegida rolRequerido="admin"><GestionUsuarios tipoUsuario="profesor" /></RutaProtegida>} />
      <Route path="/admin/cursos"       element={<RutaProtegida rolRequerido="admin"><GestionCursos /></RutaProtegida>} />
      <Route path="/admin/asignaturas"  element={<RutaProtegida rolRequerido="admin"><GestionAsignaturas /></RutaProtegida>} />

      {/* Profesor */}
      <Route path="/profesor/cursos"                   element={<RutaProtegida rolRequerido="profesor"><CursosProfesor /></RutaProtegida>} />
      <Route path="/profesor/asignatura/:id"           element={<RutaProtegida rolRequerido="profesor"><AsignaturaDetalle /></RutaProtegida>} />
      <Route path="/profesor/:id/asistencia"           element={<RutaProtegida rolRequerido="profesor"><AsistenciaProfesor /></RutaProtegida>} />
      <Route path="/profesor/:id/notas"                element={<RutaProtegida rolRequerido="profesor"><NotasProfesor /></RutaProtegida>} />
      <Route path="/profesor/:id/anotaciones"          element={<RutaProtegida rolRequerido="profesor"><AnotacionesProfesor /></RutaProtegida>} />
      <Route path="/profesor/:id/evaluaciones"         element={<RutaProtegida rolRequerido="profesor"><EvaluacionesProfesor /></RutaProtegida>} />
      <Route path="/profesor/:id/evaluaciones/alumnos" element={<RutaProtegida rolRequerido="profesor"><EvaluacionAlumno /></RutaProtegida>} />

      {/* Mensajes — accesible para todos los roles autenticados */}
      <Route path="/mensajes" element={<RutaProtegida><Mensajes /></RutaProtegida>} />
    </Routes>
  );
}

export default RutasPrivadas;
