import React from "react";
import "./style/card.css";

function Card({ children, title, darkLevel, padding, minWidth }) {
  return (
    <div
      style={{
        padding: padding ? padding : "24px",
        minWidth: minWidth ? minWidth : "300px",
      }}
      className={`card ${darkLevel ? darkLevel : "darkCardOne"}`}
    >
      {title && <div className="cardTitle">{title}</div>}
      <div>{children} </div>
    </div>
  );
}

export default Card;
