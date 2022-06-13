import { defaultCell } from './Cell';

export const buildBoard = ({ rows, cols }) => {
  const builtBoard = Array.from({ length: rows }, () =>  Array.from({ length: cols }, () => ({ ...defaultCell })))

  return {
    builtBoard,
    size: { rows, cols }
  }
}

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;
}

// 1:15