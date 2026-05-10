import React from "react";
import Sidebar from "../components/organisms/Sidebar";
import "../styles/layouts/panelLayout.css";

function PanelLayout({ rol, children }) {
  return (
    <div className="panel-layout">
      <Sidebar rol={rol} />
      <div className="panel-content">{children}</div>
    </div>
  );
}

export default PanelLayout;
