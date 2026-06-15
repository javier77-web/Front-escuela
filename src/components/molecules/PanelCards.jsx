import React from "react";
import PanelCard from "./PanelCard";

function PanelCards({ cards, className = "" }) {
    return (
        <div className="panel-cards">
        {cards.map((card) => (
            <PanelCard
            key={card.titulo}
            titulo={card.titulo}
            valor={card.valor}
            className={className}
            />
        ))}
        </div>
    );
}

export default PanelCards;