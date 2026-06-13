import React from "react";
import Titulo from "../atoms/Titulo";
import Texto from "../atoms/Texto";

//Antes habían tres paneles(uno pa cada uno), ahora sólo una card que setea el valor correcto
function PanelCard({titulo, valor, className}){
    return (
        <div className={`panel-card ${className}`}>
            <Titulo level={3}>{titulo}</Titulo>
            <Texto>{valor}</Texto>
        </div>
    );
}

export default PanelCard;