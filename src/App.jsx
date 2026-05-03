import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
import Home from "./pages/Home";
import NuestroColegio from "./pages/NuestroColegio";
import Noticias from "./pages/noticias";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Panel from "./pages/panel/Panel";
import PanelAlumno from "./pages/panel/PanelAlumno";
import Cursos from "./pages/alumno/Cursos";
import Notas from "./pages/alumno/Notas";
import Asistencia from "./pages/alumno/Asistencia";
import Anotaciones from "./pages/alumno/Anotaciones";
import PanelAdmin from "./pages/panel/Paneladmin";
import GestionUsuarios from "./pages/admin/GestionUsuarios";
import Reportes from "./pages/admin/Reportes";
import PanelProfesor from "./pages/panel/PanelProfesor";
import NotasProfesor from "./pages/profesor/Notas";
import AsistenciaProfesor from "./pages/profesor/Asistencia";
import CursosProfesor from "./pages/profesor/Cursos";
import AsignaturaDetalle from "./pages/profesor/AsignaturaDetalle";
import AnotacionesProfesor from "./pages/profesor/Anotaciones";
import EvaluacionesProfesor from "./pages/profesor/Evaluaciones";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/nuestroColegio"
          element={
            <MainLayout>
              <NuestroColegio />
            </MainLayout>
          }
        />

        <Route
          path="/noticias"
          element={
            <MainLayout>
              <Noticias />
            </MainLayout>
          }
        />

        <Route
          path="/contacto"
          element={
            <MainLayout>
              <Contacto />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        <Route
          path="panel/alumno"
          element={
              <PanelAlumno />
          }
        />
        // rutas del panel alumno 
        <Route path="/alumno/cursos" element={<Cursos />} />
        <Route path="/alumno/notas" element={<Notas />} />
        <Route path="/alumno/asistencia" element={<Asistencia />} />
        <Route path="/alumno/anotaciones" element={<Anotaciones />} />
        
        <Route
          path="panel/admin"
          element={
              <PanelAdmin/>
          }
        />
        // rutas del admin
        <Route path="/admin/alumnos" element={<GestionUsuarios tipoUsuario="alumno" />} />
        <Route path="/admin/profesores" element={<GestionUsuarios tipoUsuario="profesor" />} />
        <Route path="/admin/reportes" element={<Reportes />} />

        <Route
          path="panel/profesor"
          element={
              <PanelProfesor/>
          }
        />
        // rutas del profesor
        <Route path="/profesor/cursos" element={<CursosProfesor />} />
        <Route path="/profesor/asignatura/:id" element={<AsignaturaDetalle />} />
        <Route path="/profesor/:id/asistencia" element={<AsistenciaProfesor />} />
        <Route path="/profesor/:id/notas" element={<NotasProfesor />} />
        <Route path="/profesor/:id/anotaciones" element={<AnotacionesProfesor />} />
        <Route path="/profesor/:id/evaluaciones" element={<EvaluacionesProfesor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
