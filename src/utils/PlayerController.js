import { hasCollision, isWithinBoard } from "./Board";

export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};