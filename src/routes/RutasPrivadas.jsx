import { Routes, Route } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";

import PanelAlumno from "../pages/panel/PanelAlumno";
import Cursos from "../pages/alumno/Cursos";
import Notas from "../pages/alumno/Notas";
import Asistencia from "../pages/alumno/Asistencia";
import Anotaciones from "../pages/alumno/Anotaciones";

import PanelAdmin from "../pages/panel/Paneladmin";
import GestionUsuarios from "../pages/admin/GestionUsuarios";
import Reportes from "../pages/admin/Reportes";

import PanelProfesor from "../pages/panel/PanelProfesor";
import CursosProfesor from "../pages/profesor/Cursos";
import AsignaturaDetalle from "../pages/profesor/AsignaturaDetalle";
import AsistenciaProfesor from "../pages/profesor/Asistencia";
import NotasProfesor from "../pages/profesor/Notas";
import AnotacionesProfesor from "../pages/profesor/Anotaciones";
import EvaluacionesProfesor from "../pages/profesor/Evaluaciones";

function RutasPrivadas() {
  return (
    <Routes>
      {/* alumno */}
      <Route path="/panel/alumno" element={<RutaProtegida rolRequerido="alumno"><PanelAlumno /></RutaProtegida>} />
      <Route path="/alumno/cursos" element={<RutaProtegida rolRequerido="alumno"><Cursos /></RutaProtegida>} />
      <Route path="/alumno/notas" element={<RutaProtegida rolRequerido="alumno"><Notas /></RutaProtegida>} />
      <Route path="/alumno/asistencia" element={<RutaProtegida rolRequerido="alumno"><Asistencia /></RutaProtegida>} />
      <Route path="/alumno/anotaciones" element={<RutaProtegida rolRequerido="alumno"><Anotaciones /></RutaProtegida>} />

      {/* admin */}
      <Route path="/panel/admin" element={<RutaProtegida rolRequerido="admin"><PanelAdmin /></RutaProtegida>} />
      <Route path="/admin/alumnos" element={<RutaProtegida rolRequerido="admin"><GestionUsuarios tipoUsuario="alumno" /></RutaProtegida>} />
      <Route path="/admin/profesores" element={<RutaProtegida rolRequerido="admin"><GestionUsuarios tipoUsuario="profesor" /></RutaProtegida>} />
      <Route path="/admin/reportes" element={<RutaProtegida rolRequerido="admin"><Reportes /></RutaProtegida>} />

      {/* profesor */}
      <Route path="/panel/profesor" element={<RutaProtegida rolRequerido="profesor"><PanelProfesor /></RutaProtegida>} />
      <Route path="/profesor/cursos" element={<RutaProtegida rolRequerido="profesor"><CursosProfesor /></RutaProtegida>} />
      <Route path="/profesor/asignatura/:id" element={<RutaProtegida rolRequerido="profesor"><AsignaturaDetalle /></RutaProtegida>} />
      <Route path="/profesor/:id/asistencia" element={<RutaProtegida rolRequerido="profesor"><AsistenciaProfesor /></RutaProtegida>} />
      <Route path="/profesor/:id/notas" element={<RutaProtegida rolRequerido="profesor"><NotasProfesor /></RutaProtegida>} />
      <Route path="/profesor/:id/anotaciones" element={<RutaProtegida rolRequerido="profesor"><AnotacionesProfesor /></RutaProtegida>} />
      <Route path="/profesor/:id/evaluaciones" element={<RutaProtegida rolRequerido="profesor"><EvaluacionesProfesor /></RutaProtegida>} />
    </Routes>
  );
}

export default RutasPrivadas;