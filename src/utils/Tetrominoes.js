const className = "tetromino";

export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    className: `${className} ${className}__i`
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    className: `${className} ${className}__j`
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    className: `${className} ${className}__l`
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    className: `${className} ${className}__o`
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    className: `${className} ${className}__s`
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    className: `${className} ${className}__t`
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    className: `${className} ${className}__z`
  }
}

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return TETROMINOES[key];
};

export const rotate = ({ piece, direction }) => {
  // console.log(piece);
  // Transpose rows and columns => fisrt row -> first col ...
  const newPiece = piece.map((_, index) => piece.map((col) => col[index]));

  // Reverse rows to get a rotated matrix
  if (direction > 0) return newPiece.map((row) => row.reverse()); // clockwise
  return newPiece.reverse(); // counterclockwise
};

export const transferToBoard = ({
  builtBoard,
  shape,
  className,
  isOccupied,
  position
}) => {
  // shape.forEach((row, y) => {
  //   row.forEach((cell, x) => {
  //     if (cell) {
  //       const occupied = isOccupied;
  //       const _y = position.row + y;
  //       const _x = position.col + x;
  //       builtBoard[_y][_x] = { occupied, className };
  //     }
  //   });
  // });
  for (const [y, row] of shape.entries()) {
    for (const [x, cell] of row.entries()) {
      if (cell) {
        const occupied = isOccupied;
        const _y = position.row + y;
        const _x = position.col + x;
        builtBoard[_y][_x] = { occupied, className };

      }
    }
  }
  return builtBoard;
};
