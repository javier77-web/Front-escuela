import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <h1>Inicio</h1>
            </MainLayout>
          }
        />

        <Route
          path="/noticias"
          element={
            <MainLayout>
              <h1>Noticias</h1>
            </MainLayout>
          }
        />

        <Route
          path="/contacto"
          element={
            <MainLayout>
              <h1>Contacto</h1>
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={<h1>Login (sin layout)</h1>}
        />

        <Route
          path="/panel"
          element={
            <MainLayout>
              <h1>Panel</h1>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;