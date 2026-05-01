import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
import Home from "./pages/Home";
import NuestroColegio from "./pages/NuestroColegio";
import Login from "./pages/Login";

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
          element={<MainLayout><Login /></MainLayout>}
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