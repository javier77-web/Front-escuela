import React from "react";
import Sidebar from "../../components/organisms/Sidebar";
import PanelCards from "../../components/molecules/PanelCards";
import AsignaturasTabla from "../../components/molecules/profesor/AsignaturasTabla";
import Titulo from "../../components/atoms/Titulo";
import Texto from "../../components/atoms/Texto";
import { useAuth } from "../../hooks/useAuth";
import usePanelData from "../../hooks/usePanelData";

import "../../styles/pages/panel/panel.css";

function Panel() {
  const { user, perfil } = useAuth();
  const rol = perfil?.rol?.nombre?.trim().toLowerCase();
  const nombre = perfil?.nombre || user?.displayName || user?.email || rol;

  const { saludo, cards, extra } = usePanelData(rol, perfil, nombre);
  const clasePanel = rol === "admin" ? "admin" : "";

  return (
    <div className="panel-container">
      <Sidebar rol={rol} />

      <div className="panel-content">
        <Titulo level={1}>{saludo}</Titulo>

        {rol === "admin" && <Texto>Gestión general del establecimiento</Texto>}

        <PanelCards cards={cards} className={clasePanel} />

        {rol === "profesor" && <AsignaturasTabla asignaturas={extra.asignaturas} />}
      </div>
    </div>
  );
}

export default Panel;