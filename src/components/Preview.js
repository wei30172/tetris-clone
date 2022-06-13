import React from 'react'
import "./Preview.scss";
import { buildBoard } from "../utils/Board";
import { transferToBoard } from "../utils/Tetrominoes";

import { BoardCell } from "./index";

const Preview = ({ tetromino, index }) => {
  const { shape, className } = tetromino;

  const board = buildBoard({ rows: 4, cols: 4 });

  const style = { top: `${index * 15}vw` };

  board.builtBoard = transferToBoard({
    builtBoard: board.builtBoard,
    shape,
    className,
    isOccupied: false,
    position: { row: 0, col: 0 },
  });

  return (
    <div className="Preview" style={style}>
      <div className="Preview-board">
        {board.builtBoard.map((row, y) => row.map((cell, x) => <BoardCell key={x * board.size.cols + x} cell={cell} />))}
      </div>
    </div>
  )
}

export default React.memo(Preview);
