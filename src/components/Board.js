import './Board.scss'
import { BoardCell } from './index';

const Board = ({ board }) => {
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.cols}, 1fr)`
  };

  return (
    <div className="Board" style={boardStyles}>
      {board.builtBoard.map((row, y) =>
        row.map((cell, x) => <BoardCell key={x * board.size.cols + x} cell={cell} />)
      )}
    </div>
  )
}

export default Board