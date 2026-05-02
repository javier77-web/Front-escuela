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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
