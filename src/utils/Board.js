import { defaultCell } from './Cell';
import { movePlayer } from "./PlayerController";
import { transferToBoard } from "./Tetrominoes";

export const buildBoard = ({ rows, cols }) => {
  const builtBoard = Array.from({ length: rows }, () =>  Array.from({ length: cols }, () => ({ ...defaultCell })))

  return {
    builtBoard,
    size: { rows, cols }
  }
}

const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) break;
    row = position.row + i;
  }

  return { ...position, row };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  let builtBoard = board.builtBoard.map((row) => row.map((cell) => (cell.occupied ? cell : { ...defaultCell })))

  const dropPosition = findDropPosition({ board, position, shape: tetromino.shape })

  // Place shadow
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "shadow"
  }`;

  builtBoard = transferToBoard({
    builtBoard,
    shape: tetromino.shape,
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
  });

  // Place the piece:　If it collided, mark the board cells as collided
  if (!player.isFastDropping) {
    builtBoard = transferToBoard({
      builtBoard,
      shape: tetromino.shape,
      className: tetromino.className,
      isOccupied: player.collided,
      position
    });
  }

  // Check for cleared lines
  const blankRow = builtBoard[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  builtBoard = builtBoard.reduce((acc, row) => {
    if (row.every((col) => col.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }
    return acc;
  }, []);

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }

  // If it collided, reset the player
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // Return the next board
  return {
    builtBoard,
    size: { ...board.size }
  };
}

export const hasCollision = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          board.builtBoard[row] &&
          board.builtBoard[row][column] &&
          board.builtBoard[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isWithinBoard = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const col = x + position.col;
        const isValidPosition = board.builtBoard[row] && board.builtBoard[row][col];

        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};