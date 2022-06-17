import { useState, useEffect } from "react";

import { buildBoard, nextBoard } from "../utils/Board";

const Board_WIDTH = 20;
const Board_Height = 10;

export const useBoard = ({
  rows = Board_WIDTH,
  cols = Board_Height,
  player,
  resetPlayer,
  addLinesCleared
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, cols }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};