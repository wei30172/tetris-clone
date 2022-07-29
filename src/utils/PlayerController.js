import { hasCollision, isWithinBoard } from "./Board";
import { Action } from "./Input";
import { rotate } from "./Tetrominoes";

// Move the current tetromino
export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    col: position.col + delta.col,
  };

  // Check if Collision occurs
  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  // Check if tetromino is inside the board boundary
  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0; // Because the preset position of the tetromino is at row 0
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

// Check the rotated tetromino, if it is valid then rotate the tetromino
const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  }
};

// Check the moved tetromino, if it is valid then move the tetromino
const attemptMovement = ({ board, action, player, setPlayer, setGameOver }) => {
  const delta = { row: 0, col: 0 };
  let isFastDropping = false;

  // position of top-left is [0, 0], bottom-right is [20, 10]
  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.col -= 1;
  } else if (action === Action.Right) {
    delta.col += 1;
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board,
  });

  // If collide immediately then GameOver
  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

// The current tetromino controller: move and rotate the tetromino
export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver });
  }
};
