import PanelAlumno from "./PanelAlumno";
// import PanelAdmin from "./admin/PanelAdmin";

function Panel() {
  // esto despues lo sacas del login/backend
  const rol = "alumno";

  // logica segun rol
  if (rol === "admin") {
    return <h1>panel admin</h1>; // luego pones PanelAdmin
  }

  return <PanelAlumno />;
}

export default Panel;