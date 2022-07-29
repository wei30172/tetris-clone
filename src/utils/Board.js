import { defaultCell } from "./Cell";
import { movePlayer } from "./PlayerController";
import { transferToBoard } from "./Tetrominoes";

// For build Preview component (4*4) and Board component (20*10)
export const buildBoard = ({ rows, cols }) => {
  // The Array.from() creates a new, shallow-copied Array
  const builtBoard = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ...defaultCell })),
  );

  return {
    builtBoard,
    size: { rows, cols },
  };
};

// Find out where to drop
const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;

  // Find out where the collision occurred
  for (let i = 0; i < max; i++) {
    const delta = { row: i, col: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  let builtBoard = board.builtBoard.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell })),
  );

  // Find drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape,
  });

  // If it's fastDropping, not show the ghost
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost"
  }`;

  // Place ghost (Drop position preview)
  builtBoard = transferToBoard({
    builtBoard,
    shape: tetromino.shape,
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
  });

  // If it is not fastDropping but collided, mark the board cells as collided
  if (!player.isFastDropping) {
    builtBoard = transferToBoard({
      builtBoard,
      shape: tetromino.shape,
      className: tetromino.className,
      isOccupied: player.collided,
      position,
    });
  }

  // Check for cleared lines
  const blankRow = builtBoard[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  // keep incomplete rows. Not keep the completed rows, add the blank rows to the top instead
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
    // Steps after completing a line
    addLinesCleared(linesCleared);
  }

  // If it collided, reset the player
  if (player.collided || player.isFastDropping) resetPlayer();

  // Return the next board
  return {
    builtBoard,
    size: { ...board.size },
  };
};

// Check if Collision occurs
export const hasCollision = ({ board, position, shape }) => {
  // Within the range of the Board, and each Cell has not been occupied
  for (let y = 0; y < shape.length; y++) {
    const row = position.row + y;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const col = position.col + x;

        if (
          board.builtBoard[row] &&
          board.builtBoard[row][col] &&
          board.builtBoard[row][col].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

// Check if tetromino is inside the board boundary
export const isWithinBoard = ({ board, position, shape }) => {
  // Check every position of tetrominoes cell, their row and column not out of the board boundary
  for (let y = 0; y < shape.length; y++) {
    const row = position.row + y;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const col = position.col + x;
        const isValidPosition =
          board.builtBoard[row] && board.builtBoard[row][col];

        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};
