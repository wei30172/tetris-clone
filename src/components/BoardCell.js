import React from "react";
import "./BoardCell.scss";

function BoardCell({ cell }) {
  return (
    <div className={`boardCell ${cell.className}`}>
      <div className="Sparkle"></div>
    </div>
  );
}

export default React.memo(BoardCell);
