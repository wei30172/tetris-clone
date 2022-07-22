import { useState, useCallback } from "react";

import { randomTetromino } from "../utils/Tetrominoes";

const buildPlayer = (prev) => {
  let tetrominoes;

  if (prev) {
    tetrominoes = [...prev.tetrominoes];
    tetrominoes.unshift(randomTetromino()); // [1, 2, 3, 4] => [5, 1, 2, 3, 4]
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map((_) => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, col: 3 },
    tetrominoes,
    tetromino: tetrominoes.pop(),
  };
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(buildPlayer());

  const resetPlayer = useCallback(
    () => setPlayer((prev) => buildPlayer(prev)),
    [],
  );

  return [player, setPlayer, resetPlayer];
};
