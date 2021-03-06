const className = "tetromino";

//  All tetromino shapes
export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: `${className} ${className}__i`,
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: `${className} ${className}__j`,
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: `${className} ${className}__l`,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: `${className} ${className}__o`,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}__s`,
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}__t`,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: `${className} ${className}__z`,
  },
};

// Generate random tetromino
export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return TETROMINOES[key];
};

// Rotate tetromino (clockwise / counterclockwise)
export const rotate = ({ piece, direction }) => {
  // Transpose rows and columns => fisrt row -> first col ...
  const newPiece = piece.map((_, index) => piece.map((col) => col[index]));

  // Reverse rows to get a rotated matrix
  if (direction > 0) return newPiece.map((row) => row.reverse()); // clockwise
  return newPiece.reverse(); // counterclockwise (game default setting)
};

// Mark tetromino shape cell
export const transferToBoard = ({
  builtBoard,
  shape,
  className,
  isOccupied,
  position,
}) => {
  for (const [y, row] of shape.entries()) {
    for (const [x, cell] of row.entries()) {
      if (cell) {
        const occupied = isOccupied;
        const _y = position.row + y;
        const _x = position.col + x;
        // Cell is occupied and give it styles
        builtBoard[_y][_x] = { occupied, className };
      }
    }
  }
  return builtBoard;
};
